// Mobile Admin Panel Responsive Functions
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu toggle button if not exists
    if (!document.querySelector('.mobile-menu-toggle')) {
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        mobileToggle.style.cssText = `
            display: none;
            position: fixed;
            top: 1rem;
            right: 1rem;
            background: #1e293b;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0.75rem;
            z-index: 1002;
            cursor: pointer;
            font-size: 1.25rem;
        `;
        document.body.appendChild(mobileToggle);
    }
    
    const sidebar = document.querySelector('.sidebar');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    // Function to check if mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Initialize mobile state
    function initMobileState() {
        if (isMobile() && sidebar) {
            mobileToggle.style.display = 'block';
            sidebar.classList.add('mobile-hidden');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        } else {
            mobileToggle.style.display = 'none';
            if (sidebar) sidebar.classList.remove('mobile-hidden');
        }
    }
    
    // Toggle mobile sidebar
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-hidden');
            const icon = this.querySelector('i');
            if (sidebar.classList.contains('mobile-hidden')) {
                icon.className = 'fas fa-bars';
            } else {
                icon.className = 'fas fa-times';
            }
        });
    }
    
    // Close sidebar when clicking a link on mobile
    if (sidebar) {
        sidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (isMobile()) {
                    sidebar.classList.add('mobile-hidden');
                    mobileToggle.querySelector('i').className = 'fas fa-bars';
                }
            });
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', initMobileState);
    
    // Initial call
    initMobileState();
    
    // Touch-friendly enhancements
    document.querySelectorAll('input, select, textarea').forEach(el => {
        // Add larger touch targets on mobile
        if (isMobile()) {
            el.style.minHeight = '44px';
            el.style.fontSize = '16px'; // Prevent iOS zoom
        }
    });
    
    // Larger touch targets for buttons
    document.querySelectorAll('.btn, button').forEach(btn => {
        if (isMobile()) {
            btn.style.minHeight = '44px';
            btn.style.padding = '12px 16px';
        }
    });
    
    // Form optimization for mobile
    document.querySelectorAll('form').forEach(form => {
        // Add proper spacing between form elements on mobile
        if (isMobile()) {
            const formGroups = form.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.style.marginBottom = '20px';
            });
        }
    });
    
    // Message cards optimization for mobile
    const messageCards = document.querySelectorAll('.message-card, .settings-card');
    messageCards.forEach(card => {
        // Add touch-friendly padding
        if (isMobile()) {
            card.style.padding = '16px';
            card.style.marginBottom = '12px';
        }
    });
});

// Form validation for mobile
function validateMobileForm(form) {
    if (window.innerWidth <= 768) {
        // On mobile, show validation messages more prominently
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ef4444';
                // Add error message
                let errorMsg = input.parentElement.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 4px;';
                    input.parentElement.appendChild(errorMsg);
                }
                errorMsg.textContent = 'Dieses Feld ist erforderlich';
                isValid = false;
            } else {
                input.style.borderColor = '';
                const errorMsg = input.parentElement.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            }
        });
        
        return isValid;
    }
    return true;
}

// Swipe detection for mobile sidebar
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    if (window.innerWidth <= 768) {
        touchStartX = e.changedTouches[0].screenX;
    }
});

document.addEventListener('touchend', function(e) {
    if (window.innerWidth <= 768) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }
});

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - close sidebar
        const sidebar = document.querySelector('.sidebar');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (sidebar && mobileToggle && !sidebar.classList.contains('mobile-hidden')) {
            sidebar.classList.add('mobile-hidden');
            mobileToggle.querySelector('i').className = 'fas fa-bars';
        }
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - open sidebar
        const sidebar = document.querySelector('.sidebar');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (sidebar && mobileToggle && sidebar.classList.contains('mobile-hidden')) {
            sidebar.classList.remove('mobile-hidden');
            mobileToggle.querySelector('i').className = 'fas fa-times';
        }
    }
}

// Add CSS for mobile admin panel
const mobileAdminCSS = `
@media (max-width: 768px) {
    .sidebar.mobile-hidden {
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        position: fixed;
        height: 100vh;
        z-index: 1001;
        top: 0;
        left: 0;
    }
    
    .sidebar:not(.mobile-hidden) {
        transform: translateX(0);
        transition: transform 0.3s ease;
    }
    
    .main-content {
        margin-left: 0 !important;
    }
    
    .message-card, .settings-card {
        margin: 12px -16px;
        border-radius: 0;
        border-left: none;
        border-right: none;
    }
    
    /* Improve tap targets */
    .sidebar ul li a {
        min-height: 48px;
        display: flex;
        align-items: center;
    }
    
    /* Better form layout */
    .form-group label {
        font-size: 1rem;
        margin-bottom: 8px;
    }
    
    .form-group input, .form-group select {
        font-size: 16px !important; /* Prevent iOS zoom */
        height: 48px;
    }
}

/* High DPI screen adjustments */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .btn, button {
        font-weight: 600; /* Better readability on retina */
    }
}

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
    .sidebar {
        transition: none;
    }
}
`;

// Inject mobile admin CSS
if (!document.querySelector('#mobile-admin-css')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'mobile-admin-css';
    styleEl.textContent = mobileAdminCSS;
    document.head.appendChild(styleEl);
}