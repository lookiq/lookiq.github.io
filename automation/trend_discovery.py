"""
LOOKIQ Trend Discovery v1
Daily: Google Trends (US, fashion) -> trending keywords -> Amazon search -> candidate ASINs.
Output: JSON candidates for Telegram approval -> feed approved ones into run_local.py.

Usage: python automation/trend_discovery.py [--limit 10]
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


def search_amazon_asins(keyword, max_results=3):
    """Light Amazon search scrape -> list of (asin, title). Rate-limited, best-effort."""
    q = urllib.parse.quote_plus(keyword)
    url = f"https://www.amazon.com/s?k={q}&s=relevanceblender"
    req = urllib.request.Request(url, headers=AMAZON_HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            html = r.read().decode("utf-8", "ignore")
    except Exception as e:
        print(f"[amazon] search failed for '{keyword}': {e}")
        return []
    # ASINs appear as data-asin="B0XXXXXXX"
    asins = re.findall(r'data-asin="(B0[A-Z0-9]{8}|B[A-Z0-9]{9})"', html)
    seen, out = set(), []
    for asin in asins:
        if asin not in seen:
            seen.add(asin)
            out.append(asin)
        if len(out) >= max_results:
            break
    return out


def main():
    limit = 10
    args = sys.argv[1:]
    for i, a in enumerate(args):
        if a == "--limit" and i + 1 < len(args):
            limit = int(args[i + 1])
        elif a.startswith("--limit="):
            limit = int(a.split("=", 1)[1])
    keywords = get_trending_keywords(limit)
    candidates = []
    for kw in keywords:
        asins = search_amazon_asins(kw)
        for asin in asins:
            candidates.append({
                "keyword": kw,
                "asin": asin,
                "amazon_url": f"https://www.amazon.com/dp/{asin}",
                "status": "pending_approval",
            })
        print(f"[trend] '{kw}' -> {len(asins)} ASINs")
        time.sleep(3)  # be gentle with Amazon
    out_path = "automation/trend_candidates.json"
    with open(out_path, "w") as f:
        json.dump({"candidates": candidates}, f, indent=2)
    print(f"[trend] wrote {len(candidates)} candidates -> {out_path}")


if __name__ == "__main__":
    main()
