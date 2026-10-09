import re
import json
import urllib.request
import urllib.parse
from html import unescape

def resolve_amazon_url(url: str) -> str:
    """Follows redirects for amzn.to shortlinks to find full URL."""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            return response.geturl()
    except Exception:
        return url

def extract_asin(url: str) -> str:
    """Extracts 10-character Amazon ASIN from URL."""
    match = re.search(r'/(?:dp|gp/product|d)/([A-Z0-9]{10})', url, re.IGNORECASE)
    if match:
        return match.group(1).upper()
    match = re.search(r'\b([B0-9][A-Z0-9]{9})\b', url)
    if match:
        return match.group(1).upper()
    return ""

def slugify(text: str) -> str:
    """Converts a title to a clean URL slug."""
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s-]+', '-', text).strip('-')
    return text[:50]

def fetch_product_details(input_url: str, affiliate_tag: str = "likeefashionh-20") -> dict:
    """Fetches and parses Amazon product information, with robust fallback."""
    full_url = resolve_amazon_url(input_url)
    asin = extract_asin(full_url)
    if not asin:
        asin = extract_asin(input_url)
    
    clean_affiliate_url = f"https://www.amazon.com/dp/{asin}?tag={affiliate_tag}" if asin else input_url
    if "amzn.to" in input_url:
        short_affiliate_url = input_url
    else:
        short_affiliate_url = clean_affiliate_url

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
    }

    title = ""
    brand = "LOOKIQ Curated"
    price = "$39.99"
    rating = 4.5
    review_count = 1250
    image_url = ""
    bullets = []

    try:
        req = urllib.request.Request(full_url, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as response:
            html = response.read().decode('utf-8', errors='ignore')

            # 1. Title
            title_match = re.search(r'<span[^>]*id="productTitle"[^>]*>([\s\S]*?)</span>', html)
            if title_match:
                title = re.sub(r'\s+', ' ', title_match.group(1)).strip()
                title = unescape(title)

            # 2. Brand
            brand_match = re.search(r'id="bylineInfo"[^>]*>([^<]+)</a>', html)
            if brand_match:
                b_text = brand_match.group(1).strip()
                b_text = re.sub(r'^(Brand:\s*|Visit the\s*|\s*Store)', '', b_text).strip()
                if b_text:
                    brand = b_text

            # 3. Price
            price_match = re.search(r'<span class="a-offscreen">(\$[0-9]+\.[0-9]{2})</span>', html)
            if price_match:
                price = price_match.group(1)

            # 4. Rating
            rating_match = re.search(r'([0-9]\.[0-9])\s*out of 5 stars', html)
            if rating_match:
                rating = float(rating_match.group(1))

            # 5. Reviews
            review_match = re.search(r'([0-9,]+)\s*ratings?', html)
            if review_match:
                review_count = int(review_match.group(1).replace(',', ''))

            # 6. Images
            img_match = re.search(r'data-a-dynamic-image="({[^"]+})"', html)
            if img_match:
                try:
                    img_dict = json.loads(unescape(img_match.group(1)))
                    # Find highest resolution image (largest width * height)
                    best_img = max(img_dict.items(), key=lambda item: item[1][0] * item[1][1])[0]
                    image_url = best_img
                except Exception:
                    pass
            
            if not image_url:
                main_img = re.search(r'id="landingImage"[^>]*src="([^"]+)"', html)
                if main_img:
                    image_url = main_img.group(1)

            # 7. Bullets
            bullet_matches = re.findall(r'<span class="a-list-item">([^<]{15,300})</span>', html)
            for b in bullet_matches[:5]:
                clean_b = re.sub(r'\s+', ' ', b).strip()
                if clean_b and not clean_b.startswith(('To calculate', 'Previous page')):
                    bullets.append(unescape(clean_b))

    except Exception as e:
        print(f"[Fetcher] Amazon web fetch notice: {e}")

    # Fallbacks if blocked or partial
    if not title:
        title = f"{brand} Fashion Staple"
    if not image_url:
        image_url = "https://lookiq.github.io/assets/favicon.png"

    slug = slugify(f"{brand}-{title}"[:40])
    if not slug:
        slug = f"product-{asin.lower() if asin else 'item'}"

    return {
        "asin": asin,
        "raw_title": title,
        "brand": brand,
        "price": price,
        "rating": rating,
        "review_count": review_count,
        "image_url": image_url,
        "bullets": bullets,
        "slug": slug,
        "affiliate_url": clean_affiliate_url,
        "short_affiliate_url": short_affiliate_url,
        "full_url": full_url
    }
