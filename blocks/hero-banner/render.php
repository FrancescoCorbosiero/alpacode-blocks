<?php
/**
 * Hero Banner — Server-side render
 */

$eyebrow         = $attributes['eyebrow'] ?? '';
$title           = $attributes['title'] ?? '';
$subtitle        = $attributes['subtitle'] ?? '';
$cta_text        = $attributes['ctaText'] ?? '';
$cta_url         = $attributes['ctaUrl'] ?? '';
$overlay_opacity = $attributes['overlayOpacity'] ?? 75;
$height          = $attributes['height'] ?? '90vh';
$slides          = $attributes['slides'] ?? [];
$autoplay        = $attributes['autoplay'] ?? true;
$autoplay_speed  = $attributes['autoplaySpeed'] ?? 6000;

if (empty($title)) {
    return;
}

$block_id    = 'ac-' . wp_unique_id();
$has_slides  = count($slides) > 1;
$overlay_pct = intval($overlay_opacity) / 100;
?>
<section class="ac-block ac-hero-banner"
    id="<?php echo esc_attr($block_id); ?>"
    style="--ac-hero-height: <?php echo esc_attr($height); ?>; --ac-hero-overlay: <?php echo esc_attr($overlay_pct); ?>;"
    <?php if ($has_slides) : ?>
        data-wp-interactive="alpacode/hero-banner"
        data-wp-context='<?php echo wp_json_encode([
            'currentSlide' => 0,
            'totalSlides'  => count($slides),
            'autoplay'     => $autoplay,
            'speed'        => $autoplay_speed,
        ]); ?>'
        data-wp-init="callbacks.init"
    <?php endif; ?>>

    <!-- Slides -->
    <div class="ac-hero-banner__slides">
        <?php foreach ($slides as $index => $slide) :
            $image_id = $slide['imageId'] ?? 0;
            if (!$image_id) continue;

            $is_first = $index === 0;
        ?>
            <div class="ac-hero-banner__slide<?php echo $is_first ? ' ac-hero-banner__slide--active' : ''; ?>"
                <?php if ($has_slides) : ?>
                    data-wp-class--ac-hero-banner__slide--active="state.isActiveSlide_<?php echo esc_attr($index); ?>"
                <?php endif; ?>>
                <?php echo wp_get_attachment_image($image_id, 'full', false, [
                    'class'         => 'ac-hero-banner__img' . ($is_first ? ' ac-lcp' : ''),
                    'loading'       => $is_first ? 'eager' : 'lazy',
                    'fetchpriority' => $is_first ? 'high' : 'auto',
                    'sizes'         => '100vw',
                    'alt'           => '',
                ]); ?>
            </div>
        <?php endforeach; ?>

        <?php if (empty($slides)) : ?>
            <div class="ac-hero-banner__slide ac-hero-banner__slide--active ac-hero-banner__slide--placeholder"></div>
        <?php endif; ?>
    </div>

    <!-- Overlay -->
    <div class="ac-hero-banner__overlay"></div>

    <!-- Content -->
    <div class="ac-hero-banner__content">
        <div class="ac-hero-banner__container">
            <?php if (!empty($eyebrow)) : ?>
                <span class="ac-hero-banner__eyebrow ac-eyebrow" data-ac-reveal="fade"><?php echo esc_html($eyebrow); ?></span>
            <?php endif; ?>

            <h1 class="ac-hero-banner__title" data-ac-text-reveal="words"><?php echo esc_html($title); ?></h1>

            <?php if (!empty($subtitle)) : ?>
                <p class="ac-hero-banner__subtitle" data-ac-reveal="fade" data-ac-reveal-delay="400"><?php echo esc_html($subtitle); ?></p>
            <?php endif; ?>

            <?php if (!empty($cta_text) && !empty($cta_url)) : ?>
                <div class="ac-hero-banner__cta" data-ac-reveal="up" data-ac-reveal-delay="600">
                    <a href="<?php echo esc_url($cta_url); ?>" class="ac-btn ac-btn--on-dark">
                        <?php echo esc_html($cta_text); ?>
                    </a>
                </div>
            <?php endif; ?>
        </div>
    </div>

    <?php if ($has_slides) : ?>
    <!-- Slide indicators -->
    <div class="ac-hero-banner__dots" role="tablist" aria-label="<?php esc_attr_e('Slide navigation', 'alpacode'); ?>">
        <?php for ($i = 0; $i < count($slides); $i++) : ?>
            <button class="ac-hero-banner__dot<?php echo $i === 0 ? ' ac-hero-banner__dot--active' : ''; ?>"
                role="tab"
                aria-label="<?php echo esc_attr(sprintf(__('Slide %d', 'alpacode'), $i + 1)); ?>"
                <?php echo $i === 0 ? 'aria-selected="true"' : 'aria-selected="false"'; ?>
                data-wp-on--click="actions.goToSlide"
                data-wp-class--ac-hero-banner__dot--active="state.isActiveDot_<?php echo esc_attr($i); ?>"
                data-slide="<?php echo esc_attr($i); ?>">
            </button>
        <?php endfor; ?>
    </div>
    <?php endif; ?>
</section>
