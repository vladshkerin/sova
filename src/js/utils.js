"use strict";

/**
 * Вспомогательные функции.
 */

(function () {
  window.utils = {
    registerListener: function (event, func, obj) {
      if (!obj) obj = window;
      if (obj.addEventListener) {
        obj.addEventListener(event, func);
      } else {
        obj.attachEvent("on" + event, func);
      }
    }
  };
})();
