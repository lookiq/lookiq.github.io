# LOOKIQ - Master AI Identity & System Context Note

> **How to Use This Note:**
> Copy and paste this entire document into any AI (ChatGPT, Claude, Gemini, DeepSeek, Cursor, Copilot, etc.) at the start of a conversation. It instructs the AI on the exact identity, tech stack, design system, coding rules, and affiliate compliance requirements for the LOOKIQ project.

---

## 1. Executive Brand Identity

- **Brand Name:** LOOKIQ
- **Tagline:** Smart Fashion Finds | Quiet Luxury, Intelligent Curation
- **Live URL:** https://lookiq.github.io/
- **GitHub Repository:** lookiq/lookiq.github.io (Branch: main)
- **Target Audience:** United States (USA) fashion consumers seeking accessible luxury, capsule wardrobe essentials, high-end aesthetics, and smart viral dupes ("Look for Less").
- **Brand Tone:** Sophisticated, refined, editorial, authoritative, minimalist, and trustworthy. Inspired by Net-A-Porter, Vogue, Harper's Bazaar, and Zara editorial layouts.

---

## 2. Core Architecture & Tech Stack

- **Architecture:** 100% Pure Vanilla Web Stack (Zero bloated frameworks, zero build steps required).
- **Core Technologies:** HTML5, Modern CSS3 (Custom Properties / CSS Variables), Vanilla JavaScript (ES6+).
- **Hosting:** GitHub Pages (Custom domain ready, SSL enforced, automated Git-based deployment).
- **SEO & Social:** Rich Open Graph tags, Twitter Cards, Schema.org JSON-LD structured data (Product, Organization, WebSite), XML Sitemap, and automated Pinterest RSS feed (`feed.xml`).
- **Performance:** Lightweight, zero external JS libraries, preloaded critical assets, responsive image loading (`loading="lazy"`), 95+ Core Web Vitals target.

---

## 3. Directory & File Structure

```
lookiq/
├── index.html                  # Main editorial showcase, curated collections & hero
├── shop.html                   # Filterable catalog of all fashion items
├── look-for-less.html          # Interactive Splurge vs Steal comparison tool
├── lookbook.html               # Curated outfit bundles and capsule styling
├── guides.html                 # Editorial style guides, reviews & fashion advice
├── about.html                  # Brand story, editorial standards & mission
├── contact.html                # Client inquiry form and support details
├── privacy-policy.html         # Legal policy (FTC, GDPR, CCPA, Amazon Associates compliant)
├── 404.html                    # Custom luxury branded 404 error page
├── sitemap.xml                 # Search engine XML sitemap
├── feed.xml                    # Pinterest-optimized RSS feed for rich pins
├── robots.txt                  # Search engine crawling rules
├── vercel.json                 # Caching and header configurations
├── css/
│   └── styles.css              # Central unified design system & responsive styles
├── js/
│   └── main.js                 # Search, filtering, wishlist, and interactive components
├── assets/                     # High-resolution optimized product imagery
└── products/                   # Individual Product Detail Pages (PDP)
    ├── prod-01.html to prod-12.html
    ├── prod-dresstells-01.html
    ├── prod-ekouaer-01.html
    ├── prod-eomenie-01.html
    ├── prod-fracora-01.html
    ├── prod-furtalk-01.html
    ├── prod-grecerelle-01.html
    └── prod-straw-tote-01.html
```

---

## 4. Strict Design System & Visual Guidelines

### A. Strict Zero-Emoji Policy (NON-NEGOTIABLE)
- **NEVER use raw emojis** (such as stars, diamonds, shopping bags, flame, sparkles, etc.) anywhere in the codebase, UI, comments, buttons, or generated content.
- Raw emojis destroy brand prestige and contradict the "Quiet Luxury" aesthetic.
- All visual accents, badges, buttons, and callouts must use **bespoke inline SVG micro-icons**.

