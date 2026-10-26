document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const savedTheme = localStorage.getItem('rallypoint-theme');
    if (savedTheme) root.setAttribute('data-theme', savedTheme);
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('rallypoint-theme', next);
    });
  }

  const dirToggle = document.getElementById('dir-toggle');
  const updateDirLabel = () => {
    if (dirToggle) dirToggle.textContent = root.getAttribute('dir') === 'rtl' ? 'LTR' : 'RTL';
  };
  const savedDir = localStorage.getItem('rallypoint-dir');
  if (savedDir) root.setAttribute('dir', savedDir);
  updateDirLabel();
  if (dirToggle) {
    dirToggle.addEventListener('click', () => {
      const next = root.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
      root.setAttribute('dir', next);
      localStorage.setItem('rallypoint-dir', next);
      updateDirLabel();
    });
  }

  const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!hasHover) {
    document.querySelectorAll('.nav-item').forEach((item) => {
      const link = item.querySelector(':scope > a');
      const dropdown = item.querySelector('.dropdown');
      if (!link || !dropdown) return;
      link.addEventListener('click', (e) => {
        if (!item.classList.contains('open')) {
          e.preventDefault();
          document.querySelectorAll('.nav-item.open').forEach((o) => o.classList.remove('open'));
          item.classList.add('open');
        }
      });
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-item')) {
        document.querySelectorAll('.nav-item.open').forEach((i) => i.classList.remove('open'));
      }
    });
  }

  const menuToggle = document.getElementById('menu-toggle');
  const mobilePanel = document.getElementById('mobile-panel');
  if (menuToggle && mobilePanel) {
    const setOpen = (open) => {
      mobilePanel.classList.toggle('open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
    };
    menuToggle.addEventListener('click', () => setOpen(!mobilePanel.classList.contains('open')));
    mobilePanel.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    window.addEventListener('resize', () => { if (window.innerWidth > 1280) setOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }

});
