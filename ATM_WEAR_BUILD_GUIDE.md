# ATM WEAR — Full Build Implementation Guide
### For Coding Agent · Static Frontend · No Backend Required

---

## 0. BEFORE YOU WRITE ANY CODE — SkillMD Setup (Required)

This project uses **SkillMD** (getskillmd.com) to pull structured skill files from documentation sites directly into your agent context. This is non-negotiable — it's part of the submission process.

### Step 1 — Generate your skill files

Go to **https://getskillmd.com** and generate a skill for each of these URLs. Screenshot every generation step (the paste, the generated output, the copy action). These screenshots are your process evidence.

| URL to paste | Mode to select | What you'll use it for |
|---|---|---|
| `gsap.com/docs` | Library/SDK | All scroll animations, timeline orchestration |
| `gsap.com/docs/v3/Plugins/ScrollTrigger` | Library/SDK | Scroll-triggered reveals, parallax |
| `tailwindcss.com` | Design system | All utility classes |
| `fonts.google.com` | Generic | Font loading reference |
| A Dribbble minimalist fashion shot URL | Design system | Extract ATM Wear color tokens, type vibe |

### Step 2 — Drop skills into your agent

Save each `.skill.md` file into your project at:
```
.claude/skills/gsap/SKILL.md
.claude/skills/scrolltrigger/SKILL.md
.claude/skills/tailwind/SKILL.md
```

Or use the CLI shortcut:
```bash
npx @getskillmd/cli init gsap .
npx @getskillmd/cli init tailwindcss .
```

Screenshot the terminal output. Your agent now reads these automatically as context on every prompt.

### Step 3 — Screenshot your prompts throughout the build

Every time you prompt your agent and get a major output, screenshot:
- The prompt you wrote
- The code produced
- The browser render

This is your submission evidence. Keep a running `PROCESS.md` log.

---

## 1. Project Overview

**Brand:** ATM Wear  
**Concept:** Genderless Gen Z minimalist fashion. No noise. Just form.  
**Stack:** Single HTML file per page (no framework, no build step) → pure HTML + CSS + vanilla JS + GSAP  
**Data:** All product/content data lives in a `data.js` file in your codebase  
**Backend:** None. Static only. Cart state in `localStorage`. Wishlist in `localStorage`.

### File Structure

```
ATM Wears/
├── index.html              ← Homepage
├── shop.html               ← Shop / Collection grid
├── product.html            ← Product Detail Page (template)
├── lookbook.html           ← Lookbook / Editorial
├── about.html              ← Manifesto + Brand story
├── cart.html               ← Cart + Checkout (static)
├── account.html            ← Account / Profile (static UI)
├── search.html             ← Search results
├── data/
│   ├── products.js         ← All product data
│   ├── lookbook.js         ← Lookbook entries
│   └── config.js           ← Site-wide config (brand name, nav links)
├── assets/
│   ├── images/             ← All product/editorial images
│   └── fonts/              ← Local font files if needed
├── css/
│   └── global.css          ← Design tokens + resets + shared styles
├── js/
│   ├── cursor.js           ← Custom cursor follower
│   ├── cart.js             ← Cart state management
│   ├── nav.js              ← Navigation scroll behavior
│   └── animations.js       ← Global GSAP setup
└── PROCESS.md              ← Your build log (required for submission)
```

---

## 2. Design Tokens (Non-Negotiable — Apply Globally)

All colours, fonts, and spacing must be defined as CSS custom properties in `css/global.css`. Never hardcode values inline.

```css
:root {
  /* Palette */
  --void-white:    #F5F4F0;   /* Warm off-white — page background */
  --void-bone:     #E8E5DC;   /* Section dividers, card backgrounds */
  --void-ash:      #C4C0B8;   /* Borders, placeholder text */
  --void-charcoal: #1A1A18;   /* Primary text, nav background */
  --void-ink:      #0D0D0B;   /* Pure near-black for headings */
  --void-accent:   #C8B89A;   /* Warm sand — CTAs, hover states */
  --void-ghost:    rgba(26,26,24,0.04); /* Subtle card hover */

  /* Typography */
  --font-display:  'Playfair Display', Georgia, serif;  /* Hero headings */
  --font-body:     'DM Sans', system-ui, sans-serif;    /* Body, UI */
  --font-mono:     'DM Mono', monospace;               /* Labels, prices */

  /* Type scale */
  --text-xs:    0.75rem;
  --text-sm:    0.875rem;
  --text-base:  1rem;
  --text-lg:    1.125rem;
  --text-xl:    1.375rem;
  --text-2xl:   1.75rem;
  --text-3xl:   2.5rem;
  --text-4xl:   3.5rem;
  --text-hero:  clamp(3.5rem, 9vw, 8rem);

  /* Spacing */
  --space-1: 0.25rem;  --space-2: 0.5rem;   --space-3: 0.75rem;
  --space-4: 1rem;     --space-6: 1.5rem;   --space-8: 2rem;
  --space-12: 3rem;    --space-16: 4rem;    --space-24: 6rem;
  --space-32: 8rem;

  /* Motion */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast: 200ms;
  --duration-base: 400ms;
  --duration-slow: 800ms;

  /* Layout */
  --max-width: 1440px;
  --grid-gutter: clamp(1rem, 4vw, 2.5rem);
  --nav-height: 64px;
}
```

