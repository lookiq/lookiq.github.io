import os

html_files = [
    'index.html',
    'about.html',
    'contact.html',
    'privacy-policy.html',
    'shop.html',
    'look-for-less.html',
    'lookbook.html',
    'guides.html'
]

# 1. Update footer-social-bar across all 8 HTML files
old_tiktok_btn = 'href="https://tiktok.com" target="_blank" rel="noopener noreferrer" class="social-micro-btn" aria-label="TikTok" title="Follow LOOKIQ on TikTok"'
new_tiktok_btn = 'href="https://www.tiktok.com/@lookiqfashion" target="_blank" rel="noopener noreferrer" class="social-micro-btn" aria-label="TikTok" title="Follow LOOKIQ on TikTok"'

# 2. Update footer links list
old_feed_block = '<li><a href="https://www.instagram.com/lookiqfashion/" target="_blank" rel="noopener noreferrer">Instagram @lookiqfashion</a></li>'
new_feed_block = '<li><a href="https://www.instagram.com/lookiqfashion/" target="_blank" rel="noopener noreferrer">Instagram @lookiqfashion</a></li>\n            <li><a href="https://www.tiktok.com/@lookiqfashion" target="_blank" rel="noopener noreferrer">TikTok @lookiqfashion</a></li>'

for page in html_files:
    with open(page, 'r', encoding='utf-8', newline='') as f:
        content = f.read()

    # Footer social micro button
    if old_tiktok_btn in content:
        content = content.replace(old_tiktok_btn, new_tiktok_btn, 1)
        print(f"Updated footer social button in {page}")

    # Footer link list
    if old_feed_block in content and 'TikTok @lookiqfashion' not in content:
        content = content.replace(old_feed_block, new_feed_block, 1)
        print(f"Added TikTok to footer link list in {page}")

    with open(page, 'w', encoding='utf-8', newline='') as f:
        f.write(content)

# 3. Update index.html JSON-LD schema
with open('index.html', 'r', encoding='utf-8', newline='') as f:
    idx = f.read()

idx = idx.replace('"https://tiktok.com/@lookiqfashion"', '"https://www.tiktok.com/@lookiqfashion"')
with open('index.html', 'w', encoding='utf-8', newline='') as f:
    f.write(idx)
print("Updated index.html schema")

# 4. Update top announcement bar in about.html, contact.html, privacy-policy.html
tiktok_pill = '''        <a href="https://www.tiktok.com/@lookiqfashion" target="_blank" rel="noopener noreferrer" class="social-pill-link" title="Follow LOOKIQ on TikTok">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.38 0 .74.07 1.07.2v-3.56a6.34 6.34 0 0 0-1.07-.09A6.34 6.34 0 0 0 3 15.67a6.34 6.34 0 0 0 6.34 6.33 6.34 6.34 0 0 0 6.34-6.33V9.28a8.28 8.28 0 0 0 4.91 1.58V7.41a4.83 4.83 0 0 1-1-.72z"/>
          </svg>
          <span>TikTok @lookiqfashion</span>
        </a>'''

announcement_pages = ['about.html', 'contact.html', 'privacy-policy.html']
for page in announcement_pages:
    with open(page, 'r', encoding='utf-8', newline='') as f:
        content = f.read()

    # Find the Instagram pill in announcement bar and append TikTok pill
    insta_pill_target = '<span>Instagram @lookiqfashion</span>\r\n        </a>'
    insta_pill_target_unix = '<span>Instagram @lookiqfashion</span>\n        </a>'

    if insta_pill_target in content:
        replacement = insta_pill_target + '\r\n' + tiktok_pill.replace('\n', '\r\n')
        content = content.replace(insta_pill_target, replacement, 1)
        print(f"Added TikTok pill to announcement bar in {page}")
    elif insta_pill_target_unix in content:
        replacement = insta_pill_target_unix + '\n' + tiktok_pill
        content = content.replace(insta_pill_target_unix, replacement, 1)
        print(f"Added TikTok pill to announcement bar in {page}")
    else:
        print(f"Could not find announcement insta pill in {page}")

    with open(page, 'w', encoding='utf-8', newline='') as f:
        f.write(content)

print("All TikTok links successfully integrated.")
