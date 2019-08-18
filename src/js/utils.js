"use strict";

/**
 * Вспомогательные функции.
 */

(function () {
  const shadow = document.querySelector(".shadow");

  window.utils = {
    registerListener: function (event, func, obj) {
      if (!obj) obj = window;
      if (obj.addEventListener) {
        obj.addEventListener(event, func);
      } else {
        obj.attachEvent("on" + event, func);
      }
    },

    modalWindowOpen: function (obj) {
      shadow.classList.add("shadow--open");
      obj.classList.remove("modal-window--close");
      obj.classList.add("modal-window--open");
    },

    modalWindowClose: function (obj) {
      obj.classList.add("modal-window--close");

      setTimeout(() => {
        shadow.classList.remove("shadow--open");
        obj.classList.remove("modal-window--open");
      }, 170);
    }
  };
})();
