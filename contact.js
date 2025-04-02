function submitContactForm(event) {
    event.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    if (!name || !email || !message) {
        alert('Please fill in all required fields');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Create contact submission in Firebase
    const contactsRef = firebase.database().ref('contacts');
    const newContact = contactsRef.push();

    newContact.set({
        name: name,
        email: email,
        subject: subject || '',
        message: message,
        createdAt: firebase.database.ServerValue.TIMESTAMP
    })
    .then(() => {
        alert('Message sent successfully!');
        // Clear form
        document.getElementById('contact-form').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
} 