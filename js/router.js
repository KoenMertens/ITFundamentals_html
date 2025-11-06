// Simple client-side router for SPA navigation
// Uses hash-based routing for simplicity

export class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = '';
  }

  init() {
    // Listen for hash changes
    window.addEventListener('hashchange', () => this.handleRoute());
    // Handle initial route after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.handleRoute());
    } else {
      this.handleRoute();
    }
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigate(path) {
    window.location.hash = path;
  }

  handleRoute() {
    let hash = window.location.hash.slice(1) || '';
    // Remove leading slash if present
    if (hash.startsWith('/')) {
      hash = hash.slice(1);
    }
    // Map empty hash to index
    const route = hash === '' ? 'index' : hash;
    
    // Ensure app element exists
    const app = document.getElementById('app');
    if (!app) {
      console.error('App element not found');
      return;
    }
    
    if (this.routes[route]) {
      this.currentRoute = route;
      try {
        this.routes[route]();
      } catch (error) {
        console.error('Error loading route:', route, error);
        // Fallback to index on error
        if (this.routes['index'] && route !== 'index') {
          this.routes['index']();
        }
      }
    } else {
      // Default to index if route not found
      console.warn('Route not found:', route, 'falling back to index');
      if (this.routes['index']) {
        this.currentRoute = 'index';
        this.routes['index']();
      }
    }
  }

  getCurrentRoute() {
    return this.currentRoute;
  }
}

