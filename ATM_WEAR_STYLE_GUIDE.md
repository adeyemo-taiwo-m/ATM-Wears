# ATM WEAR — Design System & Style Guide
### Frontend Reference for Coding Agents · v1.0

> **How to use this file:** This is the single source of truth for every visual decision in ATM WEAR. Your coding agent must read this before writing any HTML, CSS, or JS. Never hardcode any value that has a token defined here. Every section maps directly to implementation.

---

## 1. Brand Essence

| Attribute | Value |
|-----------|-------|
| **Brand name** | ATM WEAR |
| **Tagline** | Nothing extra. |
| **Concept** | Genderless minimalist fashion. Warm, elevated, intentional. |
| **Target** | Nigerian urban consumers, Gen Z + Millennial |
| **Mood** | Quiet luxury. Warm neutrals. Editorial restraint. |
| **Price point** | Premium — prices in ₦ (Naira) |

**Design personality:** Think Luxora × Nigerian warmth. The palette is inspired by natural materials — linen, bone, warm sand, soft leather. The UI feels like a well-curated boutique: unhurried, confident, and beautifully spaced.

---

## 2. Color System

All colors extracted from the reference image. Define ALL of these as CSS custom properties in `css/global.css`. **Never hardcode hex values anywhere else in the codebase.**

### 2.1 Core Palette

```css
:root {
  /* ─── Backgrounds ─────────────────────────────────── */
  --atm-cream:       #F7F4EF;   /* Warm page background — the base of everything */
  --atm-linen:       #EDE9E0;   /* Section backgrounds, alternating strips */
  --atm-bone:        #E2DDD4;   /* Card backgrounds, input fills */
  --atm-sand:        #D4CABC;   /* Borders, dividers, skeleton loaders */

  /* ─── Text ────────────────────────────────────────── */
  --atm-charcoal:    #1C1C1A;   /* Primary text, headings — near-black warm */
  --atm-slate:       #3D3B36;   /* Body text, secondary headings */
  --atm-muted:       #7A7670;   /* Captions, labels, placeholder text */
  --atm-ghost:       #B0AA9F;   /* Disabled states, decorative text */

  /* ─── Accent ──────────────────────────────────────── */
  --atm-caramel:     #C8956B;   /* Primary CTA, hover accents, links — warm tan */
  --atm-caramel-dark:#A8734F;   /* CTA hover/active state */
  --atm-caramel-light:#E8C9A8;  /* Accent backgrounds, badges, highlights */

  /* ─── Utility ─────────────────────────────────────── */
  --atm-white:       #FFFFFF;   /* Pure white — modals, overlays */
  --atm-overlay:     rgba(28, 28, 26, 0.45); /* Image overlays */
  --atm-scrim:       rgba(28, 28, 26, 0.08); /* Card hover tints */
}
```

### 2.2 Color Usage Rules

| Use Case | Token to Use |
|----------|-------------|
| Page background | `--atm-cream` |
| Section backgrounds (alternating) | `--atm-linen` |
| Card / input background | `--atm-bone` |
| All borders and dividers | `--atm-sand` |
| H1, H2, H3 headings | `--atm-charcoal` |
| Body paragraphs | `--atm-slate` |
| Labels, captions, nav links | `--atm-muted` |
| Placeholder text | `--atm-ghost` |
| Primary buttons (fill) | `--atm-charcoal` |
| Primary buttons (hover) | `--atm-caramel` |
| Ghost button border | `--atm-charcoal` |
| Ghost button hover fill | `--atm-charcoal` |
| Accent text / price highlights | `--atm-caramel` |
| Tag backgrounds | `--atm-caramel-light` |
| Tag text | `--atm-caramel-dark` |
| Image overlay | `--atm-overlay` |

### 2.3 Do Not

- ❌ Never use pure black `#000000` — always use `--atm-charcoal`
- ❌ Never use pure white `#FFFFFF` as a page background — use `--atm-cream`
- ❌ Never use blue, green, red, or purple as brand colors
- ❌ Never put `--atm-caramel` text on `--atm-cream` background (insufficient contrast)
- ✅ Always use `--atm-charcoal` for text on `--atm-caramel-light` backgrounds

