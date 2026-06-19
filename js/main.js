const menuToggle =
document.getElementById("menu-toggle");

const navLinks =
document.getElementById("nav-links");

menuToggle.addEventListener("click",()=>{

navLinks.classList.toggle("active");

});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function(e){

        e.preventDefault();

        document.querySelector(
            this.getAttribute('href')
        ).scrollIntoView({

            behavior:'smooth'

        });

    });

});

// ===========================
// Contact Form Validation
// ===========================

const form =
document.getElementById("contactForm");

if(form){

form.addEventListener("submit",function(e){

e.preventDefault();

const name =
document.getElementById("name").value.trim();

const email =
document.getElementById("email").value.trim();

const subject =
document.getElementById("subject").value.trim();

const message =
document.getElementById("message").value.trim();

const emailPattern =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(name === ""){

alert("Please enter your name.");
return;

}

if(!emailPattern.test(email)){

alert("Please enter a valid email.");
return;

}

if(subject === ""){

alert("Please enter a subject.");
return;

}

if(message === ""){

alert("Please enter your message.");
return;

}

alert(
"Thank you! Your message has been submitted successfully."
);

form.reset();

});

}

// ===========================
// Scroll Reveal Animation
// ===========================

const observer =
new IntersectionObserver((entries)=>{

entries.forEach((entry)=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:0.15
});

const elements =
document.querySelectorAll(
'.feature-card, .service-box, .project-card, .testimonial-card'
);

elements.forEach((el)=>{

el.classList.add("hidden");

observer.observe(el);

});