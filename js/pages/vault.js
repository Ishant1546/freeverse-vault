// Vault Page Specific JavaScript
function initVaultPage() {
    initCategoryTabs();
    initPerformanceToggles();
    initPlanSelection();
    loadAllPlans();
    
    // Check URL parameters on load
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (!category) {
        showVaultWelcome();
    }
}

// Show welcome message when no category selected
function showVaultWelcome() {
    const welcomeSection = document.querySelector('.vault-welcome');
    const plansSections = document.querySelectorAll('.plans-section');
    const categoryTabs = document.querySelectorAll('.category-tab');
    
    // Show welcome, hide plans
    welcomeSection.classList.add('active');
    plansSections.forEach(section => section.classList.remove('active'));
    categoryTabs.forEach(tab => tab.classList.remove('active'));
    
    // Add click handlers to feature highlights
    const featureHighlights = document.querySelectorAll('.feature-highlight');
    featureHighlights.forEach(feature => {
        feature.addEventListener('click', function() {
            const service = this.querySelector('h3').textContent.toLowerCase();
            if (service.includes('bot')) {
                activateCategory('bot-hosting');
            } else if (service.includes('server')) {
                activateCategory('server-hosting');
            }
        });
    });
}

// Hide welcome and show plans
function hideVaultWelcome() {
    const welcomeSection = document.querySelector('.vault-welcome');
    welcomeSection.classList.remove('active');
}

