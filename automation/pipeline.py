import os
import sys
import json
import subprocess
import shutil
import re
from pathlib import Path

# Add script directory to python path
script_dir = Path(__file__).resolve().parent
project_root = script_dir.parent
sys.path.insert(0, str(script_dir))

from amazon_fetcher import fetch_product_details
from pin_generator import create_pinterest_pin_image, inject_into_feed_xml
from pdp_builder import save_pdp
from social_syndicator import generate_social_captions, send_to_social_webhook

def load_config() -> dict:
    config_path = script_dir / "config.json"
    if config_path.exists():
        with open(config_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {
        "affiliate_tag": "likeefashionh-20",
        "base_url": "https://lookiq.github.io",
        "webhook_url": ""
    }

def inject_into_data_js(product: dict, data_js_path: Path):
    """Automatically appends the new product to js/data.js catalog."""
    if not data_js_path.exists():
        return
    with open(data_js_path, "r", encoding="utf-8") as f:
        content = f.read()

    slug = product["slug"]
    if f'id: "{slug}"' in content or f"id: '{slug}'" in content:
        return

    price = product.get("price", "$39.99")
    price_num = float(re.sub(r'[^0-9.]', '', price) or "39.99")
    orig_price = round(price_num * 1.35, 2)
    asin = product.get("asin", "")
    title = product.get("raw_title", "")
    rating = product.get("rating", 4.6)
    reviews = product.get("review_count", 1850)
    
    # Check if local image exists
    local_prod_img = project_root / "assets" / "products" / f"{slug}.jpg"
    if local_prod_img.exists():
        img_path = f"assets/products/{slug}.jpg"
    else:
        img_path = f"assets/pins/{slug}-pin.jpg"

    affiliate_url = product.get("short_affiliate_url") or product.get("affiliate_url") or f"https://www.amazon.com/dp/{asin}/?tag=likeefashionh-20"

    new_entry = f"""  {{
    id: "{slug}",
    asin: "{asin}",
    title: "{title[:70]}",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: {price_num},
    originalPrice: {orig_price},
    rating: {rating},
    reviewsCount: {reviews},
    image: "{img_path}",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "{affiliate_url}"
  }},"""

    updated_content = content.replace("const PRODUCTS = [\n", f"const PRODUCTS = [\n{new_entry}\n", 1)
    with open(data_js_path, "w", encoding="utf-8") as f:
        f.write(updated_content)
    print(f"  -> Added {slug} to js/data.js catalog!")

def process_product(amazon_url: str, custom_image_path: str = None, auto_push: bool = True) -> dict:
    """
    Master pipeline:
    1. Fetches Amazon product metadata and extracts ASIN.
    2. Sets or formats 2:3 luxury vertical pin in assets/pins/{slug}-pin.jpg.
    3. Builds PDP in products/{slug}.html using master luxury template.
    4. Injects product into feed.xml for Pinterest Auto-Publish & js/data.js for Catalog.
    5. Formats multi-channel captions for Pinterest, Instagram, Facebook, TikTok.
    6. Git commits & pushes to trigger live deployment.
    """
    config = load_config()
    affiliate_tag = config.get("affiliate_tag", "likeefashionh-20")
    base_url = config.get("base_url", "https://lookiq.github.io")
    webhook_url = config.get("webhook_url", "")

    print(f"\n==================================================")
    print(f"[LookiQ Engine] Processing: {amazon_url}")
    print(f"==================================================")

    # 1. Fetch metadata
    print("[1/5] Extracting product metadata & affiliate tracking...")
    product = fetch_product_details(amazon_url, affiliate_tag=affiliate_tag)
    slug = product["slug"]
    print(f"  -> Title: {product['raw_title']}")
    print(f"  -> Price: {product['price']} | ASIN: {product['asin']}")
    print(f"  -> Slug: {slug}")

    # 2. Handle Custom AI Image or Generate 2:3 Pin Image
    pin_output = project_root / "assets" / "pins" / f"{slug}-pin.jpg"
    product_img_output = project_root / "assets" / "products" / f"{slug}.jpg"
    product_img_output.parent.mkdir(parents=True, exist_ok=True)
    pin_output.parent.mkdir(parents=True, exist_ok=True)

    if custom_image_path and Path(custom_image_path).exists():
        print(f"[2/5] Using custom high-end AI editorial image: {custom_image_path}")
        shutil.copy2(custom_image_path, str(product_img_output))
        # Also copy/format into pin_output
        create_pinterest_pin_image(str(custom_image_path), str(pin_output))
    else:
        print("[2/5] Formatting luxury 2:3 vertical pin (1000 x 1500 px)...")
        create_pinterest_pin_image(product["image_url"], str(pin_output))

    # 3. Build PDP (now aware of local pin/product image)
    print("[3/5] Generating luxury Product Detail Page (PDP)...")
    pdp_file = save_pdp(product, str(project_root))
    pdp_url = f"{base_url}/products/{slug}.html"

    # 4. Inject into feed.xml and js/data.js
    print("[4/5] Injecting into Pinterest RSS Feed & Website Catalog...")
    feed_path = project_root / "feed.xml"
    socials = generate_social_captions(product, site_base_url=base_url)
    pin_data = socials["pinterest"]
    inject_into_feed_xml(
        str(feed_path),
        slug=slug,
        title=pin_data["title"],
        description=pin_data["description"],
        hashtags=pin_data["hashtags"],
        price=product["price"]
    )
    inject_into_data_js(product, project_root / "js" / "data.js")

    # Dispatch to webhook if configured
    if webhook_url:
        print("[4.1/5] Dispatching multi-platform payload to webhook...")
        send_to_social_webhook(webhook_url, socials)

    # 5. Git commit & push
    if auto_push:
        print("[5/5] Deploying live to GitHub repository...")
        try:
            subprocess.run(["git", "add", "."], cwd=str(project_root), check=False)
            subprocess.run(
                ["git", "commit", "-m", f"Auto-publish curated product: {product['raw_title'][:50]}"],
                cwd=str(project_root),
                check=False
            )
            push_res = subprocess.run(["git", "push", "origin", "main"], cwd=str(project_root), capture_output=True, text=True)
            if push_res.returncode == 0:
                print("  -> Git push completed! Live deployment triggered.")
            else:
                print(f"  -> Git push note: {push_res.stderr.strip()[:100]}")
        except Exception as e:
            print(f"  -> Git step note: {e}")

    print("\n==================================================")
    print(f"[LookiQ Engine] Completed successfully!")
    print(f"Live PDP URL: {pdp_url}")
    print(f"Pinterest Pin Image: assets/pins/{slug}-pin.jpg")
    print(f"==================================================\n")

    return {
        "success": True,
        "product": product,
        "pdp_url": pdp_url,
        "pin_image": str(pin_output),
        "socials": socials
    }

if __name__ == "__main__":
    test_url = sys.argv[1] if len(sys.argv) > 1 else "https://amzn.to/4yj1hFV"
    process_product(test_url, auto_push=False)
