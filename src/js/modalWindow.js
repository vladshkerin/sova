/*
    Отображение модального окна с выводом изображений документов
*/
(function modalWindow() {
    const modalWin = document.querySelector('.modal-window');
    const sliderControls = document.querySelector('.slider-controls');
    const sliderSlides = document.querySelector('.slider-slides');
    const shadow = document.querySelector('.shadow');
    const img_1 = document.querySelector('.slider-slides img:nth-child(1)');
    const img_2 = document.querySelector('.slider-slides img:nth-child(2)');
    const btnClose = document.querySelector('.shadow__btn-close');
    const btnDownload = document.querySelector('.slider__btn-download');
    const placeholderPath = "img/placeholder.png";
    let docs = [];

    registerListener('load', setVariables);
    registerListener('load', addEvents);
    registerListener('scroll', addEvents);

    function setVariables() {
        docs = document.querySelectorAll('.document__file');
    }

    function addEvents() {
        for (let i = 0; i < docs.length; i++) {
            let imgStr = docs[i].querySelector('.document__file img').src;
            if (imgStr) {
                imgStr = imgStr.replace('sm.jpg', 'md.jpg');

                registerListener('click', (e) => {
                    e.preventDefault();

                    img_1.src = imgStr;
                    btnDownload.href = imgStr.replace(/\/img(\/doc\/[a-zA-Z_]*)_.*.jpg/, '$1.pdf');

                    manageSlider(imgStr);
                    modalOpen();
                }, docs[i]);
            }
        }
    }

    function manageSlider(imgStr) {
        let idx = imgStr.search(/\w+1\w*.jpg/);
        if (idx !== -1) {
            img_2.src = imgStr.replace(/1/, '2');
            sliderControls.classList.remove('controls--hidden');
            sliderSlides.removeAttribute('style');
        } else {
            img_2.src = placeholderPath;
            sliderControls.classList.add('controls--hidden');
            sliderSlides.setAttribute('style', 'transform: translate(0);');
        }
    }

    function modalOpen() {
        shadow.classList.add('shadow--open');
        modalWin.classList.remove('modal-window--close');
        modalWin.classList.add('modal-window--open');
    }

    function modalClose() {
        modalWin.classList.add('modal-window--close');

        setTimeout(() => {
            shadow.classList.remove('shadow--open');
            modalWin.classList.remove('modal-window--open');
        }, 170);
    }

    registerListener("keydown", (e) => {
        if (e.keyCode === 27) {
            if (modalWin.classList.contains("modal-window--open")) {
                modalClose();
            }
        }
    });

    registerListener('click', (e) => {
        e.preventDefault();
        modalClose();
    }, btnClose);

    registerListener('click', (e) => {
        e.preventDefault();
        modalClose();
    }, shadow);

    function registerListener(event, func, obj) {
        if (!obj) obj = window;
        if (obj.addEventListener) {
            obj.addEventListener(event, func);
        } else {
            obj.attachEvent('on' + event, func);
        }
    }
})();
