# LOOKIQ | Pinterest SEO & Automated Pin Publishing Master Blueprint

> **Executive Overview:**  
> This blueprint establishes the non-negotiable standards, keyword architecture, visual specifications, and automated workflow for publishing high-reach, viral Amazon fashion pins from LOOKIQ directly to Pinterest.

---

## 1. The Core Architecture: Why Pinterest SEO Differs from Google & Meta

| Feature | Pinterest Visual SEO | Google Web Search SEO | Meta (FB/IG) Open Graph |
| :--- | :--- | :--- | :--- |
| **Primary Discovery Engine** | Visual recognition + Guided Search keywords | Text crawling + Backlinks + Page Authority | Social graph + Engagement feed |
| **Image Aspect Ratio** | **Strictly 2:3 Vertical (1000 × 1500 px)** | 16:9 Landscape (1200 × 675 px) | 1:1 Square (1080 × 1080) or 1.91:1 |
| **Mobile Feed Behavior** | Full vertical prominence, zero cropping | Hidden behind search snippet | Square card in scroll feed |
| **Search Intent** | Visual inspiration, lifestyle aesthetics, outfit solving | Transactional & Informational queries | Social browsing & community |

---

## 2. The 4-Pillar Pinterest SEO Formula

### Pillar 1: Pin Title (Guided Search Keyword Front-Loading)
* **Length:** 40 to 70 characters (Max 100).
* **Rule:** Place the most critical search keyword in the **first 35 characters** so it remains 100% visible on mobile feeds without being cut off by ellipses (`...`).
* **Formula:** `[Primary Guided Search Keyword] + [Product Style / Occasion] + [Price / Value Tag]`
* **Approved Title Examples:**
  - `Viral Summer Maxi Dress Under $20 | Casual Split Vacation Outfit`
  - `Quiet Luxury Wool Trench Coat | High-End Fall Outfit Inspo`
  - `Vintage Audrey Hepburn Tea Dress Under $50 | Amazon Wedding Guest Inspo`

### Pillar 2: Pin Description (Context + Social Proof + CTA + Hashtags)
* **Length:** 150 to 350 characters (Max 500).
* **Structure:**
  1. **The Hook:** Address an outfit dilemma or lifestyle occasion with 2-3 natural long-tail keywords.
  2. **Product Specs & Social Proof:** Mention fabric comfort, fit details, star rating (e.g., "4.4★ with 4,800+ reviews"), and verified Prime deal.
  3. **High-Converting Call to Action (CTA):** Always invite clicks: *"Tap to explore full US sizing guide, fabric review, and styling tips on LOOKIQ &rarr;"*
  4. **Niche Hashtags (4 to 6 max):** `#AmazonFashion #QuietLuxury #CapsuleWardrobe #VacationStyle #OOTD`

### Pillar 3: Visual AI Alt Text (Pinterest Lens Optimization)
* Pinterest's computer vision algorithm scans image shapes, fabrics, patterns, and colors. The `alt` text guides the algorithm on exact classification.
* **Formula:** Detailed physical and styling description.
* **Example:** `"Woman wearing olive green sleeveless loose pocket maxi dress with walking side split, styling casual summer capsule wardrobe with gold sandals and straw tote bag."`

### Pillar 4: Exact 2:3 Vertical Pin Image Specification
* **Dimensions:** **1000 × 1500 pixels** (or **2000 × 3000 pixels** Ultra HD).
* **Aspect Ratio:** **2:3** (Vertical / Portrait).
* **Safe Margins:** Keep key focal elements and any typography within the middle 70% of the canvas. Leave the top and bottom 15% clean to avoid interference with Pinterest's UI badges and action buttons.
* **Zero Emojis:** Never use cartoon emojis in images or text overlays.

---

## 3. Automated 1-Click Publishing Workflow

Whenever a new product or outfit is created for LOOKIQ, run the automated publisher script located in `scripts/publish-pinterest-pin.ps1`.

### How to Run:
Open PowerShell in the `fashion web` folder and execute:

```powershell
.\scripts\publish-pinterest-pin.ps1 `
    -ProductId "prod-new-dress-01" `
    -Title "Viral Summer Maxi Dress Under $20 | Vacation Capsule Wardrobe" `
    -Description "Looking for the ultimate effortless summer maxi dress on Amazon US under $20? The viral split maxi dress features ultra-soft breathable stretch jersey knit, deep functional pockets, and a flattering side slit for effortless everyday styling. Verified US Prime Deal. Tap to explore full sizing breakdown on LOOKIQ!" `
    -Hashtags @("#AmazonFashion", "#SummerDress", "#MaxiDress", "#CapsuleWardrobe", "#VacationOutfit") `
    -ImageSource "C:\path\to\raw-product-image.jpg" `
    -AltText "Woman wearing olive green sleeveless loose pocket maxi dress with walking side split, styling casual summer capsule wardrobe" `
    -Categories @("Women's Fashion", "Summer Dresses", "Casual Outfits") `
    -Price "$19.99"
```

### What the Automation Does Automatically:
1. **Converts Image to Strict 2:3 Ratio:** Scales and centers the image into a pristine 1000 × 1500 px vertical image saved in `assets/pins/[ProductId]-pin.jpg`.
2. **Generates Pinterest SEO Metadata:** Validates title length, formats clean description, attaches hashtags and alt text.
3. **Injects into `feed.xml`:** Prepends the new `<item>` with `<enclosure>`, `<media:content>`, and category tags for Pinterest auto-publish.
4. **Git Commit & Push:** Automatically pushes to GitHub `main`, triggering live deployment so Pinterest's RSS bot picks up the new pin immediately.
