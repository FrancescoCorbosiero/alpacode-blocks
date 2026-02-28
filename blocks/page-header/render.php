<?php
/**
 * Page Header — Server-side render
 */

$eyebrow     = $attributes['eyebrow'] ?? '';
$title       = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';

if (empty($title)) {
    return;
}

$block_id = 'ac-' . wp_unique_id();
?>
<header class="ac-block ac-page-header"
    id="<?php echo esc_attr($block_id); ?>">

    <div class="ac-page-header__container">
        <?php if (!empty($eyebrow)) : ?>
            <span class="ac-page-header__eyebrow ac-eyebrow" data-ac-reveal="fade"><?php echo esc_html($eyebrow); ?></span>
        <?php endif; ?>

        <h1 class="ac-page-header__title" data-ac-text-reveal="words"><?php echo esc_html($title); ?></h1>

        <?php if (!empty($description)) : ?>
            <p class="ac-page-header__desc" data-ac-reveal="fade" data-ac-reveal-delay="300"><?php echo esc_html($description); ?></p>
        <?php endif; ?>
    </div>

    <div class="ac-page-header__border" data-ac-line></div>
</header>
