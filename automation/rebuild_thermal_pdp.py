import re
from pathlib import Path

def rebuild_thermal_pdp():
    base_file = Path("products/casual-summer-sundress.html")
    target_file = Path("products/thermal-underwear-for-women-long-johns-s.html")
    
    with open(base_file, "r", encoding="utf-8") as f:
        html = f.read()

    # Replacements
    # Title & Meta
    html = html.replace("<title>Elescat Summer Sundress with Pockets | LOOKIQ Review</title>", 
                        "<title>Thermajane Women's Fleece Lined Thermal Underwear Set | LOOKIQ Review</title>")
    html = re.sub(r'<meta name="description" content="[^"]*">',
                  '<meta name="description" content="Curated review: Thermajane Ultra Soft Fleece-Lined Thermal Underwear Set on Amazon for $19.99. Rated 4.6 stars by 14,200+ buyers. Check warmth, fleece lining & winter layering tips on LOOKIQ.">',
                  html, count=1)
    html = html.replace("casual-summer-sundress.html", "thermal-underwear-for-women-long-johns-s.html")
    
    # Open Graph & Twitter
    html = html.replace("Elescat Summer Sundress with Pockets | LOOKIQ", "Thermajane Women's Fleece Lined Thermal Underwear Set | LOOKIQ")
    html = html.replace("https://lookiq.github.io/assets/pins/casual-summer-sundress-pin.jpg", "https://lookiq.github.io/assets/pins/thermal-underwear-for-women-long-johns-s-pin.jpg")
    html = re.sub(r'<meta property="og:description" content="[^"]*">',
                  '<meta property="og:description" content="Curated review of Thermajane Women\'s Ultra Soft Fleece-Lined Thermal Underwear Set. Moisture-wicking poly-spandex blend with four-way stretch. Verified Amazon deal at $19.99.">',
                  html)
    html = re.sub(r'<meta name="twitter:description" content="[^"]*">',
                  '<meta name="twitter:description" content="Curated review of Thermajane Women\'s Ultra Soft Fleece-Lined Thermal Underwear Set. Moisture-wicking poly-spandex blend with four-way stretch. Verified Amazon deal at $19.99.">',
                  html)
    html = re.sub(r'<meta property="product:price:amount" content="[^"]*">',
                  '<meta property="product:price:amount" content="19.99">',
                  html)

    # Schema JSON-LD
    html = html.replace("Elescat Women's Casual Sleeveless Summer Sundress with Pockets", "Thermajane Women's Fleece Lined Thermal Underwear Set")
    html = html.replace("Effortless sleeveless casual sundress featuring a flattering scoop neckline, functional side pockets, and airy swing silhouette. Lightweight breathable rayon blend for summer chic styling.",
                        "Ultra-soft fleece-lined thermal base layer set designed for winter warmth without bulk. Features moisture-wicking poly-spandex fabric with 4-way stretch for flexible layering under work or outdoor clothing.")
    html = html.replace("https://lookiq.github.io/assets/elescat-summer-dress.png", "https://lookiq.github.io/assets/products/thermal-underwear-model.jpg")
    html = html.replace("https://lookiq.github.io/assets/elescat-summer-dress.webp", "https://lookiq.github.io/assets/products/thermal-underwear-model.jpg")
    html = html.replace("../assets/elescat-summer-dress.webp", "../assets/products/thermal-underwear-model.jpg")
    html = html.replace("B09N72QM68", "B088H5DWV3")
    html = html.replace('"name": "Elescat"', '"name": "Thermajane"')
    html = html.replace('"category": "women"', '"category": "Thermal Underwear & Base Layers"')
    html = html.replace('"ratingValue": "4.8"', '"ratingValue": "4.6"')
    html = html.replace('"ratingValue": 4.3,', '"ratingValue": 4.6,')
    html = html.replace('"reviewCount": 18500,', '"reviewCount": 14213,')
    html = html.replace('"price": "24.99"', '"price": "19.99"')
    html = html.replace("https://amzn.to/3UG9Got", "https://www.amazon.com/dp/B088H5DWV3/?tag=likeefashionh-20")

    # Breadcrumb
    html = html.replace('<span class="current" title="Elescat Women\'s Casual Sleeveless Summer Sundress with Pockets">Elescat Women\'s Casual Sleeveless Summer Sundress with Pockets</span>',
                        '<span class="current" title="Thermajane Women\'s Fleece Lined Thermal Underwear Set">Thermajane Women\'s Fleece Lined Thermal Underwear Set</span>')

    # Badge & Image box
    html = html.replace('Viral Summer Favorite', 'Winter Warmth Essential')
    html = html.replace('openFullscreenLightbox(\'https://lookiq.github.io/assets/elescat-summer-dress.webp\', \'Elescat Women\\\'s Casual Sleeveless Summer Sundress with Pockets\')',
                        'openFullscreenLightbox(\'https://lookiq.github.io/assets/products/thermal-underwear-model.jpg\', \'Thermajane Women\\\'s Fleece Lined Thermal Underwear Set\')')
    html = html.replace('Elescat%20Women%27s%20Casual%20Sleeveless%20Summer%20Sundress%20with%20Pockets%20-%20Verified%20Amazon%20Find%20on%20LOOKIQ',
                        'Thermajane%20Women%27s%20Fleece%20Lined%20Thermal%20Underwear%20Set%20-%20Verified%20Amazon%20Find%20on%20LOOKIQ')
    html = html.replace('alt="Elescat Women\'s Casual Sleeveless Summer Sundress with Pockets in Black"',
                        'alt="Thermajane Women\'s Fleece Lined Thermal Underwear Set in Black"')

    # Product Meta Header
    html = html.replace('<span>Elescat</span>\n          <span>&bull;</span>\n          <span>Dresses</span>',
                        '<span>Thermajane</span>\n          <span>&bull;</span>\n          <span>Thermal Underwear</span>')

    # Product Title
    html = html.replace('<h1 class="product-page-title">Elescat Women\'s Casual Sleeveless Summer Sundress with Pockets</h1>',
                        '<h1 class="product-page-title">Thermajane Women\'s Fleece Lined Thermal Underwear Set</h1>')

    # Rating & Price
    html = html.replace('4.3 out of 5', '4.6 out of 5')
    html = html.replace('(18,500+ verified Amazon ratings)', '(14,213 verified Amazon ratings)')
    html = html.replace('<span class="price-value">$24.99</span>', '<span class="price-value">$19.99</span>')
    html = html.replace('<span class="price-original-val">$32.99</span>', '<span class="price-original-val">$29.99</span>')
    html = html.replace('<span class="product-page-discount">Save 24%</span>', '<span class="product-page-discount">Save 33%</span>')

    # Amazon Link
    html = html.replace('href="https://amzn.to/3UG9Got"', 'href="https://www.amazon.com/dp/B088H5DWV3/?tag=likeefashionh-20"')

    # Mobile sticky bar
    html = html.replace('<span class="sticky-bar-title">Elescat Summer Sundress</span>',
                        '<span class="sticky-bar-title">Thermajane Thermal Set</span>')
    html = html.replace('<span class="sticky-bar-price">$24.99</span>',
                        '<span class="sticky-bar-price">$19.99</span>')

    # Clean any replacement characters
    html = html.replace('\ufffd', '&bull;')

    with open(target_file, "w", encoding="utf-8") as f:
        f.write(html)
    
    print(f"Successfully rebuilt {target_file}")

if __name__ == '__main__':
    rebuild_thermal_pdp()
