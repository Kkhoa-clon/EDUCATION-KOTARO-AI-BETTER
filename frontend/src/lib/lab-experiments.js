/**
 * Lab Experiments Management System
 * Handles loading, filtering, and displaying interactive science experiments
 */
class LabExperiments {
    constructor() {
        this.experiments = [];
        this.filteredExperiments = [];
        this.currentCategory = 'all';
        this.searchTerm = '';
        this.isLoading = false;
        
        this.init();
    }

    async init() {
        await this.loadExperiments();
        this.setupEventListeners();
        this.renderExperiments();
    }

    /**
     * Load experiments data from JSON file
     */
    async loadExperiments() {
        try {
            this.setLoading(true);
            const response = await fetch('/data/ThuNghiem.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.experiments = await response.json();
            this.filteredExperiments = [...this.experiments];
            this.setLoading(false);
        } catch (error) {
            console.error('Error loading experiments:', error);
            this.showError('Không thể tải dữ liệu thí nghiệm. Vui lòng thử lại sau.');
            this.setLoading(false);
        }
    }

    /**
     * Set loading state
     */
    setLoading(loading) {
        this.isLoading = loading;
        const grid = document.getElementById('experimentsGrid');
        
        if (!grid) {
            console.error('Experiments grid element not found');
            return;
        }
        
        if (loading) {
            grid.innerHTML = `
                <div class="loading">
                    <i class="fas fa-spinner"></i>
                    <p>Đang tải thí nghiệm...</p>
                </div>
            `;
        }
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        this.setupSearchListener();
        this.setupCategoryFilters();
        this.setupModalListeners();
        this.setupKeyboardListeners();
    }

    /**
     * Setup search input listener
     */
    setupSearchListener() {
        const searchInput = document.getElementById('searchInput');
        
        if (!searchInput) {
            console.error('Search input element not found');
            return;
        }
        
        let searchTimeout;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(() => {
                this.searchTerm = e.target.value.toLowerCase().trim();
                this.filterExperiments();
            }, 300); // Debounce search for better performance
        });

