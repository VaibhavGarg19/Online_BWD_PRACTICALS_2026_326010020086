var menuButton = document.getElementById("menuButton");
var navigation = document.getElementById("navigation");

menuButton.addEventListener("click", function () {
  navigation.classList.toggle("open");

  if (navigation.classList.contains("open")) {
    menuButton.setAttribute("aria-expanded", "true");
  } else {
    menuButton.setAttribute("aria-expanded", "false");
  }
});
