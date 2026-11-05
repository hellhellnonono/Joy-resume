// Video cards are ordinary links, so they work without JavaScript.
// This optional script makes the PORTFOLIO submenu usable by touch and keyboard.
const dropdown = document.querySelector('.dropdown');
const toggle = document.querySelector('.drop-label');
if (dropdown && toggle) {
  toggle.addEventListener('click', () => {
    const open = dropdown.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', event => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      dropdown.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}
