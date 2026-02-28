<?php
/**
 * FAQ Accordion — Server-side render
 */

$eyebrow = $attributes['eyebrow'] ?? '';
$title   = $attributes['title'] ?? '';
$items   = $attributes['items'] ?? [];

if (empty($items)) {
    return;
}

$block_id = 'ac-' . wp_unique_id();
?>
<section class="ac-block ac-faq-accordion"
    id="<?php echo esc_attr($block_id); ?>"
    data-wp-interactive="alpacode/faq-accordion">

    <div class="ac-faq-accordion__container">
        <?php if (!empty($title)) : ?>
            <header class="ac-faq-accordion__header" data-ac-reveal="up">
                <?php if (!empty($eyebrow)) : ?>
                    <span class="ac-faq-accordion__eyebrow ac-eyebrow"><?php echo esc_html($eyebrow); ?></span>
                <?php endif; ?>
                <h2 class="ac-faq-accordion__title"><?php echo esc_html($title); ?></h2>
            </header>
        <?php endif; ?>

        <div class="ac-faq-accordion__list" data-ac-stagger>
            <?php foreach ($items as $index => $item) :
                $question = $item['question'] ?? '';
                $answer   = $item['answer'] ?? '';
                $item_id  = $block_id . '-item-' . $index;
            ?>
                <div class="ac-faq-accordion__item"
                    data-wp-context='<?php echo wp_json_encode(['isOpen' => false]); ?>'>

                    <button class="ac-faq-accordion__trigger"
                        id="<?php echo esc_attr($item_id); ?>-trigger"
                        aria-expanded="false"
                        aria-controls="<?php echo esc_attr($item_id); ?>-panel"
                        data-wp-on--click="actions.toggle"
                        data-wp-bind--aria-expanded="context.isOpen">
                        <span class="ac-faq-accordion__question"><?php echo esc_html($question); ?></span>
                        <span class="ac-faq-accordion__icon" aria-hidden="true">
                            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1">
                                <line class="ac-faq-accordion__icon-h" x1="3" y1="8" x2="13" y2="8" />
                                <line class="ac-faq-accordion__icon-v" x1="8" y1="3" x2="8" y2="13" />
                            </svg>
                        </span>
                    </button>

                    <div class="ac-faq-accordion__panel"
                        id="<?php echo esc_attr($item_id); ?>-panel"
                        role="region"
                        aria-labelledby="<?php echo esc_attr($item_id); ?>-trigger"
                        data-wp-class--ac-faq-accordion__panel--open="context.isOpen">
                        <div class="ac-faq-accordion__answer">
                            <p><?php echo wp_kses_post($answer); ?></p>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
