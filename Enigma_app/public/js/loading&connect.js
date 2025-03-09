function loadHTML(url, element) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(`${element}`).innerHTML = data;
    });
}

function loadCSS(url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  document.head.appendChild(link);
}

loadHTML("./loading.html", "div.loading");
loadHTML("./connect.html", "div.offline-message");
loadCSS("../assets/css/loading&connect.css");

window.addEventListener("load", function () {
  checkOnlineStatus();
  setInterval(checkOnlineStatus, 2000);
  document.querySelector(".loading").style.display = "none";
  document.querySelector(".content-show").style.display = "block";
});

function checkOnlineStatus() {
  const offlineMessage = document.querySelector("#offline-message");
  const content = document.querySelector(".content-show");
  if (navigator.onLine) {
    offlineMessage.classList.remove("show");
    content.style.display = "block"; 
  } else {
    offlineMessage.classList.add("show");
    content.style.display = "none"; 
  }
}

function closeOfflineMessage() {
  const offlineMessage = document.querySelector("#offline-message");
  offlineMessage.classList.remove("show");
}
