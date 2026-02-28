<?php
/**
 * AC_Contact_Form — REST API form handler.
 * Endpoint: alpacode/v1/contact
 * Rate limiting via transient, honeypot field, server-side validation, wp_mail() delivery.
 */

if (!defined('ABSPATH')) {
    exit;
}

class AC_Contact_Form {

    private const RATE_LIMIT = 5;
    private const RATE_WINDOW = 3600; // 1 hour

    public function __construct() {
        add_action('rest_api_init', [$this, 'register_route']);
    }

    public function register_route() {
        register_rest_route('alpacode/v1', '/contact', [
            'methods'             => 'POST',
            'callback'            => [$this, 'handle_submission'],
            'permission_callback' => '__return_true',
            'args'                => [
                'name' => [
                    'required'          => true,
                    'sanitize_callback' => 'sanitize_text_field',
                    'validate_callback' => function ($value) {
                        return !empty(trim($value));
                    },
                ],
                'email' => [
                    'required'          => true,
                    'sanitize_callback' => 'sanitize_email',
                    'validate_callback' => function ($value) {
                        return is_email($value);
                    },
                ],
                'message' => [
                    'required'          => true,
                    'sanitize_callback' => 'sanitize_textarea_field',
                    'validate_callback' => function ($value) {
                        return !empty(trim($value));
                    },
                ],
                'website' => [
                    'required'          => false,
                    'sanitize_callback' => 'sanitize_text_field',
                ],
            ],
        ]);
    }

    public function handle_submission($request) {
        // Honeypot check — "website" field should be empty
        $honeypot = $request->get_param('website');
        if (!empty($honeypot)) {
            // Silently reject bots
            return new WP_REST_Response([
                'success' => true,
                'message' => __('Message sent successfully.', 'alpacode-blocks'),
            ], 200);
        }

        // Rate limiting
        $ip = $this->get_client_ip();
        $transient_key = 'ac_form_rate_' . md5($ip);
        $attempts = (int) get_transient($transient_key);

        if ($attempts >= self::RATE_LIMIT) {
            return new WP_REST_Response([
                'success' => false,
                'message' => __('Too many submissions. Please try again later.', 'alpacode-blocks'),
            ], 429);
        }

        set_transient($transient_key, $attempts + 1, self::RATE_WINDOW);

        // Build email
        $name    = $request->get_param('name');
        $email   = $request->get_param('email');
        $message = $request->get_param('message');

        $to      = apply_filters('ac_contact_form_recipient', get_option('admin_email'));
        $subject = apply_filters(
            'ac_contact_form_subject',
            sprintf(__('Contact form: %s', 'alpacode-blocks'), $name)
        );

        $body = sprintf(
            "Name: %s\nEmail: %s\n\nMessage:\n%s",
            $name,
            $email,
            $message
        );

        $headers = [
            'Content-Type: text/plain; charset=UTF-8',
            sprintf('Reply-To: %s <%s>', $name, $email),
        ];

        $sent = wp_mail($to, $subject, $body, $headers);

        if ($sent) {
            return new WP_REST_Response([
                'success' => true,
                'message' => __('Message sent successfully.', 'alpacode-blocks'),
            ], 200);
        }

        return new WP_REST_Response([
            'success' => false,
            'message' => __('Failed to send message. Please try again.', 'alpacode-blocks'),
        ], 500);
    }

    private function get_client_ip() {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
        return filter_var($ip, FILTER_VALIDATE_IP) ?: '0.0.0.0';
    }
}

new AC_Contact_Form();
