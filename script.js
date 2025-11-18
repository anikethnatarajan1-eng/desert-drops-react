window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  const introPanel = document.getElementById("introPanel");
  const app = document.getElementById("app");
  const closeIntro = document.getElementById("closeIntro");

  function revealApp() {
    // Hide intro
    introPanel.style.opacity = 0;
    introPanel.style.transform = "translateY(-10px)";
    setTimeout(() => {
      introPanel.classList.add("hidden");
      app.classList.remove("hidden");

      // Launch tutorial
      introJs().setOptions({
        showProgress: true,
        skipLabel: "Skip tutorial",
        nextLabel: "Next →",
        prevLabel: "← Back",
        doneLabel: "Finish"
      }).start();
    }, 300);
  }

  // Fix: ensure event listener is attached
  closeIntro.addEventListener("click", revealApp);

  // Remove splash after fade
  setTimeout(() => splash && splash.remove(), 4000);
});
