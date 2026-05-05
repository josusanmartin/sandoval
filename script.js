// ─────────────────────────────────────────────
// SANDOVAL ABOGADOS — JS compartido
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // ── Mobile nav toggle (dropdown debajo del header) ──
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('header.nav nav');

  if (toggle && menu) {
    const setOpen = (open) => {
      toggle.classList.toggle('is-open', open);
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    };

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      setOpen(!menu.classList.contains('is-open'));
    });

    // Cerrar al tocar un link del menú
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => setOpen(false));
    });

    // Cerrar al tocar fuera
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('is-open')) {
        setOpen(false);
      }
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) setOpen(false);
    });
  }

  // ── Reveal animations on scroll ──
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    }, { threshold: 0.12 });

    const targets = document.querySelectorAll(
      '.section-hd, .areas-col, .pillar-cell, .about-grid > *, .noticia-row, ' +
      '.testimonial-inner, .cta-grid > *, .trust-item, .hero-main > *, ' +
      '.hero-image, .practice-area, .valor, .blog-card, .archive-year, ' +
      '.related-card, .blog-feature-grid > *'
    );
    targets.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${Math.min(i * 0.05, 0.6)}s`;
      observer.observe(el);
    });
  }
});
