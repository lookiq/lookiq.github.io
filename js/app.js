/**
 * LOOKIQ - Application Logic & Interactive Storefront Controller
 * Handles Filtering, Search, Modals, Wishlist, and Amazon Conversion Tracking
 */

document.addEventListener("DOMContentLoaded", () => {
  // State
  let currentCategory = "all";
  let currentPriceFilter = "all";
  let searchQuery = "";
  let wishlist = JSON.parse(localStorage.getItem("lookiq_wishlist")) || [];

  // DOM Elements
  const productsGrid = document.getElementById("products-grid");
  const outfitsGrid = document.getElementById("outfits-grid");
  const guidesGrid = document.getElementById("guides-grid");
  const categoryTabs = document.querySelectorAll(".tab-btn");
  const searchInput = document.getElementById("search-input");
  const priceFilter = document.getElementById("price-filter");
  const wishlistCounter = document.getElementById("wishlist-counter");
  const quickViewModal = document.getElementById("quickview-modal");
  const outfitModal = document.getElementById("outfit-modal");
  const modalCloseButtons = document.querySelectorAll(".modal-close-btn");

  // Initialize
  updateWishlistCount();
  renderProducts();
  renderOutfits();
  renderGuides();
  setupEventListeners();

  /**
   * Render Product Cards
   */
  function renderProducts() {
    if (!productsGrid) return;

    let filtered = PRODUCTS.filter(product => {
      // Category filter
      const matchCat = currentCategory === "all" || 
                       product.category === currentCategory ||
                       (currentCategory === "dupes" && product.tags.some(t => t.toLowerCase().includes("dupe")));
      
      // Search query
      const matchSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          product.subCategory.toLowerCase().includes(searchQuery.toLowerCase());

      // Price filter
      let matchPrice = true;
      if (currentPriceFilter === "under30") matchPrice = product.price < 30;
      else if (currentPriceFilter === "30to60") matchPrice = product.price >= 30 && product.price <= 60;
      else if (currentPriceFilter === "over60") matchPrice = product.price > 60;

      return matchCat && matchSearch && matchPrice;
    });

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <p style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 12px;">No fashion finds match your filter.</p>
          <button class="btn-primary" onclick="resetFilters()">View All Collections</button>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = filtered.map(product => {
      const isSaved = wishlist.includes(product.id);
      const starIcons = renderStarRating(product.rating);

      return `
        <div class="product-card" data-id="${product.id}">
          <div class="product-image-wrap">
            <span class="product-badge">${product.badge}</span>
            <button class="wishlist-btn ${isSaved ? 'active' : ''}" onclick="toggleWishlist('${product.id}', event)" title="Save to Favorites">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            <div class="quick-view-overlay">
              <button class="btn-quick-view" onclick="openQuickView('${product.id}')">Quick View</button>
            </div>
          </div>
          <div class="product-content">
            <div class="product-rating">
              <div class="stars">${starIcons}</div>
              <span class="reviews-count">(${product.reviewsCount.toLocaleString()})</span>
            </div>
            <h4 class="product-title" title="${product.title}">${product.title}</h4>
            <div class="product-tags">
              ${product.tags.map(tag => `<span class="product-tag">${tag}</span>`).join("")}
            </div>
            <div class="price-row">
              <span class="current-price">${LOOKIQ_CONFIG.currency}${product.price.toFixed(2)}</span>
              ${product.originalPrice ? `<span class="original-price">${LOOKIQ_CONFIG.currency}${product.originalPrice.toFixed(2)}</span>` : ""}
            </div>
            <a href="${product.amazonLink}" target="_blank" rel="nofollow sponsored noopener" class="btn-amazon-buy" onclick="trackClick('${product.id}', 'card_btn')">
              <svg viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
              <span>Check Price on Amazon</span>
            </a>
          </div>
        </div>
      `;
    }).join("");
  }

  /**
   * Render Lookbook / Outfit Bundles
   */
  function renderOutfits() {
    if (!outfitsGrid) return;

    outfitsGrid.innerHTML = OUTFITS.map(outfit => {
      return `
        <div class="outfit-card">
          <div class="outfit-img-wrap">
            <span class="outfit-badge">${outfit.tag}</span>
            <span class="outfit-items-count">${outfit.items.length} Pieces</span>
            <img src="${outfit.image}" alt="${outfit.title}" loading="lazy">
          </div>
          <div class="outfit-body">
            <h4 class="outfit-title">${outfit.title}</h4>
            <p class="outfit-desc">${outfit.description}</p>
            <button class="outfit-btn" onclick="openOutfitModal('${outfit.id}')">
              <span>Shop All ${outfit.items.length} Pieces</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  /**
   * Render Editorial Guides
   */
  function renderGuides() {
    if (!guidesGrid) return;

    guidesGrid.innerHTML = GUIDES.map(guide => {
      return `
        <article class="guide-card">
          <div class="guide-img-wrap">
            <img src="${guide.image}" alt="${guide.title}" loading="lazy">
          </div>
          <div class="guide-body">
            <div class="guide-meta">
              <span>${guide.date}</span>
              <span>•</span>
              <span>${guide.readTime}</span>
            </div>
            <h4 class="guide-title">${guide.title}</h4>
            <p class="guide-excerpt">${guide.excerpt}</p>
            <a href="guides.html#${guide.id}" class="guide-link">
              <span>Read Full Edit</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </article>
      `;
    }).join("");
  }

  /**
   * Rating Star Renderer
   */
  function renderStarRating(rating) {
    const fullStars = Math.floor(rating);
    let starsHtml = "";
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starsHtml += `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
      } else {
        starsHtml += `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
      }
    }
    return starsHtml;
  }

  /**
   * Event Listeners Setup
   */
  function setupEventListeners() {
    // Category Tabs
    categoryTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        categoryTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        currentCategory = tab.dataset.category;
        renderProducts();
      });
    });

    // Live Search
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.trim();
        renderProducts();
      });
    }

    // Price Filter
    if (priceFilter) {
      priceFilter.addEventListener("change", (e) => {
        currentPriceFilter = e.target.value;
        renderProducts();
      });
    }

    // Modal Close buttons
    modalCloseButtons.forEach(btn => {
      btn.addEventListener("click", closeModal);
    });

    // Close on backdrop click
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-backdrop")) {
        closeModal();
      }
    });

    // Close on ESC key
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    });
  }

  /**
   * Wishlist Toggle (Local Storage)
   */
  window.toggleWishlist = function(productId, event) {
    if (event) event.stopPropagation();

    const index = wishlist.indexOf(productId);
    if (index > -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(productId);
    }

    localStorage.setItem("lookiq_wishlist", JSON.stringify(wishlist));
    updateWishlistCount();
    renderProducts();
  };

  function updateWishlistCount() {
    if (wishlistCounter) {
      wishlistCounter.textContent = wishlist.length;
    }
  }

  /**
   * Quick View Modal Opener
   */
  window.openQuickView = function(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || !quickViewModal) return;

    const modalBody = quickViewModal.querySelector(".modal-body");
    modalBody.innerHTML = `
      <div class="quickview-layout">
        <div class="quickview-img">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="quickview-details">
          <span class="quickview-badge">${product.badge}</span>
          <h3 class="quickview-title">${product.title}</h3>
          <div class="price-row" style="margin-bottom: 12px;">
            <span class="current-price" style="font-size: 1.6rem;">${LOOKIQ_CONFIG.currency}${product.price.toFixed(2)}</span>
            ${product.originalPrice ? `<span class="original-price">${LOOKIQ_CONFIG.currency}${product.originalPrice.toFixed(2)}</span>` : ""}
          </div>
          <p class="quickview-desc">${product.shortDesc}</p>
          <ul class="quickview-features">
            ${product.features.map(f => `<li>${f}</li>`).join("")}
          </ul>
          <a href="${product.amazonLink}" target="_blank" rel="nofollow sponsored noopener" class="btn-amazon-buy" style="margin-top: auto; padding: 14px 20px;" onclick="trackClick('${product.id}', 'quickview_btn')">
            <svg viewBox="0 0 24 24" style="width: 20px; height: 20px;">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
            <span>View Current Price on Amazon</span>
          </a>
          <p style="font-size: 0.72rem; color: var(--text-muted); margin-top: 10px; text-align: center;">
            Prime eligible • Free Returns available on Amazon.com
          </p>
        </div>
      </div>
    `;

    quickViewModal.classList.add("active");
  };

  /**
   * Shop The Look Outfit Modal Opener
   */
  window.openOutfitModal = function(outfitId) {
    const outfit = OUTFITS.find(o => o.id === outfitId);
    if (!outfit || !outfitModal) return;

    const modalBody = outfitModal.querySelector(".modal-body");
    modalBody.innerHTML = `
      <div class="outfit-modal-layout">
        <div class="outfit-modal-header">
          <span class="section-tag">${outfit.tag}</span>
          <h3>${outfit.title}</h3>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">${outfit.description}</p>
        </div>
        <div class="outfit-modal-grid">
          <div class="outfit-modal-img">
            <img src="${outfit.image}" alt="${outfit.title}">
          </div>
          <div class="bundle-items-list">
            <h4 style="font-size: 1.1rem; margin-bottom: 8px;">Complete the Outfit on Amazon:</h4>
            ${outfit.items.map(item => `
              <div class="bundle-item-card">
                <div class="bundle-item-info">
                  <h5>${item.name}</h5>
                  <span>${item.category}</span>
                </div>
                <div class="bundle-item-action">
                  <span class="bundle-item-price">${item.price}</span>
                  <a href="${item.amazonLink}" target="_blank" rel="nofollow sponsored noopener" class="btn-bundle-buy">
                    <span>Shop</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              </div>
            `).join("")}
            <div style="margin-top: 16px; padding: 14px; background: var(--bg-secondary); border-radius: var(--radius-sm); font-size: 0.78rem; color: var(--text-muted); line-height: 1.5;">
              <strong style="color: var(--accent-gold); text-transform: uppercase; letter-spacing: 0.05em;">Style Tip:</strong> Adding all pieces to your Amazon cart qualifies for free US shipping and keeps your outfit coordinated effortlessly.
            </div>
          </div>
        </div>
      </div>
    `;

    outfitModal.classList.add("active");
  };

  /**
   * Close Any Open Modal
   */
  function closeModal() {
    if (quickViewModal) quickViewModal.classList.remove("active");
    if (outfitModal) outfitModal.classList.remove("active");
  }

  /**
   * Reset Filters helper
   */
  window.resetFilters = function() {
    currentCategory = "all";
    currentPriceFilter = "all";
    searchQuery = "";
    if (searchInput) searchInput.value = "";
    if (priceFilter) priceFilter.value = "all";
    categoryTabs.forEach(t => t.classList.remove("active"));
    if (categoryTabs[0]) categoryTabs[0].classList.add("active");
    renderProducts();
  };

  /**
   * Click / Outbound Conversion Analytics Tracking
   */
  window.trackClick = function(id, source) {
    console.log(`[LOOKIQ Analytics] Outbound Amazon Click -> Product: ${id} | Source: ${source} | Timestamp: ${new Date().toISOString()}`);
  };
});
