!function(n){var o={};function r(e){if(o[e])return o[e].exports;var t=o[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,r),t.l=!0,t.exports}r.m=n,r.c=o,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=652)}({652:function(e,t){wp.customize("blogname",function(e){e.bind(function(e){return document.querySelector(".site-title a").textContent=e})}),wp.customize("custom_logo",function(e){e.bind(function(e){var t=document.querySelector(".site-title");e&&t.classList.add("screen-reader-text"),!e&&t.classList.contains("screen-reader-text")&&t.classList.remove("screen-reader-text")})}),wp.customize("blogdescription",function(e){e.bind(function(e){return document.querySelector(".site-description").textContent=e})}),wp.customize("aurora_theme_options[hide_tagline]",function(e){e.bind(function(e){var t=document.querySelector(".site-description");e&&t.classList.add("screen-reader-text"),!e&&t.classList.contains("screen-reader-text")&&t.classList.remove("screen-reader-text")})}),wp.customize("aurora_theme_options[site_layout]",function(e){e.bind(function(e){var t=document.body;t.classList.remove("boxed","boxed-content","full-width"),t.classList.add(e)})}),wp.customize("aurora_theme_options[footer_credits]",function(e){e.bind(function(e){document.querySelector(".footer-credits").textContent=e})})}});