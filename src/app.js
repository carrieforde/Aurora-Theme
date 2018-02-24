/* eslint-disable */
const sass = require('style.scss');

import displayHeader from 'hello-aurora.js';

// Listen for DOM Content Loaded.
document.addEventListener('DOMContentLoaded', () => {
  // To stop executing too quickly, wait until a tick.
  setTimeout(() => {
    displayHeader();
  }, 250);
});
