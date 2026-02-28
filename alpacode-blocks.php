<?php
/**
 * Plugin Name:       Alpacode Blocks
 * Plugin URI:        https://alpacode.com
 * Description:       Plugin-first WordPress block design system. Architectural minimal aesthetic with zero external dependencies.
 * Version:           1.0.0
 * Requires at least: 6.5
 * Requires PHP:      8.0
 * Author:            Alpacode
 * Author URI:        https://alpacode.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       alpacode-blocks
 * Domain Path:       /languages
 */

if (!defined('ABSPATH')) {
    exit;
}

define('AC_BLOCKS_VERSION', '1.0.0');
define('AC_BLOCKS_PATH', plugin_dir_path(__FILE__));
define('AC_BLOCKS_URL', plugin_dir_url(__FILE__));

/**
 * Register custom block category.
 */
add_filter('block_categories_all', function ($categories) {
    array_unshift($categories, [
        'slug'  => 'alpacode',
        'title' => __('Alpacode', 'alpacode-blocks'),
        'icon'  => null,
    ]);
    return $categories;
});

/**
 * Register all blocks by scanning blocks/*/block.json.
 */
add_action('init', function () {
    $block_dirs = glob(AC_BLOCKS_PATH . 'blocks/*/block.json');

    foreach ($block_dirs as $block_json) {
        register_block_type(dirname($block_json));
    }
});

/**
 * Enqueue global frontend assets.
 * Loaded only when at least one alpacode block is present on the page.
 */
add_action('wp_enqueue_scripts', function () {
    // Fonts
    wp_enqueue_style(
        'ac-fonts',
        AC_BLOCKS_URL . 'assets/css/fonts.css',
        [],
        AC_BLOCKS_VERSION
    );

    // Design tokens
    wp_enqueue_style(
        'ac-tokens',
        AC_BLOCKS_URL . 'assets/css/tokens.css',
        ['ac-fonts'],
        AC_BLOCKS_VERSION
    );

    // Base styles
    wp_enqueue_style(
        'ac-base',
        AC_BLOCKS_URL . 'assets/css/base.css',
        ['ac-tokens'],
        AC_BLOCKS_VERSION
    );

    // Animation styles
    wp_enqueue_style(
        'ac-animations',
        AC_BLOCKS_URL . 'assets/css/animations.css',
        ['ac-tokens'],
        AC_BLOCKS_VERSION
    );

    // Animation JS
    wp_enqueue_script(
        'ac-animations',
        AC_BLOCKS_URL . 'assets/js/animations.js',
        [],
        AC_BLOCKS_VERSION,
        ['strategy' => 'defer']
    );
});

/**
 * Enqueue editor-only global assets.
 */
add_action('enqueue_block_editor_assets', function () {
    wp_enqueue_style(
        'ac-fonts',
        AC_BLOCKS_URL . 'assets/css/fonts.css',
        [],
        AC_BLOCKS_VERSION
    );

    wp_enqueue_style(
        'ac-tokens',
        AC_BLOCKS_URL . 'assets/css/tokens.css',
        ['ac-fonts'],
        AC_BLOCKS_VERSION
    );

    wp_enqueue_style(
        'ac-editor-global',
        AC_BLOCKS_URL . 'assets/css/editor.css',
        ['ac-tokens'],
        AC_BLOCKS_VERSION
    );
});

/**
 * Load includes.
 */
require_once AC_BLOCKS_PATH . 'includes/class-ac-theme-json.php';
require_once AC_BLOCKS_PATH . 'includes/class-ac-performance.php';
require_once AC_BLOCKS_PATH . 'includes/class-ac-contact-form.php';
