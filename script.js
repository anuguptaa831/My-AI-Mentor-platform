const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatBox = document.getElementById('chatBox');
const newChatBtn = document.querySelector('.new-chat-btn');

// 1. Message Send Karne ka Function
async function sendMessage() {
    const text = userInput.value.trim();
    if (text === "") return;

    // User Message Add Karein
    addMessage(text, 'user-message');
    userInput.value = "";



    // 1. User ka message add hone ke baad ye likhein
    try {
        // Hamare local server (server.js) se baat karna

        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, // Yahan ye bracket aur comma lagana zaroori hai
            body: JSON.stringify({ message: text })
        });
        const data = await response.json();

        // 2. Server se aaye asli AI reply ko screen par dikhana
        if (data.reply) {
            addMessage(data.reply, 'ai-message');
        } else {
            addMessage("Kshama karein, AI se jawab nahi mil paya.", 'ai-message');
        }

    } catch (error) {
        console.error("Error:", error);
        addMessage("Server connect nahi ho raha. Kya 'node server.js' chal raha hai?", 'ai-message');
    }
}
// 2.chat mein message display karne k common function

function addMessage(text, className) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${className}`;

    if (className === 'ai-message') {
        // AI message ke liye Markdown format apply karein
        msgDiv.innerHTML = marked.parse(text);
    } else {
        // User message ko normal text rakhein
        msgDiv.innerText = text;
    }

    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// 3. New Chat Button Logic
newChatBtn.addEventListener('click', () => {
    // Chat box khali karein
    chatBox.innerHTML = '';

    // Ek welcome message dobara dikhayein
    addMessage("New chat started.How may i help you:", "ai-message");
});

// Event Listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// menuBtn
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.querySelector('.sidebar');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Mobile par chat par click karte hi sidebar band ho jaye
chatBox.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
    }
});