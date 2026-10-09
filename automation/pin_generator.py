import os
import re
import urllib.request
from datetime import datetime, timezone
from PIL import Image, ImageOps

def create_pinterest_pin_image(
    image_url: str,
    output_path: str,
    target_width: int = 1000,
    target_height: int = 1500,
    bg_color_hex: str = "#141113"
) -> bool:
    """
    Downloads product image and generates a luxury 2:3 vertical pin (1000 x 1500 px).
    """
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    temp_img_path = output_path + ".tmp"

    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        req = urllib.request.Request(image_url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            with open(temp_img_path, 'wb') as f:
                f.write(resp.read())

        with Image.open(temp_img_path) as src:
            src = src.convert("RGB")
            
            # Create base canvas with quiet luxury charcoal background
            canvas = Image.new("RGB", (target_width, target_height), bg_color_hex)
            
            # Scale proportionally so the full garment or model is beautifully framed
            scale_w = (target_width * 0.94) / src.width
            scale_h = (target_height * 0.94) / src.height
            scale = min(scale_w, scale_h)

            new_w = int(src.width * scale)
            new_h = int(src.height * scale)
            resized = src.resize((new_w, new_h), Image.Resampling.LANCZOS)

            pos_x = (target_width - new_w) // 2
            pos_y = (target_height - new_h) // 2

            canvas.paste(resized, (pos_x, pos_y))
            canvas.save(output_path, "JPEG", quality=92)

        if os.path.exists(temp_img_path):
            os.remove(temp_img_path)
        return True

    except Exception as e:
        print(f"[PinGenerator] Error generating pin: {e}")
        if os.path.exists(temp_img_path):
            os.remove(temp_img_path)
        return False


def inject_into_feed_xml(
    feed_path: str,
    slug: str,
    title: str,
    description: str,
    hashtags: list,
    price: str,
    categories: list = None
) -> bool:
    """
    Appends a new <item> to feed.xml for Pinterest RSS auto-publish.
    """
    if not os.path.exists(feed_path):
        print(f"[PinGenerator] feed.xml not found at: {feed_path}")
        return False

    if categories is None:
        categories = ["Women's Fashion", "Amazon Fashion", "Quiet Luxury"]

    pin_url = f"https://lookiq.github.io/products/{slug}.html"
    pin_image_url = f"https://lookiq.github.io/assets/pins/{slug}-pin.jpg"
    hashtag_str = " ".join([h if h.startswith("#") else f"#{h}" for h in hashtags])
    now_utc = datetime.now(timezone.utc).strftime("%a, %d %b %Y %H:%M:%S GMT")
    
    # Strip emojis
    clean_title = re.sub(r'[\U00010000-\U0010ffff]', '', title).strip()
    if len(clean_title) > 100:
        clean_title = clean_title[:97] + "..."

    cat_tags = "\n".join([f"      <category>{c}</category>" for c in categories])

    new_item = f"""    <item>
      <title>{clean_title}</title>
      <link>{pin_url}</link>
      <guid isPermaLink="true">{pin_url}</guid>
      <description><![CDATA[<img src="{pin_image_url}" alt="{clean_title}" /><p><strong>{clean_title}</strong></p><p>{description}</p><p><strong>Verified Amazon Prime Deal:</strong> {price}</p><p><a href="{pin_url}">Explore full sizing breakdown and style review on LOOKIQ &rarr;</a></p><p>{hashtag_str}</p>]]></description>
      <pubDate>{now_utc}</pubDate>
      <enclosure url="{pin_image_url}" length="140000" type="image/jpeg" />
      <media:content url="{pin_image_url}" medium="image" type="image/jpeg">
        <media:title>{clean_title}</media:title>
        <media:description>{description} {hashtag_str}</media:description>
      </media:content>
{cat_tags}
    </item>"""

    with open(feed_path, 'r', encoding='utf-8') as f:
        feed_content = f.read()

    # Avoid duplicate entry
    if f"<guid isPermaLink=\"true\">{pin_url}</guid>" in feed_content:
        print("[PinGenerator] Product already present in feed.xml")
        return True

    if "</image>" in feed_content:
        parts = feed_content.split("</image>", 1)
        updated = parts[0] + "</image>\n\n" + new_item + parts[1]
    elif "<channel>" in feed_content:
        parts = feed_content.split("<channel>", 1)
        updated = parts[0] + "<channel>\n\n" + new_item + parts[1]
    else:
        print("[PinGenerator] Invalid feed.xml format")
        return False

    with open(feed_path, 'w', encoding='utf-8', newline='') as f:
        f.write(updated)

    print("[PinGenerator] Injected new item into feed.xml successfully!")
    return True
