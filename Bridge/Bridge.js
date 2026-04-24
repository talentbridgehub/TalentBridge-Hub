// Auth View Toggle
document.addEventListener('DOMContentLoaded', function() {
  const toggleLinks = document.querySelectorAll('.toggle-view');
  const signupView = document.getElementById('signupView');
  const loginView = document.getElementById('loginView');
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');

  // Toggle between signup and login views
  toggleLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetView = this.getAttribute('data-view');
      
      if (targetView === 'login') {
        signupView.classList.add('hidden');
        loginView.classList.remove('hidden');
      } else if (targetView === 'signup') {
        loginView.classList.add('hidden');
        signupView.classList.remove('hidden');
      }
    });
  });

  // Handle signup form submission
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;
    const termsChecked = document.querySelector('input[name="terms"]').checked;

    // Validation
    if (!name) {
      showError('Please enter your full name');
      return;
    }

    if (!isValidEmail(email)) {
      showError('Please enter a valid email address');
      return;
    }

    if (password.length < 8) {
      showError('Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      showError('Passwords do not match');
      return;
    }

    if (!termsChecked) {
      showError('Please agree to the Terms and Conditions');
      return;
    }

    // If all validations pass, store the user data and switch to login
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);
    
    // Show success message
    showSuccess('Account created successfully! Please log in.');
    
    // Reset form
    signupForm.reset();
    
    // Switch to login view after a short delay
    setTimeout(() => {
      // Pre-fill the login email
      document.getElementById('login-email').value = email;
      signupView.classList.add('hidden');
      loginView.classList.remove('hidden');
    }, 1500);
  });

  // Handle login form submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const rememberMe = document.querySelector('input[name="remember"]').checked;

    // Validation
    if (!email) {
      showError('Please enter your email');
      return;
    }

    if (!isValidEmail(email)) {
      showError('Please enter a valid email address');
      return;
    }

    if (!password) {
      showError('Please enter your password');
      return;
    }

    // Check if this email was registered
    const registeredEmail = localStorage.getItem('userEmail');
    if (email !== registeredEmail) {
      showError('Email not found. Please sign up first.');
      return;
    }

    // If remember me is checked, store the email
    if (rememberMe) {
      localStorage.setItem('rememberEmail', email);
    } else {
      localStorage.removeItem('rememberEmail');
    }

    // Show success message
    showSuccess('Login successful! Redirecting...');
    
    // Simulate redirect after login
    setTimeout(() => {
      // Redirect to dashboard or home page
      window.location.href = '../Landing/index.html';
    }, 1500);
  });

  // Load remembered email if available
  const rememberedEmail = localStorage.getItem('rememberEmail');
  if (rememberedEmail) {
    document.getElementById('login-email').value = rememberedEmail;
  }
});

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show error message
function showError(message) {
  // Remove existing alerts
  removeAlerts();
  
  const alert = document.createElement('div');
  alert.className = 'alert alert-error';
  alert.innerHTML = `
    <i class="fas fa-exclamation-circle"></i>
    <span>${message}</span>
  `;
  
  const card = document.querySelector('.login-card');
  card.insertBefore(alert, card.firstChild);
  
  // Auto-remove after 5 seconds
  setTimeout(removeAlerts, 5000);
}

// Show success message
function showSuccess(message) {
  // Remove existing alerts
  removeAlerts();
  
  const alert = document.createElement('div');
  alert.className = 'alert alert-success';
  alert.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>${message}</span>
  `;
  
  const card = document.querySelector('.login-card');
  card.insertBefore(alert, card.firstChild);
}

// Remove all alert messages
function removeAlerts() {
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => alert.remove());
}

// Clear password fields on view change (for security)
document.addEventListener('click', function(e) {
  if (e.target.closest('.toggle-view')) {
    document.getElementById('signup-password').value = '';
    document.getElementById('signup-confirm').value = '';
    document.getElementById('login-password').value = '';
  }
});
