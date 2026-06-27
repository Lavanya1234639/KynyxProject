// =====================
// PROJECTS.JS — Kynyx Solutions
// =====================

document.addEventListener('DOMContentLoaded', function () {

  // ── SCROLL REVEAL ──
  const cards = document.querySelectorAll('.project-card');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('reveal-visible');
        }, i * 100);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => revealObserver.observe(card));

  // ── PROCESS STEPS REVEAL ──
  const steps = document.querySelectorAll('.process-step');
  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 120);
        stepObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  steps.forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(20px)';
    step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    stepObserver.observe(step);
  });

  // ── FILTER TABS ──
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');
  const noResults = document.querySelector('.no-results');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {

      // Active tab
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      let visibleCount = 0;

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const matches = filter === 'all' || category === filter;

        if (matches) {
          card.classList.remove('is-hidden');
          visibleCount++;
          // Re-animate on filter
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          }, 50);
        } else {
          card.classList.add('is-hidden');
        }
      });

      // No results message
      if (noResults) {
        noResults.hidden = visibleCount > 0;
      }
    });
  });

  // ── STATS COUNTER ──
  function animateCounter(el) {
    const raw = el.textContent.trim();
    const hasPlus = raw.includes('+');
    const hasPct = raw.includes('%');
    const target = parseInt(raw);
    if (isNaN(target)) return;

    let count = 0;
    const step = Math.ceil(target / 40);
    const suffix = hasPlus ? '+' : hasPct ? '%' : '';

    const timer = setInterval(() => {
      count += step;
      if (count >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = count + suffix;
      }
    }, 30);
  }

  const statsStrip = document.querySelector('.stats-strip');
  if (statsStrip) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.num').forEach(animateCounter);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statsObserver.observe(statsStrip);
  }

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

});