---

## 3. Typography

### 3.1 Font Families

```css
:root {
  --font-display: 'Playfair Display', Georgia, serif;  /* Hero headlines, editorial moments */
  --font-body:    'DM Sans', system-ui, sans-serif;    /* All UI, body text, navigation */
  --font-mono:    'DM Mono', 'Courier New', monospace; /* Prices, labels, tags, product codes */
}
```

**Google Fonts import — paste in `<head>` of every HTML file:**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet">
```

### 3.2 Type Scale

```css
:root {
  /* Scale */
  --text-xs:    0.6875rem;   /* 11px — micro labels, tags */
  --text-sm:    0.8125rem;   /* 13px — captions, nav links */
  --text-base:  1rem;        /* 16px — body copy */
  --text-md:    1.125rem;    /* 18px — lead paragraphs */
  --text-lg:    1.375rem;    /* 22px — card headings */
  --text-xl:    1.75rem;     /* 28px — section headings */
  --text-2xl:   2.5rem;      /* 40px — page headings */
  --text-3xl:   3.5rem;      /* 56px — large display */
  --text-hero:  clamp(3.25rem, 8vw, 7rem); /* Hero headline — fluid */
}
```

### 3.3 Typography Usage Rules

```css
/* H1 — Hero headlines only */
font-family: var(--font-display);
font-size: var(--text-hero);
font-weight: 400;              /* Always regular weight in display font */
line-height: 0.92;
letter-spacing: -0.02em;
color: var(--atm-charcoal);

/* H2 — Section headings */
font-family: var(--font-display);
font-size: var(--text-2xl);
font-weight: 400;
line-height: 1.1;
color: var(--atm-charcoal);

/* H3 — Card / component headings */
font-family: var(--font-body);
font-size: var(--text-lg);
font-weight: 400;
line-height: 1.3;
color: var(--atm-charcoal);

/* Body copy */
font-family: var(--font-body);
font-size: var(--text-base);
font-weight: 300;
line-height: 1.7;
color: var(--atm-slate);

/* Nav links */
font-family: var(--font-body);
font-size: var(--text-sm);
font-weight: 400;
letter-spacing: 0.06em;
text-transform: uppercase;
color: var(--atm-charcoal);

/* Price display */
font-family: var(--font-mono);
font-size: var(--text-base);
font-weight: 400;
color: var(--atm-charcoal);
letter-spacing: -0.01em;

/* Labels / tags / eyebrows */
font-family: var(--font-mono);
font-size: var(--text-xs);
font-weight: 400;
letter-spacing: 0.18em;
text-transform: uppercase;
color: var(--atm-muted);

/* Italic display accent (use sparingly — one word in a headline) */
font-family: var(--font-display);
font-style: italic;
font-weight: 400;
```

### 3.4 Typography Do / Don't

| ✅ Do | ❌ Don't |
|-------|---------|
| Use Playfair italic for ONE accent word in hero | Use bold weights (700+) for display text |
| Use DM Mono for ALL prices | Mix Playfair into body text |
| Uppercase + wide tracking for labels | Use more than 3 font families |
| Keep body text at weight 300 | Use system sans-serif for display |

---

## 4. Spacing System

```css
:root {
  /* Base unit: 4px */
  --space-1:  0.25rem;   /*  4px */
  --space-2:  0.5rem;    /*  8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.25rem;   /* 20px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */
}
```

### Spacing Usage Map

| Context | Token |
|---------|-------|
| Between nav items | `--space-8` |
| Card internal padding | `--space-6` |
| Section vertical padding | `--space-24` desktop / `--space-16` mobile |
| Between product cards (grid gap) | `--space-5` |
| Between heading and body | `--space-4` |
| Between body and CTA | `--space-8` |
| Input padding | `--space-3` `--space-4` |
| Button padding | `--space-4` `--space-8` |
| Product image to info | `--space-3` |

---

## 5. Layout System

```css
:root {
  --max-width:    1380px;
  --grid-gutter:  clamp(1.25rem, 5vw, 3rem);  /* Side padding on all sections */
  --nav-height:   68px;
  --content-width: min(100%, var(--max-width));
}

