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
function loadJS(url) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  document.head.appendChild(script);
}
loadHTML("./header.html", "header");
loadHTML("./footer.html", "footer");
loadCSS("../assets/css/header.css");
loadCSS("../assets/css/footer.css");
loadJS("../assets/js/header.js");
