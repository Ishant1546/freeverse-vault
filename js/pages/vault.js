// Vault Page Specific JavaScript
function initVaultPage() {
    initCategoryTabs();
    initPerformanceToggles();
    initPlanSelection();
    loadPlanData();
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
            }
        ]
    }
};

function loadPlanData() {
    // This would typically load from an API
    console.log('Plan data loaded');
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
            
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show/hide sections
            Object.values(sections).forEach(section => section.classList.remove('active'));
            if (sections[category]) {
                sections[category].classList.add('active');
            }
            
            // Update URL
            if (typeof updateVaultURL === 'function') {
                updateVaultURL(category);
            }
            
            // Load plans for this category
            loadPlansForCategory(category);
        });
    });
}

function activateCategory(category) {
    const tab = document.querySelector(`.category-tab[data-category="${category}"]`);
    if (tab) {
        tab.click();
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
                const category = section.id.replace('-section', '');
                
                // Update active button
                toggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
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
                
                // Load plans for this performance level
                loadPlansForPerformance(category, performance);
            });
        });
    });
}

function activatePerformance(performance) {
    const toggleBtn = document.querySelector(`.toggle-btn[data-performance="${performance}"]`);
    if (toggleBtn) {
        toggleBtn.click();
    }
}

function loadPlansForCategory(category) {
    // This would load plans for the selected category
    console.log('Loading plans for:', category);
}

function loadPlansForPerformance(category, performance) {
    // This would load plans for the selected performance level
    console.log('Loading', performance, 'plans for:', category);
}

function initPlanSelection() {
    // Plan selection would be handled here
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
            showToast(`Selected plan: ${selectedPlan.name}`, 'success');
            // Here you would typically open a modal or redirect to purchase
        }
    }
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