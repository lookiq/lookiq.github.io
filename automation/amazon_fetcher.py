import re
import json
import urllib.request
import urllib.parse
from html import unescape

def resolve_amazon_url(url: str) -> str:
    """Follows redirects for Amazon shortlinks (amzn.to, link.amazon, a.co, amzlinks) to find full URL."""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=12) as response:
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
    if any(x in input_url for x in ["amzn.to", "link.amazon", "a.co", "amzlinks"]):
        short_affiliate_url = input_url
    else:
        short_affiliate_url = clean_affiliate_url

    headers = {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
    }

    title = ""
    brand = "LOOKIQ Curated"
    price = "$39.99"
    rating = 4.6
    review_count = 1420
    image_url = ""
    bullets = []

    try:
        dp_url = f"https://www.amazon.com/dp/{asin}" if asin else full_url
        req = urllib.request.Request(dp_url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as response:
            html = response.read().decode('utf-8', errors='ignore')

            # 1. Title extraction
            title_match = re.search(r'<span[^>]*id="productTitle"[^>]*>([\s\S]*?)</span>', html)
            if title_match:
                title = re.sub(r'\s+', ' ', title_match.group(1)).strip()
                title = unescape(title)

            if not title or len(title) < 5:
                # Check <title> tag
                page_title = re.search(r'<title>([\s\S]*?)</title>', html)
                if page_title:
                    raw_p = page_title.group(1).strip()
                    raw_p = re.sub(r'\s*:\s*(?:Clothing|Shoes|Electronics|Home|Beauty|Sports).*$', '', raw_p, flags=re.I)
                    raw_p = re.sub(r'^Amazon\.com:\s*', '', raw_p, flags=re.I)
                    raw_p = re.sub(r'\s+at Amazon.*$', '', raw_p, flags=re.I)
                    if raw_p and not 'Robot Check' in raw_p and not 'Page Not Found' in raw_p:
                        title = unescape(raw_p)

            # Fallback to URL path slug if title still missing
            if not title or len(title) < 5:
                slug_match = re.search(r'amazon\.[a-z\.]+/([^/?]+)/dp/', full_url)
                if slug_match:
                    title = slug_match.group(1).replace('-', ' ').strip()

            # Clean pipe descriptions from title
            if '|' in title:
                title = title.split('|')[0].strip()

            # 2. Brand extraction
            brand_match = re.search(r'id="bylineInfo"[^>]*>([^<]+)</a>', html)
            if brand_match:
                b_text = brand_match.group(1).strip()
                b_text = re.sub(r'^(Brand:\s*|Visit the\s*|\s*Store)', '', b_text, flags=re.I).strip()
                if b_text:
                    brand = b_text
            
            if brand == "LOOKIQ Curated" and title:
                first_word = title.split()[0].strip()
                if first_word.isalnum() and len(first_word) >= 3:
                    brand = first_word

            # 3. Price extraction
            price_match = re.search(r'<span class="a-offscreen">(\$[0-9]+\.[0-9]{2})</span>', html)
            if price_match:
                price = price_match.group(1)
            else:
                price_match2 = re.search(r'"priceAmount":\s*([0-9]+\.[0-9]{2})', html)
                if price_match2:
                    price = f"${price_match2.group(1)}"

            # 4. Rating extraction
            rating_match = re.search(r'([0-9]\.[0-9])\s*out of 5 stars', html)
            if rating_match:
                rating = float(rating_match.group(1))

            # 5. Review count extraction
            review_match = re.search(r'([0-9,]+)\s*ratings?', html)
            if review_match:
                review_count = int(review_match.group(1).replace(',', ''))

            # 6. High-Resolution Product Image
            img_match = re.search(r'data-a-dynamic-image="({[^"]+})"', html)
            if img_match:
                try:
                    img_dict = json.loads(unescape(img_match.group(1)))
                    # Exclude promotional banners in /images/G/ and pick actual product photos in /images/I/
                    item_imgs = {k: v for k, v in img_dict.items() if '/images/I/' in k}
                    if item_imgs:
                        best_img = max(item_imgs.items(), key=lambda item: item[1][0] * item[1][1])[0]
                        image_url = best_img
                except Exception:
                    pass
            
            if not image_url or '/images/I/' not in image_url:
                main_img = re.search(r'id="landingImage"[^>]*src="([^"]+)"', html)
                if main_img and '/images/I/' in main_img.group(1):
                    image_url = main_img.group(1)

            if not image_url or '/images/I/' not in image_url:
                all_imgs = re.findall(r'https://m\.media-amazon\.com/images/I/([A-Za-z0-9%_\+\.-]+)\.jpg', html)
                clean_imgs = [i for i in all_imgs if not any(x in i for x in ['_SX38_', '_SY38_', '_AC_US40_', '_CR', '_SS40_', 'G/01'])]
                if clean_imgs:
                    base_id = clean_imgs[0].split('.')[0]
                    image_url = f"https://m.media-amazon.com/images/I/{base_id}.jpg"

            # 7. Bullet features
            bullet_matches = re.findall(r'<span class="a-list-item">([^<]{15,300})</span>', html)
            for b in bullet_matches[:5]:
                clean_b = re.sub(r'\s+', ' ', b).strip()
                if clean_b and not clean_b.startswith(('To calculate', 'Previous page', 'Select')):
                    bullets.append(unescape(clean_b))

    except Exception as e:
        print(f"[Fetcher] Amazon web fetch notice: {e}")

    # Fallbacks if blocked or partial
    if not title:
        title = f"{brand} Fashion Staple"
    if not image_url:
        image_url = "https://lookiq.github.io/assets/favicon.png"

    if title.lower().startswith(brand.lower()):
        slug_src = title[:40]
    else:
        slug_src = f"{brand}-{title}"[:40]
    slug = slugify(slug_src)
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
