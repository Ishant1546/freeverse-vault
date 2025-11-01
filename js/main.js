// Main JavaScript for FreeVerse Site with URL Routing

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all app functionality
function initializeApp() {
    // Initialize components based on current page
    initLoadingScreen();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initButtons();
    initForms();
    
    // Initialize URL routing
    initURLRouting();
    
    // Page-specific initializations
    if (document.querySelector('.vault-header')) {
        initVaultPage();
    }
    
    if (document.querySelector('.contact-content')) {
        initContactPage();
    }
    
    if (document.querySelector('.admin-main')) {
        initAdminPage();
    }
    
    if (document.querySelector('.auth-form')) {
        initAuthForms();
    }
    
    if (document.querySelector('.dashboard-main')) {
        initDashboard();
    }
    
    // Initialize particles if on home page
    if (document.querySelector('.hero')) {
        initParticles();
    }
}

// URL Routing System
function initURLRouting() {
    // Handle URL changes
    window.addEventListener('popstate', handleURLChange);
    
    // Initial URL handling
    handleURLChange();
    
    // Intercept all internal link clicks
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.href && link.href.startsWith(window.location.origin)) {
            e.preventDefault();
            const url = new URL(link.href);
            navigateTo(url.pathname + url.search);
        }
    });
}

function handleURLChange() {
    const url = new URL(window.location.href);
    const path = url.pathname;
    const params = new URLSearchParams(url.search);
    
    // Update active navigation
    updateActiveNav(path);
    
    // Handle page-specific URL parameters
    if (path === '/vault' || path === '/vault.html') {
        handleVaultURL(params);
    }
}

function navigateTo(url) {
    history.pushState(null, '', url);
    handleURLChange();
}

function updateActiveNav(path) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current page
    const currentPath = path === '/' ? '/' : path.replace('.html', '');
    const navLink = document.querySelector(`.nav-link[href="${currentPath}"], .nav-link[href="${currentPath}.html"]`);
    if (navLink) {
        navLink.classList.add('active');
    }
}

function handleVaultURL(params) {
    const category = params.get('category');
    const plan = params.get('plan');
    const performance = params.get('performance');
    
    if (category) {
        // Activate category tab
        const categoryTab = document.querySelector(`.category-tab[data-category="${category}"]`);
        if (categoryTab) {
            categoryTab.click();
        }
    }
    
    if (performance) {
        // Activate performance toggle
        setTimeout(() => {
            const toggleBtn = document.querySelector(`.toggle-btn[data-performance="${performance}"]`);
            if (toggleBtn) {
                toggleBtn.click();
            }
        }, 100);
    }
    
    if (plan) {
        // Scroll to specific plan
        setTimeout(() => {
            const planCard = document.querySelector(`[data-plan="${plan}"]`);
            if (planCard) {
                planCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                planCard.style.animation = 'pulse 2s infinite';
                setTimeout(() => {
                    planCard.style.animation = '';
                }, 2000);
            }
        }, 200);
    }
}

// Update URL when category changes
function updateVaultURL(category, performance = null, plan = null) {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (performance) params.set('performance', performance);
    if (plan) params.set('plan', plan);
    
    const url = '/vault' + (params.toString() ? `?${params.toString()}` : '');
    navigateTo(url);
}

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        // Remove from DOM after animation
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);
}

// Navigation
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll Effects
function initScrollEffects() {
    // Scroll to top button
    const scrollBtn = document.getElementById('scroll-top');
    
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
    
    // Observe elements for scroll animations
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
    
    // Add pulse animation for highlighted elements
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

// Button Interactions
function initButtons() {
    // Get Now buttons - show toast notification
    const getNowButtons = document.querySelectorAll('.btn-small, .btn-primary');
    getNowButtons.forEach(button => {
        if (button.textContent.includes('Get Now') || button.textContent.includes('Download')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                showToast('Item added to your downloads!', 'success');
            });
        }
    });
    
    // Social buttons
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Social login coming soon!', 'success');
        });
    });
}

