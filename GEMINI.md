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

## 5. Multi-Conversation Specialist Architecture
- This workspace operates across 5 dedicated specialist conversations in the Antigravity IDE:
  1. **LookiQ main:** Master architecture, full-stack development, layout bugs, and overarching site coordination.
  2. **Lookiq all social:** Social media strategy (Pinterest, Instagram, TikTok), viral hooks, audience acquisition, and affiliate promotion.
  3. **LookiQ SEO:** On-page and technical SEO, Schema JSON-LD, sitemaps, Google Search Console, and Google Discover optimization.
  4. **product add:** High-converting PDP generation, catalog integration, Amazon compliance (likeefashionh-20), and 2:3 vertical pin generation.
  5. **Website automation:** Automated RSS/Pinterest syndication, PowerShell automation scripts, and zero-maintenance integration pipelines.
- All conversations have full filesystem access to the entire LookiQ workspace and must strictly adhere to `SYSTEM_CONVERSATION_ROLES.md` and `PROJECT_IDENTITY.md`.

## 6. Autonomous Execution & Deletion Safety Policy
- **Permanent User Pre-Approval:** The USER has granted absolute pre-approval for all file reads, creations, updates, code modifications, testing, and terminal/git command executions across the entire workspace.
- **Zero-Interruption Mandate:** NEVER pause execution to ask for routine confirmation, interactive poll options, or planning approval during development, building, or refactoring. Execute tasks end-to-end autonomously, verify results, and report final outcomes directly.
- **STRICT DELETION PROTECTION (User Confirmation Mandatory):** NEVER delete, remove, or destroy any existing project files, pages, media assets, or folders without explicit prior permission and confirmation from the USER. File deletion is the SOLE exception to autonomous execution.
