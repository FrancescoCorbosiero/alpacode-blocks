import { store, getContext } from '@wordpress/interactivity';

store('alpacode/back-to-top', {
    state: {
        get isVisible() {
            return getContext().visible;
        },
    },
    actions: {
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
    },
    callbacks: {
        watchScroll() {
            var ctx = getContext();
            var onScroll = function () {
                ctx.visible = window.scrollY > ctx.threshold;
            };
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
        },
    },
});
