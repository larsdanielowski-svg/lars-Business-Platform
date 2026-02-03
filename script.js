document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const date = new Date().toLocaleString();

    const newMessage = {
        id: Date.now(),
        name,
        email,
        message,
        date
    };

    // Get existing messages
    let messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    
    // Add new message
    messages.unshift(newMessage);
    
    // Save back to localStorage
    localStorage.setItem('contact_messages', JSON.stringify(messages));

    // Feedback to user
    const feedback = document.getElementById('formFeedback');
    if (feedback) {
        feedback.innerHTML = '<p style="color: green; margin-top: 1rem;">Vielen Dank! Ihre Nachricht wurde (lokal) gespeichert.</p>';
    }
    
    // Reset form
    this.reset();
});

// Admin Dashboard Logic
function displayMessages() {
    const container = document.getElementById('messageContainer');
    if (!container) return;

    const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');

    if (messages.length === 0) {
        container.innerHTML = '<p>Keine Nachrichten vorhanden.</p>';
        return;
    }

    container.innerHTML = messages.map(msg => `
        <div class="message-card">
            <div class="message-header">
                <span class="message-author">${msg.name} (${msg.email})</span>
                <span>${msg.date}</span>
            </div>
            <div class="message-content">
                ${msg.message}
            </div>
            <button onclick="deleteMessage(${msg.id})" style="margin-top:1rem; color:red; cursor:pointer; background:none; border:none;">Löschen</button>
        </div>
    `).join('');
}

window.deleteMessage = function(id) {
    let messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    messages = messages.filter(m => m.id !== id);
    localStorage.setItem('contact_messages', JSON.stringify(messages));
    displayMessages();
};

window.clearAllMessages = function() {
    if (confirm('Wirklich alle Nachrichten löschen?')) {
        localStorage.removeItem('contact_messages');
        displayMessages();
    }
};
