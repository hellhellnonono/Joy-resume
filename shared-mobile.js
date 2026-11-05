document.addEventListener('DOMContentLoaded',()=>{
 const active=document.body.dataset.resumePage||'';
 const pages=[['Home','../index.html','home'],['Personal','../personal/index.html','personal'],['Video Portfolio','../video/index.html','video'],['Photo Portfolio','../photo/photo-index.html','photo'],['Contact','../contact/contact-index.html','contact']];
 const header=document.createElement('header');header.className='resume-mobile-header';
 const brand=document.createElement('a');brand.className='resume-mobile-brand';brand.href='../index.html';brand.textContent='JOY SUN.';
 const button=document.createElement('button');button.className='resume-mobile-toggle';button.type='button';button.textContent='☰';button.setAttribute('aria-label','開啟導覽選單');button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','resumeMobileNav');
 const nav=document.createElement('nav');nav.className='resume-mobile-nav';nav.id='resumeMobileNav';nav.setAttribute('aria-label','手機主要導覽');
 pages.forEach(([name,href,key])=>{const a=document.createElement('a');a.href=href;a.textContent=name;if(key===active)a.setAttribute('aria-current','page');nav.append(a)});
 const close=()=>{nav.classList.remove('is-open');button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','開啟導覽選單');button.textContent='☰'};
 button.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'關閉導覽選單':'開啟導覽選單');button.textContent=open?'×':'☰'});
 nav.addEventListener('click',e=>{if(e.target.closest('a'))close()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 document.addEventListener('click',e=>{if(!header.contains(e.target))close()});
 header.append(brand,button,nav);document.body.prepend(header);
});
