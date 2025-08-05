document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initSmoothScrolling();
    initTierCards();
    initVideoControls();
    initScrollIndicator();
    initTestimonialSlider();
    initContactForm();
    initCalculator();
    initBeforeAfterSlider();
    initHoverEffects();
});

// Preloader
function initPreloader() {
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
}



// Smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Tier card interactions
function initTierCards() {
    const tierCards = document.querySelectorAll('.tier-card');
    tierCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.tier-front').style.transform = 'rotateY(180deg)';
            this.querySelector('.tier-back').style.transform = 'rotateY(360deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.tier-front').style.transform = 'rotateY(0)';
            this.querySelector('.tier-back').style.transform = 'rotateY(180deg)';
        });

        // Add click handler for tier details
        const detailsBtn = card.querySelector('.tier-details');
        if (detailsBtn) {
            detailsBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const tier = card.dataset.tier;
                showTierModal(tier);
            });
        }
    });
}

// Video controls
function initVideoControls() {
    const heroVideo = document.getElementById('heroVideo');
    
    // Mute toggle with 'm' key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'm' || e.key === 'M') {
            heroVideo.muted = !heroVideo.muted;
        }
    });

    // Click to mute/unmute
    heroVideo.addEventListener('click', function() {
        this.muted = !this.muted;
    });
}

// Scroll indicator
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator span');
    if (!scrollIndicator) return;

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        
        const scrollPercent = (scrollPosition / (docHeight - windowHeight)) * 100;
        scrollIndicator.style.width = scrollPercent + '%';
    });
}

// Testimonial slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    const dots = document.querySelector('.testimonial-dots');
    
    if (!testimonials.length) return;

    let currentIndex = 0;

    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => showTestimonial(index));
        if (index === 0) dot.classList.add('active');
        dots.appendChild(dot);
    });

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        document.querySelectorAll('.testimonial-dots span').forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots.children[index].classList.add('active');
        currentIndex = index;
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }

    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    }

    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);

    // Auto-advance testimonials
    setInterval(nextTestimonial, 5000);
}

// Contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Calculator functionality
function initCalculator() {
    const squareMeters = document.getElementById('square-meters');
    const metersValue = document.getElementById('meters-value');
    const tierOptions = document.querySelectorAll('.tier-option input');
    const smartHomeToggle = document.getElementById('smart-home');
    const totalCost = document.getElementById('total-cost');
    
    if (!squareMeters || !totalCost) return;

    const prices = {
        'premium-eco': 250,
        'premium': 350,
        'luxury': 450,
        'ultra-luxury': 750
    };

    function calculateCost() {
        const meters = parseInt(squareMeters.value);
        const selectedTier = document.querySelector('.tier-option input:checked');
        if (!selectedTier) return;
        
        const tier = selectedTier.parentElement.dataset.tier;
        const smartHome = smartHomeToggle.checked;
        
        let cost = meters * prices[tier];
        if (smartHome) cost += meters * 100; // Additional smart home cost
        
        // Animate the cost change
        animateCounter(totalCost, cost);
    }

    function animateCounter(element, targetValue) {
        const startValue = parseInt(element.textContent.replace(/,/g, '')) || 0;
        const duration = 1000;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    squareMeters.addEventListener('input', function() {
        metersValue.textContent = this.value;
        calculateCost();
    });

    tierOptions.forEach(option => {
        option.addEventListener('change', calculateCost);
    });

    smartHomeToggle.addEventListener('change', calculateCost);

    // Initialize calculator
    calculateCost();
}

// Before/After slider
function initBeforeAfterSlider() {
    const slider = document.querySelector('.comparison-slider .slider');
    const afterImage = document.querySelector('.comparison-slider .after');
    const beforeImage = document.querySelector('.comparison-slider .before');
    
    if (!slider || !afterImage || !beforeImage) {
        console.log('Before/After slider elements not found');
        return;
    }

    // Set initial position
    slider.value = 50;
    document.documentElement.style.setProperty('--slider-position', '50%');

    // Handle slider input
    slider.addEventListener('input', function() {
        const value = this.value;
        document.documentElement.style.setProperty('--slider-position', value + '%');
    });

    // Handle mouse/touch events for better interaction
    let isDragging = false;

    slider.addEventListener('mousedown', function() {
        isDragging = true;
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const sliderRect = slider.getBoundingClientRect();
        const x = e.clientX - sliderRect.left;
        const percentage = (x / sliderRect.width) * 100;
        const clampedPercentage = Math.max(0, Math.min(100, percentage));
        
        slider.value = clampedPercentage;
        document.documentElement.style.setProperty('--slider-position', clampedPercentage + '%');
    });

    // Touch events for mobile
    slider.addEventListener('touchstart', function() {
        isDragging = true;
    });

    document.addEventListener('touchend', function() {
        isDragging = false;
    });

    document.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const touch = e.touches[0];
        const sliderRect = slider.getBoundingClientRect();
        const x = touch.clientX - sliderRect.left;
        const percentage = (x / sliderRect.width) * 100;
        const clampedPercentage = Math.max(0, Math.min(100, percentage));
        
        slider.value = clampedPercentage;
        document.documentElement.style.setProperty('--slider-position', clampedPercentage + '%');
    });

    console.log('Before/After slider initialized');
}



// Hover effects
function initHoverEffects() {
    // Add hover classes to elements
    const hoverElements = document.querySelectorAll('.included-item, .brand-logo, .timeline-content');
    hoverElements.forEach(el => {
        el.classList.add('hover-lift');
    });

    // Add glow effect to CTAs
    const ctaButtons = document.querySelectorAll('.hero-cta, .calculator-cta, .submit-btn');
    ctaButtons.forEach(btn => {
        btn.classList.add('glow-effect');
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #4CAF50;' : 'background: #2196F3;'}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

function showTierModal(tier) {
    // Create modal for tier details
    const modal = document.createElement('div');
    modal.className = 'tier-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${tier.charAt(0).toUpperCase() + tier.slice(1).replace('-', ' ')} Details</h2>
            <div class="modal-body">
                <p>Detailed specifications and features for the ${tier} package will be displayed here.</p>
                <button class="modal-cta">Request Quote</button>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        position: relative;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 100);
    
    // Close modal
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBtn.click();
        }
    });
}

// Performance optimization
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

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    // Handle scroll-based animations
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Add loading states
function addLoadingState(element) {
    element.classList.add('loading');
    element.disabled = true;
}

function removeLoadingState(element) {
    element.classList.remove('loading');
    element.disabled = false;
}