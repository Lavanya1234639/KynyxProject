/* =========================================================
   Kynyx Solutions — main.js
   Mobile nav, active link highlighting, multi-direction
   scroll reveal, ripple effects, animated counters,
   contact form handling, header scroll state
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      navToggle.classList.toggle("is-active", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    /* Close mobile nav when a link is clicked */
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        navToggle.classList.remove("is-active");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Header background state on scroll (glassmorphism trigger) ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var handleScroll = function () {
      if (window.scrollY > 12) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  /* ---------- Multi-direction scroll reveal ----------
     Default direction is "up" (fade-up). Elements can opt into a
     different entrance by setting data-reveal="left|right|zoom|scale"
     directly in HTML. Grid/row siblings are staggered automatically
     so groups of cards animate in sequence rather than all at once. */
  var revealGroups = [
    { selector: ".service-card", stagger: true },
    { selector: ".project-card", stagger: true },
    { selector: ".why-card", stagger: true },
    { selector: ".value-card", stagger: true },
    { selector: ".team-card", stagger: true },
    { selector: ".process-step", stagger: true },
    { selector: ".feature-item", stagger: true },
    { selector: ".mv-card", stagger: true },
    { selector: ".about-copy", stagger: false, defaultDirection: "left" },
    { selector: ".split-visual", stagger: false, defaultDirection: "right" },
    { selector: ".section-head", stagger: false },
    { selector: ".stats-strip .stat", stagger: true },
    { selector: ".contact-form", stagger: false, defaultDirection: "right" },
    { selector: ".contact-info", stagger: false, defaultDirection: "left" }
  ];

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealGroups.forEach(function (group) {
      var els = document.querySelectorAll(group.selector);
      els.forEach(function (el, index) {
        /* Respect an explicit data-reveal already set in HTML; otherwise
           apply the group default (or plain fade-up via .reveal). */
        if (!el.hasAttribute("data-reveal")) {
          if (group.defaultDirection) {
            el.setAttribute("data-reveal", group.defaultDirection);
          } else {
            el.classList.add("reveal");
          }
        }

        if (group.stagger) {
          var delay = Math.min(index * 90, 360); // cap so long lists don't lag forever
          el.style.transitionDelay = delay + "ms";
        }

        observer.observe(el);
      });
    });
  }

  /* ---------- Animated stat counters ---------- */
  var statEls = document.querySelectorAll(".stat .num[data-count]");
  if ("IntersectionObserver" in window && statEls.length) {
    var statObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    statEls.forEach(function (el) {
      statObserver.observe(el);
    });
  }

  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1100;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = (target * eased).toFixed(target % 1 !== 0 ? 1 : 0);
      el.textContent = current + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
        /* tiny settle-pop once the count lands, purely cosmetic */
        el.classList.add("is-counted");
        window.setTimeout(function () {
          el.classList.remove("is-counted");
        }, 450);
      }
    }
    window.requestAnimationFrame(step);
  }

  /* ---------- Button ripple effect ----------
     Applies to any .btn (primary or outline) on click — a small circle
     expands from the pointer position and fades out via CSS animation. */
  document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement("span");
      var size = Math.max(rect.width, rect.height);

      ripple.className = "btn-ripple";
      ripple.style.width = size + "px";
      ripple.style.height = size + "px";
      ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
      ripple.style.top = (e.clientY - rect.top - size / 2) + "px";

      btn.appendChild(ripple);
      window.setTimeout(function () {
        ripple.remove();
      }, 650);
    });
  });

  /* ---------- Contact form handling (front-end only) ---------- */
  var contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var statusEl = contactForm.querySelector(".form-status");
      var nameField = contactForm.querySelector("#name");
      var emailField = contactForm.querySelector("#email");
      var messageField = contactForm.querySelector("#message");

      clearFieldError(nameField);
      clearFieldError(emailField);
      clearFieldError(messageField);

      var hasError = false;

      if (!nameField.value.trim()) {
        markFieldError(nameField);
        hasError = true;
      }
      if (!emailField.value.trim() || !isValidEmail(emailField.value.trim())) {
        markFieldError(emailField);
        hasError = true;
      }
      if (!messageField.value.trim()) {
        markFieldError(messageField);
        hasError = true;
      }

      if (hasError) {
        var firstInvalid = (!emailField.value.trim() || !isValidEmail(emailField.value.trim()))
          ? "Please enter a valid email address."
          : "Please fill in all required fields.";
        showStatus(statusEl, firstInvalid, false);
        return;
      }

      /* No backend wired up yet — confirm receipt locally. */
      showStatus(statusEl, "Thanks! Your message has been received. We'll reply within 1 business day.", true);
      contactForm.reset();
    });

    /* Clear the error state as soon as the person starts correcting a field */
    contactForm.querySelectorAll("input, textarea").forEach(function (input) {
      input.addEventListener("input", function () {
        clearFieldError(input);
      });
    });
  }

  function markFieldError(input) {
    var field = input.closest(".field");
    if (field) field.classList.add("field-error");
  }

  function clearFieldError(input) {
    var field = input.closest(".field");
    if (field) field.classList.remove("field-error");
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function showStatus(el, message, isSuccess) {
    if (!el) return;
    el.textContent = message;
    el.classList.toggle("success", isSuccess);
    el.classList.add("is-visible");
  }

  /* ---------- Set active nav link based on current page ---------- */
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
});