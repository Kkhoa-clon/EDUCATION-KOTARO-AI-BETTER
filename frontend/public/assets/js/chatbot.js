// === CHATBOT LOGIC - KOTARO AI ===
// Backup toàn bộ logic cũ và cải thiện cho giao diện ChatGPT

// Lấy các phần tử DOM cần thiết
const chatBody = document.querySelector(".chat-body"); // Khung hiển thị nội dung chat
const messageInput = document.querySelector(".message-input"); // Ô nhập tin nhắn
const sendMessageButton = document.querySelector("#send-message"); // Nút gửi tin nhắn
const fileInput = document.querySelector("#file-input"); // Input chọn file
const fileUploadWrapper = document.querySelector(".file-upload-wrapper"); // Khung hiển thị file đã chọn
const fileCancelButton = document.querySelector("#file-cancel"); // Nút hủy file


// Cấu hình API
const API_KEY = "AIzaSyBninbq7h5tAnlzcHLQ8UYryQ-2AAXJTl8"; // API key để kết nối với Gemini
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`; // URL endpoint API

// API 1 : AIzaSyBninbq7h5tAnlzcHLQ8UYryQ-2AAXJTl8
// API 2 : AIzaSyBHLOFCb_BE-iRtcUr8-Y9wHGBMVJxr3wo

// Cấu hình ngôn ngữ tiếng Việt
const VIETNAMESE_SYSTEM_PROMPT = `Bạn là Kotaro AI - một trợ lý AI thông minh và thân thiện. Hãy luôn trả lời bằng tiếng Việt một cách tự nhiên, dễ hiểu và hữu ích. 

QUY TẮC QUAN TRỌNG:
1. LUÔN LUÔN trả lời bằng tiếng Việt, không bao giờ dùng tiếng Anh
2. Ngay cả khi người dùng hỏi bằng tiếng Anh, bạn vẫn phải trả lời bằng tiếng Việt
3. Sử dụng ngôn ngữ thân thiện, gần gũi như đang nói chuyện với bạn
4. Trả lời chi tiết và hữu ích, nhưng không quá dài dòng
5. Nếu được hỏi về code, hãy giải thích bằng tiếng Việt trước, sau đó mới đưa code
6. Khi gặp câu hỏi khó, hãy chia nhỏ vấn đề và giải thích từng bước
7. Luôn tỏ ra nhiệt tình và sẵn sàng giúp đỡ
8. Sử dụng emoji phù hợp để tạo cảm giác thân thiện

TÍNH CÁCH: Thân thiện, kiên nhẫn, hài hước nhẹ nhàng, và luôn muốn giúp đỡ người dùng.