        // Clear search on escape
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                this.searchTerm = '';
                this.filterExperiments();
            }
        });
    }

    /**
     * Setup category filter buttons
     */
    setupCategoryFilters() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        
        if (categoryBtns.length === 0) {
            console.error('Category filter buttons not found');
            return;
        }
        
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all buttons
                categoryBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                e.target.classList.add('active');
                
                this.currentCategory = e.target.dataset.category;
                this.filterExperiments();
                
                // Update URL for bookmarking
                this.updateURL();
            });
        });
    }

    /**
     * Setup modal event listeners
     */
    setupModalListeners() {
        const modalOverlay = document.getElementById('modalOverlay');
        const modalClose = document.getElementById('modalClose');
        const modalContent = document.querySelector('.modal-content');
        
        if (!modalOverlay || !modalClose || !modalContent) {
            console.error('Modal elements not found');
            return;
        }
        
        // Close modal when clicking overlay
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                this.closeModal();
            }
        });

        // Close modal with close button
        modalClose.addEventListener('click', () => {
            this.closeModal();
        });

        // Prevent modal close when clicking inside modal content
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    /**
     * Setup keyboard event listeners
     */
    setupKeyboardListeners() {
        document.addEventListener('keydown', (e) => {
            // Close modal with Escape key
            if (e.key === 'Escape') {
                this.closeModal();
            }
            
            // Focus search input with Ctrl/Cmd + K
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('searchInput').focus();
            }
        });
    }

    /**
     * Filter experiments based on search term and category
     */
    filterExperiments() {
        this.filteredExperiments = this.experiments.filter(exp => {
            const matchesSearch = this.searchTerm === '' || 
                (exp.title || '').toLowerCase().includes(this.searchTerm) ||
                (exp.description || '').toLowerCase().includes(this.searchTerm) ||
                (exp.category || '').toLowerCase().includes(this.searchTerm);
            
            const matchesCategory = this.currentCategory === 'all' || 
                                  exp.category === this.currentCategory;
            
            return matchesSearch && matchesCategory;
        });

        this.renderExperiments();
        this.updateResultsCount();
    }

    /**
     * Update results count display
     */
    updateResultsCount() {
        const count = this.filteredExperiments.length;
        const total = this.experiments.length;
        
        // You can add a results counter element if needed
        console.log(`Showing ${count} of ${total} experiments`);
    }

    /**
     * Render experiments grid
     */
    renderExperiments() {
        const grid = document.getElementById('experimentsGrid');
        
        if (!grid) {
            console.error('Experiments grid element not found');
            return;
        }
        
        if (this.isLoading) return;
        
        if (this.filteredExperiments.length === 0) {
            grid.innerHTML = this.createNoResultsHTML();
            return;
        }

        grid.innerHTML = this.filteredExperiments.map(exp => this.createExperimentCard(exp)).join('');
        
        // Add click listeners to try buttons
        this.setupCardEventListeners();
    }

    /**
     * Create HTML for no results state
     */
    createNoResultsHTML() {
        const searchTerm = this.searchTerm;
        const category = this.currentCategory;
        
        let message = 'Không tìm thấy thí nghiệm phù hợp.';
        let suggestion = 'Thử thay đổi từ khóa tìm kiếm hoặc danh mục.';
        
        if (searchTerm && category !== 'all') {
            message = `Không tìm thấy thí nghiệm "${searchTerm}" trong danh mục ${category}.`;
            suggestion = 'Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác.';
        } else if (searchTerm) {
            message = `Không tìm thấy thí nghiệm với từ khóa "${searchTerm}".`;
            suggestion = 'Thử tìm kiếm với từ khóa khác.';
        } else if (category !== 'all') {
            message = `Không có thí nghiệm nào trong danh mục ${category}.`;
            suggestion = 'Thử chọn danh mục khác.';
        }

        return `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>${message}</h3>
                <p>${suggestion}</p>
            </div>
        `;
    }

    /**
     * Setup event listeners for experiment cards
     */
    setupCardEventListeners() {
        const tryButtons = document.querySelectorAll('.try-button');
        
        tryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.experiment-card');
                const experimentId = card.dataset.id;
                this.openExperiment(experimentId);
            });
        });

        // Add hover effects for cards
        const cards = document.querySelectorAll('.experiment-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    /**
     * Create experiment card HTML
     */
    createExperimentCard(experiment) {
        const categoryColors = {
            'Vật lý': '#73d239',
            'Hóa học': '#e44c65',
            'Sinh học': '#4a90e2'
        };

        const iconMap = {
            'Vật lý': 'fas fa-atom',
            'Hóa học': 'fas fa-flask',
            'Sinh học': 'fas fa-dna'
        };

        const categoryClass = this.getCategoryClass(experiment.category);
        const color = categoryColors[experiment.category] || '#73d239';
        const icon = iconMap[experiment.category] || 'fas fa-flask';

        return `
            <div class="experiment-card ${categoryClass}" data-id="${experiment.id}">
                <div class="card-image" style="background: linear-gradient(135deg, ${color} 0%, ${color}dd 100%);">
                    <i class="${icon}"></i>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${this.escapeHtml(experiment.title)}</h3>
                    <p class="card-description">${this.escapeHtml(experiment.description)}</p>
                    <div class="card-meta">
                        <span class="card-category">${this.escapeHtml(experiment.category)}</span>
                        <div>
                            <div class="card-difficulty">${this.escapeHtml(experiment.difficulty)}</div>
                            <div class="card-duration">${this.escapeHtml(experiment.duration)}</div>
                        </div>
                    </div>
                    <button class="try-button">
                        <i class="fas fa-play"></i>
                        Thử ngay
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Get CSS class for category
     */
    getCategoryClass(category) {
        const classMap = {
            'Vật lý': 'category-physics',
            'Hóa học': 'category-chemistry',
            'Sinh học': 'category-biology'
        };
        return classMap[category] || '';
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Open experiment in modal
     */
    openExperiment(experimentId) {
        const experiment = this.experiments.find(exp => exp.id === experimentId);
        if (!experiment) {
            console.error('Experiment not found:', experimentId);
            return;
        }

        const modalTitle = document.getElementById('modalTitle');
        const modalIframe = document.getElementById('modalIframe');
        const modalOverlay = document.getElementById('modalOverlay');

        modalTitle.textContent = experiment.title;
        modalIframe.src = experiment.url;
        
        // Show modal with animation
        modalOverlay.style.display = 'flex';
        setTimeout(() => {
            modalOverlay.classList.add('show');
        }, 10);

        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';

        // Track experiment usage (you can add analytics here)
        this.trackExperimentUsage(experiment);
    }

    /**
     * Close modal
     */
    closeModal() {
        const modalOverlay = document.getElementById('modalOverlay');
        const modalIframe = document.getElementById('modalIframe');
        
        modalOverlay.classList.remove('show');
        
        setTimeout(() => {
            modalOverlay.style.display = 'none';
            modalIframe.src = '';
        }, 300);
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    /**
     * Track experiment usage for analytics
     */
    trackExperimentUsage(experiment) {
        // You can implement analytics tracking here
        console.log(`Experiment opened: ${experiment.title} (${experiment.category})`);
        
        // Example: Send to Google Analytics or custom analytics
        // gtag('event', 'experiment_open', {
        //     'experiment_title': experiment.title,
        //     'experiment_category': experiment.category
        // });
    }

    /**
     * Update URL for bookmarking
     */
    updateURL() {
        const params = new URLSearchParams();
        
        if (this.currentCategory !== 'all') {
            params.set('category', this.currentCategory);
        }
        
        if (this.searchTerm) {
            params.set('search', this.searchTerm);
        }
        
        const newURL = params.toString() ? 
            `${window.location.pathname}?${params.toString()}` : 
            window.location.pathname;
            
        window.history.replaceState({}, '', newURL);
    }

    /**
     * Load state from URL
     */
    loadStateFromURL() {
        const params = new URLSearchParams(window.location.search);
        
        const category = params.get('category');
        const search = params.get('search');
        
        if (category && category !== 'all') {
            this.currentCategory = category;
            const categoryBtn = document.querySelector(`[data-category="${category}"]`);
            if (categoryBtn) {
                document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
                categoryBtn.classList.add('active');
            }
        }
        
        if (search) {
            this.searchTerm = search;
            const searchInput = document.getElementById('searchInput');
            searchInput.value = search;
        }
    }

    /**
     * Show error message
     */
    showError(message) {
        const grid = document.getElementById('experimentsGrid');
        grid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Lỗi</h3>
                <p>${this.escapeHtml(message)}</p>
                <button class="try-button" onclick="location.reload()" style="margin-top: 1em; width: auto;">
                    <i class="fas fa-redo"></i>
                    Thử lại
                </button>
            </div>
        `;
    }

    /**
     * Get experiments statistics
     */
    getStatistics() {
        const stats = {
            total: this.experiments.length,
            byCategory: {},
            byDifficulty: {}
        };

        this.experiments.forEach(exp => {
            // Count by category
            stats.byCategory[exp.category] = (stats.byCategory[exp.category] || 0) + 1;
            
            // Count by difficulty
            stats.byDifficulty[exp.difficulty] = (stats.byDifficulty[exp.difficulty] || 0) + 1;
        });

        return stats;
    }

    /**
     * Export experiments data
     */
    exportData() {
        const data = {
            experiments: this.experiments,
            statistics: this.getStatistics(),
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'experiments-data.json';
        a.click();
        
        URL.revokeObjectURL(url);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all elements are ready
    setTimeout(() => {
        const labExperiments = new LabExperiments();
        
        // Make it globally accessible for debugging
        window.labExperiments = labExperiments;
        
        // Load state from URL if any
        labExperiments.loadStateFromURL();
    }, 100);
}); 