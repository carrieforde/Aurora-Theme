/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/customizer.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/customizer.js":
/*!***************************!*\
  !*** ./src/customizer.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */
(function () {
  // Updates the site title.
  wp.customize('blogname', function (value) {
    value.bind(function (to) {
      return document.querySelector('.site-title a').textContent = to;
    });
  }); // Hides / unhides site title if logo exists.

  wp.customize('custom_logo', function (setting) {
    setting.bind(function (logo) {
      var siteTitle = document.querySelector('.site-title');

      if (logo) {
        siteTitle.classList.add('screen-reader-text');
      }

      if (!logo && siteTitle.classList.contains('screen-reader-text')) {
        siteTitle.classList.remove('screen-reader-text');
      }
    });
  }); // Updates the site description.

  wp.customize('blogdescription', function (value) {
    value.bind(function (to) {
      return document.querySelector('.site-description').textContent = to;
    });
  }); // Hides / unhides site tagline.

  wp.customize('aurora_theme_options[hide_tagline]', function (setting) {
    setting.bind(function (hide) {
      var siteTagline = document.querySelector('.site-description');

      if (hide) {
        siteTagline.classList.add('screen-reader-text');
      }

      if (!hide && siteTagline.classList.contains('screen-reader-text')) {
        siteTagline.classList.remove('screen-reader-text');
      }
    });
  }); // Update the body class based on selected site layout.

  wp.customize('aurora_theme_options[site_layout]', function (setting) {
    setting.bind(function (layout) {
      var body = document.body; // First, remove all layout classes.

      body.classList.remove('boxed', 'boxed-content', 'full-width'); // Then add the selected class.

      body.classList.add(layout);
    });
  }); // Update the footer credits.

  wp.customize('aurora_theme_options[footer_credits]', function (value) {
    value.bind(function (to) {
      var credits = document.querySelector('.footer-credits');
      credits.textContent = to;
    });
  });
})();

/***/ })

/******/ });
//# sourceMappingURL=customizer-bundle.js.map