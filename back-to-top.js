/* Shared mobile-only floating back-to-top button. No HTML markup required. */
(() => {
  'use strict';
  const init = () => {
    if (document.querySelector('.back-to-top')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', '返回頁面頂端');
    button.setAttribute('title', 'Back to top');
    button.textContent = '↑';
    document.body.appendChild(button);
    const mobile = window.matchMedia('(max-width: 768px)');
    let ticking = false;
    const update = () => {
      button.classList.toggle('is-visible', mobile.matches && window.scrollY > 320);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    button.addEventListener('click', () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'instant' : 'smooth' });
    });
    update();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
