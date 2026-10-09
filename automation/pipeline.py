import os
import sys
import json
import subprocess
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

def process_product(amazon_url: str, auto_push: bool = True) -> dict:
    """
    Master pipeline:
    1. Fetches Amazon product metadata and extracts ASIN.
    2. Builds PDP in products/{slug}.html.
    3. Converts image to 2:3 luxury vertical pin in assets/pins/{slug}-pin.jpg.
    4. Injects product into feed.xml for Pinterest Auto-Publish.
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

    # 2. Build PDP
    print("[2/5] Generating luxury Product Detail Page (PDP)...")
    pdp_file = save_pdp(product, str(project_root))
    pdp_url = f"{base_url}/products/{slug}.html"

    # 3. Generate 2:3 Pin Image
    print("[3/5] Converting image to strict 2:3 vertical pin (1000 x 1500 px)...")
    pin_output = project_root / "assets" / "pins" / f"{slug}-pin.jpg"
    create_pinterest_pin_image(product["image_url"], str(pin_output))

    # 4. Inject into feed.xml for Pinterest Auto-Publish
    print("[4/5] Injecting into Pinterest RSS Feed (feed.xml)...")
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

    # Dispatch to webhook if configured
    if webhook_url:
        print("[4.1/5] Dispatching multi-platform payload to webhook...")
        send_to_social_webhook(webhook_url, socials)

    # 5. Git commit & push
    if auto_push:
        print("[5/5] Deploying live to GitHub repository...")
        try:
            subprocess.run(["git", "add", "."], cwd=str(project_root), check=True)
            subprocess.run(
                ["git", "commit", "-m", f"Auto-publish curated product: {product['raw_title'][:50]}"],
                cwd=str(project_root),
                check=True
            )
            subprocess.run(["git", "push", "origin", "main"], cwd=str(project_root), check=True)
            print("  -> Git push completed! Live deployment triggered.")
        except Exception as e:
            print(f"  -> Git push skipped/error: {e}")

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
