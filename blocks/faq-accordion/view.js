import { store, getContext } from '@wordpress/interactivity';

store('alpacode/faq-accordion', {
    actions: {
        toggle() {
            const ctx = getContext();
            ctx.isOpen = !ctx.isOpen;
        },
    },
});
