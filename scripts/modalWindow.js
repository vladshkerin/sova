const modalWindow = document.querySelector('.modal-window');
const modalImage = document.querySelector('.modal-window__img');
const btnClose = document.querySelector('.modal-window__btn-close');
const documentFiles = document.querySelectorAll('.document__file');

function modalOpen(obj) {
    obj.classList.remove('modal-window--close');
    obj.classList.add('modal-window--open');
}

function modalClose(obj) {
    obj.classList.add('modal-window--close');

    setTimeout(() => {
        obj.classList.remove('modal-window--open');
    }, 170);
}

function addEvents(obj) {
    for (let i = 0; i < obj.length; i++) {
        const imgElm = obj[i].querySelector('.document__image');
        const imgStr = imgElm.src.replace('.jpg', '_2x.jpg');

        obj[i].addEventListener('click', (e) => {
            e.preventDefault();

            modalImage.src = imgStr;
            modalOpen(modalWindow);
        });
    }
}

btnClose.addEventListener('click', (e) => {
    e.preventDefault();
    modalClose(modalWindow);
});

window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
        if (modalWindow.classList.contains("modal-window--open")) {
            modalClose(modalWindow);
        }
    }
});

addEvents(documentFiles);
