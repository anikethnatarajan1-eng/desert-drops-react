// translate.js — handle the translate box without modifying the main script
(function () {
  const form = document.getElementById('translateForm');
  const input = document.getElementById('translateInput');
  const hint = document.getElementById('translateHint');

  if (!form || !input) return;

  const LANG_MAP = {
    spanish: 'es', french: 'fr', german: 'de', chinese: 'zh-CN', 'chinese (simplified)': 'zh-CN', 'chinese (traditional)': 'zh-TW', japanese: 'ja', korean: 'ko', italian: 'it', portuguese: 'pt', 'brazilian portuguese': 'pt-BR', russian: 'ru', arabic: 'ar', hindi: 'hi', vietnamese: 'vi', indonesian: 'id', dutch: 'nl', swedish: 'sv', turkish: 'tr', polish: 'pl', hebrew: 'iw', norwegian: 'no'
  };

  function resolveCode(value) {
    if (!value) return null;
    const v = value.trim().toLowerCase();
    if (!v) return null;
    if (LANG_MAP[v]) return LANG_MAP[v];
    if (/^[a-z]{2}(-[A-Za-z]{2,3})?$/.test(v)) return v;
    const alt = v.replace(/\s+/g, '-');
    if (LANG_MAP[alt]) return LANG_MAP[alt];
    return null;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value;
    const code = resolveCode(val);
    if (!code) {
      if (hint) {
        hint.textContent = 'Unknown language — try a common name (e.g., "Spanish") or a code ("fr").';
        hint.style.color = 'var(--primary)';
      }
      input.focus();
      return;
    }

    const current = window.location.href;
    const translateUrl = `https://translate.google.com/translate?sl=auto&tl=${encodeURIComponent(code)}&u=${encodeURIComponent(current)}`;
    window.open(translateUrl, '_blank', 'noopener');
  });
})();
