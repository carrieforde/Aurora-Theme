import { Utilities } from './utilities';

/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
export class Navigation {
  constructor() {
    this.container = document.getElementById('site-navigation');

    if (this.container) {
      this.initNavigation();
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

  toggleFocus(event) {
    const target = event.target;
    let ancestor = target.parentElement;

    while (!ancestor.classList.contains('nav-menu')) {
      if ('LI' === ancestor.tagName) {
        if (ancestor.classList.contains('focus')) {
          ancestor.classList.remove('focus');
        } else {
          ancestor.classList.add('focus');
        }
      }

      ancestor = ancestor.parentElement;
    }
  }

  // keyboardNavigation(event) {
  //   const el = event.target;
  //   let subMenu = Array.from(el.parentElement.children);

  //   console.log(subMenu); // eslint-disable-line no-console
  // }

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

    this.container.setAttribute('aria-label', 'Primary Menu');
    menu.setAttribute('aria-label', 'Primary Menu');
    menu.setAttribute('aria-expanded', 'false');
    if (!menu.classList.contains('nav-menu')) {
      menu.classList.add('nav-menu');
    }

    button.addEventListener('click', this.toggleMobileMenu.bind(this));

    const links = menu.querySelectorAll('a');

    for (const link of links) {
      link.addEventListener('focus', this.toggleFocus, true);
      link.addEventListener('blur', this.toggleFocus, true);
    }

    this.container.addEventListener('keyup', this.keyboardNavigation);
  }
}
