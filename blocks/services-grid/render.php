<?php
/**
 * Services Grid — Server-side render
 */

$eyebrow  = $attributes['eyebrow'] ?? '';
$title    = $attributes['title'] ?? '';
$subtitle = $attributes['subtitle'] ?? '';
$columns  = $attributes['columns'] ?? 3;
$items    = $attributes['items'] ?? [];
$variant  = $attributes['variant'] ?? 'light';

if (empty($items)) {
    return;
}

$block_id = 'ac-' . wp_unique_id();
$variant_class = $variant === 'dark' ? ' ac-services-grid--dark' : '';
?>
<section class="ac-block ac-services-grid<?php echo $variant_class; ?>"
    id="<?php echo esc_attr($block_id); ?>"
    style="--ac-grid-columns: <?php echo esc_attr($columns); ?>;">

    <?php if (!empty($title)) : ?>
        <header class="ac-services-grid__header" data-ac-reveal="up">
            <div class="ac-services-grid__header-container">
                <?php if (!empty($eyebrow)) : ?>
                    <span class="ac-services-grid__eyebrow ac-eyebrow"><?php echo esc_html($eyebrow); ?></span>
                <?php endif; ?>
                <h2 class="ac-services-grid__title"><?php echo esc_html($title); ?></h2>
                <?php if (!empty($subtitle)) : ?>
                    <p class="ac-services-grid__subtitle"><?php echo esc_html($subtitle); ?></p>
                <?php endif; ?>
            </div>
        </header>
    <?php endif; ?>

    <div class="ac-services-grid__grid" data-ac-stagger>
        <?php foreach ($items as $index => $item) :
            $item_title = $item['title'] ?? '';
            $item_desc  = $item['description'] ?? '';
            $number     = str_pad($index + 1, 2, '0', STR_PAD_LEFT);
        ?>
            <article class="ac-services-grid__item">
                <span class="ac-services-grid__number"><?php echo esc_html($number); ?></span>
                <?php if (!empty($item_title)) : ?>
                    <h3 class="ac-services-grid__item-title"><?php echo esc_html($item_title); ?></h3>
                <?php endif; ?>
                <?php if (!empty($item_desc)) : ?>
                    <p class="ac-services-grid__item-desc"><?php echo esc_html($item_desc); ?></p>
                <?php endif; ?>
            </article>
        <?php endforeach; ?>
    </div>
</section>
