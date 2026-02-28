# CLAUDE.md — Alpacode

> Primary context file for LLM-assisted development.
> Scaffold contract for an architectural minimal WordPress block theme.
> Read this file AND `CONTEXT.md` before generating any code.

---

## 1. Architecture

This is a **block theme** for WordPress. The theme is the product — blocks, templates, design tokens, animations, and template structure all live in one package. Users customize appearance through the Site Editor and `theme.json` overrides.

### Core Principles

- **Zero external JS dependencies.** No npm runtime packages on the frontend. Vanilla JS only.
- **No build step.** Editor JS uses raw `wp.element.createElement`. No JSX, no transpiler, no bundler.
- **Dynamic blocks only.** Every block uses server-side render (`render.php`). `save()` always returns `null`.
- **Full template control.** Block templates for all page types: single, page, archive, search, 404. Editable in Site Editor.
- **Theme-native tokens.** Design tokens defined in `theme.json` — WordPress generates CSS custom properties. `tokens.css` bridges `--wp--preset--*` to `--ac-*` for block CSS.
- **Accessibility-first.** `prefers-reduced-motion` everywhere. ARIA on all interactives. Focus-visible outlines. European Accessibility Act compliant.
- **Performance-first.** Per-block CSS/JS loading, speculation rules, `content-visibility`, responsive images via `wp_get_attachment_image()`, `fetchpriority` on LCP, deferred scripts.

### Requirements

- WordPress 6.5+
- PHP 8.0+
- Block API v3

---

## 2. File System Structure

```
alpacode/
├── style.css                         # Theme header (required by WP)
├── theme.json                        # Design tokens, global styles, template/part declarations
├── functions.php                     # Block registration, assets, category, includes
├── includes/
│   ├── class-ac-contact-form.php     # REST API form handler
│   └── class-ac-performance.php      # Speculation rules, resource hints, LCP priority
├── assets/
│   ├── css/
│   │   ├── tokens.css                # Bridge: --wp--preset--* → --ac-* custom properties
│   │   ├── base.css                  # Reset, button system, global utilities
│   │   ├── animations.css            # Scroll reveal, text reveal, image reveal, parallax, stagger
│   │   └── loaders.css               # Scroll progress, preloader, skeleton shimmer, page transition
│   ├── js/
│   │   ├── animations.js             # Global animation modules (IntersectionObserver-based)
│   │   └── loaders.js                # Scroll progress, preloader, page transition JS
│   └── fonts/                        # Self-hosted WOFF2 fonts (registered via theme.json fontFace)
├── blocks/
│   └── {block-slug}/                 # One folder per block
│       ├── block.json
│       ├── editor.js
│       ├── editor.asset.php          # Dependencies for editor.js (wp-blocks, wp-element, etc.)
│       ├── render.php
│       ├── style.css                 # Loaded only when block is on page
│       ├── editor.css                # Editor-only (optional)
│       └── view.js                   # Interactivity API — interactive widgets only (optional)
├── templates/                        # Block templates — full page layouts
│   ├── index.html                    # Fallback template
│   ├── single.html                   # Single post
│   ├── page.html                     # Static page (content only — blocks define layout)
│   ├── home.html                     # Blog index
│   ├── archive.html                  # Category/tag/date archives
│   ├── search.html                   # Search results
│   ├── 404.html                      # Not found
│   ├── page-no-title.html            # Page without title
│   └── page-full-width.html          # Full-width page
├── parts/                            # Reusable template parts
│   ├── header.html                   # Site header (title + navigation)
│   └── footer.html                   # Site footer
├── patterns/                         # Block patterns (predefined layouts)
│   └── homepage.php                  # Full homepage layout pattern
├── snippets.html                     # Copy-paste reference for WP code editor
├── demo.html                         # Standalone vanilla HTML/CSS showcase of all blocks (no WP required)
├── CLAUDE.md                         # This file — scaffold contract
└── CONTEXT.md                        # Style definition — design tokens, aesthetic rules, block inventory
```

### Naming Conventions

| Scope | Pattern | Example |
|---|---|---|
| Block names | `alpacode/{block-slug}` | `alpacode/hero-banner` |
| CSS classes | `ac-{block}__element` | `ac-hero-banner__title` |
| CSS tokens | `--ac-{category}-{name}` | `--ac-color-primary` |
| Data attributes | `data-ac-{feature}` | `data-ac-reveal="up"` |
| PHP classes | `AC_{PascalCase}` | `AC_Contact_Form` |
| PHP functions | `ac_{snake_case}` | `ac_blocks_register` |
| JS globals | `AlpacodeBlocks` | `window.AlpacodeBlocks` |
| Editor CSS | `ac-editor-{element}` | `ac-editor-placeholder` |

