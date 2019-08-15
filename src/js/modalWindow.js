/*
    Отображение модального окна с выводом изображений документов
*/
(function modalWindow() {
    const modalWin = document.querySelector('.modal-window');
    const modalImg = document.querySelector('.modal-window__content img');
    const btnClose = document.querySelector('.modal-window .btn-close');
    const shadow = document.querySelector('.shadow');
    let docs = [];

    registerListener('load', setVariables);
    registerListener('load', addEvents);
    registerListener('scroll', addEvents);

    function setVariables() {
        docs = document.querySelectorAll('.document__file');
    }

    function addEvents() {
        for (let i = 0; i < docs.length; i++) {
            const imgElm = docs[i].querySelector('.document__file img');
            if (imgElm.src) {
                const imgStr = imgElm.src.replace('sm.jpg', 'md.jpg');

                registerListener('click', (e) => {
                    e.preventDefault();
                    modalImg.src = imgStr;
                    modalOpen();
                }, docs[i]);
            }
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
