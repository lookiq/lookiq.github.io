/**
 * LOOKIQ - Application Logic & Interactive Storefront Controller
 * Handles Filtering, Search, Modals, Wishlist, and Amazon Conversion Tracking
 */

document.addEventListener("DOMContentLoaded", () => {
  // State
  let currentCategory = "all";
  let currentPriceFilter = "all";
  let searchQuery = "";
  let currentPage = 1;
  const itemsPerPage = 12;
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
  initTrendingTicker();
  setupEventListeners();
  handleDeepLink();
  window.addEventListener("hashchange", handleDeepLink);

  /**
   * Render Product Cards
   */
  function renderProducts() {
    if (!productsGrid) return;

    let filtered = PRODUCTS.filter(product => {
      // Category filter
      const matchCat = currentCategory === "all" || 
                       product.category === currentCategory ||
                       (currentCategory === "under25" && product.price <= 25) ||
                       (currentCategory === "men" && product.tags.some(t => t.toLowerCase() === "men")) ||
                       (currentCategory === "dupes" && product.tags.some(t => t.toLowerCase().includes("dupe")));
      
      // Search query
      const matchSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          product.subCategory.toLowerCase().includes(searchQuery.toLowerCase());

      // Price filter
      let matchPrice = true;
      if (currentPriceFilter === "under25") matchPrice = product.price <= 25;
      else if (currentPriceFilter === "under30") matchPrice = product.price < 30;
      else if (currentPriceFilter === "25to50") matchPrice = product.price > 25 && product.price <= 50;
      else if (currentPriceFilter === "30to60") matchPrice = product.price >= 30 && product.price <= 60;
      else if (currentPriceFilter === "over50") matchPrice = product.price > 50;
      else if (currentPriceFilter === "over60") matchPrice = product.price > 60;

      return matchCat && matchSearch && matchPrice;
    });

    const paginationContainer = document.getElementById("pagination-container");

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <p style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 12px;">No fashion finds match your filter.</p>
          <button class="btn-primary" onclick="resetFilters()">View All Collections</button>
        </div>
      `;
      if (paginationContainer) paginationContainer.innerHTML = "";
      return;
    }

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (currentPage > totalPages) {
      currentPage = 1;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const paginated = filtered.slice(startIndex, endIndex);

    productsGrid.innerHTML = paginated.map(product => {
      const isSaved = wishlist.includes(product.id);
      const starIcons = renderStarRating(product.rating);

      return `
        <div class="product-card" id="${product.id}" data-id="${product.id}">
          <div class="product-image-wrap">
            <span class="product-badge">${product.badge}</span>
            <button class="pin-card-btn" onclick="saveToPinterest('${product.id}', event)" title="Save to Pinterest" aria-label="Save to Pinterest">
              <svg viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
              <span>Pin</span>
            </button>
            <button class="wishlist-btn ${isSaved ? 'active' : ''}" onclick="toggleWishlist('${product.id}', event)" title="Save to Favorites">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <img src="${product.image}" alt="${product.altText || product.title}" loading="lazy" decoding="async">
            <div class="quick-view-overlay">
              <button class="btn-quick-view" onclick="openQuickView('${product.id}')">Quick View</button>
            </div>
          </div>
          <div class="product-content">
            <div class="product-rating">
              <div class="stars">${starIcons}</div>
              <span class="reviews-count">(${product.reviewsCount.toLocaleString()})</span>
            </div>
            <h4 class="product-title" title="${product.title}"><a href="products/${product.id}.html" style="color: inherit; text-decoration: none;">${product.title}</a></h4>
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
            <a href="products/${product.id}.html" class="product-view-details-link" style="display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; margin-top: 8px; padding: 7px 12px; font-size: 0.82rem; font-weight: 600; color: var(--accent-gold); border: 1px solid var(--border-gold); border-radius: var(--radius-full); transition: all 0.2s ease; text-decoration: none;">
              <span>Read Full Review &amp; Fit Guide</span> &rarr;
            </a>
          </div>
        </div>
      `;
    }).join("");

    renderPagination(totalItems, totalPages);
  }

  /**
   * Render Quiet Luxury Numbered Pagination Bar
   */
  function renderPagination(totalItems, totalPages) {
    const paginationContainer = document.getElementById("pagination-container");
    if (!paginationContainer) return;

    if (totalPages <= 1) {
      paginationContainer.innerHTML = "";
      return;
    }

    const startNum = (currentPage - 1) * itemsPerPage + 1;
    const endNum = Math.min(currentPage * itemsPerPage, totalItems);

    let pagesHtml = "";
    for (let p = 1; p <= totalPages; p++) {
      const isActive = p === currentPage ? " active" : "";
      pagesHtml += `
        <button class="page-btn${isActive}" onclick="goToProductPage(${p})" aria-label="Go to Page ${p}" ${p === currentPage ? 'aria-current="page"' : ''}>
          ${p}
        </button>
      `;
    }

    const prevDisabled = currentPage === 1 ? " disabled" : "";
    const nextDisabled = currentPage === totalPages ? " disabled" : "";

    paginationContainer.innerHTML = `
      <div class="pagination-info">
        Showing <span>${startNum}–${endNum}</span> of <span>${totalItems}</span> Curated Finds
      </div>
      <nav class="pagination-nav" aria-label="Catalog Page Navigation">
        <button class="page-btn-nav" onclick="goToProductPage(${currentPage - 1})" ${prevDisabled} aria-label="Previous Page">
          <svg class="arrow-prev" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>PREV</span>
        </button>
        ${pagesHtml}
        <button class="page-btn-nav" onclick="goToProductPage(${currentPage + 1})" ${nextDisabled} aria-label="Next Page">
          <span>NEXT</span>
          <svg class="arrow-next" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </nav>
    `;
  }

  /**
   * Jump to Specific Page & Smooth Scroll
   */
  window.goToProductPage = function(pageNumber) {
    currentPage = pageNumber;
    renderProducts();

    const catalogElem = document.getElementById("catalog");
    if (catalogElem) {
      const topOffset = catalogElem.getBoundingClientRect().top + window.pageYOffset - 85;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

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
            <button class="outfit-pin-btn" onclick="saveOutfitToPinterest('${outfit.id}', event)" title="Save Look to Pinterest" aria-label="Save Look to Pinterest">
              <svg viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
              <span>Save Look</span>
            </button>
            <span class="outfit-items-count">${outfit.items.length} Pieces</span>
            <img src="${outfit.image}" alt="${outfit.altText || outfit.title}" loading="lazy" decoding="async">
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
            <img src="${guide.image}" alt="${guide.altText || guide.title}" loading="lazy" decoding="async">
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
        currentPage = 1;
        renderProducts();
      });
    });

    // Live Search
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.trim();
        currentPage = 1;
        renderProducts();
      });
    }

    // Price Filter
    if (priceFilter) {
      priceFilter.addEventListener("change", (e) => {
        currentPriceFilter = e.target.value;
        currentPage = 1;
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
   * Handle Direct Product URL Deep Linking
   */
  function handleDeepLink() {
    const urlParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash.replace("#", "");
    const targetId = urlParams.get("product") || (hash.startsWith("prod-") ? hash : null);

    if (targetId && PRODUCTS.some(p => p.id === targetId)) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.style.boxShadow = "0 0 0 3px var(--accent-gold), 0 10px 30px rgba(212, 155, 106, 0.4)";
          setTimeout(() => {
            el.style.transition = "box-shadow 1.5s ease";
            el.style.boxShadow = "";
          }, 3500);
        }
        openQuickView(targetId);
      }, 350);
    }
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
    const safeTitle = (product.altText || product.title).replace(/'/g, "\\'");
    
    modalBody.innerHTML = `
      <div class="quickview-layout">
        <div class="quickview-img zoomable-img-box" id="qv-zoom-container" onclick="openLightbox('${product.image}', '${safeTitle}')" title="Click to expand fullscreen">
          <div class="zoom-lens-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <span>Roll over to zoom • Click to expand</span>
          </div>
          <img src="${product.image}" alt="${product.altText || product.title}" id="qv-zoom-target" decoding="async">
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
          <button class="btn-quickview-pin" onclick="saveToPinterest('${product.id}', event)">
            <svg viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
            <span>Save to Pinterest &bull; Pin Item</span>
          </button>
          <a href="products/${product.id}.html" class="quickview-details-link" style="display: block; text-align: center; margin-top: 10px; font-size: 0.84rem; color: var(--accent-gold); font-weight: 600; text-decoration: underline;">
            View Dedicated Product Page &amp; Full Reviews &rarr;
          </a>
          <p style="font-size: 0.72rem; color: var(--text-muted); margin-top: 10px; text-align: center;">
            Prime eligible • Free Returns available on Amazon.com
          </p>
        </div>
      </div>
    `;

    // Attach interactive Pan-Zoom events
    const zoomBox = document.getElementById("qv-zoom-container");
    const zoomImg = document.getElementById("qv-zoom-target");
    if (zoomBox && zoomImg) {
      zoomBox.addEventListener("mousemove", (e) => {
        const rect = zoomBox.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        zoomImg.style.transformOrigin = `${x}% ${y}%`;
        zoomImg.style.transform = "scale(2.25)";
      });
      zoomBox.addEventListener("mouseleave", () => {
        zoomImg.style.transform = "scale(1)";
        zoomImg.style.transformOrigin = "center center";
      });
    }

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
            <button class="btn-pinterest-cta" style="margin-top: 14px; width: 100%;" onclick="saveOutfitToPinterest('${outfit.id}', event)">
              <svg viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
              <span>Save Full Look to Pinterest</span>
            </button>
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
    currentPage = 1;
    if (searchInput) searchInput.value = "";
    if (priceFilter) priceFilter.value = "all";
    categoryTabs.forEach(t => t.classList.remove("active"));
    if (categoryTabs[0]) categoryTabs[0].classList.add("active");
    renderProducts();
  };

  /**
   * Auto-Rotating Trending Ticker
   */
  function initTrendingTicker() {
    const tickerItems = document.querySelectorAll(".ticker-item");
    if (tickerItems.length <= 1) return;

    let currentIndex = 0;
    let tickerInterval = null;

    function showNextTicker() {
      tickerItems[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % tickerItems.length;
      tickerItems[currentIndex].classList.add("active");
    }

    function startTicker() {
      if (!tickerInterval) {
        tickerInterval = setInterval(showNextTicker, 3800);
      }
    }

    function stopTicker() {
      if (tickerInterval) {
        clearInterval(tickerInterval);
        tickerInterval = null;
      }
    }

    startTicker();

    const tickerWrap = document.querySelector(".trending-ticker-wrap");
    if (tickerWrap) {
      tickerWrap.addEventListener("mouseenter", stopTicker);
      tickerWrap.addEventListener("mouseleave", startTicker);
    }
  }

  /**
   * Click / Outbound Conversion Analytics Tracking
   */
  window.trackClick = function(id, source) {
    console.log(`[LOOKIQ Analytics] Outbound Amazon Click -> Product: ${id} | Source: ${source} | Timestamp: ${new Date().toISOString()}`);
  };

  /**
   * 1-Click Pinterest Pin It & Viral Social Sharing Handlers
   */
  window.saveToPinterest = function(productId, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const product = typeof PRODUCTS !== "undefined" ? PRODUCTS.find(p => p.id === productId) : null;
    if (!product) return;

    const baseUrl = "https://lookiq.github.io/";
    const pageUrl = `${baseUrl}products/${product.id}.html`;
    const imgUrl = product.image.startsWith("http") ? product.image : `${baseUrl}${product.image}`;
    const description = `${product.title} - Verified Amazon Find on LOOKIQ for $${product.price.toFixed(2)}. Check sizing, reviews & style tips!`;

    const pinUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}&media=${encodeURIComponent(imgUrl)}&description=${encodeURIComponent(description)}`;
    window.open(pinUrl, "_blank", "width=750,height=600,toolbar=0,menubar=0,location=0,status=0,scrollbars=yes,resizable=yes");
  };

  window.saveOutfitToPinterest = function(outfitId, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const outfit = typeof OUTFITS !== "undefined" ? OUTFITS.find(o => o.id === outfitId) : null;
    if (!outfit) return;

    const baseUrl = "https://lookiq.github.io/";
    const pageUrl = `${baseUrl}lookbook.html#${outfitId}`;
    const imgUrl = outfit.image.startsWith("http") ? outfit.image : `${baseUrl}${outfit.image}`;
    const description = `${outfit.title} (${outfit.tag}) - Shop this complete aesthetic outfit capsule on LOOKIQ!`;

    const pinUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}&media=${encodeURIComponent(imgUrl)}&description=${encodeURIComponent(description)}`;
    window.open(pinUrl, "_blank", "width=750,height=600,toolbar=0,menubar=0,location=0,status=0,scrollbars=yes,resizable=yes");
  };

  window.saveDupeToPinterest = function(title, relativeImg, targetUrl, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const baseUrl = "https://lookiq.github.io/";
    const pageUrl = targetUrl.startsWith("http") ? targetUrl : `${baseUrl}${targetUrl}`;
    const imgUrl = relativeImg.startsWith("http") ? relativeImg : `${baseUrl}${relativeImg}`;
    const description = `${title} - The Look for Less! Smart Style Twin comparison & review on LOOKIQ.`;

    const pinUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}&media=${encodeURIComponent(imgUrl)}&description=${encodeURIComponent(description)}`;
    window.open(pinUrl, "_blank", "width=750,height=600,toolbar=0,menubar=0,location=0,status=0,scrollbars=yes,resizable=yes");
  };

  // Mobile Navigation Drawer Controller
  const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileCloseBtn = document.getElementById('mobile-drawer-close');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');

  if (mobileToggleBtn && mobileDrawer && mobileOverlay) {
    function openDrawer() {
      mobileDrawer.classList.add('active');
      mobileOverlay.classList.add('active');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      mobileOverlay.setAttribute('aria-hidden', 'false');
      mobileToggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      mobileDrawer.classList.remove('active');
      mobileOverlay.classList.remove('active');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      mobileOverlay.setAttribute('aria-hidden', 'true');
      mobileToggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    mobileToggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      openDrawer();
    });

    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeDrawer();
      });
    }

    mobileOverlay.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
        closeDrawer();
      }
    });
  }
});

