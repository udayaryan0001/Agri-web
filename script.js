// Word Animation
function animateWords() {
    const words = document.querySelectorAll('.word-animation span');
    let delay = 0;
    
    words.forEach((word) => {
        setTimeout(() => {
            word.classList.add('visible');
        }, delay);
        delay += 500; // Delay between each word (0.5 seconds)
    });
}

// Start animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    animateWords();
    updateCountdown(); // Initial countdown update
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Countdown Timer
function updateCountdown() {
    // Get the initial end time from localStorage or set it if not exists
    let endTime = localStorage.getItem('countdownEndTime');
    if (!endTime) {
        // Set end time to 24 hours from now
        endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
        localStorage.setItem('countdownEndTime', endTime);
    }

    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance < 0) {
        // Reset the countdown when it reaches zero
        localStorage.removeItem('countdownEndTime');
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '24';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Start countdown immediately and update every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Sample speakers data
const speakers = [
    {
        name: "Dr. John Smith",
        title: "Professor of Agricultural Economics",
        image: "https://via.placeholder.com/150"
    },
    {
        name: "Dr. Sarah Johnson",
        title: "Research Director",
        image: "https://via.placeholder.com/150"
    },
    {
        name: "Dr. Michael Brown",
        title: "Senior Economist",
        image: "https://via.placeholder.com/150"
    },
    {
        name: "Dr. Emily Davis",
        title: "Policy Advisor",
        image: "https://via.placeholder.com/150"
    }
];

// Populate speakers section
const speakersContainer = document.querySelector('#speakers .grid');
if (speakersContainer) {
    speakers.forEach(speaker => {
        const speakerCard = document.createElement('div');
        speakerCard.className = 'bg-white p-6 rounded-lg shadow-lg text-center';
        speakerCard.innerHTML = `
            <img src="${speaker.image}" alt="${speaker.name}" class="w-32 h-32 rounded-full mx-auto mb-4">
            <h3 class="text-xl font-semibold mb-2">${speaker.name}</h3>
            <p class="text-gray-600">${speaker.title}</p>
        `;
        speakersContainer.appendChild(speakerCard);
    });
}

// Form submission handling
const registrationForm = document.getElementById('registration-form');
if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Registration submitted successfully!');
    });
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Message sent successfully!');
    });
}

// Smooth scrolling for navigation links
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