// GSAP animations for advanced effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    initHeroAnimations();
    
    // Interactive animations
    initInteractiveAnimations();
    
    // Material showcase animations
    initMaterialAnimations();
    
    // Calculator animations
    initCalculatorAnimations();
});

// Hero section animations
function initHeroAnimations() {
    // Set initial state
    gsap.set(['.hero-title', '.hero-subtitle', '.hero-features .feature', '.hero-cta'], {
        opacity: 0,
        y: 30
    });
    
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .to('.hero-title', {
            duration: 1.2,
            y: 0,
            opacity: 1,
            ease: "power3.out"
        })
        .to('.hero-subtitle', {
            duration: 1,
            y: 0,
            opacity: 1,
            ease: "power3.out"
        }, "-=0.8")
        .to('.hero-features .feature', {
            duration: 0.8,
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: "power3.out"
        }, "-=0.6")
        .to('.hero-cta', {
            duration: 0.8,
            y: 0,
            opacity: 1,
            ease: "power3.out"
        }, "-=0.4");
}

// Interactive animations
function initInteractiveAnimations() {
    // Tier card hover animations
    const tierCards = document.querySelectorAll('.tier-card');
    
    tierCards.forEach(card => {
        const front = card.querySelector('.tier-front');
        const back = card.querySelector('.tier-back');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(front, {
                rotationY: 180,
                duration: 0.5,
                ease: "power2.inOut"
            });
            gsap.to(back, {
                rotationY: 0,
                duration: 1,
                ease: "power2.inOut"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(front, {
                rotationY: 0,
                duration: 1,
                ease: "power2.inOut"
            });
            gsap.to(back, {
                rotationY: -180,
                duration: 1,
                ease: "power2.inOut"
            });
        });
    });

    // Brand logo hover effects
    const brandLogos = document.querySelectorAll('.brand-logo');
    
    brandLogos.forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            gsap.to(logo, {
                y: -10,
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(logo.querySelector('img'), {
                filter: "grayscale(0%)",
                opacity: 1,
                duration: 0.3
            });
        });
        
        logo.addEventListener('mouseleave', () => {
            gsap.to(logo, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(logo.querySelector('img'), {
                filter: "grayscale(100%)",
                opacity: 0.7,
                duration: 0.3
            });
        });
    });

    // CTA button hover effects
    const ctaButtons = document.querySelectorAll('.hero-cta, .calculator-cta, .submit-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                y: -5,
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Material showcase animations
function initMaterialAnimations() {
    const materialItems = document.querySelectorAll('.material-item');
    
    materialItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('.material-info'), {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        item.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('.material-info'), {
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Calculator animations
function initCalculatorAnimations() {
    // Animate calculator result changes
    const resultAmount = document.getElementById('total-cost');
    if (resultAmount) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    gsap.from(resultAmount, {
                        scale: 1.1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        });
        
        observer.observe(resultAmount, {
            childList: true
        });
    }

    // Animate form inputs on focus
    const formInputs = document.querySelectorAll('.calculator-form input, .calculator-form select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.02,
                duration: 0.2,
                ease: "power2.out"
            });
        });
        
        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        });
    });
}

// Before/After Comparison Slider
const comparisonSlider = document.querySelector('.comparison-slider');
if (comparisonSlider) {
    const beforeImage = comparisonSlider.querySelector('.before img');
    const afterImage = comparisonSlider.querySelector('.after img');
    const sliderInput = comparisonSlider.querySelector('.slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelector('.dots');

    // Initialize slider position
    sliderInput.addEventListener('input', function() {
        const sliderValue = this.value;
        gsap.to('.after', {
            width: `${sliderValue}%`,
            duration: 0.1,
            ease: "none"
        });
    });

    // Create dots for navigation
    const images = [
        { before: 'before-1.jpg', after: 'after-1.jpg' },
        { before: 'before-2.jpg', after: 'after-2.jpg' },
        { before: 'before-3.jpg', after: 'after-3.jpg' },
        // Add more images as needed
    ];

    images.forEach((img, index) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => updateComparison(index));
        if(index === 0) dot.classList.add('active');
        dots.appendChild(dot);
    });

    let currentIndex = 0;

    function updateComparison(index) {
        currentIndex = index;
        
        // Animate image transition
        gsap.to([beforeImage, afterImage], {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                beforeImage.src = `images/${images[index].before}`;
                afterImage.src = `images/${images[index].after}`;
                
                gsap.to([beforeImage, afterImage], {
                    opacity: 1,
                    duration: 0.3
                });
            }
        });
        
        // Update active dot
        document.querySelectorAll('.dots span').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateComparison(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateComparison(currentIndex);
    });
}

// Pricing Calculator with enhanced animations
const squareMeters = document.getElementById('square-meters');
const metersValue = document.getElementById('meters-value');
const tierOptions = document.querySelectorAll('.tier-option input');
const smartHomeToggle = document.getElementById('smart-home');
const totalCost = document.getElementById('total-cost');

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
    animateCostChange(totalCost, cost);
}

function animateCostChange(element, targetValue) {
    const startValue = parseInt(element.textContent.replace(/,/g, '')) || 0;
    
    gsap.to({}, {
        duration: 1,
        onUpdate: function() {
            const currentValue = Math.floor(startValue + (targetValue - startValue) * this.progress());
            element.textContent = currentValue.toLocaleString();
        },
        ease: "power2.out"
    });
}

if (squareMeters) {
    squareMeters.addEventListener('input', function() {
        metersValue.textContent = this.value;
        calculateCost();
    });
}

if (tierOptions.length) {
    tierOptions.forEach(option => {
        option.addEventListener('change', calculateCost);
    });
}

if (smartHomeToggle) {
    smartHomeToggle.addEventListener('change', calculateCost);
}

// Initialize calculator
if (totalCost) {
    calculateCost();
}

// Performance optimizations
ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
});

// Cleanup function for better performance
window.addEventListener('beforeunload', () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});