# LOOKIQ | Master AI Fashion Photography & Visual Asset Prompts

> **Operational Purpose:**  
> This document stores the official, high-converting AI image generation prompts for LOOKIQ.  
> Whenever a new product is added, updated, or regenerated in the `product add` workflow, follow these exact prompt structures to produce ultra-realistic product imagery and Pinterest pin assets.

---

## 1. Core Visual Directives & Compliance

- **Garment Accuracy:** Maintain 100% fidelity to the original Amazon garment's color, fabric texture, weave, pattern, neckline, seams, and silhouette.
- **Zero-Emoji Policy:** Strictly zero emojis in prompts, overlays, or metadata.
- **Quiet Luxury Color Palette:** Warm neutral tones, soft cream, champagne gold accents, rich charcoal, and noir.
- **Aspect Ratio & Sizing Standards:**
  - **Pinterest Vertical Pins:** Strictly **2:3 aspect ratio** (`1000 × 1500 px` or `2000 × 3000 px`), saved in `assets/pins/`.
  - **E-Commerce Cards & PDP:** **4:5 vertical aspect ratio** (`1080 × 1350 px`) or **1:1 square**, saved in `assets/products/` or `assets/`.

---

## 2. Master Prompt Templates

### Style 1: Adult Fashion — Model Style (High-Converting Lifestyle / Pinterest Pin)
```text
Study the exact color, fabric, pattern, and design details of the garment in this image, and keep them 100% accurate. Do not change the color, print, or design from the original image.

Generate an editorial lifestyle photograph of a model wearing this exact garment, standing in a softly lit minimal indoor setting with natural window light. Confident natural pose, natural makeup and hairstyle, shot on 50mm lens, shallow depth of field, warm neutral color grade, realistic influencer-style photography, high resolution.

Generate the image in a 2:3 vertical aspect ratio (1000x1500 px for Pinterest) or 4:5 vertical aspect ratio (for product card), consistent framing suitable for an e-commerce website product card, garment fully visible within the frame.
```

---

### Style 2: Adult Fashion — Flat-lay Style (Clean PDP & Catalog Grid)
```text
Study the exact color, fabric, pattern, and design details of the garment in this image, and keep them 100% accurate. Do not change the color, print, or design from the original image.

Generate a professional flat-lay product photograph of this exact garment, laid neatly on a soft neutral fabric background, top-down angle, soft diffused studio lighting, clean e-commerce style, high resolution, sharp focus on fabric texture.

Generate the image in a 4:5 vertical aspect ratio (portrait orientation), consistent framing suitable for an e-commerce website product card, garment fully visible within the frame.
```

---

### Style 3: Adult Fashion — Combination Style (Outfit Pairing / Lookbook / Save vs Splurge)
```text
Study the exact color, fabric, pattern, and design details of the garment in this image, and keep them 100% accurate. Do not change the color, print, or design from the original image.

Generate an editorial product photograph, this exact garment displayed on a wooden hanger, paired with matching accessories (shoes/bag/jewelry) arranged aesthetically nearby, soft natural lighting, neutral beige/cream background, top-down flat lay composition, warm minimal color grade, high-resolution lifestyle photography.

Generate the image in a 4:5 vertical aspect ratio (portrait orientation), consistent framing suitable for an e-commerce website product card, garment fully visible within the frame.
```

---

### Style 4: Children's Products — Flatlay (Plain) (Safety-Compliant Clean E-commerce)
```text
Study the exact color, fabric, pattern, and design details of the garment in this image, and keep them 100% accurate. Do not include any human figure, model, or mannequin with a face. Do not change the color or design from the original image.

Generate a professional flat-lay product photograph of this exact children's garment, laid flat on a soft neutral pastel background, gentle diffused lighting, clean minimal e-commerce style, high resolution, sharp focus on details.

Generate the image in a 4:5 vertical aspect ratio (portrait orientation), consistent framing suitable for an e-commerce website product card, garment fully visible within the frame.
```

---

### Style 5: Children's Products — Styled Flatlay (With Props) (Gift Guide / Aesthetic Editorial)
```text
Study the exact color, fabric, pattern, and design details of the garment in this image, and keep them 100% accurate. Do not include any human figure, model, or mannequin with a face. Do not change the color or design from the original image.

Editorial flat-lay photograph, this exact children's garment arranged neatly with soft props like small flowers, a headband, or tiny shoes placed beside it, warm neutral fabric background, soft natural lighting, cozy minimal aesthetic, top-down composition, high-resolution lifestyle photography.

Generate the image in a 4:5 vertical aspect ratio (portrait orientation), consistent framing suitable for an e-commerce website product card, garment fully visible within the frame.
```

---

## 3. Automated Execution Pipeline

Whenever the user provides an Amazon product link or raw image:
1. **Analyze Garment:** Extract exact color code, fabric weave, cut, neckline, and silhouette.
2. **Select Style:**
   - Use **Model Style** for Pinterest Pins (`2:3`) & Homepage Hero/Trending.
   - Use **Flat-lay Style** for Shop Catalog Grid (`shop.html`) & PDP gallery.
   - Use **Combination Style** for Lookbook (`lookbook.html`) & Dupe edits.
   - Use **Children's Flat-lays** strictly without human models.
3. **Store Assets:**
   - Vertical Pinterest Pin `assets/pins/[product-slug]-pin.jpg` (`1000 × 1500 px`).
   - Catalog Product Image `assets/products/[product-slug].jpg` or `assets/[product-slug].png`.
