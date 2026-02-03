// Einfaches Script für mobile Navigation und Formular-Feedback

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle (Basis-Logik)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.classList.replace('fa-times', 'fa-bars');
        });
    });

    // Kontaktformular Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simuliertes Senden
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Wird gesendet...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Vielen Dank! Ihre Nachricht wurde (simuliert) gesendet.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1000);
        });
    }

    // Smooth Scroll Offset (für den Fixed Header)
    window.addEventListener('hashchange', () => {
        const offset = 80;
        window.scrollBy(0, -offset);
    });
});
