// Enhanced interactions and animations for BinaryFX
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Page loading animation
    const body = document.body;
    body.classList.add('loading');
    
    setTimeout(() => {
        body.classList.remove('loading');
        body.classList.add('loaded');
        animateElements();
    }, 300);
    
    // Animate elements on page load
    function animateElements() {
        const cards = document.querySelectorAll('.nav-card, .social-card');
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
            }, index * 100);
        });
    }
    
    // Enhanced click interactions
    const clickableElements = document.querySelectorAll('.nav-card, .social-card, .card-link');
    
    clickableElements.forEach(element => {
        element.addEventListener('click', function(e) {
            // Create ripple effect
            createRippleEffect(e, this);
            
            // Handle navigation
            const link = this.querySelector('a') || this;
            if (link.href && link.href !== '#') {
                e.preventDefault();
                
                // Add exit animation
                this.style.transform = 'scale(0.95)';
                this.style.opacity = '0.7';
                
                setTimeout(() => {
                    window.open(link.href, '_blank');
                    
                    // Reset animation
                    this.style.transform = '';
                    this.style.opacity = '';
                }, 150);
            }
        });
        
        // Enhanced hover effects
        element.addEventListener('mouseenter', function() {
            if (this.classList.contains('nav-card') || this.classList.contains('social-card')) {
                this.style.transform = 'translateY(-6px) scale(1.02)';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.classList.contains('nav-card') || this.classList.contains('social-card')) {
                this.style.transform = '';
            }
        });
    });
    
    // Ripple effect function
    function createRippleEffect(event, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add ripple animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Parallax effect for floating shapes
    const shapes = document.querySelectorAll('.shape');
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            const x = mouseX * 20 * speed;
            const y = mouseY * 20 * speed;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Neural network nodes interaction
    const neuralNodes = document.querySelectorAll('.neural-node');
    
    neuralNodes.forEach((node, index) => {
        node.addEventListener('animationiteration', () => {
            // Add random variations to neural pulses
            const delay = Math.random() * 2;
            node.style.animationDelay = delay + 's';
        });
    });
    
    // Avatar interaction
    const avatar = document.querySelector('.avatar-image');
    const avatarContainer = document.querySelector('.avatar-container');
    
    if (avatar && avatarContainer) {
        avatarContainer.addEventListener('mouseenter', () => {
            avatar.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        avatarContainer.addEventListener('mouseleave', () => {
            avatar.style.transform = '';
        });
        
        // Avatar click effect
        avatarContainer.addEventListener('click', () => {
            avatar.style.animation = 'none';
            avatar.offsetHeight; // Trigger reflow
            avatar.style.animation = 'avatar-bounce 0.6s ease-in-out';
        });
    }
    
    // Add avatar bounce animation
    const avatarStyle = document.createElement('style');
    avatarStyle.textContent = `
        @keyframes avatar-bounce {
            0%, 100% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.1) rotate(-5deg); }
            50% { transform: scale(1.2) rotate(0deg); }
            75% { transform: scale(1.1) rotate(5deg); }
        }
    `;
    document.head.appendChild(avatarStyle);
    
    // Status indicator interactions
    const statusIndicator = document.querySelector('.status-indicator');
    
    if (statusIndicator) {
        // Random status updates
        setInterval(() => {
            statusIndicator.style.animation = 'none';
            statusIndicator.offsetHeight; // Trigger reflow
            statusIndicator.style.animation = 'pulse-glow 2s ease-in-out infinite';
        }, 5000);
    }
    
    // Card statistics animation
    const stats = document.querySelectorAll('.stat-value');
    
    function animateStats() {
        stats.forEach(stat => {
            const text = stat.textContent;
            if (text.includes('%')) {
                const value = parseFloat(text);
                animateNumber(stat, 0, value, '%', 1000);
            } else if (text.includes('/')) {
                // For 24/7 display, just add a subtle pulse
                stat.style.animation = 'pulse-scale 2s ease-in-out infinite';
            }
        });
    }
    
    function animateNumber(element, start, end, suffix = '', duration = 1000) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = current.toFixed(1) + suffix;
        }, 16);
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('nav-card') && 
                    entry.target.classList.contains('featured')) {
                    animateStats();
                }
                
                // Add entrance animations
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.nav-card, .social-card').forEach(el => {
        observer.observe(el);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('nav-card') || 
                focusedElement.classList.contains('social-card')) {
                focusedElement.click();
                e.preventDefault();
            }
        }
    });
    
    // Add focus styles for accessibility
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .nav-card:focus,
        .social-card:focus,
        .card-link:focus {
            outline: 2px solid var(--primary);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(focusStyle);
    
    // Performance optimization: Reduce animations on low-end devices
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable complex animations
        document.querySelectorAll('.shape, .neural-node').forEach(el => {
            el.style.animation = 'none';
        });
    }
    
    // Add service worker for offline functionality (if available)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker not available, continue normally
        });
    }
    
    // Dynamic theme adjustments based on time
    function adjustThemeByTime() {
        const hour = new Date().getHours();
        const root = document.documentElement;
        
        if (hour >= 6 && hour < 18) {
            // Day theme adjustments (subtle)
            root.style.setProperty('--bg-primary', '#0d0d0d');
        } else {
            // Night theme (default)
            root.style.setProperty('--bg-primary', '#0a0a0a');
        }
    }
    
    adjustThemeByTime();
    
    // Update theme every hour
    setInterval(adjustThemeByTime, 3600000);
    
    console.log('🚀 BinaryFX Enhanced Interface Loaded Successfully');
});
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        const bgAnimation = document.querySelector('.bg-animation');
        if (bgAnimation) {
            bgAnimation.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
        }
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Add intersection observer for animations
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

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.link-card, .social-link');
    animatedElements.forEach(el => observer.observe(el));

    // Add copy functionality for contact info
    const copyButtons = document.querySelectorAll('[data-copy]');
    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const textToCopy = this.getAttribute('data-copy');
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast('Copied to clipboard!');
            }).catch(() => {
                showToast('Failed to copy');
            });
        });
    });

    // Toast notification system
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 2000);
    }

    // Add theme toggle functionality (for future use)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
        });
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    // Add smooth reveal animation on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
});

// Add CSS for ripple effect and toast
const additionalStyles = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
}

@keyframes ripple {
    to {
        transform: scale(2);
        opacity: 0;
    }
}

.toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    z-index: 1000;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease;
}

.toast.show {
    transform: translateX(-50%) translateY(0);
}

.loading * {
    animation-play-state: paused;
}

.reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;
}

.revealed {
    opacity: 1;
    transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
