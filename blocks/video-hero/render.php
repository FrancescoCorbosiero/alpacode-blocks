<?php
/**
 * Video Hero — Server-side render
 */

$eyebrow         = $attributes['eyebrow'] ?? '';
$title           = $attributes['title'] ?? '';
$subtitle        = $attributes['subtitle'] ?? '';
$cta_text        = $attributes['ctaText'] ?? '';
$cta_url         = $attributes['ctaUrl'] ?? '';
$video_url       = $attributes['videoUrl'] ?? '';
$poster_id       = $attributes['posterImageId'] ?? 0;
$overlay_opacity = $attributes['overlayOpacity'] ?? 75;
$height          = $attributes['height'] ?? '90vh';

if (empty($title)) return;

$block_id    = 'ac-' . wp_unique_id();
$overlay_pct = intval($overlay_opacity) / 100;
$poster_url  = $poster_id ? wp_get_attachment_url($poster_id) : '';
?>
<section class="ac-block ac-video-hero"
    id="<?php echo esc_attr($block_id); ?>"
    style="--ac-hero-height: <?php echo esc_attr($height); ?>; --ac-hero-overlay: <?php echo esc_attr($overlay_pct); ?>;">

    <div class="ac-video-hero__media">
        <?php if (!empty($video_url)) : ?>
            <video class="ac-video-hero__video"
                autoplay muted loop playsinline
                <?php echo $poster_url ? 'poster="' . esc_url($poster_url) . '"' : ''; ?>>
                <source src="<?php echo esc_url($video_url); ?>" type="video/mp4">
            </video>
        <?php elseif ($poster_id) : ?>
            <?php echo wp_get_attachment_image($poster_id, 'full', false, [
                'class'         => 'ac-video-hero__poster',
                'loading'       => 'eager',
                'fetchpriority' => 'high',
                'sizes'         => '100vw',
                'alt'           => '',
            ]); ?>
        <?php endif; ?>
    </div>

    <div class="ac-video-hero__overlay"></div>

    <div class="ac-video-hero__content">
        <div class="ac-video-hero__container">
            <?php if (!empty($eyebrow)) : ?>
                <span class="ac-video-hero__eyebrow ac-eyebrow" data-ac-reveal="fade"><?php echo esc_html($eyebrow); ?></span>
            <?php endif; ?>

            <h1 class="ac-video-hero__title" data-ac-text-reveal="words"><?php echo esc_html($title); ?></h1>

            <?php if (!empty($subtitle)) : ?>
                <p class="ac-video-hero__subtitle" data-ac-reveal="fade" data-ac-reveal-delay="400"><?php echo esc_html($subtitle); ?></p>
            <?php endif; ?>

            <?php if (!empty($cta_text) && !empty($cta_url)) : ?>
                <div class="ac-video-hero__cta" data-ac-reveal="up" data-ac-reveal-delay="600">
                    <a href="<?php echo esc_url($cta_url); ?>" class="ac-btn ac-btn--on-dark"><?php echo esc_html($cta_text); ?></a>
                </div>
            <?php endif; ?>
        </div>
    </div>
</section>