---

## 3. Block Scaffold — Canonical Pattern

Every block follows this exact structure.

### 3.1 block.json

```json
{
    "$schema": "https://schemas.wp.org/trunk/block.json",
    "apiVersion": 3,
    "name": "alpacode/{block-slug}",
    "version": "1.0.0",
    "title": "Block Title",
    "category": "alpacode",
    "icon": "dashicon-name",
    "description": "What this block does.",
    "keywords": ["keyword1", "keyword2"],
    "textdomain": "alpacode",
    "attributes": {},
    "supports": {
        "align": ["full", "wide"],
        "html": false,
        "color": {
            "background": true,
            "text": true
        },
        "spacing": {
            "padding": true,
            "margin": ["top", "bottom"]
        }
    },
    "editorScript": "file:./editor.js",
    "editorStyle": "file:./editor.css",
    "style": "file:./style.css",
    "render": "file:./render.php",
    "viewScriptModule": "file:./view.js",
    "example": {
        "attributes": {}
    }
}
```

**Rules:**

- `apiVersion` always `3`.
- `textdomain` is `"alpacode"` (theme, not plugin).
- `style` = per-block CSS, loaded only when block is present. Never put block CSS in global files.
- `viewScriptModule` = per-block frontend JS. Only for interactive widgets. Omit entirely for static blocks — do not include the field if no view.js exists.
- `example` = realistic sample data for inserter preview. Always include.
- `supports.color` and `supports.spacing` enable per-block overrides through WordPress UI — essential for theme-awareness.
- Images: store `imageId` (type `number`) as primary attribute. Keep `imageUrl` (type `string`) for editor preview. Resolve to responsive markup in render.php.

### 3.2 editor.asset.php

```php
<?php return array(
    'dependencies' => array('wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components'),
    'version'      => '1.0.0',
);
```

**Required for every block.** Without this file, WordPress doesn't know that `editor.js` depends on `wp-blocks`, `wp-element`, etc. — the script loads before those packages and fails silently. The blocks won't appear in the inserter.

### 3.3 editor.js

```js
(function(wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var MediaUpload = wp.blockEditor.MediaUpload;
    var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var SelectControl = wp.components.SelectControl;
    var RangeControl = wp.components.RangeControl;
    var ToggleControl = wp.components.ToggleControl;
    var Button = wp.components.Button;

    registerBlockType('alpacode/{block-slug}', {
        edit: function(props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            return el(Fragment, null,

                // ── Sidebar controls ──
                el(InspectorControls, null,
                    el(PanelBody, { title: 'Settings', initialOpen: true },
                        // Controls here
                    )
                ),

                // ── Canvas placeholder ──
                el('div', { className: 'ac-editor-placeholder' },
                    el('div', { className: 'ac-editor-placeholder__icon' },
                        el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1' },
                            el('path', { d: 'SVG_PATH' })
                        )
                    ),
                    el('div', { className: 'ac-editor-placeholder__title' }, 'Block Name'),
                    el('div', { className: 'ac-editor-placeholder__text' },
                        'Configuration status'
                    )
                )
            );
        },

        save: function() { return null; }
    });
})(window.wp);
```

**Rules:**

- IIFE-wrapped with `window.wp`.
- `var` not `const/let` (no transpiler).
- `save()` always returns `null`.
- Canvas: minimal dark placeholder with block name + status. Content editing in sidebar.
- Image attributes: store both `media.id` and `media.url` via `onSelect`.
- Array attributes: provide `updateItem()`, `removeItem()`, `addItem()`, `moveItem()`.
- Placeholder SVG icons: `stroke` not `fill`, `strokeWidth: '1'` — thin, geometric.

### 3.4 render.php

```php
<?php
/**
 * {Block Name} — Server-side render
 */

$variant   = $attributes['variant'] ?? 'default';
$title     = $attributes['title'] ?? '';
$image_id  = $attributes['imageId'] ?? 0;

if (empty($title)) {
    return;
}

$block_id = 'ac-' . wp_unique_id();
$variant_class = $variant !== 'default' ? ' ac-block-name--' . esc_attr($variant) : '';
?>
<section class="ac-block ac-block-name<?php echo $variant_class; ?>"
    id="<?php echo esc_attr($block_id); ?>"
    data-ac-reveal="up">

    <div class="ac-block-name__container">
        <?php if (!empty($title)) : ?>
            <h2 class="ac-block-name__title"><?php echo esc_html($title); ?></h2>
        <?php endif; ?>

        <?php if ($image_id) : ?>
            <div class="ac-block-name__image" data-ac-image-reveal="left">
                <?php echo wp_get_attachment_image($image_id, 'large', false, [
                    'class'   => 'ac-block-name__img',
                    'loading' => 'lazy',
                    'sizes'   => '(max-width: 768px) 100vw, 50vw',
                ]); ?>
            </div>
        <?php endif; ?>
    </div>
</section>
```

