<?php
/**
 * Portfolio Grid — Server-side render
 */

$eyebrow = $attributes['eyebrow'] ?? '';
$title   = $attributes['title'] ?? '';
$columns = $attributes['columns'] ?? 3;
$items   = $attributes['items'] ?? [];

if (empty($items)) return;

$block_id = 'ac-' . wp_unique_id();
?>
<section class="ac-block ac-portfolio-grid"
    id="<?php echo esc_attr($block_id); ?>"
    style="--ac-grid-columns: <?php echo esc_attr($columns); ?>;">

    <?php if (!empty($title)) : ?>
        <header class="ac-portfolio-grid__header" data-ac-reveal="up">
            <div class="ac-portfolio-grid__header-container">
                <?php if (!empty($eyebrow)) : ?>
                    <span class="ac-eyebrow"><?php echo esc_html($eyebrow); ?></span>
                <?php endif; ?>
                <h2 class="ac-portfolio-grid__title"><?php echo esc_html($title); ?></h2>
            </div>
        </header>
    <?php endif; ?>

    <div class="ac-portfolio-grid__grid" data-ac-stagger>
        <?php foreach ($items as $item) :
            $item_title = $item['title'] ?? '';
            $category   = $item['category'] ?? '';
            $image_id   = $item['imageId'] ?? 0;
            $url        = $item['url'] ?? '';
            $tag        = !empty($url) ? 'a' : 'div';
            $href       = !empty($url) ? ' href="' . esc_url($url) . '"' : '';
        ?>
            <<?php echo $tag; ?> class="ac-portfolio-grid__item"<?php echo $href; ?>>
                <div class="ac-portfolio-grid__media" data-ac-image-reveal="up">
                    <?php if ($image_id) : ?>
                        <?php echo wp_get_attachment_image($image_id, 'large', false, [
                            'class'   => 'ac-portfolio-grid__img',
                            'loading' => 'lazy',
                            'sizes'   => '(max-width: 768px) 100vw, 33vw',
                        ]); ?>
                    <?php else : ?>
                        <div class="ac-portfolio-grid__placeholder"></div>
                    <?php endif; ?>
                    <div class="ac-portfolio-grid__overlay">
                        <?php if (!empty($category)) : ?>
                            <span class="ac-portfolio-grid__category"><?php echo esc_html($category); ?></span>
                        <?php endif; ?>
                        <?php if (!empty($item_title)) : ?>
                            <h3 class="ac-portfolio-grid__item-title"><?php echo esc_html($item_title); ?></h3>
                        <?php endif; ?>
                    </div>
                </div>
            </<?php echo $tag; ?>>
        <?php endforeach; ?>
    </div>
</section>
