# LOOKIQ | Smart Fashion Finds (Amazon Affiliate Platform)

A luxury, high-converting Amazon Affiliate website tailored specifically for the **United States (USA)** fashion market.

---

## 🌟 Key Features

1. **Brand Identity**:
   - Clean, modern, luxury editorial typography and styling (Playfair Display + Plus Jakarta Sans).
   - Warm ivory, champagne gold accents, and deep charcoal aesthetics inspired by Net-A-Porter, Zara, and Vogue.
2. **"Shop The Look" Outfit Bundles**:
   - Complete multi-item outfits (Top + Bottom + Coat + Shoes + Accessories).
   - High conversion rate: drives users to purchase multiple coordinating items on Amazon in one go.
3. **Curated US Fashion Catalog**:
   - Filter by: Women, Men, Footwear, Bags & Jewelry, Viral Dupes.
   - Price tier filtering: Under $30, $30 - $60, $60+.
   - Live search by keyword or tag.
4. **Quick View Modal**:
   - Full product breakdown, features checklist, verified customer ratings, and direct "Check Price on Amazon" action button.
5. **Wishlist**:
   - Allows users to heart/save items stored securely in `localStorage`.
6. **Strict Amazon Associates & FTC Compliance**:
   - All external affiliate links tagged with `rel="nofollow sponsored noopener"` and `target="_blank"`.
   - Prominent header and footer FTC disclosures.
   - Dynamic "Check Price on Amazon" buttons adhering to Amazon price fluctuation rules.

---

## ⚙️ How to Add Your Amazon Affiliate Tag (1-Second Setup)

Open `js/data.js` and locate line 10:

```javascript
const LOOKIQ_CONFIG = {
  brandName: "LOOKIQ",
  tagline: "Smart Fashion Finds | Curated for You",
  // REPLACE THIS with your actual Amazon Associates Tag:
  amazonAffiliateTag: "lookiqfinds-20",
  currency: "$",
  marketRegion: "US",
  ...
};
```

Simply replace `"lookiqfinds-20"` with your own Amazon Associates ID (e.g., `"yourtag-20"`). **All product links, buttons, and lookbook pieces across the entire website will automatically update to use your tag!**

---

## 🚀 How to Preview Locally on Your Computer

1. Simply double-click `index.html` to open it in any web browser (Chrome, Edge, Firefox).
2. Or use a local development server (like VS Code Live Server or python `python -m http.server 3000`).

---

## 🌐 How to Deploy to Vercel (100% Free)

### Method 1: Using GitHub (Easiest)
1. Push this folder to a GitHub repository (e.g. `lookiq`).
2. Go to [vercel.com](https://vercel.com/) and sign in with your GitHub account.
3. Click **"Add New" -> "Project"**, select your `lookiq` repository, and click **"Deploy"**.
4. Vercel will instantly give you a free live URL: `https://lookiq.vercel.app` (or `https://thelookiq.vercel.app`).

### Method 2: Using Vercel CLI directly
Run in PowerShell:
```powershell
npx vercel
```
Follow the 3 simple prompts, and your site is live in 30 seconds!

---

## 📂 Project Structure

```
fashion web/
├── index.html          # Main storefront & landing page
├── lookbook.html       # "Shop The Look" curated outfit bundles
├── guides.html         # High-SEO fashion buying guides & reviews
├── vercel.json         # Vercel caching and security headers
├── css/
│   └── styles.css      # Luxury responsive design system & animations
├── js/
│   ├── data.js         # Curated products, outfits, and affiliate config
│   └── app.js          # Live filters, search, modals, and wishlist logic
└── README.md           # Documentation & setup guide
```
