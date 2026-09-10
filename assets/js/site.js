const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav-links');

function updateHeader() {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 18);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }));
}

function applyLanguage(lang) {
  const safeLang = lang === 'es' ? 'es' : 'en';
  document.documentElement.lang = safeLang;
  localStorage.setItem('portfolio-language', safeLang);

  document.querySelectorAll('[data-en][data-es]').forEach(el => {
    el.textContent = el.dataset[safeLang];
  });

  document.querySelectorAll('[data-en-html][data-es-html]').forEach(el => {
    el.innerHTML = safeLang === 'es' ? el.dataset.esHtml : el.dataset.enHtml;
  });

  document.querySelectorAll('[data-alt-en][data-alt-es]').forEach(el => {
    el.alt = safeLang === 'es' ? el.dataset.altEs : el.dataset.altEn;
  });

  document.querySelectorAll('.lang-button').forEach(btn => {
    const active = btn.dataset.lang === safeLang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  const body = document.body;
  if (body) {
    const title = safeLang === 'es' ? body.dataset.titleEs : body.dataset.titleEn;
    if (title) document.title = title;
  }

  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    const value = safeLang === 'es' ? meta.dataset.es : meta.dataset.en;
    if (value) meta.setAttribute('content', value);
  }
}

const stored = localStorage.getItem('portfolio-language');
const initialLanguage = stored || (navigator.language && navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en');
applyLanguage(initialLanguage);

document.querySelectorAll('.lang-button').forEach(btn => {
  btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
});

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}
