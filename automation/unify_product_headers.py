import glob
import re
from pathlib import Path

def unify_headers():
    files = sorted(glob.glob("products/*.html"))
    updated_count = 0

    target_header_actions = """      <div class="header-actions">
        <!-- Spotlight Quick Search Trigger -->
        <a href="../shop.html" class="action-btn header-search-trigger" id="header-search-btn" title="Quick Search" aria-label="Search Products">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </a>

        <!-- Wishlist Button -->
        <a href="../shop.html" class="action-btn wishlist-trigger" id="wishlist-header-btn" title="Saved Favorites" aria-label="Saved Favorites">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span class="badge-counter" id="wishlist-counter">0</span>
        </a>

        <!-- Mobile Hamburger Menu Button -->
        <button class="mobile-menu-toggle action-btn" id="mobile-menu-toggle" aria-label="Open Navigation Menu" aria-expanded="false">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>"""

    for f in files:
        with open(f, "r", encoding="utf-8") as fp:
            html = fp.read()

        changed = False

        # 1. Ensure SHOP is marked active in main-nav
        old_nav = """      <nav class="main-nav" aria-label="Main Navigation">
        <a href="../index.html" class="nav-link">HOME</a>
        <a href="../look-for-less.html" class="nav-link">LOOK FOR LESS</a>
        <a href="../lookbook.html" class="nav-link">LOOKBOOK</a>
        <a href="../shop.html" class="nav-link">SHOP</a>
        <a href="../guides.html" class="nav-link">GUIDES</a>
      </nav>"""

        new_nav = """      <nav class="main-nav" aria-label="Main Navigation">
        <a href="../index.html" class="nav-link">HOME</a>
        <a href="../look-for-less.html" class="nav-link">LOOK FOR LESS</a>
        <a href="../lookbook.html" class="nav-link">LOOKBOOK</a>
        <a href="../shop.html" class="nav-link active">SHOP</a>
        <a href="../guides.html" class="nav-link">GUIDES</a>
      </nav>"""

        if old_nav in html:
            html = html.replace(old_nav, new_nav)
            changed = True
        elif '<a href="../shop.html" class="nav-link active">SHOP</a>' not in html:
            html = html.replace('<a href="../shop.html" class="nav-link">SHOP</a>', '<a href="../shop.html" class="nav-link active">SHOP</a>')
            changed = True

        # 2. Replace anomalous Shop Trending button in header-actions
        pattern = r'<div class="header-actions">[\s\S]*?<a href="\.\./shop\.html" class="btn-primary desktop-only-cta"[\s\S]*?</div>'
        if re.search(pattern, html):
            html = re.sub(pattern, target_header_actions, html)
            changed = True

        if changed:
            with open(f, "w", encoding="utf-8") as fp:
                fp.write(html)
            updated_count += 1
            print(f"Updated header in {f}")

    print(f"\nTotal product pages updated with unified header: {updated_count}")

if __name__ == "__main__":
    unify_headers()
