/* =========================================================
   Kynyx Solutions — contact.js
   Standalone script for contact.html
   Mobile nav, active link highlighting, header scroll state,
   contact form validation and submit handling
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

  /* ---------- Header background state on scroll ---------- */
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

  /* ---------- Contact form handling (front-end only) ---------- */
  var contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var statusEl = contactForm.querySelector(".form-status");
      var nameField = contactForm.querySelector("#name");
      var emailField = contactForm.querySelector("#email");
      var messageField = contactForm.querySelector("#message");

      if (!nameField.value.trim() || !emailField.value.trim() || !messageField.value.trim()) {
        showStatus(statusEl, "Please fill in all required fields.", "error");
        return;
      }

      if (!isValidEmail(emailField.value.trim())) {
        showStatus(statusEl, "Please enter a valid email address.", "error");
        return;
      }

      /* No backend wired up yet — confirm receipt locally. */
      showStatus(statusEl, "Thanks! Your message has been received. We'll reply within 1 business day.", "success");
      contactForm.reset();
    });
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function showStatus(el, message, type) {
    if (!el) return;
    el.textContent = message;
    el.classList.remove("success", "error");
    el.classList.add(type);
  }

  /* ---------- Set active nav link based on current page ---------- */
  var currentPage = window.location.pathname.split("/").pop() || "contact.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
});