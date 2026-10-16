"""
LOOKIQ Trend Discovery v2
Daily: Amazon's own sales-velocity signals (Movers & Shakers, New Releases,
Best Sellers in fashion) -> candidate ASINs, with Google Trends keyword
search as a filler/fallback -> JSON candidates.

Usage: python automation/trend_discovery.py [--limit 10]

Why v2: Google Trends captures search interest, but Amazon's Movers & Shakers
captures actual purchase velocity on Amazon (biggest 24h sales-rank gainers) —
the literal "trending products" signal for an Amazon-affiliate site. It also
eliminates the junk-ASIN problem of raw search results (sponsored items,
irrelevant matches), because bestseller lists are curated by sales rank.
"""
import json
import re
import sys
import time
import urllib.request
import urllib.parse

try:
    from pytrends.request import TrendReq
    HAS_PYTRENDS = True
except ImportError:
    HAS_PYTRENDS = False

# Fallback seed keywords when Google Trends is unreachable
SEED_KEYWORDS = [
    "oversized sweater women", "chelsea boots women", "gold hoop earrings",
    "hobo bag", "workout romper", "trench coat women", "white sneakers women",
    "knit cardigan", "wide leg trousers", "straw tote bag",
]

AMAZON_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}

# Primary trend signal: Amazon's own sales-velocity lists for fashion.
# Order matters — movers-and-shakers first (24h gainers = truly "trending"),
# then new releases (fresh momentum), then best sellers (proven winners).
# 7147440011 = Women's Fashion node.
BESTSELLER_SOURCES = [
    ("amazon_movers_shakers", "https://www.amazon.com/gp/movers-and-shakers/fashion/"),
    ("amazon_new_releases", "https://www.amazon.com/gp/new-releases/fashion/7147440011"),
    ("amazon_best_sellers", "https://www.amazon.com/gp/bestsellers/fashion/7147440011"),
]

ASIN_RX = re.compile(r'data-asin="(B0[A-Z0-9]{8}|B[A-Z0-9]{9})"')


def get_trending_keywords(limit=10):
    """Pull trending fashion searches from Google Trends (US). Falls back to seeds."""
    if not HAS_PYTRENDS:
        print("[trend] pytrends not installed, using seed keywords")
        return SEED_KEYWORDS[:limit]
    try:
        pt = TrendReq(hl="en-US", tz=360, timeout=(10, 25))
        # Trending searches in the US, then filter fashion-ish terms
        trending = pt.trending_searches(pn="united_states")
        raw = [str(x) for x in trending[0].tolist()]
        fashion_rx = re.compile(
            r"dress|jean|shoe|sneaker|boot|bag|jacket|coat|sweater|cardigan|top|skirt|"
            r"jewel|earring|watch|hat|scarf|fashion|outfit|style|denim|knit|silk|satin",
            re.I,
        )
        fashion = [k for k in raw if fashion_rx.search(k)]
        # Pad with seeds if too few fashion terms trending
        for s in SEED_KEYWORDS:
            if len(fashion) >= limit:
                break
            if s not in fashion:
                fashion.append(s)
        print(f"[trend] {len(fashion)} keywords from Google Trends")
        return fashion[:limit]
    except Exception as e:
        print(f"[trend] Google Trends failed ({e}), using seeds")
        return SEED_KEYWORDS[:limit]


def extract_asins(html):
    """Pull unique ASINs from an Amazon listing page's HTML, in page order."""
    seen, out = set(), []
    for asin in ASIN_RX.findall(html):
        if asin not in seen:
            seen.add(asin)
            out.append(asin)
    return out


def fetch_listing_asins(url, max_results=3, label="listing"):
    """Fetch an Amazon listing page and return up to max_results ASINs. [] on any failure."""
    req = urllib.request.Request(url, headers=AMAZON_HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            html = r.read().decode("utf-8", "ignore")
    except Exception as e:
        print(f"[amazon] {label} fetch failed ({url}): {e}")
        return []
    asins = extract_asins(html)[:max_results]
    print(f"[amazon] {label} -> {len(asins)} ASINs")
    return asins


def search_amazon_asins(keyword, max_results=3):
    """Light Amazon search scrape -> list of ASINs. Rate-limited, best-effort."""
    q = urllib.parse.quote_plus(keyword)
    url = f"https://www.amazon.com/s?k={q}&s=relevanceblender"
    return fetch_listing_asins(url, max_results, label=f"search '{keyword}'")


def fetch_bestseller_asins(per_source=4):
    """Primary signal: ASINs from Amazon's fashion sales-velocity lists."""
    out = []
    for source_name, url in BESTSELLER_SOURCES:
        asins = fetch_listing_asins(url, per_source, label=source_name)
        for asin in asins:
            out.append((source_name, asin))
        time.sleep(3)  # be gentle with Amazon
    return out


def main():
    limit = 10
    args = sys.argv[1:]
    for i, a in enumerate(args):
        if a == "--limit" and i + 1 < len(args):
            limit = int(args[i + 1])
        elif a.startswith("--limit="):
            limit = int(a.split("=", 1)[1])

    candidates = []
    seen_asins = set()

    def add_candidate(asin, keyword, source):
        if asin in seen_asins:
            return
        seen_asins.add(asin)
        candidates.append({
            "keyword": keyword,
            "asin": asin,
            "amazon_url": f"https://www.amazon.com/dp/{asin}",
            "source": source,
            "status": "pending_approval",
        })

    # 1) Primary: Amazon sales-velocity lists (purchase-proven, junk-free)
    for source_name, asin in fetch_bestseller_asins(per_source=4):
        add_candidate(asin, source_name.replace("amazon_", "").replace("_", " "), source_name)
    print(f"[trend] bestseller sources -> {len(candidates)} unique ASINs")

    # 2) Filler: Google Trends keyword search (old v1 behavior, kept as fallback)
    keywords = get_trending_keywords(limit)
    for kw in keywords:
        for asin in search_amazon_asins(kw):
            add_candidate(asin, kw, "google_trends_search")
        print(f"[trend] '{kw}' -> candidates so far: {len(candidates)}")
        time.sleep(3)  # be gentle with Amazon

    out_path = "automation/trend_candidates.json"
    with open(out_path, "w") as f:
        json.dump({"candidates": candidates}, f, indent=2)
    print(f"[trend] wrote {len(candidates)} candidates -> {out_path}")


if __name__ == "__main__":
    main()
