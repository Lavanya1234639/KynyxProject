

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

    // Contact Form Handler
    var contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();

            // Get form values
            var name = document.getElementById("name").value.trim();
            var email = document.getElementById("email").value.trim();
            var subject = document.getElementById("subject").value.trim();
            var message = document.getElementById("message").value.trim();
            var formMessage = document.getElementById("formMessage");

            // Validation
            if (!name || !email || !subject || !message) {
                showMessage("Please fill in all fields.", "error");
                return;
            }

            // Email validation
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage("Please enter a valid email address.", "error");
                return;
            }

            // Store form data in localStorage (simulating backend storage)
            var formData = {
                name: name,
                email: email,
                subject: subject,
                message: message,
                timestamp: new Date().toLocaleString()
            };

            // Get existing submissions or create new array
            var submissions = JSON.parse(localStorage.getItem("contactSubmissions")) || [];
            submissions.push(formData);
            localStorage.setItem("contactSubmissions", JSON.stringify(submissions));

            // Show success message
            showMessage("Message sent successfully! We'll get back to you soon.", "success");

            // Reset form
            contactForm.reset();

            // Hide message after 5 seconds
            setTimeout(function() {
                formMessage.classList.remove("show");
            }, 5000);
        });
    }

    // Function to display messages
    function showMessage(text, type) {
        var formMessage = document.getElementById("formMessage");
        formMessage.textContent = text;
        formMessage.className = "form-message show " + type;
    }
    
});
const cards = document.querySelectorAll(".testimonial-card");

const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

cards.forEach((card)=>{
    card.classList.add("hidden");
    observer.observe(card);
});
const featureCards =
document.querySelectorAll(".feature-card");

const observer =
new IntersectionObserver((entries)=>{

entries.forEach((entry)=>{

if(entry.isIntersecting){
entry.target.classList.add("show");
}

});

});

featureCards.forEach((card)=>{
card.classList.add("hidden");
observer.observe(card);
});
