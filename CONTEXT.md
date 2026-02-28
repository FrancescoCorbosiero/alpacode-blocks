# CONTEXT.md — Alpacode Blocks Style Definition

> Design tokens, aesthetic rules, motion personality, and block inventory.
> This file defines the visual identity of the plugin. CLAUDE.md defines how to build it.

---

## 1. Style Identity

**Aesthetic:** Architectural Minimal
**Personality:** Precise, geometric, restrained. More Tadao Ando than Apple. The design communicates through structure, proportion, and deliberate emptiness — not through color or decoration.

**Key words:** geometric, structural, precise, clean, unadorned, quiet, spacious, gridded, hairline, monospaced-accents, type-driven.

---

## 2. Design Tokens

### 2.1 Color Palette

Colors are used sparingly. The accent exists to mark interactive elements and critical emphasis — it should feel like a single thread of color in an otherwise monochrome composition.

| Token | Default Value | WP Preset Slug | Usage |
|---|---|---|---|
| `--ac-color-primary` | `#18181B` | `ac-primary` | Primary dark — text on light, dark backgrounds |
| `--ac-color-primary-light` | `#27272A` | `ac-primary-light` | Elevated dark surfaces, hover states on dark |
| `--ac-color-primary-dark` | `#09090B` | `ac-primary-dark` | Deepest dark — hero overlays |
| `--ac-color-accent` | `#64748B` | `ac-accent` | Steel blue accent — links, active states, interactive markers |
| `--ac-color-accent-light` | `#7C8DA0` | `ac-accent-light` | Accent hover state |
| `--ac-color-accent-dark` | `#475569` | `ac-accent-dark` | Accent active/pressed state |
| `--ac-color-surface` | `#FAFAFA` | `ac-surface` | Primary light background |
| `--ac-color-surface-alt` | `#F4F4F5` | `ac-surface-alt` | Alternate light background for section contrast |
| `--ac-color-border` | `#E4E4E7` | `ac-border` | Default divider/border color |
| `--ac-color-border-subtle` | `#F0F0F2` | `ac-border-subtle` | Very light dividers inside components |
| `--ac-color-text` | `#18181B` | `ac-text` | Primary body text |
| `--ac-color-text-muted` | `#71717A` | `ac-text-muted` | Secondary/supporting text |
| `--ac-color-text-faint` | `#A1A1AA` | `ac-text-faint` | Tertiary — placeholders, metadata, ghost numbers |
| `--ac-color-text-on-dark` | `#FAFAFA` | `ac-text-on-dark` | Text on dark backgrounds |
| `--ac-color-text-on-dark-muted` | `#A1A1AA` | `ac-text-on-dark-muted` | Secondary text on dark |
| `--ac-color-success` | `#16A34A` | `ac-success` | Form success |
| `--ac-color-error` | `#DC2626` | `ac-error` | Form error |

**Color usage rules:**

- The accent color appears on: links, button borders/fills, active navigation indicators, focus outlines, and the single decorative accent line that some section blocks use.
- Large surfaces are always `--ac-color-primary` (dark) or `--ac-color-surface` (light). Never tinted with accent.
- Ghost decorative elements (oversized numbers, background marks) use `--ac-color-text-faint` at very low opacity or `--ac-color-border-subtle`. Never accent-tinted.
- Dark variant backgrounds use `--ac-color-primary`. Never a "slightly different dark" — there is one dark, one light, no in-between.

### 2.2 Typography

| Token | Default Value | Usage |
|---|---|---|
| `--ac-font-display` | `'DM Sans', 'Inter', system-ui, sans-serif` | Headings — geometric sans, clean |
| `--ac-font-body` | `'Inter', system-ui, -apple-system, sans-serif` | Body text |
| `--ac-font-mono` | `'JetBrains Mono', 'SF Mono', 'Fira Code', monospace` | Eyebrows, labels, counters, metadata accents |

**Typography rules:**

- Display font for headings and stat values only. Weight: 500–600 (medium to semibold). Never bold (700+).
- Body font for paragraph text, descriptions, form labels. Weight: 400 (regular), 500 (medium for emphasis).
- Monospace font for: eyebrow text, category labels, counter values, navigation item numbers, stat suffixes, code-like metadata. This is the signature typographic accent — it signals precision and structure. Weight: 400.
- Headings are always `--ac-font-display`. Never use display font for body text.
- Line height: headings 1.05–1.15, body 1.6–1.7, mono accents 1.2–1.4.
- Letter spacing: headings tight (`-0.02em`), mono accents wide (`0.12em`), body normal.

**Type Scale (fluid clamp):**

