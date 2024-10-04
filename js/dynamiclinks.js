
function loadCustomLinks() {
    const container = document.querySelector(".dynamic-links-menu");
    const links = JSON.parse(localStorage.getItem("customLinks")) || [];
  
    container.innerHTML = "";
  
    links.forEach((link, index) => {
      const div = document.createElement("div");
      div.classList.add("link-item");
  
      const a = document.createElement("a");
      a.href = link.url;
      a.textContent = link.name;
      a.target = "_blank";
  
      const removeButton = document.createElement("span");
      removeButton.classList.add("remove-link");
      removeButton.setAttribute("data-index", index);
    //   removeButton.textContent = "✖"; // Add an 'X' symbol for better visibility
    //   removeButton.textContent = "";
  
      div.appendChild(a);
      div.appendChild(removeButton);
  
      container.appendChild(div);
    });
  
    document.querySelectorAll(".remove-link").forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        removeCustomLink(index);
      });
    });
  }
  
  

function removeCustomLink(index) {
  const links = JSON.parse(localStorage.getItem("customLinks")) || [];

  links.splice(index, 1);

  localStorage.setItem("customLinks", JSON.stringify(links));

  loadCustomLinks();
}

document
  .getElementById("open-link-form")
  .addEventListener("click", function () {
    document.getElementById("link-form-popup").style.display = "block";
  });

document
  .getElementById("close-link-form")
  .addEventListener("click", function () {
    document.getElementById("link-form-popup").style.display = "none";
  });

document
  .getElementById("add-custom-link")
  .addEventListener("click", function () {
    const url = document.getElementById("custom-link-url").value;
    const name = document.getElementById("custom-link-name").value;

    if (url && name) {
      const newLink = { url: url, name: name };

      const links = JSON.parse(localStorage.getItem("customLinks")) || [];

      links.push(newLink);

      localStorage.setItem("customLinks", JSON.stringify(links));

      loadCustomLinks();

      document.getElementById("custom-link-url").value = "";
      document.getElementById("custom-link-name").value = "";
      document.getElementById("link-form-popup").style.display = "none";
    } else {
      alert("Please fill in both fields.");
    }
  });

window.onload = loadCustomLinks;
