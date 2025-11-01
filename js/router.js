// URL Routing System
function initURLRouting() {
    // Handle URL changes
    window.addEventListener('popstate', handleURLChange);
    
    // Initial URL handling
    handleURLChange();
    
    // Intercept all internal link clicks
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.href && link.href.startsWith(window.location.origin) && !link.hasAttribute('data-no-routing')) {
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
    // Check if it's a different page or same page with different params
    const currentPath = window.location.pathname;
    const newPath = new URL(url, window.location.origin).pathname;
    
    if (currentPath !== newPath) {
        // Different page - do full navigation
        window.location.href = url;
    } else {
        // Same page - use pushState and handle locally
        history.pushState(null, '', url);
        handleURLChange();
    }
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
    
    if (category && typeof activateCategory === 'function') {
        activateCategory(category);
    } else {
        // No category selected, show welcome message
        showVaultWelcome();
    }
    
    if (performance && typeof activatePerformance === 'function') {
        setTimeout(() => activatePerformance(performance), 100);
    }
    
    if (plan && typeof highlightPlan === 'function') {
        setTimeout(() => highlightPlan(plan), 200);
    }
}

// Update URL when category changes
function updateVaultURL(category, performance = null, plan = null) {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (performance) params.set('performance', performance);
    if (plan) params.set('plan', plan);
    
    const url = '/vault' + (params.toString() ? `?${params.toString()}` : '');
    history.pushState(null, '', url);
}