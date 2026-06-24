/* =========================================================
   Kynyx Solutions — projects.js
   Standalone script for projects.html
   Mobile nav, active link highlighting, scroll reveal,
   header scroll state, project category filtering
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

  /* ---------- Scroll reveal for project cards ---------- */
  var revealEls = document.querySelectorAll(".project-card");

  if ("IntersectionObserver" in window && revealEls.length) {
    revealEls.forEach(function (el) {
      el.classList.add("reveal");
    });

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

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Project category filtering ---------- */
  var filterTabs = document.querySelectorAll(".filter-tab");
  var projectCards = document.querySelectorAll(".project-card");
  var noResultsEl = document.querySelector(".no-results");

  if (filterTabs.length && projectCards.length) {
    filterTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        filterTabs.forEach(function (t) {
          t.classList.remove("active");
        });
        tab.classList.add("active");

        var filter = tab.getAttribute("data-filter");
        var visibleCount = 0;

        projectCards.forEach(function (card) {
          var category = card.getAttribute("data-category");
          var shouldShow = filter === "all" || category === filter;
          card.classList.toggle("is-hidden", !shouldShow);
          if (shouldShow) visibleCount++;
        });

        if (noResultsEl) {
          noResultsEl.hidden = visibleCount > 0;
        }
      });
    });
  }

  /* ---------- Set active nav link based on current page ---------- */
  var currentPage = window.location.pathname.split("/").pop() || "projects.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
});