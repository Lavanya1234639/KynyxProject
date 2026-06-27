// =====================
// GSAP-INIT.JS — Kynyx Solutions
// Smooth entrance animations using GSAP + ScrollTrigger
// Add this in HTML: <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
//                   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
// Then: <script src="js/gsap-init.js"></script>
// =====================

document.addEventListener('DOMContentLoaded', function () {

  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded. Skipping animations.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ── HERO ENTRANCE ──
  gsap.from('.hero-badge', { opacity: 0, y: 20, duration: 0.6, delay: 0.2 });
  gsap.from('.hero h1',    { opacity: 0, y: 30, duration: 0.7, delay: 0.35 });
  gsap.from('.hero p',     { opacity: 0, y: 20, duration: 0.6, delay: 0.5 });
  gsap.from('.hero-buttons', { opacity: 0, y: 20, duration: 0.6, delay: 0.65 });
  gsap.from('.hero-right img', { opacity: 0, x: 40, duration: 0.8, delay: 0.4, ease: 'power2.out' });

  // ── TRUSTED BAND ──
  gsap.from('.trusted-grid div', {
    opacity: 0, y: 16, duration: 0.5,
    stagger: 0.1,
    scrollTrigger: { trigger: '.trusted', start: 'top 90%' }
  });

  // ── SECTION HEADERS ──
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
      opacity: 0, y: 24, duration: 0.6,
      scrollTrigger: { trigger: header, start: 'top 88%' }
    });
  });

  // ── SERVICE CARDS ──
  gsap.from('.service-card', {
    opacity: 0, y: 32, duration: 0.55,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.services-grid', start: 'top 85%' }
  });

  // ── ABOUT SECTION ──
  gsap.from('.about-image', {
    opacity: 0, x: -40, duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.about-content', start: 'top 80%' }
  });
  gsap.from('.about-text', {
    opacity: 0, x: 40, duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.about-content', start: 'top 80%' }
  });
  gsap.from('.about-features div', {
    opacity: 0, y: 20, duration: 0.5,
    stagger: 0.12,
    scrollTrigger: { trigger: '.about-features', start: 'top 85%' }
  });

  // ── STATS ──
  gsap.from('.stat-card', {
    opacity: 0, scale: 0.9, duration: 0.5,
    stagger: 0.1,
    ease: 'back.out(1.4)',
    scrollTrigger: { trigger: '.stats-grid', start: 'top 85%' }
  });

  // ── PROCESS CARDS ──
  gsap.from('.process-card', {
    opacity: 0, y: 28, duration: 0.55,
    stagger: 0.15,
    scrollTrigger: { trigger: '.process-grid', start: 'top 85%' }
  });

  // ── PROJECT CARDS ──
  gsap.from('.project-card', {
    opacity: 0, y: 36, duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.projects-grid', start: 'top 85%' }
  });

  // ── WHY US ──
  gsap.from('.why-item', {
    opacity: 0, x: -24, duration: 0.5,
    stagger: 0.12,
    scrollTrigger: { trigger: '.why-list', start: 'top 85%' }
  });

  // ── TESTIMONIALS ──
  gsap.from('.testimonial-card', {
    opacity: 0, y: 28, duration: 0.55,
    stagger: 0.15,
    scrollTrigger: { trigger: '.testimonial-grid', start: 'top 85%' }
  });

  // ── TRUST BANNER ──
  gsap.from('.trust-grid div', {
    opacity: 0, scale: 0.85, duration: 0.5,
    stagger: 0.12,
    ease: 'back.out(1.4)',
    scrollTrigger: { trigger: '.trust-grid', start: 'top 85%' }
  });

  // ── CTA ──
  gsap.from('.cta h2, .cta p, .cta-btn', {
    opacity: 0, y: 20, duration: 0.6,
    stagger: 0.15,
    scrollTrigger: { trigger: '.cta', start: 'top 85%' }
  });

  // ── CONTACT ──
  gsap.from('.contact-info', {
    opacity: 0, x: -32, duration: 0.7,
    scrollTrigger: { trigger: '.contact-wrapper', start: 'top 80%' }
  });
  gsap.from('.contact-form', {
    opacity: 0, x: 32, duration: 0.7,
    scrollTrigger: { trigger: '.contact-wrapper', start: 'top 80%' }
  });

  // ── FOOTER ──
  gsap.from('.footer-grid > div', {
    opacity: 0, y: 20, duration: 0.5,
    stagger: 0.12,
    scrollTrigger: { trigger: '.footer-grid', start: 'top 90%' }
  });

});