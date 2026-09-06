// Minimal theme toggle: all it does is add/remove one class on <body>.
// Every color on the page is a CSS custom property that changes automatically
// when that class is present, so this script never touches any styles itself.
const toggleButton = document.getElementById("theme-toggle");

toggleButton.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");
  toggleButton.textContent = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
});
