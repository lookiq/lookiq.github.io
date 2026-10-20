"""Regenerate sitemap.xml: all core pages + all real (non-redirect) product pages."""
import os
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = "https://lookiq.github.io"
today = date.today().isoformat()

core_pages = [
    ("", "daily", "1.0"),
    ("shop.html", "daily", "0.95"),
    ("look-for-less.html", "weekly", "0.9"),
    ("lookbook.html", "weekly", "0.85"),
    ("guides.html", "weekly", "0.8"),
    ("about.html", "monthly", "0.6"),
    ("contact.html", "monthly", "0.5"),
    ("privacy-policy.html", "yearly", "0.3"),
]

urls = []
for page, freq, prio in core_pages:
    loc = f"{BASE}/{page}" if page else f"{BASE}/"
    urls.append((loc, today if freq == "daily" else "2026-10-10", freq, prio))

# Individual guide pages (guides/<slug>.html)
guides_dir = ROOT / "guides"
if guides_dir.is_dir():
    for f in sorted(guides_dir.glob("*.html")):
        urls.append((f"{BASE}/guides/{f.name}", today, "weekly", "0.8"))

# Real product pages only (skip meta-refresh redirect stubs)
for f in sorted((ROOT / "products").glob("*.html")):
    html = f.read_text(encoding="utf-8", errors="ignore")
    if 'http-equiv="refresh"' in html:
        continue
    urls.append((f"{BASE}/products/{f.name}", today, "weekly", "0.85"))

xml = ['<?xml version="1.0" encoding="UTF-8"?>',
       '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for loc, lastmod, freq, prio in urls:
    xml.append("  <url>")
    xml.append(f"    <loc>{loc}</loc>")
    xml.append(f"    <lastmod>{lastmod}</lastmod>")
    xml.append(f"    <changefreq>{freq}</changefreq>")
    xml.append(f"    <priority>{prio}</priority>")
    xml.append("  </url>")
xml.append("</urlset>")

(ROOT / "sitemap.xml").write_text("\n".join(xml) + "\n", encoding="utf-8")
print(f"sitemap.xml regenerated: {len(urls)} URLs ({len(urls)-len(core_pages)} products)")