/* Container utility — use on every section's inner wrapper */
.container {
  width: 100%;
  max-width: var(--max-width);
  margin-inline: auto;
  padding-inline: var(--grid-gutter);
}
```

### Grid Definitions

```css
/* Product grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-5);
}

/* 2-column editorial */
.grid-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
}

/* 60/40 PDP layout */
.grid-pdp {
  display: grid;
  grid-template-columns: 60fr 40fr;
  gap: var(--space-12);
  align-items: start;
}

/* 3-column features */
.grid-3col {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
}
```

---

## 6. Motion & Animation

```css
:root {
  /* Easing */
  --ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out:    cubic-bezier(0.65, 0, 0.35, 1);
  --ease-out-quad:  cubic-bezier(0.25, 0.46, 0.45, 0.94);

  /* Durations */
  --dur-fast:   150ms;   /* Micro-interactions: button press, checkbox */
  --dur-base:   300ms;   /* Most hover transitions */
  --dur-slow:   600ms;   /* Panel slides, drawer opens */
  --dur-xslow:  900ms;   /* Page entrance animations */
}
```

### Animation Rules

| Trigger | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Button hover | background color + translateY(-1px) | `--dur-base` | `--ease-out-expo` |
| Card hover | image scale(1.04) | `--dur-slow` | `--ease-out-expo` |
| Nav underline | scaleX 0→1 | `--dur-base` | `--ease-out-expo` |
| Cart drawer open | translateX 100%→0 | `--dur-slow` | `power3.out (GSAP)` |
| Page entrance | y 30px + opacity 0→1 | `--dur-xslow` | `power4.out (GSAP)` |
| Stagger children | each item +80ms delay | `--dur-xslow` | `power3.out (GSAP)` |
| Scroll reveal | y 50px + opacity 0→1 | `--dur-xslow` | `power3.out (GSAP)` |
| Image parallax | yPercent 0→15 | scrub: true | `none (GSAP)` |

```css
/* Reduced motion — always include */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

---

## 7. Border & Shadow System

```css
:root {
  /* Border radius */
  --radius-xs:   2px;    /* Tags, badges, tiny pills */
  --radius-sm:   4px;    /* Input fields, small buttons */
  --radius-md:   8px;    /* Cards, panels */
  --radius-lg:   12px;   /* Modals, drawers */
  --radius-full: 9999px; /* Circular elements, pill buttons */

  /* Border widths */
  --border-thin:   0.5px;   /* Dividers, card outlines */
  --border-base:   1px;     /* Input borders */
  --border-thick:  1.5px;   /* Active/focus borders */

  /* Border colors */
  --border-default:  var(--atm-sand);
  --border-subtle:   rgba(28, 28, 26, 0.08);
  --border-strong:   var(--atm-charcoal);
}
```

### Shadow Scale

```css
:root {
  /* ATM WEAR uses NO drop shadows on components */
  /* Depth is communicated through color layering (bone on cream on linen) */
  /* The only shadow used is on the mobile nav overlay */
  --shadow-nav:    0 4px 24px rgba(28, 28, 26, 0.06);
  --shadow-modal:  0 16px 48px rgba(28, 28, 26, 0.12);
  
  /* Focus ring — accessibility */
  --focus-ring:    0 0 0 2px var(--atm-cream), 0 0 0 4px var(--atm-caramel);
}
```

> **Rule:** Components do NOT use box-shadows for depth. Use background color layering instead. `--atm-bone` on `--atm-cream` creates natural depth without shadows.

---

## 8. Component Specifications

### 8.1 Buttons