// Forms
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple form validation
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                showToast('Form submitted successfully!', 'success');
                form.reset();
            } else {
                showToast('Please fill in all required fields.', 'error');
            }
        });
    });
}

// Vault Page - Categories and Plans
function initVaultPage() {
    // Category tabs functionality
    const categoryTabs = document.querySelectorAll('.category-tab');
    const botHostingSection = document.getElementById('bot-hosting-section');
    const serverHostingSection = document.getElementById('server-hosting-section');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');
            
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show/hide sections
            if (category === 'bot-hosting') {
                botHostingSection.classList.add('active');
                serverHostingSection.classList.remove('active');
            } else {
                botHostingSection.classList.remove('active');
                serverHostingSection.classList.add('active');
            }
            
            // Update URL
            updateVaultURL(category);
        });
    });
    
    // Performance toggle functionality for bot plans
    const botToggleBtns = document.querySelectorAll('#bot-hosting-section .toggle-btn');
    const lowPerformanceBotPlans = document.getElementById('low-performance-bot-plans');
    const highPerformanceBotPlans = document.getElementById('high-performance-bot-plans');
    
    botToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const performance = btn.getAttribute('data-performance');
            
            // Update active button
            botToggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show/hide sections
            if (performance === 'low') {
                lowPerformanceBotPlans.style.display = 'block';
                highPerformanceBotPlans.style.display = 'none';
            } else {
                lowPerformanceBotPlans.style.display = 'none';
                highPerformanceBotPlans.style.display = 'block';
            }
            
            // Update URL
            updateVaultURL('bot-hosting', performance);
        });
    });
    
    // Performance toggle functionality for server plans
    const serverToggleBtns = document.querySelectorAll('#server-hosting-section .toggle-btn');
    const lowPerformanceServerPlans = document.getElementById('low-performance-server-plans');
    const highPerformanceServerPlans = document.getElementById('high-performance-server-plans');
    
    serverToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const performance = btn.getAttribute('data-performance');
            
            // Update active button
            serverToggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show/hide sections
            if (performance === 'low') {
                lowPerformanceServerPlans.style.display = 'block';
                highPerformanceServerPlans.style.display = 'none';
            } else {
                lowPerformanceServerPlans.style.display = 'none';
                highPerformanceServerPlans.style.display = 'block';
            }
            
            // Update URL
            updateVaultURL('server-hosting', performance);
        });
    });
    
    // Plan selection functionality
    const getPlanButtons = document.querySelectorAll('.get-plan-btn');
    
    getPlanButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check if it's a coming soon button
            if (button.classList.contains('coming-soon')) {
                showToast('This plan is coming soon! Stay tuned for updates.', 'success');
                return;
            }
            
            const planType = e.target.getAttribute('data-plan');
            
            let planName = '';
            let price = '';
            let features = [];
            
            // Determine plan details based on data attribute
            switch(planType) {
                // Bot Plans - Low Performance
                case 'starter-bot-low':
                    planName = 'Starter Bot Plan (Low Performance)';
                    price = '119K OwO / 8 invites';
                    features = [
                        'Up To 4 Hours Continuous Runtime',
                        'Restarts Automatically If Kicked',
                        'Other Country Node'
                    ];
                    break;
                case 'advanced-bot-low':
                    planName = 'Advanced Bot Plan (Low Performance)';
                    price = '199K OwO / 15 invites';
                    features = [
                        'Up To 8 Hours Continuous Runtime',
                        'Restarts Automatically If Kicked',
                        'Supports Multiple Bot Instances',
                        'Other Country Node'
                    ];
                    break;
                case 'pro-bot-low':
                    planName = 'Pro Bot Plan (Low Performance)';
                    price = '359K OwO / 25 invites';
                    features = [
                        'Up To 12 Hours Continuous Runtime',
                        'Restarts Automatically If Kicked',
                        'Supports Multiple Bot Instances',
                        'Custom Join/Chat Messages',
                        'Other Country Node'
                    ];
                    break;
                case 'elite-bot-low':
                    planName = 'Elite Bot Plan (Low Performance)';
                    price = '699K OwO / 39 invites';
                    features = [
                        'Up To 16 Hours Continuous Runtime',
                        'Restarts Automatically If Kicked',
                        'Supports Multiple Bot Instances',
                        'Custom Join/Chat Messages',
                        'Priority Setup Support',
                        'Other Country Node'
                    ];
                    break;
                
                // Bot Plans - High Performance
                case 'starter-bot-high':
                    planName = 'Starter Bot Plan (High Performance)';
                    price = '₹39 / Lifetime';
                    features = [
                        'Guaranteed 24/7 Uptime',
                        'Restarts Automatically If Kicked',
                        'India Node'
                    ];
                    break;
                case 'advanced-bot-high':
                    planName = 'Advanced Bot Plan (High Performance)';
                    price = '₹79 / Lifetime';
                    features = [
                        'Guaranteed 24/7 Uptime',
                        'Restarts Automatically If Kicked',
                        'Supports Multiple Bot Instances',
                        'India Node'
                    ];
                    break;
                case 'pro-bot-high':
                    planName = 'Pro Bot Plan (High Performance)';
                    price = '₹149 / Lifetime';
                    features = [
                        'Guaranteed 24/7 Uptime',
                        'Restarts Automatically If Kicked',
                        'Supports Multiple Bot Instances',
                        'Custom Join/Chat Messages',
                        'India Node'
                    ];
                    break;
                case 'elite-bot-high':
                    planName = 'Elite Bot Plan (High Performance)';
                    price = '₹199 / Lifetime';
                    features = [
                        'Guaranteed 24/7 Uptime',
                        'Restarts Automatically If Kicked',
                        'Supports Multiple Bot Instances',
                        'Custom Join/Chat Messages',
                        'Priority Setup Support',
                        'India Node'
                    ];
                    break;
                
                // Server Plans - Low Performance
                case 'starter-server-low':
                    planName = 'Starter Server Plan (Low Performance)';
                    price = '250K Owo / 15 Invites';
                    features = [
                        '2 GB RAM',
                        '5 GB SSD Storage',
                        '50% Shared CPU',
                        'Basic DDoS Protection',
                        '24/7 Uptime',
                        'Other Country Node'
                    ];
                    break;
                case 'advanced-server-low':
                    planName = 'Advanced Server Plan (Low Performance)';
                    price = '550K Owo / 25 Invites';
                    features = [
                        '4 GB RAM',
                        '10 GB SSD Storage',
                        '100% Shared CPU',
                        'Premium DDoS Protection',
                        '24/7 Uptime',
                        'Other Country Node'
                    ];
                    break;
                case 'pro-server-low':
                    planName = 'Pro Server Plan (Low Performance)';
                    price = '899K Owo / 45 Invites';
                    features = [
                        '6 GB RAM',
                        '15 GB SSD Storage',
                        '200% Shared CPU',
                        'Advanced DDoS Protection',
                        '24/7 Uptime',
                        'Other Country Node'
                    ];
                    break;
                case 'elite-server-low':
                    planName = 'Elite Server Plan (Low Performance)';
                    price = '1.5M Owo / 80 Invites';
                    features = [
                        '8 GB RAM',
                        '20 GB SSD Storage',
                        '400% Shared CPU',
                        'Enterprise DDoS Protection',
                        'Priority Support',
                        '24/7 Uptime',
                        'Other Country Node'
                    ];
                    break;
                
                // Server Plans - High Performance
                case 'starter-server-high':
                    planName = 'Starter+ Server Plan (High Performance)';
                    price = '₹49 Lifetime';
                    features = [
                        '2 GB RAM',
                        '5 GB SSD Storage',
                        '0.5 vCore Dedicated CPU',
                        'Basic DDoS Protection',
                        '24/7 Uptime',
                        'India Node'
                    ];
                    break;
                case 'advanced-server-high':
                    planName = 'Advanced+ Server Plan (High Performance)';
                    price = '₹119 Lifetime';
                    features = [
                        '4 GB RAM',
                        '10 GB SSD Storage',
                        '1 vCore Dedicated CPU',
                        'Premium DDoS Protection',
                        '24/7 Uptime',
                        'India Node'
                    ];
                    break;
                case 'pro-server-high':
                    planName = 'Pro+ Server Plan (High Performance)';
                    price = '₹199 Lifetime';
                    features = [
                        '6 GB RAM',
                        '15 GB SSD Storage',
                        '2 vCore Dedicated CPU',
                        'Advanced DDoS Protection',
                        '24/7 Uptime',
                        'India Node'
                    ];
                    break;
                case 'elite-server-high':
                    planName = 'Elite+ Server Plan (High Performance)';
                    price = '₹399 Lifetime';
                    features = [
                        '8 GB RAM',
                        '20 GB SSD Storage',
                        '4 vCore Dedicated CPU',
                        'Enterprise DDoS Protection',
                        'Priority Support',
                        '24/7 Uptime',
                        'India Node'
                    ];
                    break;
            }
            
            showPlanModal(planName, price, planType, features);
        });
    });
}