**Rules:**

- All output escaped: `esc_html()`, `esc_url()`, `esc_attr()`, `wp_kses_post()` for rich HTML.
- Always `wp_get_attachment_image()` — never raw `<img src>`.
- LCP image: `'loading' => 'eager'`, `'fetchpriority' => 'high'`, class includes `ac-lcp`.
- All others: `'loading' => 'lazy'`.
- Root: `class="ac-block ac-{BLOCK-NAME}"`.
- `wp_unique_id()` for instance IDs.
- Animation attributes in markup — global JS handles initialization.
- Interactivity API: `data-wp-interactive="alpacode/{block-slug}"` on root.

### 3.5 style.css (per-block)

```css
/**
 * alpacode/{block-slug} — Frontend Styles
 */

.ac-block-name {
    padding: var(--ac-space-section) 0;
    background: var(--ac-color-surface);
}

.ac-block-name--dark {
    background: var(--ac-color-primary);
    color: var(--ac-color-surface);
}

.ac-block-name__container {
    max-width: var(--ac-max-width);
    margin: 0 auto;
    padding: 0 var(--ac-space-xl);
}

@media (max-width: 768px) { }
@media (max-width: 480px) { }
```

**Rules:**

- Only THIS block's styles. No tokens, no reset, no buttons, no animations.
- Design tokens only — never hardcode values.
- BEM-like: `.ac-{BLOCK}__element`.
- Below-fold: `content-visibility: auto; contain-intrinsic-size: auto 600px;`.
- Follow CONTEXT.md §3 aesthetic rules (radius, dividers, whitespace, motion).

### 3.6 view.js (Interactivity API)

```js
import { store, getContext } from '@wordpress/interactivity';

store('alpacode/{block-slug}', {
    state: {},
    actions: {
        actionName() {
            const ctx = getContext();
        }
    },
    callbacks: {}
});
```

**Use for:** carousels, accordions, forms, tabs, modals.
**Don't use for:** scroll animations, parallax, counters, magnetic hover — global `animations.js`.

---

## 4. Animation Data Attributes

Global `animations.js` handles these via IntersectionObserver.

| Attribute | Values | Effect |
|---|---|---|
| `data-ac-reveal` | `up`, `left`, `right`, `fade` | Scroll-triggered reveal |
| `data-ac-reveal-delay` | ms integer | Stagger delay |
| `data-ac-text-reveal` | `chars`, `words`, `lines` | Split-text animation |
| `data-ac-image-reveal` | `left`, `right`, `up`, `down` | Clip-path wipe reveal |
| `data-ac-parallax` | float (`0.3`, `-0.2`) | Scroll parallax |
| `data-ac-magnetic` | (presence) | Cursor-following magnetic |
| `data-ac-stagger` | (presence, on parent) | Auto-stagger children |
| `data-ac-stagger-delay` | ms integer (default `100`) | Stagger interval |
| `data-ac-counter` | integer target | Count-up |
| `data-ac-line` | (presence) | Hairline draw-on |

Motion personality (easing, durations, restraint) defined in CONTEXT.md §3.3.

---

## 5. Performance

### 5.1 Speculation Rules

Generic moderate/conservative rules in `class-ac-performance.php`. Eager prerender targets are domain-specific — configurable via filter:

```php
$eager_urls = apply_filters('ac_speculation_eager_urls', []);
```

### 5.2 Scripts: `'strategy' => 'defer'` on all frontend scripts.

### 5.3 Images: `imageId` → `wp_get_attachment_image()` → `srcset` + `sizes` + `fetchpriority`.

### 5.4 CSS: `content-visibility: auto` on below-fold sections.

### 5.5 Fonts: Self-hosted WOFF2 via `theme.json` `fontFace`. `font-display: swap`. No CDN.

---

## 6. theme.json — Native Token Source

Design tokens live natively in `theme.json` (no PHP bridge needed):

- `settings.color.palette` — project colors, `defaultPalette: false`
- `settings.typography.fontFamilies` — with `fontFace` for self-hosted WOFF2
- `settings.typography.fontSizes` — fluid `clamp()` scale
- `settings.spacing.spacingSizes` — matching token scale
- `settings.layout.contentSize` / `wideSize`
- `settings.border.radius: false` — enforces zero border-radius in editor UI
- `settings.shadow.presets` — minimal shadow scale
- `styles.elements` — heading, link, button global styles
- `styles.blocks` — core block overrides (separator, quote, code, post-title, navigation, etc.)
- `templateParts` — header and footer declarations
- `customTemplates` — page-no-title, page-full-width

