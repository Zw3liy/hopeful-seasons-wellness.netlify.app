// Main JavaScript - Hopeful Seasons Wellness
// 1:1 replica of live + accessibility enhancements
document.addEventListener('DOMContentLoaded', function () {

    // Smooth scroll for anchor links (live exact)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = document.getElementById('site-header') ? document.getElementById('site-header').offsetHeight : 78;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 20;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const mainNav = document.getElementById('main-nav');
                const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.classList.remove('active');
                        mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    }
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // Current year for copyright - supports multiple placeholders
    document.querySelectorAll('#current-year').forEach(span => {
        span.textContent = new Date().getFullYear();
    });

    // Lazy loading images (live)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                        img.removeAttribute('data-srcset');
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '80px 0px', threshold: 0.01 });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Form validation (live)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            if (!this.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                const inputs = this.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    if (!input.checkValidity()) {
                        input.classList.add('invalid');
                    }
                });
                const firstInvalid = this.querySelector('.invalid');
                if (firstInvalid) {
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstInvalid.focus();
                }
            }
            this.classList.add('was-validated');
        });

        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function () {
                if (this.classList.contains('invalid')) {
                    this.classList.remove('invalid');
                }
            });
        });
    });

    // Back to top button (live exact + enhanced with throttle)
    let backToTopButton = document.querySelector('.back-to-top');
    if (!backToTopButton) {
        backToTopButton = document.createElement('button');
        backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
        backToTopButton.className = 'back-to-top';
        backToTopButton.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backToTopButton);
    }

    const toggleBackToTop = () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', throttle(toggleBackToTop, 100), { passive: true });
    toggleBackToTop();

    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add styles for back to top button (live exact style injection)
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            opacity: 0;
            visibility: hidden;
            transition: all var(--transition-normal);
            z-index: var(--z-fixed);
            box-shadow: var(--shadow-lg);
        }
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        .back-to-top:hover {
            background-color: var(--primary-dark);
            transform: translateY(-3px);
        }
    `;
    // Only inject if not already present (avoid duplicate)
    if (!document.getElementById('back-to-top-styles')) {
        style.id = 'back-to-top-styles';
        document.head.appendChild(style);
    }

    // Initialize animations
    initAnimations();

    // Initialize Testimonials Swiper (live exact: spaceBetween 30, delay 5000)
    if (document.querySelector('.testimonials-slider') && typeof Swiper !== 'undefined') {
        new Swiper('.testimonials-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 1,
                },
                1024: {
                    slidesPerView: 1,
                },
            }
        });
    }

    // FAQ Accordion Logic (live exact)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        // Accessibility
        const answer = item.querySelector('.faq-answer');
        if (answer && !answer.id) {
            answer.id = 'faq-answer-' + Math.random().toString(36).substr(2, 9);
        }
        question.setAttribute('role', 'button');
        question.setAttribute('tabindex', '0');
        question.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');
        if (answer) question.setAttribute('aria-controls', answer.id);

        const toggle = () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const oq = otherItem.querySelector('.faq-question');
                if (oq) oq.setAttribute('aria-expanded', 'false');
            });
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            } else {
                question.setAttribute('aria-expanded', 'false');
            }
        };

        question.addEventListener('click', toggle);
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    });
});

// Animation function (live exact + improved threshold)
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll, .service-card, .about-teaser-image, .testimonial-card, .resource-card').forEach(el => {
        observer.observe(el);
    });
}

// Utility: debounce (live)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utility: throttle (enhancement)
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
