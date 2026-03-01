<?php
/**
 * Alpacode — Theme Functions
 * Block theme: all visual structure, components, interactivity, and animation.
 */

if (!defined('ABSPATH')) {
    exit;
}

define('AC_VERSION', '1.0.0');
define('AC_PATH', get_stylesheet_directory());
define('AC_URI', get_stylesheet_directory_uri());

/**
 * Theme setup.
 */
add_action('after_setup_theme', function () {
    add_theme_support('wp-block-styles');
    add_theme_support('editor-styles');
    add_theme_support('responsive-embeds');
    add_theme_support('post-thumbnails');

    // Load base styles in Site Editor for template part previews.
    add_editor_style('assets/css/tokens.css');
    add_editor_style('assets/css/base.css');
});

/**
 * Register custom block category.
 */
add_filter('block_categories_all', function ($categories) {
    array_unshift($categories, [
        'slug'  => 'alpacode',
        'title' => __('Alpacode', 'alpacode'),
        'icon'  => null,
    ]);
    return $categories;
});

// Register all blocks by scanning blocks/block.json files.
add_action('init', function () {
    $block_dirs = glob(AC_PATH . '/blocks/*/block.json') ?: [];

    foreach ($block_dirs as $block_json) {
        register_block_type(dirname($block_json));
    }
});

/**
 * Register block patterns category.
 */
add_action('init', function () {
    register_block_pattern_category('alpacode', [
        'label' => __('Alpacode', 'alpacode'),
    ]);
});

/**
 * Enqueue global frontend assets.
 */
add_action('wp_enqueue_scripts', function () {
    // Design tokens (bridge: --wp--preset--* → --ac-*)
    wp_enqueue_style(
        'ac-tokens',
        AC_URI . '/assets/css/tokens.css',
        [],
        AC_VERSION
    );

    // Base styles
    wp_enqueue_style(
        'ac-base',
        AC_URI . '/assets/css/base.css',
        ['ac-tokens'],
        AC_VERSION
    );

    // Animation styles
    wp_enqueue_style(
        'ac-animations',
        AC_URI . '/assets/css/animations.css',
        ['ac-tokens'],
        AC_VERSION
    );

    // Loaders & utilities CSS
    wp_enqueue_style(
        'ac-loaders',
        AC_URI . '/assets/css/loaders.css',
        ['ac-tokens'],
        AC_VERSION
    );

    // Animation JS
    wp_enqueue_script(
        'ac-animations',
        AC_URI . '/assets/js/animations.js',
        [],
        AC_VERSION,
        ['strategy' => 'defer']
    );

    // Loaders & utilities JS
    wp_enqueue_script(
        'ac-loaders',
        AC_URI . '/assets/js/loaders.js',
        [],
        AC_VERSION,
        ['strategy' => 'defer']
    );
});

/**
 * Enqueue editor-only global assets.
 */
add_action('enqueue_block_editor_assets', function () {
    wp_enqueue_style(
        'ac-tokens',
        AC_URI . '/assets/css/tokens.css',
        [],
        AC_VERSION
    );

    wp_enqueue_style(
        'ac-editor-global',
        AC_URI . '/assets/css/editor.css',
        ['ac-tokens'],
        AC_VERSION
    );
});

/**
 * Load includes.
 * Guards prevent fatal errors if old plugin is still active (duplicate classes).
 */
if (!class_exists('AC_Performance')) {
    require_once AC_PATH . '/includes/class-ac-performance.php';
}

if (!class_exists('AC_Contact_Form')) {
    require_once AC_PATH . '/includes/class-ac-contact-form.php';
}