### B. Micro-Icon Container Architecture
Whenever an icon or visual accent is needed, enclose the inline SVG in a standardized micro-container:
- **Dimensions:** `width: 26px; height: 26px; border-radius: 50%;`
- **Background:** Frosted glass effect (`rgba(255, 255, 255, 0.04)` or `var(--bg-card)`).
- **Border:** `1px solid rgba(201, 151, 56, 0.25)` (subtle champagne gold border).
- **Icon Color:** Liquid Gold (`var(--accent-gold)` or `#c99738`).
- **Interactive State:** `transform: translateY(-2px); box-shadow: 0 4px 14px rgba(201, 151, 56, 0.15);`

### C. Color Palette
- **Noir / Deep Black (Background):** `#08080b`
- **Charcoal / Card Surface:** `#141113`
- **Champagne Gold (Primary Accent):** `#c99738`
- **Light Gold / Accent Hover:** `#e2bc68`
- **Cashmere White (Primary Typography):** `#faf8f5`
- **Muted Sand / Subtitle Gray:** `#a09c96`
- **Subtle Glass Border:** `rgba(201, 151, 56, 0.15)`

### D. Typography
- **Headings & Editorial Titles:** `Playfair Display`, `Cormorant Garamond`, serif.
- **Body & UI Elements:** `Montserrat`, `Plus Jakarta Sans`, `Inter`, sans-serif.

---

## 5. Amazon Associates & Legal Compliance

- **Amazon Associates Store ID / Tag:** `likeefashionh-20`
- **Outbound Affiliate Links Requirement:**
  - All outbound affiliate links MUST include: `target="_blank" rel="nofollow sponsored noopener"`
  - Allowed link formats: Tagged Amazon URLs (`https://www.amazon.com/dp/.../?tag=likeefashionh-20`) or official Amazon Associates SiteStripe shortlinks (`https://amzn.to/...`).
- **FTC Mandatory Disclosures:**
  - Prominent affiliate disclosure must appear across header banners, footers, and directly beneath CTA buttons:
  - *"As an Amazon Associate, LOOKIQ earns from qualifying purchases. Prices and availability are accurate at time of publication and subject to change."*
- **Pricing Policy:**
  - Dynamic phrasing such as "Check Price on Amazon" or "View on Amazon" is standard practice to comply with Amazon price volatility policies.

---

## 6. High-Converting Signature Features

1. **Mobile Sticky Buy Bar (`mobile-sticky-bar`):**
   - Active across all 19 product detail pages.
   - Remains completely hidden on desktop (`@media (max-width: 768px)` only).
   - Smoothly slides up from the bottom when the user scrolls past the top product viewport (`scrollY > 260px`).
   - Displays real product thumbnail, truncated title, current price, and a direct gold Amazon CTA button.

2. **Look for Less (Splurge vs. Steal Comparison):**
   - Side-by-side interactive dupe comparison cards allowing shoppers to discover high-end runway alternatives at accessible prices.

3. **Curated Capsule Outfits:**
   - Multi-item outfits coordinated by aesthetic (e.g., Parisian Chic, Minimalist Executive, Resort Elegance), driving multiple affiliate purchases per visit.

4. **Clean Navigation:**
   - Zero `#` placeholder anchors. Every navigation link connects to an existing, fully functioning page.

---

## 7. Instructions for Any AI Working on LOOKIQ

When generating code, modifying files, writing copy, or suggesting improvements for LOOKIQ, the AI must strictly adhere to the following rules:

1. **Never introduce raw cartoon emojis.** Always use clean SVG vectors and CSS micro-containers.
2. **Preserve existing affiliate tags (`likeefashionh-20`)** and required rel attributes (`rel="nofollow sponsored noopener"`).
3. **Maintain the Quiet Luxury dark aesthetic** (`#08080b`, `#141113`, `#c99738`, `#faf8f5`).
4. **Never break the vanilla architecture.** Do not introduce npm packages, React, Tailwind CDN, or build tools unless explicitly requested by the owner.
5. **Always test mobile responsiveness.** The site receives majority traffic from mobile devices (Pinterest, Instagram, TikTok).
6. **Ensure clean relative pathing.** Product detail pages reside in `products/` (using `../` for root assets and styles), while root pages reside in `/`.
7. **Write clean, semantic HTML5** with microdata / schema markup where applicable.
8. **Strict Pinterest 2:3 Pin Ratio & Visual SEO:** Any future pin or feed asset MUST use exact 2:3 vertical aspect ratio (1000 × 1500 px) in `assets/pins/`. All automated feed items must follow the Pinterest Guided Search SEO formula (Title, Search-Intent Description, Visual Alt Text, Category Mapping).