### Font Loading (in `<head>` of every HTML file)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet">
```

### Global CSS Reset

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
body {
  background: var(--void-white);
  color: var(--void-charcoal);
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.6;
  overflow-x: hidden;
}
img { display: block; width: 100%; height: 100%; object-fit: cover; }
a { color: inherit; text-decoration: none; }
button { cursor: pointer; border: none; background: none; font-family: inherit; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

---

## 3. CDN Imports (Add to every HTML file `<head>`)

```html
<!-- GSAP core + ScrollTrigger (from SkillMD GSAP skill) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js"></script>

<!-- Lenis smooth scroll (for buttery scroll feel) -->
<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
```

### Global GSAP Bootstrap (in `js/animations.js`, load on every page)

```javascript
// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Lenis smooth scroll — integrate with GSAP ticker
const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
lenis.on('scroll', ScrollTrigger.update);

// Expose globally
window.lenis = lenis;
```

---

## 4. Shared Components

These components are injected via JS into every page. Build once, use everywhere.

### 4.1 Custom Cursor (`js/cursor.js`)

```javascript
// Inject cursor elements
document.body.insertAdjacentHTML('afterbegin', `
  <div id="cursor" aria-hidden="true"></div>
  <div id="cursor-follower" aria-hidden="true"></div>
`);

const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1 });
});

gsap.ticker.add(() => {
  followerX += (mouseX - followerX) * 0.08;
  followerY += (mouseY - followerY) * 0.08;
  gsap.set(follower, { x: followerX, y: followerY });
});

// Hover states — add to links and buttons
document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});
```

Cursor CSS (in `global.css`):

```css
@media (hover: hover) {
  * { cursor: none !important; }

  #cursor {
    position: fixed; z-index: 9999; pointer-events: none;
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--void-charcoal);
    transform: translate(-50%, -50%);
    transition: width 0.2s, height 0.2s, background 0.2s;
  }

  #cursor-follower {
    position: fixed; z-index: 9998; pointer-events: none;
    width: 36px; height: 36px; border-radius: 50%;
    border: 1px solid var(--void-charcoal);
    transform: translate(-50%, -50%);
    opacity: 0.5;
  }

  #cursor.hover { width: 48px; height: 48px; background: var(--void-accent); mix-blend-mode: multiply; }
}
```

### 4.2 Navigation (`js/nav.js`)

The nav starts transparent over the hero and becomes solid on scroll.

```html
<!-- Paste this at the top of every page's <body> -->
<nav id="nav">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">ATM WEAR</a>
    <ul class="nav-links">
      <li><a href="shop.html">Shop</a></li>
      <li><a href="lookbook.html">Lookbook</a></li>
      <li><a href="about.html">Manifesto</a></li>
    </ul>
    <div class="nav-actions">
      <button id="search-trigger" aria-label="Search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      </button>
      <a href="account.html" aria-label="Account">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
      </a>
      <button id="cart-trigger" aria-label="Cart">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        <span id="cart-count" class="cart-badge">0</span>
      </button>
    </div>
  </div>
</nav>
```

Nav CSS:

```css
#nav {
  position: fixed; top: 0; left: 0; right: 0;
  height: var(--nav-height); z-index: 100;
  transition: background var(--duration-base) var(--ease-out-expo),
              backdrop-filter var(--duration-base);
}
#nav.scrolled {
  background: rgba(245, 244, 240, 0.9);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--void-bone);
}
.nav-inner {
  max-width: var(--max-width); margin: 0 auto;
  height: 100%; padding: 0 var(--grid-gutter);
  display: flex; align-items: center; justify-content: space-between;
}
.nav-logo {
  font-family: var(--font-mono); font-size: var(--text-sm);
  letter-spacing: 0.3em; font-weight: 400; text-transform: uppercase;
}
.nav-links { display: flex; gap: var(--space-8); list-style: none; }
.nav-links a {
  font-size: var(--text-sm); letter-spacing: 0.08em; text-transform: uppercase;
  position: relative;
}
.nav-links a::after {
  content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
  height: 1px; background: currentColor;
  transform: scaleX(0); transform-origin: right;
  transition: transform var(--duration-base) var(--ease-out-expo);
}
.nav-links a:hover::after { transform: scaleX(1); transform-origin: left; }
.nav-actions { display: flex; align-items: center; gap: var(--space-4); }
.cart-badge {
  position: absolute; top: -6px; right: -8px;
  background: var(--void-charcoal); color: var(--void-white);
  font-family: var(--font-mono); font-size: 0.6rem;
  width: 16px; height: 16px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
```

Nav JS (in `js/nav.js`):

```javascript
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });
```

### 4.3 Cart Drawer (`js/cart.js`)

```html
<!-- Cart Drawer — inject via JS or paste before </body> on every page -->
<div id="cart-overlay" class="cart-overlay" aria-hidden="true"></div>
<aside id="cart-drawer" class="cart-drawer" aria-label="Shopping cart">
  <div class="cart-header">
    <span class="cart-title">Cart</span>
    <button id="cart-close" aria-label="Close cart">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>
  <div id="cart-items" class="cart-items">
    <!-- populated by cart.js -->
  </div>
  <div class="cart-footer">
    <div class="cart-subtotal">
      <span>Subtotal</span>
      <span id="cart-total">₦0</span>
    </div>
    <a href="cart.html" class="btn-primary btn-full">Checkout</a>
    <p class="cart-note">Free shipping on orders over ₦50,000</p>
  </div>
