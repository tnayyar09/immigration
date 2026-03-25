// ========================================
// GLOBALVISA - Complete JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 1500);
        });
        // Fallback - hide after 3 seconds anyway
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 3000);
    }

    // ===== NAVBAR SCROLL =====
    const navbar = document.getElementById('navbar');
    const topBar = document.querySelector('.top-bar');

    function handleScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on page load

    // ===== HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when link clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ===== HERO SLIDER =====
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 1) {
        let currentSlide = 0;
        setInterval(() => {
            heroSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }, 5000);
    }

    // ===== STATS COUNTER =====
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    stat.textContent = target.toLocaleString() + (target < 100 ? '%' : '+');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        });

        statsAnimated = true;
    }

    // Intersection Observer for stats
    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.3 });

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }
    }

    // ===== TESTIMONIAL SLIDER =====
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.getElementById('testimonialDots');
    const testPrev = document.getElementById('testPrev');
    const testNext = document.getElementById('testNext');
    let currentTestimonial = 0;

    if (testimonialCards.length > 0 && testimonialDots) {
        // Create dots
        testimonialCards.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => showTestimonial(i));
            testimonialDots.appendChild(dot);
        });

        function showTestimonial(index) {
            testimonialCards.forEach(card => card.classList.remove('active'));
            document.querySelectorAll('.testimonial-dots .dot').forEach(dot => dot.classList.remove('active'));

            currentTestimonial = index;
            testimonialCards[currentTestimonial].classList.add('active');
            document.querySelectorAll('.testimonial-dots .dot')[currentTestimonial].classList.add('active');
        }

        if (testPrev) {
            testPrev.addEventListener('click', () => {
                let newIndex = currentTestimonial - 1;
                if (newIndex < 0) newIndex = testimonialCards.length - 1;
                showTestimonial(newIndex);
            });
        }

        if (testNext) {
            testNext.addEventListener('click', () => {
                let newIndex = (currentTestimonial + 1) % testimonialCards.length;
                showTestimonial(newIndex);
            });
        }

        // Auto slide
        setInterval(() => {
            let newIndex = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(newIndex);
        }, 6000);
    }

    // ===== SERVICES FILTER =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.sp-card');
    const noResults = document.getElementById('noResults');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            let visibleCount = 0;

            serviceCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });

            // Show/hide no results
            if (noResults) {
                noResults.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        });
    });

    // ===== LIGHTBOX MODAL =====
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxServiceName = document.getElementById('lightboxServiceName');
    const lbServiceHidden = document.getElementById('lbServiceHidden');
    const lightboxForm = document.getElementById('lightboxForm');
    const openButtons = document.querySelectorAll('.open-lightbox');

    openButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceName = this.getAttribute('data-service');
            if (lightboxServiceName) lightboxServiceName.textContent = serviceName;
            if (lbServiceHidden) lbServiceHidden.value = serviceName;
            if (lightboxOverlay) lightboxOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', function(e) {
            if (e.target === lightboxOverlay) {
                closeLightbox();
            }
        });
    }

    function closeLightbox() {
        if (lightboxOverlay) lightboxOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // ===== LIGHTBOX FORM SUBMIT -> WHATSAPP =====
    if (lightboxForm) {
        lightboxForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('lbName').value;
            const phone = document.getElementById('lbPhone').value;
            const email = document.getElementById('lbEmail').value;
            const country = document.getElementById('lbCountry').value;
            const education = document.getElementById('lbEducation').value;
            const experience = document.getElementById('lbExperience').value;
            const ielts = document.getElementById('lbIelts').value;
            const message = document.getElementById('lbMessage').value;
            const service = document.getElementById('lbServiceHidden').value;

            const whatsappMessage = `🌍 *New Enquiry - GlobalVisa*\n\n` +
                `📋 *Service:* ${service}\n` +
                `👤 *Name:* ${name}\n` +
                `📱 *Phone:* ${phone}\n` +
                `📧 *Email:* ${email}\n` +
                `🌐 *Country:* ${country}\n` +
                `🎓 *Education:* ${education}\n` +
                `💼 *Experience:* ${experience || 'Not specified'}\n` +
                `📝 *IELTS/PTE:* ${ielts || 'Not specified'}\n` +
                `💬 *Message:* ${message || 'No additional message'}\n\n` +
                `--- Sent from GlobalVisa Website ---`;

            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/919876543210?text=${encodedMessage}`;

            window.open(whatsappURL, '_blank');
            closeLightbox();
            lightboxForm.reset();
        });
    }

    // ===== ASSESSMENT FORM SUBMIT -> WHATSAPP =====
    const assessmentForm = document.getElementById('assessmentForm');
    if (assessmentForm) {
        assessmentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('assessName').value;
            const phone = document.getElementById('assessPhone').value;
            const email = document.getElementById('assessEmail').value;
            const country = document.getElementById('assessCountry').value;
            const visa = document.getElementById('assessVisa').value;
            const education = document.getElementById('assessEducation').value;
            const message = document.getElementById('assessMessage').value;

            const whatsappMessage = `🌍 *Free Assessment Request - GlobalVisa*\n\n` +
                `👤 *Name:* ${name}\n` +
                `📱 *Phone:* ${phone}\n` +
                `📧 *Email:* ${email}\n` +
                `🌐 *Preferred Country:* ${country}\n` +
                `📋 *Visa Type:* ${visa}\n` +
                `🎓 *Education:* ${education}\n` +
                `💬 *Message:* ${message || 'No additional message'}\n\n` +
                `--- Free Assessment from GlobalVisa Website ---`;

            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/919876543210?text=${encodedMessage}`;

            window.open(whatsappURL, '_blank');
            assessmentForm.reset();
        });
    }

    // ===== CONTACT FORM SUBMIT -> WHATSAPP =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('contactName').value;
            const phone = document.getElementById('contactPhone').value;
            const email = document.getElementById('contactEmail').value;
            const service = document.getElementById('contactService').value;
            const country = document.getElementById('contactCountry').value;
            const message = document.getElementById('contactMessage').value;

            const whatsappMessage = `🌍 *Contact Form - GlobalVisa*\n\n` +
                `👤 *Name:* ${name}\n` +
                `📱 *Phone:* ${phone}\n` +
                `📧 *Email:* ${email}\n` +
                `📋 *Service:* ${service}\n` +
                `🌐 *Country:* ${country}\n` +
                `💬 *Message:* ${message}\n\n` +
                `--- Contact Form from GlobalVisa Website ---`;

            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/919876543210?text=${encodedMessage}`;

            window.open(whatsappURL, '_blank');
            contactForm.reset();
        });
    }

    // ===== BACK TO TOP =====
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== SCROLL REVEAL ANIMATIONS =====
    const revealElements = document.querySelectorAll('.service-card, .country-card, .sp-card, .team-card, .award-card, .ci-card, .mvv-card, .feature-item, .process-step');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== NAVBAR ACTIVE LINK DETECTION =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

});

// ===== FAQ TOGGLE (Global Function) =====
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Close all FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Toggle clicked
    if (!isActive) {
        faqItem.classList.add('active');
    }
}