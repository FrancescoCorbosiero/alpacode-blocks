<?php
/**
 * Team Grid — Server-side render
 */

$eyebrow  = $attributes['eyebrow'] ?? '';
$title    = $attributes['title'] ?? '';
$subtitle = $attributes['subtitle'] ?? '';
$columns  = $attributes['columns'] ?? 4;
$items    = $attributes['items'] ?? [];

if (empty($items)) {
    return;
}

$block_id = 'ac-' . wp_unique_id();
?>
<section class="ac-block ac-team-grid"
    id="<?php echo esc_attr($block_id); ?>"
    style="--ac-grid-columns: <?php echo esc_attr($columns); ?>;">

    <?php if (!empty($title)) : ?>
        <header class="ac-team-grid__header" data-ac-reveal="up">
            <div class="ac-team-grid__header-container">
                <?php if (!empty($eyebrow)) : ?>
                    <span class="ac-team-grid__eyebrow ac-eyebrow"><?php echo esc_html($eyebrow); ?></span>
                <?php endif; ?>
                <h2 class="ac-team-grid__title"><?php echo esc_html($title); ?></h2>
                <?php if (!empty($subtitle)) : ?>
                    <p class="ac-team-grid__subtitle"><?php echo esc_html($subtitle); ?></p>
                <?php endif; ?>
            </div>
        </header>
    <?php endif; ?>

    <div class="ac-team-grid__grid" data-ac-stagger>
        <?php foreach ($items as $item) :
            $name     = $item['name'] ?? '';
            $role     = $item['role'] ?? '';
            $bio      = $item['bio'] ?? '';
            $image_id = $item['imageId'] ?? 0;
        ?>
            <article class="ac-team-grid__item">
                <div class="ac-team-grid__photo">
                    <?php if ($image_id) : ?>
                        <?php echo wp_get_attachment_image($image_id, 'medium', false, [
                            'class'   => 'ac-team-grid__img',
                            'loading' => 'lazy',
                            'sizes'   => '(max-width: 768px) 50vw, 25vw',
                        ]); ?>
                    <?php else : ?>
                        <div class="ac-team-grid__photo-placeholder"></div>
                    <?php endif; ?>
                </div>
                <?php if (!empty($name)) : ?>
                    <h3 class="ac-team-grid__name"><?php echo esc_html($name); ?></h3>
                <?php endif; ?>
                <?php if (!empty($role)) : ?>
                    <span class="ac-team-grid__role"><?php echo esc_html($role); ?></span>
                <?php endif; ?>
                <?php if (!empty($bio)) : ?>
                    <p class="ac-team-grid__bio"><?php echo esc_html($bio); ?></p>
                <?php endif; ?>
            </article>
        <?php endforeach; ?>
    </div>
</section>
