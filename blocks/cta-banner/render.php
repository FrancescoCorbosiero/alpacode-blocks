<?php
/**
 * CTA Banner — Server-side render
 */

$eyebrow        = $attributes['eyebrow'] ?? '';
$title          = $attributes['title'] ?? '';
$description    = $attributes['description'] ?? '';
$cta_text       = $attributes['ctaText'] ?? '';
$cta_url        = $attributes['ctaUrl'] ?? '';
$secondary_text = $attributes['secondaryText'] ?? '';
$secondary_url  = $attributes['secondaryUrl'] ?? '';
$variant        = $attributes['variant'] ?? 'dark';

if (empty($title)) {
    return;
}

$block_id = 'ac-' . wp_unique_id();
$variant_class = $variant === 'dark' ? ' ac-cta-banner--dark' : '';
?>
<section class="ac-block ac-cta-banner<?php echo $variant_class; ?>"
    id="<?php echo esc_attr($block_id); ?>"
    data-ac-reveal="up">

    <div class="ac-cta-banner__container">
        <div class="ac-cta-banner__content">
            <?php if (!empty($eyebrow)) : ?>
                <span class="ac-cta-banner__eyebrow ac-eyebrow"><?php echo esc_html($eyebrow); ?></span>
            <?php endif; ?>

            <h2 class="ac-cta-banner__title"><?php echo esc_html($title); ?></h2>

            <?php if (!empty($description)) : ?>
                <p class="ac-cta-banner__desc"><?php echo esc_html($description); ?></p>
            <?php endif; ?>

            <?php if (!empty($cta_text) || !empty($secondary_text)) : ?>
                <div class="ac-cta-banner__actions">
                    <?php if (!empty($cta_text) && !empty($cta_url)) : ?>
                        <a href="<?php echo esc_url($cta_url); ?>" class="ac-btn <?php echo $variant === 'dark' ? 'ac-btn--on-dark' : 'ac-btn--primary'; ?>">
                            <?php echo esc_html($cta_text); ?>
                        </a>
                    <?php endif; ?>

                    <?php if (!empty($secondary_text) && !empty($secondary_url)) : ?>
                        <a href="<?php echo esc_url($secondary_url); ?>" class="ac-btn ac-btn--ghost <?php echo $variant === 'dark' ? 'ac-btn--on-dark' : ''; ?>">
                            <?php echo esc_html($secondary_text); ?>
                        </a>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
</section>