LƯU Ý: Đây là yêu cầu bắt buộc - KHÔNG BAO GIỜ trả lời bằng tiếng Anh, chỉ dùng tiếng Việt.`;

// Đối tượng lưu dữ liệu người dùng
const userData = {
    message: null, // Tin nhắn người dùng
    file: { // File đính kèm
        data: null, // Dữ liệu file dạng base64
        mime_type: null // Loại file
    }
};

// Biến để ngăn chặn gửi nhiều lần
let isProcessingMessage = false;

// Lịch sử chat (ban đầu rỗng)
const chatHistory = [];

// Thêm tin nhắn chào mừng tiếng Việt khi khởi tạo
const welcomeMessage = {
    role: "model",
    parts: [{ text: "Xin chào! Tôi là Kotaro AI 🤖\n\nTôi có thể giúp bạn:\n• Trả lời các câu hỏi về kiến thức\n• Giải thích code và lập trình\n• Tạo sơ đồ với lệnh /taosodo\n• Phân tích hình ảnh bạn gửi\n• Và nhiều thứ khác!\n\nHãy hỏi tôi bất cứ điều gì bạn muốn nhé! 😊" }]
};

// Lưu chiều cao ban đầu của ô nhập tin nhắn
const initialInputHeight = messageInput.scrollHeight;

// Hàm hiển thị tin nhắn chào mừng
const showWelcomeMessage = () => {
    const botAvatarUrl = localStorage.getItem('botAvatarUrl') || 'https://i.pinimg.com/736x/1b/9d/20/1b9d203c25c64fac1117c96309808415.jpg';
    
    const messageContent = `
        <img class="bot-avatar" src="${botAvatarUrl}" alt="Bot Avatar">
        <div class="message-text">
            ${renderBotOutput(welcomeMessage.parts[0].text)}
        </div>`;

    const welcomeMessageDiv = createMessageElement(messageContent, "bot-message");
    chatBody.appendChild(welcomeMessageDiv);
    
    // Xử lý nếu không tải được avatar
    const avatarImg = welcomeMessageDiv.querySelector('.bot-avatar');
    avatarImg.onerror = function() {
        this.src = 'https://i.pinimg.com/736x/1b/9d/20/1b9d203c25c64fac1117c96309808415.jpg';
    };
    
    scrollToBottom();
};

// Hàm tạo phần tử tin nhắn mới
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div"); // Tạo thẻ div
    div.classList.add("message", ...classes); // Thêm các class CSS
    div.innerHTML = content; // Gán nội dung HTML
    return div; // Trả về phần tử đã tạo
};

// Hàm render markdown an toàn và highlight code, hỗ trợ bảng, danh sách, JSON, HTML
function renderBotOutput(rawText) {
    // Kiểm tra nếu là JSON
    try {
        const jsonObj = JSON.parse(rawText);
        return `<pre class="json-block"><code class="json">${JSON.stringify(jsonObj, null, 2)}</code></pre>`;
    } catch (e) {}
    
    // Render markdown trực tiếp
    const html = marked.parse(rawText, {
        breaks: true,
        gfm: true,
        headerIds: false,
        mangle: false,
        sanitize: false
    });
    
    // Tạo thẻ div tạm để xử lý
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Sanitize HTML - loại bỏ các tag nguy hiểm
    tempDiv.querySelectorAll('script, style, iframe, object, embed, form, input, button, select, textarea').forEach(el => el.remove());
    
    // Tạo element tạm để xử lý styling
    const finalDiv = document.createElement('div');
    finalDiv.innerHTML = tempDiv.innerHTML;
    
    // Highlight code blocks với syntax highlighting
    if (window.hljs) {
        finalDiv.querySelectorAll('pre code').forEach(block => {
            // Thêm class cho code block
            block.parentElement.classList.add('code-block');
            window.hljs.highlightElement(block);
        });
    }
    
    // Xử lý inline code
    finalDiv.querySelectorAll('code:not(pre code)').forEach(inlineCode => {
        inlineCode.classList.add('inline-code');
    });
    
    // Xử lý bảng với responsive design
    finalDiv.querySelectorAll('table').forEach(tbl => {
        tbl.classList.add('chatbot-table');
        
        // Thêm wrapper cho bảng để scroll ngang
        if (!tbl.parentElement.classList.contains('table-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('table-wrapper');
            tbl.parentNode.insertBefore(wrapper, tbl);
            wrapper.appendChild(tbl);
        }
        
        // Thêm class cho header và body
        const thead = tbl.querySelector('thead');
        const tbody = tbl.querySelector('tbody');
        if (thead) thead.classList.add('table-header');
        if (tbody) tbody.classList.add('table-body');
        
        // Thêm class cho các cell
        tbl.querySelectorAll('th').forEach(th => th.classList.add('table-header-cell'));
        tbl.querySelectorAll('td').forEach(td => td.classList.add('table-cell'));
    });
    
    // Xử lý danh sách
    finalDiv.querySelectorAll('ul').forEach(ul => {
        ul.classList.add('chatbot-list', 'unordered-list');
        ul.querySelectorAll('li').forEach(li => li.classList.add('list-item'));
    });
    
    finalDiv.querySelectorAll('ol').forEach(ol => {
        ol.classList.add('chatbot-list', 'ordered-list');
        ol.querySelectorAll('li').forEach(li => li.classList.add('list-item'));
    });
    
    // Xử lý blockquote
    finalDiv.querySelectorAll('blockquote').forEach(quote => {
        quote.classList.add('chatbot-quote');
        // Thêm icon quote nếu chưa có
        if (!quote.querySelector('.quote-icon')) {
            const icon = document.createElement('div');
            icon.className = 'quote-icon';
            icon.innerHTML = '❝';
            quote.insertBefore(icon, quote.firstChild);
        }
    });
    
    // Xử lý headings với hierarchy
    finalDiv.querySelectorAll('h1').forEach(h => h.classList.add('chatbot-heading', 'heading-1'));
    finalDiv.querySelectorAll('h2').forEach(h => h.classList.add('chatbot-heading', 'heading-2'));
    finalDiv.querySelectorAll('h3').forEach(h => h.classList.add('chatbot-heading', 'heading-3'));
    finalDiv.querySelectorAll('h4').forEach(h => h.classList.add('chatbot-heading', 'heading-4'));
    finalDiv.querySelectorAll('h5').forEach(h => h.classList.add('chatbot-heading', 'heading-5'));
    finalDiv.querySelectorAll('h6').forEach(h => h.classList.add('chatbot-heading', 'heading-6'));
    
    // Xử lý paragraphs
    finalDiv.querySelectorAll('p').forEach(p => p.classList.add('chatbot-paragraph'));
    
    // Xử lý links
    finalDiv.querySelectorAll('a').forEach(link => {
        link.classList.add('chatbot-link');
        // Thêm target="_blank" cho external links
        if (link.href && !link.href.startsWith('#')) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    });
    
    // Xử lý strong và em
    finalDiv.querySelectorAll('strong, b').forEach(el => el.classList.add('chatbot-bold'));
    finalDiv.querySelectorAll('em, i').forEach(el => el.classList.add('chatbot-italic'));
    
    // Xử lý horizontal rules
    finalDiv.querySelectorAll('hr').forEach(hr => hr.classList.add('chatbot-divider'));
    
    return finalDiv.innerHTML;
}

// Hàm kiểm tra và xử lý lệnh /taosodo
const checkAndHandleSoDoCommand = (message) => {
    const trimmedMessage = message.trim();
    if (trimmedMessage.toLowerCase().startsWith('/taosodo')) {
        // Lấy nội dung sau /taosodo
        const soDoContent = trimmedMessage.substring('/taosodo'.length).trim();
        
        if (soDoContent) {
            // Mở diagram modal và nạp nội dung
            diagramModal.classList.add('show');
            diagramDescription.value = soDoContent;
            
            // Tự động tạo sơ đồ sau 1 giây
            setTimeout(() => {
                generateDiagramBtn.click();
            }, 1000);
            
            return true; // Đã xử lý lệnh
        }
    }
    return false; // Không phải lệnh /taosodo
};

// Hàm tạo phản hồi từ bot qua API
const generateBotResponse = async (incomingMessageDiv) => {
    const messageElement = incomingMessageDiv.querySelector(".message-text"); // Lấy phần hiển thị nội dung

    // Thêm tin nhắn người dùng vào lịch sử chat
    const userParts = [];
    
    // Thêm văn bản nếu có
    if (userData.message) {
        userParts.push({ text: userData.message });
    }
    
    // Thêm ảnh nếu có
    if (userData.file && userData.file.data) {
        userParts.push({ inline_data: userData.file });
    }
    
    chatHistory.push({
        role: "user",
        parts: userParts
    });

    // Cấu hình request gửi đến API với system prompt tiếng Việt
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [
                {
                    role: "user",
                    parts: [{ text: VIETNAMESE_SYSTEM_PROMPT }]
                },
                ...chatHistory
            ]
        })
    }

    try {
        // Gọi API để lấy phản hồi từ bot
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        if (!response.ok) {
            let errorMessage = 'Lỗi không xác định từ API';
            if (data.error?.message) {
                errorMessage = data.error.message;
                // Dịch một số lỗi phổ biến sang tiếng Việt
                if (errorMessage.includes('API key')) {
                    errorMessage = 'Lỗi xác thực API. Vui lòng kiểm tra lại cấu hình.';
                } else if (errorMessage.includes('quota')) {
                    errorMessage = 'Đã hết hạn quota API. Vui lòng thử lại sau.';
                } else if (errorMessage.includes('rate limit')) {
                    errorMessage = 'Quá nhiều yêu cầu. Vui lòng chờ một chút rồi thử lại.';
                }
            }
            throw new Error(errorMessage);
        }

        // Xử lý và hiển thị phản hồi từ bot
        const apiResponseText = data.candidates[0].content.parts[0].text.trim();
        messageElement.innerHTML = renderBotOutput(apiResponseText);
        // Gọi MathJax để render công thức toán học nếu có
        if (window.MathJax) {
            MathJax.typesetPromise([messageElement]);
        }
        // Lưu phản hồi vào lịch sử chat
        chatHistory.push({
            role: "model",
            parts: [{ text: apiResponseText }]
        });
    } catch (error) {
        // Xử lý lỗi nếu có
        handleApiError(messageElement, error);
    } finally {
        // Dọn dẹp sau khi xử lý xong
        userData.file = {};
        fileUploadWrapper.classList.remove("file-uploaded");
        incomingMessageDiv.classList.remove("thinking");
        isProcessingMessage = false; // Reset trạng thái
        scrollToBottom();
    }
};

// Hàm xử lý khi người dùng gửi tin nhắn
const handleOutgoingMessage = (e) => {
    e.preventDefault();
    
    // Ngăn chặn gửi nhiều lần
    if (isProcessingMessage) {
        return;
    }
    
    // Lấy nội dung tin nhắn và kiểm tra điều kiện gửi
    const messageText = messageInput.value.trim();
    const hasImage = userData.file && userData.file.data;
    
    // Cho phép gửi nếu có text hoặc có ảnh
    if (!messageText && !hasImage) {
        messageInput.focus();
        return;
    }
    
    // Đánh dấu đang xử lý
    isProcessingMessage = true;
    
    // Lưu message vào userData
    userData.message = messageText;
    
    // Xóa input và reset UI
    messageInput.value = "";
    messageInput.placeholder = "Nhập tin nhắn...";
    messageInput.dispatchEvent(new Event("input"));

    // Tạo và hiển thị tin nhắn người dùng
    let messageContent = `<div class="message-text">`;
    
    // Thêm ảnh trước (như Zalo)
    if (hasImage) {
        messageContent += `<div class="message-image">
            <img src="data:${userData.file.mime_type};base64,${userData.file.data}" 
                 class="chat-image" 
                 onclick="openImageModal(this.src)" 
                 alt="Uploaded image" />
        </div>`;
    }
    
    // Thêm text sau ảnh
    if (messageText) {
        messageContent += `<div class="message-text-content">${messageText}</div>`;
    } else {
        messageContent += `<div class="message-text-content"><em>Đã gửi ảnh để AI phân tích</em></div>`;
    }
    
    messageContent += `</div>`;

    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
    chatBody.appendChild(outgoingMessageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Kiểm tra xem có phải lệnh /taosodo không
    const isSoDoCommand = checkAndHandleSoDoCommand(userData.message);

    // Nếu là lệnh /taosodo, chỉ tạo sơ đồ, không gửi tin nhắn tới chatbot
    if (isSoDoCommand) {
        // Chỉ tạo sơ đồ, không gọi API chatbot
        isProcessingMessage = false; // Reset trạng thái
        return;
    }

    // Hiển thị trạng thái "bot đang suy nghĩ" sau 0.6s
    setTimeout(() => {
        // Lấy avatar từ localStorage hoặc dùng mặc định
        const botAvatarUrl = localStorage.getItem('botAvatarUrl') || 'https://i.pinimg.com/736x/1b/9d/20/1b9d203c25c64fac1117c96309808415.jpg';

        // Tạo nội dung tin nhắn "đang suy nghĩ"
        const messageContent = `
            <img class="bot-avatar" src="${botAvatarUrl}" alt="Bot Avatar">
            <div class="message-text">
                <div class="thinking-indicator">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>`;

        const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
        chatBody.appendChild(incomingMessageDiv);
        scrollToBottom();

        // Xử lý nếu không tải được avatar
        const avatarImg = incomingMessageDiv.querySelector('.bot-avatar');
        avatarImg.onerror = function() {
            this.src = 'https://i.pinimg.com/736x/1b/9d/20/1b9d203c25c64fac1117c96309808415.jpg';
        };

        // Gọi API để lấy phản hồi từ bot
        generateBotResponse(incomingMessageDiv);
    }, 600);
};
function updateBotAvatar(newAvatarUrl) {
    // Lưu vào localStorage để giữ avatar khi refresh trang
    localStorage.setItem('botAvatarUrl', newAvatarUrl);

    // Cập nhật tất cả avatar bot trong chat
    document.querySelectorAll('.bot-avatar').forEach(avatar => {
        avatar.src = newAvatarUrl;
    });
}

// Xử lý sự kiện nhấn Enter để gửi tin nhắn
messageInput.addEventListener("keydown", (e) => {
    const userMessage = e.target.value.trim();
    const hasImage = userData.file && userData.file.data;
    
    // Cho phép gửi nếu có text hoặc có ảnh
    if (e.key === "Enter" && (userMessage || hasImage) && !e.shiftKey && window.innerWidth > 768) {
        handleOutgoingMessage(e);
    }
});

// Tự động điều chỉnh chiều cao ô nhập tin nhắn
messageInput.addEventListener("input", (e) => {
    messageInput.style.height = `${initialInputHeight}px`;
    messageInput.style.height = `${messageInput.scrollHeight}px`;
    document.querySelector(".chat-form").style.boderRadius = messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
});

// Xử lý khi người dùng chọn file
fileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
        // Hiển thị thông báo lỗi nếu file không hợp lệ với z-index cao nhất
        await Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Chỉ chấp nhận file ảnh (JPEG, PNG, GIF, WEBP)',
            confirmButtonText: 'OK',
            customClass: {
                popup: 'high-z-index-swal' // Thêm class custom cho popup
            },
            didOpen: () => {
                // Đảm bảo popup luôn hiển thị trên tất cả các phần tử khác
                const popup = Swal.getPopup();
                popup.style.zIndex = '999999';
            }
        });
        resetFileInput();
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        fileUploadWrapper.querySelector("img").src = e.target.result;
        fileUploadWrapper.classList.add("file-uploaded");
        const base64String = e.target.result.split(",")[1];
        userData.file = {
            data: base64String,
            mime_type: file.type
        };
        
        // Cập nhật placeholder để hướng dẫn người dùng
        if (!messageInput.value.trim()) {
            messageInput.placeholder = "Nhập yêu cầu về ảnh (tùy chọn) hoặc nhấn Enter để gửi";
        }
    };
    reader.readAsDataURL(file);
});

// Xử lý khi nhấn nút hủy file
fileCancelButton.addEventListener("click", (e) => {
    userData.file = {};
    fileUploadWrapper.classList.remove("file-uploaded");
});

// Hiển thị tin nhắn chào mừng khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    // Chỉ hiển thị tin nhắn chào mừng nếu chưa có tin nhắn nào
    if (chatBody.children.length === 0) {
        showWelcomeMessage();
    }
});

// Đã bỏ tính năng emoji picker

// Gán sự kiện cho các nút
sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e));
document.querySelector("#file-upload").addEventListener("click", (e) => fileInput.click());

// Hàm thay đổi logo và avatar chatbot
function updateChatbotImages(logoUrl, avatarUrl) {
    // Cập nhật logo
    const logo = document.querySelector('.chatbot-logo');
    if (logo) {
        logo.src = logoUrl;
        logo.onerror = function() {
            logo.src = 'https://i.pinimg.com/736x/1b/9d/20/1b9d203c25c64fac1117c96309808415.jpg';
        };
    }

    // Cập nhật avatar
    const avatar = document.querySelector('.bot-avatar');
    if (avatar) {
        avatar.src = avatarUrl;
        avatar.onerror = function() {
            avatar.src = 'https://i.pinimg.com/736x/1b/9d/20/1b9d203c25c64fac1117c96309808415.jpg';
        };
    }
}

// Sự kiện mở/đóng diagram modal
const createDiagramBtn = document.getElementById('create-diagram-btn');
const diagramModal = document.getElementById('diagram-modal');
const closeDiagramModal = document.getElementById('close-diagram-modal');
const generateDiagramBtn = document.getElementById('generate-diagram-btn');
const diagramDescription = document.getElementById('diagram-description');

createDiagramBtn.addEventListener('click', () => {
    diagramModal.classList.add('show');
    diagramDescription.focus();
});

closeDiagramModal.addEventListener('click', () => {
    diagramModal.classList.remove('show');
    document.getElementById('diagram-result').style.display = 'none';
    diagramDescription.value = '';
});

// Đóng modal khi click bên ngoài
diagramModal.addEventListener('click', (e) => {
    if (e.target === diagramModal) {
        diagramModal.classList.remove('show');
        document.getElementById('diagram-result').style.display = 'none';
        diagramDescription.value = '';
    }
});

// Xử lý tạo sơ đồ
generateDiagramBtn.addEventListener('click', async () => {
    const description = diagramDescription.value.trim();
    if (!description) {
        Swal.fire('Lỗi', 'Vui lòng nhập mô tả sơ đồ!', 'warning');
        return;
    }

    // Hiển thị loading
    generateDiagramBtn.disabled = true;
    generateDiagramBtn.innerHTML = '<span class="material-symbols-rounded">hourglass_empty</span> Đang tạo...';

    try {
        // Gọi API tạo sơ đồ trực tiếp
        const result = await window.soDoGenerator.generateSoDo(description);
        
        if (result.success) {
            // Hiển thị kết quả trong modal
            const resultDiv = document.getElementById('diagram-result');
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = `
                <div class="diagram-message">
                    <div class="diagram-header">
                        <div class="diagram-title">
                            <span class="material-symbols-rounded">account_tree</span>
                            Sơ đồ đã tạo
                        </div>
                        <div class="diagram-actions">
                            <button class="diagram-action-btn" onclick="downloadDiagram('${encodeURIComponent(result.mermaidCode)}')">
                                <span class="material-symbols-rounded">download</span>
                                Tải xuống
                            </button>
                            <button class="diagram-action-btn" onclick="viewDiagramDetail('${encodeURIComponent(result.mermaidCode)}')">
                                <span class="material-symbols-rounded">visibility</span>
                                Xem chi tiết
                            </button>
                        </div>
                    </div>
                    <div class="diagram-content" id="modal-diagram-content">
                        <!-- Sơ đồ sẽ được render ở đây -->
                    </div>
                </div>
            `;

            // Render sơ đồ
            await window.soDoGenerator.renderMermaidDiagram(result.mermaidCode, 'modal-diagram-content', false);

            // Thêm sơ đồ vào chat
            addDiagramToChat(description, result.mermaidCode);

        } else {
            throw new Error(result.error || 'Không thể tạo sơ đồ');
        }
    } catch (error) {
        Swal.fire('Lỗi', error.message || 'Không thể tạo sơ đồ. Vui lòng thử lại!', 'error');
        // console.error('Diagram generation error:', error);
    } finally {
        // Khôi phục nút
        generateDiagramBtn.disabled = false;
        generateDiagramBtn.innerHTML = '<span class="material-symbols-rounded">account_tree</span> Tạo Sơ Đồ';
    }
});

// Hàm thêm sơ đồ vào chat
function addDiagramToChat(description, mermaidCode) {
    const botAvatarUrl = localStorage.getItem('botAvatarUrl') || 'https://i.pinimg.com/736x/1b/9d/20/1b9d203c25c64fac1117c96309808415.jpg';
    
    const messageContent = `
        <img class="bot-avatar" src="${botAvatarUrl}" alt="Bot Avatar">
        <div class="message-text">
            <p><strong>Đã tạo sơ đồ cho:</strong> ${description}</p>
            <div class="diagram-message">
                <div class="diagram-header">
                    <div class="diagram-title">
                        <span class="material-symbols-rounded">account_tree</span>
                        Sơ đồ khối
                    </div>
                    <div class="diagram-actions">
                        <button class="diagram-action-btn" onclick="downloadDiagram('${encodeURIComponent(mermaidCode)}')">
                            <span class="material-symbols-rounded">download</span>
                            Tải xuống
                        </button>
                        <button class="diagram-action-btn" onclick="viewDiagramDetail('${encodeURIComponent(mermaidCode)}')">
                            <span class="material-symbols-rounded">visibility</span>
                            Xem chi tiết
                        </button>
                    </div>
                </div>
                <div class="diagram-content" id="chat-diagram-${Date.now()}">
                    <!-- Sơ đồ sẽ được render ở đây -->
                </div>
            </div>
        </div>`;

    const diagramMessageDiv = createMessageElement(messageContent, "bot-message");
    chatBody.appendChild(diagramMessageDiv);
    
    // Xử lý nếu không tải được avatar
    const avatarImg = diagramMessageDiv.querySelector('.bot-avatar');
    avatarImg.onerror = function() {
        this.src = 'https://i.pinimg.com/736x/1b/9d/20/1b9d203c25c64fac1117c96309808415.jpg';
    };
    
    // Render sơ đồ
    window.soDoGenerator.renderMermaidDiagram(mermaidCode, `chat-diagram-${Date.now()}`, false);
    
    scrollToBottom();
}

// Hàm tải xuống sơ đồ
function downloadDiagram(encodedCode) {
    try {
        const mermaidCode = decodeURIComponent(encodedCode);
        if (window.soDoGenerator && typeof window.soDoGenerator.downloadDiagram === 'function') {
            window.soDoGenerator.downloadDiagram(mermaidCode);
        } else {
            // console.error('SoDoGenerator not available');
            Swal.fire('Lỗi', 'Tính năng tải xuống không khả dụng', 'error');
        }
    } catch (error) {
        // console.error('Error downloading diagram:', error);
        Swal.fire('Lỗi', 'Không thể tải xuống sơ đồ', 'error');
    }
}

// Hàm xem chi tiết sơ đồ
function viewDiagramDetail(encodedCode) {
    try {
        const mermaidCode = decodeURIComponent(encodedCode);
        
        // Tạo modal chi tiết trực tiếp
        const detailModal = document.createElement('div');
        detailModal.className = 'diagram-detail-modal';
        detailModal.innerHTML = `
            <div class="diagram-detail-content">
                <div class="diagram-detail-header">
                    <h3>Xem chi tiết sơ đồ</h3>
                    <button class="diagram-detail-close" onclick="closeDetailModal()">
                        <span class="material-symbols-rounded">close</span>
                    </button>
                </div>
                <div class="diagram-detail-body">
                    <div class="diagram-detail-preview">
                        <div class="diagram-detail-zoom-container" id="detail-zoom-container">
                            <div class="diagram-detail-zoom-content" id="detail-zoom-content"></div>
                        </div>
                    </div>
                    <div class="diagram-detail-actions">
                        <button class="diagram-detail-btn" onclick="downloadDiagram('${encodedCode}')">
                            <span class="material-symbols-rounded">download</span>
                            Tải về
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(detailModal);
        
        // Đóng modal tạo sơ đồ nếu đang mở
        const diagramModal = document.getElementById('diagram-modal');
        if (diagramModal && diagramModal.classList.contains('show')) {
            diagramModal.classList.remove('show');
        }
        
        // Render sơ đồ với zoom
        if (window.soDoGenerator && typeof window.soDoGenerator.renderMermaidDiagram === 'function') {
            window.soDoGenerator.renderMermaidDiagram(mermaidCode, 'detail-zoom-content', true);
        }
        
        // Thiết lập event listeners
        setupDetailModalEvents(detailModal);
        
    } catch (error) {
        // console.error('Error viewing diagram detail:', error);
        Swal.fire('Lỗi', 'Không thể xem chi tiết sơ đồ', 'error');
    }
}

