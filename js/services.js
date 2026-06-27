// =====================
// SERVICES.JS — Kynyx Solutions
// =====================

document.addEventListener('DOMContentLoaded', function () {

  // ── SCROLL REVEAL ──
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // ── STICKY SERVICE NAV ──
  const heroSection = document.querySelector('.page-hero');
  const stickyNav = document.createElement('nav');
  stickyNav.className = 'svc-sticky-nav';
  stickyNav.innerHTML = `
    <a href="#web-development">Web Dev</a>
    <a href="#mobile-apps">Mobile</a>
    <a href="#ai-solutions">AI</a>
    <a href="#cloud-services">Cloud</a>
    <a href="#business-analytics">Analytics</a>
    <a href="#ui-ux-design">UI/UX</a>
  `;
  document.body.appendChild(stickyNav);

  // Show sticky nav after hero
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        stickyNav.classList.add('is-visible');
      } else {
        stickyNav.classList.remove('is-visible');
      }
    });
  }, { threshold: 0.1 });

  if (heroSection) heroObserver.observe(heroSection);

  // ── ACTIVE NAV LINK ON SCROLL ──
  const serviceSections = document.querySelectorAll('.service-section');
  const stickyLinks = stickyNav.querySelectorAll('a');
  const heroNavLinks = document.querySelectorAll('.services-nav a');

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        stickyLinks.forEach(a => {
          a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`);
        });
        heroNavLinks.forEach(a => {
          a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  serviceSections.forEach(s => activeObserver.observe(s));

  // ── SMOOTH SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── FEATURE ITEMS STAGGER ──
  document.querySelectorAll('.service-section').forEach(section => {
    const items = section.querySelectorAll('.feature-item');
    items.forEach((item, i) => {
      item.style.transitionDelay = `${i * 80}ms`;
    });
  });

});