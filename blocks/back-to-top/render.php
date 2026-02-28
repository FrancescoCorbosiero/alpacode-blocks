<?php
/**
 * Back to Top — Server-side render
 */

$threshold = $attributes['threshold'] ?? 400;
$position  = $attributes['position'] ?? 'right';

$block_id       = 'ac-' . wp_unique_id();
$position_class = ' ac-back-to-top--' . esc_attr($position);
$context         = wp_json_encode([
    'visible'   => false,
    'threshold' => $threshold,
]);
?>
<button class="ac-block ac-back-to-top<?php echo $position_class; ?>"
    id="<?php echo esc_attr($block_id); ?>"
    data-wp-interactive="alpacode/back-to-top"
    data-wp-context="<?php echo esc_attr($context); ?>"
    data-wp-class--ac-back-to-top--visible="state.isVisible"
    data-wp-on--click="actions.scrollToTop"
    data-wp-init="callbacks.watchScroll"
    aria-label="Scroll to top"
    type="button">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
    </svg>
</button>
