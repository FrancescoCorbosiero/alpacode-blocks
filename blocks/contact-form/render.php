<?php
/**
 * Contact Form — Server-side render
 */

$eyebrow         = $attributes['eyebrow'] ?? '';
$title           = $attributes['title'] ?? '';
$subtitle        = $attributes['subtitle'] ?? '';
$submit_text     = $attributes['submitText'] ?? 'Send Message';
$success_message = $attributes['successMessage'] ?? 'Thank you. Your message has been sent.';

$block_id = 'ac-' . wp_unique_id();
?>
<section class="ac-block ac-contact-form"
    id="<?php echo esc_attr($block_id); ?>"
    data-wp-interactive="alpacode/contact-form"
    data-wp-context='<?php echo wp_json_encode([
        'name'           => '',
        'email'          => '',
        'message'        => '',
        'website'        => '',
        'status'         => 'idle',
        'errorMessage'   => '',
        'successMessage' => $success_message,
        'restUrl'        => esc_url_raw(rest_url('alpacode/v1/contact')),
        'nonce'          => wp_create_nonce('wp_rest'),
    ]); ?>'>

    <div class="ac-contact-form__container">
        <?php if (!empty($title)) : ?>
            <header class="ac-contact-form__header" data-ac-reveal="up">
                <?php if (!empty($eyebrow)) : ?>
                    <span class="ac-contact-form__eyebrow ac-eyebrow"><?php echo esc_html($eyebrow); ?></span>
                <?php endif; ?>
                <h2 class="ac-contact-form__title"><?php echo esc_html($title); ?></h2>
                <?php if (!empty($subtitle)) : ?>
                    <p class="ac-contact-form__subtitle"><?php echo esc_html($subtitle); ?></p>
                <?php endif; ?>
            </header>
        <?php endif; ?>

        <form class="ac-contact-form__form"
            data-wp-on--submit="actions.submit"
            novalidate>

            <div class="ac-contact-form__field">
                <label for="<?php echo esc_attr($block_id); ?>-name" class="ac-contact-form__label">
                    <?php esc_html_e('Name', 'alpacode-blocks'); ?>
                </label>
                <input type="text"
                    id="<?php echo esc_attr($block_id); ?>-name"
                    class="ac-contact-form__input"
                    required
                    autocomplete="name"
                    data-wp-bind--value="context.name"
                    data-wp-on--input="actions.updateName">
            </div>

            <div class="ac-contact-form__field">
                <label for="<?php echo esc_attr($block_id); ?>-email" class="ac-contact-form__label">
                    <?php esc_html_e('Email', 'alpacode-blocks'); ?>
                </label>
                <input type="email"
                    id="<?php echo esc_attr($block_id); ?>-email"
                    class="ac-contact-form__input"
                    required
                    autocomplete="email"
                    data-wp-bind--value="context.email"
                    data-wp-on--input="actions.updateEmail">
            </div>

            <!-- Honeypot -->
            <div class="ac-contact-form__hp" aria-hidden="true" tabindex="-1">
                <label for="<?php echo esc_attr($block_id); ?>-website">Website</label>
                <input type="text"
                    id="<?php echo esc_attr($block_id); ?>-website"
                    name="website"
                    tabindex="-1"
                    autocomplete="off"
                    data-wp-bind--value="context.website"
                    data-wp-on--input="actions.updateWebsite">
            </div>

            <div class="ac-contact-form__field ac-contact-form__field--full">
                <label for="<?php echo esc_attr($block_id); ?>-message" class="ac-contact-form__label">
                    <?php esc_html_e('Message', 'alpacode-blocks'); ?>
                </label>
                <textarea
                    id="<?php echo esc_attr($block_id); ?>-message"
                    class="ac-contact-form__textarea"
                    rows="5"
                    required
                    data-wp-bind--value="context.message"
                    data-wp-on--input="actions.updateMessage"></textarea>
            </div>

            <div class="ac-contact-form__footer">
                <button type="submit" class="ac-btn ac-btn--primary"
                    data-wp-bind--disabled="state.isSubmitting">
                    <span data-wp-text="state.buttonText"><?php echo esc_html($submit_text); ?></span>
                </button>
            </div>

            <div class="ac-contact-form__status"
                role="alert"
                data-wp-class--ac-contact-form__status--success="state.isSuccess"
                data-wp-class--ac-contact-form__status--error="state.isError"
                data-wp-class--ac-contact-form__status--visible="state.hasStatus">
                <span data-wp-text="state.statusText"></span>
            </div>
        </form>
    </div>
</section>
