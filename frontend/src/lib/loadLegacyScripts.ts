/**
 * Utility to load legacy jQuery-based scripts for HTML pages
 * This is used for pages that still use the old HTML structure
 */

export const loadLegacyScripts = () => {
  // Load jQuery first
  if (typeof window !== 'undefined' && !(window as any).jQuery) {
    const jqueryScript = document.createElement('script');
    jqueryScript.src = '/assets/js/jquery.min.js';
    document.head.appendChild(jqueryScript);
    
    return new Promise((resolve) => {
      jqueryScript.onload = () => {
        // Load other dependencies
        const scripts = [
          '/assets/js/jquery.scrolly.min.js',
          '/assets/js/jquery.dropotron.min.js',
          '/assets/js/jquery.scrollex.min.js',
          '/assets/js/browser.min.js',
          '/assets/js/breakpoints.min.js',
          '/assets/js/util.js',
          '/assets/js/main.js',
          '/assets/js/cuon-trang.js',
          '/assets/js/modern-ui.js'
        ];
        
        let loaded = 0;
        scripts.forEach((src) => {
          const script = document.createElement('script');
          script.src = src;
          document.head.appendChild(script);
          script.onload = () => {
            loaded++;
            if (loaded === scripts.length) {
              resolve(true);
            }
          };
        });
      };
    });
  }
  return Promise.resolve(true);
};
