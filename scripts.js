// Tiny interaction layer: nav toggle, theme toggle, and simple contact form UX.
(function () {
  // Elements
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-navigation');
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  // NAV TOGGLE (mobile)
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      // Use aria-hidden on nav for easier CSS toggle
      nav.setAttribute('aria-hidden', String(expanded));
    });

    // ensure initial state
    nav.setAttribute('aria-hidden', 'true');
  }

  // THEME TOGGLE (persisted)
  const THEME_KEY = 'site-theme';
  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }
  // load saved value or system preference
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) applyTheme(saved);
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) applyTheme('dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      applyTheme(isDark ? 'light' : 'dark');
      localStorage.setItem(THEME_KEY, isDark ? 'light' : 'dark');
    });
  }

  // CONTACT FORM (fake submit to avoid spam endpoints)
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = 'Please complete all fields.';
        formStatus.style.color = 'crimson';
        return;
      }

      // Simple client-side "send" feedback. Replace this with real backend or form service later.
      formStatus.textContent = 'Sending…';
      formStatus.style.color = '';
      setTimeout(() => {
        formStatus.textContent = 'Thanks — message queued. I will reply to ' + email + ' soon.';
        formStatus.style.color = '';
        form.reset();
      }, 800);
    });
  }

  // Accessibility: focus main when navigating via hash links
  function handleHashFocus() {
    const id = location.hash && location.hash.substring(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.focus({ preventScroll: false });
  }
  window.addEventListener('hashchange', handleHashFocus);
})();