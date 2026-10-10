import re

with open('products/casual-summer-sundress.html', 'r', encoding='utf-8') as f:
    html = f.read()

pattern = r'<div class="product-section-block">\s*<h2>Editorial Overview</h2>\s*<p[^>]*>[\s\S]*?</p>\s*</div>'
m = re.search(pattern, html)
print('Regex match:', bool(m))
if m:
    print('Found text snippet:', m.group(0)[:80])
