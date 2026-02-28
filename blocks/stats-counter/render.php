<?php
/**
 * Stats Counter — Server-side render
 */

$items   = $attributes['items'] ?? [];
$variant = $attributes['variant'] ?? 'light';

if (empty($items)) {
    return;
}

$block_id = 'ac-' . wp_unique_id();
$variant_class = $variant === 'dark' ? ' ac-stats-counter--dark' : '';
?>
<section class="ac-block ac-stats-counter<?php echo $variant_class; ?>"
    id="<?php echo esc_attr($block_id); ?>">

    <div class="ac-stats-counter__grid" data-ac-stagger>
        <?php foreach ($items as $item) :
            $value  = intval($item['value'] ?? 0);
            $suffix = $item['suffix'] ?? '';
            $label  = $item['label'] ?? '';
        ?>
            <div class="ac-stats-counter__item">
                <div class="ac-stats-counter__value">
                    <span data-ac-counter="<?php echo esc_attr($value); ?>">0</span><?php if (!empty($suffix)) : ?><span class="ac-stats-counter__suffix"><?php echo esc_html($suffix); ?></span><?php endif; ?>
                </div>
                <?php if (!empty($label)) : ?>
                    <span class="ac-stats-counter__label"><?php echo esc_html($label); ?></span>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>
    </div>
</section>
