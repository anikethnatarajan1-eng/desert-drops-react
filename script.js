// Intro: splash auto-fade and "X" button
window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  const introPanel = document.getElementById("introPanel");
  const app = document.getElementById("app");
  const closeIntro = document.getElementById("closeIntro");

  // When intro closed, hide it and show app
  function revealApp() {
    introPanel.style.opacity = 0;
    introPanel.style.transform = "translateY(-8px)";
    setTimeout(() => {
      introPanel.classList.add("hidden");
      app.classList.remove("hidden");
      app.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  }

  closeIntro.addEventListener("click", revealApp);

  // Auto-reveal after splash fades, if user clicks nothing
  setTimeout(() => {
    if (!introPanel.classList.contains("hidden")) {
      // Keep intro visible until user closes; comment next line to auto-reveal:
      // revealApp();
    }
  }, 2500);

  // Remove splash from DOM after fade
  setTimeout(() => splash && splash.remove(), 4000);
});

// Water calculator
document.getElementById("calcForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const usagePerPerson = parseFloat(document.getElementById("usagePerPerson").value);
  const numPeople = parseInt(document.getElementById("numPeople").value, 10);
  const collectionArea = parseFloat(document.getElementById("collectionArea").value);
  const rainfall = parseFloat(document.getElementById("rainfall").value);
  const efficiency = Math.max(0, Math.min(100, parseFloat(document.getElementById("efficiency").value)));

  // Volume collected per month (liters) = rainfall(mm) * area(m^2)
  const collectedLiters = rainfall * collectionArea;
  const filteredLiters = collectedLiters * (efficiency / 100);

  // Needs per month (liters) = daily * people * 30
  const monthlyNeeds = usagePerPerson * numPeople * 30;
  const surplus = filteredLiters - monthlyNeeds;

  const results = document.getElementById("calcResults");
  results.innerHTML = `
    <div><strong>Collected (raw):</strong> ${collectedLiters.toFixed(1)} L</div>
    <div><strong>After filtration:</strong> ${filteredLiters.toFixed(1)} L</div>
    <div><strong>Monthly needs:</strong> ${monthlyNeeds.toFixed(1)} L</div>
    <div><strong>${surplus >= 0 ? "Surplus" : "Deficit"}:</strong> ${Math.abs(surplus).toFixed(1)} L</div>
  `;
});

// Accordion behavior
document.querySelectorAll(".accordion-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    const isOpen = content.classList.contains("open");
    // Close all others
    document.querySelectorAll(".accordion-content").forEach((c) => {
      c.classList.remove("open");
      c.style.maxHeight = null;
    });
    // Toggle current
    if (!isOpen) {
      content.classList.add("open");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// Weather: geocode city -> get weather from Open-Meteo
const weatherForm = document.getElementById("weatherForm");
const weatherResult = document.getElementById("weatherResult");

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const cityName = document.getElementById("cityInput").value.trim();
  if (!cityName) return;

  weatherResult.textContent = "Loading…";

  try {
    // Geocode city
    const g = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`);
    const geo = await g.json();
    if (!geo.results || geo.results.length === 0) {
      weatherResult.textContent = "City not found.";
      return;
    }
    const { latitude, longitude, name, country } = geo.results[0];

    // Current weather
    const w = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation&timezone=auto`);
    const data = await w.json();
    const cur = data.current;

    weatherResult.innerHTML = `
  <div><strong>Location:</strong> ${name}, ${country}</div>
  <div><strong>Temperature:</strong> ${cur.temperature_2m} °C</div>
  <div><strong>Humidity:</strong> ${cur.relative_humidity_2m} %</div>
  <div><strong>Wind:</strong> ${cur.wind_speed_10m} m/s</div>
  <div><strong>Precipitation:</strong> ${cur.precipitation} mm</div>
  <div style="margin-top:8px;">
    <a href="https://weather.com/weather/today/l/${latitude},${longitude}" target="_blank" rel="noopener">
      View full forecast on Weather.com
    </a>
  </div>
 `;
  } catch (err) {
    console.error(err);
    weatherResult.textContent = "Failed to load weather. Try again.";
  }
});

// Bulletin board (localStorage per-device)
const commentForm = document.getElementById("commentForm");
const commentList = document.getElementById("commentList");

function loadComments() {
  const items = JSON.parse(localStorage.getItem("watercalc_comments") || "[]");
  renderComments(items);
}

function saveComments(items) {
  localStorage.setItem("watercalc_comments", JSON.stringify(items));
}

function renderComments(items) {
  commentList.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    const meta = document.createElement("div");
    meta.className = "comment-meta";
    meta.textContent = `${item.author} • ${new Date(item.ts).toLocaleString()}`;

    const text = document.createElement("div");
    text.textContent = item.text;

    const del = document.createElement("button");
    del.className = "delete-btn";
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      const next = (JSON.parse(localStorage.getItem("watercalc_comments") || "[]")).filter((x) => x.id !== item.id);
      saveComments(next);
      renderComments(next);
    });

    li.appendChild(text);
    li.appendChild(del);
    li.appendChild(meta);
    commentList.appendChild(li);
  });
}

commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const author = document.getElementById("commentAuthor").value.trim();
  const text = document.getElementById("commentText").value.trim();
  if (!author || !text) return;

  const items = JSON.parse(localStorage.getItem("watercalc_comments") || "[]");
  const newItem = { id: crypto.randomUUID(), author, text, ts: Date.now() };
  items.unshift(newItem);
  saveComments(items);
  renderComments(items);

  commentForm.reset();
});

loadComments();
