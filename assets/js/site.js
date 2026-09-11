const siteIsSpanish = document.documentElement.lang.toLowerCase().startsWith('es');
const siteUi = siteIsSpanish ? {
  imageViewer: 'Visor de imágenes',
  closeImageViewer: 'Cerrar visor de imágenes',
  previousImage: 'Imagen anterior',
  nextImage: 'Siguiente imagen',
  openOriginal: 'Abrir original ↗',
  image: 'Imagen',
  openLarger: 'abrir en grande'
} : {
  imageViewer: 'Image viewer',
  closeImageViewer: 'Close image viewer',
  previousImage: 'Previous image',
  nextImage: 'Next image',
  openOriginal: 'Open original ↗',
  image: 'Image',
  openLarger: 'open larger'
};

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


if (menu && nav) {
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!nav.classList.contains('open')) return;
    if (!nav.contains(event.target) && !menu.contains(event.target)) {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    }
  });
}

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

// Image lightbox. Images inside project-navigation cards keep their normal link behavior.
const lightboxImages = [...document.querySelectorAll('main img:not(.no-lightbox)')]
  .filter(img => !img.closest('a.project-card'));

if (lightboxImages.length) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', siteUi.imageViewer);
  lightbox.innerHTML = `
    <div class="lightbox-top">
      <span class="lightbox-count"></span>
      <button class="lightbox-close" type="button" aria-label="${siteUi.closeImageViewer}">×</button>
    </div>
    <div class="lightbox-stage">
      <button class="lightbox-arrow lightbox-prev" type="button" aria-label="${siteUi.previousImage}">←</button>
      <div class="lightbox-media"><img alt=""></div>
      <button class="lightbox-arrow lightbox-next" type="button" aria-label="${siteUi.nextImage}">→</button>
    </div>
    <div class="lightbox-bottom">
      <span class="lightbox-caption"></span>
      <a class="lightbox-original" target="_blank" rel="noopener">${siteUi.openOriginal}</a>
    </div>`;
  document.body.appendChild(lightbox);

  const viewer = lightbox.querySelector('.lightbox-media img');
  const count = lightbox.querySelector('.lightbox-count');
  const caption = lightbox.querySelector('.lightbox-caption');
  const original = lightbox.querySelector('.lightbox-original');
  const prev = lightbox.querySelector('.lightbox-prev');
  const next = lightbox.querySelector('.lightbox-next');
  const close = lightbox.querySelector('.lightbox-close');

  let group = [];
  let index = 0;
  let lastFocus = null;

  function galleryRoot(img) {
    // Case-study sections are treated as one sequence so related design iterations
    // (commerce flow, testing, responsive comparisons, etc.) can be browsed together.
    const story = img.closest('.story-section');
    if (story) return story;
    return img.closest('.gallery-grid, .art-grid, .phone-strip, .milestone-grid, .two-up, .three-up, .phone-pair, .current-card') || img.parentElement;
  }

  function buildGroup(img) {
    const root = galleryRoot(img);
    const candidates = [...root.querySelectorAll('img:not(.no-lightbox)')]
      .filter(candidate => !candidate.closest('a.project-card'));
    return candidates.length ? candidates : [img];
  }

  function render() {
    const img = group[index];
    if (!img) return;
    viewer.src = img.currentSrc || img.src;
    viewer.alt = img.alt || '';
    original.href = img.currentSrc || img.src;
    const figcaption = img.closest('figure')?.querySelector('figcaption');
    caption.textContent = figcaption?.textContent?.trim() || img.alt || '';
    count.textContent = group.length > 1 ? `${index + 1} / ${group.length}` : siteUi.image;
    prev.hidden = group.length < 2;
    next.hidden = group.length < 2;
  }

  function openLightbox(img) {
    lastFocus = document.activeElement;
    group = buildGroup(img);
    index = Math.max(0, group.indexOf(img));
    render();
    lightbox.classList.add('is-open');
    document.body.classList.add('lightbox-open');
    close.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('lightbox-open');
    viewer.removeAttribute('src');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  function step(direction) {
    if (group.length < 2) return;
    index = (index + direction + group.length) % group.length;
    render();
  }

  lightboxImages.forEach(img => {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `${img.alt || siteUi.image} — ${siteUi.openLarger}`);
    img.addEventListener('click', event => {
      event.preventDefault();
      openLightbox(img);
    });
    img.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(img);
      }
    });
  });

  prev.addEventListener('click', () => step(-1));
  next.addEventListener('click', () => step(1));
  close.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox || event.target.classList.contains('lightbox-media')) closeLightbox();
  });
  document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeLightbox();
      return;
    }
    if (event.key === 'ArrowLeft') step(-1);
    if (event.key === 'ArrowRight') step(1);
    if (event.key === 'Tab') {
      const focusable = [...lightbox.querySelectorAll('button:not([hidden]), a[href]:not([hidden])')]
        .filter(el => el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}

// Positive playtest response carousel.
document.querySelectorAll('.quote-carousel').forEach(carousel => {
  const items = [...carousel.querySelectorAll('.quote-item')];
  const prev = carousel.querySelector('.quote-prev');
  const next = carousel.querySelector('.quote-next');
  const progress = carousel.querySelector('.quote-progress');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let timer = null;
  let progressTimer = null;
  const interval = 5500;
  let startedAt = 0;

  function show(newIndex) {
    if (!items.length) return;
    index = (newIndex + items.length) % items.length;
    items.forEach((item, i) => item.classList.toggle('is-active', i === index));
    if (progress) progress.style.setProperty('--quote-progress', '0%');
  }

  function animateProgress() {
    if (!progress || reducedMotion) return;
    const elapsed = Date.now() - startedAt;
    const pct = Math.min(100, elapsed / interval * 100);
    progress.style.setProperty('--quote-progress', `${pct}%`);
    if (pct < 100) progressTimer = requestAnimationFrame(animateProgress);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
    if (progressTimer) cancelAnimationFrame(progressTimer);
    progressTimer = null;
  }

  function start() {
    stop();
    if (reducedMotion || items.length < 2) return;
    startedAt = Date.now();
    animateProgress();
    timer = setInterval(() => {
      show(index + 1);
      startedAt = Date.now();
      animateProgress();
    }, interval);
  }

  prev?.addEventListener('click', () => { show(index - 1); start(); });
  next?.addEventListener('click', () => { show(index + 1); start(); });
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);
  show(0);
  start();
});


