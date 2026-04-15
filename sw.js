const CACHE_NAME = 'my-home-cache-v1';
const CORE_ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './links.json',
  './js/quotes.js',
  './js/theme.js',
  './js/greeting.js',
  './js/weather.js',
  './js/menu.js',
  './js/header.js',
  './js/search-engines.js',
  './js/links-manager.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          // Cache successful responses and opaque responses (like external images)
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch((error) => {
          console.error('Fetch failed, returning cache if available.', error);
          // Network failed, if there's no cache, we just fail gracefully
        });

        // Use cache immediately if available, otherwise wait for network
        return cachedResponse || fetchPromise;
      });
    })
  );
});