// Plan Modal
function showPlanModal(planName, price, planType, features) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal" id="plan-modal" style="display: block;">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-body">
                    <div class="plan-modal-header">
                        <h2>Get ${planName}</h2>
                        <p class="plan-modal-price">${price}</p>
                    </div>
                    
                    <div class="plan-features-summary">
                        <h4>Plan Features:</h4>
                        <ul>
                            ${features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="plan-modal-content">
                        <div class="payment-methods">
                            <h3>Select Payment Method</h3>
                            <div class="payment-options">
                                ${planType.includes('low') ? `
                                    <div class="payment-option">
                                        <input type="radio" id="owo-payment" name="payment" value="owo" checked>
                                        <label for="owo-payment">
                                            <i class="fas fa-coins"></i>
                                            <span>Pay with OwO</span>
                                        </label>
                                    </div>
                                    <div class="payment-option">
                                        <input type="radio" id="invites-payment" name="payment" value="invites">
                                        <label for="invites-payment">
                                            <i class="fas fa-user-plus"></i>
                                            <span>Pay with Invites</span>
                                        </label>
                                    </div>
                                ` : `
                                    <div class="payment-option">
                                        <input type="radio" id="inr-payment" name="payment" value="inr" checked>
                                        <label for="inr-payment">
                                            <i class="fas fa-rupee-sign"></i>
                                            <span>Pay in INR</span>
                                        </label>
                                    </div>
                                `}
                            </div>
                        </div>
                        
                        <div class="server-details">
                            <h3>Server Information</h3>
                            <div class="form-group">
                                <label for="server-ip">Minecraft Server IP *</label>
                                <input type="text" id="server-ip" placeholder="mc.yourserver.com" required>
                            </div>
                            <div class="form-group">
                                <label for="server-port">Server Port (Optional)</label>
                                <input type="number" id="server-port" placeholder="25565">
                            </div>
                            <div class="form-group">
                                <label for="discord-id">Discord ID (For Support) *</label>
                                <input type="text" id="discord-id" placeholder="YourDiscordID#1234" required>
                            </div>
                        </div>
                        
                        <div class="modal-actions">
                            <button class="btn btn-primary btn-full" id="confirm-purchase">
                                Confirm Purchase
                            </button>
                            <button class="btn btn-outline btn-full close-plan-modal">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listeners
    document.getElementById('confirm-purchase').addEventListener('click', () => {
        const serverIp = document.getElementById('server-ip').value;
        const discordId = document.getElementById('discord-id').value;
        
        if (!serverIp) {
            showToast('Please enter your Minecraft server IP', 'error');
            return;
        }
        
        if (!discordId) {
            showToast('Please enter your Discord ID for support', 'error');
            return;
        }
        
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        let paymentText = '';
        
        if (paymentMethod === 'owo') {
            paymentText = 'using OwO';
        } else if (paymentMethod === 'invites') {
            paymentText = 'using invites';
        } else {
            paymentText = 'in INR';
        }
        
        showToast(`Purchase confirmed! ${planName} will be set up for ${serverIp} ${paymentText}. Our team will contact you on Discord.`, 'success');
        closePlanModal();
    });
    
    document.querySelector('.close-plan-modal').addEventListener('click', closePlanModal);
    document.querySelector('#plan-modal .close-modal').addEventListener('click', closePlanModal);
    
    // Close modal when clicking outside
    document.getElementById('plan-modal').addEventListener('click', (e) => {
        if (e.target.id === 'plan-modal') {
            closePlanModal();
        }
    });
}