</aside>
```

Cart JS logic:

```javascript
// Cart state — persisted to localStorage
const CartState = {
  items: JSON.parse(localStorage.getItem('vw_cart') || '[]'),

  add(product) {
    const existing = this.items.find(i => i.id === product.id && i.size === product.size);
    if (existing) existing.qty++;
    else this.items.push({ ...product, qty: 1 });
    this.save(); this.render(); this.open();
  },

  remove(id, size) {
    this.items = this.items.filter(i => !(i.id === id && i.size === size));
    this.save(); this.render();
  },

  save() {
    localStorage.setItem('vw_cart', JSON.stringify(this.items));
    document.getElementById('cart-count').textContent = this.items.reduce((s,i) => s + i.qty, 0);
  },

  open() {
    document.getElementById('cart-drawer').classList.add('open');
    document.getElementById('cart-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    gsap.fromTo('#cart-drawer', { x: '100%' }, { x: '0%', duration: 0.5, ease: 'power3.out' });
  },

  close() {
    gsap.to('#cart-drawer', { x: '100%', duration: 0.4, ease: 'power3.in', onComplete: () => {
      document.getElementById('cart-drawer').classList.remove('open');
      document.getElementById('cart-overlay').classList.remove('open');
      document.body.style.overflow = '';
    }});
  },

  render() {
    const el = document.getElementById('cart-items');
    if (!this.items.length) {
      el.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
      document.getElementById('cart-total').textContent = '₦0';
      return;
    }
    el.innerHTML = this.items.map(i => `
      <div class="cart-item">
        <div class="cart-item-img"><img src="${i.image}" alt="${i.name}"></div>
        <div class="cart-item-info">
          <p class="cart-item-name">${i.name}</p>
          <p class="cart-item-meta">${i.size} · Qty ${i.qty}</p>
          <p class="cart-item-price">₦${(i.price * i.qty).toLocaleString()}</p>
        </div>
        <button class="cart-item-remove" onclick="CartState.remove('${i.id}','${i.size}')">×</button>
      </div>
    `).join('');
    const total = this.items.reduce((s,i) => s + i.price * i.qty, 0);
    document.getElementById('cart-total').textContent = `₦${total.toLocaleString()}`;
  }
};

// Wire up triggers
document.getElementById('cart-trigger').addEventListener('click', () => CartState.open());
document.getElementById('cart-close').addEventListener('click', () => CartState.close());
document.getElementById('cart-overlay').addEventListener('click', () => CartState.close());
CartState.save(); CartState.render();
window.CartState = CartState;
```

---

## 5. Data Layer (`data/products.js`)

```javascript
window.PRODUCTS = [
  {
    id: 'vw-001',
    name: 'Void Oversized Tee',
    category: 'tops',
    price: 28000,
    colors: ['#F5F4F0', '#1A1A18', '#C4C0B8'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'assets/images/tee-01-front.jpg',
      'assets/images/tee-01-back.jpg',
    ],
    tag: 'New',
    description: 'Structured oversized silhouette in 100% deadstock cotton jersey. Dropped shoulders, raw hem, unisex fit.',
    material: '100% deadstock cotton. Carbon-neutral production.',
    fit: 'Oversized unisex. Model is 180cm and wears size M.',
  },
  {
    id: 'vw-002',
    name: 'Form Wide Trouser',
    category: 'bottoms',
    price: 52000,
    colors: ['#1A1A18', '#E8E5DC'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['assets/images/trouser-01.jpg', 'assets/images/trouser-01-b.jpg'],
    tag: null,
    description: 'High-waisted wide-leg cut in Japanese wool-blend twill. Press-stud closure, side pockets.',
    material: '78% wool, 22% polyester. Deadstock fabric sourced from Osaka.',
    fit: 'High rise, wide leg. Model is 177cm and wears size S.',
  },
  {
    id: 'vw-003',
    name: 'Zero Jacket',
    category: 'outerwear',
    price: 95000,
    colors: ['#C4C0B8', '#1A1A18'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['assets/images/jacket-01.jpg'],
    tag: 'Bestseller',
    description: 'Sculptural single-button jacket. Minimal seaming, structured shoulder, unlined.',
    material: '100% recycled polyester gabardine.',
    fit: 'Slim through the shoulder, relaxed body. Size up for oversized look.',
  },
  {
    id: 'vw-004',
    name: 'Void Maxi Dress',
    category: 'dresses',
    price: 67000,
    colors: ['#F5F4F0', '#1A1A18'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['assets/images/dress-01.jpg'],
    tag: 'New',
    description: 'Floor-length fluid silhouette with bias cut. Adjustable tie at waist, deep side slits.',
    material: '100% TENCEL™ lyocell. Biodegradable.',
    fit: 'True to size. Model is 178cm and wears XS.',
  },
  {
    id: 'vw-005',
    name: 'Structure Blazer',
    category: 'outerwear',
    price: 78000,
    colors: ['#C8B89A', '#1A1A18'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['assets/images/blazer-01.jpg'],
    tag: null,
    description: 'Double-breasted blazer with sharp lapel and patch pockets. Unisex tailoring.',
    material: '65% wool, 35% viscose.',
    fit: 'Slim shoulder, relaxed body. Unisex sizing.',
  },
  {
    id: 'vw-006',
    name: 'Ghost Long Sleeve',
    category: 'tops',
    price: 34000,
    colors: ['#F5F4F0', '#E8E5DC'],
    sizes: ['XS', 'S', 'M', 'L'],
    images: ['assets/images/longsleeve-01.jpg'],
    tag: null,
    description: 'Featherweight long sleeve in silk-cotton blend. Relaxed through the body.',
    material: '60% silk, 40% organic cotton.',
    fit: 'Relaxed fit. Unisex.',
  },
];
```

---

## 6. Page-by-Page Build Instructions

---

### PAGE 1: `index.html` — Homepage

**Structure:**
```
[Nav]
[Hero — full viewport, video/image background, animated headline]
[Ticker — scrolling text band]
[Drops — 2-column editorial grid, latest arrivals]
[Brand Manifesto — large text reveal section]
[Lookbook Preview — 3 full-bleed editorial images]
[Sustainability Strip]
[Footer]
```

#### Hero Section

```html
<section class="hero" id="hero">
  <div class="hero-media">
    <!-- Use a high-contrast editorial image. Aspect: full viewport -->
    <img src="assets/images/hero-main.jpg" alt="ATM Wear hero" class="hero-img" id="hero-img">
    <div class="hero-overlay"></div>
  </div>
  <div class="hero-content">
    <p class="hero-eyebrow" id="hero-eyebrow">SS 2025 Collection</p>
    <h1 class="hero-headline" id="hero-headline">
      <span class="line">Nothing</span>
      <span class="line italic">extra.</span>
    </h1>
    <div class="hero-cta" id="hero-cta">
      <a href="shop.html" class="btn-primary">Shop Now</a>
      <a href="lookbook.html" class="btn-ghost">View Lookbook</a>
    </div>
  </div>
  <div class="hero-scroll-hint" id="hero-scroll">
    <span>Scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>
```

Hero GSAP animation:

```javascript
// Hero entrance — runs on DOMContentLoaded
const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

heroTl
  .from('#hero-img', { scale: 1.08, duration: 1.6 })
  .from('#hero-eyebrow', { y: 20, opacity: 0, duration: 0.6 }, '-=0.8')
  .from('.hero-headline .line', {
    y: '110%', opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out'
  }, '-=0.4')
  .from('#hero-cta', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
  .from('#hero-scroll', { opacity: 0, duration: 0.4 });

// Parallax on scroll
gsap.to('#hero-img', {
  yPercent: 20,
  ease: 'none',
  scrollTrigger: { trigger: '#hero', scrub: true }
});
```

Hero CSS:

```css
.hero {
  position: relative; height: 100svh; overflow: hidden;
  display: flex; align-items: flex-end;
  padding: 0 var(--grid-gutter) var(--space-16);
}
.hero-media { position: absolute; inset: 0; }
.hero-img { width: 100%; height: 100%; object-fit: cover; }
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(26,26,24,0.55) 0%, transparent 50%);
}
.hero-content { position: relative; z-index: 2; color: var(--void-white); }
.hero-eyebrow {
  font-family: var(--font-mono); font-size: var(--text-xs);
  letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: var(--space-4);
  opacity: 0.7;
}
.hero-headline {
  font-family: var(--font-display); font-size: var(--text-hero);
  font-weight: 400; line-height: 0.9; overflow: hidden;
  display: flex; flex-direction: column;
}
.hero-headline .line { display: block; }
.hero-headline .italic { font-style: italic; }
.hero-cta {
  display: flex; gap: var(--space-4); margin-top: var(--space-8);
  flex-wrap: wrap;
}
.hero-scroll-hint {
  position: absolute; bottom: var(--space-8); right: var(--grid-gutter);
  display: flex; flex-direction: column; align-items: center;
  gap: var(--space-2); color: var(--void-white); opacity: 0.5;
  font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: 0.2em;
}
.scroll-line {
  width: 1px; height: 60px; background: currentColor;
  animation: scrollLine 1.5s ease-in-out infinite;
  transform-origin: top;
}
@keyframes scrollLine {
  0% { transform: scaleY(0); opacity: 0; }
  50% { transform: scaleY(1); opacity: 1; }
  100% { transform: scaleY(1); opacity: 0; transform-origin: bottom; }
}
```

#### Ticker Band

```html
<div class="ticker-band">
  <div class="ticker-track">
    <span>Deadstock Fabrics</span><span aria-hidden="true">·</span>
    <span>Carbon Neutral</span><span aria-hidden="true">·</span>
    <span>Gender Neutral</span><span aria-hidden="true">·</span>
    <span>SS 2025 Now Live</span><span aria-hidden="true">·</span>
    <span>Free Returns</span><span aria-hidden="true">·</span>
    <!-- Duplicate for seamless loop -->
    <span>Deadstock Fabrics</span><span aria-hidden="true">·</span>
    <span>Carbon Neutral</span><span aria-hidden="true">·</span>
    <span>Gender Neutral</span><span aria-hidden="true">·</span>
    <span>SS 2025 Now Live</span><span aria-hidden="true">·</span>
    <span>Free Returns</span><span aria-hidden="true">·</span>
  </div>
</div>
```

Ticker CSS:

```css
.ticker-band {
  background: var(--void-charcoal); color: var(--void-white);
  overflow: hidden; padding: var(--space-3) 0;
  border-top: 1px solid rgba(255,255,255,0.1);
}
.ticker-track {
  display: flex; gap: var(--space-8); white-space: nowrap;
  font-family: var(--font-mono); font-size: var(--text-xs);
  letter-spacing: 0.15em; text-transform: uppercase;
  animation: ticker 20s linear infinite;
}
@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
```

#### Drops Section

```html
<section class="drops" id="drops">
  <div class="drops-header">
    <p class="section-label">New Arrivals</p>
    <h2 class="section-heading">Latest Drops</h2>
    <a href="shop.html" class="link-arrow">View All <span>→</span></a>
  </div>
  <div class="product-grid" id="drops-grid">
    <!-- Populated by JS from PRODUCTS array, first 4 items -->
  </div>
</section>
```

Product card HTML (generated by JS):

```html
<article class="product-card" data-product-id="vw-001">
  <a href="product.html?id=vw-001" class="product-card-link">
    <div class="product-card-media">
      <img src="..." alt="..." class="product-card-img product-card-img--primary" loading="lazy">
      <img src="..." alt="..." class="product-card-img product-card-img--hover" loading="lazy">
      <div class="product-card-tag">New</div>
      <button class="product-card-wishlist" aria-label="Save to wishlist">
        <svg><!-- heart icon --></svg>
      </button>
    </div>
    <div class="product-card-info">
      <h3 class="product-card-name">Void Oversized Tee</h3>
      <div class="product-card-bottom">
        <span class="product-card-price">₦28,000</span>
        <div class="product-card-colors">
          <!-- color swatches -->
        </div>
      </div>
    </div>
  </a>
  <button class="product-card-atc" data-id="vw-001">Add to Cart</button>
</article>
```

Product card CSS:

```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-6);
}
.product-card { position: relative; }
.product-card-media {
  position: relative; overflow: hidden; aspect-ratio: 3/4;
  background: var(--void-bone);
}
.product-card-img {
  position: absolute; inset: 0; object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-out-expo),
              opacity var(--duration-base);
}
.product-card-img--hover { opacity: 0; }
.product-card:hover .product-card-img--primary { opacity: 0; transform: scale(1.04); }
.product-card:hover .product-card-img--hover { opacity: 1; transform: scale(1.04); }
.product-card-tag {
  position: absolute; top: var(--space-3); left: var(--space-3);
  background: var(--void-charcoal); color: var(--void-white);
  font-family: var(--font-mono); font-size: var(--text-xs);
  letter-spacing: 0.15em; text-transform: uppercase;
  padding: var(--space-1) var(--space-3);
}
.product-card-info {
  padding: var(--space-3) 0;
  display: flex; flex-direction: column; gap: var(--space-2);
}
.product-card-name { font-size: var(--text-sm); font-weight: 400; }
.product-card-bottom { display: flex; align-items: center; justify-content: space-between; }
.product-card-price { font-family: var(--font-mono); font-size: var(--text-sm); }
.product-card-atc {
  width: 100%; padding: var(--space-3);
  background: var(--void-charcoal); color: var(--void-white);
  font-family: var(--font-mono); font-size: var(--text-xs);
  letter-spacing: 0.15em; text-transform: uppercase;
  margin-top: var(--space-2);
  transform: translateY(4px); opacity: 0;
  transition: transform var(--duration-base) var(--ease-out-expo),
              opacity var(--duration-fast),
              background var(--duration-fast);
}
.product-card:hover .product-card-atc { transform: translateY(0); opacity: 1; }
.product-card-atc:hover { background: var(--void-accent); color: var(--void-charcoal); }
```

Product card scroll animation:

```javascript
gsap.from('.product-card', {
  y: 60, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
  scrollTrigger: { trigger: '#drops-grid', start: 'top 80%' }
});
```

#### Manifesto Section

```html
<section class="manifesto" id="manifesto">
  <div class="manifesto-inner">
    <p class="manifesto-label">Our Ethos</p>
    <h2 class="manifesto-text" id="manifesto-text">
      Fashion doesn't need a gender.<br>
      It needs <em>intention.</em>
    </h2>
    <a href="about.html" class="btn-ghost btn-light">Read Manifesto</a>
  </div>
</section>
```

Manifesto animation:

```javascript
// Split text reveal
const manifestoEl = document.getElementById('manifesto-text');
gsap.from(manifestoEl, {
  y: 40, opacity: 0, duration: 1.2, ease: 'power4.out',
  scrollTrigger: { trigger: '#manifesto', start: 'top 65%' }
});
```

Manifesto CSS:

```css
.manifesto {
  background: var(--void-charcoal); color: var(--void-white);
  padding: var(--space-32) var(--grid-gutter);
  text-align: center;
}
.manifesto-label {
  font-family: var(--font-mono); font-size: var(--text-xs);
  letter-spacing: 0.3em; text-transform: uppercase; opacity: 0.5;
  margin-bottom: var(--space-8);
}
.manifesto-text {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 400; line-height: 1.2; max-width: 800px; margin: 0 auto var(--space-12);
}
.manifesto-text em { font-style: italic; color: var(--void-accent); }
```

---

### PAGE 2: `shop.html` — Collection Grid

**Structure:**
```
[Nav]
[Page Header — "Shop All" with count]
[Filter Bar — category, size, color filters]
[Product Grid — responsive, masonry feel]
[Load More button]
[Footer]
```

Filter bar JS logic:

```javascript
let activeFilters = { category: 'all', size: null };

function renderProducts(products) {
  const grid = document.getElementById('shop-grid');
  const filtered = products.filter(p => {
    if (activeFilters.category !== 'all' && p.category !== activeFilters.category) return false;
    if (activeFilters.size && !p.sizes.includes(activeFilters.size)) return false;
    return true;
  });
  grid.innerHTML = filtered.map(productCardHTML).join('');
  // Animate in new cards
  gsap.from('.product-card', { y: 30, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' });
}

document.querySelectorAll('[data-filter-cat]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-filter-cat]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilters.category = btn.dataset.filterCat;
    renderProducts(window.PRODUCTS);
  });
});
```

---

### PAGE 3: `product.html` — Product Detail Page

**Structure:**
```
[Nav]
[Product Layout — 60% image gallery / 40% product info]
[Image: sticky gallery with thumbnails]
[Info: name, price, color swatches, size selector, ATC, material story]
[Complete the Look — related products]
[Footer]
```

Key elements:

```html
<section class="pdp">
  <div class="pdp-gallery" id="pdp-gallery">
    <div class="pdp-main-img">
      <img id="pdp-img-main" src="" alt="">
    </div>
    <div class="pdp-thumbs" id="pdp-thumbs">
      <!-- thumbnail strip -->
    </div>
  </div>

  <div class="pdp-info" id="pdp-info">
    <p class="pdp-category" id="pdp-category"></p>
    <h1 class="pdp-name" id="pdp-name"></h1>
    <p class="pdp-price" id="pdp-price"></p>

    <!-- Color selector -->
    <div class="pdp-colors" id="pdp-colors">
      <p class="pdp-label">Colour</p>
      <div class="color-swatches"></div>
    </div>

    <!-- Size selector -->
    <div class="pdp-sizes" id="pdp-sizes">
      <div class="size-header">
        <p class="pdp-label">Size</p>
        <button class="size-guide-trigger">Size Guide</button>
      </div>
      <div class="size-buttons"></div>
    </div>

    <!-- ATC -->
    <button class="btn-primary btn-full btn-atc" id="pdp-atc">Add to Cart</button>
    <button class="btn-ghost btn-full btn-wishlist" id="pdp-wishlist">Save to Wishlist</button>

    <!-- Material story -->
    <details class="pdp-accordion">
      <summary>Materials & Sustainability</summary>
      <p id="pdp-material"></p>
    </details>
    <details class="pdp-accordion">
      <summary>Fit & Sizing</summary>
      <p id="pdp-fit"></p>
    </details>
    <details class="pdp-accordion">
      <summary>Shipping & Returns</summary>
      <p>Free standard shipping on orders over ₦50,000. Free returns within 30 days.</p>
    </details>
  </div>