```css
/* PRIMARY BUTTON */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4) var(--space-8);
  background: var(--atm-charcoal);
  color: var(--atm-cream);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid var(--atm-charcoal);
  border-radius: 0;           /* ATM WEAR buttons are SQUARE — no radius */
  cursor: pointer;
  transition:
    background var(--dur-base) var(--ease-out-expo),
    color var(--dur-base) var(--ease-out-expo),
    transform var(--dur-fast);
}
.btn-primary:hover {
  background: var(--atm-caramel);
  border-color: var(--atm-caramel);
  color: var(--atm-white);
  transform: translateY(-1px);
}
.btn-primary:active { transform: translateY(0); }
.btn-primary:focus-visible { outline: none; box-shadow: var(--focus-ring); }

/* GHOST / OUTLINE BUTTON */
.btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--space-4) - 1px) var(--space-8);
  background: transparent;
  color: var(--atm-charcoal);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid var(--atm-charcoal);
  border-radius: 0;
  cursor: pointer;
  transition:
    background var(--dur-base) var(--ease-out-expo),
    color var(--dur-base) var(--ease-out-expo);
}
.btn-ghost:hover {
  background: var(--atm-charcoal);
  color: var(--atm-cream);
}

/* GHOST LIGHT (on dark backgrounds) */
.btn-ghost-light {
  border-color: rgba(247, 244, 239, 0.5);
  color: var(--atm-cream);
}
.btn-ghost-light:hover {
  background: var(--atm-cream);
  color: var(--atm-charcoal);
  border-color: var(--atm-cream);
}

/* FULL WIDTH MODIFIER */
.btn-full { width: 100%; }

/* SMALL MODIFIER */
.btn-sm { padding: var(--space-2) var(--space-5); font-size: var(--text-xs); }
```

**Button Rules:**
- All ATM WEAR buttons have `border-radius: 0` — squared corners only
- Primary = dark fill → caramel on hover
- Ghost = outlined → dark fill on hover
- Never mix font families in button text
- Always include a visible `:focus-visible` state

---

### 8.2 Product Card

```css
.product-card {
  position: relative;
  background: transparent;
}

.product-card-media {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  background: var(--atm-bone);
}

/* Primary image */
.product-card-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    transform var(--dur-slow) var(--ease-out-expo),
    opacity var(--dur-base) var(--ease-out-expo);
}

.product-card-img--hover { opacity: 0; }

/* Hover: swap image + subtle zoom */
.product-card:hover .product-card-img--primary {
  opacity: 0;
  transform: scale(1.04);
}
.product-card:hover .product-card-img--hover {
  opacity: 1;
  transform: scale(1.04);
}

/* Tag badge */
.product-card-tag {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  padding: var(--space-1) var(--space-3);
  background: var(--atm-charcoal);
  color: var(--atm-cream);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

/* Wishlist button */
.product-card-wishlist {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  width: 32px;
  height: 32px;
  background: var(--atm-white);
  border: none;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--dur-base);
  cursor: pointer;
}
.product-card:hover .product-card-wishlist { opacity: 1; }
.product-card-wishlist.active svg { fill: var(--atm-caramel); stroke: var(--atm-caramel); }

/* Info section */
.product-card-info {
  padding: var(--space-3) 0 var(--space-2);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.product-card-name {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 400;
  color: var(--atm-charcoal);
}

.product-card-price {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--atm-charcoal);
}

/* Color swatches */
.color-swatch {
  width: 14px;
  height: 14px;
  border-radius: var(--radius-full);
  border: 1.5px solid var(--atm-white);
  outline: 1px solid var(--atm-sand);
  cursor: pointer;
  transition: outline-color var(--dur-fast);
}
.color-swatch.active,
.color-swatch:hover { outline-color: var(--atm-charcoal); }

/* Quick add to cart — slides up on hover */
.product-card-atc {
  width: 100%;
  padding: var(--space-3);
  background: var(--atm-charcoal);
  color: var(--atm-cream);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transform: translateY(6px);
  opacity: 0;
  transition:
    transform var(--dur-base) var(--ease-out-expo),
    opacity var(--dur-fast),
    background var(--dur-fast);
}
.product-card:hover .product-card-atc {
  transform: translateY(0);
  opacity: 1;
}
.product-card-atc:hover {
  background: var(--atm-caramel);
}
```

---

### 8.3 Navigation