// Plan Data
const planData = {
    'bot-hosting': {
        low: [
            {
                id: 'starter-bot-low',
                name: 'Starter Plan',
                price: '119K OwO / 8 invites',
                features: [
                    'Up To 4 Hours Continuous Runtime',
                    'Restarts Automatically If Kicked',
                    'Other Country Node'
                ],
                icon: 'fas fa-gem'
            },
            {
                id: 'advanced-bot-low',
                name: 'Advanced Plan',
                price: '199K OwO / 15 invites',
                features: [
                    'Up To 8 Hours Continuous Runtime',
                    'Restarts Automatically If Kicked',
                    'Supports Multiple Bot Instances',
                    'Other Country Node'
                ],
                icon: 'fas fa-star'
            },
            {
                id: 'pro-bot-low',
                name: 'Pro Plan',
                price: '359K OwO / 25 invites',
                features: [
                    'Up To 12 Hours Continuous Runtime',
                    'Restarts Automatically If Kicked',
                    'Supports Multiple Bot Instances',
                    'Custom Join/Chat Messages',
                    'Other Country Node'
                ],
                icon: 'fas fa-crown'
            },
            {
                id: 'elite-bot-low',
                name: 'Elite Plan',
                price: '699K OwO / 39 invites',
                features: [
                    'Up To 16 Hours Continuous Runtime',
                    'Restarts Automatically If Kicked',
                    'Supports Multiple Bot Instances',
                    'Custom Join/Chat Messages',
                    'Priority Setup Support',
                    'Other Country Node'
                ],
                icon: 'fas fa-diamond'
            }
        ],
        high: [
            {
                id: 'starter-bot-high',
                name: 'Starter Plan',
                price: '₹39 / Lifetime',
                features: [
                    'Guaranteed 24/7 Uptime',
                    'Restarts Automatically If Kicked',
                    'India Node'
                ],
                icon: 'fas fa-gem'
            },
            {
                id: 'advanced-bot-high',
                name: 'Advanced Plan',
                price: '₹79 / Lifetime',
                features: [
                    'Guaranteed 24/7 Uptime',
                    'Restarts Automatically If Kicked',
                    'Supports Multiple Bot Instances',
                    'India Node'
                ],
                icon: 'fas fa-star'
            },
            {
                id: 'pro-bot-high',
                name: 'Pro Plan',
                price: '₹149 / Lifetime',
                features: [
                    'Guaranteed 24/7 Uptime',
                    'Restarts Automatically If Kicked',
                    'Supports Multiple Bot Instances',
                    'Custom Join/Chat Messages',
                    'India Node'
                ],
                icon: 'fas fa-crown'
            },
            {
                id: 'elite-bot-high',
                name: 'Elite Plan',
                price: '₹199 / Lifetime',
                features: [
                    'Guaranteed 24/7 Uptime',
                    'Restarts Automatically If Kicked',
                    'Supports Multiple Bot Instances',
                    'Custom Join/Chat Messages',
                    'Priority Setup Support',
                    'India Node'
                ],
                icon: 'fas fa-diamond'
            }
        ]
    },
    'server-hosting': {
        low: [
            {
                id: 'starter-server-low',
                name: 'Starter Plan',
                price: '250K Owo / 15 Invites',
                features: [
                    '2 GB RAM',
                    '5 GB SSD Storage',
                    '50% Shared CPU',
                    'Basic DDoS Protection',
                    '24/7 Uptime',
                    'Other Country Node'
                ],
                icon: 'fas fa-gem',
                comingSoon: true
            },
            {
                id: 'advanced-server-low',
                name: 'Advanced Plan',
                price: '550K Owo / 25 Invites',
                features: [
                    '4 GB RAM',
                    '10 GB SSD Storage',
                    '100% Shared CPU',
                    'Premium DDoS Protection',
                    '24/7 Uptime',
                    'Other Country Node'
                ],
                icon: 'fas fa-star',
                comingSoon: true
            },
            {
                id: 'pro-server-low',
                name: 'Pro Plan',
                price: '899K Owo / 45 Invites',
                features: [
                    '6 GB RAM',
                    '15 GB SSD Storage',
                    '200% Shared CPU',
                    'Advanced DDoS Protection',
                    '24/7 Uptime',
                    'Other Country Node'
                ],
                icon: 'fas fa-crown',
                comingSoon: true
            },
            {
                id: 'elite-server-low',
                name: 'Elite Plan',
                price: '1.5M Owo / 80 Invites',
                features: [
                    '8 GB RAM',
                    '20 GB SSD Storage',
                    '400% Shared CPU',
                    'Enterprise DDoS Protection',
                    'Priority Support',
                    '24/7 Uptime',
                    'Other Country Node'
                ],
                icon: 'fas fa-diamond',
                comingSoon: true
            }
        ],
        high: [
            {
                id: 'starter-server-high',
                name: 'Starter+ Plan',
                price: '₹49 Lifetime',
                features: [
                    '2 GB RAM',
                    '5 GB SSD Storage',
                    '0.5 vCore Dedicated CPU',
                    'Basic DDoS Protection',
                    '24/7 Uptime',
                    'India Node'
                ],
                icon: 'fas fa-fire',
                comingSoon: true
            },
            {
                id: 'advanced-server-high',
                name: 'Advanced+ Plan',
                price: '₹119 Lifetime',
                features: [
                    '4 GB RAM',
                    '10 GB SSD Storage',
                    '1 vCore Dedicated CPU',
                    'Premium DDoS Protection',
                    '24/7 Uptime',
                    'India Node'
                ],
                icon: 'fas fa-bolt',
                comingSoon: true
            },
            {
                id: 'pro-server-high',
                name: 'Pro+ Plan',
                price: '₹199 Lifetime',
                features: [
                    '6 GB RAM',
                    '15 GB SSD Storage',
                    '2 vCore Dedicated CPU',
                    'Advanced DDoS Protection',
                    '24/7 Uptime',
                    'India Node'
                ],
                icon: 'fas fa-gem',
                comingSoon: true
            },
            {
                id: 'elite-server-high',
                name: 'Elite+ Plan',
                price: '₹399 Lifetime',
                features: [
                    '8 GB RAM',
                    '20 GB SSD Storage',
                    '4 vCore Dedicated CPU',
                    'Enterprise DDoS Protection',
                    'Priority Support',
                    '24/7 Uptime',
                    'India Node'
                ],
                icon: 'fas fa-crown',
                comingSoon: true
            }
        ]
    }
};

function loadAllPlans() {
    // Load all plan data into the DOM
    for (const [category, performances] of Object.entries(planData)) {
        for (const [performance, plans] of Object.entries(performances)) {
            const gridId = `${category.replace('-hosting', '')}-${performance}-plans-grid`;
            const grid = document.getElementById(gridId);
            if (grid) {
                grid.innerHTML = generatePlanCards(plans);
            }
        }
    }
}

function generatePlanCards(plans) {
    return plans.map(plan => `
        <div class="plan-card ${plan.name.toLowerCase().split(' ')[0]}">
            <div class="plan-header">
                <div class="plan-icon">
                    <i class="${plan.icon}"></i>
                </div>
                <h3>${plan.name}</h3>
                <div class="plan-price">
                    <span class="price">${plan.price}</span>
                </div>
            </div>
            <div class="plan-features">
                ${plan.features.map(feature => `
                    <div class="feature">
                        <i class="fas fa-check"></i>
                        <span>${feature}</span>
                    </div>
                `).join('')}
            </div>
            <button class="btn btn-primary btn-full get-plan-btn ${plan.comingSoon ? 'coming-soon' : ''}" 
                    data-plan="${plan.id}">
                ${plan.comingSoon ? 'Coming Soon' : 'Get This Plan'}
            </button>
        </div>
    `).join('');
}