</section>
```

PDP JS — read URL param, populate from data:

```javascript
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
const product = window.PRODUCTS.find(p => p.id === productId);

if (product) {
  document.getElementById('pdp-name').textContent = product.name;
  document.getElementById('pdp-price').textContent = `₦${product.price.toLocaleString()}`;
  document.getElementById('pdp-category').textContent = product.category;
  document.getElementById('pdp-img-main').src = product.images[0];
  document.getElementById('pdp-material').textContent = product.material;
  document.getElementById('pdp-fit').textContent = product.fit;

  // Size buttons
  const sizesEl = document.querySelector('.size-buttons');
  let selectedSize = null;
  sizesEl.innerHTML = product.sizes.map(s => `<button class="size-btn" data-size="${s}">${s}</button>`).join('');
  sizesEl.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sizesEl.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.dataset.size;
    });
  });

  // ATC
  document.getElementById('pdp-atc').addEventListener('click', () => {
    if (!selectedSize) { alert('Please select a size'); return; }
    CartState.add({ ...product, size: selectedSize });
  });
}

// Entrance animation
gsap.from('#pdp-gallery', { x: -40, opacity: 0, duration: 0.9, ease: 'power3.out' });
gsap.from('#pdp-info > *', { y: 20, opacity: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out', delay: 0.2 });
```

---

### PAGE 4: `lookbook.html` — Editorial

**Structure:**
```
[Nav]
[Lookbook Hero — full-bleed image + title]
[Story sections — alternating image/text editorial layouts]
[Product links embedded in stories]
[Footer]
```

Lookbook data:

```javascript
window.LOOKBOOK = [
  {
    id: 'lb-001',
    title: 'Absence',
    subtitle: 'When less becomes the loudest statement.',
    image: 'assets/images/editorial-01.jpg',
    products: ['vw-001', 'vw-002'],
  },
  {
    id: 'lb-002',
    title: 'Form',
    subtitle: 'The body as architecture.',
    image: 'assets/images/editorial-02.jpg',
    products: ['vw-003', 'vw-005'],
  },
];
```

Lookbook scroll reveal:

```javascript
document.querySelectorAll('.lookbook-story').forEach((story, i) => {
  gsap.from(story.querySelector('.story-img'), {
    scale: 0.94, opacity: 0, duration: 1.2, ease: 'power4.out',
    scrollTrigger: { trigger: story, start: 'top 75%' }
  });
  gsap.from(story.querySelector('.story-text'), {
    y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.2,
    scrollTrigger: { trigger: story, start: 'top 75%' }
  });
});
```

---

### PAGE 5: `about.html` — Manifesto

**Structure:**
```
[Nav]
[Full-bleed brand image with title overlay]
[Manifesto text — large type, slow scroll reveal word by word]
[Three pillars: Genderless / Sustainable / Minimal]
[Team/founder note]
[Footer]
```

Word-by-word text reveal:

```javascript
const manifestoLines = document.querySelectorAll('.manifesto-word');
gsap.from(manifestoLines, {
  opacity: 0.1, duration: 0.3, stagger: 0.04,
  scrollTrigger: {
    trigger: '.manifesto-body',
    start: 'top 80%', end: 'bottom 20%', scrub: 0.5
  }
});
```

To achieve this effect, split the manifesto paragraph into `<span class="manifesto-word">word</span>` elements via JS:

```javascript
const body = document.querySelector('.manifesto-body p');
body.innerHTML = body.textContent.split(' ').map(w => `<span class="manifesto-word">${w} </span>`).join('');
```

---

### PAGE 6: `cart.html` — Cart + Checkout

**Structure:**
```
[Nav]
[Two column: Cart items left / Order summary right]
[Checkout form: Name, Email, Address, Payment placeholder]
[Trust signals: Secure, Free returns, Sustainability note]
```

This page reads from `localStorage` and renders full cart. The checkout form is static UI — no submission logic needed for now.

---

### PAGE 7: `search.html` — Search

Instant search logic:

```javascript
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase();
  const results = window.PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
  renderSearchResults(results);
});
```

---

## 7. Shared Button Styles

```css
.btn-primary {
  display: inline-block;
  background: var(--void-charcoal); color: var(--void-white);
  font-family: var(--font-mono); font-size: var(--text-xs);
  letter-spacing: 0.2em; text-transform: uppercase;
  padding: var(--space-4) var(--space-8);
  transition: background var(--duration-fast), color var(--duration-fast), transform var(--duration-fast);
}
.btn-primary:hover { background: var(--void-accent); color: var(--void-charcoal); transform: translateY(-1px); }

