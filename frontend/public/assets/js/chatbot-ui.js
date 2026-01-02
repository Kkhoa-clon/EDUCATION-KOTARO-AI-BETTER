// === CHATBOT UI INTERACTIONS - KOTARO AI ===
// Modern UI with ChatGPT-like layout

document.addEventListener('DOMContentLoaded', function() {
    // Initialize chatbot
    initializeChatbot();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup file upload
    setupFileUpload();
    
    // Setup keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Initialize SoDoGenerator
    initializeSoDoGenerator();
});

function initializeChatbot() {
    const chatbotPopup = document.querySelector('.chatbot-popup');
    if (chatbotPopup) {
        chatbotPopup.classList.add('show');
    }
}

function setupEventListeners() {
    // Back button
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }

    // Chat history items
    const chatHistoryItems = document.querySelectorAll('.chat-history-item');
    chatHistoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            chatHistoryItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
}

function initializeSoDoGenerator() {
    // Khởi tạo SoDoGenerator khi trang được tải
    if (typeof SoDoGenerator !== 'undefined') {
        window.soDoGenerator = new SoDoGenerator();
        window.soDoGenerator.init();
    }
}

function setupFileUpload() {
    const fileInput = document.getElementById('file-input');
    const fileUploadBtn = document.getElementById('file-upload');
    const fileCancelBtn = document.getElementById('file-cancel');
    const filePreview = document.querySelector('.file-upload-wrapper img');
    const fileWrapper = document.querySelector('.file-upload-wrapper');
    
    if (fileUploadBtn && fileInput) {
        fileUploadBtn.addEventListener('click', function() {
            fileInput.click();
        });
    }
    
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        filePreview.src = e.target.result;
                        fileWrapper.classList.add('file-uploaded');
                    };
                    reader.readAsDataURL(file);
                } else {
                    // Handle non-image files
                    fileWrapper.classList.add('file-uploaded');
                    filePreview.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0IDJIMTBDOS40NDc3MiAyIDkgMi40NDc3MiA5IDNWNUg3QzUuODk1NDMgNSA1IDUuODk1NDMgNSA3VjE5QzUgMjAuMTA0NiA1Ljg5NTQzIDIxIDcgMjFIMTdDMTguMTA0NiAyMSAxOSAyMC4xMDQ2IDE5IDE5VjE3SDIxVjE5QzIxIDIxLjIwODkgMTkuMjA4OSAyMyAxNyAyM0g3QzQuNzkxMTMgMjMgMyAyMS4yMDg5IDMgMTlWN0MzIDQuNzkxMTMgNC43OTExMyAzIDcgM0g5VjNDOSA0LjEwNDU3IDkuODk1NDMgNSAxMSA1SDE0QzE1LjEwNDYgNSAxNiA0LjEwNDU3IDE2IDNWMkMxNiAwLjg5NTQzIDE1LjEwNDYgMCAxNCAwWiIgZmlsbD0iIzczZDIzOSIvPgo8L3N2Zz4K';
                }
            }
        });
    }
    
    if (fileCancelBtn) {
        fileCancelBtn.addEventListener('click', function() {
            fileWrapper.classList.remove('file-uploaded');
            fileInput.value = '';
            filePreview.src = '';
        });
    }
}

function setupKeyboardShortcuts() {
    const messageInput = document.querySelector('.message-input');
    const sendButton = document.getElementById('send-message');
    
    if (messageInput) {
        // Auto-resize textarea
        messageInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
        
        // Send message on Enter (without Shift)
        messageInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (sendButton && !sendButton.disabled) {
                    sendButton.click();
                }
            }
        });
        
        // Show/hide send button based on input
        messageInput.addEventListener('input', function() {
            if (sendButton) {
                if (this.value.trim()) {
                    sendButton.style.display = 'flex';
                } else {
                    sendButton.style.display = 'none';
                }
            }
        });
    }
}

// Animation utilities
function addMessageAnimation(messageElement) {
    messageElement.style.opacity = '0';
    messageElement.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        messageElement.style.transition = 'all 0.5s ease-out';
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';
    }, 10);
}

function addTypingIndicator() {
    const chatBody = document.querySelector('.chat-body');
    if (chatBody) {
        const typingMessage = document.createElement('div');
        typingMessage.className = 'message bot-message thinking';
        typingMessage.innerHTML = `
            <img class="bot-avatar" src="https://i.pinimg.com/736x/1b/9d/20/1b9d203c25c64fac1117c96309808415.jpg" alt="Bot Avatar">
            <div class="message-text">
                <div class="thinking-indicator">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        `;
        
        chatBody.appendChild(typingMessage);
        addMessageAnimation(typingMessage);
        scrollToBottom();
        
        return typingMessage;
    }
    return null;
}

function removeTypingIndicator(typingElement) {
    if (typingElement && typingElement.parentNode) {
        typingElement.parentNode.removeChild(typingElement);
    }
}

function scrollToBottom() {
    const chatBody = document.querySelector('.chat-body');
    if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

// Enhanced message display
function displayMessage(content, isBot = true, isMarkdown = false) {
    const chatBody = document.querySelector('.chat-body');
    if (!chatBody) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
    
    if (isBot) {
        messageDiv.innerHTML = `
            <img class="bot-avatar" src="https://i.pinimg.com/736x/1b/9d/20/1b9d203c25c64fac1117c96309808415.jpg" alt="Bot Avatar">
            <div class="message-text">
                ${isMarkdown ? marked.parse(content) : content}
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-text">
                ${content}
            </div>
            <div class="attachment">
                <span class="material-symbols-rounded">person</span>
            </div>
        `;
    }
    
    chatBody.appendChild(messageDiv);
    addMessageAnimation(messageDiv);
    scrollToBottom();
    
    return messageDiv;
}

// Sidebar interactions
function updateChatHistory(title, preview) {
    const chatHistory = document.querySelector('.chat-history');
    if (!chatHistory) return;
    
    const historyItem = document.createElement('div');
    historyItem.className = 'chat-history-item';
    historyItem.innerHTML = `
        <div class="chat-history-title">${title}</div>
        <div class="chat-history-preview">${preview}</div>
    `;
    
    // Remove active class from all items
    document.querySelectorAll('.chat-history-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to new item
    historyItem.classList.add('active');
    
    // Add to beginning of history
    chatHistory.insertBefore(historyItem, chatHistory.firstChild);
    
    // Add click event
    historyItem.addEventListener('click', function() {
        document.querySelectorAll('.chat-history-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    Swal.fire({
        title: type === 'success' ? 'Thành công!' : type === 'error' ? 'Lỗi!' : 'Thông báo',
        text: message,
        icon: type,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: 'rgba(15, 15, 35, 0.95)',
        color: '#fff',
        backdrop: false
    });
}

function formatTimestamp() {
    const now = new Date();
    return now.toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

// Export functions for use in other scripts
window.ChatbotUI = {
    displayMessage,
    addTypingIndicator,
    removeTypingIndicator,
    updateChatHistory,
    showNotification,
    scrollToBottom
}; 