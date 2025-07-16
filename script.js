// JavaScript for CleanFresh Laundry Website

document.addEventListener('DOMContentLoaded', function () {
    // Loading Screen
    const loadingScreen = document.getElementById('loading-screen');

    // Hide loading screen after page loads
    window.addEventListener('load', function () {
        setTimeout(function () {
            loadingScreen.classList.add('fade-out');
            setTimeout(function () {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Password validation
        const passwordInput = document.getElementById('password');
        const togglePassword = document.getElementById('togglePassword');

        if (passwordInput && togglePassword) {
            // Toggle password visibility
            togglePassword.addEventListener('click', function () {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);

                const icon = this.querySelector('i');
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            });

            // Real-time password validation
            passwordInput.addEventListener('input', function () {
                validatePassword(this.value);
            });
        }

        // Form submission
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (validateForm()) {
                // Show success message
                showAlert('Pesanan berhasil dikirim! Kami akan menghubungi Anda segera.', 'success');
                contactForm.reset();
                resetPasswordRequirements();
            }
        });

        // Real-time validation for text inputs
        const textInputs = ['firstName', 'lastName', 'phone', 'address'];
        textInputs.forEach(function (inputId) {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('input', function () {
                    validateTextInput(this);
                });
            }
        });

        // Email validation
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('input', function () {
                validateEmail(this);
            });
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .feature-card, .team-card').forEach(el => {
        observer.observe(el);
    });
});

// Password validation function
function validatePassword(password) {
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password)
    };

    // Update requirement indicators
    updateRequirement('length-req', requirements.length);
    updateRequirement('uppercase-req', requirements.uppercase);
    updateRequirement('lowercase-req', requirements.lowercase);
    updateRequirement('number-req', requirements.number);

    const passwordInput = document.getElementById('password');
    const isValid = Object.values(requirements).every(req => req);

    if (isValid) {
        passwordInput.classList.remove('is-invalid');
        passwordInput.classList.add('is-valid');
    } else {
        passwordInput.classList.remove('is-valid');
        passwordInput.classList.add('is-invalid');
    }

    return isValid;
}

// Update password requirement indicator
function updateRequirement(elementId, isValid) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove('valid', 'invalid');
        element.classList.add(isValid ? 'valid' : 'invalid');
    }
}

// Reset password requirements display
function resetPasswordRequirements() {
    const requirements = ['length-req', 'uppercase-req', 'lowercase-req', 'number-req'];
    requirements.forEach(req => {
        const element = document.getElementById(req);
        if (element) {
            element.classList.remove('valid', 'invalid');
        }
    });
}

// Text input validation (5-20 characters)
function validateTextInput(input) {
    const value = input.value.trim();
    let isValid = true;

    if (input.id === 'phone') {
        isValid = value.length >= 10 && value.length <= 15 && /^\d+$/.test(value);
    } else if (input.id === 'address') {
        isValid = value.length >= 10;
    } else {
        isValid = value.length >= 5 && value.length <= 20;
    }

    if (value.length === 0) {
        input.classList.remove('is-valid', 'is-invalid');
        return true; // Allow empty for optional fields
    }

    if (isValid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }

    return isValid;
}

// Email validation
function validateEmail(input) {
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    if (email.length === 0) {
        input.classList.remove('is-valid', 'is-invalid');
        return true;
    }

    if (isValid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }

    return isValid;
}

// Complete form validation
function validateForm() {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const address = document.getElementById('address');
    const service = document.getElementById('service');
    const password = document.getElementById('password');
    const terms = document.getElementById('terms');

    let isValid = true;

    // Validate required text inputs
    if (!validateTextInput(firstName) || firstName.value.trim().length === 0) {
        firstName.classList.add('is-invalid');
        isValid = false;
    }

    if (!validateTextInput(lastName) || lastName.value.trim().length === 0) {
        lastName.classList.add('is-invalid');
        isValid = false;
    }

    // Validate email
    if (!validateEmail(email) || email.value.trim().length === 0) {
        email.classList.add('is-invalid');
        isValid = false;
    }

    // Validate phone
    if (!validateTextInput(phone) || phone.value.trim().length === 0) {
        phone.classList.add('is-invalid');
        isValid = false;
    }

    // Validate address
    if (!validateTextInput(address) || address.value.trim().length === 0) {
        address.classList.add('is-invalid');
        isValid = false;
    }

    // Validate service selection
    if (service.value === '') {
        service.classList.add('is-invalid');
        isValid = false;
    } else {
        service.classList.remove('is-invalid');
        service.classList.add('is-valid');
    }

    // Validate password
    if (!validatePassword(password.value)) {
        isValid = false;
    }

    // Validate terms checkbox
    if (!terms.checked) {
        terms.classList.add('is-invalid');
        isValid = false;
    } else {
        terms.classList.remove('is-invalid');
    }

    return isValid;
}

// Price Calculator Function
function calculatePrice() {
    const serviceType = document.getElementById('serviceType');
    const weight = document.getElementById('weight');
    const pickup = document.getElementById('pickup');
    const fragrance = document.getElementById('fragrance');
    const softener = document.getElementById('softener');
    const resultDiv = document.getElementById('calculationResult');

    if (!serviceType || !weight || !resultDiv) return;

    if (!serviceType.value || !weight.value) {
        showAlert('Silakan pilih layanan dan masukkan berat/jumlah', 'warning');
        return;
    }

    const basePrice = parseInt(serviceType.value);
    const weightValue = parseFloat(weight.value);

    let subtotal = basePrice * weightValue;
    let additionalCosts = 0;
    let breakdown = [];

    // Base service
    const serviceName = serviceType.options[serviceType.selectedIndex].text;
    breakdown.push(`${serviceName}: Rp ${subtotal.toLocaleString()}`);

    // Additional services
    if (fragrance && fragrance.checked) {
        const fragranceCost = 1000 * weightValue;
        additionalCosts += fragranceCost;
        breakdown.push(`Pewangi Khusus: Rp ${fragranceCost.toLocaleString()}`);
    }

    if (softener && softener.checked) {
        const softenerCost = 1500 * weightValue;
        additionalCosts += softenerCost;
        breakdown.push(`Pelembut Pakaian: Rp ${softenerCost.toLocaleString()}`);
    }

    // Pickup service
    if (pickup && pickup.checked) {
        if (weightValue >= 5) {
            breakdown.push('Antar Jemput: GRATIS (min. 5kg)');
        } else {
            const pickupCost = 5000;
            additionalCosts += pickupCost;
            breakdown.push(`Antar Jemput: Rp ${pickupCost.toLocaleString()}`);
        }
    }

    const total = subtotal + additionalCosts;

    // Display result
    let html = '<div class="alert alert-success">';
    html += '<h5>Detail Perhitungan:</h5>';
    html += '<ul class="mb-3">';
    breakdown.forEach(item => {
        html += `<li>${item}</li>`;
    });
    html += '</ul>';
    html += `<h4 class="text-primary">Total: Rp ${total.toLocaleString()}</h4>`;
    html += '</div>';

    resultDiv.innerHTML = html;
}

// Show alert message
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert-custom');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Create new alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show alert-custom`;
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.right = '20px';
    alert.style.zIndex = '9999';
    alert.style.minWidth = '300px';

    alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

    document.body.appendChild(alert);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert && alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}