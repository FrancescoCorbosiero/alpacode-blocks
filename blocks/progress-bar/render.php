<?php
/**
 * Progress Bar — Server-side render
 */

$items = $attributes['items'] ?? [];

if (empty($items)) {
    return;
}

$block_id = 'ac-' . wp_unique_id();
?>
<section class="ac-block ac-progress-bar"
    id="<?php echo esc_attr($block_id); ?>">

    <div class="ac-progress-bar__container">
        <?php foreach ($items as $item) :
            $label = $item['label'] ?? '';
            $value = intval($item['value'] ?? 0);
            $value = max(0, min(100, $value));
        ?>
            <div class="ac-progress-bar__item" data-ac-reveal="up">
                <div class="ac-progress-bar__header">
                    <?php if (!empty($label)) : ?>
                        <span class="ac-progress-bar__label"><?php echo esc_html($label); ?></span>
                    <?php endif; ?>
                    <span class="ac-progress-bar__value"><?php echo esc_html($value); ?>%</span>
                </div>
                <div class="ac-progress-bar__track">
                    <div class="ac-progress-bar__fill" style="width: <?php echo esc_attr($value); ?>%;"></div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</section>