// Filterable project index on Work page.
const filterToolbar = document.querySelector('.project-filters');
if (filterToolbar) {
  const filterButtons = [...filterToolbar.querySelectorAll('[data-filter]')];
  const projectCards = [...document.querySelectorAll('.filter-project-card')];
  const emptyState = document.querySelector('#filter-empty');

  function normalizeFilter(value) {
    return filterButtons.some(button => button.dataset.filter === value) ? value : 'all';
  }

  function applyProjectFilter(rawFilter, updateHash = true) {
    const filter = normalizeFilter(rawFilter);
    let visibleCount = 0;

    filterButtons.forEach(button => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    projectCards.forEach(card => {
      const categories = (card.dataset.categories || '').split(/\s+/);
      const visible = filter === 'all' || categories.includes(filter);
      card.classList.toggle('is-filtered-out', !visible);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (emptyState) emptyState.hidden = visibleCount !== 0;

    if (updateHash) {
      const next = filter === 'all' ? `${location.pathname}${location.search}` : `#${filter}`;
      history.replaceState(null, '', next);
    }
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => applyProjectFilter(button.dataset.filter));
  });

  const initialFilter = location.hash ? location.hash.slice(1) : 'all';
  applyProjectFilter(initialFilter, false);
  window.addEventListener('hashchange', () => {
    applyProjectFilter(location.hash ? location.hash.slice(1) : 'all', false);
  });
}
