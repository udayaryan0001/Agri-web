// Initialize reCAPTCHA verifier
let recaptchaVerifier;
let confirmationResult;
let phoneVerified = false;

// Timer variables
let timerInterval;
let timeLeft;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize reCAPTCHA
    recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
            // Enable the Send OTP button when reCAPTCHA is solved
            document.getElementById('send-otp-btn').disabled = false;
        }
    });
    recaptchaVerifier.render();

    // OTP Input Handling
    const otpInputs = document.querySelectorAll('.otp-input');
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1) {
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });

    // Send OTP Button Click Handler
    document.getElementById('send-otp-btn').addEventListener('click', async () => {
        const phoneNumber = document.getElementById('phone').value;
        if (!phoneNumber) {
            showError('Please enter a phone number');
            return;
        }

        try {
            const formattedPhone = formatPhoneNumber(phoneNumber);
            confirmationResult = await firebase.auth().signInWithPhoneNumber(formattedPhone, recaptchaVerifier);
            
            // Show OTP section and start timer
            document.getElementById('otp-section').style.display = 'block';
            startTimer();
            
            // Disable send OTP button temporarily
            document.getElementById('send-otp-btn').disabled = true;
        } catch (error) {
            showError('Error sending OTP: ' + error.message);
        }
    });

    // Verify OTP Button Click Handler
    document.getElementById('verify-otp-btn').addEventListener('click', async () => {
        const otp = Array.from(otpInputs).map(input => input.value).join('');
        if (otp.length !== 6) {
            showError('Please enter a valid 6-digit OTP');
            return;
        }

        try {
            await confirmationResult.confirm(otp);
            phoneVerified = true;
            showSuccess();
            clearTimer();
        } catch (error) {
            showError('Invalid OTP. Please try again.');
        }
    });

    // Resend OTP Button Click Handler
    document.getElementById('resend-otp-btn').addEventListener('click', async () => {
        if (!timeLeft) {
            const phoneNumber = document.getElementById('phone').value;
            try {
                const formattedPhone = formatPhoneNumber(phoneNumber);
                confirmationResult = await firebase.auth().signInWithPhoneNumber(formattedPhone, recaptchaVerifier);
                startTimer();
            } catch (error) {
                showError('Error resending OTP: ' + error.message);
            }
        }
    });
});

// Helper Functions
function formatPhoneNumber(phone) {
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Add country code if not present
    if (!cleaned.startsWith('+')) {
        return '+91' + cleaned; // Assuming Indian phone numbers
    }
    return cleaned;
}

function showError(message) {
    const errorElement = document.getElementById('verification-error');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
    setTimeout(() => {
        errorElement.classList.add('hidden');
    }, 5000);
}

function showSuccess() {
    document.getElementById('phone-verified').classList.remove('hidden');
    document.getElementById('otp-section').style.display = 'none';
    document.getElementById('send-otp-btn').disabled = true;
}

function startTimer() {
    timeLeft = 30; // 30 seconds cooldown
    updateTimer();
    
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        
        if (timeLeft <= 0) {
            clearTimer();
        }
    }, 1000);
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    if (timeLeft > 0) {
        timerElement.textContent = `Resend OTP in ${timeLeft}s`;
        document.getElementById('resend-otp-btn').disabled = true;
    } else {
        timerElement.textContent = '';
        document.getElementById('resend-otp-btn').disabled = false;
    }
}

function clearTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    timeLeft = 0;
    updateTimer();
}

// Form submission handler
const form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!phoneVerified) {
        showError('Please verify your phone number before submitting');
        return;
    }
    
    // Continue with form submission
    // ... rest of your form submission code ...
}); 