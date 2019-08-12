/* Инициализация и подключение Яндекс карты */

const btnCloseMap = document.querySelector('.map .btn-close');
const btnOpenMap = document.querySelector('.contacts-list_item:first-child .contacts-list_item-value');
const shadowMap = document.querySelector('.shadow');
const mapElem = document.querySelector('.map');
let map;

function mapOpen(obj1, obj2) {
    obj1.classList.add('shadow--open');
    obj2.classList.remove('modal-window--close');
    obj2.classList.add('modal-window--open');
}

function mapClose(obj1, obj2) {
    obj2.classList.add('modal-window--close');

    setTimeout(() => {
        obj1.classList.remove('shadow--open');
        obj2.classList.remove('modal-window--open');
    }, 170);
}

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

btnOpenMap.addEventListener('click', (e) => {
    e.preventDefault();

    mapOpen(shadowMap, mapElem);
    ymaps.ready(initMap);
});

btnCloseMap.addEventListener('click', (e) => {
    e.preventDefault();
    mapClose(shadowMap, mapElem);
});

shadowMap.addEventListener('click', (e) => {
    e.preventDefault();
    modalClose(shadow, mapElem);
});

window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
        if (mapElem.classList.contains("modal-window--open")) {
            modalClose(shadow, mapElem);
        }
    }
});
