#!/usr/bin/env python3
"""Generate lightweight WebP thumbnails (600px wide) for product card grids.

Reads every `image:` reference in js/data.js and creates
`assets/thumbs/<basename>.webp` for any missing thumbnail.
Card templates in js/app.js use thumbSrc() with onerror fallback to the
full image, so running this after adding new products keeps cards fast.

Usage: python3 automation/make_thumbs.py
"""
import os
import re
import sys

from PIL import Image

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_JS = os.path.join(REPO, "js", "data.js")
THUMB_DIR = os.path.join(REPO, "assets", "thumbs")
WIDTH = 600
QUALITY = 72


def main():
    os.makedirs(THUMB_DIR, exist_ok=True)
    with open(DATA_JS) as f:
        js = f.read()
    sources = sorted(set(re.findall(r'image: "([^"]+)"', js)))
    made, skipped, failed = 0, 0, []
    for src in sources:
        if src.startswith("http"):
            continue
        base = os.path.basename(src).rsplit(".", 1)[0]
        dst = os.path.join(THUMB_DIR, f"{base}.webp")
        if os.path.exists(dst):
            skipped += 1
            continue
        full = os.path.join(REPO, src)
        if not os.path.exists(full):
            failed.append(src)
            continue
        try:
            im = Image.open(full).convert("RGB")
            w, h = im.size
            nh = round(h * WIDTH / w)
            im.resize((WIDTH, nh), Image.LANCZOS).save(dst, "WEBP", quality=QUALITY, method=6)
            made += 1
        except Exception as e:  # noqa: BLE001
            failed.append(f"{src} ({e})")
    print(f"thumbnails made: {made}, already existed: {skipped}, failed: {len(failed)}")
    for f_ in failed:
        print("  FAILED:", f_)
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
