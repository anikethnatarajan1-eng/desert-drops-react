window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  const introPanel = document.getElementById("introPanel");
  const app = document.getElementById("app");
  const closeIntro = document.getElementById("closeIntro");

  function revealApp() {
    introPanel.style.opacity = 0;
    introPanel.style.transform = "translateY(-8px)";
    setTimeout(() => {
      introPanel.classList.add("hidden");
      app.classList.remove("hidden");
      app.scrollIntoView({ behavior: "smooth", block: "start" });

      // Start guided tutorial
      setTimeout(() => {
        introJs().setOptions({
          showProgress: true,
          skipLabel: "Skip tutorial",
          nextLabel: "Next →",
          prevLabel: "← Back",
          doneLabel: "Finish"
        }).start();
      }, 500);
    }, 300);
  }

  closeIntro.addEventListener("click", revealApp);
  setTimeout(() => splash && splash.remove(), 4000);
});

// Calculator
document.getElementById("calcForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const usagePerPerson = parseFloat(document.getElementById("usagePerPerson").value);
  const numPeople = parseInt(document.getElementById("numPeople").value, 10);
  const collectionArea = parseFloat(document.getElementById("collectionArea").value);
  const rainfall = parseFloat(document.getElementById("rainfall").value);
  const efficiency = Math.max(0, Math.min(100, parseFloat(document.getElementById("efficiency").value)));

  const collectedLiters = rainfall * collectionArea;
  const filteredLiters = collectedLiters * (efficiency / 100);
  const monthlyNeeds = usagePerPerson * numPeople * 30;
  const surplus = filteredLiters - monthlyNeeds;

  const results = document.getElementById("calcResults");
  results.innerHTML = `
    <div><strong>Collected (raw):</strong> ${collectedLiters.toFixed(1)} L</div>
    <div><strong>After filtration:</strong> ${filteredLiters.toFixed(1)} L</div>
    <div><strong>Monthly needs:</strong> ${monthlyNeeds.toFixed(1)} L</div>
    <div><strong>${surplus >= 0 ? "Surplus" : "Deficit"}:</strong> ${Math.abs(surplus).toFixed(1)} L</div>
  `;
