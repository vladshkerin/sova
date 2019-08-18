"use strict";

/**
 *  Инициализация и подключение Яндекс карты.
 */

(function () {
  const registerListener = window.utils.registerListener;
  const mapElem = document.querySelector(".map");
  const shadow = document.querySelector(".shadow");
  const btnOpen = document.querySelector(".contacts-list__item:first-child .contact__value");
  const btnClose = document.querySelector(".shadow__btn-close");
  let coords = [54.926766, 58.158243];
  let map;

  function initMap() {
    if (!map) {
      map = new ymaps.Map("map-area", {
        center: coords,
        zoom: 16
      });

      let placemark = new ymaps.Placemark(coords);
      map.geoObjects.add(placemark);
    }
  }

  function mapOpen() {
    shadow.classList.add("shadow--open");
    mapElem.classList.remove("modal-window--close");
    mapElem.classList.add("modal-window--open");
  }

  function mapClose() {
    mapElem.classList.add("modal-window--close");

    setTimeout(() => {
      shadow.classList.remove("shadow--open");
      mapElem.classList.remove("modal-window--open");
    }, 170);
  }

  registerListener("click", (e) => {
    e.preventDefault();
    mapOpen();
    ymaps.ready(initMap);
  }, btnOpen);

  registerListener("click", (e) => {
    e.preventDefault();
    mapClose();
  }, btnClose);

  registerListener("click", (e) => {
    e.preventDefault();
    mapClose();
  }, shadow);

  registerListener("keydown", (e) => {
    if (e.keyCode === 27) {
      if (mapElem.classList.contains("modal-window--open")) {
        mapClose();
      }
    }
  });
})();
