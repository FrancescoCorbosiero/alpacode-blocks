<?php
/**
 * Section Header — Server-side render
 */

$eyebrow       = $attributes['eyebrow'] ?? '';
$title         = $attributes['title'] ?? '';
$subtitle      = $attributes['subtitle'] ?? '';
$alignment     = $attributes['alignment'] ?? 'left';
$heading_level = $attributes['headingLevel'] ?? 'h2';

if (empty($title)) {
    return;
}

$block_id = 'ac-' . wp_unique_id();
$align_class = $alignment !== 'left' ? ' ac-section-header--' . esc_attr($alignment) : '';
$tag = in_array($heading_level, ['h1', 'h2', 'h3', 'h4'], true) ? $heading_level : 'h2';
?>
<header class="ac-block ac-section-header<?php echo $align_class; ?>"
    id="<?php echo esc_attr($block_id); ?>"
    data-ac-reveal="up">

    <div class="ac-section-header__container">
        <?php if (!empty($eyebrow)) : ?>
            <span class="ac-section-header__eyebrow ac-eyebrow"><?php echo esc_html($eyebrow); ?></span>
        <?php endif; ?>

        <<?php echo $tag; ?> class="ac-section-header__title"><?php echo esc_html($title); ?></<?php echo $tag; ?>>

        <?php if (!empty($subtitle)) : ?>
            <p class="ac-section-header__subtitle"><?php echo esc_html($subtitle); ?></p>
        <?php endif; ?>
    </div>
</header>
