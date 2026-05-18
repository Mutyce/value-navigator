document.addEventListener('DOMContentLoaded', () => {
  insertHeader();
  insertFooter();
  initBurgerMenu();
  initSmoothScroll();
  initActiveNav();
});

function insertHeader() {
  const el = document.getElementById('header');
  if (!el) return;

  el.innerHTML = `
    <header class="site-header">
      <div class="container site-header__inner">
        <a href="index.html" class="site-header__logo">
          <span class="site-header__logo-icon">🧭</span>
          <span class="site-header__logo-text">Ценностный навигатор</span>
        </a>

        <nav class="nav" aria-label="Основная навигация">
          <ul class="nav__list">
            <li><a href="about.html"       class="nav__link">О проекте</a></li>
            <li><a href="diagnostics.html" class="nav__link">Диагностика</a></li>
            <li><a href="leisure.html"     class="nav__link">Досуг</a></li>
            <li><a href="videos.html"      class="nav__link">Видеоуроки</a></li>
            <li><a href="materials.html"   class="nav__link">Материалы</a></li>
            <li><a href="contest.html"     class="nav__link">Конкурс</a></li>
            <li><a href="contacts.html"    class="nav__link">Контакты</a></li>
          </ul>
        </nav>

        <a href="diagnostics.html" class="btn-primary site-header__cta">Пройти диагностику</a>

        <button class="burger" aria-label="Открыть меню" aria-expanded="false">
          <span class="burger__line"></span>
          <span class="burger__line"></span>
          <span class="burger__line"></span>
        </button>
      </div>
    </header>
  `;
}

function insertFooter() {
  const el = document.getElementById('footer');
  if (!el) return;

  el.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="site-footer__top">

          <div class="site-footer__brand">
            <a href="index.html" class="site-footer__logo">🧭 Ценностный навигатор</a>
            <p class="site-footer__desc">
              Проект помогает семьям определить общие ценности, наладить диалог
              и выстроить осмысленный досуг.
            </p>
          </div>

          <nav class="site-footer__nav" aria-label="Навигация в подвале">
            <h3 class="site-footer__col-title">Разделы</h3>
            <ul class="site-footer__nav-list">
              <li><a href="about.html"       class="site-footer__link">О проекте</a></li>
              <li><a href="diagnostics.html" class="site-footer__link">Диагностика</a></li>
              <li><a href="leisure.html"     class="site-footer__link">Досуг</a></li>
              <li><a href="videos.html"      class="site-footer__link">Видеоуроки</a></li>
              <li><a href="materials.html"   class="site-footer__link">Материалы</a></li>
              <li><a href="contest.html"     class="site-footer__link">Конкурс</a></li>
              <li><a href="contacts.html"    class="site-footer__link">Контакты</a></li>
            </ul>
          </nav>

          <div class="site-footer__contacts">
            <h3 class="site-footer__col-title">Контакты</h3>
            <a href="mailto:idialogi@mail.ru" class="site-footer__link">idialogi@mail.ru</a>
            <div class="site-footer__social-list" style="margin-top:14px">
              <a href="https://vk.com/idialdobro" class="site-footer__link" target="_blank" rel="noopener">
                ВКонтакте — vk.com/idialdobro
              </a>
              <a href="https://vk.com/gubkinartpoint" class="site-footer__link" target="_blank" rel="noopener" style="display:block;margin-top:8px">
                ВКонтакте — vk.com/gubkinartpoint
              </a>
              <a href="https://idialogi.nko31.ru" class="site-footer__link" target="_blank" rel="noopener" style="display:block;margin-top:8px">
                idialogi.nko31.ru
              </a>
            </div>
          </div>

        </div>

        <div class="site-footer__support">
          Проект реализуется при поддержке Министерства общественных коммуникаций Белгородской области
        </div>

        <div class="site-footer__bottom">
          <span>© 2026 АНО «Центр интеллектуального диалога»</span>
        </div>
      </div>
    </footer>
  `;
}

function initBurgerMenu() {
  const burger = document.querySelector('.burger');
  const nav    = document.querySelector('.nav');
  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('active');
    nav.classList.toggle('active');
    burger.setAttribute('aria-expanded', open);
  });

  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      nav.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !nav.contains(e.target)) {
      burger.classList.remove('active');
      nav.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initActiveNav() {
  const navLinks = document.querySelectorAll('.nav__link');
  if (!navLinks.length) return;

  // Derive current filename: "about.html", "index.html", etc.
  const raw = window.location.pathname.split('/').pop();
  const currentPage = raw === '' ? 'index.html' : raw;

  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    // Strip query string and anchor for comparison
    const linkPage = href.split('?')[0].split('#')[0];
    if (linkPage === currentPage) {
      link.classList.add('nav__link--active');
    }
  });
}
