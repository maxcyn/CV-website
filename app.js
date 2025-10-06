// DOM elements
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const downloadBtn = document.getElementById('downloadBtn');
const cvModal = document.getElementById('cvModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalCancel = document.getElementById('modalCancel');
const contactForm = document.getElementById('contactForm');

// Mobile menu toggle
function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
}

// Close mobile menu
function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Smooth scrolling for navigation links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Navbar scroll effect
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.card, .hero-content');
    
    elements.forEach(element => {
        if (!element.classList.contains('fade-in')) {
            element.classList.add('fade-in');
        }
        
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Modal functions
function openModal() {
    cvModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    cvModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link with form data
    const subject = `Message from ${name} - CV Website`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:chongyn.max@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open default email client
    window.open(mailtoLink);
    
    // Show success message
    alert('Thank you for your message! Your default email client should now open with the message pre-filled.');
    
    // Reset form
    contactForm.reset();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initial animations
    setTimeout(() => {
        animateOnScroll();
    }, 100);
    
    // Make hero content visible immediately
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in', 'visible');
    }
});

// Mobile menu toggle
mobileMenu.addEventListener('click', toggleMobileMenu);

// Navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScroll(target);
        closeMobileMenu();
    });
});

// Scroll events
window.addEventListener('scroll', function() {
    handleNavbarScroll();
    updateActiveNavLink();
    animateOnScroll();
});

// Modal events
downloadBtn.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
modalCancel.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !cvModal.classList.contains('hidden')) {
        closeModal();
    }
});

// Contact form
contactForm.addEventListener('submit', handleContactForm);

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Prevent mobile menu from closing when clicking inside it
navMenu.addEventListener('click', function(e) {
    e.stopPropagation();
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Initialize page
window.addEventListener('load', function() {
    // Set initial active nav link
    updateActiveNavLink();
    
    // Ensure hero section is visible
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('visible');
    }
    
    // Add staggered animation to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
            if (card.getBoundingClientRect().top < window.innerHeight) {
                card.classList.add('visible');
            }
        }, index * 100);
    });
});