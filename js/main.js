// Simple Javascript for Mobile Navbar Toggle
// Created by Kynyx Development Team

document.addEventListener("DOMContentLoaded", function() {
    var hamburger = document.getElementById("hamburger");
    var navLinks = document.getElementById("navLinks");

    // Check if both elements are present before adding event listeners
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
});
