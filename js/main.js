// Main JavaScript for FreeVerse Site

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all app functionality
function initializeApp() {
    // Initialize core components
    initLoadingScreen();
    initScrollEffects();
    initAnimations();
    
    // Initialize URL routing
    if (typeof initURLRouting === 'function') {
        initURLRouting();
    }
    
    // Initialize components
    if (typeof initNavigation === 'function') {
        initNavigation();
    }
    
    if (typeof initNotifications === 'function') {
        initNotifications();
    }
    
    if (typeof initModals === 'function') {
        initModals();
    }
    
    // Initialize page-specific functionality
    const page = document.body.dataset.page || getCurrentPage();
    
    switch(page) {
        case 'home':
            if (typeof initHomePage === 'function') initHomePage();
            break;
        case 'vault':
            if (typeof initVaultPage === 'function') initVaultPage();
            break;
        case 'auth':
            if (typeof initAuthPage === 'function') initAuthPage();
            break;
        case 'dashboard':
            if (typeof initDashboard === 'function') initDashboard();
            break;
    }
    
    // Initialize particles if on home page
    if (document.querySelector('.hero')) {
        initParticles();
    }
}

// In the initializeApp function, update the page detection:
function getCurrentPage() {
    const path = window.location.pathname;
    if (path === '/' || path === '/index.html' || path === '') return 'home';
    if (path.includes('vault')) return 'vault';
    if (path.includes('login') || path.includes('register')) return 'auth';
    if (path.includes('dashboard')) return 'dashboard';
    return 'home';
}

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) return;
    
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);
}

// Scroll Effects
function initScrollEffects() {
    // Scroll to top button
    const scrollBtn = document.getElementById('scroll-top');
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .pricing-card, .plan-card, .stat-card, .step-card, .testimonial-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Animations
function initAnimations() {
    // Add animation delays to elements
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.classList.add(`delay-${index % 3}`);
    });
    
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach((card, index) => {
        card.classList.add(`delay-${index % 4}`);
    });
    
    // Add pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Particles Background
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 20 + 10;
        const color = Math.random() > 0.5 ? 'var(--primary)' : 'var(--accent)';
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${Math.random() * 0.5 + 0.1};
            animation: float ${duration}s ease-in-out ${delay}s infinite;
            pointer-events: none;
        `;
        
        container.appendChild(particle);
    }
    
    // Add CSS for floating animation
    if (!document.querySelector('#particles-animation')) {
        const style = document.createElement('style');
        style.id = 'particles-animation';
        style.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                }
                25% {
                    transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(90deg);
                }
                50% {
                    transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(180deg);
                }
                75% {
                    transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(270deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Utility Functions
const FreeVerse = {
    formatCurrency: (amount, currency = 'INR') => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },
    
    formatNumber: (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    },
    
    storage: {
        set: (key, value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.error('LocalStorage set error:', e);
                return false;
            }
        },
        
        get: (key) => {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (e) {
                console.error('LocalStorage get error:', e);
                return null;
            }
        },
        
        remove: (key) => {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                console.error('LocalStorage remove error:', e);
                return false;
            }
        }
    }
};

// Demo data initialization
function initDemoData() {
    if (!FreeVerse.storage.get('freeverse_demo_initialized')) {
        const demoData = {
            user: {
                username: 'DemoUser',
                email: 'demo@freeverse.com',
                joinDate: new Date().toISOString(),
                plan: 'Premium'
            },
            claimedItems: []
        };
        
        FreeVerse.storage.set('freeverse_demo_data', demoData);
        FreeVerse.storage.set('freeverse_demo_initialized', true);
    }
}

// Initialize demo data
initDemoData();

// Export for global access
window.FreeVerse = FreeVerse;

// Error handling
window.addEventListener('error', (e) => {
    console.error('FreeVerse App Error:', e.error);
    if (typeof showToast === 'function') {
        showToast('An unexpected error occurred. Please refresh the page.', 'error');
    }
});