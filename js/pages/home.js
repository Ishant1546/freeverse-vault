// Home Page Specific JavaScript
function initHomePage() {
    // Initialize any home page specific functionality
    initHomeButtons();
    initHomeAnimations();
}

function initHomeButtons() {
    // Home page specific button interactions
    const getStartedButtons = document.querySelectorAll('.btn-primary, .btn-outline');
    getStartedButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.textContent.includes('Get Started') || button.textContent.includes('View Plans')) {
                // Additional tracking or analytics can be added here
                console.log('User clicked:', button.textContent);
            }
        });
    });
}

function initHomeAnimations() {
    // Additional home page animations
    const stats = document.querySelectorAll('.stat');
    stats.forEach((stat, index) => {
        stat.style.animationDelay = `${index * 0.2}s`;
    });
}