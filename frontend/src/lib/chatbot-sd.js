// JavaScript cho tính năng tạo sơ đồ - Phiên bản đã được clean code
class SoDoGenerator {
    constructor() {
        this.apiKey = 'AIzaSyBninbq7h5tAnlzcHLQ8UYryQ-2AAXJTl8';
        this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
        this.maxRetries = 3;
        this.currentZoom = 1;
        this.zoomStep = 0.2;
        this.minZoom = 0.5;
        this.maxZoom = 3;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadMermaid();
        this.validateAPIKey();
    }

    validateAPIKey() {
        if (!this.apiKey || this.apiKey.length < 10) {
            console.warn('API key not configured or invalid, using demo mode');
            return false;
        }
        
        if (!this.apiKey.startsWith('AIza')) {
            console.warn('API key format may be invalid');
            return false;
        }
        
        return true;
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'tao-so-do-btn') {
                this.generateSoDo();
            }
        });
    }

    loadMermaid() {
        if (typeof mermaid === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js';
            script.onload = () => {
                mermaid.initialize({
                    startOnLoad: true,
                    theme: 'default',
                    flowchart: {
                        useMaxWidth: true,
                        htmlLabels: true
                    }
                });
            };
            document.head.appendChild(script);
        }
    }

    async generateSoDo(userInput = null) {
        // Nếu không có userInput, lấy từ message-input (cho tính năng cũ)
        if (!userInput) {
        const messageInput = document.querySelector('.message-input');
            userInput = messageInput ? messageInput.value.trim() : '';
        }

        if (!userInput) {
            return { success: false, error: 'Vui lòng nhập nội dung để tạo sơ đồ!' };
        }

        try {
            const mermaidCode = await this.callGeminiAPI(userInput);
            if (mermaidCode) {
                return { success: true, mermaidCode: mermaidCode };
            } else {
                return { success: false, error: 'Không thể tạo sơ đồ' };
            }
        } catch (error) {
            // console.error('Lỗi khi tạo sơ đồ:', error);
            const errorMessage = this.getErrorMessage(error);
            return { success: false, error: errorMessage };
        }
    }

    getErrorMessage(error) {
        if (error.message.includes('404')) {
            return 'API endpoint không tìm thấy. Vui lòng kiểm tra cấu hình API key hoặc thử lại sau.';
        } else if (error.message.includes('401') || error.message.includes('403')) {
            return 'API key không hợp lệ hoặc hết hạn. Vui lòng kiểm tra lại.';
        } else if (error.message.includes('429')) {
            return 'Quá nhiều yêu cầu. Vui lòng thử lại sau 1 phút.';
        } else if (error.message.includes('network') || error.message.includes('Failed to fetch')) {
            return 'Lỗi kết nối mạng. Vui lòng kiểm tra internet và thử lại.';
        } else if (error.name === 'AbortError') {
            return 'Request timeout - vui lòng thử lại';
        }
        return 'Có lỗi xảy ra khi tạo sơ đồ.';
    }

    async callGeminiAPI(userInput, retryCount = 0) {
        const prompt = this.buildPrompt(userInput);

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000);
            
            const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.1,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1000,
                    }
                }),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorText = await response.text();
                // console.error('API Response Error:', errorText);
                
                // Xử lý các lỗi HTTP cụ thể
                if (response.status === 400) {
                    throw new Error('Yêu cầu không hợp lệ. Vui lòng kiểm tra lại nội dung.');
                } else if (response.status === 401) {
                    throw new Error('API key không hợp lệ hoặc hết hạn.');
                } else if (response.status === 403) {
                    throw new Error('Không có quyền truy cập API.');
                } else if (response.status === 429) {
                    throw new Error('Quá nhiều yêu cầu. Vui lòng thử lại sau.');
                } else if (response.status >= 500) {
                    throw new Error('Lỗi server. Vui lòng thử lại sau.');
                } else {
                    throw new Error(`Lỗi HTTP: ${response.status}`);
                }
            }

            const data = await response.json();
            // console.log('API Response:', data); // Debug log
            
            const generatedText = this.extractGeneratedText(data);
            // console.log('Extracted text:', generatedText); // Debug log
            
            if (!generatedText || generatedText.trim().length === 0) {
                throw new Error('API trả về nội dung rỗng');
            }
            
            const cleanedCode = this.cleanMermaidCode(generatedText);
            // console.log('Cleaned code:', cleanedCode); // Debug log
            
            if (this.isValidMermaidCode(cleanedCode)) {
                return cleanedCode;
            } else if (retryCount < this.maxRetries) {
                // console.log(`Lần thử ${retryCount + 1}: Code không hợp lệ, thử lại...`);
                return await this.callGeminiAPI(userInput, retryCount + 1);
            } else {
                throw new Error('Không thể tạo code Mermaid hợp lệ sau nhiều lần thử. Vui lòng thử lại với mô tả khác.');
            }
        } catch (error) {
            // console.error('API Error:', error);
            throw error;
        }
    }

    buildPrompt(userInput) {
        return `Bạn là chuyên gia tạo sơ đồ khối. Tạo code Mermaid.js flowchart cho yêu cầu sau.

QUY TẮC BẮT BUỘC:
1. CHỈ TRẢ VỀ CODE MERMAID, KHÔNG CÓ GIẢI THÍCH, MARKDOWN, HOẶC TEXT KHÁC
2. Bắt đầu bằng "flowchart TD" (top-down) hoặc "graph LR" (left-right)
3. ID node: chỉ dùng chữ cái thường, số, dấu gạch dưới (a-z, 0-9, _)
4. Nhãn tiếng Việt: đặt trong dấu ngoặc kép ["nhãn"]
5. Tối đa 8 node để dễ đọc
6. Dùng [] cho thao tác, {} cho điều kiện, () cho dữ liệu
7. Kết nối: --> cho mũi tên thường, -->|text| cho mũi tên có nhãn
8. Đảm bảo sơ đồ có logic rõ ràng và dễ hiểu

VÍ DỤ CHUẨN:
flowchart TD
    A["Bắt đầu"] --> B{"Kiểm tra điều kiện"}
    B -->|Đúng| C["Xử lý 1"]
    B -->|Sai| D["Xử lý 2"]
    C --> E["Kết quả"]
    D --> E

YÊU CẦU: ${userInput}

TRẢ LỜI:`;
    }

    extractGeneratedText(data) {
        // Kiểm tra cấu trúc API response
        if (!data.candidates || !Array.isArray(data.candidates) || data.candidates.length === 0) {
            // console.error('Invalid API response structure - no candidates:', data);
            throw new Error('Invalid response format from API - no candidates');
        }

        const candidate = data.candidates[0];
        if (!candidate.content || !candidate.content.parts || !Array.isArray(candidate.content.parts) || candidate.content.parts.length === 0) {
            // console.error('Invalid API response structure - no content parts:', candidate);
            throw new Error('Invalid response format from API - no content parts');
        }

        const part = candidate.content.parts[0];
        if (!part.text) {
            // console.error('Invalid API response structure - no text in part:', part);
            throw new Error('Invalid response format from API - no text content');
        }

        return part.text;
    }

    cleanMermaidCode(code) {
        if (!code) return '';
        
        let cleaned = code.trim()
            // Loại bỏ markdown code blocks
            .replace(/```mermaid\s*/gi, '')
            .replace(/```\s*$/gi, '')
            .replace(/```\w*\s*/gi, '')
            // Loại bỏ HTML comments
            .replace(/<!--.*?-->/g, '')
            // Loại bỏ CSS comments
            .replace(/\/\*.*?\*\//g, '')
            // Loại bỏ single line comments
            .replace(/\/\/.*$/gm, '')
            // Loại bỏ # comments
            .replace(/#.*$/gm, '')
            // Loại bỏ empty lines
            .replace(/\n\s*\n/g, '\n');
        
        // Tách thành lines và lọc bỏ empty lines
        let lines = cleaned.split('\n').filter(line => line.trim() !== '');
        
        // Tìm dòng bắt đầu flowchart/graph
        let startIndex = 0;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].toLowerCase().includes('flowchart') || lines[i].toLowerCase().includes('graph')) {
                startIndex = i;
                break;
            }
        }
        
        // Lấy từ dòng flowchart/graph trở đi
        lines = lines.slice(startIndex);
        
        // Kiểm tra xem có phải là mermaid code không
        if (lines.length === 0 || !lines[0].toLowerCase().match(/(flowchart|graph)\s+(td|lr|bt|rl)/)) {
            return '';
        }
        
        return lines.join('\n').trim();
    }

    isValidMermaidCode(code) {
        if (!code || typeof code !== 'string' || code.length < 20) return false;
        
        const trimmedCode = code.trim();
        
        // Kiểm tra bắt đầu hợp lệ
        const validStarts = ['flowchart TD', 'flowchart LR', 'flowchart BT', 'flowchart RL', 
                            'graph TD', 'graph LR', 'graph BT', 'graph RL'];
        const hasValidStart = validStarts.some(start => 
            trimmedCode.toLowerCase().startsWith(start.toLowerCase())
        );
        
        if (!hasValidStart) {
            // console.log('Invalid start:', trimmedCode.substring(0, 50));
            return false;
        }
        
        // Kiểm tra có kết nối không
        const hasConnections = trimmedCode.includes('-->') || 
                              trimmedCode.includes('---') || 
                              trimmedCode.includes('==>') ||
                              trimmedCode.includes('-.->') ||
                              trimmedCode.includes('===>');
        
        if (!hasConnections) {
            // console.log('No connections found');
            return false;
        }
        
        // Kiểm tra có node không
        const hasNodes = trimmedCode.includes('[') || 
                        trimmedCode.includes('{') || 
                        trimmedCode.includes('(') ||
                        trimmedCode.includes('>') ||
                        trimmedCode.includes(']') ||
                        trimmedCode.includes('}') ||
                        trimmedCode.includes(')');
        
        if (!hasNodes) {
            // console.log('No nodes found');
            return false;
        }
        
        // Kiểm tra không có markdown
        const hasMarkdown = trimmedCode.includes('```') || 
                           trimmedCode.includes('**') || 
                           trimmedCode.includes('##') ||
                           trimmedCode.includes('###') ||
                           trimmedCode.includes('`');
        
        if (hasMarkdown) {
            // console.log('Contains markdown');
            return false;
        }
        
        // Kiểm tra có ít nhất 3 dòng
        const lines = trimmedCode.split('\n').filter(line => line.trim() !== '');
        if (lines.length < 3) {
            // console.log('Not enough lines:', lines.length);
            return false;
        }
        
        return true;
    }

    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.classList.add('loading');
            button.innerHTML = '<span class="material-symbols-rounded">sync</span>Đang tạo...';
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.innerHTML = '<span class="material-symbols-rounded">account_tree</span>Tạo Sơ đồ';
            button.disabled = false;
        }
    }

    showLoading(container) {
        container.style.display = 'block';
        container.innerHTML = `
            <div class="so-do-loading">
                <div class="spinner"></div>
                <p>Đang tạo sơ đồ...</p>
            </div>
        `;
    }

    displayResult(mermaidCode, container) {
        container.style.display = 'block';
        container.innerHTML = `
            <div class="so-do-header">
                <div class="so-do-actions">
                    <button class="so-do-action-btn" id="view-detail-btn" title="Xem chi tiết">
                        <span class="material-symbols-rounded">zoom_in</span>
                    </button>
                    <button class="so-do-action-btn" id="download-btn" title="Tải về">
                        <span class="material-symbols-rounded">download</span>
                    </button>
                </div>
            </div>
            <div class="so-do-preview" id="mermaid-preview"></div>
        `;

        this.renderMermaidDiagram(mermaidCode, 'mermaid-preview');
        this.setupActionButtons(mermaidCode);
    }

    async renderMermaidDiagram(code, containerId, enableZoom = false) {
        try {
            const container = document.getElementById(containerId);
            if (!container) {
                console.error(`Container with ID '${containerId}' not found`);
                return;
            }
            
            container.innerHTML = '<div class="so-do-loading"><div class="spinner"></div><p>Đang render sơ đồ...</p></div>';
            
            await this.waitForMermaid();

            const diagramId = `mermaid-diagram-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            const { svg } = await mermaid.render(diagramId, code);
            
            // Kiểm tra lại container trước khi cập nhật
            const currentContainer = document.getElementById(containerId);
            if (currentContainer) {
                currentContainer.innerHTML = svg;
                
                // Chỉ thiết lập zoom nếu được yêu cầu và container tồn tại
            if (enableZoom) {
                this.setupZoomFunctionality();
                }
            }
        } catch (error) {
            // console.error('Lỗi render Mermaid:', error);
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = `
                <div class="so-do-error">
                    Lỗi khi render sơ đồ: ${error.message}
                </div>
            `;
            }
        }
    }

    async waitForMermaid() {
        if (typeof mermaid === 'undefined') {
            await new Promise(resolve => {
                const checkMermaid = setInterval(() => {
                    if (typeof mermaid !== 'undefined') {
                        clearInterval(checkMermaid);
                        resolve();
                    }
                }, 100);
            });
        }
    }

    setupActionButtons(mermaidCode) {
        const viewDetailBtn = document.getElementById('view-detail-btn');
        const downloadBtn = document.getElementById('download-btn');
        
        if (viewDetailBtn) {
            viewDetailBtn.addEventListener('click', () => {
            this.showDetailModal(mermaidCode);
        });
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
            this.downloadDiagram(mermaidCode);
        });
        }
    }

    showDetailModal(mermaidCode) {
        const modal = document.createElement('div');
        modal.className = 'so-do-modal';
        modal.innerHTML = `
            <div class="so-do-modal-content">
                <div class="so-do-modal-header">
                    <h3>Xem chi tiết sơ đồ</h3>
                    <button class="so-do-modal-close" id="modal-close">
                        <span class="material-symbols-rounded">close</span>
                    </button>
                </div>
                <div class="so-do-modal-body">
                    <div class="so-do-modal-preview" id="modal-preview">
                        <div class="so-do-zoom-container" id="zoom-container">
                            <div class="so-do-zoom-content" id="zoom-content"></div>
                        </div>
                    </div>
                    <div class="so-do-modal-actions">
                        <button class="so-do-modal-btn" id="modal-download">
                            <span class="material-symbols-rounded">download</span>
                            Tải về
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.renderMermaidDiagram(mermaidCode, 'zoom-content', true);

        this.setupModalEventListeners(modal, mermaidCode);
    }

    setupModalEventListeners(modal, mermaidCode) {
        const modalClose = document.getElementById('modal-close');
        const modalDownload = document.getElementById('modal-download');
        
        if (modalClose) {
            modalClose.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        }

        if (modalDownload) {
            modalDownload.addEventListener('click', () => {
            this.downloadDiagram(mermaidCode);
        });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    setupZoomFunctionality() {
        // Tìm các element zoom trong modal chi tiết mới
        const zoomContainer = document.getElementById('detail-zoom-container');
        const zoomContent = document.getElementById('detail-zoom-content');
        
        // Nếu không tìm thấy, thử tìm trong modal cũ
        const fallbackContainer = document.getElementById('zoom-container');
        const fallbackContent = document.getElementById('zoom-content');
        
        const targetContainer = zoomContainer || fallbackContainer;
        const targetContent = zoomContent || fallbackContent;
        
        // Chỉ thiết lập zoom nếu các element tồn tại
        if (!targetContainer || !targetContent) {
            // console.log('Zoom elements not found, skipping zoom setup');
            return;
        }
        
        let isDragging = false;
        let startX, startY, translateX = 0, translateY = 0;

        // Mouse events
        targetContent.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            targetContent.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            this.applyTransform(targetContent, translateX, translateY);
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            targetContent.style.cursor = 'grab';
        });

        // Touch events
        targetContent.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                isDragging = true;
                startX = e.touches[0].clientX - translateX;
                startY = e.touches[0].clientY - translateY;
            }
        });

        document.addEventListener('touchmove', (e) => {
            if (!isDragging || e.touches.length !== 1) return;
            e.preventDefault();
            
            translateX = e.touches[0].clientX - startX;
            translateY = e.touches[0].clientY - startY;
            this.applyTransform(targetContent, translateX, translateY);
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Mouse wheel zoom
        targetContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -this.zoomStep : this.zoomStep;
            this.currentZoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.currentZoom + delta));
            this.applyZoom(targetContent);
        });

        // Double click to reset
        targetContent.addEventListener('dblclick', () => {
            translateX = 0;
            translateY = 0;
            this.currentZoom = 1;
            this.applyTransform(targetContent, translateX, translateY);
            this.applyZoom(targetContent);
        });
    }

    applyTransform(element, x, y) {
        const currentTransform = element.style.transform;
        const scaleMatch = currentTransform.match(/scale\(([^)]+)\)/);
        const scale = scaleMatch ? scaleMatch[1] : '1';
        
        element.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        element.style.transformOrigin = 'center center';
    }

    applyZoom(element) {
        const currentTransform = element.style.transform;
        const translateMatch = currentTransform.match(/translate\(([^)]+)\)/);
        const translate = translateMatch ? translateMatch[1] : '0px, 0px';
        
        element.style.transform = `translate(${translate}) scale(${this.currentZoom})`;
        element.style.transformOrigin = 'center center';
    }

    async downloadDiagram(mermaidCode) {
        try {
            const diagramId = 'download-diagram-' + Date.now();
            const { svg } = await mermaid.render(diagramId, mermaidCode);
            
            const blob = new Blob([svg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `so-do-${Date.now()}.svg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            URL.revokeObjectURL(url);
            this.showSuccess('Sơ đồ đã được tải về thành công!');
        } catch (error) {
            // console.error('Lỗi khi tải về:', error);
            this.showError('Lỗi khi tải về sơ đồ');
        }
    }

    showError(message) {
        const resultContainer = document.querySelector('.so-do-result');
        if (resultContainer) {
        resultContainer.style.display = 'block';
        resultContainer.innerHTML = `
            <div class="so-do-error">
                <strong>❌ Lỗi:</strong> ${message}
            </div>
        `;
        } else {
            // console.error('Error:', message);
        }
    }

    showSuccess(message) {
        const resultContainer = document.querySelector('.so-do-result');
        if (resultContainer) {
        const successDiv = document.createElement('div');
        successDiv.className = 'so-do-success';
        successDiv.innerHTML = `<strong>✅ Thành công:</strong> ${message}`;
        
        resultContainer.insertBefore(successDiv, resultContainer.firstChild);
        
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 3000);
        }
        // else {
        //     console.log('Success:', message);
        // }
    }
}

// Khởi tạo tính năng khi trang load xong
document.addEventListener('DOMContentLoaded', () => {
    window.soDoGenerator = new SoDoGenerator();
});

// Export class để có thể sử dụng từ bên ngoài
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SoDoGenerator;
} 