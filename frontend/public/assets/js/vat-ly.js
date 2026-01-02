// === EBOOK MANAGEMENT SYSTEM ===

class EbookManager {
    constructor() {
        this.books = [];
        this.filteredBooks = [];
        this.currentFilters = {
            search: '',
            category: '',
            language: '',
            type: '',
            year: ''
        };
        this.isAdmin = false; // Có thể thay đổi thành true để test admin features
        this.init();
    }

    async init() {
        await this.loadBooks();
        this.setupEventListeners();
        this.renderBooks();
        this.updateStats();
        this.setupAdminFeatures();
    }

    async loadBooks() {
        try {
            const response = await fetch('/data/vat-ly.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.books = await response.json();
            this.filteredBooks = [...this.books];
            console.log(`Loaded ${this.books.length} books from vat-ly.json`);
        } catch (error) {
            console.error('Error loading books:', error);
            this.showError('Không thể tải dữ liệu sách từ vat-ly.json. Vui lòng thử lại sau.');
            // Fallback to empty array
            this.books = [];
            this.filteredBooks = [];
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilters.search = e.target.value;
                this.filterBooks();
            });
        }

        // Filter functionality
        const filterSelects = document.querySelectorAll('.filter-select');
        filterSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                this.currentFilters[e.target.name] = e.target.value;
                this.filterBooks();
            });
        });

        // Search button
        const searchBtn = document.getElementById('search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.filterBooks();
            });
        }

        // Clear filters
        const clearBtn = document.getElementById('clear-filters');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearFilters();
            });
        }
    }

    filterBooks() {
        this.filteredBooks = this.books.filter(book => {
            // Search filter
            if (this.currentFilters.search) {
                const searchTerm = this.currentFilters.search.toLowerCase();
                const searchableText = `${book.title} ${book.author} ${book.description} ${book.tags.join(' ')}`.toLowerCase();
                if (!searchableText.includes(searchTerm)) {
                    return false;
                }
            }

            // Category filter
            if (this.currentFilters.category && book.category !== this.currentFilters.category) {
                return false;
            }

            // Language filter
            if (this.currentFilters.language && book.language !== this.currentFilters.language) {
                return false;
            }

            // Type filter
            if (this.currentFilters.type && book.type !== this.currentFilters.type) {
                return false;
            }

            // Year filter
            if (this.currentFilters.year && book.year !== parseInt(this.currentFilters.year)) {
                return false;
            }

            return true;
        });

        this.renderBooks();
        this.updateStats();
    }

    clearFilters() {
        this.currentFilters = {
            search: '',
            category: '',
            language: '',
            type: '',
            year: ''
        };

        // Reset form inputs
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.value = '';

        const filterSelects = document.querySelectorAll('.filter-select');
        filterSelects.forEach(select => {
            select.value = '';
        });

        this.filteredBooks = [...this.books];
        this.renderBooks();
        this.updateStats();
    }

    renderBooks() {
        const booksGrid = document.getElementById('books-grid');
        if (!booksGrid) return;

        if (this.filteredBooks.length === 0) {
            booksGrid.innerHTML = `
                <div class="empty-state">
                    <h3>Không tìm thấy sách</h3>
                    <p>Không có sách nào phù hợp với tiêu chí tìm kiếm của bạn.</p>
                </div>
            `;
            return;
        }

        booksGrid.innerHTML = this.filteredBooks.map(book => this.createBookCard(book)).join('');
        
        // Add event listeners to book cards
        this.setupBookCardListeners();
    }

    createBookCard(book) {
        const stars = this.generateStars(book.rating);
        const tags = book.tags.map(tag => `<span class="book-tag">${tag}</span>`).join('');

        return `
            <div class="book-card" data-book-id="${book.id}">
                <div class="book-cover">
                    <img src="${book.cover}" alt="${book.title}" loading="lazy">
                    <span class="book-type-badge">${book.type}</span>
                </div>
                <div class="book-content">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">Tác giả: ${book.author}</p>
                    <p class="book-description">${book.description}</p>
                    
                    <div class="book-tags">
                        ${tags}
                    </div>
                    
                    <div class="book-meta">
                        <div class="book-rating">
                            ${stars}
                            <span>${book.rating}</span>
                        </div>
                        <span>${book.pages} trang</span>
                    </div>
                    
                    <div class="book-actions">
                        <button class="book-btn primary read-btn" data-book-id="${book.id}">
                            <i class="fas fa-book-open"></i> Đọc
                        </button>
                        <a href="${book.url}" class="book-btn download-btn" target="_blank" download>
                            <i class="fas fa-download"></i> Tải
                        </a>
                        ${this.isAdmin ? `
                            <button class="book-btn edit-btn" data-book-id="${book.id}">
                                <i class="fas fa-edit"></i> Sửa
                            </button>
                            <button class="book-btn delete-btn" data-book-id="${book.id}">
                                <i class="fas fa-trash"></i> Xóa
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star star"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt star"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star star"></i>';
        }

        return stars;
    }

    setupBookCardListeners() {
        // Read buttons
        const readBtns = document.querySelectorAll('.read-btn');
        readBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = e.target.closest('.read-btn').dataset.bookId;
                this.openReader(bookId);
            });
        });

        // Download buttons
        const downloadBtns = document.querySelectorAll('.download-btn');
        downloadBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookId = e.target.closest('.download-btn').dataset.bookId;
                this.downloadBook(bookId);
            });
        });

        // Admin buttons
        if (this.isAdmin) {
            const editBtns = document.querySelectorAll('.edit-btn');
            editBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const bookId = e.target.closest('.edit-btn').dataset.bookId;
                    this.editBook(bookId);
                });
            });

            const deleteBtns = document.querySelectorAll('.delete-btn');
            deleteBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const bookId = e.target.closest('.delete-btn').dataset.bookId;
                    this.deleteBook(bookId);
                });
            });
        }
    }

    openReader(bookId) {
        const book = this.books.find(b => b.id == bookId);
        if (!book) return;

        const modal = document.getElementById('reader-modal');
        const readerTitle = document.getElementById('reader-title');
        const readerIframe = document.getElementById('reader-iframe');

        if (modal && readerTitle && readerIframe) {
            readerTitle.textContent = book.title;
            
            // Set up iframe source based on file type
            if (book.type === 'PDF') {
                readerIframe.src = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(book.url)}`;
            } else {
                readerIframe.src = book.url;
            }

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';

            // Close button
            const closeBtn = document.querySelector('.reader-close');
            if (closeBtn) {
                closeBtn.onclick = () => this.closeReader();
            }

            // Close on outside click
            modal.onclick = (e) => {
                if (e.target === modal) {
                    this.closeReader();
                }
            };

            // Close on ESC key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeReader();
                }
            });
        }
    }

    closeReader() {
        const modal = document.getElementById('reader-modal');
        const readerIframe = document.getElementById('reader-iframe');
        
        if (modal) {
            modal.style.display = 'none';
        }
        if (readerIframe) {
            readerIframe.src = '';
        }
        document.body.style.overflow = 'auto';
    }

    downloadBook(bookId) {
        const book = this.books.find(b => b.id == bookId);
        if (!book) return;

        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = book.url;
        link.download = `${book.title} - ${book.author}.${book.type.toLowerCase()}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Update download count (in a real app, this would be sent to server)
        book.downloads++;
        this.showSuccess(`Đã tải xuống: ${book.title}`);
    }

    editBook(bookId) {
        const book = this.books.find(b => b.id == bookId);
        if (!book) return;

        // Populate upload form with book data
        this.populateUploadForm(book);
        this.showUploadSection();
    }

    deleteBook(bookId) {
        const book = this.books.find(b => b.id == bookId);
        if (!book) return;

        if (confirm(`Bạn có chắc chắn muốn xóa sách "${book.title}"?`)) {
            this.books = this.books.filter(b => b.id != bookId);
            this.filterBooks();
            this.showSuccess(`Đã xóa sách: ${book.title}`);
        }
    }

    updateStats() {
        const totalBooks = document.getElementById('total-books');
        const totalDownloads = document.getElementById('total-downloads');
        const avgRating = document.getElementById('avg-rating');

        if (totalBooks) {
            totalBooks.textContent = this.filteredBooks.length;
        }

        if (totalDownloads) {
            const downloads = this.filteredBooks.reduce((sum, book) => sum + book.downloads, 0);
            totalDownloads.textContent = downloads.toLocaleString();
        }

        if (avgRating) {
            const rating = this.filteredBooks.reduce((sum, book) => sum + book.rating, 0) / this.filteredBooks.length;
            avgRating.textContent = rating.toFixed(1);
        }
    }

    setupAdminFeatures() {
        if (!this.isAdmin) return;

        // Show upload section
        const uploadSection = document.getElementById('upload-section');
        if (uploadSection) {
            uploadSection.style.display = 'block';
        }

        // Setup upload form
        const uploadForm = document.getElementById('upload-form');
        if (uploadForm) {
            uploadForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleUpload();
            });
        }

        // Setup file input
        const fileInput = document.getElementById('book-file');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.handleFileSelect(e);
            });
        }
    }

    handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Auto-fill file type
        const fileType = file.name.split('.').pop().toUpperCase();
        const typeInput = document.getElementById('book-type');
        if (typeInput) {
            typeInput.value = fileType;
        }

        // Auto-fill title from filename
        const title = file.name.replace(/\.[^/.]+$/, "");
        const titleInput = document.getElementById('book-title');
        if (titleInput && !titleInput.value) {
            titleInput.value = title;
        }
    }

    async handleUpload() {
        const formData = new FormData(document.getElementById('upload-form'));
        const bookData = Object.fromEntries(formData.entries());

        // Validate required fields
        if (!bookData.title || !bookData.author) {
            this.showError('Vui lòng điền đầy đủ thông tin bắt buộc.');
            return;
        }

        // Create new book object
        const newBook = {
            id: this.books.length + 1,
            title: bookData.title,
            author: bookData.author,
            url: bookData.url || '#',
            source: bookData.source || 'Uploaded',
            type: bookData.type || 'PDF',
            category: bookData.category || 'Khác',
            language: bookData.language || 'Tiếng Việt',
            year: parseInt(bookData.year) || new Date().getFullYear(),
            publisher: bookData.publisher || 'Unknown',
            pages: parseInt(bookData.pages) || 0,
            description: bookData.description || '',
            tags: bookData.tags ? bookData.tags.split(',').map(tag => tag.trim()) : [],
            cover: bookData.cover || `https://via.placeholder.com/300x400/73d239/ffffff?text=${encodeURIComponent(bookData.title)}`,
            rating: 0,
            downloads: 0
        };

        // Add to books array
        this.books.push(newBook);
        this.filterBooks();
        this.showSuccess(`Đã thêm sách: ${newBook.title}`);

        // Reset form
        document.getElementById('upload-form').reset();
    }

    populateUploadForm(book) {
        const form = document.getElementById('upload-form');
        if (!form) return;

        const fields = ['title', 'author', 'url', 'source', 'type', 'category', 'language', 'year', 'publisher', 'pages', 'description'];
        fields.forEach(field => {
            const input = form.querySelector(`[name="${field}"]`);
            if (input) {
                input.value = book[field] || '';
            }
        });

        // Handle tags
        const tagsInput = form.querySelector('[name="tags"]');
        if (tagsInput) {
            tagsInput.value = book.tags ? book.tags.join(', ') : '';
        }
    }

    showUploadSection() {
        const uploadSection = document.getElementById('upload-section');
        if (uploadSection) {
            uploadSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#73d239' : type === 'error' ? '#e44c65' : '#272833'};
            color: white;
            padding: 1em 1.5em;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.onclick = () => this.removeNotification(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);
    }

    removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Utility methods
    formatNumber(num) {
        return num.toLocaleString();
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString('vi-VN');
    }

    // Method to export current books data to JSON file
    exportBooksToFile() {
        const dataStr = JSON.stringify(this.books, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'vat-ly.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        this.showSuccess('Đã xuất dữ liệu sách thành công! Vui lòng thay thế file vat-ly.json hiện tại.');
    }

    // Method to reload books from vat-ly.json
    async reloadBooksFromFile() {
        try {
            await this.loadBooks();
            this.renderBooks();
            this.updateStats();
            this.showSuccess('Đã tải lại dữ liệu từ vat-ly.json thành công!');
        } catch (error) {
            this.showError('Không thể tải lại dữ liệu từ vat-ly.json.');
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EbookManager();
});

// Export for global access
window.EbookManager = EbookManager; 