function closePlanModal() {
    const modal = document.getElementById('plan-modal');
    if (modal) {
        modal.remove();
    }
}

// Contact Page
function initContactPage() {
    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Contact form specific validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                showToast('Your message has been sent! We will respond within 24 hours.', 'success');
                contactForm.reset();
            } else {
                showToast('Please fill in all fields.', 'error');
            }
        });
    }
}

// Admin Page
function initAdminPage() {
    // Table row actions
    const editButtons = document.querySelectorAll('.btn-small:not(.btn-danger)');
    const deleteButtons = document.querySelectorAll('.btn-danger');
    
    editButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            showToast('Edit functionality coming soon!', 'success');
        });
    });
    
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm('Are you sure you want to delete this item?')) {
                showToast('Item deleted successfully!', 'success');
                // In a real app, you would remove the item from the DOM here
                const row = e.target.closest('tr');
                if (row) {
                    row.style.opacity = '0';
                    setTimeout(() => {
                        row.remove();
                    }, 300);
                }
            }
        });
    });
    
    // Quick action buttons
    const quickActionButtons = document.querySelectorAll('.quick-actions .btn');
    quickActionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.textContent.trim();
            showToast(`${action} functionality coming soon!`, 'success');
        });
    });
    
    // Search functionality in admin table
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const tableRows = document.querySelectorAll('.admin-table tbody tr');
            
            tableRows.forEach(row => {
                const rowText = row.textContent.toLowerCase();
                if (rowText.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Filter functionality
    const filterSelect = document.querySelector('.filter-select');
    if (filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            const filterValue = e.target.value.toLowerCase();
            const tableRows = document.querySelectorAll('.admin-table tbody tr');
            
            tableRows.forEach(row => {
                const category = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
                if (filterValue === 'all categories' || category.includes(filterValue)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
}

// Auth Forms
function initAuthForms() {
    // Password confirmation validation
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm-password');
        
        function validatePassword() {
            if (password.value !== confirmPassword.value) {
                confirmPassword.setCustomValidity('Passwords do not match');
                confirmPassword.style.borderColor = '#dc3545';
            } else {
                confirmPassword.setCustomValidity('');
                confirmPassword.style.borderColor = '';
            }
        }
        
        password.addEventListener('change', validatePassword);
        confirmPassword.addEventListener('keyup', validatePassword);
        
        // Username validation
        const username = document.getElementById('username');
        if (username) {
            username.addEventListener('input', (e) => {
                const usernameValue = e.target.value;
                if (usernameValue.length < 3) {
                    username.setCustomValidity('Username must be at least 3 characters long');
                    username.style.borderColor = '#dc3545';
                } else {
                    username.setCustomValidity('');
                    username.style.borderColor = '';
                }
            });
        }
    }
    
    // Login form enhancements
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        // Add demo login functionality
        const demoLoginBtn = document.createElement('button');
        demoLoginBtn.type = 'button';
        demoLoginBtn.className = 'btn btn-outline btn-full';
        demoLoginBtn.textContent = 'Try Demo Account';
        demoLoginBtn.style.marginTop = '1rem';
        
        demoLoginBtn.addEventListener('click', () => {
            document.getElementById('email').value = 'demo@freeverse.com';
            document.getElementById('password').value = 'demopassword123';
            showToast('Demo credentials filled! Click Sign In to continue.', 'success');
        });
        
        loginForm.appendChild(demoLoginBtn);
    }
}

// Dashboard
function initDashboard() {
    // Download buttons
    const downloadButtons = document.querySelectorAll('.item-actions .btn');
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const itemName = e.target.closest('.claimed-item').querySelector('h3').textContent;
            showToast(`Download started for ${itemName}!`, 'success');
            
            // Simulate download progress
            setTimeout(() => {
                showToast(`${itemName} downloaded successfully!`, 'success');
            }, 2000);
        });
    });
    
    // Recommended items "Get Now" buttons
    const recommendedButtons = document.querySelectorAll('.recommended-item .btn');
    recommendedButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const itemName = e.target.closest('.recommended-item').querySelector('h3').textContent;
            showToast(`${itemName} added to your claimed items!`, 'success');
            
            // Add to claimed items (simulated)
            setTimeout(() => {
                const claimedItems = document.querySelector('.claimed-items');
                const newItem = document.createElement('div');
                newItem.className = 'claimed-item fade-in';
                newItem.innerHTML = `
                    <div class="item-image">
                        <img src="/assets/images/new-item.jpg" alt="${itemName}">
                    </div>
                    <div class="item-details">
                        <h3>${itemName}</h3>
                        <p>Claimed just now</p>
                        <span class="item-category">New Item</span>
                    </div>
                    <div class="item-actions">
                        <button class="btn btn-small">Download</button>
                    </div>
                `;
                claimedItems.prepend(newItem);
                
                // Add download event to new button
                newItem.querySelector('.btn').addEventListener('click', (e) => {
                    e.preventDefault();
                    showToast(`Download started for ${itemName}!`, 'success');
                });
            }, 1000);
        });
    });
    
    // Profile stats update (simulated)
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', () => {
            const statName = card.querySelector('p').textContent;
            showToast(`${statName} details coming soon!`, 'success');
        });
    });
}