function initCategoryTabs() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const sections = {
        'bot-hosting': document.getElementById('bot-hosting-section'),
        'server-hosting': document.getElementById('server-hosting-section')
    };

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            activateCategory(category);
        });
    });
}

function activateCategory(category) {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const sections = {
        'bot-hosting': document.getElementById('bot-hosting-section'),
        'server-hosting': document.getElementById('server-hosting-section')
    };

    // Update active tab
    categoryTabs.forEach(t => t.classList.remove('active'));
    const activeTab = document.querySelector(`.category-tab[data-category="${category}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }

    // Hide welcome and show selected section
    hideVaultWelcome();
    Object.values(sections).forEach(section => section.classList.remove('active'));
    if (sections[category]) {
        sections[category].classList.add('active');
    }

    // Update URL
    if (typeof updateVaultURL === 'function') {
        updateVaultURL(category);
    }
}

function initPerformanceToggles() {
    const toggles = document.querySelectorAll('.performance-toggle');
    
    toggles.forEach(toggleContainer => {
        const toggleBtns = toggleContainer.querySelectorAll('.toggle-btn');
        const section = toggleContainer.closest('.plans-section');
        
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const performance = btn.dataset.performance;
                activatePerformance(performance, section);
            });
        });
    });
}

function activatePerformance(performance, section) {
    const toggleBtns = section.querySelectorAll('.toggle-btn');
    const category = section.id.replace('-section', '');
    
    // Update active button
    toggleBtns.forEach(b => b.classList.remove('active'));
    const activeBtn = section.querySelector(`.toggle-btn[data-performance="${performance}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Show/hide performance sections
    const lowPerf = section.querySelector('#low-performance-' + category + '-plans');
    const highPerf = section.querySelector('#high-performance-' + category + '-plans');
    
    if (lowPerf && highPerf) {
        if (performance === 'low') {
            lowPerf.style.display = 'block';
            highPerf.style.display = 'none';
        } else {
            lowPerf.style.display = 'none';
            highPerf.style.display = 'block';
        }
    }
    
    // Update URL
    if (typeof updateVaultURL === 'function') {
        const activeCategory = document.querySelector('.category-tab.active').dataset.category;
        updateVaultURL(activeCategory, performance);
    }
}

function initPlanSelection() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('get-plan-btn')) {
            const planId = e.target.dataset.plan;
            handlePlanSelection(planId);
        }
    });
}

function handlePlanSelection(planId) {
    // Find the plan in our data
    let selectedPlan = null;
    
    for (const [category, performances] of Object.entries(planData)) {
        for (const [performance, plans] of Object.entries(performances)) {
            const plan = plans.find(p => p.id === planId);
            if (plan) {
                selectedPlan = plan;
                break;
            }
        }
        if (selectedPlan) break;
    }
    
    if (selectedPlan) {
        if (selectedPlan.comingSoon) {
            showToast('This plan is coming soon! Stay tuned for updates.', 'success');
        } else {
            showPlanModal(selectedPlan);
        }
    }
}

function showPlanModal(plan) {
    // Simple modal implementation
    const modalHTML = `
        <div class="modal" id="plan-modal" style="display: block;">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-body">
                    <div class="plan-modal-header">
                        <h2>Get ${plan.name}</h2>
                        <p class="plan-modal-price">${plan.price}</p>
                    </div>
                    
                    <div class="plan-features-summary">
                        <h4>Plan Features:</h4>
                        <ul>
                            ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn btn-primary btn-full" onclick="handlePlanPurchase('${plan.id}')">
                            Confirm Purchase
                        </button>
                        <button class="btn btn-outline btn-full close-plan-modal">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listeners
    document.querySelector('.close-plan-modal').addEventListener('click', closePlanModal);
    document.querySelector('#plan-modal .close-modal').addEventListener('click', closePlanModal);
    
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

function handlePlanPurchase(planId) {
    showToast('Purchase completed successfully! Our team will contact you shortly.', 'success');
    closePlanModal();
}

function highlightPlan(planId) {
    const planElement = document.querySelector(`[data-plan="${planId}"]`);
    if (planElement) {
        planElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        planElement.style.animation = 'pulse 2s infinite';
        setTimeout(() => {
            planElement.style.animation = '';
        }, 2000);
    }
}

// Make functions globally available for router
window.activateCategory = activateCategory;
window.activatePerformance = activatePerformance;
window.highlightPlan = highlightPlan;
window.handlePlanPurchase = handlePlanPurchase;