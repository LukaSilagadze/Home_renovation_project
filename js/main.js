document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Animate hero elements on load
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroCta = document.querySelector('.hero-cta');
        
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
        
        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                heroCta.style.opacity = '1';
                heroCta.style.transform = 'translateY(0)';
            }, 300);
        }, 300);
    }, 500);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Tier card interaction
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
    });

    // Video mute toggle
    const heroVideo = document.getElementById('heroVideo');
    document.addEventListener('keydown', function(e) {
        if (e.key === 'm') {
            heroVideo.muted = !heroVideo.muted;
        }
    });

    // Scroll indicator
    window.addEventListener('scroll', function() {
        const scrollIndicator = document.querySelector('.scroll-indicator span');
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        
        const scrollPercent = (scrollPosition / (docHeight - windowHeight)) * 100;
        scrollIndicator.style.width = scrollPercent + '%';
    });
});