```css
#nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  z-index: 100;
  transition:
    background var(--dur-slow) var(--ease-out-expo),
    border-color var(--dur-slow);
  border-bottom: 0.5px solid transparent;
}

/* Scrolled state */
#nav.scrolled {
  background: rgba(247, 244, 239, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom-color: var(--atm-sand);
  box-shadow: var(--shadow-nav);
}

.nav-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  height: 100%;
  padding-inline: var(--grid-gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.nav-logo {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 400;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--atm-charcoal);
}

/* Nav links */
.nav-links {
  display: flex;
  gap: var(--space-8);
  list-style: none;
}
.nav-links a {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--atm-charcoal);
  position: relative;
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 0.5px;
  background: var(--atm-charcoal);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform var(--dur-base) var(--ease-out-expo);
}
.nav-links a:hover::after,
.nav-links a.active::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* Action icons */
.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}
.nav-actions button,
.nav-actions a {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--atm-charcoal);
  transition: color var(--dur-fast);
  position: relative;
}
.nav-actions button:hover,
.nav-actions a:hover { color: var(--atm-caramel); }
```

---

### 8.4 Form Elements

```css
/* Base input */
.input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: var(--atm-bone);
  color: var(--atm-charcoal);
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 300;
  border: 1px solid var(--atm-sand);
  border-radius: 0;   /* Square, always */
  outline: none;
  transition: border-color var(--dur-fast);
}
.input::placeholder { color: var(--atm-ghost); }
.input:hover  { border-color: var(--atm-muted); }
.input:focus  { border-color: var(--atm-charcoal); }

/* Size selector buttons */
.size-btn {
  padding: var(--space-2) var(--space-4);
  background: transparent;
  color: var(--atm-charcoal);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  border: 0.5px solid var(--atm-sand);
  border-radius: 0;
  cursor: pointer;
  transition:
    background var(--dur-fast),
    border-color var(--dur-fast);
}
.size-btn:hover { border-color: var(--atm-charcoal); }
.size-btn.active {
  background: var(--atm-charcoal);
  color: var(--atm-cream);
  border-color: var(--atm-charcoal);
}
.size-btn.sold-out {
  color: var(--atm-ghost);
  text-decoration: line-through;
  cursor: not-allowed;
}

/* Select / Dropdown */
.select {
  appearance: none;
  padding: var(--space-3) var(--space-10) var(--space-3) var(--space-4);
  background: var(--atm-bone);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%231C1C1A' stroke-width='1.5'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-3) center;
  border: 1px solid var(--atm-sand);
  border-radius: 0;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--atm-charcoal);
  cursor: pointer;
}
```

---

### 8.5 Badges & Tags

```css
/* Generic tag */
.tag {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: var(--radius-xs);
}

/* Dark tag — "New", "Bestseller" on product cards */
.tag-dark {
  background: var(--atm-charcoal);
  color: var(--atm-cream);
}

/* Accent tag — "Sale", special callouts */
.tag-accent {
  background: var(--atm-caramel-light);
  color: var(--atm-caramel-dark);
}

/* Outlined tag */
.tag-outline {
  background: transparent;
  border: 0.5px solid var(--atm-sand);
  color: var(--atm-muted);
}

/* Cart count badge */
.cart-badge {
  position: absolute;
  top: -5px;
  right: -6px;
  width: 16px;
  height: 16px;
  background: var(--atm-charcoal);
  color: var(--atm-cream);
  font-family: var(--font-mono);
  font-size: 0.55rem;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

### 8.6 Dividers & Section Labels

```css
/* Horizontal rule */
.divider {
  border: none;
  border-top: 0.5px solid var(--atm-sand);
}

/* Section eyebrow label — sits above headings */
.section-label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--atm-muted);
  margin-bottom: var(--space-4);
}

/* Section heading + label combo */
.section-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: var(--space-8);
}

/* Arrow link — "View All →" */
.link-arrow {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--atm-charcoal);
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  transition: gap var(--dur-base) var(--ease-out-expo);
}
.link-arrow:hover { gap: var(--space-4); }
```

---

### 8.7 Accordion / Details

```css
.accordion {
  border-top: 0.5px solid var(--atm-sand);
}
.accordion:last-child {
  border-bottom: 0.5px solid var(--atm-sand);
}

