// script.js - Portfolio site JavaScript

// Hamburger menu toggle for mobile nav
function toggleMenu() {
    const navList = document.getElementById('main-nav-list');
    const hamburger = document.querySelector('.hamburger');
    if (navList && hamburger) {
        navList.classList.toggle('active');
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !expanded);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                toggleMenu();
            }
        });
    }

    // Smooth scrolling for nav links
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                // Close menu on mobile after click
                const navList = document.getElementById('main-nav-list');
                if (navList && navList.classList.contains('active')) {
                    toggleMenu();
                }
            }
        });
    });
    // Project filter feature
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectArticles = document.querySelectorAll('#projects article');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.setAttribute('aria-pressed', 'false'));
            this.setAttribute('aria-pressed', 'true');
            const filter = this.getAttribute('data-filter');
            projectArticles.forEach(article => {
                if (filter === 'all' || article.getAttribute('data-category') === filter) {
                    article.style.display = '';
                } else {
                    article.style.display = 'none';
                }
            });
        });
    });

    // Lightbox effect for project images
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    document.querySelectorAll('.project-img').forEach(img => {
        img.addEventListener('click', function() {
            if (lightboxModal && lightboxImg) {
                lightboxImg.src = this.src;
                lightboxImg.alt = this.alt;
                lightboxModal.style.display = 'flex';
                lightboxModal.focus();
            }
        });
    });
    if (lightboxClose && lightboxModal) {
        lightboxClose.addEventListener('click', function() {
            lightboxModal.style.display = 'none';
            lightboxImg.src = '';
        });
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === lightboxModal) {
                lightboxModal.style.display = 'none';
                lightboxImg.src = '';
            }
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightboxModal.style.display === 'flex') {
                lightboxModal.style.display = 'none';
                lightboxImg.src = '';
            }
        });
    }
    // Contact form validation
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        const nameInput = contactForm.querySelector('#name');
        const emailInput = contactForm.querySelector('#email');
        const messageInput = contactForm.querySelector('#message');

        function showError(input, message) {
            let error = input.parentElement.querySelector('.form-error');
            if (!error) {
                error = document.createElement('div');
                error.className = 'form-error';
                error.style.color = '#c00';
                error.style.fontSize = '0.95em';
                error.style.marginTop = '0.2em';
                input.parentElement.appendChild(error);
            }
            error.textContent = message;
            input.setAttribute('aria-invalid', 'true');
        }

        function clearError(input) {
            let error = input.parentElement.querySelector('.form-error');
            if (error) error.remove();
            input.removeAttribute('aria-invalid');
        }

        function validateName() {
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Name is required.');
                return false;
            }
            clearError(nameInput);
            return true;
        }
        function validateEmail() {
            const value = emailInput.value.trim();
            const valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
            if (!value) {
                showError(emailInput, 'Email is required.');
                return false;
            } else if (!valid) {
                showError(emailInput, 'Please enter a valid email address.');
                return false;
            }
            clearError(emailInput);
            return true;
        }
        function validateMessage() {
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Message is required.');
                return false;
            }
            clearError(messageInput);
            return true;
        }

        nameInput.addEventListener('input', validateName);
        emailInput.addEventListener('input', validateEmail);
        messageInput.addEventListener('input', validateMessage);

        contactForm.addEventListener('submit', function(e) {
            let valid = true;
            if (!validateName()) valid = false;
            if (!validateEmail()) valid = false;
            if (!validateMessage()) valid = false;
            if (!valid) {
                e.preventDefault();
            }
        });
    }
});
