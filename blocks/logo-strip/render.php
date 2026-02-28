<?php
/**
 * Logo Strip — Server-side render
 */

$eyebrow = $attributes['eyebrow'] ?? '';
$items   = $attributes['items'] ?? [];
$variant = $attributes['variant'] ?? 'light';
$columns = $attributes['columns'] ?? 5;

if (empty($items)) {
    return;
}

$block_id = 'ac-' . wp_unique_id();
$variant_class = $variant === 'dark' ? ' ac-logo-strip--dark' : '';
?>
<section class="ac-block ac-logo-strip<?php echo $variant_class; ?>"
    id="<?php echo esc_attr($block_id); ?>"
    style="--ac-logo-columns: <?php echo esc_attr($columns); ?>;">

    <div class="ac-logo-strip__container" data-ac-reveal="fade">
        <?php if (!empty($eyebrow)) : ?>
            <span class="ac-logo-strip__eyebrow ac-eyebrow"><?php echo esc_html($eyebrow); ?></span>
        <?php endif; ?>

        <div class="ac-logo-strip__grid">
            <?php foreach ($items as $item) :
                $image_id = $item['imageId'] ?? 0;
                $alt      = $item['alt'] ?? '';
                if (!$image_id) continue;
            ?>
                <div class="ac-logo-strip__item">
                    <?php echo wp_get_attachment_image($image_id, 'medium', false, [
                        'class'   => 'ac-logo-strip__img',
                        'loading' => 'lazy',
                        'alt'     => $alt,
                    ]); ?>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
