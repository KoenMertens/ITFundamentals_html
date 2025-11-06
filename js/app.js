// Main application entry point
import { Router } from './router.js';

// Import page handlers
import { loadIndex } from './pages/index.js';
import { loadWholeNumberConverter } from './pages/wholeNumberConverter.js';
import { loadSignedNumberConverter } from './pages/signedNumberConverter.js';
import { loadFractionalConverter } from './pages/fractionalConverter.js';
import { loadFloatingPointConverter } from './pages/floatingPointConverter.js';
import { loadTruthTableGenerator } from './pages/truthTableGenerator.js';
import { loadVeitchKarnaughGenerator } from './pages/veitchKarnaughGenerator.js';
import { loadHammingCode } from './pages/hammingCode.js';
import { loadCRC } from './pages/crc.js';

const router = new Router();

// Setup routes
router.addRoute('index', loadIndex);
router.addRoute('/', loadIndex);
router.addRoute('WholeNumberConverter', loadWholeNumberConverter);
router.addRoute('SignedNumberConverter', loadSignedNumberConverter);
router.addRoute('FractionalConverter', loadFractionalConverter);
router.addRoute('FloatingPointConverter', loadFloatingPointConverter);
router.addRoute('TruthTableGenerator', loadTruthTableGenerator);
router.addRoute('VeitchKarnaughGenerator', loadVeitchKarnaughGenerator);
router.addRoute('HammingCode', loadHammingCode);
router.addRoute('CRC', loadCRC);

// Initialize router and setup navigation menu
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeApp();
    });
} else {
    // DOM already loaded
    initializeApp();
}

function initializeApp() {
    // Initialize router
    router.init();
    // Update active nav link
    const updateActiveNav = () => {
        const currentRoute = router.getCurrentRoute() || 'index';
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-route') === currentRoute || 
                (currentRoute === 'index' && link.getAttribute('href') === '#/')) {
                link.classList.add('active');
            }
        });
    };

    // Toggle nav menu on mobile
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('collapse');
        });
    }

    // Add click handlers to all navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                // Let the hash change naturally, hashchange event will handle it
                // But ensure it triggers
                const hash = href.slice(1); // Remove #
                if (window.location.hash !== hash) {
                    window.location.hash = hash;
                } else {
                    // Hash is already set, manually trigger route
                    router.handleRoute();
                }
            }
        });
    });

    // Also handle clicks on links in the content (like buttons on index page)
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const hash = href.slice(1);
                if (window.location.hash !== hash) {
                    window.location.hash = hash;
                } else {
                    router.handleRoute();
                }
            }
        }
    });

    // Update nav on route change
    const originalHandleRoute = router.handleRoute.bind(router);
    router.handleRoute = function() {
        originalHandleRoute();
        updateActiveNav();
    };

    // Initial nav update
    updateActiveNav();
}

// Export router for use in pages
export { router };

