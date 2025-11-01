// Notifications Component
function initNotifications() {
    // Toast notification system is available globally
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
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

// Make it globally available
window.showToast = showToast;