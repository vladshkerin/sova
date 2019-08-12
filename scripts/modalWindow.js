const documentFiles = document.querySelectorAll('.document__file');
const modalWindow = document.querySelector('.modal-window');
const modalImage = document.querySelector('.modal-window__img');
const btnClose = document.querySelector('.modal-window .btn-close');
const shadow = document.querySelector('.shadow');

function modalOpen(obj1, obj2) {
    obj1.classList.add('shadow--open');
    obj2.classList.remove('modal-window--close');
    obj2.classList.add('modal-window--open');
}

function modalClose(obj1, obj2) {
    obj2.classList.add('modal-window--close');

    setTimeout(() => {
        obj1.classList.remove('shadow--open');
        obj2.classList.remove('modal-window--open');
    }, 170);
}

function addEvents(obj) {
    for (let i = 0; i < obj.length; i++) {
        const imgElm = obj[i].querySelector('.document__image');
        const imgStr = imgElm.src.replace('sm.jpg', 'md.jpg');

        obj[i].addEventListener('click', (e) => {
            e.preventDefault();

            modalImage.src = imgStr;
            modalOpen(shadow, modalWindow);
        });
    }
}

btnClose.addEventListener('click', (e) => {
    e.preventDefault();
    modalClose(shadow, modalWindow);
});

shadow.addEventListener('click', (e) => {
    e.preventDefault();
    modalClose(shadow, modalWindow);
});

window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
        if (modalWindow.classList.contains("modal-window--open")) {
            modalClose(shadow, modalWindow);
        }
    }
});

addEvents(documentFiles);