---

## 8. Pinterest SEO & Automated Pin Publishing Standard (NON-NEGOTIABLE)

For all future posts, product additions, or Pinterest auto-publish feeds (`feed.xml`), the following visual and SEO rules must be strictly enforced:

### A. Mandatory 2:3 Vertical Pin Image Standard
- **Exact Aspect Ratio:** `2:3` (Vertical / Portrait).
- **Exact Dimensions:** `1000 × 1500 px` (Standard HD) or `2000 × 3000 px` (Ultra HD).
- **Location:** All dedicated Pinterest pin images MUST be saved in `assets/pins/` (e.g., `assets/pins/prod-[name]-pin.jpg`).
- **Composition Rules:** 
  - Pure vertical composition with the product/model occupying the central 70% of the frame.
  - Zero raw emojis or cluttered text overlays.
  - Clean margins at top (for Pinterest UI) and bottom (for Pinterest action buttons).
  - Background must align with LOOKIQ's luxury aesthetic: Cashmere Cream (`#faf8f5`), Warm Ivory, or Editorial Noir/Charcoal (`#141113`).

### B. Pinterest Guided Search SEO Title Formula
- **Character Count:** 40 to 70 characters (under 100 max). The most critical search keyword MUST be in the first 35 characters so it never gets truncated in the mobile Pinterest smart feed.
- **Formula:** `[Primary Pinterest Search Keyword] + [Product Style / Benefit / Year] + [Price or Deal]`
- **Examples:**
  - *Viral Summer Maxi Dress Under $20 | Vacation Capsule Wardrobe*
  - *Quiet Luxury Wool Trench Coat | High-End Fall Outfit Inspo*
  - *Vintage 1950s Cocktail Tea Dress Under $50 | Amazon Wedding Guest Inspo*

### C. Pinterest Search Intent Description Formula
- **Character Count:** 150 to 350 characters (max 500 characters).
- **Structure:**
  1. **Hook & Problem Solver:** Mention the target lifestyle occasion, fit, or style trend (incorporating 2-3 secondary long-tail Pinterest keywords).
  2. **Product Specification & Social Proof:** Mention fabric feel, pocket details, ratings (e.g., "4.4★ with 4,800+ verified ratings"), and Amazon Prime availability.
  3. **High-Converting Call to Action (CTA):** Clear directive such as *"Tap to explore the full US sizing breakdown, fabric review, and capsule outfit styling on LOOKIQ &rarr;"*
  4. **Niche Hashtag Bundle:** Exactly 4 to 6 hyper-targeted niche fashion hashtags (e.g., `#AmazonFashion #QuietLuxury #CapsuleWardrobe #VacationOutfit #OOTD`).

### D. Visual AI & Accessibility Alt Text Formula
- Pinterest's visual search engine (Lens) reads image alt text alongside its computer vision scanner.
- **Formula:** Detailed visual description including garment type, silhouette, color, pattern, sleeve style, styling details, and occasion.
- **Example:** `"Woman wearing olive green sleeveless loose pocket maxi dress with walking side split, styling casual summer capsule wardrobe with gold sandals and straw tote bag."`

### E. Omnichannel Harmonization (Pinterest + Google + Meta)
- **Pinterest Feed (`feed.xml`):** Injects the dedicated 2:3 pin image URL (`assets/pins/...`), Pinterest-optimized title, description, and visual alt text.
- **Product Page OpenGraph & Twitter Cards:** Uses the 2:3 pin image or 1200×630 landscape image, ensuring optimal preview rendering across Facebook, Twitter/X, and iMessage.
- **Product Page Schema.org (JSON-LD):** Maintains Google Rich Snippets (`Product`, `Offer`, `AggregateRating`) so Google Search displays the price, star rating, and in-stock status directly in search results.
