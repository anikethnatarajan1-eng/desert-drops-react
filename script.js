<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>4niketh.fun – WaterCalc</title>
  <link rel="stylesheet" href="style.css"/>
  <script src="script.js" defer></script>
  <!-- Intro.js for tutorial -->
  <link rel="stylesheet" href="https://unpkg.com/intro.js/minified/introjs.min.css">
  <script src="https://unpkg.com/intro.js/minified/intro.min.js"></script>
</head>
<body>
  <!-- Splash overlay -->
  <div id="splash">
    <img src="./assets/uoa-logo.png" alt="University of Arizona, Tucson Logo" width="300" height="168"/>
  </div>

  <!-- Intro panel -->
  <div class="container" id="introPanel">
    <button class="close-btn" id="closeIntro">✕</button>
    <div class="water-fill"></div>
    <div id="introContent">
      <h1>Welcome to WaterCalc</h1>
      <p>WaterCalc is a digital simulation inspired by research and innovation at the University of Arizona in Tucson...</p>
      <div class="footer">&copy; 2025 4niketh.fun</div>
    </div>
  </div>

  <!-- Main app -->
  <main id="app" class="app hidden">
    <section class="card" id="calculator" data-intro="Estimate your monthly water needs here.">
      <!-- calculator form -->
    </section>

    <section class="card" id="faq" data-intro="Explore answers to common questions.">
      <!-- FAQ accordion -->
    </section>

    <section class="card" id="weather" data-intro="Check live weather and link to Weather.com.">
      <!-- weather form -->
    </section>

    <section class="card" id="bulletin" data-intro="Post your thoughts or questions here.">
      <!-- bulletin board -->
    </section>
  </main>
</body>
</html>
