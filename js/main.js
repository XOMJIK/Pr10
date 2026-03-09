document.addEventListener('DOMContentLoaded', () => {

  const header = document.querySelector('header');
  if (header) {

    const burger = document.createElement('button');
    burger.className = 'burger';
    burger.setAttribute('aria-label', 'Меню');
    burger.innerHTML = '<span></span><span></span><span></span>';
    header.appendChild(burger);

    const navLinks = document.querySelectorAll('header nav a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `
      <button class="mobile-nav-close" aria-label="Закрити">✕</button>
      <div class="mobile-search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input type="text" placeholder="Пошук товарів..." id="mobileSearchInput">
      </div>
      <a href="index.html"        ${currentPath==='index.html'        ? 'class="active"':''}>Магазин</a>
      <a href="new-arrivals.html" ${currentPath==='new-arrivals.html' ? 'class="active"':''}>Новинки</a>
      <a href="brands.html"       ${currentPath==='brands.html'       ? 'class="active"':''}>Бренди</a>
      <a href="category.html"     ${currentPath==='category.html'     ? 'class="active"':''}>Каталог</a>
      <a href="cart.html"         ${currentPath==='cart.html'         ? 'class="active"':''}>Кошик 🛒</a>
      <a href="login.html"        ${currentPath==='login.html'        ? 'class="active"':''}>Вхід</a>
      <a href="register.html"     ${currentPath==='register.html'     ? 'class="active"':''}>Реєстрація</a>
    `;
    document.body.appendChild(mobileNav);

    function openMenu() {
      mobileNav.classList.add('open');
      burger.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        const inp = document.getElementById('mobileSearchInput');
        if (inp) inp.focus();
      }, 100);
    }
    function closeMenu() {
      mobileNav.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    }

    burger.addEventListener('click', () => {
      mobileNav.classList.contains('open') ? closeMenu() : openMenu();
    });

    mobileNav.querySelector('.mobile-nav-close').addEventListener('click', closeMenu);

    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });

    const mobileSearchInput = document.getElementById('mobileSearchInput');
    if (mobileSearchInput) {
      mobileSearchInput.addEventListener('keydown', e => {
        if (e.key === 'Enter' && e.target.value.trim()) {
          window.location.href = 'category.html?search=' + encodeURIComponent(e.target.value.trim());
        }
      });
    }
  }

  window.openTab = function(e, id) {
    const section = e.target.closest('.product-tabs-section, .tabs-section, [data-tabs]') || document;
    section.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    section.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
    e.target.classList.add('active');
  };

  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('header nav a').forEach(a => {
    const href = a.getAttribute('href')?.split('?')[0];
    if (href === path) {
      a.classList.add('active');
    }
  });

});