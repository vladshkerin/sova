/*
    Инициализация и подключение Яндекс карты
*/
(function map() {
    const mapElem = document.querySelector('.map');
    const btnOpen = document.querySelector('.contacts-list__item:first-child .contact__value');
    const btnClose = document.querySelector('.map .btn-close');
    const shadow = document.querySelector('.shadow');
    let map;

    function initMap() {
        if (!map) {
            map = new ymaps.Map('map-area', {
                center: [54.929539, 58.169966],
                zoom: 16
            });

            let placemark = new ymaps.Placemark([54.929539, 58.169966]);
            map.geoObjects.add(placemark);
        }
    }

    function mapOpen() {
        shadow.classList.add('shadow--open');
        mapElem.classList.remove('modal-window--close');
        mapElem.classList.add('modal-window--open');
    }

    function mapClose() {
        mapElem.classList.add('modal-window--close');

        setTimeout(() => {
            shadow.classList.remove('shadow--open');
            mapElem.classList.remove('modal-window--open');
        }, 170);
    }

    registerListener('click', (e) => {
        e.preventDefault();
        mapOpen();
        ymaps.ready(initMap);
    }, btnOpen);

    registerListener('click', (e) => {
        e.preventDefault();
        mapClose();
    }, btnClose);

    registerListener('click', (e) => {
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

    function registerListener(event, func, obj) {
        if (!obj) obj = window;
        if (obj.addEventListener) {
            obj.addEventListener(event, func);
        } else {
            obj.attachEvent('on' + event, func);
        }
    }
})();
