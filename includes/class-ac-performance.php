<?php
/**
 * AC_Performance — Speculation rules, resource hints, LCP priority.
 */

if (!defined('ABSPATH')) {
    exit;
}

class AC_Performance {

    public function __construct() {
        add_action('wp_footer', [$this, 'render_speculation_rules'], 99);
        add_action('wp_head', [$this, 'render_resource_hints'], 5);
    }

    /**
     * Output speculation rules for prefetch/prerender.
     * Moderate confidence for same-origin links. Eager targets via filter.
     */
    public function render_speculation_rules() {
        $eager_urls = apply_filters('ac_speculation_eager_urls', []);

        $rules = [
            'prefetch' => [
                [
                    'source' => 'document',
                    'where'  => [
                        'and' => [
                            ['href_matches' => '/*'],
                            ['not' => ['href_matches' => '/wp-admin/*']],
                            ['not' => ['selector_matches' => '[rel~=nofollow]']],
                        ],
                    ],
                    'eagerness' => 'moderate',
                ],
            ],
        ];

        if (!empty($eager_urls)) {
            $rules['prerender'] = [
                [
                    'source' => 'list',
                    'urls'   => array_map('esc_url', $eager_urls),
                    'eagerness' => 'eager',
                ],
            ];
        }

        echo '<script type="speculationrules">' . wp_json_encode($rules) . '</script>' . "\n";
    }

    /**
     * Preconnect to required origins.
     */
    public function render_resource_hints() {
        // No external CDN connections needed — fonts are self-hosted.
        // Hook available for themes/extensions:
        $origins = apply_filters('ac_preconnect_origins', []);

        foreach ($origins as $origin) {
            printf(
                '<link rel="preconnect" href="%s" crossorigin>' . "\n",
                esc_url($origin)
            );
        }
    }
}

new AC_Performance();
