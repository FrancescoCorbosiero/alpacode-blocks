<?php
/**
 * Testimonials Slider — Server-side render
 */

$eyebrow        = $attributes['eyebrow'] ?? '';
$title          = $attributes['title'] ?? '';
$items          = $attributes['items'] ?? [];
$autoplay       = $attributes['autoplay'] ?? false;
$autoplay_speed = $attributes['autoplaySpeed'] ?? 5000;

if (empty($items)) {
    return;
}

$block_id   = 'ac-' . wp_unique_id();
$has_slides = count($items) > 1;
?>
<section class="ac-block ac-testimonials-slider"
    id="<?php echo esc_attr($block_id); ?>"
    data-wp-interactive="alpacode/testimonials-slider"
    data-wp-context='<?php echo wp_json_encode([
        'currentSlide' => 0,
        'totalSlides'  => count($items),
        'autoplay'     => $autoplay,
        'speed'        => $autoplay_speed,
    ]); ?>'
    data-wp-init="callbacks.init"
    aria-roledescription="<?php esc_attr_e('carousel', 'alpacode-blocks'); ?>"
    aria-label="<?php esc_attr_e('Testimonials', 'alpacode-blocks'); ?>">

    <div class="ac-testimonials-slider__container">
        <?php if (!empty($title)) : ?>
            <header class="ac-testimonials-slider__header" data-ac-reveal="up">
                <?php if (!empty($eyebrow)) : ?>
                    <span class="ac-testimonials-slider__eyebrow ac-eyebrow"><?php echo esc_html($eyebrow); ?></span>
                <?php endif; ?>
                <h2 class="ac-testimonials-slider__title"><?php echo esc_html($title); ?></h2>
            </header>
        <?php endif; ?>

        <div class="ac-testimonials-slider__track"
            aria-live="polite">
            <?php foreach ($items as $index => $item) :
                $quote  = $item['quote'] ?? '';
                $author = $item['author'] ?? '';
                $role   = $item['role'] ?? '';
            ?>
                <blockquote class="ac-testimonials-slider__slide<?php echo $index === 0 ? ' ac-testimonials-slider__slide--active' : ''; ?>"
                    data-wp-class--ac-testimonials-slider__slide--active="state.isActiveSlide_<?php echo esc_attr($index); ?>"
                    role="group"
                    aria-roledescription="<?php esc_attr_e('slide', 'alpacode-blocks'); ?>"
                    aria-label="<?php echo esc_attr(sprintf(__('%d of %d', 'alpacode-blocks'), $index + 1, count($items))); ?>">
                    <p class="ac-testimonials-slider__quote"><?php echo esc_html($quote); ?></p>
                    <footer class="ac-testimonials-slider__attribution">
                        <cite class="ac-testimonials-slider__author"><?php echo esc_html($author); ?></cite>
                        <?php if (!empty($role)) : ?>
                            <span class="ac-testimonials-slider__role"><?php echo esc_html($role); ?></span>
                        <?php endif; ?>
                    </footer>
                </blockquote>
            <?php endforeach; ?>
        </div>

        <?php if ($has_slides) : ?>
        <div class="ac-testimonials-slider__controls">
            <button class="ac-testimonials-slider__arrow ac-testimonials-slider__arrow--prev"
                aria-label="<?php esc_attr_e('Previous testimonial', 'alpacode-blocks'); ?>"
                data-wp-on--click="actions.prev">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 5 5 12 12 19" />
                </svg>
            </button>

            <div class="ac-testimonials-slider__dots" role="tablist" aria-label="<?php esc_attr_e('Testimonial navigation', 'alpacode-blocks'); ?>">
                <?php for ($i = 0; $i < count($items); $i++) : ?>
                    <button class="ac-testimonials-slider__dot<?php echo $i === 0 ? ' ac-testimonials-slider__dot--active' : ''; ?>"
                        role="tab"
                        aria-label="<?php echo esc_attr(sprintf(__('Testimonial %d', 'alpacode-blocks'), $i + 1)); ?>"
                        <?php echo $i === 0 ? 'aria-selected="true"' : 'aria-selected="false"'; ?>
                        data-wp-on--click="actions.goToSlide"
                        data-wp-class--ac-testimonials-slider__dot--active="state.isActiveDot_<?php echo esc_attr($i); ?>"
                        data-slide="<?php echo esc_attr($i); ?>">
                    </button>
                <?php endfor; ?>
            </div>

            <button class="ac-testimonials-slider__arrow ac-testimonials-slider__arrow--next"
                aria-label="<?php esc_attr_e('Next testimonial', 'alpacode-blocks'); ?>"
                data-wp-on--click="actions.next">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                </svg>
            </button>
        </div>
        <?php endif; ?>
    </div>
</section>
