// Scroll Reveal Logic using Intersection Observer for better performance
const setupReveal = () => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Option to unobserve after reveal
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach(el => observer.observe(el));
};

// Scroll to Top Logic
const setupScrollToTop = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const headerBtn = document.getElementById('header-top-btn');
    const floatingBtn = document.getElementById('floating-top-btn');

    if (headerBtn) headerBtn.addEventListener('click', scrollToTop);
    if (floatingBtn) floatingBtn.addEventListener('click', scrollToTop);

    window.addEventListener('scroll', () => {
        if (floatingBtn) {
            if (window.scrollY > 600) {
                floatingBtn.classList.add('show');
            } else {
                floatingBtn.classList.remove('show');
            }
        }
    });

    // Header Blur/Shadow on Scroll
    const mainNav = document.querySelector('.main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            mainNav.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
        } else {
            mainNav.style.boxShadow = 'none';
        }
    });
};

// Initialize everything on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    setupReveal();
    setupScrollToTop();
    setupModals();
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Modal Control
const setupModals = () => {
    const openModal = (id) => {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    };

    const closeModal = (modal) => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Event listeners for footer links
    document.querySelector('a[href="#privacy-modal"]').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('privacy-modal');
    });

    document.querySelector('a[href="#affiliate-modal"]').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('affiliate-modal');
    });

    // Close buttons logic
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(btn.closest('.modal-overlay'));
        });
    });

    // Close on click outside
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });
};
