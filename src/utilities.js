/**
 * Aurora JS Utilities.
 *
 * @export Utilities
 * @class Utilities
 */
export class Utilities {
  /**
   * Creates an instance of Utilities.
   * @param {string} env ['DEV'] The development environment variable.
   * @memberof Utilities
   */
  constructor(env) {
    this.environment = env || 'DEV';
  }

  /**
   * Find the nearest ancestor matching a CSS selector for a given element.
   *
   * @param   {string}        el       The starting element.
   * @param   {string}        selector The ancestor's selector to match.
   * @returns {(string|null)}          The matched ancestor, or null.
   * @memberof Utilities
   */
  getAncestorBySelector(el, selector) {
    let element = el.nodeType === undefined ? document.querySelector(el) : el,
      ancestor = element.parentElement;

    while ('HTML' !== ancestor.tagName) {
      if (
        ancestor.classList.contains(selector) ||
        ancestor.tagName === selector.toUpperCase() ||
        ancestor.getAttribute('id') === selector
      ) {
        return ancestor;
      }

      ancestor = ancestor.parentElement;
    }

    return null;
  }

  /**
   * Get all sibilings relative to a CSS selector.
   *
   * @param   {string} selector The CSS selector to search.
   * @returns {array}           The collection of matching elements.
   * @memberof Utilities
   */
  getSiblingsBySelector(selector) {
    let sel =
        selector.nodeType === undefined
          ? document.querySelector(selector)
          : selector,
      children = sel.parentElement.children,
      siblings = [];

    for (const child of children) {
      siblings.push(child);
    }

    return siblings;
  }

  /**
   * Insert an element after an existing DOM node.
   *
   * @param   {string} newNode The node to be inserted.
   * @param   {string} refNode The node to insert after.
   * @returns {string}         The inserted node.
   * @memberof Utilities
   */
  insertAfter(newNode, refNode) {
    refNode =
      refNode.nodeType === undefined
        ? document.querySelector(refNode)
        : refNode;

    if (null !== refNode.nextElementSibling) {
      refNode.parentElement.insertBefore(newNode, refNode.nextElementSibling);
    } else {
      refNode.parentElement.appendChild(newNode);
    }

    return newNode;
  }

  /**
   * Swaps the position of two elements within the DOM.
   *
   * @param   {string} el1 The first element to swap.
   * @param   {string} el2 The second element to swap.
   * @returns {boolean}    Wheather the swap was successful.
   * @memberof Utilities
   */
  swapElements(el1, el2) {
    let clone1, clone2;

    el1 = el1.nodeType === undefined ? document.querySelector(el1) : el1;
    el2 = el2.nodeType === undefined ? document.querySelector(el2) : el2;
    clone1 = el1.cloneNode(true);
    clone2 = el2.cloneNode(true);

    try {
      el1.parentElement.insertBefore(clone2, el1);
      el2.parentElement.insertBefore(clone1, el2);

      el1.parentElement.removeChild(el1);
      el2.parentElement.removeChild(el2);

      return true;
    } catch (error) {
      if ('DEV' === this.environment) {
        console.log(error); // eslint-disable-line no-console
      }

      return false;
    }
  }

  /**
   * Removes a DOM element and all its children, returning an array of removed nodes.
   *
   * @param   {string} selector The element to be removed.
   * @returns {array}           The removed elements.
   * @memberof Utilities
   */
  removeAll(selector) {
    let walker,
      removed = [];

    selector =
      selector.nodeType === undefined
        ? document.querySelectorAll(selector)
        : selector;

    for (const el of selector) {
      walker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT, null);

      removed.push(walker.currentNode);

      for (let i = 0; i < walker.currentNode.children.length; i++) {
        const currentNode = walker.currentNode.children[i];

        removed.push(currentNode);

        if (currentNode.hasChildNodes()) {
          for (let j = 0; j < currentNode.children.length; j++) {
            const currentChild = currentNode.children[j];

            removed.push(currentNode.children[j]);

            if (currentChild.hasChildNodes()) {
              for (let k = 0; k < currentChild.children.length; k++) {
                removed.push(currentNode.children[k]);
              }
            }
          }
        }
      }

      el.parentElement.removeChild(el);
    }

