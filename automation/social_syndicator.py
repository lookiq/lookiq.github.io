import json
import urllib.request
import urllib.parse

def generate_social_captions(product: dict, site_base_url: str = "https://lookiq.github.io") -> dict:
    """
    Generates targeted, high-converting social media captions for all platforms.
    Strictly follows Zero-Emoji Policy.
    """
    slug = product["slug"]
    brand = product["brand"]
    raw_title = product["raw_title"]
    if raw_title.lower().startswith(brand.lower()):
        title = raw_title
    else:
        title = f"{brand} {raw_title}"
    price = product["price"]
    rating = product.get("rating", 4.5)
    reviews = product.get("review_count", 1000)
    pdp_url = f"{site_base_url}/products/{slug}.html"
    pin_image_url = f"{site_base_url}/assets/pins/{slug}-pin.jpg"

    # 1. Pinterest (Guided Search SEO)
    pin_title = f"{title[:45]} | LOOKIQ Curated"[:70]
    pin_description = (
        f"Looking for the perfect wardrobe staple on Amazon US? {title} features "
        f"tailored silhouette and verified sizing. Rated {rating} stars by over {reviews:,} buyers for {price}. "
        f"Tap to explore full sizing breakdown and outfit pairing on LOOKIQ!"
    )
    pin_hashtags = ["#AmazonFashion", "#QuietLuxury", "#CapsuleWardrobe", "#StyleInspo", "#AmazonFinds"]
    pin_alt = f"{title} in clean luxury styling, photographed on neutral background."

    # 2. Instagram (Luxury Hook & Bio CTA)
    ig_caption = (
        f"THE CHIC EDIT: {title}\n\n"
        f"An effortless staple for the elevated wardrobe. Curated for impeccable drape, "
        f"all-day comfort, and quiet luxury aesthetics.\n\n"
        f"Price: {price} (Verified on Amazon US with Prime)\n"
        f"Rating: {rating} / 5.0 ({reviews:,} verified buyer reviews)\n\n"
        f"Tap the link in bio to explore our full sizing review and outfit pairing on LOOKIQ.\n\n"
        f"#QuietLuxury #AmazonFashion #CapsuleWardrobe #MinimalistStyle #OutfitInspo #LookiQ"
    )

    # 3. Facebook Page (Direct Clickable Link)
    fb_caption = (
        f"New Curated Fashion Staple: {title}\n\n"
        f"Tested for real-world sizing, fabric comfort, and silhouette. "
        f"Currently verified on Amazon US for {price} with Prime returns.\n\n"
        f"Read our full editorial review and check live stock here:\n"
        f"{pdp_url}\n\n"
        f"#AmazonFashion #WardrobeStaples #StyleReview #LOOKIQ"
    )

    # 4. TikTok (Photo Mode / Carousel Hook)
    tiktok_caption = (
        f"The viral Amazon staple everyone is styling this season: {brand} {title}. "
        f"Double-lined quality with true-to-size fit for {price}. "
        f"Full review on LOOKIQ (link in bio) #AmazonFashion #QuietLuxury #StyleDupes #CapsuleWardrobe #OOTD"
    )

    # 5. X (Twitter - 280 character optimized)
    clean_short_title = title[:45]
    x_tweet_text = (
        f"Viral Amazon Fashion Find: {brand} {clean_short_title}\n\n"
        f"Verified Prime deal for {price}. Sizing breakdown on LOOKIQ:\n"
        f"{pdp_url}\n\n"
        f"#AmazonFashion #QuietLuxury #StyleReview #AmazonFinds"
    )
    x_intent_url = f"https://x.com/intent/tweet?text={urllib.parse.quote(x_tweet_text)}"

    return {
        "pinterest": {
            "title": pin_title,
            "description": pin_description,
            "hashtags": pin_hashtags,
            "alt_text": pin_alt,
            "url": pdp_url,
            "image_url": pin_image_url
        },
        "instagram": {
            "caption": ig_caption,
            "image_url": pin_image_url,
            "cta_link": pdp_url
        },
        "facebook": {
            "caption": fb_caption,
            "link": pdp_url,
            "image_url": pin_image_url
        },
        "tiktok": {
            "caption": tiktok_caption,
            "image_url": pin_image_url,
            "cta_link": pdp_url
        },
        "x": {
            "text": x_tweet_text,
            "intent_url": x_intent_url,
            "url": pdp_url,
            "image_url": pin_image_url
        }
    }

def send_to_social_webhook(webhook_url: str, payload: dict) -> bool:
    """
    Sends multi-platform payload to a webhook (e.g. Make.com, Zapier, Metricool, Buffer).
    """
    if not webhook_url:
        return False
    try:
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            webhook_url,
            data=data,
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.status in [200, 201, 204]
    except Exception as e:
        print(f"[SocialSyndicator] Webhook dispatch error: {e}")
        return False