.accordion summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) 0;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 400;
  letter-spacing: 0.04em;
  color: var(--atm-charcoal);
  cursor: pointer;
  list-style: none;
  user-select: none;
  transition: color var(--dur-fast);
}
.accordion summary:hover { color: var(--atm-caramel); }
.accordion summary::after {
  content: '+';
  font-family: var(--font-mono);
  font-size: 1.25rem;
  font-weight: 300;
  color: var(--atm-muted);
  transition: transform var(--dur-base) var(--ease-out-expo);
}
.accordion[open] summary::after {
  content: '−';
}

.accordion-body {
  padding-bottom: var(--space-4);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 300;
  line-height: 1.7;
  color: var(--atm-slate);
}
```

---

## 9. Imagery Guidelines

### Ratios

| Context | Aspect Ratio |
|---------|-------------|
| Product card | 3:4 portrait |
| Hero | 16:9 or full-viewport |
| Editorial / lookbook | 2:3 or 4:5 |
| Cart thumbnail | 1:1 square |
| Category banner | 21:9 ultrawide |

### Image Treatment Rules

```css
/* All images use object-fit cover */
img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Hero image overlay — always over hero images */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(28, 28, 26, 0.55) 0%,
    rgba(28, 28, 26, 0.1) 40%,
    transparent 70%
  );
}

/* Editorial image hover — always include on clickable images */
.img-hover-zoom {
  overflow: hidden;
}
.img-hover-zoom img {
  transition: transform var(--dur-slow) var(--ease-out-expo);
}
.img-hover-zoom:hover img {
  transform: scale(1.04);
}
```

### Placeholder / Loading State

```css
.img-skeleton {
  background: var(--atm-bone);
  position: relative;
  overflow: hidden;
}
.img-skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255,255,255,0.4) 50%,
    transparent 100%
  );
  animation: shimmer 1.5s ease-in-out infinite;
}
@keyframes shimmer {
  from { transform: translateX(-100%); }
  to   { transform: translateX(100%); }
}
```

---

## 10. Scrolling Ticker

```css
.ticker-band {
  background: var(--atm-charcoal);
  color: var(--atm-cream);
  overflow: hidden;
  padding: var(--space-3) 0;
}

.ticker-track {
  display: flex;
  gap: var(--space-8);
  white-space: nowrap;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  animation: ticker 22s linear infinite;
}
.ticker-track span { opacity: 0.7; }
.ticker-track span[aria-hidden] { opacity: 0.3; }

@keyframes ticker {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

---

## 11. Custom Cursor (Desktop)

```css
@media (hover: hover) {
  * { cursor: none !important; }

  #cursor {
    position: fixed;
    z-index: 9999;
    pointer-events: none;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--atm-charcoal);
    transform: translate(-50%, -50%);
    transition:
      width 0.25s var(--ease-out-expo),
      height 0.25s var(--ease-out-expo),
      background 0.25s;
  }

  #cursor-follower {
    position: fixed;
    z-index: 9998;
    pointer-events: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 0.5px solid var(--atm-charcoal);
    transform: translate(-50%, -50%);
    opacity: 0.4;
    transition: width 0.25s, height 0.25s;
  }

  /* Hover state */
  #cursor.is-hovering {
    width: 44px;
    height: 44px;
    background: var(--atm-caramel);
    mix-blend-mode: multiply;
  }

  /* Text cursor state */
  #cursor.is-text {
    width: 2px;
    height: 22px;
    border-radius: 1px;
    background: var(--atm-charcoal);
  }
}
```

---

## 12. Global CSS Reset

Paste this at the top of `css/global.css` before any tokens:

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  background-color: var(--atm-cream);
  color: var(--atm-slate);
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 300;
  line-height: 1.6;
  overflow-x: hidden;
  min-height: 100vh;
}

img, video, svg { display: block; max-width: 100%; }
img { height: auto; }

a {
  color: inherit;
  text-decoration: none;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
  color: inherit;
}

ul, ol { list-style: none; }

input, textarea, select {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 400;
  line-height: 1.1;
  color: var(--atm-charcoal);
}

p { max-width: 65ch; }

