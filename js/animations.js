// GSAP animations for advanced effects
document.addEventListener('DOMContentLoaded', function() {
    // Animate tier cards on scroll
    const tierCards = document.querySelectorAll('.tier-card');
    
    tierCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out"
        });
    });

    // Parallax effect for sections
    gsap.utils.toArray('.parallax').forEach(section => {
        const image = section.querySelector('img');
        
        gsap.to(image, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                scrub: true
            }
        });
    });

    // Material showcase hover effects
    const materialItems = document.querySelectorAll('.material-item');
    
    materialItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('.material-info'), {
                opacity: 1,
                y: 0,
                duration: 0.3
            });
        });
        
        item.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('.material-info'), {
                opacity: 0,
                y: 20,
                duration: 0.3
            });
        });
    });
});

// Before/After Comparison Slider
const comparisonSlider = document.querySelector('.comparison-slider');
const beforeImage = comparisonSlider.querySelector('.before img');
const afterImage = comparisonSlider.querySelector('.after img');
const sliderInput = comparisonSlider.querySelector('.slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelector('.dots');

// Initialize slider position
sliderInput.addEventListener('input', function() {
    const sliderValue = this.value;
    document.querySelector('.after').style.width = `${sliderValue}%`;
});

// Create dots for navigation
const images = [
    { before: 'before-1.jpg', after: 'after-1.jpg' },
    { before: 'before-2.jpg', after: 'after-2.jpg' },
    // Add more images
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
    beforeImage.src = `images/${images[index].before}`;
    afterImage.src = `images/${images[index].after}`;
    
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

// Pricing Calculator
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
    const selectedTier = document.querySelector('.tier-option input:checked').parentElement.dataset.tier;
    const smartHome = smartHomeToggle.checked;
    
    let cost = meters * prices[selectedTier];
    if(smartHome) cost += meters * 100; // Additional smart home cost
    
    totalCost.textContent = cost.toLocaleString();
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

// Animate timeline on scroll
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        x: index % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out"
    });
});

// Parallax effect for warranty section
gsap.to('.warranty-card', {
    scrollTrigger: {
        trigger: '.warranty-section',
        start: "top bottom",
        end: "bottom top",
        scrub: true
    },
    y: -50,
    ease: "none"
});