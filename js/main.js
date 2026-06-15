/**
 * Kynyx Solutions - Main JavaScript file
 * Handles interactive navigation, mobile menu toggling, and scroll-triggered animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const siteHeader = document.getElementById('siteHeader');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // ==========================================
    // 1. Sticky Header Scroll Effect
    // ==========================================
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Run once on load to ensure state correctness

    // ==========================================
    // 2. Mobile Navigation Drawer Toggle
    // ==========================================
    const toggleMobileMenu = () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scrolling when menu is active
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    menuToggle.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // ==========================================
    // 3. Scrollspy - Highlight Active Nav Link
    // ==========================================
    const handleScrollspy = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 100; // Offset for sticky header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    };

    window.addEventListener('scroll', handleScrollspy);
    handleScrollspy(); // Initial check

    // ==========================================
    // 4. Subtle Slide Reveal Animations on Load
    // ==========================================
    const animateHeroOnLoad = () => {
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 150);
        }

        if (heroVisual) {
            heroVisual.style.opacity = '0';
            heroVisual.style.transform = 'translateY(40px)';
            heroVisual.style.transition = 'opacity 1s ease 0.2s, transform 1s ease 0.2s';
            
            setTimeout(() => {
                heroVisual.style.opacity = '1';
                heroVisual.style.transform = 'translateY(0)';
            }, 300);
        }
    };

    animateHeroOnLoad();
});
