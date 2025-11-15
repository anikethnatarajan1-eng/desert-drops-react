// Simple fade-in effect for main content after splash
window.addEventListener("load", () => {
  const content = document.querySelector(".container");
  content.style.opacity = 0;
  setTimeout(() => {
    content.style.transition = "opacity 2s ease";
    content.style.opacity = 1;
  }, 3000); // after splash delay
});
