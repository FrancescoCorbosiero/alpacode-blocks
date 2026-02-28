<?php
/**
 * Image + Text — Server-side render
 */

$eyebrow        = $attributes['eyebrow'] ?? '';
$title          = $attributes['title'] ?? '';
$description    = $attributes['description'] ?? '';
$image_id       = $attributes['imageId'] ?? 0;
$image_position = $attributes['imagePosition'] ?? 'left';
$cta_text       = $attributes['ctaText'] ?? '';
$cta_url        = $attributes['ctaUrl'] ?? '';
$variant        = $attributes['variant'] ?? 'light';

if (empty($title)) {
    return;
}

$block_id = 'ac-' . wp_unique_id();
$variant_class  = $variant === 'dark' ? ' ac-image-text--dark' : '';
$position_class = ' ac-image-text--image-' . esc_attr($image_position);
?>
<section class="ac-block ac-image-text<?php echo $variant_class . $position_class; ?>"
    id="<?php echo esc_attr($block_id); ?>">

    <div class="ac-image-text__container">
        <?php if ($image_id) : ?>
            <div class="ac-image-text__media" data-ac-image-reveal="<?php echo esc_attr($image_position); ?>">
                <?php echo wp_get_attachment_image($image_id, 'large', false, [
                    'class'   => 'ac-image-text__img',
                    'loading' => 'lazy',
                    'sizes'   => '(max-width: 768px) 100vw, 50vw',
                ]); ?>
            </div>
        <?php endif; ?>

        <div class="ac-image-text__content" data-ac-reveal="up">
            <?php if (!empty($eyebrow)) : ?>
                <span class="ac-image-text__eyebrow ac-eyebrow"><?php echo esc_html($eyebrow); ?></span>
            <?php endif; ?>

            <h2 class="ac-image-text__title"><?php echo esc_html($title); ?></h2>

            <?php if (!empty($description)) : ?>
                <p class="ac-image-text__desc"><?php echo esc_html($description); ?></p>
            <?php endif; ?>

            <?php if (!empty($cta_text) && !empty($cta_url)) : ?>
                <div class="ac-image-text__cta">
                    <a href="<?php echo esc_url($cta_url); ?>" class="ac-btn <?php echo $variant === 'dark' ? 'ac-btn--on-dark' : 'ac-btn--outline'; ?>">
                        <?php echo esc_html($cta_text); ?>
                    </a>
                </div>
            <?php endif; ?>
        </div>
    </div>
</section>
