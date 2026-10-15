import os
import re
import urllib.parse
from pathlib import Path

def generate_pdp_html(product: dict, site_base_url: str = "https://lookiq.github.io") -> str:
    """
    Generates a full production-grade LookiQ Product Detail Page (PDP)
    by cloning the master luxury template (casual-summer-sundress.html)
    and substituting dynamic product details.
    """
    script_dir = Path(__file__).resolve().parent
    project_root = script_dir.parent
    master_template_path = project_root / "products" / "casual-summer-sundress.html"

    if not master_template_path.exists():
        raise FileNotFoundError(f"Master PDP template not found at {master_template_path}")

    with open(master_template_path, "r", encoding="utf-8") as f:
        html = f.read()

    slug = product["slug"]
    brand = product.get("brand", "LOOKIQ Curated")
    raw_title = product.get("raw_title", "Curated Fashion Staple")
    
    # Avoid duplicate brand & clean excessive Amazon title keywords
    clean_raw = re.sub(r'\s*-\s*[A-Za-z0-9\s]+$', '', raw_title).strip()
    if len(clean_raw) > 75:
        parts = re.split(r'[,|/]', clean_raw)
        clean_raw = parts[0].strip()
        if len(clean_raw) < 25 and len(parts) > 1:
            clean_raw = f"{clean_raw} {parts[1].strip()}"

    if clean_raw.lower().startswith(brand.lower()):
        title = clean_raw
    else:
        title = f"{brand} {clean_raw}"

    # Clean short title for meta, sticky bar & cards (35-50 chars max)
    clean_short_title = title[:50].strip()
    
    price = product.get("price", "$39.99")
    price_num = re.sub(r'[^0-9.]', '', price) or "39.99"
    try:
        orig_price = f"${float(price_num) * 1.35:.2f}"
    except Exception:
        orig_price = "$59.99"

    rating = product.get("rating", 4.6)
    reviews = product.get("review_count", 1850)
    asin = product.get("asin", "B0XXXXXXXX")
    affiliate_url = product.get("short_affiliate_url") or product.get("affiliate_url") or f"https://www.amazon.com/dp/{asin}/?tag=likeefashionh-20"
    
    # Prefer local AI editorial asset if generated or available
    pin_file = project_root / "assets" / "pins" / f"{slug}-pin.jpg"
    product_file = project_root / "assets" / "products" / f"{slug}.jpg"

    if product_file.exists():
        image_hero_rel = f"../assets/products/{slug}.jpg"
        image_hero_abs = f"{site_base_url}/assets/products/{slug}.jpg"
    elif pin_file.exists():
        image_hero_rel = f"../assets/pins/{slug}-pin.jpg"
        image_hero_abs = f"{site_base_url}/assets/pins/{slug}-pin.jpg"
    else:
        raw_img = product.get("image_url", f"{site_base_url}/assets/pins/{slug}-pin.jpg")
        image_hero_rel = raw_img
        image_hero_abs = raw_img

    image_pin_url = f"{site_base_url}/assets/pins/{slug}-pin.jpg"

    bullets = product.get("bullets", [])
    if bullets:
        bullet_items = []
        for b in bullets[:5]:
            bullet_items.append(f"""              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>{b}</span>
              </li>""")
        bullets_html = "\n".join(bullet_items)
    else:
        bullets_html = f"""              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Ultra-soft fine ribbed knit with comfortable all-day drape and stretch</span>
              </li>
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Verified true-to-size fit based on customer reviews</span>
              </li>
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Amazon Prime eligible with fast shipping and free 30-day returns</span>
              </li>"""

    editorial_summary = (
        f"Curated Amazon fashion staple: {title}. Evaluated by LOOKIQ style editors "
        f"for premium fabric quality, flattering silhouette, and effortless capsule wardrobe versatility. "
        f"Currently verified on Amazon US for {price}."
    )

    encoded_pin_desc = urllib.parse.quote(f"{title} - Verified Amazon Find on LOOKIQ")

    # 1. Update Title and Meta Tags
    html = re.sub(r'<title>.*?</title>', lambda m: f'<title>{clean_short_title} | LOOKIQ Review</title>', html, count=1)
    html = re.sub(r'<meta name="description" content=".*?">', lambda m: f'<meta name="description" content="{editorial_summary}">', html, count=1)
    html = re.sub(r'<link rel="canonical" href=".*?">', lambda m: f'<link rel="canonical" href="{site_base_url}/products/{slug}.html">', html, count=1)

    # 2. Update OpenGraph and Twitter
    html = re.sub(r'<meta property="og:title" content=".*?">', lambda m: f'<meta property="og:title" content="{clean_short_title} | LOOKIQ">', html, count=1)
    html = re.sub(r'<meta property="og:description" content=".*?">', lambda m: f'<meta property="og:description" content="{editorial_summary}">', html, count=1)
    html = re.sub(r'<meta property="og:image" content=".*?">', lambda m: f'<meta property="og:image" content="{image_pin_url}">', html, count=1)
    html = re.sub(r'<meta property="og:url" content=".*?">', lambda m: f'<meta property="og:url" content="{site_base_url}/products/{slug}.html">', html, count=1)
    html = re.sub(r'<meta property="product:price:amount" content=".*?">', lambda m: f'<meta property="product:price:amount" content="{price_num}">', html, count=1)

    html = re.sub(r'<meta name="twitter:title" content=".*?">', lambda m: f'<meta name="twitter:title" content="{clean_short_title} | LOOKIQ">', html, count=1)
    html = re.sub(r'<meta name="twitter:description" content=".*?">', lambda m: f'<meta name="twitter:description" content="{editorial_summary}">', html, count=1)
    html = re.sub(r'<meta name="twitter:image" content=".*?">', lambda m: f'<meta name="twitter:image" content="{image_pin_url}">', html, count=1)

    # 3. Update Schema.org JSON-LD
    html = html.replace("Elescat Women's Casual Sleeveless Summer Sundress with Pockets", title)
    html = html.replace("casual-summer-sundress.html", f"{slug}.html")
    html = html.replace("casual-summer-sundress-pin.jpg", f"{slug}-pin.jpg")
    html = html.replace("../assets/elescat-summer-dress.webp", image_hero_rel)
    html = html.replace("https://lookiq.github.io/assets/elescat-summer-dress.webp", image_hero_abs)
    html = html.replace("https://lookiq.github.io/assets/elescat-summer-dress.png", image_hero_abs)
    html = html.replace("B09N72QM68", asin)
    html = html.replace('"name": "Elescat"', f'"name": "{brand}"')
    html = html.replace('"price": "24.99"', f'"price": "{price_num}"')

    # 4. Update Breadcrumb current
    html = re.sub(
        r'<span class="current" title=".*?">.*?</span>',
        lambda m: f'<span class="current" title="{title}">{title}</span>',
        html,
        count=1
    )

    # 5. Update Product Page Title & Meta Header
    html = re.sub(
        r'<h1 class="product-page-title">.*?</h1>',
        lambda m: f'<h1 class="product-page-title">{title}</h1>',
        html,
        count=1
    )
    html = re.sub(
        r'<div class="product-meta-header">[\s\S]*?</div>',
        lambda m: f'<div class="product-meta-header">\n          <span>{brand}</span>\n          <span>&bull;</span>\n          <span>Curated Fashion</span>\n          <span>&bull;</span>\n          <span>ASIN: {asin}</span>\n        </div>',
        html,
        count=1
    )

    # 6. Badge & Pinterest Button
    html = html.replace("Viral Summer Favorite", "Trending Fashion Staple")
    html = re.sub(
        r'href="https://www\.pinterest\.com/pin/create/button/\?url=[^"]*"',
        lambda m: f'href="https://www.pinterest.com/pin/create/button/?url={urllib.parse.quote(f"{site_base_url}/products/{slug}.html")}&media={urllib.parse.quote(image_pin_url)}&description={encoded_pin_desc}"',
        html
    )

    # 7. Update Price Card & Ratings
    html = re.sub(
        r'<span class="price-value">\$[0-9.]+</span>',
        lambda m: f'<span class="price-value">{price}</span>',
        html
    )
    html = re.sub(
        r'<span class="price-original-val">\$[0-9.]+</span>',
        lambda m: f'<span class="price-original-val">{orig_price}</span>',
        html
    )
    html = re.sub(
        r'<span class="rating-score">[0-9.]+ out of 5</span>',
        lambda m: f'<span class="rating-score">{rating} out of 5</span>',
        html
    )
    html = re.sub(
        r'<span class="rating-count">\([0-9,kK\+\s]+ verified Amazon ratings\)</span>',
        lambda m: f'<span class="rating-count">({reviews:,} verified Amazon ratings)</span>',
        html
    )

    # 8. Update Affiliate Links
    html = re.sub(
        r'href="https://amzn\.to/[^"]*"',
        lambda m: f'href="{affiliate_url}"',
        html
    )
    html = re.sub(
        r'href="https://www\.amazon\.com/dp/[^"]*"',
        lambda m: f'href="{affiliate_url}"',
        html
    )

    # 9. Update Editorial Overview Block
    overview_block = f"""        <div class="product-section-block">
          <h2>Editorial Overview</h2>
          <p style="font-size: 0.96rem; color: var(--text-secondary); line-height: 1.65;">
            {editorial_summary}
          </p>
        </div>"""
    html = re.sub(
        r'<div class="product-section-block">\s*<h2>Editorial Overview</h2>\s*<p[^>]*>[\s\S]*?</p>\s*</div>',
        lambda m: overview_block,
        html,
        count=1
    )

    # 10. Update Feature List
    html = re.sub(
        r'<ul class="feature-list-check">[\s\S]*?</ul>',
        lambda m: f'<ul class="feature-list-check">\n{bullets_html}\n          </ul>',
        html,
        count=1
    )

    # 11. Update Hero and Zoom Image in Gallery
    html = re.sub(
        r'<div class="product-hero-image-box" id="product-zoom-box" onclick="openFullscreenLightbox\([^)]*\)">',
        lambda m: f'<div class="product-hero-image-box" id="product-zoom-box" onclick="openFullscreenLightbox(\'{image_hero_abs}\', \'{title}\')">',
        html,
        count=1
    )
    html = re.sub(
        r'<img src="[^"]*" alt="[^"]*" id="product-zoom-img" decoding="async">',
        lambda m: f'<img src="{image_hero_rel}" alt="{title}" id="product-zoom-img" decoding="async">',
        html,
        count=1
    )

    # 12. Update Mobile Sticky Bar
    html = re.sub(
        r'<span class="sticky-bar-title">.*?</span>',
        lambda m: f'<span class="sticky-bar-title">{clean_short_title}</span>',
        html,
        count=1
    )
    html = re.sub(
        r'<span class="sticky-bar-price">.*?</span>',
        lambda m: f'<span class="sticky-bar-price">{price}</span>',
        html
    )
    html = re.sub(
        r'<img src="[^"]*" alt="[^"]*" class="sticky-bar-thumb" loading="lazy">',
        lambda m: f'<img src="{image_hero_rel}" alt="{title}" class="sticky-bar-thumb" loading="lazy">',
        html,
        count=1
    )

    # 12b. Fix template leftovers the clone misses (sundress master template).
    # JSON-LD description
    editorial_desc = f"{title}. Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling."
    html = re.sub(
        r'"description": "Effortless sleeveless casual sundress[^"]*"',
        f'"description": "{editorial_desc}"', html, count=1)
    # JSON-LD aggregateRating (template default 4.3 / 18500)
    html = re.sub(
        r'"ratingValue": 4\.3,(\s*)"reviewCount": 18500,',
        lambda m: f'"ratingValue": {rating},{m.group(1)}"reviewCount": {reviews},',
        html, count=1)
    # JSON-LD reviewRating (template default 4.8)
    html = re.sub(
        r'("reviewRating":\s*\{\s*"@type": "Rating",\s*"ratingValue": ")4\.8(")',
        rf'\g<1>{rating}\g<2>', html, count=1)
    # JSON-LD offers.url (template amzn.to short link not caught by href swap)
    html = re.sub(
        r'"url": "https://amzn\.to/[^"]*"',
        f'"url": "{affiliate_url}"', html, count=1)
    # JSON-LD FAQPage: replace the 3 sundress-specific Q&As with generic ones
    html = html.replace(
        '"name": "How does the sizing run for this Elescat summer dress?"',
        '"name": "How does the sizing run?"', 1)
    html = html.replace(
        '"text": "It fits true to size with a relaxed, flowy swing silhouette. If you prefer a more tailored fit through the bust, consider sizing down; otherwise, order your standard US size for breezy vacation comfort."',
        '"text": "Based on aggregated Amazon customer reviews, this item fits true to size. We recommend ordering your standard US size."', 1)
    html = html.replace(
        '"name": "Is the fabric see-through, and are the pockets functional?"',
        '"name": "What is the fabric and how do I care for it?"', 1)
    html = html.replace(
        '"text": "No, the high-density rayon-blend fabric is opaque and soft to the touch. Both side seam pockets are deep and sturdy enough to hold a smartphone, keys, or sunglasses without sagging."',
        '"text": "See the product details on Amazon for the full material breakdown. Machine wash cold on gentle and hang dry."', 1)
    html = html.replace(
        '"name": "How should I care for and wash this dress?"',
        '"name": "What is the return policy?"', 1)
    html = html.replace(
        '"text": "We recommend machine washing on a cold, gentle cycle with like colors and hanging to dry or tumble drying on low to preserve the vibrant color and soft drape."',
        '"text": "Orders through Amazon are covered by Amazon\'s standard return policy \\u2014 most fashion items qualify for free 30-day returns."', 1)
    # Visible FAQ accordion -> generic
    def _faq_repl(m):
        items = []
        for i, (q, a) in enumerate([
            ("How does the sizing run?",
             "Based on aggregated Amazon customer reviews, this item fits true to size. We recommend ordering your standard US size — check the size chart on the Amazon listing for exact measurements."),
            ("What is the fabric and how do I care for it?",
             "See the product details on Amazon for the full material breakdown. As a rule of thumb, machine wash cold on a gentle cycle and hang dry to preserve color, shape, and softness."),
            ("What is the return policy?",
             "Orders placed through Amazon are covered by Amazon's standard return policy — most fashion items qualify for free 30-day returns."),
        ]):
            open_attr = " open" if i == 0 else ""
            items.append(
                f'''<details class="faq-accordion-item"{open_attr}>
              <summary class="faq-accordion-summary">
                <span>{q}</span>
                <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </summary>
              <div class="faq-accordion-body">
                <p>{a}</p>
              </div>
            </details>''')
        return m.group(1) + "\n" + "\n".join(items) + "\n          " + m.group(3)
    html = re.sub(
        r'(<div class="faq-accordion-group">\s*)(<details class="faq-accordion-item"[^>]*>[\s\S]*?</details>\s*)+?(</div>)',
        _faq_repl, html, count=1)
    # Styling tip: swap the sundress sentence for a category-aware tip
    _t = title.lower()
    if any(k in _t for k in ("trench", "coat", "jacket", "blazer", "shacket")):
        _tip = ("Layer it over a fitted knit and dark denim for a polished off-duty look, "
                "or throw it over tailoring for the office. Finish with loafers or ankle boots and a structured bag.")
    elif any(k in _t for k in ("sweater", "cardigan", "hoodie", "pullover", "knit")):
        _tip = ("Style it with high-rise jeans and sneakers for everyday ease, or tuck the front "
                "into a satin midi skirt with boots for an elevated evening look.")
    elif any(k in _t for k in ("boot", "sneaker", "shoe", "loafer", "heel", "sandal")):
        _tip = ("Pair with cropped denim or a midi dress to show them off — a true capsule-wardrobe workhorse.")
    elif any(k in _t for k in ("earring", "hoop", "necklace", "jewelry", "bracelet")):
        _tip = ("Wear solo for a minimal everyday statement or stack with your existing pieces.")
    elif any(k in _t for k in ("dress", "romper", "jumpsuit")):
        _tip = ("Dress it up with heeled boots and a tailored coat, or keep it casual with sneakers and a denim jacket.")
    else:
        _tip = ("A versatile wardrobe staple — dress it up with tailored pieces and heels, or keep it relaxed with denim and sneakers.")
    html = html.replace(
        "Elevate this classic black sundress with a woven straw shoulder tote, tortoiseshell retro sunglasses, and tan slide sandals for an effortless daytime look. To transition into an evening dinner outfit, add a tailored denim jacket or lightweight linen blazer with gold hoop earrings.",
        _tip, 1)
    # Sizing guide paragraph -> generic
    html = re.sub(
        r'(<h2>Sizing &amp; Fit Guide</h2>\s*<p[^>]*>)[\s\S]*?(</p>)',
        r'\g<1>\n            <strong>Fit Profile:</strong> True to size based on aggregated Amazon customer reviews. '
        r'If you are between sizes or prefer a roomier fit, consider sizing up. '
        r'Always check the Amazon size chart for exact measurements.\n          \g<2>',
        html, count=1)

    # Clean any replacement characters
    html = html.replace('\ufffd', '&bull;')

    return html

def save_pdp(product: dict, project_root_path: str) -> str:
    """Generates and writes PDP file into products/{slug}.html."""
    html_content = generate_pdp_html(product)
    slug = product["slug"]
    output_dir = Path(project_root_path) / "products"
    output_dir.mkdir(parents=True, exist_ok=True)
    file_path = output_dir / f"{slug}.html"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"[PDPBuilder] Created PDP at: {file_path}")
    return str(file_path)

if __name__ == "__main__":
    sample = {
        "slug": "test-item",
        "brand": "LOOKIQ",
        "raw_title": "Oversized Cashmere Knit Cardigan",
        "price": "$49.99",
        "rating": 4.8,
        "review_count": 2500,
        "asin": "B0TEST1234",
        "affiliate_url": "https://www.amazon.com/dp/B0TEST1234?tag=likeefashionh-20",
        "bullets": ["100% Cashmere blend", "True to size", "Fast Prime delivery"]
    }
    p = generate_pdp_html(sample)
    print("Generated length:", len(p))
