<?php
/**
 * Divider — Server-side render
 */

$variant  = $attributes['variant'] ?? 'full';
$width    = $attributes['width'] ?? '100';
$animated = $attributes['animated'] ?? true;

$block_id = 'ac-' . wp_unique_id();

$container_class = 'ac-divider--' . esc_attr($variant);

$line_style = $width !== '100' ? ' style="width: ' . esc_attr($width) . '%;"' : '';

$anim_attr = $animated ? ' data-ac-line' : '';
?>
<div class="ac-block ac-divider <?php echo $container_class; ?>"
    id="<?php echo esc_attr($block_id); ?>">
    <div class="ac-divider__container">
        <hr class="ac-divider__line"<?php echo $line_style; ?><?php echo $anim_attr; ?>>
    </div>
</div>