:focus-visible {
  outline: 2px solid var(--atm-caramel);
  outline-offset: 2px;
}
```

---

## 13. Footer

```css
.footer {
  background: var(--atm-charcoal);
  color: var(--atm-cream);
  padding: var(--space-16) 0 var(--space-8);
}

.footer-logo {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.35em;
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.footer-tagline {
  font-family: var(--font-display);
  font-style: italic;
  font-size: var(--text-xl);
  color: var(--atm-caramel-light);
  opacity: 0.6;
}

.footer-col-title {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--atm-ghost);
  margin-bottom: var(--space-4);
}

.footer-col a {
  display: block;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: rgba(247, 244, 239, 0.55);
  margin-bottom: var(--space-3);
  transition: color var(--dur-fast);
}
.footer-col a:hover { color: var(--atm-cream); }

.footer-bottom {
  border-top: 0.5px solid rgba(247, 244, 239, 0.1);
  padding-top: var(--space-6);
  margin-top: var(--space-12);
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
  color: var(--atm-ghost);
}
```

---

## 14. Responsive Breakpoints

```css
/* Mobile-first. Write base styles for mobile, add complexity upward. */

:root {
  --bp-sm:  480px;
  --bp-md:  768px;
  --bp-lg:  1024px;
  --bp-xl:  1280px;
  --bp-2xl: 1440px;
}

/* Usage */
@media (min-width: 768px)  { /* tablet and above  */ }
@media (min-width: 1024px) { /* desktop and above */ }
@media (min-width: 1280px) { /* large desktop     */ }
```

### Key Responsive Rules

```css
/* Product grid: 2 col mobile → 3 col tablet → 4 col desktop */
.product-grid {
  grid-template-columns: repeat(2, 1fr);  /* mobile default */
}
@media (min-width: 768px) {
  .product-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 1024px) {
  .product-grid { grid-template-columns: repeat(4, 1fr); }
}

/* PDP: stacked mobile → side-by-side desktop */
.grid-pdp {
  grid-template-columns: 1fr;             /* mobile default */
}
@media (min-width: 1024px) {
  .grid-pdp { grid-template-columns: 60fr 40fr; }
}

/* Nav: hide links mobile → show desktop */
.nav-links { display: none; }
@media (min-width: 768px) { .nav-links { display: flex; } }
```

---

## 15. Page Transition Curtain

```css
#page-curtain {
  position: fixed;
  inset: 0;
  z-index: 9000;
  background: var(--atm-charcoal);
  transform-origin: top;
  pointer-events: none;
  will-change: transform;
}
```

---

## 16. Trust & Feature Signals

Repeating strip for shipping/returns/security — from reference image:

```css
.trust-strip {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-8);
  padding: var(--space-6) var(--grid-gutter);
  border-top: 0.5px solid var(--atm-sand);
  border-bottom: 0.5px solid var(--atm-sand);
}

.trust-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--atm-muted);
}

.trust-item svg {
  width: 18px;
  height: 18px;
  stroke: var(--atm-caramel);
  flex-shrink: 0;
}

.trust-item strong {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--atm-charcoal);
}
```

---

## 17. Cart Drawer Styles

```css
.cart-overlay {
  position: fixed;
  inset: 0;
  background: var(--atm-overlay);
  z-index: 200;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--dur-slow);
}
.cart-overlay.open {
  opacity: 1;
  pointer-events: all;
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(420px, 100vw);
  background: var(--atm-cream);
  z-index: 201;
  display: flex;
  flex-direction: column;
  border-left: 0.5px solid var(--atm-sand);
  transform: translateX(100%);  /* GSAP handles animation */
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-6);
  border-bottom: 0.5px solid var(--atm-sand);
}

.cart-title {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--atm-charcoal);
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-4) var(--space-6);
}

.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: var(--space-4);
  padding: var(--space-4) 0;
  border-bottom: 0.5px solid var(--atm-bone);
}

.cart-item-img {
  aspect-ratio: 3/4;
  overflow: hidden;
  background: var(--atm-bone);
}

.cart-item-name {
  font-size: var(--text-sm);
  color: var(--atm-charcoal);
  margin-bottom: var(--space-1);
}

