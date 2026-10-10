import os
import re
from pathlib import Path

def generate_pdp_html(product: dict, site_base_url: str = "https://lookiq.github.io") -> str:
    """
    Generates a full production-grade LookiQ Product Detail Page (PDP)
    by cloning the master luxury template (oversized-turtleneck-sweater.html)
    and substituting dynamic product details.
    """
    script_dir = Path(__file__).resolve().parent
    project_root = script_dir.parent
    master_template_path = project_root / "products" / "oversized-turtleneck-sweater.html"

    if not master_template_path.exists():
        raise FileNotFoundError(f"Master PDP template not found at {master_template_path}")

    with open(master_template_path, "r", encoding="utf-8") as f:
        html = f.read()

    slug = product["slug"]
    brand = product.get("brand", "LOOKIQ Curated")
    raw_title = product.get("raw_title", "Curated Fashion Staple")
    
    # Avoid duplicate brand
    if raw_title.lower().startswith(brand.lower()):
        title = raw_title
    else:
        title = f"{brand} {raw_title}"

    # Clean short title for meta & cards
    clean_short_title = title[:60]
    
    price = product.get("price", "$39.99")
    price_num = re.sub(r'[^0-9.]', '', price) or "39.99"
    try:
        orig_price = f"${float(price_num) * 1.35:.2f}"
    except Exception:
        orig_price = "$59.99"

    rating = product.get("rating", 4.6)
    reviews = product.get("review_count", 1850)
    asin = product.get("asin", "B0XXXXXXXX")
    affiliate_url = product.get("short_affiliate_url") or product.get("affiliate_url")
    
    image_hero_url = product.get("image_url", f"{site_base_url}/assets/pins/{slug}-pin.jpg")
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
        bullets_html = """              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Premium fabric with tailored drape and all-day comfort</span>
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
                <span>Amazon Prime eligible with free 30-day returns</span>
              </li>"""

    editorial_summary = (
        f"Curated Amazon fashion staple: {title}. Evaluated by LOOKIQ style editors "
        f"for premium fabric quality, flattering silhouette, and effortless capsule wardrobe versatility. "
        f"Currently verified on Amazon US for {price}."
    )

    # 1. Update Title and Meta Tags
    html = re.sub(r'<title>.*?</title>', f'<title>{clean_short_title} | LOOKIQ Review</title>', html, count=1)
    html = re.sub(r'<meta name="description" content=".*?">', f'<meta name="description" content="{editorial_summary}">', html, count=1)
    html = re.sub(r'<link rel="canonical" href=".*?">', f'<link rel="canonical" href="{site_base_url}/products/{slug}.html">', html, count=1)

    # 2. Update OpenGraph and Twitter
    html = re.sub(r'<meta property="og:title" content=".*?">', f'<meta property="og:title" content="{clean_short_title} | LOOKIQ">', html, count=1)
    html = re.sub(r'<meta property="og:description" content=".*?">', f'<meta property="og:description" content="{editorial_summary}">', html, count=1)
    html = re.sub(r'<meta property="og:image" content=".*?">', f'<meta property="og:image" content="{image_pin_url}">', html, count=1)
    html = re.sub(r'<meta property="og:url" content=".*?">', f'<meta property="og:url" content="{site_base_url}/products/{slug}.html">', html, count=1)
    html = re.sub(r'<meta property="product:price:amount" content=".*?">', f'<meta property="product:price:amount" content="{price_num}">', html, count=1)

    html = re.sub(r'<meta name="twitter:title" content=".*?">', f'<meta name="twitter:title" content="{clean_short_title} | LOOKIQ">', html, count=1)
    html = re.sub(r'<meta name="twitter:description" content=".*?">', f'<meta name="twitter:description" content="{editorial_summary}">', html, count=1)
    html = re.sub(r'<meta name="twitter:image" content=".*?">', f'<meta name="twitter:image" content="{image_pin_url}">', html, count=1)

    # 3. Update Schema.org JSON-LD
    html = html.replace("ANRABESS Oversized Turtleneck Batwing Ribbed Knit Sweater", title)
    html = html.replace("oversized-turtleneck-sweater.html", f"{slug}.html")
    html = html.replace("oversized-turtleneck-sweater-pin.jpg", f"{slug}-pin.jpg")
    html = html.replace("../assets/anrabess-turtleneck-sweater.webp", image_hero_url)
    html = html.replace("https://lookiq.github.io/assets/anrabess-turtleneck-sweater.webp", image_hero_url)
    html = html.replace("B07XKH9K5M", asin)
    html = html.replace("ANRABESS", brand)

    # 4. Update Announcement Bar
    html = re.sub(r'<span>ANRABESS on Amazon US &bull;.*?</span>', f'<span>{brand} on Amazon US &bull; Verified Sizing &bull; Fast Prime Delivery</span>', html)

    # 5. Update Breadcrumb current
    html = re.sub(
        r'<span class="current" title=".*?">.*?</span>',
        f'<span class="current" title="{title}">{title}</span>',
        html,
        count=1
    )

    # 6. Update Product Page Details Header & Title
    html = re.sub(
        r'<h1 class="product-page-title">.*?</h1>',
        f'<h1 class="product-page-title">{title}</h1>',
        html,
        count=1
    )

    # Meta Header (Brand • Category • ASIN)
    html = re.sub(
        r'<div class="product-meta-header">[\s\S]*?</div>',
        f'<div class="product-meta-header">\n          <span>{brand}</span>\n          <span>&bull;</span>\n          <span>Curated Fashion</span>\n          <span>&bull;</span>\n          <span>ASIN: {asin}</span>\n        </div>',
        html,
        count=1
    )

    # 7. Update Price Card
    html = re.sub(
        r'<span class="price-value">\$[0-9.]+</span>',
        f'<span class="price-value">{price}</span>',
        html
    )
    html = re.sub(
        r'<span class="price-original-val">\$[0-9.]+</span>',
        f'<span class="price-original-val">{orig_price}</span>',
        html
    )

    # Rating score & count
    html = re.sub(
        r'<span class="rating-score">[0-9.]+ out of 5</span>',
        f'<span class="rating-score">{rating} out of 5</span>',
        html
    )
    html = re.sub(
        r'<span class="rating-count">\([0-9,kK\+\s]+ verified Amazon ratings\)</span>',
        f'<span class="rating-count">({reviews:,} verified Amazon ratings)</span>',
        html
    )

    # 8. Update Affiliate CTA Links
    html = re.sub(
        r'href="https://www\.amazon\.com/dp/B07XKH9K5M/\?tag=likeefashionh-20[^"]*"',
        f'href="{affiliate_url}"',
        html
    )

    # 9. Update Editorial Overview & Bullets
    html = re.sub(
        r'<div class="product-section-block">\s*<h2>Editorial Overview</h2>\s*<p[^>]*>[\s\S]*?</p>\s*</div>',
        f'<div class="product-section-block">\n          <h2>Editorial Overview</h2>\n          <p style="font-size: 0.96rem; color: var(--text-secondary); line-height: 1.65;">\n            {editorial_summary}\n          </p>\n        </div>',
        html,
        count=1
    )

    html = re.sub(
        r'<ul class="feature-list-check">[\s\S]*?</ul>',
        f'<ul class="feature-list-check">\n{bullets_html}\n          </ul>',
        html,
        count=1
    )

    # 10. Update Hero and Zoom Image in Gallery
    html = re.sub(
        r'<div class="product-hero-image-box" id="product-zoom-box" onclick="openFullscreenLightbox\([^)]*\)">',
        f'<div class="product-hero-image-box" id="product-zoom-box" onclick="openFullscreenLightbox(\'{image_hero_url}\', \'{title}\')">',
        html,
        count=1
    )
    html = re.sub(
        r'<img src="[^"]*" alt="[^"]*" id="product-zoom-img" decoding="async">',
        f'<img src="{image_hero_url}" alt="{title}" id="product-zoom-img" decoding="async">',
        html,
        count=1
    )

    # 11. Update Mobile Sticky Bar
    html = re.sub(
        r'<span class="sticky-bar-title">.*?</span>',
        f'<span class="sticky-bar-title">{clean_short_title}</span>',
        html,
        count=1
    )
    html = re.sub(
        r'<span class="sticky-bar-price">.*?</span>',
        f'<span class="sticky-bar-price">{price}</span>',
        html,
        count=1
    )
    html = re.sub(
        r'<img src="[^"]*" alt="[^"]*" class="sticky-bar-thumb" loading="lazy">',
        f'<img src="{image_hero_url}" alt="{title}" class="sticky-bar-thumb" loading="lazy">',
        html,
        count=1
    )

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
