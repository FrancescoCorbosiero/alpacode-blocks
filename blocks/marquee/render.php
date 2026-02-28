<?php
/**
 * Marquee — Server-side render
 */

$text      = $attributes['text'] ?? '';
$separator = $attributes['separator'] ?? '—';
$speed     = $attributes['speed'] ?? 40;
$direction = $attributes['direction'] ?? 'left';
$variant   = $attributes['variant'] ?? 'light';
$font_size = $attributes['fontSize'] ?? 'display';

if (empty($text)) return;

$block_id = 'ac-' . wp_unique_id();
$variant_class = $variant === 'dark' ? ' ac-marquee--dark' : '';
$font_class = $font_size === 'mono' ? ' ac-marquee--mono' : '';
$dir_value = $direction === 'right' ? 'reverse' : 'normal';

// Duplicate content for seamless loop
$content = esc_html($text);
?>
<div class="ac-block ac-marquee<?php echo $variant_class . $font_class; ?>"
    id="<?php echo esc_attr($block_id); ?>"
    style="--ac-marquee-speed: <?php echo esc_attr($speed); ?>s; --ac-marquee-direction: <?php echo esc_attr($dir_value); ?>;"
    aria-hidden="true">

    <div class="ac-marquee__track">
        <span class="ac-marquee__content"><?php echo $content; ?> <?php echo esc_html($separator); ?> </span>
        <span class="ac-marquee__content"><?php echo $content; ?> <?php echo esc_html($separator); ?> </span>
        <span class="ac-marquee__content"><?php echo $content; ?> <?php echo esc_html($separator); ?> </span>
        <span class="ac-marquee__content"><?php echo $content; ?> <?php echo esc_html($separator); ?> </span>
    </div>
</div>
