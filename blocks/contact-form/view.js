import { store, getContext } from '@wordpress/interactivity';

store('alpacode/contact-form', {
    state: {
        get isSubmitting() {
            return getContext().status === 'submitting';
        },
        get isSuccess() {
            return getContext().status === 'success';
        },
        get isError() {
            return getContext().status === 'error';
        },
        get hasStatus() {
            const status = getContext().status;
            return status === 'success' || status === 'error';
        },
        get buttonText() {
            return getContext().status === 'submitting' ? 'Sending...' : 'Send Message';
        },
        get statusText() {
            const ctx = getContext();
            if (ctx.status === 'success') return ctx.successMessage;
            if (ctx.status === 'error') return ctx.errorMessage;
            return '';
        },
    },
    actions: {
        updateName(event) {
            getContext().name = event.target.value;
        },
        updateEmail(event) {
            getContext().email = event.target.value;
        },
        updateMessage(event) {
            getContext().message = event.target.value;
        },
        updateWebsite(event) {
            getContext().website = event.target.value;
        },
        *submit(event) {
            event.preventDefault();
            const ctx = getContext();

            // Basic client-side validation
            if (!ctx.name.trim() || !ctx.email.trim() || !ctx.message.trim()) {
                ctx.status = 'error';
                ctx.errorMessage = 'Please fill in all required fields.';
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ctx.email)) {
                ctx.status = 'error';
                ctx.errorMessage = 'Please enter a valid email address.';
                return;
            }

            ctx.status = 'submitting';

            try {
                const response = yield fetch(ctx.restUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-WP-Nonce': ctx.nonce,
                    },
                    body: JSON.stringify({
                        name: ctx.name,
                        email: ctx.email,
                        message: ctx.message,
                        website: ctx.website,
                    }),
                });

                const data = yield response.json();

                if (data.success) {
                    ctx.status = 'success';
                    ctx.name = '';
                    ctx.email = '';
                    ctx.message = '';
                } else {
                    ctx.status = 'error';
                    ctx.errorMessage = data.message || 'Something went wrong. Please try again.';
                }
            } catch (err) {
                ctx.status = 'error';
                ctx.errorMessage = 'Network error. Please check your connection and try again.';
            }
        },
    },
});