CSS bridge in `tokens.css`: `--ac-*: var(--wp--preset--*--ac-*, FALLBACK);`

Child themes override any token via their own `theme.json`. Overrides cascade automatically.

---

## 7. Templates & Parts

### Template Architecture

All templates use `<!-- wp:template-part -->` for header/footer and core WordPress blocks for post content. The architectural minimal aesthetic carries through via `theme.json` global styles — all core blocks (post-title, post-date, navigation, pagination) are styled with monospace accents, hairline borders, and the token palette.

| Template | File | Purpose |
|---|---|---|
| Index | `index.html` | Fallback — post list with hairline dividers |
| Single Post | `single.html` | Narrow content (680px), category/title/date header, prev/next nav |
| Page | `page.html` | Content only — blocks define everything |
| Blog Home | `home.html` | Dark header "Journal", 2-column post grid |
| Archive | `archive.html` | Dark header with archive title, post list |
| Search | `search.html` | Dark header, search form, results list |
| 404 | `404.html` | Dark page with oversized monospace "404", search form |
| Page (No Title) | `page-no-title.html` | Content only, no title block |
| Page (Full Width) | `page-full-width.html` | No content size constraint |

### Template Parts

| Part | File | Area | Description |
|---|---|---|---|
| Header | `header.html` | `header` | Monospace site title + navigation, hairline bottom border |
| Footer | `footer.html` | `footer` | Site title + tagline left, copyright right, hairline top border |

### Block Patterns

| Pattern | File | Description |
|---|---|---|
| Homepage | `homepage.php` | Full homepage: hero → logos → marquee → services → stats → image-text → features → testimonials → FAQ → CTA → contact |

---

## 8. Contact Form (REST API)

- Endpoint: `alpacode/v1/contact`
- Rate limiting: transient, 5/IP/hour
- Honeypot + server validation
- `wp_mail()` delivery
- Frontend: `fetch()` to REST, not `admin-ajax.php`

---

## 9. Accessibility (per block)

- [ ] `:focus-visible` outlines
- [ ] Images: `alt` text or `alt=""`
- [ ] Carousels: `aria-roledescription`, `aria-label`, `aria-live="polite"`
- [ ] Accordions: `aria-expanded`, `aria-controls`
- [ ] Dots: `role="tablist"` / `role="tab"`, `aria-current`
- [ ] Icon buttons: `aria-label`
- [ ] `prefers-reduced-motion: reduce` disables everything
- [ ] Form: `<label>`, `aria-describedby` on errors
- [ ] WCAG AA contrast

---

## 10. New Block Checklist

1. `blocks/{block-slug}/` folder
2. `block.json` — `example`, `supports.color`, `supports.spacing`, `textdomain: "alpacode"`
3. `editor.asset.php` — declares `wp-blocks`, `wp-element`, `wp-block-editor`, `wp-components` deps
4. `editor.js` — sidebar controls, placeholder
5. `render.php` — `wp_get_attachment_image()`, escaping, animation attrs
6. `style.css` — tokens only, responsive, `content-visibility`
7. Interactive? → `view.js` (Interactivity API)
8. Update `snippets.html`
9. Update `demo.html` — add new block's section
10. Auto-registers via `blocks/*/block.json` scan in `functions.php`

---

## 11. demo.html — Standalone Showcase

A self-contained vanilla HTML file that demonstrates every block visually without requiring WordPress. Opens directly in a browser.

**Rules:**

- Single file: all CSS inline in `<style>`, all JS inline in `<script>`.
- Uses the same design tokens (hardcoded values matching `tokens.css` defaults).
- Follows all CONTEXT.md aesthetic rules: zero border-radius, hairline dividers, monospace accents, architectural whitespace.
- Each block section is labeled with its `alpacode/{slug}` name.
- Interactive blocks include working vanilla JS (accordion toggle, carousel crossfade, counter animation, form validation).
- Animations use the same `data-ac-*` attributes with a minimal IntersectionObserver implementation.
- Includes `prefers-reduced-motion` support.
- Responsive: works at desktop, tablet, and mobile widths.
- Uses Google Fonts CDN links for DM Sans, Inter, JetBrains Mono (demo convenience — the theme self-hosts fonts).
- Placeholder images use inline SVG or `data:` URIs. No external image dependencies.
- Rebuild after each block is completed — add the new block's section to `demo.html`.

---

## 12. Context

Style definition (tokens, aesthetic rules, motion, block inventory) lives in **CONTEXT.md**. This file is the scaffold contract. Both required.