| Token | Value | Typical usage |
|---|---|---|
| `--ac-text-xs` | `clamp(0.6875rem, 0.66rem + 0.1vw, 0.75rem)` | Fine print, eyebrow pre-text |
| `--ac-text-sm` | `clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem)` | Eyebrows, labels, metadata |
| `--ac-text-base` | `clamp(0.9375rem, 0.9rem + 0.2vw, 1rem)` | Body text |
| `--ac-text-lg` | `clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)` | Lead paragraphs, card descriptions |
| `--ac-text-xl` | `clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)` | Card titles, small section headings |
| `--ac-text-2xl` | `clamp(1.5rem, 1.2rem + 0.9vw, 2rem)` | Section headings |
| `--ac-text-3xl` | `clamp(1.875rem, 1.4rem + 1.6vw, 2.75rem)` | Major section headings |
| `--ac-text-4xl` | `clamp(2.25rem, 1.6rem + 2.2vw, 3.5rem)` | Page titles, hero headings |
| `--ac-text-5xl` | `clamp(2.75rem, 1.8rem + 3.5vw, 5rem)` | Hero display text |
| `--ac-text-counter` | `clamp(3.5rem, 2rem + 5vw, 7rem)` | Oversized stat numbers, ghost numbers |

### 2.3 Spacing

| Token | Value |
|---|---|
| `--ac-space-xs` | `0.25rem` |
| `--ac-space-sm` | `0.5rem` |
| `--ac-space-md` | `1rem` |
| `--ac-space-lg` | `1.5rem` |
| `--ac-space-xl` | `2rem` |
| `--ac-space-2xl` | `3rem` |
| `--ac-space-3xl` | `4.5rem` |
| `--ac-space-4xl` | `6rem` |
| `--ac-space-5xl` | `9rem` |
| `--ac-space-section` | `clamp(6rem, 4rem + 6vw, 11rem)` |

**Spacing rules:**

- Section vertical padding is generous — `--ac-space-section` is deliberately large. Whitespace is a design element, not wasted space.
- Inside components, spacing is tight and precise. The contrast between expansive section gaps and compact component internals creates the architectural rhythm.
- Grid gaps use `1px` solid borders as dividers, not spacing gaps. Content items touch each other visually and are separated by hairlines.

### 2.4 Layout

| Token | Value |
|---|---|
| `--ac-max-width` | `1200px` |
| `--ac-max-width-narrow` | `680px` |
| `--ac-max-width-wide` | `1400px` |

### 2.5 Easing

| Token | Value | Usage |
|---|---|---|
| `--ac-ease-out` | `cubic-bezier(0.25, 1, 0.5, 1)` | Standard exits |
| `--ac-ease-in-out` | `cubic-bezier(0.45, 0, 0.55, 1)` | Symmetric moves |
| `--ac-ease-precise` | `cubic-bezier(0.2, 0, 0, 1)` | Primary motion curve — fast start, gentle land |
| `--ac-ease-linear` | `linear` | Progress bars, continuous effects |

### 2.6 Shadows

| Token | Value |
|---|---|
| `--ac-shadow-sm` | `0 1px 2px rgba(0, 0, 0, 0.04)` |
| `--ac-shadow-md` | `0 2px 8px rgba(0, 0, 0, 0.06)` |
| `--ac-shadow-lg` | `0 4px 16px rgba(0, 0, 0, 0.08)` |

Shadows are barely visible. They exist for functional elevation only (dropdowns, modals), never for decoration. Most components have zero shadow — they're defined by borders and whitespace.

### 2.7 Z-Index

| Token | Value |
|---|---|
| `--ac-z-dropdown` | `100` |
| `--ac-z-sticky` | `200` |
| `--ac-z-fixed` | `500` |
| `--ac-z-modal` | `1000` |

---

## 3. Aesthetic Rules

These rules define the visual language. They are **invariant** — they stay the same regardless of which color palette or fonts the user selects.

### 3.1 Shape Language

- **Border radius:** `0` everywhere. No rounded corners. Not `2px`, not `1px` — zero. Every surface is a sharp rectangle. This is non-negotiable and the single strongest visual identifier.
- **Dividers:** Hairline (`1px`) using `--ac-color-border`. Dividers are structural — they define the grid, separate content regions, and create the architectural feel. They are never decorative (no dashes, no gradients, no colored lines).
- **Accent marker:** The accent color appears as a single thin element: a 2px bottom border on active states, a 1px left border on active nav items, or a small square indicator. Never as a background fill on large surfaces. The accent should feel like a single thread woven through the grid.
- **Cards/containers:** No box shadows, no background fills. Components are defined by their border grid — `1px solid var(--ac-color-border)` on the edges that matter. Some components have no visible border at all and are defined purely by typography and whitespace.
- **Icons:** Stroke-based, `strokeWidth: 1` (not 1.5 or 2). Thin, geometric, structural. Consistent with the hairline aesthetic.

### 3.2 Typographic Hierarchy

