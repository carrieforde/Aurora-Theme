import { Utilities } from './utilities';

/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
export class Navigation {
  /**
   * Creates an instance of Navigation.
   *
   * @property {string} this.container - The Primary Menu `nav` element.
   * @property {string} this.menuName - The translateable name of the menu (set in functions.php).
   * @property {number} this.menuMobileMax - The screen width at which the mobile menu disappears.
   * @property {object} this.utils - An instance of the Utilities class.
   *
   * @memberof Navigation
   */
  constructor() {
    this.container = document.getElementById('site-navigation');
    this.menuName = auroraThemeVars.menu_name;
    this.menuMobileMax = auroraThemeVars.menu_mobile_max;
    this.keyCodes = Object.freeze({
      TAB: 9,
      RETURN: 13,
      ESC: 27,
      SPACE: 32,
      PAGEUP: 33,
      PAGEDOWN: 34,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    });
    this.utils = new Utilities();

    if (this.container) {
      this.initNavigation();
    }
  }

  /**
   * Adds accessibility attributes to the primary menu.
   *
   * {@link} https://www.w3.org/TR/wai-aria-practices/#menu
   *
   * @memberof Navigation
   */
  addAccessibilityAttrs() {
    const menu = this.container.querySelector('ul'),
      subMenus = menu.querySelectorAll('.sub-menu'),
      links = menu.querySelectorAll('a');

    // Defines an accessible name for the menu.
    this.container.setAttribute(
      'aria-label',
      this.utils.escapeHTML(this.menuName)
    );

    // Identifies the menu as a `menubar` container for a set of `menuitems`. Adds an accessible name for the `menubar`.
    menu.setAttribute('role', 'menubar');
    menu.setAttribute('aria-label', this.utils.escapeHTML(this.menuName));

    // On mobile only - adds attributes to indicate whether menu is visible or not.
    if (window.innerWidth < this.menuMobileMax) {
      menu.setAttribute('aria-expanded', 'false'); // maybe only add this if mobile menu is showing?
    }

    for (const subMenu of subMenus) {
      const menuName = subMenu.previousElementSibling.textContent,
        listItems = subMenu.querySelectorAll('li');

      // Identifies the elemement as a menu container for a set of menu items & defines an accessible name for the menu based on it's parent.
      subMenu.setAttribute('role', 'menu');
      subMenu.setAttribute('aria-label', menuName);

      // Removes implied `listitem` role from `li`.
      for (const listItem of listItems) {
        listItem.setAttribute('role', 'none');
      }
    }

    // Adds accessibility attrs to `a` elements.
    for (const link of links) {
      // Identifies the element as a menu item, and makes element keyboard focusable, but removes the el from the tab sequence.
      link.setAttribute('role', 'menuitem');
      link.setAttribute('tabindex', '-1');

      if (link.parentElement.classList.contains('menu-item-has-children')) {
        // Indicates the menuitem has a submenu.
        link.setAttribute('aria-haspopup', 'true');

        // Indicates the submenu is open.
        if (link.classList.contains('focus')) {
          link.setAttribute('aria-expanded', 'true');
        }

        // Indicates the submenu is closed.
        link.setAttribute('aria-expanded', 'false');
      }
    }

    // Sets the first menu item's tabindex as focusable.
    links[0].setAttribute('tabindex', '0');
  }

  keyboardNavigation(event) {
    const target = event.target,
      code = event.keyCode,
      type = event.type;

    let newTarget;

    // Prevent window scroll. Returning here is fine because keyup follows keydown, and will refire this function.
    if ('keydown' === type && -1 < [39, 37, 38, 40].indexOf(code)) {
      event.preventDefault();
      return;
    }

    switch (code) {
      // Right arrow.
      case 39:
        newTarget = target.parentElement.nextElementSibling;

        if (!newTarget) {
          newTarget = target.parentElement.parentElement;
          newTarget = newTarget.querySelector('li');
        }

        target.setAttribute('tabindex', '-1');
        target.classList.remove('focus');
        newTarget = newTarget.querySelector('a');
        newTarget.setAttribute('tabindex', '0');
        newTarget.classList.add('focus');
        newTarget.focus();

        break;

      // Left arrow.
      case 37:
        newTarget = target.parentElement.previousElementSibling;

        if (!newTarget) {
          newTarget = target.parentElement.parentElement;
          newTarget = newTarget.querySelectorAll('.menu > li');
          newTarget = newTarget[newTarget.length - 1];
        }

        target.setAttribute('tabindex', '-1');
        target.classList.remove('focus');
        newTarget = newTarget.querySelector('a');
        newTarget.setAttribute('tabindex', '0');
        newTarget.classList.add('focus');
        newTarget.focus();

        break;

      // Up arrow.
      case 38:
        break;

      // Down arrow.
      case 40:
        // Check if the target has a submenu.
        const subMenu = target.parentElement.querySelector('.sub-menu');

        if (!subMenu) {
          console.log(target); // eslint-disable-line no-console
          newTarget = target.parentElement.nextElementSibling;
        } else {
          newTarget = subMenu.querySelector('li');
          if (!subMenu.parentElement.classList.contains('focus')) {
            subMenu.parentElement.classList.add('focus');
            subMenu.parentElement.setAttribute('tabindex', '0');
            target.setAttribute('tabindex', '-1');
            target.classList.remove('focus');
          }
        }

        newTarget = newTarget.querySelector('a');
        newTarget.classList.add('focus');
        newTarget.focus();

        break;

      default:
        console.log(code); // eslint-disable-line no-console
        return;
    }
  }

  toggleMobileMenu() {
    const button = this.container.querySelector('button'),
      menu = this.container.querySelector('ul');

    if (this.container.classList.contains('toggled')) {
      this.container.classList.remove('toggled');
      button.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-expanded', 'false');
    } else {
      this.container.classList.add('toggled');
      button.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-expanded', 'true');
    }
  }

  initNavigation() {
    const button = this.container.querySelector('button');

    if ('undefined' === typeof button) {
      return;
    }

    const menu = this.container.querySelector('ul');

    if ('undefined' === typeof menu) {
      button.style.display = 'none';
      return;
    }

    this.addAccessibilityAttrs();

    if (!menu.classList.contains('nav-menu')) {
      menu.classList.add('nav-menu');
    }

    button.addEventListener('click', this.toggleMobileMenu.bind(this));

    const links = menu.querySelectorAll('a');

    this.container.addEventListener('keyup', this.keyboardNavigation);
    this.container.addEventListener('keydown', this.keyboardNavigation);
  }
}
