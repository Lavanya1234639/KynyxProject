// Central Javascript logic for Kynyx Agency Website
// Features: Mobile navbar toggle, Interactive card hover tracking, Smooth scrolling, Active link tracking (ScrollSpy)

document.addEventListener("DOMContentLoaded", function() {
    // 1. Mobile Menu Toggle
    var hamburger = document.getElementById("hamburger");
    var navLinks = document.getElementById("navLinks");

<<<<<<< HEAD
    // Check if both elements are present before adding event listeners
=======
>>>>>>> 6f6ee16 (Features Section Completed)
    if (hamburger && navLinks) {
        // Toggle menu visibility when hamburger button is clicked
        hamburger.addEventListener("click", function() {
            navLinks.classList.toggle("show");
        });

        // Close mobile menu when a navigation link is clicked
        var links = navLinks.getElementsByTagName("a");
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", function() {
                if (navLinks.classList.contains("show")) {
                    navLinks.classList.remove("show");
                }
            });
        }
    }

    // 2. Interactive Card Hover Glow Effect
    var cards = document.querySelectorAll(".feature-card");
    cards.forEach(function(card) {
        card.addEventListener("mousemove", function(e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left; // x position within the element
            var y = e.clientY - rect.top;  // y position within the element

            card.style.setProperty("--mouse-x", x + "px");
            card.style.setProperty("--mouse-y", y + "px");
        });
    });

    // 3. Smooth Scrolling
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(anchor) {
        anchor.addEventListener("click", function(e) {
            var targetId = this.getAttribute("href");
            if (targetId === "#") return;
            
            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // 4. ScrollSpy: Highlight active navigation link
    var sections = document.querySelectorAll("section[id]");
    function scrollSpy() {
        var scrollY = window.pageYOffset;

        sections.forEach(function(current) {
            var sectionHeight = current.offsetHeight;
            var sectionTop = current.offsetTop - 100; // Offset for sticky header
            var sectionId = current.getAttribute("id");
            var navLink = document.querySelector('.nav-links a[href*="' + sectionId + '"]');

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    // Remove active class from all links
                    document.querySelectorAll(".nav-links a").forEach(function(link) {
                        link.classList.remove("active");
                    });
                    navLink.classList.add("active");
                }
            }
        });

        // Special case for top of page
        if (scrollY < 100) {
            document.querySelectorAll(".nav-links a").forEach(function(link) {
                link.classList.remove("active");
            });
            var homeLink = document.querySelector('.nav-links a[href="#"]');
            if (homeLink) homeLink.classList.add("active");
        }
    }

    window.addEventListener("scroll", scrollSpy);
    scrollSpy(); // Initial call
});
