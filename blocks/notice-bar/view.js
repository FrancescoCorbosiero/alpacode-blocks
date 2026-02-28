import { store, getContext } from '@wordpress/interactivity';

store('alpacode/notice-bar', {
    state: {
        get isDismissed() {
            return getContext().dismissed;
        },
    },
    actions: {
        dismiss() {
            var ctx = getContext();
            ctx.dismissed = true;
        },
    },
});
