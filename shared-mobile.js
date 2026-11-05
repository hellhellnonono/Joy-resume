/* Subpages only. Homepage mobile-menu.js remains independent. */
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.resumePage;
  const valid = ['personal', 'video', 'photo', 'contact'];
  if (!valid.includes(page) || document.querySelector('.resume-mobile-header')) return;
  const pages = [
    ['Home', '../index.html', 'home'],
    ['Personal', '../personal/index.html', 'personal'],
    ['Video Portfolio', '../video/index.html', 'video'],
    ['Photo Portfolio', '../photo/photo-index.html', 'photo'],
    ['Contact', '../contact/contact-index.html', 'contact']
  ];
  const header = document.createElement('header');
  header.className = 'resume-mobile-header';
  const brand = document.createElement('a');
  brand.className = 'resume-mobile-brand';
  brand.href = '../index.html';
  brand.setAttribute('aria-label', 'JOY SUN，返回首頁');
  brand.innerHTML = 'JOY SUN<span>.</span>';
  const button = document.createElement('button');
  button.className = 'resume-mobile-toggle';
  button.type = 'button';
  button.textContent = '☰';
  button.setAttribute('aria-label', '開啟導覽選單');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', 'resumeMobileNav');
  const nav = document.createElement('nav');
  nav.className = 'resume-mobile-nav';
  nav.id = 'resumeMobileNav';
  nav.setAttribute('aria-label', '手機主要導覽');
  pages.forEach(([name, href, key]) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = name;
    if (key === page) link.setAttribute('aria-current', 'page');
    nav.append(link);
  });
  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? '關閉導覽選單' : '開啟導覽選單');
    button.textContent = open ? '×' : '☰';
  }
  button.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  nav.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('click', event => { if (!header.contains(event.target)) setOpen(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); button.focus(); } });
  window.matchMedia('(min-width: 769px)').addEventListener('change', event => { if (event.matches) setOpen(false); });
  header.append(brand, button, nav);
  document.body.prepend(header);
  document.body.classList.add('has-mobile-nav');
});