.btn-ghost {
  display: inline-block;
  border: 1px solid currentColor;
  font-family: var(--font-mono); font-size: var(--text-xs);
  letter-spacing: 0.2em; text-transform: uppercase;
  padding: var(--space-4) var(--space-8);
  transition: background var(--duration-fast), color var(--duration-fast);
}
.btn-ghost:hover { background: currentColor; color: var(--void-white); }
.btn-ghost.btn-light { color: var(--void-white); }
.btn-ghost.btn-light:hover { background: var(--void-white); color: var(--void-charcoal); }

.btn-full { width: 100%; text-align: center; }

.link-arrow { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: 0.15em; }
.link-arrow span { display: inline-block; transition: transform var(--duration-fast); }
.link-arrow:hover span { transform: translateX(4px); }
```

---

## 8. Footer

```html
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <p class="footer-logo">ATM WEAR</p>
      <p class="footer-tagline">Nothing extra.</p>
    </div>
    <nav class="footer-nav">
      <div class="footer-col">
        <p class="footer-col-title">Shop</p>
        <a href="shop.html?cat=tops">Tops</a>
        <a href="shop.html?cat=bottoms">Bottoms</a>
        <a href="shop.html?cat=outerwear">Outerwear</a>
        <a href="shop.html?cat=dresses">Dresses</a>
      </div>
      <div class="footer-col">
        <p class="footer-col-title">Info</p>
        <a href="about.html">Manifesto</a>
        <a href="lookbook.html">Lookbook</a>
        <a href="#">Sustainability</a>
        <a href="#">Size Guide</a>
      </div>
      <div class="footer-col">
        <p class="footer-col-title">Help</p>
        <a href="#">Shipping & Returns</a>
        <a href="#">Contact</a>
        <a href="#">FAQ</a>
      </div>
    </nav>
    <div class="footer-bottom">
      <p>© 2025 ATM WEAR. All rights reserved.</p>
      <p>Built with intention.</p>
    </div>
  </div>