    return removed;
  }

  /**
   * Creates a new element with attributes.
   *
   * @param   {object} obj The configuration options for the new element.
   * @returns {string}     The new element.
   * @memberof Utilities
   */
  createElement(obj) {
    const options = Object.assign(
        {
          tag: 'div',
          class: '',
          id: '',
          content: ''
        },
        obj
      ),
      el = document.createElement(options.tag);

    if (options.class) {
      el.classList.add(options.class);
    }

    if (options.id) {
      el.setAttribute('id', options.id);
    }

    if (options.content) {
      // If object.content is an object (i.e. maybe another createElement), then convert it to a string.
      if ('object' === typeof options.content) {
        options.content = options.content.outerHTML;
      }
      el.innerHTML = options.content;
    }

    return el;
  }

  /**
   * Spins up multiple elements at a time.
   *
   * @param   {string} els The element tag.
   * @returns {array}      An array of elements.
   * @memberof Utilities
   */
  addMultipleElements(...els) {
    let elements = [];

    els.forEach(element => {
      elements.push(document.createElement(element));
    });

    return elements;
  }

  /**
   * Makes a string to sentence case.
   *
   * @param   {string} string The string to convert to sentence case.
   * @returns {string}        The sentence case string.
   * @memberof Utilities
   */
  sentenceCase(string) {
    let modString;

    modString = string.substring(0, 1).toUpperCase();
    modString += string.substring(1, string.length).toLowerCase();

    return modString;
  }

  /**
   * Makes a string hyphen case.
   *
   * @param   {string} string The string to convert to hyphen case.
   * @returns {string}        The hyphen case string.
   * @memberof Utilities
   */
  hyphenCase(string) {
    const modString = string.replace(/([^a-z\d])/gi, '-');

    if (-1 !== modString.indexOf('-', modString.length - 1)) {
      return modString.substring(0, modString.length - 1).toLowerCase();
    }

    return modString.toLowerCase();
  }

  /**
   * Makes a string camel case.
   *
   * @param   {string} string The string to convert to camel case.
   * @returns {string}        The camel case string.
   * @memberof Utilities
   */
  camelCase(string) {
    string = string.split(' ');
    string[0] = string[0].toLowerCase();

    for (let i = 1; i < string.length; i++) {
      let subString = '';

      for (let j = 0; j < string[i].length; j++) {
        if (0 === j) {
          subString += string[i][j].toUpperCase(0);
        } else {
          subString += string[i][j];
        }
      }

      string[i] = subString;
    }

    string = string.join('');
    return string.replace(/([^a-z\d])/gi, '');
  }

  /**
   * Get a random number between provided min and max.
   *
   * @param   {number} min The minimum.
   * @param   {number} max The maximum.
   * @returns {number}     A random number between the min and max.
   * @memberof Utilities
   */
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Gets all site cookies.
   *
   * @returns {object} An object with key-value pairs for each cookie set.
   * @memberof Utilities
   */
  getAllCookies() {
    let cookies = document.cookie,
      cookieObj = {};

    cookies = cookies.split('; ');

    cookies.forEach(cookie => {
      const val = cookie.split('=');

      cookieObj[val[0]] = val[1];
    });

    return cookieObj;
  }

  /**
   * Checks whether a specific cookie is set.
   *
   * @param   {string}  cookie The cookie's key.
   * @returns {boolean}        Whether the cookie is set.
   * @memberof Utilities
   */
  isCookieSet(cookie) {
    const cookies = this.getCookies();

    for (const key in cookies) {
      if (key === cookie) {
        return true;
      }
    }

    return false;
  }

  /**
   * Set a session or persistent cookie.
   *
   * @param {string} key    The cookie key.
   * @param {string} value  The cookie value.
   * @param {number} expiry The number of days until expiry. Leave blank for session cookies.
   * @memberof Utilities
   */
  setCookie(key, value, expiry) {
    let date, expires;

    if (expiry) {
      date = new Date();
      date.setMinutes(date.getMinutes() + 60 * 24 * expiry);
      expires = `expires=${date.toUTCString()}`;
    }

    document.cookie = `${key}=${value};${expires}`;
  }

  /**
   * Deletes a persistent cookie.
   *
   * @param {string} key   The cookie's key.
   * @param {string} value The cookie's value.
   * @memberof Utilities
   */
  deleteCookie(key, value) {
    document.cookie = `${key}=${value};expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  }

  escapeHTML(string) {
    const HTMLEntityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;'
    };

    return string.replace(/[&<>"'/]/g, s => HTMLEntityMap[s]);
  }
} // end Utilities