// Hàm đóng modal chi tiết
function closeDetailModal() {
    const detailModal = document.querySelector('.diagram-detail-modal');
    if (detailModal) {
        document.body.removeChild(detailModal);
    }
}

// Thiết lập events cho modal chi tiết
function setupDetailModalEvents(modal) {
    // Đóng khi click bên ngoài
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeDetailModal();
        }
    });
    
    // Đóng khi nhấn ESC
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            closeDetailModal();
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}

// Hàm mở modal xem ảnh
function openImageModal(imageSrc) {
    Swal.fire({
        imageUrl: imageSrc,
        imageWidth: '80%',
        imageHeight: 'auto',
        imageAlt: 'Hình ảnh',
        showConfirmButton: false,
        showCloseButton: true,
        background: 'rgba(0, 0, 0, 0.9)',
        customClass: {
            popup: 'image-modal-popup',
            closeButton: 'image-modal-close'
        }
    });
}

// ========== ERROR HANDLING ========== //
function handleApiError(messageElement, error) {
    let msg = error.message || error.toString();
    
    // Dịch các lỗi phổ biến sang tiếng Việt
    if (msg.includes('overloaded') || msg.includes('quota')) {
        msg = 'Hệ thống AI đang quá tải hoặc hết quota. Vui lòng thử lại sau vài phút!';
    } else if (msg.includes('network') || msg.includes('fetch')) {
        msg = 'Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet và thử lại!';
    } else if (msg.includes('timeout')) {
        msg = 'Yêu cầu bị timeout. Vui lòng thử lại!';
    } else if (msg.includes('API key')) {
        msg = 'Lỗi xác thực API. Vui lòng liên hệ admin để kiểm tra!';
    } else if (msg.includes('rate limit')) {
        msg = 'Quá nhiều yêu cầu. Vui lòng chờ một chút rồi thử lại!';
    } else if (msg.includes('content') || msg.includes('inappropriate')) {
        msg = 'Nội dung không phù hợp. Vui lòng thử lại với câu hỏi khác!';
    }
    
    messageElement.innerHTML = `
        <div style="color:#ff6b6b; background:#2d2d3a; padding:1em; border-radius:8px; border-left:4px solid #ff6b6b;">
            <strong>❌ Lỗi:</strong> ${msg}
        </div>
    `;
    
    // Reset trạng thái xử lý khi có lỗi
    isProcessingMessage = false;
}

// ========== UI & RENDER ========== //
function scrollToBottom() {
    chatBody.scrollTo({ behavior: "smooth", top: chatBody.scrollHeight });
}
function resetFileInput() {
    fileInput.value = "";
    fileUploadWrapper.classList.remove("file-uploaded");
    const img = fileUploadWrapper.querySelector("img");
    if (img) img.src = "#";
    userData.file = { data: null, mime_type: null };
    const form = document.querySelector(".chat-form");
    if (form) form.reset();
}
