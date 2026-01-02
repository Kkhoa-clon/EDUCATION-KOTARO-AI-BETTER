
    // Hide loading overlay when iframe loads
    function hideLoading() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }
    }
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        }
    });
    
    // Responsive iframe height adjustment
    function adjustIframeHeight() {
        const iframeWrapper = document.querySelector('.nasa-iframe-wrapper');
        const headerHeight = 56; // 3.5em in pixels
        const containerPadding = 80;
        const availableHeight = window.innerHeight - headerHeight - containerPadding;
        if (iframeWrapper) {
            iframeWrapper.style.height = Math.max(availableHeight, 500) + 'px';
        }
    }
    
    // Adjust on load and resize
    window.addEventListener('load', adjustIframeHeight);
    window.addEventListener('resize', adjustIframeHeight);
    
    // Add loading timeout fallback
    setTimeout(hideLoading, 10000); // Hide loading after 10 seconds even if iframe doesn't load