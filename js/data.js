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
    id: "prod-dresstells-01",
    asin: "B07RKLN54Z",
    title: "DRESSTELLS Vintage A-Line Cocktail & Bridesmaid Dress",
    category: "women",
    subCategory: "Dresses",
    badge: "Trending Wedding Guest",
    price: 43.99,
    originalPrice: 59.99,
    rating: 4.2,
    reviewsCount: 23310,
    image: "assets/dresstells-cocktail-dress.png",
    tags: ["Cocktail Dress", "Wedding Guest", "Classic Red", "Viral Fashion"],
    shortDesc: "Flattering 1950s tea-length vintage A-line cocktail dress with delicate cap sleeves and pleated bodice. The ultimate wedding guest staple.",
    features: [
      "Feminine cap sleeve with sweetheart pleated neckline",
      "Concealed back zipper & elegant tea-length swing skirt",
      "Breathable high-density stretch blend (94% Nylon, 6% Spandex)",
      "Standard US sizing: XS to 3XL (Over 40+ seasonal colors)"
    ],
    amazonLink: "https://amzn.to/3T8vGYF"
  },
  {
    id: "prod-eomenie-01",
    asin: "B09NY52NP7",
    title: "Eomenie Tummy Control Cutout One-Piece Swimsuit",
    category: "women",
    subCategory: "Swimwear",
    badge: "Amazon #1 Best Seller",
    price: 35.99,
    originalPrice: 49.99,
    rating: 4.3,
    reviewsCount: 36450,
    image: "assets/eomenie-swimsuit.jpg",
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
    id: "prod-01",
    asin: "B09W2K8Z5Y",
    title: "The Oversized Wool-Blend Trench Coat",
    category: "women",
    subCategory: "Outerwear",
    badge: "Editor's Pick",
    price: 68.99,
    originalPrice: 98.00,
    rating: 4.8,
    reviewsCount: 3420,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    tags: ["Quiet Luxury", "Capsule Wardrobe", "Trending"],
    shortDesc: "Timeless double-breasted silhouette with storm flap and tie belt. Perfect elevated staple for seasonal layering.",
    features: [
      "Relaxed tailored fit with belt",
      "Mid-weight water-resistant blend",
      "True to US sizing (XS - XXL)",
      "Amazon Prime Eligible"
    ],
    amazonLink: getAffiliateLink("B09W2K8Z5Y")
  },
  {
    id: "prod-02",
    asin: "B08R6M4V2X",
    title: "Classic Retro Minimalist Sneaker",
    category: "shoes",
    subCategory: "Footwear",
    badge: "Amazon's Choice",
    price: 49.50,
    originalPrice: 75.00,
    rating: 4.9,
    reviewsCount: 12580,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    tags: ["Everyday", "Dupe Alert", "Streetwear"],
    shortDesc: "Crisp white vegan leather sneaker with cushioned memory foam insole. The ultimate street-smart wardrobe anchor.",
    features: [
      "Cloud-comfort orthotic footbed",
      "Stain-resistant wipe-clean surface",
      "Fits true to standard US women's sizes",
      "Over 12,000+ 5-star ratings"
    ],
    amazonLink: getAffiliateLink("B08R6M4V2X")
  },
  {
    id: "prod-03",
    asin: "B0B8K3P7QD",
    title: "Structured Vegan Leather Shoulder Bag",
    category: "accessories",
    subCategory: "Bags",
    badge: "TikTok Viral",
    price: 38.99,
    originalPrice: 55.00,
    rating: 4.7,
    reviewsCount: 5210,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    tags: ["Quiet Luxury", "Budget Dupe", "Must Have"],
    shortDesc: "Sleek 90s crescent shoulder bag with gold-tone hardware. Looks like an $800 Italian designer piece for under $40.",
    features: [
      "Premium scratch-resistant vegan leather",
      "Secure magnetic zip closure",
      "Fits iPhone Pro Max, wallet & cosmetics",
      "High-converting US viral find"
    ],
    amazonLink: getAffiliateLink("B0B8K3P7QD")
  },
  {
    id: "prod-04",
    asin: "B09T5W6L1Z",
    title: "Pleated High-Waisted Wide Leg Trouser",
    category: "women",
    subCategory: "Bottoms",
    badge: "Best Seller",
    price: 35.99,
    originalPrice: 48.00,
    rating: 4.6,
    reviewsCount: 8940,
    image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80",
    tags: ["Office Chic", "Capsule Wardrobe", "Trending"],
    shortDesc: "Flowy, elegant drape with front pleats and side pockets. Instantly elevates casual t-shirts or silk blouses.",
    features: [
      "Flattering high-rise waist with stretch",
      "Wrinkle-resistant breathable fabric",
      "Multiple inseam lengths (Petite & Regular)",
      "Over 8,000+ verified customer reviews"
    ],
    amazonLink: getAffiliateLink("B09T5W6L1Z")
  },
  {
    id: "prod-05",
    asin: "B07H4V1K9M",
    title: "Men's Heavyweight Fleece Oversized Hoodie",
    category: "men",
    subCategory: "Tops",
    badge: "Amazon's Choice",
    price: 42.00,
    originalPrice: 58.00,
    rating: 4.8,
    reviewsCount: 14200,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    tags: ["Streetwear", "Everyday", "Men"],
    shortDesc: "Premium 400 GSM heavyweight cotton fleece with structured drop shoulders. Clean minimal streetwear staple.",
    features: [
      "400 GSM premium cotton-poly blend",
      "Double-lined hood with metal eyelets",
      "Shrink-resistant wash finish",
      "Ideal for modern boxy streetwear fit"
    ],
    amazonLink: getAffiliateLink("B07H4V1K9M")
  },
  {
    id: "prod-06",
    asin: "B092LQ9B1C",
    title: "14K Gold-Plated Chunky Huggie Hoop Earrings",
    category: "accessories",
    subCategory: "Jewelry",
    badge: "Under $20",
    price: 14.99,
    originalPrice: 22.00,
    rating: 4.9,
    reviewsCount: 28400,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
    tags: ["Budget Luxury", "Jewelry", "Gift Idea"],
    shortDesc: "Hypoallergenic, lightweight chunky tube hoops plated in 14K real gold. Doesn't tarnish or irritate sensitive ears.",
    features: [
      "Hypoallergenic & lead/nickel-free",
      "Ultra-light hollow tube design",
      "Secure snap-bar clasp",
      "Consistently ranked #1 in Fashion Jewelry"
    ],
    amazonLink: getAffiliateLink("B092LQ9B1C")
  },
  {
    id: "prod-07",
    asin: "B0892KQ71T",
    title: "Ribbed Seamless Knit Square-Neck Bodysuit",
    category: "women",
    subCategory: "Tops",
    badge: "TikTok Viral",
    price: 24.99,
    originalPrice: 32.00,
    rating: 4.7,
    reviewsCount: 18900,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    tags: ["Dupe Alert", "Essential", "Sculpt"],
    shortDesc: "Double-layered compressive knit with a sculpting contour. The famous designer dupe with 18k+ reviews.",
    features: [
      "Double lined for 100% zero see-through",
      "Snug compression snatch effect",
      "Thong bottom with snap closure",
      "Available in 18 curated seasonal shades"
    ],
    amazonLink: getAffiliateLink("B0892KQ71T")
  },
  {
    id: "prod-08",
    asin: "B0B6V8F51G",
    title: "Men's Relaxed Fit Tapered Chino Trouser",
    category: "men",
    subCategory: "Bottoms",
    badge: "Top Rated",
    price: 39.99,
    originalPrice: 50.00,
    rating: 4.6,
    reviewsCount: 6800,
    image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=800&q=80",
    tags: ["Smart Casual", "Men", "Office"],
    shortDesc: "Comfort stretch twill with clean tailored lines. Perfect bridge between casual everyday and smart dinner attire.",
    features: [
      "98% Cotton with 2% Spandex stretch",
      "Tailored taper at the ankle",
      "Deep reinforced pockets",
      "Machine washable & wrinkle-treated"
    ],
    amazonLink: getAffiliateLink("B0B6V8F51G")
  },
  {
    id: "prod-09",
    asin: "B08XZ3N71K",
    title: "Chunky Lug Sole Platform Chelsea Boots",
    category: "shoes",
    subCategory: "Boots",
    badge: "Fall Essential",
    price: 54.99,
    originalPrice: 79.00,
    rating: 4.7,
    reviewsCount: 7120,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80",
    tags: ["Fall/Winter", "Trending", "Boots"],
    shortDesc: "Weatherproof ankle boots with an aggressive lug sole and elastic side goring. Effortlessly pairs with dresses or jeans.",
    features: [
      "Waterproof synthetic matte finish",
      "Non-slip rugged rubber tread",
      "Pull-on tab for easy entry",
      "High comfort memory footbed"
    ],
    amazonLink: getAffiliateLink("B08XZ3N71K")
  },
  {
    id: "prod-10",
    asin: "B09H3M541L",
    title: "Vintage Oval UV400 Tortoise Sunglasses",
    category: "accessories",
    subCategory: "Eyewear",
    badge: "Under $15",
    price: 13.99,
    originalPrice: 19.99,
    rating: 4.8,
    reviewsCount: 9600,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    tags: ["Old Money", "Summer/Fall", "Accessory"],
    shortDesc: "Chic 90s aesthetic oval frames with scratch-resistant polarized lenses. Adds instant celebrity off-duty vibes.",
    features: [
      "100% UV400 protective lenses",
      "Reinforced metal hinge construction",
      "Includes microfiber pouch & cloth",
      "High perceived luxury value"
    ],
    amazonLink: getAffiliateLink("B09H3M541L")
  },
  {
    id: "prod-11",
    asin: "B07Z8L241V",
    title: "Knit Oversized Batwing Sleeve Turtleneck",
    category: "women",
    subCategory: "Sweaters",
    badge: "Best Seller",
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviewsCount: 22100,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
    tags: ["Fall/Winter", "Cozy", "Viral"],
    shortDesc: "Plush chunky knit with ribbed cuffs and slouchy cowl neck. The #1 sweater on Amazon with over 20,000 reviews.",
    features: [
      "Cloud-soft hypoallergenic yarn",
      "Cozy side-split hem design",
      "Flattering draped fit for all body types",
      "Over 30+ colors available on Amazon"
    ],
    amazonLink: getAffiliateLink("B07Z8L241V")
  },
  {
    id: "prod-12",
    asin: "B08D2J5G6X",
    title: "Minimalist Leather Strap Dress Watch",
    category: "accessories",
    subCategory: "Watches",
    badge: "Amazon's Choice",
    price: 32.50,
    originalPrice: 48.00,
    rating: 4.7,
    reviewsCount: 4300,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
    tags: ["Quiet Luxury", "Everyday", "Men"],
    shortDesc: "Ultra-thin 40mm minimalist dial with genuine stitched leather strap. Perfect for both office wear and weekend brunch.",
    features: [
      "Japanese quartz precision movement",
      "Scratch-resistant mineral crystal",
      "Water resistant to 30 meters",
      "Clean Scandinavian aesthetic"
    ],
    amazonLink: getAffiliateLink("B08D2J5G6X")
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
    image: "assets/outfit-amalfi-resort.jpg",
    items: [
      {
        name: "Eomenie Tummy Control Cutout One-Piece Swimsuit",
        category: "Swimwear",
        price: "$35.99",
        asin: "B09NY52NP7",
        amazonLink: getAffiliateLink("B09NY52NP7")
      },
      {
        name: "Ekouaer Casual Button-Down Beach Shirt Cover-Up",
        category: "Cover-Up",
        price: "$24.99",
        asin: "B08N4Z2TSH",
        amazonLink: getAffiliateLink("B08N4Z2TSH")
      },
      {
        name: "FURTALK Foldable Wide-Brim Straw UV Sun Hat",
        category: "Sun Hat",
        price: "$21.99",
        asin: "B0852HCQ18",
        amazonLink: getAffiliateLink("B0852HCQ18")
      },
      {
        name: "Handwoven Summer Straw Beach Shoulder Tote",
        category: "Beach Bag",
        price: "$26.99",
        asin: "B004K9PAOS",
        amazonLink: getAffiliateLink("B004K9PAOS")
      }
    ]
  },
  {
    id: "outfit-01",
    title: "The Manhattan Quiet Luxury Look",
    tag: "Trending",
    description: "An effortless blend of tailored wool trench, wide-leg trousers, clean minimal sneakers, and a structured designer-inspired bag.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
    items: [
      {
        name: "Oversized Wool-Blend Trench Coat",
        category: "Coat",
        price: "$68.99",
        asin: "B09W2K8Z5Y",
        amazonLink: getAffiliateLink("B09W2K8Z5Y")
      },
      {
        name: "Pleated High-Waisted Wide Leg Trouser",
        category: "Pants",
        price: "$35.99",
        asin: "B09T5W6L1Z",
        amazonLink: getAffiliateLink("B09T5W6L1Z")
      },
      {
        name: "Structured Vegan Leather Shoulder Bag",
        category: "Bag",
        price: "$38.99",
        asin: "B0B8K3P7QD",
        amazonLink: getAffiliateLink("B0B8K3P7QD")
      },
      {
        name: "Classic Retro Minimalist Sneaker",
        category: "Shoes",
        price: "$49.50",
        asin: "B08R6M4V2X",
        amazonLink: getAffiliateLink("B08R6M4V2X")
      }
    ]
  },
  {
    id: "outfit-02",
    title: "The Autumn Weekend Chai Look",
    tag: "Cozy Autumn",
    description: "Ultra-comfortable knit batwing turtleneck paired with lug sole chelsea boots, gold huggie earrings, and vintage oval shades.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
    items: [
      {
        name: "Knit Oversized Batwing Turtleneck",
        category: "Knitwear",
        price: "$39.99",
        asin: "B07Z8L241V",
        amazonLink: getAffiliateLink("B07Z8L241V")
      },
      {
        name: "Chunky Lug Sole Platform Chelsea Boots",
        category: "Boots",
        price: "$54.99",
        asin: "B08XZ3N71K",
        amazonLink: getAffiliateLink("B08XZ3N71K")
      },
      {
        name: "14K Gold-Plated Chunky Huggie Hoops",
        category: "Jewelry",
        price: "$14.99",
        asin: "B092LQ9B1C",
        amazonLink: getAffiliateLink("B092LQ9B1C")
      },
      {
        name: "Vintage Oval UV400 Tortoise Sunglasses",
        category: "Eyewear",
        price: "$13.99",
        asin: "B09H3M541L",
        amazonLink: getAffiliateLink("B09H3M541L")
      }
    ]
  },
  {
    id: "outfit-03",
    title: "The Clean Urban Minimalist (Men's)",
    tag: "Men's Edit",
    description: "Modern street essentials combining a 400 GSM heavyweight fleece hoodie, relaxed tapered chinos, and a minimalist dress watch.",
    image: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?auto=format&fit=crop&w=1000&q=80",
    items: [
      {
        name: "Men's Heavyweight Fleece Hoodie",
        category: "Top",
        price: "$42.00",
        asin: "B07H4V1K9M",
        amazonLink: getAffiliateLink("B07H4V1K9M")
      },
      {
        name: "Men's Relaxed Fit Tapered Chino",
        category: "Bottom",
        price: "$39.99",
        asin: "B0B6V8F51G",
        amazonLink: getAffiliateLink("B0B6V8F51G")
      },
      {
        name: "Minimalist Leather Strap Dress Watch",
        category: "Watch",
        price: "$32.50",
        asin: "B08D2J5G6X",
        amazonLink: getAffiliateLink("B08D2J5G6X")
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
    date: "Trending Pick",
    readTime: "4 min read",
    author: "LOOKIQ Fashion Editors",
    excerpt: "We tested the viral DRESSTELLS vintage tea-length cocktail dress in Classic Red. Here's why 23,000+ buyers are obsessed with the flattering A-line fit.",
    image: "assets/dresstells-cocktail-dress.png",
    tags: ["Product Review", "Wedding Guest", "Classic Red"]
  },
  {
    id: "guide-01",
    title: "10 Timeless Capsule Wardrobe Staples Under $50 on Amazon",
    date: "October 2026",
    readTime: "5 min read",
    author: "LOOKIQ Style Editors",
    excerpt: "Building a high-end, versatile wardrobe doesn't require thousands. Here are the 10 verified Amazon pieces fashion editors swear by.",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80",
    tags: ["Capsule Wardrobe", "Budget Luxury", "Buying Guide"]
  },
  {
    id: "guide-02",
    title: "The Ultimate Guide to Amazon Designer Bag Dupes That Look High-End",
    date: "September 2026",
    readTime: "4 min read",
    author: "Fashion Curation Team",
    excerpt: "From 90s crescent shoulder bags to structured woven totes, we tested 25 viral Amazon bags so you only buy the top tier.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    tags: ["Dupes", "Accessories", "Trending"]
  },
  {
    id: "guide-03",
    title: "How to Style Wide-Leg Trousers for Work, Brunch, and Date Night",
    date: "August 2026",
    readTime: "6 min read",
    author: "Elena Vance | Senior Stylist",
    excerpt: "Pleated wide-leg pants are dominating street style across NYC and LA. Here is how to style them with affordable Amazon staples.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    tags: ["Style Guide", "Workwear", "Shop The Look"]
  }
];
