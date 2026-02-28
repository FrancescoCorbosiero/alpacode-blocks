<?php
/**
 * Tabs Panel — Server-side render
 */

$items = $attributes['items'] ?? [];

if (empty($items)) return;

$block_id = 'ac-' . wp_unique_id();
?>
<section class="ac-block ac-tabs-panel"
    id="<?php echo esc_attr($block_id); ?>"
    data-wp-interactive="alpacode/tabs-panel"
    data-wp-context='<?php echo wp_json_encode(['activeTab' => 0, 'totalTabs' => count($items)]); ?>'>

    <div class="ac-tabs-panel__container">
        <div class="ac-tabs-panel__tabs" role="tablist" aria-label="<?php esc_attr_e('Content tabs', 'alpacode'); ?>">
            <?php foreach ($items as $index => $item) :
                $label = $item['label'] ?? 'Tab ' . ($index + 1);
            ?>
                <button class="ac-tabs-panel__tab<?php echo $index === 0 ? ' ac-tabs-panel__tab--active' : ''; ?>"
                    role="tab"
                    aria-selected="<?php echo $index === 0 ? 'true' : 'false'; ?>"
                    aria-controls="<?php echo esc_attr($block_id); ?>-panel-<?php echo $index; ?>"
                    id="<?php echo esc_attr($block_id); ?>-tab-<?php echo $index; ?>"
                    data-wp-on--click="actions.switchTab"
                    data-wp-class--ac-tabs-panel__tab--active="state.isActiveTab_<?php echo $index; ?>"
                    data-tab="<?php echo esc_attr($index); ?>">
                    <?php echo esc_html($label); ?>
                </button>
            <?php endforeach; ?>
        </div>

        <div class="ac-tabs-panel__panels">
            <?php foreach ($items as $index => $item) :
                $tab_title = $item['title'] ?? '';
                $content   = $item['content'] ?? '';
            ?>
                <div class="ac-tabs-panel__panel<?php echo $index === 0 ? ' ac-tabs-panel__panel--active' : ''; ?>"
                    role="tabpanel"
                    id="<?php echo esc_attr($block_id); ?>-panel-<?php echo $index; ?>"
                    aria-labelledby="<?php echo esc_attr($block_id); ?>-tab-<?php echo $index; ?>"
                    data-wp-class--ac-tabs-panel__panel--active="state.isActivePanel_<?php echo $index; ?>">
                    <?php if (!empty($tab_title)) : ?>
                        <h3 class="ac-tabs-panel__panel-title"><?php echo esc_html($tab_title); ?></h3>
                    <?php endif; ?>
                    <?php if (!empty($content)) : ?>
                        <p class="ac-tabs-panel__panel-content"><?php echo wp_kses_post($content); ?></p>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
