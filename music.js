// music.js — toggles background music when sidebar Music button is clicked
(function () {
  const btn = document.getElementById('sidebarMusic');
  if (!btn) return;

  // Create a hidden audio element (or reuse if already present)
  let audio = document.getElementById('bgAudio');
  if (!audio) {
    audio = document.createElement('audio');
    audio.id = 'bgAudio';
    audio.loop = true;
    audio.preload = 'metadata';
    document.body.appendChild(audio);
  }

  // Safe track path (update if you use a different filename)
  const TRACK = 'assets/music/mytrack.mp3';
  audio.src = TRACK;

  // Restore volume and muted state from localStorage
  const storedVol = parseFloat(localStorage.getItem('bg_volume'));
  if (!Number.isNaN(storedVol)) audio.volume = storedVol;
  const storedMuted = localStorage.getItem('bg_muted');
  if (storedMuted === 'true') audio.muted = true;

  // Update button UI
  function setPlayingState(isPlaying) {
    btn.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
    btn.textContent = isPlaying ? 'Music (Pause)' : 'Music (Play)';
  }

  // Try to play (must be initiated by user gesture)
  async function playAudio() {
    try {
      await audio.play();
      setPlayingState(true);
    } catch (err) {
      console.warn('Playback failed:', err);
    }
  }

  function pauseAudio() {
    audio.pause();
    setPlayingState(false);
  }

  // Toggle on click
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (audio.paused) {
      await playAudio();
    } else {
      pauseAudio();
    }
  });

  // Keep the button in sync if playback changed elsewhere
  audio.addEventListener('play', () => setPlayingState(true));
  audio.addEventListener('pause', () => setPlayingState(false));
})();
