// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Add specific animation classes based on element type
            if (entry.target.classList.contains('skill-category')) {
                entry.target.classList.add('fadeInUp');
            } else if (entry.target.classList.contains('project-card')) {
                entry.target.classList.add('fadeInUp');
            } else if (entry.target.classList.contains('media-item')) {
                entry.target.classList.add('fadeInUp');
            } else if (entry.target.classList.contains('stat')) {
                entry.target.classList.add('fadeInUp');
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
function initializeScrollAnimations() {
    const elementsToObserve = [
        '.skill-category',
        '.project-card',
        '.media-item',
        '.stat',
        '.about-text',
        '.contact-info',
        '.contact-form'
    ];
    
    elementsToObserve.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => observer.observe(el));
    });
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        // Start animation when element is visible
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counterObserver.observe(counter);
    });
}

// Typing animation for hero section
function initTypingAnimation() {
    const text = "AI/ML Engineer & Creative Storyteller";
    const element = document.querySelector('.hero-subtitle');
    
    if (element) {
        let index = 0;
        element.textContent = '';
        
        function typeWriter() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing animation after page load
        setTimeout(typeWriter, 1000);
    }
}

// Parallax effect for background elements
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Skill bar animation
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// Project card hover effects
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Media gallery lightbox effect
function initMediaGallery() {
    const mediaItems = document.querySelectorAll('.media-item');
    
    mediaItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('media-link')) return;
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${item.querySelector('img').src}" alt="${item.querySelector('h4').textContent}">
                    <h3>${item.querySelector('h4').textContent}</h3>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            
            // Close lightbox
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                    lightbox.remove();
                }
            });
            
            // Close with Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    lightbox.remove();
                }
            });
        });
    });
}

// Smooth reveal animation for sections
function initSectionReveal() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.2 });
        
        sectionObserver.observe(section);
    });
}

// Loading animation
function initLoadingAnimation() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="spinner"></div>
            <p>Loading Portfolio...</p>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    // Hide preloader after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
}

// Text animation for section titles
function initTextAnimations() {
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach(title => {
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-text');
                    titleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        titleObserver.observe(title);
    });
}

// Interactive cursor effect
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
}

// Particle effect for hero section
function initParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleCount = 50;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--accent-blue);
            border-radius: 50%;
            opacity: 0.5;
            pointer-events: none;
        `;
        
        hero.appendChild(particle);
        particles.push({
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }
    
    function animateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
            if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
            
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--accent-blue);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    initializeScrollAnimations();
    animateCounters();
    initTypingAnimation();
    initParallaxEffect();
    animateSkillBars();
    initProjectCardEffects();
    initMediaGallery();
    initSectionReveal();
    initLoadingAnimation();
    initTextAnimations();
    initScrollProgress();
    
    // Optional effects (comment out if performance issues)
    // initCursorEffect();
    // initParticleEffect();
});

// Performance optimization
const animationConfig = {
    // Reduce animations on low-end devices
    reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    
    // Check for low-end devices
    isLowEndDevice: navigator.hardwareConcurrency < 4 || navigator.deviceMemory < 4
};

if (animationConfig.reduceMotion || animationConfig.isLowEndDevice) {
    // Disable complex animations
    document.body.classList.add('reduced-motion');
}

// Export for global access
window.animationFunctions = {
    initializeScrollAnimations,
    animateCounters,
    initTypingAnimation,
    initParallaxEffect,
    animateSkillBars,
    initProjectCardEffects,
    initMediaGallery,
    initSectionReveal,
    initTextAnimations,
    initScrollProgress
};
