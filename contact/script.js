// Allow touch and keyboard users to open the Portfolio submenu.
const dropdown = document.querySelector('.nav-dropdown');
const trigger = document.querySelector('.nav-dropdown-trigger');

if (dropdown && trigger) {
  function setOpen(open) {
    dropdown.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  }
  trigger.addEventListener('click', () => {
    setOpen(!dropdown.classList.contains('is-open'));
  });
  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setOpen(false);
      trigger.focus();
    }
  });
}
