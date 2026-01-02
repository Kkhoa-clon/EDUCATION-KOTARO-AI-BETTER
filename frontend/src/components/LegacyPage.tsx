import { useEffect, useRef } from 'react';

interface LegacyPageProps {
  htmlPath: string;
  scripts?: string[];
}

/**
 * Component to load legacy HTML pages with their scripts
 * Use this for pages that haven't been converted to React yet
 * This component loads the HTML page directly and injects necessary scripts
 */
const LegacyPage = ({ htmlPath, scripts = [] }: LegacyPageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Fetch and load HTML content
    fetch(htmlPath)
      .then(response => response.text())
      .then(html => {
        // Create a temporary div to parse HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Extract body content
        const bodyContent = tempDiv.querySelector('body')?.innerHTML || html;
        
        // Set container content
        if (container) {
          container.innerHTML = bodyContent;
        }

        // Load jQuery and dependencies first
        const loadScript = (src: string): Promise<void> => {
          return new Promise((resolve, reject) => {
            // Check if script already loaded
            if (document.querySelector(`script[src="${src}"]`)) {
              resolve();
              return;
            }

            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load ${src}`));
            document.body.appendChild(script);
          });
        };

        // Load scripts in order
        const scriptOrder = [
          '/assets/js/jquery.min.js',
          '/assets/js/jquery.scrolly.min.js',
          '/assets/js/jquery.dropotron.min.js',
          '/assets/js/jquery.scrollex.min.js',
          '/assets/js/browser.min.js',
          '/assets/js/breakpoints.min.js',
          '/assets/js/util.js',
          '/assets/js/main.js',
          '/assets/js/cuon-trang.js',
          '/assets/js/modern-ui.js',
          ...scripts
        ];

        // Load scripts sequentially
        scriptOrder.reduce((promise, src) => {
          return promise.then(() => loadScript(src).catch(console.error));
        }, Promise.resolve());
      })
      .catch(error => {
        console.error('Error loading HTML page:', error);
        if (container) {
          container.innerHTML = `
            <div style="padding: 2rem; text-align: center;">
              <h2>Lỗi tải trang</h2>
              <p>Không thể tải trang: ${htmlPath}</p>
              <a href="${htmlPath}" target="_blank">Mở trong tab mới</a>
            </div>
          `;
        }
      });

    // Cleanup
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [htmlPath, scripts]);

  return (
    <div 
      ref={containerRef}
      style={{
        minHeight: '100vh',
        width: '100%'
      }}
      className="legacy-page-container"
    />
  );
};

export default LegacyPage;
