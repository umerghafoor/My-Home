document.addEventListener('DOMContentLoaded', function () {

  // ─── Engine definitions ──────────────────────────────────────────────────
  const searchEngines = [
    {
      name: 'Google',
      url: 'https://www.google.com/search',
      paramName: 'q',
      icon: 'Icons/icons8-google.svg'
    },
    {
      name: 'Bing',
      url: 'https://www.bing.com/search',
      paramName: 'q',
      icon: 'Icons/icons8-bing.svg'
    },
    {
      name: 'Scholar',
      url: 'https://scholar.google.com/scholar',
      paramName: 'q',
      icon: 'Icons/Google Scholar.png'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/results',
      paramName: 'search_query',
      icon: 'Icons/icons8-youtube-50.svg'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/search',
      paramName: 'q',
      icon: 'Icons/icons8-github-50.svg'
    }
  ];

  // ─── State ───────────────────────────────────────────────────────────────
  let currentEngine = searchEngines[0];
  let activeEngine = currentEngine;
  let activeSuggestionIndex = -1;
  let isFocused = false;
  let suggestionData = [];
  let suggestionRequestId = 0;
  let suggestionTimer = null;
  let engineRevealAnimationTimer = null;

  // ─── DOM refs ────────────────────────────────────────────────────────────
  const searchForm       = document.getElementById('searchForm');
  const searchTrack      = document.getElementById('searchTrack') || document.getElementById('searchPill');
  const searchInput      = document.getElementById('searchInput');
  const clearBtn         = document.getElementById('clearBtn');
  const submitBtn        = document.getElementById('submitBtn');
  const suggestionsBox   = document.getElementById('suggestionsBox');
  const suggestionsList  = document.getElementById('suggestionsList');
  const engineRow        = document.getElementById('engineRow');
  const searchPill       = document.getElementById('searchPill') || searchTrack;
  const pillIcon         = document.getElementById('pillIcon') || (searchTrack ? searchTrack.querySelector('.search-icon') : null);
  const searchWrapper    = document.querySelector('.search-wrapper');

  function updateSearchModeUI (immediate = false) {
    if (!searchWrapper || !searchPill) return;
    const inSearchMode = searchPill.classList.contains('expanded');

    if (engineRevealAnimationTimer) {
      clearTimeout(engineRevealAnimationTimer);
      engineRevealAnimationTimer = null;
    }

    if (inSearchMode) {
      searchWrapper.classList.add('search-mode');
      searchWrapper.classList.remove('animate-engine-reveal');
      return;
    }

    searchWrapper.classList.remove('search-mode');

    if (immediate) {
      searchWrapper.classList.remove('animate-engine-reveal');
      return;
    }

    // Start icon reveal as soon as collapse starts.
    searchWrapper.classList.add('animate-engine-reveal');
    engineRevealAnimationTimer = setTimeout(() => {
      searchWrapper.classList.remove('animate-engine-reveal');
      engineRevealAnimationTimer = null;
    }, 470);
  }

  // ─── Build engine pills ──────────────────────────────────────────────────
  function buildEnginePills () {
    engineRow.innerHTML = '';
    searchEngines.forEach((engine, idx) => {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'engine-pill' + (idx === 0 ? ' active' : '');
      pill.setAttribute('data-engine', engine.name);

      const img = document.createElement('img');
      img.src = engine.icon;
      img.alt = engine.name;
      img.onerror = () => { img.style.display = 'none'; };

      pill.appendChild(img);
      // pill.appendChild(document.createTextNode(engine.name));

      pill.addEventListener('click', () => {
        setEngine(engine);
        searchInput.focus();
      });

      engineRow.appendChild(pill);
    });
  }

  // ─── Switch engine ───────────────────────────────────────────────────────
  function setEngine (engine) {
    currentEngine = engine;
    activeEngine = engine;
    localStorage.setItem('searchEngine', engine.name);

    searchForm.action   = engine.url;
    searchInput.name    = engine.paramName;
    searchInput.placeholder = `Search with ${engine.name}...`;

    engineRow.querySelectorAll('.engine-pill').forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-engine') === engine.name);
    });

    updateSearchModeUI();
  }

  // ─── Restore saved engine ────────────────────────────────────────────────
  function restoreSavedEngine () {
    const saved = localStorage.getItem('searchEngine');
    const found = saved ? searchEngines.find(e => e.name === saved) : null;
    setEngine(found || searchEngines[0]);
  }

  // ─── Update clear / submit buttons ──────────────────────────────────────
  function updateButtons () {
    const hasText = searchInput.value.length > 0;
    clearBtn.classList.toggle('show', hasText);
    clearBtn.classList.toggle('visible', hasText);
    submitBtn.classList.toggle('show', hasText);
  }

  // ─── Suggestions logic ───────────────────────────────────────────────────
  // Fallback suggestions are used when remote autocomplete is unavailable.
  const suggestionBank = [
    'machine learning tutorials',
    'web development best practices',
    'open source projects 2025',
    'latest AI research papers',
    'python data science',
    'react hooks guide',
    'rust programming language',
    'typescript advanced types',
    'linux command line tips',
    'docker kubernetes tutorial',
    'github actions ci cd',
    'css animations examples',
    'javascript async await',
    'neural network architecture',
    'deep learning pytorch',
    'how to learn programming',
    'history of computing',
    'regex cheatsheet',
    'sql query optimization',
    'personal finance tips'
  ];

  function getLocalSuggestions (query) {
    if (!query || query.length < 1) return [];
    const q = query.toLowerCase().trim();
    return suggestionBank
      .filter(s => s.includes(q))
      .slice(0, 5);
  }

  function buildGoogleSuggestUrl (query, callbackName) {
    const url = new URL('https://suggestqueries.google.com/complete/search');
    url.searchParams.set('client', 'firefox');
    url.searchParams.set('q', query);
    url.searchParams.set('callback', callbackName);
    return url.toString();
  }

  function parseGoogleSuggestPayload (payloadText) {
    if (!payloadText || typeof payloadText !== 'string') return null;
    try {
      return JSON.parse(payloadText);
    } catch {
      return null;
    }
  }

  function extractSuggestionsFromGoogleSuggest (payload) {
    if (!Array.isArray(payload)) return [];
    const list = payload[1];
    if (!Array.isArray(list)) return [];
    return list
      .filter(item => typeof item === 'string' && item.trim().length > 0)
      .slice(0, 8);
  }

  async function getSuggestions (query) {
    const trimmed = query.trim();
    if (!trimmed) return [];

    return new Promise(resolve => {
      const callbackName = `googleSuggestCb_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const script = document.createElement('script');
      const fallback = getLocalSuggestions(trimmed);

      let timeoutId = 0;

      const cleanup = () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = 0;
        }
        delete window[callbackName];
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };

      window[callbackName] = payload => {
        cleanup();
        const parsedPayload = Array.isArray(payload)
          ? payload
          : parseGoogleSuggestPayload(typeof payload === 'string' ? payload : '');
        const apiSuggestions = extractSuggestionsFromGoogleSuggest(parsedPayload);
        resolve(apiSuggestions.length ? apiSuggestions : fallback);
      };

      script.onerror = () => {
        cleanup();
        resolve(fallback);
      };

      script.src = buildGoogleSuggestUrl(trimmed, callbackName);
      script.async = true;

      timeoutId = window.setTimeout(() => {
        cleanup();
        resolve(fallback);
      }, 2500);

      document.head.appendChild(script);
    });
  }

  function escapeHtml (text) {
    return text
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function highlightMatch (text, query) {
    const safeText = escapeHtml(text);
    if (!query) return safeText;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return safeText.replace(
      new RegExp(`(${escaped})`, 'gi'),
      '<span class="suggestion-match">$1</span>'
    );
  }

  async function renderSuggestions (query) {
    if (!suggestionsBox || !suggestionsList) return;

    const askedQuery = (query || '').trim();
    const requestId = ++suggestionRequestId;

    if (!askedQuery || !isFocused) {
      closeSuggestions();
      return;
    }

    suggestionData = await getSuggestions(askedQuery);

    if (requestId !== suggestionRequestId) {
      return;
    }

    if (searchInput.value.trim() !== askedQuery || !isFocused) {
      return;
    }

    if (!suggestionData.length || !isFocused) {
      closeSuggestions();
      return;
    }

    activeSuggestionIndex = -1;

    suggestionsList.innerHTML = '';
    suggestionData.forEach((text, i) => {
      const item = document.createElement('div');
      item.className = 'suggestion-item';
      item.dataset.idx = String(i);
      item.dataset.val = text;

      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      icon.setAttribute('viewBox', '0 0 24 24');
      icon.setAttribute('fill', 'none');
      icon.setAttribute('stroke', 'currentColor');
      icon.setAttribute('stroke-width', '2');
      icon.setAttribute('stroke-linecap', 'round');
      icon.setAttribute('stroke-linejoin', 'round');
      icon.innerHTML = '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>';

      const textEl = document.createElement('span');
      textEl.innerHTML = highlightMatch(text, askedQuery);

      item.appendChild(icon);
      item.appendChild(textEl);
      suggestionsList.appendChild(item);
    });

    // Click on a suggestion
    suggestionsList.querySelectorAll('.suggestion-item').forEach(el => {
      el.addEventListener('mousedown', e => {
        e.preventDefault();
        searchInput.value = el.dataset.val;
        updateButtons();
        closeSuggestions();
        doSearch();
      });
    });

    suggestionsBox.classList.add('open');
  }

  function closeSuggestions () {
    if (suggestionTimer) {
      clearTimeout(suggestionTimer);
      suggestionTimer = null;
    }
    if (!suggestionsBox) return;
    suggestionsBox.classList.remove('open');
    activeSuggestionIndex = -1;
  }

  function queueSuggestions (query) {
    if (suggestionTimer) clearTimeout(suggestionTimer);

    suggestionTimer = setTimeout(() => {
      renderSuggestions(query);
    }, 140);
  }

  function navigateSuggestions (direction) {
    if (!suggestionsList) return;

    const items = suggestionsList.querySelectorAll('.suggestion-item');
    if (!items.length) return;

    // Remove current highlight
    if (activeSuggestionIndex >= 0) {
      items[activeSuggestionIndex].classList.remove('active');
    }

    // Move index
    activeSuggestionIndex = (activeSuggestionIndex + direction + items.length) % items.length;

    items[activeSuggestionIndex].classList.add('active');
    searchInput.value = items[activeSuggestionIndex].dataset.val;
  }

  // ─── Legacy compatibility event wiring ──────────────────────────────────
  function expand () {
    if (searchPill) {
      searchPill.classList.add('expanded');
      searchPill.classList.add('focused');
    }
    updateSearchModeUI();
  }

  function collapse () {
    if (!searchInput.value && searchPill) {
      searchPill.classList.remove('expanded');
      searchPill.classList.remove('focused');
    }
    updateSearchModeUI();
  }

  if (pillIcon) {
    pillIcon.addEventListener('click', () => {
      expand();
      setTimeout(() => searchInput.focus(), 40);
    });
  }

  searchInput.addEventListener('focus', expand);

  searchInput.addEventListener('blur', () => {
    setTimeout(collapse, 160);
  });

  // ─── Execute search ──────────────────────────────────────────────────────
  function doSearch () {
    const q = searchInput.value.trim();
    if (!q) return;

    // If it looks like a URL, navigate directly
    if (/^(https?:\/\/|www\.)/i.test(q)) {
      const url = q.startsWith('http') ? q : 'https://' + q;
      window.location.href = url;
      return;
    }

    const e = currentEngine;
    const url = `${e.url}?${e.paramName}=${encodeURIComponent(q)}`;
    window.location.href = url;
  }

  // ─── Event listeners ─────────────────────────────────────────────────────

  searchInput.addEventListener('focus', () => {
    isFocused = true;
    if (searchTrack) searchTrack.classList.add('focused');
    queueSuggestions(searchInput.value);
  });

  searchInput.addEventListener('blur', () => {
    isFocused = false;
    if (searchTrack) searchTrack.classList.remove('focused');
    // Small delay so mousedown on suggestions fires first
    setTimeout(closeSuggestions, 160);
  });

  searchInput.addEventListener('input', () => {
    updateButtons();
    queueSuggestions(searchInput.value);
  });

  searchInput.addEventListener('keydown', e => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        navigateSuggestions(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        navigateSuggestions(-1);
        break;
      case 'Escape':
        closeSuggestions();
        searchInput.blur();
        break;
      case 'Enter':
        e.preventDefault();
        closeSuggestions();
        doSearch();
        break;
      // Quick engine switch: Alt+1..5
      case '1': case '2': case '3': case '4': case '5':
        if (e.altKey) {
          const idx = parseInt(e.key) - 1;
          if (searchEngines[idx]) {
            setEngine(searchEngines[idx]);
          }
          e.preventDefault();
        }
        break;
    }
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    updateButtons();
    closeSuggestions();
    searchInput.focus();
  });

  submitBtn.addEventListener('click', () => {
    closeSuggestions();
    doSearch();
  });

  // Intercept native form submit too
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    closeSuggestions();
    doSearch();
  });

  // ─── Init ────────────────────────────────────────────────────────────────
  buildEnginePills();
  restoreSavedEngine();
  updateButtons();
  updateSearchModeUI(true);

  // Auto-focus after a short delay
  setTimeout(() => {
    searchInput.focus();
  }, 400);

});