.cart-item-meta {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--atm-muted);
  letter-spacing: 0.06em;
}

.cart-item-price {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--atm-charcoal);
  margin-top: var(--space-2);
}

.cart-footer {
  padding: var(--space-6);
  border-top: 0.5px solid var(--atm-sand);
  background: var(--atm-cream);
}

.cart-subtotal {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-4);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  letter-spacing: 0.06em;
}

.cart-note {
  margin-top: var(--space-3);
  font-size: var(--text-xs);
  color: var(--atm-muted);
  text-align: center;
  font-family: var(--font-mono);
  letter-spacing: 0.06em;
}
```

---

## 18. GSAP Animation Cheat Sheet

Quick reference for your agent. All GSAP animations should use these presets consistently.

```javascript
// ─── STANDARD ENTRANCE (runs once on DOMContentLoaded) ───────────
gsap.from(element, {
  y: 30,
  opacity: 0,
  duration: 0.9,
  ease: 'power3.out',
});

// ─── STAGGER CHILDREN ────────────────────────────────────────────
gsap.from('.product-card', {
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.08,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.product-grid',
    start: 'top 82%',
  }
});

// ─── HERO TIMELINE ───────────────────────────────────────────────
const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
heroTl
  .from('#hero-img',     { scale: 1.06, duration: 1.6 })
  .from('#hero-eyebrow', { y: 16, opacity: 0, duration: 0.5 }, '-=0.9')
  .from('.hero-headline .line', {
    y: '110%',
    opacity: 0,
    duration: 0.85,
    stagger: 0.1,
    ease: 'power3.out'
  }, '-=0.5')
  .from('#hero-cta',     { y: 16, opacity: 0, duration: 0.5 }, '-=0.3');

// ─── PARALLAX ────────────────────────────────────────────────────
gsap.to('#hero-img', {
  yPercent: 18,
  ease: 'none',
  scrollTrigger: { trigger: '#hero', scrub: true }
});

// ─── SCALE REVEAL (editorial images) ─────────────────────────────
gsap.from('.story-img', {
  scale: 0.95,
  opacity: 0,
  duration: 1.1,
  ease: 'power4.out',
  scrollTrigger: { trigger: '.story-img', start: 'top 78%' }
});

// ─── TEXT REVEAL (manifesto) ──────────────────────────────────────
gsap.from('.manifesto-text', {
  y: 40,
  opacity: 0,
  duration: 1.2,
  ease: 'power4.out',
  scrollTrigger: { trigger: '.manifesto', start: 'top 65%' }
});

// ─── WORD-BY-WORD SCRUB ──────────────────────────────────────────
gsap.from('.manifesto-word', {
  opacity: 0.12,
  duration: 0.3,
  stagger: 0.04,
  scrollTrigger: {
    trigger: '.manifesto-body',
    start: 'top 80%',
    end: 'bottom 25%',
    scrub: 0.5
  }
});
```

---

## 19. Quick Reference Card (For Your Agent)

| Token | Value | When to use |
|-------|-------|-------------|
| `--atm-cream` | `#F7F4EF` | Page background ONLY |
| `--atm-charcoal` | `#1C1C1A` | All headings, primary buttons |
| `--atm-caramel` | `#C8956B` | Hover states, accent text, price highlights |
| `--font-display` | Playfair Display | H1 only, section heroes |
| `--font-body` | DM Sans | Everything UI |
| `--font-mono` | DM Mono | Prices, labels, nav logo, tags |
| `--text-hero` | clamp(3.25rem, 8vw, 7rem) | Hero headline |
| `--space-8` | 2rem | Standard section gap |
| `--space-24` | 6rem | Section padding (desktop) |
| `--dur-base` | 300ms | All CSS hover transitions |
| `--ease-out-expo` | cubic-bezier(0.16, 1, 0.3, 1) | Entrance animations |
| `border-radius` | **ZERO** on buttons/inputs | ATM WEAR is square-edged |

---

*ATM WEAR Design System · v1.0 · Generated for coding agent use*
*Update `--atm-caramel` accent value first if brand color changes — all other caramel tokens derive from it.*
