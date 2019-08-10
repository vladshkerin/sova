const modalWindow = document.querySelector('.modal-window');
const btnClose = document.querySelector('.modal-window__btn-close');
const listItem = document.querySelector('.documents-list__item');

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

listItem.addEventListener('click', (e) => {
    e.preventDefault();
    modalOpen(modalWindow);
});

btnClose.addEventListener('click', (e) => {
    e.preventDefault();
    modalClose(modalWindow);
});

window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
        console.log('keyCode === 27');
        if (modalWindow.classList.contains("modal-window--open")) {
            modalClose(modalWindow);
        }
    }
});
