/**
 * LOOKIQ - Global Configuration & Product Catalog
 * Tailored for USA Amazon Associates Market
 */

const LOOKIQ_CONFIG = {
  brandName: "LOOKIQ",
  tagline: "Smart Fashion Finds | Curated for You",
  // Your official Amazon Associates Tracking ID
  amazonAffiliateTag: "likeefashionh-20",
  currency: "$",
  marketRegion: "US",
  amazonBaseUrl: "https://www.amazon.com/dp/",
  disclaimer: "As an Amazon Associate, LOOKIQ earns from qualifying purchases at no additional cost to you. Prices and availability are accurate as of the date/time indicated and are subject to change."
};

/**
 * Helper to build an Amazon Affiliate Link
 */
function getAffiliateLink(asin, fallbackUrl) {
  if (asin) {
    return `https://www.amazon.com/dp/${asin}/?tag=${LOOKIQ_CONFIG.amazonAffiliateTag}&linkCode=ogi&th=1&psc=1`;
  }
  return fallbackUrl || `https://www.amazon.com/?tag=${LOOKIQ_CONFIG.amazonAffiliateTag}`;
}

/**
 * Curated US Amazon Fashion Products Catalog
 */
const PRODUCTS = [
  {
    id: "prettygarden-batwing-long-sleeve-lightwe",
    asin: "B0GY4L7WLX",
    title: "PRETTYGARDEN Batwing Long Sleeve Lightweight Cardigan Sweaters for Wom",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: 19.99,
    originalPrice: 26.99,
    rating: 4.4,
    reviewsCount: 953,
    image: "assets/products/prettygarden-batwing-long-sleeve-lightwe.jpg",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B0GY4L7WLX?tag=likeefashionh-20"
  },
  {
    id: "trendy-queen-womens-oversized-cable-kni",
    asin: "B0D9RPX853",
    title: "Trendy Queen Women's Oversized Cable Knit Sweaters 2026 Fall Outfits",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: 36.99,
    originalPrice: 49.94,
    rating: 4.4,
    reviewsCount: 5206,
    image: "assets/products/trendy-queen-womens-oversized-cable-kni.jpg",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B0D9RPX853?tag=likeefashionh-20"
  },
  {
    id: "orolay-chiione-women-trench-coat-long-do",
    asin: "B0GX5125V2",
    title: "Orolay CHIIONE Women Trench Coat Long Double Breasted Belted Rain Coat",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: 94.99,
    originalPrice: 128.24,
    rating: 4.6,
    reviewsCount: 809,
    image: "assets/products/orolay-chiione-women-trench-coat-long-do.jpg",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B0GX5125V2?tag=likeefashionh-20"
  },
  {
    id: "suuksess-women-workout-romper-one-piece",
    asin: "B0F66J12H4",
    title: "SUUKSESS Women's Workout Romper One Piece",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: 29.95,
    originalPrice: 40.43,
    rating: 4.2,
    reviewsCount: 166,
    image: "assets/products/suuksess-women-workout-romper-one-piece.jpg",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B0F66J12H4?tag=likeefashionh-20"
  },
  {
    id: "besteel-3pairs-14k-gold-plated-small-chu",
    asin: "B0D47LDXF7",
    title: "BESTEEL 3Pairs 14K Gold Plated Small Chunky Huggie Hoop Earrings for W",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: 9.99,
    originalPrice: 13.49,
    rating: 4.4,
    reviewsCount: 2484,
    image: "assets/products/besteel-3pairs-14k-gold-plated-small-chu.jpg",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B0D47LDXF7?tag=likeefashionh-20"
  },
  {
    id: "trendy-queen-womens-hoodies-oversized-sw",
    asin: "B0C65WCS8R",
    title: "Trendy Queen Womens Hoodies Oversized Sweatshirt Grey M",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: 27.99,
    originalPrice: 37.79,
    rating: 4.2,
    reviewsCount: 10764,
    image: "assets/products/trendy-queen-womens-hoodies-oversized-sw.jpg",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B0C65WCS8R?tag=likeefashionh-20"
  },
  {
    id: "athlefit-womens-chelsea-boots-lug-sole",
    asin: "B0B2X92HDC",
    title: "Athlefit Women's Chelsea Boots Lug Sole Chunky Heel Ankle Booties",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: 59.99,
    originalPrice: 80.99,
    rating: 4.5,
    reviewsCount: 3986,
    image: "assets/products/athlefit-womens-chelsea-boots-lug-sole.jpg",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B0B2X92HDC?tag=likeefashionh-20"
  },
  {
    id: "automet-womens-oversized-faux-leather-j",
    asin: "B0C9GRK8R4",
    title: "AUTOMET Women's Oversized Faux Leather Jacket for Fall and Winter",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: 39.99,
    originalPrice: 53.99,
    rating: 4.3,
    reviewsCount: 304,
    image: "assets/products/automet-womens-oversized-faux-leather-j.jpg",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B0C9GRK8R4?tag=likeefashionh-20"
  },
  {
    id: "prettygarden-womens-long-sleeve-quarter",
    asin: "B0DL543BTK",
    title: "PRETTYGARDEN Womens Long Sleeve Quarter Zip Pullover Sweater(Grey,XL)",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: 32.98,
    originalPrice: 44.52,
    rating: 4.5,
    reviewsCount: 282,
    image: "assets/products/prettygarden-womens-long-sleeve-quarter.jpg",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B0DL543BTK?tag=likeefashionh-20"
  },
  {
    id: "corski-womens-flannel-shacket-jacket-pl",
    asin: "B0F9281M9D",
    title: "CORSKI Women's Flannel Shacket Jacket Plaid Button Down Long Sleeve Shirt",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: 19.99,
    originalPrice: 26.99,
    rating: 4.1,
    reviewsCount: 14302,
    image: "assets/products/corski-womens-flannel-shacket-jacket-pl.jpg",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B0F9281M9D?tag=likeefashionh-20"
  },
  {
    id: "anrabess-sweater-dress-for-women-oversiz",
    asin: "B09C5GW935",
    title: "ANRABESS Sweater Dress for Women Oversized Cable Knit Fall Long Sleeve",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: 25.99,
    originalPrice: 35.09,
    rating: 4.2,
    reviewsCount: 899,
    image: "assets/products/anrabess-sweater-dress-for-women-oversiz.jpg",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B09C5GW935?tag=likeefashionh-20"
  },
  {
    id: "nuohemule-3-in-1-100-merino-wool-winter",
    asin: "B0DCVTTQMX",
    title: "NUOHEMULE 3 in 1 100% Merino Wool Winter Accessory Set, Hat Scarf Glov",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: 75.99,
    originalPrice: 102.59,
    rating: 4.7,
    reviewsCount: 22,
    image: "assets/products/nuohemule-3-in-1-100-merino-wool-winter.jpg",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B0DCVTTQMX?tag=likeefashionh-20"
  },
  {
    id: "moyuxi-8mm-tapered-design-thick-large-go",
    asin: "B0F4MC4L65",
    title: "MOYUXI 8mm Tapered Design Thick Large Gold Hoop Earrings for Women Hyp",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: 13.99,
    originalPrice: 18.89,
    rating: 4.6,
    reviewsCount: 830,
    image: "assets/products/moyuxi-8mm-tapered-design-thick-large-go.jpg",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B0F4MC4L65?tag=likeefashionh-20"
  },
  {
    id: "lookiq-curated-s-zone-leather-mini-cross",
    asin: "B09VSDPLJZ",
    title: "S-ZONE Leather Mini Crossbody Tote Bag Satchel Handbags Shoulder Purse",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: 69.99,
    originalPrice: 94.49,
    rating: 4.5,
    reviewsCount: 394,
    image: "assets/products/lookiq-curated-s-zone-leather-mini-cross.jpg",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B09VSDPLJZ?tag=likeefashionh-20"
  },
  {
    id: "cashmere-wool-blend-wrap-for-women-pash",
    asin: "B0DDR7Q513",
    title: "Cashmere Wool Blend Wrap for Women, Pashmina Shawl Scarf Travel 78x27in",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: 85.49,
    originalPrice: 115.41,
    rating: 4.3,
    reviewsCount: 760,
    image: "assets/products/cashmere-wool-blend-wrap-for-women-pash.jpg",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B0DDR7Q513?tag=likeefashionh-20"
  },
  {
    id: "lillusory-cardigan-for-women-lightweight",
    asin: "B0FBGR7Z6K",
    title: "LILLUSORY Cardigan for Women Lightweight Cardigans Fall Fashion Outfit",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: 42.99,
    originalPrice: 58.04,
    rating: 4.1,
    reviewsCount: 625,
    image: "assets/products/lillusory-cardigan-for-women-lightweight.jpg",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B0FBGR7Z6K?tag=likeefashionh-20"
  },
  {
    id: "zesica-oversized-sweaters-for-women-2026",
    asin: "B0H4LSB2YC",
    title: "ZESICA Oversized Sweaters for Women 2026 Fall Trendy Pullover Tops Bur",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: 49.99,
    originalPrice: 67.49,
    rating: 4.6,
    reviewsCount: 427,
    image: "assets/products/zesica-oversized-sweaters-for-women-2026.jpg",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B0H4LSB2YC?tag=likeefashionh-20"
  },
  {
    id: "ongerek-14k-gold-earrings-for-women-ripp",
    asin: "B0F8W6S4DQ",
    title: "14K Gold Earrings for Women Ripple Line 14K Gold Hoop Earrings for Wom",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: 55.99,
    originalPrice: 75.59,
    rating: 4.2,
    reviewsCount: 35,
    image: "assets/pins/ongerek-14k-gold-earrings-for-women-ripp-pin.jpg",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B0F8W6S4DQ?tag=likeefashionh-20"
  },
  {
    id: "sovesi-14k-gold-plated-hoop-earrings-for",
    asin: "B0GTYYM2VK",
    title: "sovesi 14K Gold Plated Hoop Earrings for Women Chunky Gold Hoops Small",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: 12.34,
    originalPrice: 16.66,
    rating: 4.2,
    reviewsCount: 97,
    image: "assets/pins/sovesi-14k-gold-plated-hoop-earrings-for-pin.jpg",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B0GTYYM2VK?tag=likeefashionh-20"
  },
  {
    id: "silvora-10mm-14k-gold-plated-huggie-earr",
    asin: "B0H1C1FT2R",
    title: "Silvora 10MM 14K Gold Plated Huggie Earrings for Women, Small Gold Hoo",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: 49.99,
    originalPrice: 67.49,
    rating: 4.3,
    reviewsCount: 125,
    image: "assets/pins/silvora-10mm-14k-gold-plated-huggie-earr-pin.jpg",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B0H1C1FT2R?tag=likeefashionh-20"
  },
  {
    id: "trendy-queen-womens-off-shoulder-sweatsh",
    asin: "B0H4Z8K7NN",
    title: "Trendy Queen Womens Off Shoulder Sweatshirt Oversized Tops Y2k Outfits",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: 23.99,
    originalPrice: 32.39,
    rating: 4.0,
    reviewsCount: 39,
    image: "assets/pins/trendy-queen-womens-off-shoulder-sweatsh-pin.jpg",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B0H4Z8K7NN?tag=likeefashionh-20"
  },
  {
    id: "trendy-queen-womens-mock-neck-sweatshirt",
    asin: "B0C5RC6M9Y",
    title: "Trendy Queen Womens Mock Neck Sweatshirts Oversized Pullover Fall Outf",
    category: "women",
    subCategory: "Curated Finds",
    badge: "Trending Pick",
    price: 24.99,
    originalPrice: 33.74,
    rating: 4.1,
    reviewsCount: 33,
    image: "assets/pins/trendy-queen-womens-mock-neck-sweatshirt-pin.jpg",
    tags: ["Amazon Fashion", "Quiet Luxury", "Curated Find"],
    shortDesc: "Curated Amazon fashion staple evaluated for premium fabric quality, flattering silhouette, and effortless styling.",
    features: [
      "Curated luxury fashion staple on Amazon US",
      "Verified true-to-size fit based on customer reviews",
      "Amazon Prime eligible with fast delivery and easy returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B0C5RC6M9Y?tag=likeefashionh-20"
  },
  {
    id: "trendy-queen-cropped-cardigan-sweaters-f",
    asin: "B0DCW38YR7",
    title: "Trendy Queen Cropped Cardigan Sweaters for Women",
    category: "women",
    subCategory: "Knitwear & Sweaters",
    badge: "Trending Fall Pick",
    price: 36.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviewsCount: 1850,
    image: "assets/pins/trendy-queen-cropped-cardigan-sweaters-f-pin.jpg",
    tags: ["Cardigan", "Cropped Sweater", "Fall Fashion", "Quiet Luxury"],
    shortDesc: "Curated cropped button-front knit cardigan sweater featuring a flattering ribbed crewneck design and ultra-soft breathable drape. Perfect for transitional styling over dresses, tees, or trousers.",
    features: [
      "Ultra-soft fine ribbed knit with comfortable all-day stretch",
      "Flattering cropped silhouette pairs effortlessly with high-waisted bottoms",
      "Versatile button-down front with subtle tortoiseshell accents",
      "Amazon Prime eligible with fast shipping and free 30-day returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B0DCW38YR7/?tag=likeefashionh-20"
  },
  {
    id: "thermal-underwear-for-women-long-johns-s",
    asin: "B088H5DWV3",
    title: "Thermajane Women's Fleece Lined Thermal Underwear Set",
    category: "women",
    subCategory: "Basics & Loungewear",
    badge: "Winter Warmth Essential",
    price: 19.99,
    originalPrice: 29.99,
    rating: 4.6,
    reviewsCount: 14213,
    image: "assets/products/thermal-underwear-model.jpg",
    tags: ["Thermal Underwear", "Winter Warmth", "Base Layer", "Fleece Lined"],
    shortDesc: "Ultra-soft microfleece interior lining delivers maximum thermal insulation without added bulk. Breathable four-way stretch fabric for comfortable all-day cold weather layering.",
    features: [
      "Ultra-soft microfleece interior lining delivers maximum thermal insulation",
      "Breathable four-way stretch fabric retains its tailored shape",
      "Moisture-wicking dry technology prevents clamminess",
      "Seamless fit under trousers, jeans, and winter knitwear"
    ],
    amazonLink: "https://www.amazon.com/dp/B088H5DWV3/?tag=likeefashionh-20"
  },
  {
    id: "casual-summer-sundress",
    asin: "B09N72QM68",
    title: "Elescat Women's Casual Sleeveless Summer Sundress with Pockets",
    category: "women",
    subCategory: "Dresses",
    badge: "Viral Summer Favorite",
    price: 24.99,
    originalPrice: 32.99,
    rating: 4.3,
    reviewsCount: 18500,
    image: "assets/elescat-summer-dress.webp",
    tags: ["Summer Dress", "Casual Chic", "Vacation Wear", "Sundress"],
    shortDesc: "Effortless sleeveless casual sundress featuring a flattering scoop neckline, functional side pockets, and airy swing silhouette. The viral warm-weather staple for vacations and everyday styling.",
    features: [
      "Lightweight, ultra-soft breathable rayon blend with graceful natural drape",
      "Dual deep functional side seam pockets for effortless convenience",
      "Flattering scoop neckline and modest armhole cut for confident all-day coverage",
      "Versatile swing flare silhouette pairs seamlessly with denim jackets, sandals, or sneakers"
    ],
    amazonLink: getAffiliateLink("B09N72QM68")
  },
  {
    id: "vintage-cocktail-dress",
    asin: "B07RKLN54Z",
    title: "DRESSTELLS Vintage A-Line Cocktail & Bridesmaid Dress",
    category: "women",
    subCategory: "Dresses",
    badge: "Trending Wedding Guest",
    price: 43.99,
    originalPrice: 59.99,
    rating: 4.2,
    reviewsCount: 23310,
    image: "assets/dresstells-cocktail-dress.webp",
    tags: ["Cocktail Dress", "Wedding Guest", "Classic Red", "Viral Fashion"],
    shortDesc: "Flattering 1950s tea-length vintage A-line cocktail dress with delicate cap sleeves and pleated bodice. The ultimate wedding guest staple.",
    features: [
      "Feminine cap sleeve with sweetheart pleated neckline",
      "Concealed back zipper & elegant tea-length swing skirt",
      "Breathable high-density stretch blend (94% Nylon, 6% Spandex)",
      "Standard US sizing: XS to 3XL (Over 40+ seasonal colors)"
    ],
    amazonLink: getAffiliateLink("B07RKLN54Z")
  },
  {
    id: "retro-oval-sunglasses",
    asin: "B0H3V41YPX",
    title: "SOJOS Small Oval Polarized Retro Tortoise Sunglasses",
    category: "accessories",
    subCategory: "Eyewear",
    badge: "Under $20",
    price: 15.99,
    originalPrice: 19.99,
    rating: 4.5,
    reviewsCount: 14200,
    image: "assets/sojos-retro-sunglasses.webp",
    tags: ["Old Money", "Summer/Fall", "Accessory", "Viral Dupes"],
    shortDesc: "Chic 90s vintage narrow oval tortoise frames with UV400 polarized brown lenses. Adds instant Old Money and celebrity off-duty vibes.",
    features: [
      "100% UV400 protective polarized TAC brown lenses",
      "Premium gloss tortoise shell acetate narrow oval frame",
      "Reinforced metal hinges with ergonomic curved temples",
      "Includes microfiber cleaning pouch, cloth & protective box"
    ],
    amazonLink: "https://www.amazon.com/dp/B0H3V41YPX/?tag=likeefashionh-20&linkCode=ogi&th=1"
  },
  {
    id: "cutout-one-piece-swimsuit",
    asin: "B09NY52NP7",
    title: "Eomenie Tummy Control Cutout One-Piece Swimsuit",
    category: "women",
    subCategory: "Swimwear",
    badge: "Amazon #1 Best Seller",
    price: 36.99,
    originalPrice: 49.99,
    rating: 4.3,
    reviewsCount: 36450,
    image: "assets/eomenie-swimsuit.webp",
    tags: ["Swimwear", "Resort Wear", "Tummy Control", "Viral TikTok"],
    shortDesc: "Amazon's most viral tummy control monokini. Features cross-over scallop cutout bodice, adjustable halter straps, and flattering ruched high-waist design.",
    features: [
      "Flattering cross wrap front with modest midriff cutout",
      "Built-in tummy control ruched panel with full rear coverage",
      "Removable push-up padded cups & adjustable neck tie",
      "Quick-dry chlorine resistant stretch fabric (82% Nylon, 18% Spandex)"
    ],
    amazonLink: getAffiliateLink("B09NY52NP7")
  },
  {
    id: "beach-shirt-coverup",
    asin: "B0GY34D6CM",
    title: "Ekouaer Swimsuit Beach Dress Shirt Cover-Up",
    category: "women",
    subCategory: "Cover-Ups",
    badge: "Vacation Must-Have",
    price: 16.14,
    originalPrice: 19.99,
    rating: 4.2,
    reviewsCount: 21513,
    image: "assets/ekouaer-coverup.webp",
    tags: ["Resort Wear", "Beach Cover-Up", "Summer", "Vacation Chic"],
    shortDesc: "Breezy lightweight boyfriend-style button-down beach coverup shirt dress. Features an open V-neck, cuffed roll-up sleeves, and curved side slits.",
    features: [
      "Flattering deep V-neck with lapel collar & chest pocket",
      "Roll-up 3/4 sleeves with button tabs for versatile styling",
      "Ultra-soft, lightweight & breathable textured fabric",
      "Asymmetrical curved hem with leg-lengthening side slits"
    ],
    amazonLink: getAffiliateLink("B0GY34D6CM")
  },
  {
    id: "foldable-straw-sun-hat",
    asin: "B0852HCQ18",
    title: "FURTALK Foldable Wide-Brim Straw UV Sun Hat",
    category: "accessories",
    subCategory: "Hats",
    badge: "Amazon #1 Best Seller",
    price: 27.99,
    originalPrice: 35.99,
    rating: 4.6,
    reviewsCount: 24100,
    image: "assets/furtalk-sun-hat.webp",
    tags: ["Summer Essential", "UPF 50+", "Travel"],
    shortDesc: "Packable, roll-up wide brim Panama straw hat with UPF 50+ sun protection. The quintessential summer holiday companion.",
    features: [
      "Certified UPF 50+ maximum UV blocking",
      "Foldable and crush-resistant travel design",
      "Adjustable inner hook-and-loop sweatband",
      "Removable wind lanyard for breezy beach days"
    ],
    amazonLink: getAffiliateLink("B0852HCQ18")
  },
  {
    id: "straw-beach-tote",
    asin: "B07Q7ZJQ5V",
    title: "Womens Large Straw Summer Beach Shoulder Tote",
    category: "accessories",
    subCategory: "Bags",
    badge: "Trending Pick",
    price: 19.59,
    originalPrice: 29.99,
    rating: 4.5,
    reviewsCount: 6850,
    image: "assets/straw-beach-tote.webp",
    tags: ["Handmade", "Beach Bag", "Boho Chic"],
    shortDesc: "Handwoven natural straw shoulder bag featuring colorful playful tassel pom-poms. Roomy enough for beach towels, sunglasses, and vacation essentials.",
    features: [
      "100% natural hand-braided corn husk straw",
      "Zipper top closure to secure all valuables",
      "Detachable festive rainbow pom-pom charm",
      "Fully lined interior with slip organization pocket"
    ],
    amazonLink: getAffiliateLink("B07Q7ZJQ5V")
  },
  {
    id: "oversized-trench-coat",
    asin: "B0CCJF2N2B",
    title: "Farktop Oversized Long Double-Breasted Trench Coat",
    category: "women",
    subCategory: "Outerwear",
    badge: "Editor's Pick",
    price: 39.99,
    originalPrice: 65.00,
    rating: 4.8,
    reviewsCount: 3420,
    image: "assets/outfit-manhattan-trench.webp",
    tags: ["Quiet Luxury", "Capsule Wardrobe", "Trending"],
    shortDesc: "Timeless double-breasted silhouette with lapel collar and storm flap. Perfect elevated staple for seasonal layering.",
    features: [
      "Relaxed tailored fit with waist tie belt",
      "Mid-weight windproof blend",
      "True to US sizing (XS - XXL)",
      "Amazon Prime Eligible"
    ],
    amazonLink: getAffiliateLink("B0CCJF2N2B")
  },
  {
    id: "classic-white-sneakers",
    asin: "B0CH9FJY8V",
    title: "Adokoo Classic Minimalist White Leather Sneakers",
    category: "shoes",
    subCategory: "Footwear",
    badge: "Amazon's Choice",
    price: 21.99,
    originalPrice: 25.99,
    rating: 4.6,
    reviewsCount: 12580,
    image: "assets/adokoo-sneakers.webp",
    tags: ["Everyday", "Dupe Alert", "Streetwear"],
    shortDesc: "Crisp white vegan leather sneaker with cushioned memory foam insole. The ultimate street-smart wardrobe anchor.",
    features: [
      "Cloud-comfort orthotic footbed",
      "Stain-resistant wipe-clean surface",
      "Fits true to standard US women's sizes",
      "Over 12,000+ 5-star ratings"
    ],
    amazonLink: getAffiliateLink("B0CH9FJY8V")
  },
  {
    id: "slouchy-hobo-shoulder-bag",
    asin: "B0D99Q3PDV",
    title: "Soft Vegan Leather Slouchy Hobo Shoulder Bag",
    category: "accessories",
    subCategory: "Bags",
    badge: "TikTok Viral",
    price: 28.90,
    originalPrice: 42.00,
    rating: 4.7,
    reviewsCount: 5210,
    image: "assets/slouchy-hobo-bag.webp",
    tags: ["Quiet Luxury", "Budget Dupe", "Must Have"],
    shortDesc: "Sleek crescent slouchy hobo shoulder bag with roomy interior. Looks like an expensive Italian designer piece for under $30.",
    features: [
      "Premium scratch-resistant vegan leather",
      "Secure magnetic zip closure",
      "Fits iPhone Pro Max, wallet & cosmetics",
      "High-converting US viral find"
    ],
    amazonLink: getAffiliateLink("B0D99Q3PDV")
  },
  {
    id: "pleated-wide-leg-trousers",
    asin: "B0DHRD1LWQ",
    title: "NIMIN High-Waisted Wide Leg Work Trouser Pants",
    category: "women",
    subCategory: "Bottoms",
    badge: "Best Seller",
    price: 38.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviewsCount: 8940,
    image: "assets/nimin-trouser-pants.webp",
    tags: ["Office Chic", "Capsule Wardrobe", "Trending"],
    shortDesc: "Flowy, elegant drape with front pleats and side pockets. Instantly elevates casual t-shirts or silk blouses.",
    features: [
      "Flattering high-rise waist with stretch",
      "Wrinkle-resistant breathable fabric",
      "Multiple inseam lengths (Petite & Regular)",
      "Over 8,000+ verified customer reviews"
    ],
    amazonLink: getAffiliateLink("B0DHRD1LWQ")
  },
  {
    id: "heavyweight-fleece-hoodie",
    asin: "B00JUMDZTC",
    title: "Hanes Men's Ultimate Heavyweight Fleece Pullover Hoodie",
    category: "men",
    subCategory: "Tops",
    badge: "Amazon Essential",
    price: 33.00,
    originalPrice: 42.00,
    rating: 4.6,
    reviewsCount: 48200,
    image: "assets/hanes-mens-hoodie.webp",
    tags: ["Streetwear", "Everyday", "Men"],
    shortDesc: "Classic 9.7 oz heavyweight fleece hoodie crafted with patented low-pill, high-stitch density fabric. The ultimate casual layering piece.",
    features: [
      "9.7 oz heavyweight cotton-rich fleece",
      "Jersey-lined hood with metal eyelets",
      "Roomy front kangaroo pouch pocket",
      "Ribbed cuffs and waistband for shape retention"
    ],
    amazonLink: getAffiliateLink("B00JUMDZTC")
  },
  {
    id: "gold-huggie-hoop-earrings",
    asin: "B08CTB2H6T",
    title: "PAVOI 14K Gold Plated Thick Huggie Hoop Earrings",
    category: "accessories",
    subCategory: "Jewelry",
    badge: "Under $15",
    price: 12.95,
    originalPrice: 17.99,
    rating: 4.9,
    reviewsCount: 48400,
    image: "assets/pavoi-huggie-earrings.webp",
    tags: ["Budget Luxury", "Jewelry", "Gift Idea"],
    shortDesc: "Hypoallergenic, lightweight chunky tube hoops plated in 14K real gold. Doesn't tarnish or irritate sensitive ears.",
    features: [
      "Hypoallergenic & lead/nickel-free",
      "Ultra-light hollow tube design",
      "Secure snap-bar clasp",
      "Consistently ranked #1 in Fashion Jewelry"
    ],
    amazonLink: getAffiliateLink("B08CTB2H6T")
  },
  {
    id: "square-neck-workout-romper",
    asin: "B0BXS1MBM9",
    title: "QINSEN Square-Neck Workout Jumpsuit Romper",
    category: "women",
    subCategory: "Activewear",
    badge: "TikTok Viral",
    price: 24.99,
    originalPrice: 32.00,
    rating: 4.6,
    reviewsCount: 22400,
    image: "assets/qinsen-workout-romper.webp",
    tags: ["Dupe Alert", "Workout", "Sculpt"],
    shortDesc: "Double-layered compressive knit with square neckline and bodycon biker shorts. The viral TikTok workout romper with tummy control.",
    features: [
      "Double lined for 100% squat-proof coverage",
      "Wide comfortable tank straps with square neck",
      "Built-in tummy control bodycon snatch fit",
      "Moisture-wicking, 4-way stretch ribbed fabric"
    ],
    amazonLink: getAffiliateLink("B0BXS1MBM9")
  },
  {
    id: "slim-fit-stretch-chinos",
    asin: "B07BJKZGRR",
    title: "Amazon Essentials Men's Slim-Fit Stretch Casual Chino Pant",
    category: "men",
    subCategory: "Bottoms",
    badge: "Amazon #1 Best Seller",
    price: 22.60,
    originalPrice: 32.00,
    rating: 4.5,
    reviewsCount: 31800,
    image: "assets/amazon-mens-chino.webp",
    tags: ["Everyday", "Smart Casual", "Men"],
    shortDesc: "Comfort-stretch cotton twill chino with a modern slim fit through the thigh and leg. Perfect transition piece from casual workday to weekend.",
    features: [
      "98% Cotton, 2% Elastane all-day comfort stretch",
      "Tailored slim taper at the ankle",
      "Deep reinforced front and welt back pockets",
      "Machine washable & wrinkle-resistant finish"
    ],
    amazonLink: getAffiliateLink("B07BJKZGRR")
  },
  {
    id: "chunky-chelsea-booties",
    asin: "B08KHXGR58",
    title: "Soda Pilot Women's Chunky Lug Sole Chelsea Booties",
    category: "shoes",
    subCategory: "Boots",
    badge: "Fall Essential",
    price: 39.98,
    originalPrice: 59.99,
    rating: 4.7,
    reviewsCount: 21500,
    image: "assets/soda-chelsea-booties.webp",
    tags: ["Fall/Winter", "Trending", "Boots"],
    shortDesc: "Weatherproof ankle boots with an aggressive lug sole and elastic side goring. Effortlessly pairs with dresses or jeans.",
    features: [
      "Waterproof synthetic matte finish",
      "Non-slip rugged rubber tread",
      "Pull-on tab for easy entry",
      "High comfort memory footbed"
    ],
    amazonLink: getAffiliateLink("B08KHXGR58")
  },
  {
    id: "oversized-turtleneck-sweater",
    asin: "B07XKH9K5M",
    title: "ANRABESS Oversized Turtleneck Batwing Ribbed Knit Sweater",
    category: "women",
    subCategory: "Sweaters",
    badge: "Best Seller",
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviewsCount: 38400,
    image: "assets/anrabess-turtleneck-sweater.webp",
    tags: ["Fall/Winter", "Cozy", "Viral"],
    shortDesc: "Plush chunky knit with ribbed cuffs and slouchy cowl neck. The #1 sweater on Amazon with tens of thousands of reviews.",
    features: [
      "Cloud-soft hypoallergenic yarn",
      "Cozy side-split hem design",
      "Flattering draped fit for all body types",
      "Over 30+ colors available on Amazon"
    ],
    amazonLink: getAffiliateLink("B07XKH9K5M")
  },
  {
    id: "minimalist-mens-leather-watch",
    asin: "B07Q7NQ3WB",
    title: "BUREI Ultra-Thin Minimalist Men's Leather Watch",
    category: "accessories",
    subCategory: "Watches",
    badge: "Top Rated",
    price: 29.99,
    originalPrice: 45.00,
    rating: 4.7,
    reviewsCount: 9400,
    image: "assets/burei-mens-watch.webp",
    tags: ["Quiet Luxury", "Everyday", "Men"],
    shortDesc: "Classic minimalist analog dial with date window and genuine embossed leather strap. Water-resistant up to 30M.",
    features: [
      "Ultra-thin 6.5mm slim stainless steel case",
      "Scratch-resistant coated glass crystal",
      "Genuine breathable stitched leather strap",
      "Precision Japanese quartz movement with auto-calendar"
    ],
    amazonLink: getAffiliateLink("B07Q7NQ3WB")
  },
  {
    id: "mens-white-tennis-sneakers",
    asin: "B0BVQC4TLH",
    title: "FRACORA Men's Minimalist White Leather Tennis Sneakers",
    category: "shoes",
    subCategory: "Footwear",
    badge: "Trending Pick",
    price: 26.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviewsCount: 4800,
    image: "assets/fracora-mens-sneakers.webp",
    tags: ["Streetwear", "Minimalist", "Men", "White Sneakers"],
    shortDesc: "Clean, low-top white casual sneakers with cushioned insole and non-slip rubber cupsole. The quintessential smart-casual men's sneaker.",
    features: [
      "Durable wipe-clean vegan leather upper",
      "Breathable fabric lining & cushioned footbed",
      "Sturdy vulcanized rubber outsole for grip",
      "Classic versatile low-profile design"
    ],
    amazonLink: getAffiliateLink("B0BVQC4TLH")
  },
  {
    id: "pocket-split-maxi-dress",
    asin: "B0CR5D81C8",
    title: "GRECERELLE Women's Casual Loose Pocket Split Maxi Dress",
    category: "women",
    subCategory: "Dresses",
    badge: "Amazon's Choice",
    price: 19.99,
    originalPrice: 26.99,
    rating: 4.4,
    reviewsCount: 4850,
    image: "assets/grecerelle-maxi-dress.webp",
    tags: ["Vacation Chic", "Resort Wear", "Everyday", "Maxi Dress"],
    shortDesc: "Effortless, breezy sleeveless maxi dress featuring a relaxed silhouette, convenient side pockets, and flattering side walking split.",
    features: [
      "Ultra-soft breathable stretch knit fabric with wrinkle-free drape",
      "Convenient deep functional side pockets & stylish side slit",
      "Thoughtful modest armhole cut for confident all-day coverage",
      "Versatile resort & summer staple for vacations, errands, or casual dining"
    ],
    amazonLink: getAffiliateLink("B0CR5D81C8")
  },
  {
    id: "saodimallsu-womens-button-cardigan-sweat",
    asin: "B0H3KMF929",
    title: "Saodimallsu Womens Button Cardigan Sweaters Fall Chunky Knit",
    category: "women",
    subCategory: "Knitwear & Sweaters",
    badge: "Curated Pick",
    price: 52.99,
    rating: 4.4,
    reviewsCount: 38400,
    image: "assets/pins/saodimallsu-womens-button-cardigan-sweat-pin.jpg",
    tags: ["Cardigan", "Chunky Knit", "Fall Fashion", "Quiet Luxury"],
    shortDesc: "Chunky-knit button-front cardigan sweater with a cozy fall-ready drape. An easy layering piece over tees, dresses, and turtlenecks.",
    features: [
      "Chunky knit construction with a soft, cozy hand-feel",
      "Classic button-front design for versatile styling",
      "Relaxed fall silhouette that layers effortlessly",
      "Amazon Prime eligible with fast shipping and free 30-day returns"
    ],
    amazonLink: "https://www.amazon.com/dp/B0H3KMF929/?tag=likeefashionh-20"
  }
];

/**
 * Curated "Shop The Look" Outfits (High Conversion Multi-Item Bundles)
 */
const OUTFITS = [
  {
    id: "outfit-resort-01",
    title: "The Amalfi Coast Resort & Beach Edit",
    tag: "Trending Resort",
    description: "Chic Mediterranean resort ensemble featuring Amazon's #1 viral tummy control cutout swimsuit, breezy linen beach shirt, woven straw tote, and UV sun hat.",
    image: "assets/outfit-amalfi-resort.webp",
    items: [
      {
        name: "Eomenie Tummy Control Cutout One-Piece Swimsuit",
        category: "Swimwear",
        price: "$36.99",
        asin: "B09NY52NP7",
        amazonLink: getAffiliateLink("B09NY52NP7")
      },
      {
        name: "Ekouaer Swimsuit Beach Dress Shirt Cover-Up",
        category: "Cover-Up",
        price: "$16.14",
        asin: "B0GY34D6CM",
        amazonLink: getAffiliateLink("B0GY34D6CM")
      },
      {
        name: "FURTALK Foldable Wide-Brim Straw UV Sun Hat",
        category: "Sun Hat",
        price: "$27.99",
        asin: "B0852HCQ18",
        amazonLink: getAffiliateLink("B0852HCQ18")
      },
      {
        name: "Womens Large Straw Summer Beach Shoulder Tote",
        category: "Beach Bag",
        price: "$19.59",
        asin: "B07Q7ZJQ5V",
        amazonLink: getAffiliateLink("B07Q7ZJQ5V")
      }
    ]
  },
  {
    id: "outfit-01",
    title: "The Manhattan Quiet Luxury Look",
    tag: "Trending",
    description: "An effortless blend of tailored oversized trench coat, pleated wide-leg trousers, clean minimal white sneakers, and a slouchy vegan leather bag.",
    image: "assets/outfit-manhattan-trench.webp",
    items: [
      {
        name: "Farktop Oversized Long Double-Breasted Trench Coat",
        category: "Coat",
        price: "$39.99",
        asin: "B0CCJF2N2B",
        amazonLink: getAffiliateLink("B0CCJF2N2B")
      },
      {
        name: "NIMIN High-Waisted Wide Leg Work Trouser Pants",
        category: "Pants",
        price: "$38.99",
        asin: "B0DHRD1LWQ",
        amazonLink: getAffiliateLink("B0DHRD1LWQ")
      },
      {
        name: "Soft Vegan Leather Slouchy Hobo Shoulder Bag",
        category: "Bag",
        price: "$28.90",
        asin: "B0D99Q3PDV",
        amazonLink: getAffiliateLink("B0D99Q3PDV")
      },
      {
        name: "Adokoo Classic Minimalist White Leather Sneakers",
        category: "Shoes",
        price: "$21.99",
        asin: "B0CH9FJY8V",
        amazonLink: getAffiliateLink("B0CH9FJY8V")
      }
    ]
  },
  {
    id: "outfit-02",
    title: "The Autumn Weekend Chai Look",
    tag: "Cozy Autumn",
    description: "Ultra-comfortable knit batwing turtleneck paired with chunky lug sole chelsea boots, 14K gold huggie earrings, and vintage tortoise oval shades.",
    image: "assets/outfit-autumn-chai.webp",
    items: [
      {
        name: "ANRABESS Oversized Turtleneck Batwing Ribbed Knit Sweater",
        category: "Knitwear",
        price: "$39.99",
        asin: "B07XKH9K5M",
        amazonLink: getAffiliateLink("B07XKH9K5M")
      },
      {
        name: "Soda Pilot Women's Chunky Lug Sole Chelsea Booties",
        category: "Boots",
        price: "$39.98",
        asin: "B08KHXGR58",
        amazonLink: getAffiliateLink("B08KHXGR58")
      },
      {
        name: "PAVOI 14K Gold Plated Thick Huggie Hoop Earrings",
        category: "Jewelry",
        price: "$12.95",
        asin: "B08CTB2H6T",
        amazonLink: getAffiliateLink("B08CTB2H6T")
      },
      {
        name: "SOJOS Small Oval Polarized Retro Tortoise Sunglasses",
        category: "Eyewear",
        price: "$15.99",
        asin: "B0H3V41YPX",
        amazonLink: "https://www.amazon.com/dp/B0H3V41YPX/?tag=likeefashionh-20&linkCode=ogi&th=1"
      }
    ]
  },
  {
    id: "outfit-03",
    title: "The Clean Urban Minimalist (Men's)",
    tag: "Men's Edit",
    description: "Modern street essentials combining a heavyweight fleece pullover hoodie, slim-fit stretch chinos, clean minimalist white leather sneakers, and a classic leather dress watch.",
    image: "assets/outfit-urban-minimalist-men.webp",
    items: [
      {
        name: "Hanes Men's Ultimate Heavyweight Fleece Pullover Hoodie",
        category: "Top",
        price: "$33.00",
        asin: "B00JUMDZTC",
        amazonLink: getAffiliateLink("B00JUMDZTC")
      },
      {
        name: "Amazon Essentials Men's Slim-Fit Stretch Casual Chino Pant",
        category: "Bottom",
        price: "$22.60",
        asin: "B07BJKZGRR",
        amazonLink: getAffiliateLink("B07BJKZGRR")
      },
      {
        name: "FRACORA Men's Minimalist White Leather Tennis Sneakers",
        category: "Shoes",
        price: "$26.99",
        asin: "B0BVQC4TLH",
        amazonLink: getAffiliateLink("B0BVQC4TLH")
      },
      {
        name: "BUREI Ultra-Thin Minimalist Men's Leather Watch",
        category: "Watch",
        price: "$29.99",
        asin: "B07Q7NQ3WB",
        amazonLink: getAffiliateLink("B07Q7NQ3WB")
      }
    ]
  }
];

/**
 * Fashion Guides & Editorial Articles (SEO Magnet for Google US)
 */
const GUIDES = [
  {
    id: "dresstells-review",
    title: "Viral Review: Why This $44 Amazon Wedding Guest Dress Is Breaking TikTok",
    slug: "dresstells-review",
    date: "Trending Pick • Spring 2026",
    readTime: "4 min read",
    author: "LOOKIQ Style Editors",
    excerpt: "We tested the viral DRESSTELLS vintage tea-length cocktail dress in Classic Red. Here is why 23,000+ buyers are obsessed with its flattering A-line fit and travel-friendly stretch fabric.",
    image: "assets/dresstells-cocktail-dress.webp",
    altText: "DRESSTELLS Vintage A-Line Cocktail Dress in Classic Red Editorial Review",
    tags: ["Product Review", "Wedding Guest", "Classic Red", "Under $50"]
  },
  {
    id: "amazon-fall-capsule-wardrobe-under-150",
    title: "Best Amazon Fall Capsule Wardrobe Under $150: The 2026 Minimalist Checklist",
    slug: "amazon-fall-capsule-wardrobe-under-150",
    date: "October 2026 • Trend Report",
    readTime: "6 min read",
    author: "LOOKIQ Fashion Editors",
    excerpt: "Building a versatile, quiet luxury autumn wardrobe doesn't require high four-figure budgets. Here are 4 tested Amazon staples that create over 10 elevated looks for under $150 total.",
    image: "assets/capsule-wardrobe-guide.webp",
    altText: "Best Amazon Fall Capsule Wardrobe Under 150 Dollars Minimalist Checklist",
    tags: ["Capsule Wardrobe", "Fall Fashion", "Budget Luxury", "Checklist"]
  },
  {
    id: "viral-tiktok-square-neck-bodysuit-review",
    title: "Viral TikTok Square Neck Bodysuit Review: The Ultimate $25 Skims Dupe on Amazon",
    slug: "viral-tiktok-square-neck-bodysuit-review",
    date: "September 2026 • Fit Test",
    readTime: "5 min read",
    author: "Elena Vance | Senior Stylist",
    excerpt: "Can a $25 Amazon romper really rival $80 designer shapewear? We put the QINSEN compression square-neck romper to the test for opacity, snatch contouring, and all-day comfort.",
    image: "assets/qinsen-workout-romper.webp",
    altText: "Viral TikTok Square Neck Bodysuit Review Amazon QINSEN Shapewear Romper",
    tags: ["Viral Dupes", "TikTok Fashion", "Bodysuit", "Fit Test"]
  },
  {
    id: "quiet-luxury-chic-outfit-ideas-amazon",
    title: "Quiet Luxury Chic Outfit Ideas on Amazon: How to Look Expensive on a Budget",
    slug: "quiet-luxury-chic-outfit-ideas-amazon",
    date: "Autumn 2026 • Style Guide",
    readTime: "5 min read",
    author: "LOOKIQ Curation Team",
    excerpt: "Mastering the old-money aesthetic on an Amazon budget comes down to tailored drape, neutral palettes, and refined accessories. Discover 5 chic outfit formulas tested by our editors.",
    image: "assets/outfit-manhattan-trench.webp",
    altText: "Quiet Luxury Chic Outfit Ideas on Amazon Old Money Aesthetic Guide",
    tags: ["Quiet Luxury", "Old Money", "Outfit Ideas", "Street Style"]
  },
  {
    id: "minimalist-mens-street-style-outfit-amazon",
    title: "Minimalist Men's Street Style Outfit on Amazon: 4 Clean Urban Essentials",
    slug: "minimalist-mens-street-style-outfit-amazon",
    date: "Fall 2026 • Menswear",
    readTime: "4 min read",
    author: "Marcus Thorne | Menswear Editor",
    excerpt: "Effortless urban style is built on fit and minimalism. Here are 4 affordable Amazon menswear essentials—from heavyweight fleece to slim stretch chinos—that look razor sharp.",
    image: "assets/outfit-mens-minimalist.webp",
    altText: "Minimalist Mens Street Style Outfit on Amazon Clean Urban Essentials",
    tags: ["Men's Style", "Urban Minimalist", "Capsule Wardrobe", "Streetwear"]
  },
  {
    id: "amazon-designer-bag-dupes-guide",
    title: "The Ultimate Guide to Amazon Designer Bag Dupes That Look Truly High-End",
    slug: "amazon-designer-bag-dupes-guide",
    date: "Seasonal Edit • Handbags",
    readTime: "5 min read",
    author: "LOOKIQ Accessories Desk",
    excerpt: "From soft vegan leather slouchy hobo bags to woven summer totes, we tested 25 viral Amazon bags for hardware weight, stitching durability, and scratch resistance.",
    image: "assets/slouchy-hobo-bag.webp",
    altText: "Amazon Designer Bag Dupes That Look High End Vegan Leather Slouchy Hobo Bag",
    tags: ["Designer Dupes", "Handbags", "Accessories", "Shopping Guide"]
  }
];
