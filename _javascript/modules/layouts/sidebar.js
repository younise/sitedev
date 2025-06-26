const ATTR_DISPLAY = 'data-sidebar-display';
const sidebar = document.getElementById('sidebar');
const trigger = document.getElementById('sidebar-trigger');
const mask = document.getElementById('mask');

class SidebarUtil {
  static #isExpanded = false;

  static toggle() {
    this.#isExpanded = !this.#isExpanded;
    document.body.toggleAttribute(ATTR_DISPLAY, this.#isExpanded);
    sidebar.classList.toggle('z-2', this.#isExpanded);
    mask.classList.toggle('d-none', !this.#isExpanded);
  }
}

export function initSidebar() {
  if (trigger && mask) {
    trigger.addEventListener('click', () => {
      SidebarUtil.toggle();
    });
    mask.addEventListener('click', () => {
      SidebarUtil.toggle();
    });
  }
}
