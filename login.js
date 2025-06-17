// Form switching
const switchToSignup = document.querySelector('.switch-to-signup');
const switchToLogin = document.querySelector('.switch-to-login');
const formsWrapper = document.querySelector('.forms-wrapper');

if (switchToSignup && switchToLogin && formsWrapper) {
    switchToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        formsWrapper.classList.add('show-signup');
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        formsWrapper.classList.remove('show-signup');
    });
}

// Toggle password visibility
const togglePasswordButtons = document.querySelectorAll('.toggle-password');
togglePasswordButtons.forEach(button => {
    button.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});

// Form validation and submission
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.querySelector('input[name="remember"]').checked;
        
        // Add loading state
        const loginButton = this.querySelector('.login-button');
        const originalContent = loginButton.innerHTML;
        loginButton.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <span>Logging in...</span>
        `;
        loginButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Here you would typically make an API call to your backend
            if (isValidEmail(email) && password.length >= 6) {
                showNotification('Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showNotification('Invalid email or password', 'error');
                loginButton.innerHTML = originalContent;
                loginButton.disabled = false;
            }
        }, 1500);
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terms = document.querySelector('input[name="terms"]').checked;
        
        // Validate form
        if (!fullName || fullName.length < 2) {
            showNotification('Please enter your full name', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        if (password.length < 6) {
            showNotification('Password must be at least 6 characters long', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        if (!terms) {
            showNotification('Please accept the Terms & Conditions', 'error');
            return;
        }
        
        // Add loading state
        const signupButton = this.querySelector('.signup-button');
        const originalContent = signupButton.innerHTML;
        signupButton.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <span>Creating account...</span>
        `;
        signupButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Here you would typically make an API call to your backend
            showNotification('Account created successfully! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }, 2000);
    });
}

// Email validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Input focus effects
const inputs = document.querySelectorAll('.input-group input');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
        if (this.value) {
            this.parentElement.classList.add('has-value');
        } else {
            this.parentElement.classList.remove('has-value');
        }
    });
});

// Social login buttons
const socialButtons = document.querySelectorAll('.social-button');

socialButtons.forEach(button => {
    button.addEventListener('click', function() {
        const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
        showNotification(`${provider} login coming soon!`, 'info');
    });
});

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 
                    type === 'error' ? 'fas fa-exclamation-circle' :
                    'fas fa-info-circle';
    
    const text = document.createElement('span');
    text.textContent = message;
    
    notification.appendChild(icon);
    notification.appendChild(text);
    
    document.body.appendChild(notification);
    
    // Add show class after a small delay (for animation)
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(150%);
        transition: transform 0.3s ease;
        z-index: 1000;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        border-left: 4px solid #4CAF50;
    }
    
    .notification.error {
        border-left: 4px solid #f44336;
    }
    
    .notification.info {
        border-left: 4px solid #2196F3;
    }
    
    .notification i {
        font-size: 1.2rem;
    }
    
    .notification.success i {
        color: #4CAF50;
    }
    
    .notification.error i {
        color: #f44336;
    }
    
    .notification.info i {
        color: #2196F3;
    }
    
    .input-group.focused i {
        color: var(--primary-color);
    }
    
    .input-group.has-value i {
        color: var(--dark-gray);
    }
`;

document.head.appendChild(style);

// Initialize page animations
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to showcase images
    const showcaseImages = document.querySelectorAll('.showcase-images img');
    showcaseImages.forEach((img, index) => {
        img.style.opacity = '0';
        img.style.transform = 'translateY(20px)';
        setTimeout(() => {
            img.style.transition = 'all 0.6s ease';
            img.style.opacity = '1';
            img.style.transform = 'translateY(0)';
        }, 600 + (index * 200));
    });
}); 