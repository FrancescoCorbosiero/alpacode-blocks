import { store, getContext } from '@wordpress/interactivity';

const { state, actions } = store('alpacode/hero-banner', {
    state: {
        get isActiveSlide_0() {
            return getContext().currentSlide === 0;
        },
        get isActiveSlide_1() {
            return getContext().currentSlide === 1;
        },
        get isActiveSlide_2() {
            return getContext().currentSlide === 2;
        },
        get isActiveSlide_3() {
            return getContext().currentSlide === 3;
        },
        get isActiveSlide_4() {
            return getContext().currentSlide === 4;
        },
        get isActiveDot_0() {
            return getContext().currentSlide === 0;
        },
        get isActiveDot_1() {
            return getContext().currentSlide === 1;
        },
        get isActiveDot_2() {
            return getContext().currentSlide === 2;
        },
        get isActiveDot_3() {
            return getContext().currentSlide === 3;
        },
        get isActiveDot_4() {
            return getContext().currentSlide === 4;
        },
    },
    actions: {
        goToSlide(event) {
            const ctx = getContext();
            const index = parseInt(event.target.dataset.slide, 10);
            if (!isNaN(index)) {
                ctx.currentSlide = index;
                actions.resetAutoplay();
            }
        },
        nextSlide() {
            const ctx = getContext();
            ctx.currentSlide = (ctx.currentSlide + 1) % ctx.totalSlides;
        },
        resetAutoplay() {
            const ctx = getContext();
            if (ctx._timer) {
                clearInterval(ctx._timer);
            }
            if (ctx.autoplay) {
                ctx._timer = setInterval(() => {
                    actions.nextSlide();
                }, ctx.speed);
            }
        },
    },
    callbacks: {
        init() {
            const ctx = getContext();
            if (ctx.autoplay && ctx.totalSlides > 1) {
                const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                if (!reducedMotion) {
                    ctx._timer = setInterval(() => {
                        actions.nextSlide();
                    }, ctx.speed);
                }
            }
        },
    },
});