- **Eyebrow:** Monospace, `--ac-text-sm`, uppercase, letter-spacing `0.12em`, `--ac-color-text-muted`. No decorative line before it (unlike the Cesana editorial style). Just the text, letting the typography and spacing do the work.
- **Section title:** Display font, `--ac-text-3xl` to `--ac-text-4xl`, weight 500, `--ac-color-text`, tight line-height (1.05), tight letter-spacing (-0.02em). Left-aligned.
- **Section subtitle:** Body font, `--ac-text-base`, `--ac-color-text-muted`. Directly under title with minimal gap (`--ac-space-sm`).
- **Component title:** Display font, `--ac-text-xl`, weight 500.
- **Body text:** Body font, `--ac-text-base`, weight 400, line-height 1.65.
- **Counter/stat values:** Monospace, `--ac-text-counter`, weight 400. The monospace at huge sizes is a key signature.
- **Labels/metadata:** Monospace, `--ac-text-xs` to `--ac-text-sm`, uppercase, wide tracking.

### 3.3 Motion Personality

Motion is **precise and mechanical** — not bouncy, not elastic, not playful. Movements are linear or very subtly eased, like a precision mechanism.

- **Reveal animations:** Translate distance is small (12–16px, not 20–30). Duration is moderate (600–800ms). Easing: `--ac-ease-precise`. The effect should feel like elements sliding into a predetermined position on a grid, not floating in.
- **Opacity transitions:** 400–600ms. No transform paired — pure fade for subtle elements.
- **Stagger delay:** 100ms between children (slightly longer than typical — deliberate pacing).
- **Text reveal:** Word-by-word, using `clip-path` with minimal translate (8px). Not character-by-character — that's too playful.
- **Image reveal:** Clip-path wipe, no accent bar sweep (that's the editorial style). Clean wipe only.
- **Hover effects:** Barely perceptible. Color shifts only — `--ac-color-text` to `--ac-color-accent` on interactive elements. No transforms, no scale, no translate on hover. Exception: navigation arrows shift 2px in their direction.
- **No Ken Burns.** Hero images are static. Movement comes from text reveals and opacity transitions, not image zooming.
- **No parallax by default.** The parallax attribute exists in the system but should be used very sparingly (0.1 max speed) and only on large decorative elements. Most content is scroll-locked to the page grid.
- **Page loader:** None by default. The architecture is fast enough that a loader would be pretentious.
- **Magnetic hover:** Disabled by default. Too playful for this aesthetic.

### 3.4 Grid & Layout Patterns

- **Content grids:** Use `1px` border-based grids, not gap-based. Items share borders. The visual effect is a structural grid, like an architectural floor plan.
  ```css
  .ac-grid {
      display: grid;
      gap: 0;
      border: 1px solid var(--ac-color-border);
  }
  .ac-grid__item {
      border: 1px solid var(--ac-color-border);
      /* items share borders visually via border-collapse effect */
  }
  ```
  Use `margin: -1px` or `outline` technique to prevent double borders.
- **Full-width sections** alternate between `--ac-color-surface` and `--ac-color-primary` backgrounds. No gradient transitions between them — sharp cuts.
- **Asymmetric layouts** are preferred over centered compositions. Titles left-aligned, content grids left-weighted. Center alignment only for hero display text and stat counter sections.
- **Container padding:** `--ac-space-xl` (2rem) on sides. Never less. This creates the sense of the content floating within a generous frame.

### 3.5 Component-Specific Rules

**Buttons:**
- Primary: `border: 1px solid --ac-color-primary`, `background: --ac-color-primary`, `color: --ac-color-surface`. No radius.
- Outline: `border: 1px solid --ac-color-border`, transparent background. Hover fills with primary.
- Ghost: Text only, monospace font, uppercase, small. Hover: color shifts to accent. No underline animation.
- Sizing: Modest padding (`0.75rem 1.5rem`). Buttons should feel precise, not chunky.
- Text: Monospace, uppercase, letter-spacing `0.08em`, `--ac-text-xs`.

**Cards/Service Items:**
- No background. No shadow. No visible card boundary except shared hairline borders in a grid.
- Content is structured by typography hierarchy alone.
- Hover: title color shifts to `--ac-color-accent`. Nothing else moves.

**Section Headers:**
- Eyebrow (monospace, muted) → Title (display, large) → Subtitle (body, muted). Stacked left-aligned with tight gaps.
- No decorative lines, no icons, no ornament.

**FAQ/Accordion:**
- Hairline border between items. Trigger is full-width, left-aligned question text + minimal `+` icon (1px strokes, rotates to `−`). No background change on open.

**Hero Banner:**
- Full-height or near-full (`90vh`). Overlay is a flat dark gradient (`--ac-color-primary-dark` at 70–85% opacity), not complex multi-stop.
- Text: left-aligned, bottom-weighted. Eyebrow (mono) → Display title → Subtitle → CTA button.
- If slides exist: crossfade only. No Ken Burns. Dots are thin lines (not circles).
- First image: `fetchpriority="high"`, `loading="eager"`.

**Stats/Counters:**
- Monospace font at oversized scale (`--ac-text-counter`). Accent color on the number. Label below in body font, muted.
- Grid with hairline dividers between stat items.

---

## 4. Block Inventory

Core blocks to implement. All follow CLAUDE.md scaffold pattern.

| Block | Slug | Interactive? | view.js? |
|---|---|---|---|
| Hero Banner | `alpacode/hero-banner` | Yes (crossfade slides) | Yes |
| Page Header | `alpacode/page-header` | No | No |
| Section Header | `alpacode/section-header` | No | No |
| Services Grid | `alpacode/services-grid` | No | No |
| Feature Columns | `alpacode/feature-columns` | No | No |
| Stats Counter | `alpacode/stats-counter` | No (counter is global JS) | No |
| CTA Banner | `alpacode/cta-banner` | No | No |
| FAQ Accordion | `alpacode/faq-accordion` | Yes | Yes |
| Testimonials Slider | `alpacode/testimonials-slider` | Yes (drag carousel) | Yes |
| Contact Form | `alpacode/contact-form` | Yes (AJAX submit) | Yes |
| Image + Text | `alpacode/image-text` | No | No |
| Logo Strip | `alpacode/logo-strip` | No | No |
| Divider | `alpacode/divider` | No | No |
| Team Grid | `alpacode/team-grid` | No | No |
| Pricing Table | `alpacode/pricing-table` | No | No |
| Timeline | `alpacode/timeline` | No | No |
| Portfolio Grid | `alpacode/portfolio-grid` | No | No |
| Marquee | `alpacode/marquee` | No | No |
| Video Hero | `alpacode/video-hero` | No | No |
| Tabs Panel | `alpacode/tabs-panel` | Yes | Yes |
| Progress Bar | `alpacode/progress-bar` | No (widget) | No |
| Notice Bar | `alpacode/notice-bar` | Yes (widget, dismiss) | Yes |
| Back to Top | `alpacode/back-to-top` | Yes (widget, scroll) | Yes |

**Note:** This is a generic library. Block content (titles, descriptions, sample data) in `example` attributes and `snippets.html` should use neutral placeholder text — not tied to any industry. Use: "Precision in every detail", "Built to last", "Trusted by 500+ companies", etc.

### Global Loaders & Utilities

Not blocks — global CSS/JS utilities loaded site-wide:

| Utility | Files | Description |
|---|---|---|
| Scroll Progress | `loaders.css` + `loaders.js` | Thin accent bar at viewport top showing page scroll percentage |
| Preloader | `loaders.css` + `loaders.js` | Minimal dark overlay with animated bar, auto-hides on load |
| Skeleton Shimmer | `loaders.css` | CSS utility classes (`.ac-skeleton--*`) for loading placeholders |
| Page Transition | `loaders.css` + `loaders.js` | Fade overlay on internal link navigation |

---

## 5. Editor Appearance

### Placeholder Style

```css
.ac-editor-placeholder {
    padding: 48px 24px;
    background: #18181B;
    text-align: center;
    color: #FAFAFA;
    font-family: 'DM Sans', system-ui, sans-serif;
    border: 1px solid #27272A;
}

.ac-editor-placeholder__icon {
    width: 40px;
    height: 40px;
    margin: 0 auto 16px;
    color: #64748B;
}

.ac-editor-placeholder__title {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 6px;
}

.ac-editor-placeholder__text {
    font-size: 12px;
    color: #71717A;
    font-family: 'JetBrains Mono', 'SF Mono', monospace;
    letter-spacing: 0.04em;
}
```

Selected state: `outline: 1px solid #64748B; outline-offset: 2px;` (accent color, thin).

---

## 6. Reduced Motion

When `prefers-reduced-motion: reduce`:

- All `data-ac-reveal` elements: visible immediately, no transform, no transition.
- All `data-ac-text-reveal` spans: visible, no clip-path, no delay.
- All `data-ac-image-reveal`: visible, no clip-path.
- All `data-ac-parallax`: disabled, `transform: none !important`.
- All `data-ac-magnetic`: disabled.
- Carousel transitions: instant (no crossfade duration).
- FAQ accordion: instant open/close (no max-height transition).
- Counter: show final value immediately.
- All `transition` and `animation` properties: `none`.

---

## 7. Fonts to Self-Host

Download WOFF2 files for:

1. **DM Sans** — weights 400, 500, 600 (Regular, Medium, SemiBold)
2. **Inter** — weights 400, 500 (Regular, Medium)
3. **JetBrains Mono** — weight 400 (Regular only)

Place in `assets/fonts/`. Register via `@font-face` in `assets/css/fonts.css` with `font-display: swap`.