// Toast Notification System
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    // Add icon based on type
    const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    toast.innerHTML = `<i class="${icon}"></i> ${message}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Particles Background
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
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
    
    // Add CSS for floating animation if not already present
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
function formatCurrency(amount, currency = 'INR') {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Local Storage Utilities (for demo purposes)
const storage = {
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
};

// Demo data initialization
function initDemoData() {
    // Only initialize if no data exists
    if (!storage.get('freeverse_demo_initialized')) {
        const demoData = {
            user: {
                username: 'DemoUser',
                email: 'demo@freeverse.com',
                joinDate: new Date().toISOString(),
                plan: 'Premium'
            },
            claimedItems: [
                {
                    id: 1,
                    name: 'Valorant Premium Account',
                    claimedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                    category: 'Game Account'
                },
                {
                    id: 2,
                    name: 'Minecraft Optimization Pack',
                    claimedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                    category: 'Plugin'
                }
            ]
        };
        
        storage.set('freeverse_demo_data', demoData);
        storage.set('freeverse_demo_initialized', true);
    }
}

// Initialize demo data on page load
initDemoData();

// Export functions for global access (if needed)
window.FreeVerse = {
    showToast,
    storage,
    formatCurrency,
    formatNumber,
    navigateTo
};

// Error handling for the entire application
window.addEventListener('error', (e) => {
    console.error('FreeVerse App Error:', e.error);
    showToast('An unexpected error occurred. Please refresh the page.', 'error');
});