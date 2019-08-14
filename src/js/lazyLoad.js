(function lazyLoad() {
    let lazy = [];

    registerListener('load', setLazy);
    registerListener('load', lazyLoad);
    registerListener('scroll', lazyLoad);

    function setLazy() {
        lazy = document.querySelectorAll('.lazy');
    }

    function lazyLoad() {
        for (let i = 0; i < lazy.length; i++) {
            if (isInViewport(lazy[i])) {
                lazy[i].src = lazy[i].getAttribute('data-src');
                lazy[i].removeAttribute('data-src');
            }
        }

        cleanLazy();
    }

    function isInViewport(el) {
        const rect = el.getBoundingClientRect();

        return (
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function cleanLazy() {
        lazy = Array.prototype.filter.call(lazy, (l) => {
            return l.getAttribute('data-src');
        });
    }

    function registerListener(event, func) {
        if (window.addEventListener) {
            window.addEventListener(event, func)
        } else {
            window.attachEvent('on' + event, func)
        }
    }
})();