</footer>
```

---

## 9. Page Transition System

Add this to `js/animations.js` to create smooth page-to-page transitions:

```javascript
// Page exit curtain
document.body.insertAdjacentHTML('afterbegin', '<div id="page-curtain"></div>');

const curtain = document.getElementById('page-curtain');

// Animate in on page load
gsap.fromTo(curtain,
  { scaleY: 1 },
  { scaleY: 0, transformOrigin: 'top', duration: 0.7, ease: 'power3.inOut', delay: 0.1 }
);

// Animate out on link click
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http')) return;
  link.addEventListener('click', e => {
    e.preventDefault();
    gsap.fromTo(curtain,
      { scaleY: 0, transformOrigin: 'bottom' },
      { scaleY: 1, duration: 0.5, ease: 'power3.in',
        onComplete: () => window.location.href = href }
    );
  });
});
```

```css
#page-curtain {
  position: fixed; inset: 0; z-index: 9000;
  background: var(--void-charcoal);
  transform-origin: top;
  pointer-events: none;
}
```

---

## 10. Mobile Responsive Rules

Apply these breakpoints globally. ATM Wear is mobile-first.

```css
/* Mobile nav — hamburger */
@media (max-width: 768px) {
  .nav-links { display: none; }
  .nav-links.open {
    display: flex; flex-direction: column;
    position: fixed; inset: 0; top: var(--nav-height);
    background: var(--void-white); padding: var(--space-12) var(--grid-gutter);
    gap: var(--space-8); z-index: 99;
    font-size: var(--text-2xl);
  }
  .product-grid { grid-template-columns: repeat(2, 1fr); gap: var(--space-3); }
  .pdp { flex-direction: column; }
  .hero-headline { font-size: clamp(3rem, 12vw, 6rem); }
  .manifesto-text { font-size: clamp(1.75rem, 6vw, 3rem); }
}
```

---

## 11. Build Order & Submission Checklist

**Week timeline:**

- Day 1 — Set up file structure, generate all SkillMD skills, build `global.css` design tokens, nav, cursor, cart drawer, animations.js. Screenshot everything.
- Day 2 — Build `index.html` homepage with full hero animation, ticker, drops grid, manifesto section.
- Day 3 — Build `shop.html` with filter and animated grid.
- Day 4 — Build `product.html` with full PDP, size selector, add-to-cart.
- Day 5 — Build `lookbook.html` with scroll reveals.
- Day 6 — Build `about.html` + `cart.html` + mobile responsiveness.
- Day 7 — Polish animations, record final walkthrough, write `PROCESS.md`.

**Submission checklist:**

- [ ] Screenshots of SkillMD: URL pasted → skill generated → dropped into agent
- [ ] Screenshots of your prompts + agent outputs at each major build step
- [ ] Before/after screenshots showing iterations (e.g. "first attempt at hero animation → improved")
- [ ] Final site works in mobile viewport (375px)
- [ ] All pages load without console errors
- [ ] Cart persists across page refreshes (localStorage)
- [ ] Custom cursor visible on desktop
- [ ] Smooth scroll transitions between pages
- [ ] `PROCESS.md` documenting your full workflow

---

## 12. Prompts to Give Your Coding Agent

Use these exact prompts, one at a time, when talking to your agent. Reference the relevant SkillMD skill file in each prompt.

**Prompt 1 — Global Setup:**
> "Using the GSAP SKILL.md and Tailwind SKILL.md as context, set up the ATM Wear project structure. Create global.css with all design tokens from the implementation guide. Create js/animations.js with Lenis smooth scroll integrated with GSAP ticker. Create the custom cursor in js/cursor.js. Use exactly the CSS variables from the guide — void-white #F5F4F0, void-charcoal #1A1A18, void-accent #C8B89A. No Tailwind CDN — pure CSS."

**Prompt 2 — Homepage Hero:**
> "Build the hero section for index.html. Full-viewport height, editorial image background, warm overlay gradient, large Playfair Display serif headline with the words 'Nothing' and 'extra.' (italic) stacked. Use GSAP ScrollTrigger for a parallax image effect and a timeline entrance animation that staggers: image scale → eyebrow text → headline lines → CTA buttons. Reference the GSAP ScrollTrigger SKILL.md."

**Prompt 3 — Product Grid:**
> "Build the product card component using data from data/products.js. Each card: 3:4 aspect ratio image that swaps to a second image on hover with a smooth opacity transition, product name in DM Sans, price in DM Mono, quick-add-to-cart button that slides up on card hover. On scroll into view, cards should stagger-animate from y:60 opacity:0. Wire add-to-cart to the CartState.add() function."

**Prompt 4 — PDP:**
> "Build the product detail page (product.html). Read the product id from URL params, find it in window.PRODUCTS, and populate: image gallery with thumbnail strip, name/price/description, size selector buttons that highlight on click, color swatches, ATC button that calls CartState.add(). Add an accordion for Materials, Fit, and Shipping info using HTML details/summary elements. Animate the gallery in from the left and info section in from below on page load."

**Prompt 5 — Lookbook:**
> "Build lookbook.html. Alternating layout: odd stories → image left / text right. Even stories → text left / image right. Images should be full-height (min 80vh) on desktop, stacked on mobile. On scroll, each story's image should scale from 0.94 to 1 as it enters the viewport using GSAP ScrollTrigger. Add a horizontal pin section where 3 images scroll horizontally using GSAP ScrollTrigger pin + scrub."

**Prompt 6 — Page Transitions:**
> "Add a full-page transition curtain to every HTML page. On load: a charcoal-colored div covers the screen and then slides up (scaleY from 1 to 0, transform-origin top) using GSAP. On any internal link click: the curtain slides down (scaleY from 0 to 1, transform-origin bottom) then navigates. This must work across all pages — put the logic in js/animations.js."

---

*Built for the SkillMD Challenge — ATM Wear by [your name]. Process documented at PROCESS.md.*
