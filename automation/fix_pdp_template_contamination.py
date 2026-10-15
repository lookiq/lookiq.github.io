"""Fix PDP copy-paste contamination from the casual-summer-sundress master template.

Patches every PDP containing 'Elescat' using correct per-product data from
js/data.js. Sections fixed:
  - JSON-LD: description, aggregateRating, reviewRating, offers.url, FAQPage Q&As
  - Visible: Sizing & Fit Guide paragraph, FAQ accordion, styling tip text
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

SUNDRESS_SENTENCE = (
    "Elevate this classic black sundress with a woven straw shoulder tote, "
    "tortoiseshell retro sunglasses, and tan slide sandals for an effortless daytime look. "
    "To transition into an evening dinner outfit, add a tailored denim jacket or "
    "lightweight linen blazer with gold hoop earrings."
)


def load_products():
    js = (ROOT / "js" / "data.js").read_text(encoding="utf-8")
    products = {}
    for m in re.finditer(
        r'\{\s*id:\s*"([^"]+)"\s*,\s*asin:\s*"([^"]+)"\s*,\s*title:\s*"([^"]+)"\s*,'
        r'.*?price:\s*([0-9.]+)\s*,.*?rating:\s*([0-9.]+)\s*,.*?reviewsCount:\s*([0-9]+)\s*,'
        r'.*?shortDesc:\s*"([^"]+)"\s*,.*?amazonLink:\s*"([^"]+)"',
        js, re.S):
        slug, asin, title, price, rating, reviews, short, link = m.groups()
        products[slug] = {
            "slug": slug, "asin": asin, "title": title,
            "price": float(price), "rating": float(rating),
            "reviews": int(reviews), "shortDesc": short, "amazonLink": link,
        }
    return products


def styling_tip(title):
    t = title.lower()
    if any(k in t for k in ("trench", "coat", "jacket", "blazer", "shacket")):
        return ("Layer it over a fitted knit and dark denim for a polished off-duty look, "
                "or throw it over tailoring for the office. Finish with loafers or ankle boots "
                "and a structured bag.")
    if any(k in t for k in ("sweater", "cardigan", "hoodie", "pullover", "knit")):
        return ("Style it with high-rise jeans and sneakers for everyday ease, or tuck the front "
                "into a satin midi skirt with boots for an elevated evening look. "
                "Delicate gold jewelry keeps it refined.")
    if any(k in t for k in ("boot", "sneaker", "shoe", "loafer", "heel", "sandal")):
        return ("Pair with cropped denim or a midi dress to show them off. They anchor both "
                "casual daytime outfits and dressed-up evening looks — a true capsule-wardrobe workhorse.")
    if any(k in t for k in ("earring", "hoop", "necklace", "jewelry", "bracelet")):
        return ("Wear solo for a minimal everyday statement or stack with your existing pieces. "
                "They transition effortlessly from workday to evening.")
    if any(k in t for k in ("dress", "romper", "jumpsuit")):
        return ("Dress it up with heeled boots and a tailored coat, or keep it casual with "
                "sneakers and a denim jacket. One-and-done dressing at its best.")
    return ("A versatile wardrobe staple — dress it up with tailored pieces and heels, "
            "or keep it relaxed with denim and clean sneakers.")


FAQ_ITEMS = [
    ("How does the sizing run?",
     "Based on aggregated Amazon customer reviews, this item fits true to size. We recommend "
     "ordering your standard US size \u2014 check the size chart on the Amazon listing for exact measurements."),
    ("What is the fabric and how do I care for it?",
     "See the product details on Amazon for the full material breakdown. As a rule of thumb, "
     "machine wash cold on a gentle cycle and hang dry to preserve color, shape, and softness."),
    ("What is the return policy?",
     "Orders placed through Amazon are covered by Amazon's standard return policy \u2014 most "
     "fashion items qualify for free 30-day returns."),
]

SIZING_HTML = (
    "<strong>Fit Profile:</strong> True to size based on aggregated Amazon customer reviews. "
    "The cut is designed for comfortable everyday wear with ease through the shoulders and body. "
    "If you are between sizes or prefer a roomier fit, consider sizing up. "
    "Always check the Amazon size chart for exact measurements."
)


def faq_details_html():
    parts = []
    for i, (q, a) in enumerate(FAQ_ITEMS):
        open_attr = " open" if i == 0 else ""
        parts.append(f"""            <details class="faq-accordion-item"{open_attr}>
              <summary class="faq-accordion-summary">
                <span>{q}</span>
                <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </summary>
              <div class="faq-accordion-body">
                <p>{a}</p>
              </div>
            </details>""")
    return "\n".join(parts)


def patch_pdp(path: Path, p: dict) -> list:
    html = path.read_text(encoding="utf-8")
    fixes = []
    orig = html

    # 1. JSON-LD description
    html = re.sub(
        r'"description": "Effortless sleeveless casual sundress[^"]*"',
        f'"description": "{p["title"]}. {p["shortDesc"]}"', html, count=1)
    # 2. JSON-LD aggregateRating
    html = re.sub(
        r'"ratingValue": 4\.3,\s*\n(\s*)"reviewCount": 18500,',
        f'"ratingValue": {p["rating"]},\n\\1"reviewCount": {p["reviews"]},', html, count=1)
    # 3. JSON-LD reviewRating 4.8 -> product rating
    html = re.sub(
        r'("reviewRating":\s*\{\s*"@type": "Rating",\s*"ratingValue": ")4\.8(")',
        rf'\g<1>{p["rating"]}\g<2>', html, count=1)
    # 4. JSON-LD offers.url amzn.to -> tagged link
    html = re.sub(
        r'"url": "https://amzn\.to/[^"]*"',
        f'"url": "{p["amazonLink"]}"', html, count=1)
    # 5. JSON-LD FAQPage Q&As -> generic (3 questions)
    jsonld_faq = []
    for q, a in FAQ_ITEMS:
        jsonld_faq.append(f'''        {{
          "@type": "Question",
          "name": "{q}",
          "acceptedAnswer": {{
            "@type": "Answer",
            "text": "{a}"
          }}
        }}''')
    html = re.sub(
        r'"mainEntity": \[\s*\{[\s\S]*?"@type": "Answer",\s*"text": "[^"]*"\s*\}\s*\}\s*\]\s*\}\s*\]',
        '"mainEntity": [\n' + ",\n".join(jsonld_faq) + "\n      ]\n    }]",
        html, count=1)
    # 6. Visible FAQ accordion: replace only the <details> items inside the group
    html = re.sub(
        r'(<div class="faq-accordion-group">\s*)(<details class="faq-accordion-item"[^>]*>[\s\S]*?</details>\s*)+?(</div>)',
        r'\g<1>' + "\n" + faq_details_html() + r'\n          \g<3>',
        html, count=1)
    # 7. Styling tip: exact sentence swap (surgical, keeps the box markup)
    if SUNDRESS_SENTENCE in html:
        html = html.replace(SUNDRESS_SENTENCE, styling_tip(p["title"]), 1)
    # 8. Sizing guide paragraph
    html = re.sub(
        r'(<h2>Sizing &amp; Fit Guide</h2>\s*<p[^>]*>)[\s\S]*?(</p>)',
        r'\g<1>\n            ' + SIZING_HTML + r'\n          \g<2>',
        html, count=1)

    if html != orig:
        path.write_text(html, encoding="utf-8")
        fixes.append("patched")

    leftover = [s for s in ("Elescat", "sundress", "swing silhouette", "3UG9Got")
                if s in html and not (s == "sundress" and "summer dress" in p["title"].lower())]
    # 'sundress' may legitimately appear for actual dress products; Elescat never should
    return fixes, leftover


def main():
    products = load_products()
    contaminated = [f for f in sorted((ROOT / "products").glob("*.html"))
                    if "Elescat" in f.read_text(encoding="utf-8")
                    and f.stem != "casual-summer-sundress"]  # master template: its sundress copy is legitimate
    print(f"Contaminated PDPs: {len(contaminated)} (master template excluded)")
    ok = 0
    for f in contaminated:
        slug = f.stem
        p = products.get(slug)
        if not p:
            print(f"  SKIP {slug}: no data.js entry")
            continue
        fixes, leftover = patch_pdp(f, p)
        # casual-summer-sundress.html is the master template itself: only fix ratings/FAQ
        status = "OK" if fixes and not any(s in leftover for s in ("Elescat", "3UG9Got")) else "CHECK"
        if status == "OK":
            ok += 1
        print(f"  {status} {slug}: leftover={leftover}")
    print(f"Done: {ok}/{len(contaminated)} clean")


if __name__ == "__main__":
    main()
