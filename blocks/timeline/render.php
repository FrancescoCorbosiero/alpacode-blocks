<?php
/**
 * Timeline — Server-side render
 */

$eyebrow = $attributes['eyebrow'] ?? '';
$title   = $attributes['title'] ?? '';
$items   = $attributes['items'] ?? [];

if (empty($items)) {
    return;
}

$block_id = 'ac-' . wp_unique_id();
?>
<section class="ac-block ac-timeline"
    id="<?php echo esc_attr($block_id); ?>">

    <?php if (!empty($title)) : ?>
        <header class="ac-timeline__header" data-ac-reveal="up">
            <div class="ac-timeline__header-container">
                <?php if (!empty($eyebrow)) : ?>
                    <span class="ac-timeline__eyebrow ac-eyebrow"><?php echo esc_html($eyebrow); ?></span>
                <?php endif; ?>
                <h2 class="ac-timeline__title"><?php echo esc_html($title); ?></h2>
            </div>
        </header>
    <?php endif; ?>

    <div class="ac-timeline__list" data-ac-stagger>
        <?php foreach ($items as $item) :
            $label = $item['label'] ?? '';
            $step_title = $item['title'] ?? '';
            $desc  = $item['description'] ?? '';
        ?>
            <div class="ac-timeline__item">
                <div class="ac-timeline__marker">
                    <span class="ac-timeline__dot"></span>
                    <span class="ac-timeline__line"></span>
                </div>
                <div class="ac-timeline__content">
                    <?php if (!empty($label)) : ?>
                        <span class="ac-timeline__label"><?php echo esc_html($label); ?></span>
                    <?php endif; ?>
                    <?php if (!empty($step_title)) : ?>
                        <h3 class="ac-timeline__step-title"><?php echo esc_html($step_title); ?></h3>
                    <?php endif; ?>
                    <?php if (!empty($desc)) : ?>
                        <p class="ac-timeline__desc"><?php echo esc_html($desc); ?></p>
                    <?php endif; ?>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</section>
