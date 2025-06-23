import Theme from '../../theme';

/**
 * Add listeners for theme mode toggles
 */
class ThemeToggle {
  static get instance() {
    return document.getElementById('mode-toggle');
  }

  static initEventListeners() {
    const toggle = this.instance;
    if (!toggle) return;

    // Initialize state on load
    this.updateState();

    // Handle click events
    toggle.addEventListener('click', () => {
      Theme.flip();
      this.updateState();
      
      // Update the background and icon state to match the current theme
      const isDark = Theme.visualState === Theme.DARK;
      toggle.setAttribute('aria-checked', isDark ? 'true' : 'false');
    });

    // Handle theme changes from other sources (like system theme changes)
    window.addEventListener('message', (event) => {
      if (event.source === window && event.data && event.data.id === Theme.ID) {
        this.updateState();
      }
    });

    // Handle initial theme state
    this.updateState();
  }

  static updateState() {
    const toggle = this.instance;
    if (!toggle) return;

    const isDark = Theme.visualState === Theme.DARK;
    toggle.setAttribute('aria-checked', isDark ? 'true' : 'false');

    // Force update aria-checked to match current theme state
    if (isDark && toggle.getAttribute('aria-checked') !== 'true') {
      toggle.setAttribute('aria-checked', 'true');
    } else if (!isDark && toggle.getAttribute('aria-checked') !== 'false') {
      toggle.setAttribute('aria-checked', 'false');
    }
  }
}

export function modeWatcher() {
  ThemeToggle.initEventListeners();
}
