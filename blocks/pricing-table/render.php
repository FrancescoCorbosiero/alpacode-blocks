<?php
/**
 * Pricing Table — Server-side render
 */

$eyebrow = $attributes['eyebrow'] ?? '';
$title   = $attributes['title'] ?? '';
$items   = $attributes['items'] ?? [];

if (empty($items)) {
    return;
}

$block_id = 'ac-' . wp_unique_id();
?>
<section class="ac-block ac-pricing-table"
    id="<?php echo esc_attr($block_id); ?>">

    <?php if (!empty($title)) : ?>
        <header class="ac-pricing-table__header" data-ac-reveal="up">
            <div class="ac-pricing-table__header-container">
                <?php if (!empty($eyebrow)) : ?>
                    <span class="ac-pricing-table__eyebrow ac-eyebrow"><?php echo esc_html($eyebrow); ?></span>
                <?php endif; ?>
                <h2 class="ac-pricing-table__title"><?php echo esc_html($title); ?></h2>
            </div>
        </header>
    <?php endif; ?>

    <div class="ac-pricing-table__grid" data-ac-stagger style="--ac-grid-columns: <?php echo esc_attr(count($items)); ?>;">
        <?php foreach ($items as $item) :
            $name        = $item['name'] ?? '';
            $price       = $item['price'] ?? '';
            $period      = $item['period'] ?? '';
            $description = $item['description'] ?? '';
            $features    = array_filter(explode("\n", $item['features'] ?? ''));
            $cta_text    = $item['ctaText'] ?? '';
            $cta_url     = $item['ctaUrl'] ?? '';
            $highlighted = $item['highlighted'] ?? false;
            $hl_class    = $highlighted ? ' ac-pricing-table__plan--highlighted' : '';
        ?>
            <div class="ac-pricing-table__plan<?php echo $hl_class; ?>">
                <?php if ($highlighted) : ?>
                    <span class="ac-pricing-table__badge">Recommended</span>
                <?php endif; ?>
                <div class="ac-pricing-table__plan-header">
                    <h3 class="ac-pricing-table__plan-name"><?php echo esc_html($name); ?></h3>
                    <div class="ac-pricing-table__price">
                        <span class="ac-pricing-table__amount"><?php echo esc_html($price); ?></span>
                        <?php if (!empty($period)) : ?>
                            <span class="ac-pricing-table__period"><?php echo esc_html($period); ?></span>
                        <?php endif; ?>
                    </div>
                    <?php if (!empty($description)) : ?>
                        <p class="ac-pricing-table__desc"><?php echo esc_html($description); ?></p>
                    <?php endif; ?>
                </div>
                <?php if (!empty($features)) : ?>
                    <ul class="ac-pricing-table__features">
                        <?php foreach ($features as $feature) : ?>
                            <li class="ac-pricing-table__feature"><?php echo esc_html(trim($feature)); ?></li>
                        <?php endforeach; ?>
                    </ul>
                <?php endif; ?>
                <?php if (!empty($cta_text) && !empty($cta_url)) : ?>
                    <div class="ac-pricing-table__cta">
                        <a href="<?php echo esc_url($cta_url); ?>" class="ac-btn <?php echo $highlighted ? 'ac-btn--primary' : 'ac-btn--outline'; ?>" style="width: 100%; text-align: center;">
                            <?php echo esc_html($cta_text); ?>
                        </a>
                    </div>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>
    </div>
</section>
