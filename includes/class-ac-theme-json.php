<?php
/**
 * AC_Theme_Json — Design token → WordPress editor settings bridge.
 * Injects plugin defaults into theme.json via wp_theme_json_data_default filter.
 */

if (!defined('ABSPATH')) {
    exit;
}

class AC_Theme_Json {

    public function __construct() {
        add_filter('wp_theme_json_data_default', [$this, 'inject_defaults']);
    }

    public function inject_defaults($theme_json) {
        $data = [
            'version' => 2,
            'settings' => [
                'color' => [
                    'defaultPalette' => false,
                    'palette' => [
                        ['slug' => 'ac-primary',            'color' => '#18181B', 'name' => 'Primary'],
                        ['slug' => 'ac-primary-light',      'color' => '#27272A', 'name' => 'Primary Light'],
                        ['slug' => 'ac-primary-dark',       'color' => '#09090B', 'name' => 'Primary Dark'],
                        ['slug' => 'ac-accent',             'color' => '#64748B', 'name' => 'Accent'],
                        ['slug' => 'ac-accent-light',       'color' => '#7C8DA0', 'name' => 'Accent Light'],
                        ['slug' => 'ac-accent-dark',        'color' => '#475569', 'name' => 'Accent Dark'],
                        ['slug' => 'ac-surface',            'color' => '#FAFAFA', 'name' => 'Surface'],
                        ['slug' => 'ac-surface-alt',        'color' => '#F4F4F5', 'name' => 'Surface Alt'],
                        ['slug' => 'ac-border',             'color' => '#E4E4E7', 'name' => 'Border'],
                        ['slug' => 'ac-border-subtle',      'color' => '#F0F0F2', 'name' => 'Border Subtle'],
                        ['slug' => 'ac-text',               'color' => '#18181B', 'name' => 'Text'],
                        ['slug' => 'ac-text-muted',         'color' => '#71717A', 'name' => 'Text Muted'],
                        ['slug' => 'ac-text-faint',         'color' => '#A1A1AA', 'name' => 'Text Faint'],
                        ['slug' => 'ac-text-on-dark',       'color' => '#FAFAFA', 'name' => 'Text On Dark'],
                        ['slug' => 'ac-text-on-dark-muted', 'color' => '#A1A1AA', 'name' => 'Text On Dark Muted'],
                        ['slug' => 'ac-success',            'color' => '#16A34A', 'name' => 'Success'],
                        ['slug' => 'ac-error',              'color' => '#DC2626', 'name' => 'Error'],
                    ],
                ],
                'typography' => [
                    'fontFamilies' => [
                        [
                            'slug'       => 'ac-display',
                            'fontFamily' => "'DM Sans', 'Inter', system-ui, sans-serif",
                            'name'       => 'Display',
                        ],
                        [
                            'slug'       => 'ac-body',
                            'fontFamily' => "'Inter', system-ui, -apple-system, sans-serif",
                            'name'       => 'Body',
                        ],
                        [
                            'slug'       => 'ac-mono',
                            'fontFamily' => "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
                            'name'       => 'Mono',
                        ],
                    ],
                    'fontSizes' => [
                        ['slug' => 'ac-xs',      'size' => 'clamp(0.6875rem, 0.66rem + 0.1vw, 0.75rem)',    'name' => 'Extra Small'],
                        ['slug' => 'ac-sm',      'size' => 'clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem)',   'name' => 'Small'],
                        ['slug' => 'ac-base',    'size' => 'clamp(0.9375rem, 0.9rem + 0.2vw, 1rem)',        'name' => 'Base'],
                        ['slug' => 'ac-lg',      'size' => 'clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)',     'name' => 'Large'],
                        ['slug' => 'ac-xl',      'size' => 'clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)',        'name' => 'Extra Large'],
                        ['slug' => 'ac-2xl',     'size' => 'clamp(1.5rem, 1.2rem + 0.9vw, 2rem)',           'name' => '2XL'],
                        ['slug' => 'ac-3xl',     'size' => 'clamp(1.875rem, 1.4rem + 1.6vw, 2.75rem)',      'name' => '3XL'],
                        ['slug' => 'ac-4xl',     'size' => 'clamp(2.25rem, 1.6rem + 2.2vw, 3.5rem)',        'name' => '4XL'],
                        ['slug' => 'ac-5xl',     'size' => 'clamp(2.75rem, 1.8rem + 3.5vw, 5rem)',          'name' => '5XL'],
                        ['slug' => 'ac-counter', 'size' => 'clamp(3.5rem, 2rem + 5vw, 7rem)',               'name' => 'Counter'],
                    ],
                ],
                'spacing' => [
                    'spacingSizes' => [
                        ['slug' => 'ac-xs',      'size' => '0.25rem',                         'name' => 'XS'],
                        ['slug' => 'ac-sm',      'size' => '0.5rem',                          'name' => 'SM'],
                        ['slug' => 'ac-md',      'size' => '1rem',                            'name' => 'MD'],
                        ['slug' => 'ac-lg',      'size' => '1.5rem',                          'name' => 'LG'],
                        ['slug' => 'ac-xl',      'size' => '2rem',                            'name' => 'XL'],
                        ['slug' => 'ac-2xl',     'size' => '3rem',                            'name' => '2XL'],
                        ['slug' => 'ac-3xl',     'size' => '4.5rem',                          'name' => '3XL'],
                        ['slug' => 'ac-4xl',     'size' => '6rem',                            'name' => '4XL'],
                        ['slug' => 'ac-5xl',     'size' => '9rem',                            'name' => '5XL'],
                        ['slug' => 'ac-section', 'size' => 'clamp(6rem, 4rem + 6vw, 11rem)', 'name' => 'Section'],
                    ],
                ],
                'layout' => [
                    'contentSize' => '1200px',
                    'wideSize'    => '1400px',
                ],
            ],
        ];

        return $theme_json->update_with($data);
    }
}

new AC_Theme_Json();
