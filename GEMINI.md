# LOOKIQ Project Design & Architecture Rules

## 1. Zero-Emoji Policy
- **NEVER use raw emojis** (such as 💎, ⭐, 📦, 🔍, 🔥, ✨, 🍂, etc.) anywhere in the LOOKIQ codebase or user interface.
- Raw cartoon emojis degrade brand prestige and clash with LOOKIQ's high-end "Quiet Luxury" aesthetic.

## 2. Micro-Icon Container Architecture
- Whenever visual accents, highlights, or icons are needed, ALWAYS use **clean, bespoke SVG vector micro-icons** enclosed in refined UI/UX micro-containers.
- Standard Micro-Icon Container specifications:
  - Frosted background: `background: var(--bg-card);` or `rgba(255, 255, 255, 0.04);`
  - Circular shape: `width: 26px; height: 26px; border-radius: 50%;`
  - Subtle gold border: `border: 1px solid rgba(201, 151, 56, 0.25);`
  - Liquid gold vector icon: `color: var(--accent-gold);`
  - Smooth hover interactions: `transform: translateY(-2px); box-shadow: 0 4px 14px rgba(201, 151, 56, 0.15);`

## 3. Brand Aesthetic & Navigation Standards
- Maintain the quiet luxury palette: Noir (`#08080b`), Charcoal (`#141113`), Cashmere cream (`#faf8f5`), and Champagne Gold (`#c99738`).
- Maintain clean navigation across all dedicated `.html` pages (zero `#` anchors in main navigation menus).
- Preserve Amazon Associates compliance (FTC disclosures, `likeefashionh-20` tag, and `rel="nofollow sponsored"` on all affiliate links).

## 4. Mandatory Pinterest 2:3 Vertical Pin & Visual SEO Rules
- **Exact 2:3 Ratio:** Every future automated pin image MUST be 2:3 vertical aspect ratio (`1000 × 1500 px`), stored in `assets/pins/`.
- **Pinterest Guided Search Title:** Primary high-intent keyword in the first 35 characters (40-70 chars total, no emojis).
- **Search-Intent Description:** Problem solver + Amazon Prime verification + CTA + 4 to 6 niche hashtags (e.g., `#AmazonFashion #QuietLuxury #CapsuleWardrobe`).
- **Visual AI Alt Text:** Detailed descriptive alt text (silhouette, fabric, cut, color, styling) to maximize Pinterest Lens visual search discovery.
