<?php
/**
 * Notice Bar — Server-side render
 */

$text        = $attributes['text'] ?? '';
$link_text   = $attributes['linkText'] ?? '';
$link_url    = $attributes['linkUrl'] ?? '';
$variant     = $attributes['variant'] ?? 'dark';
$dismissible = $attributes['dismissible'] ?? true;

if (empty($text)) {
    return;
}

$block_id      = 'ac-' . wp_unique_id();
$variant_class = ' ac-notice-bar--' . esc_attr($variant);
?>
<div class="ac-block ac-notice-bar<?php echo $variant_class; ?>"
    id="<?php echo esc_attr($block_id); ?>"
    data-wp-interactive="alpacode/notice-bar"
    data-wp-context='<?php echo wp_json_encode(['dismissed' => false]); ?>'
    data-wp-class--ac-notice-bar--dismissed="state.isDismissed">

    <div class="ac-notice-bar__container">
        <div class="ac-notice-bar__content">
            <span class="ac-notice-bar__text"><?php echo esc_html($text); ?></span>

            <?php if (!empty($link_text) && !empty($link_url)) : ?>
                <a class="ac-notice-bar__link" href="<?php echo esc_url($link_url); ?>">
                    <?php echo esc_html($link_text); ?>
                </a>
            <?php endif; ?>
        </div>

        <?php if ($dismissible) : ?>
            <button class="ac-notice-bar__close"
                type="button"
                aria-label="Dismiss"
                data-wp-on--click="actions.dismiss">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
                    <line x1="4" y1="4" x2="12" y2="12" />
                    <line x1="12" y1="4" x2="4" y2="12" />
                </svg>
            </button>
        <?php endif; ?>
    </div>
</div>
