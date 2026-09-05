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
    id: "prod-10",
    asin: "B0H3V41YPX",
    title: "SOJOS Small Oval Polarized Retro Tortoise Sunglasses",
    category: "accessories",
    subCategory: "Eyewear",
    badge: "Under $20",
    price: 15.99,
    originalPrice: 19.99,
    rating: 4.5,
    reviewsCount: 14200,
    image: "assets/sojos-retro-sunglasses.png",
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
    id: "prod-eomenie-01",
    asin: "B09NY52NP7",
    title: "Eomenie Tummy Control Cutout One-Piece Swimsuit",
    category: "women",
    subCategory: "Swimwear",
    badge: "Amazon #1 Best Seller",
    price: 36.99,
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
    id: "prod-ekouaer-01",
    asin: "B0GY34D6CM",
    title: "Ekouaer Swimsuit Beach Dress Shirt Cover-Up",
    category: "women",
    subCategory: "Cover-Ups",
    badge: "Vacation Must-Have",
    price: 16.14,
    originalPrice: 19.99,
    rating: 4.2,
    reviewsCount: 21513,
    image: "assets/ekouaer-coverup.jpg?v=2",
    tags: ["Resort Wear", "Beach Cover-Up", "Summer", "Vacation Chic"],
    shortDesc: "Breezy lightweight boyfriend-style button-down beach coverup shirt dress. Features an open V-neck, cuffed roll-up sleeves, and curved side slits.",
    features: [
      "Flattering deep V-neck with lapel collar & chest pocket",
      "Roll-up 3/4 sleeves with button tabs for versatile styling",
      "Ultra-soft, lightweight & breathable textured fabric",
      "Asymmetrical curved hem with leg-lengthening side slits"
    ],
    amazonLink: "https://amzn.to/4yj1hFV"
  },
  {
    id: "prod-furtalk-01",
    asin: "B0852HCQ18",
    title: "FURTALK Foldable Wide-Brim Straw UV Sun Hat",
    category: "accessories",
    subCategory: "Hats",
    badge: "Amazon #1 Best Seller",
    price: 27.99,
    originalPrice: 35.99,
    rating: 4.6,
    reviewsCount: 24100,
    image: "assets/furtalk-sun-hat.jpg?v=2",
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
    id: "prod-straw-tote-01",
    asin: "B07Q7ZJQ5V",
    title: "Womens Large Straw Summer Beach Shoulder Tote",
    category: "accessories",
    subCategory: "Bags",
    badge: "Trending Pick",
    price: 19.59,
    originalPrice: 29.99,
    rating: 4.5,
    reviewsCount: 6850,
    image: "assets/straw-beach-tote.jpg",
    tags: ["Handmade", "Beach Bag", "Boho Chic"],
    shortDesc: "Handwoven natural straw shoulder bag featuring colorful playful tassel pom-poms. Roomy enough for beach towels, sunglasses, and vacation essentials.",
    features: [
      "100% natural hand-braided corn husk straw",
      "Zipper top closure to secure all valuables",
      "Detachable festive rainbow pom-pom charm",
      "Fully lined interior with slip organization pocket"
    ],
    amazonLink: "https://amzn.to/4xC9O6N"
  },
  {
    id: "prod-01",
    asin: "B0CCJF2N2B",
    title: "Farktop Oversized Long Double-Breasted Trench Coat",
    category: "women",
    subCategory: "Outerwear",
    badge: "Editor's Pick",
    price: 39.99,
    originalPrice: 65.00,
    rating: 4.8,
    reviewsCount: 3420,
    image: "assets/outfit-manhattan-trench.jpg",
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
    id: "prod-02",
    asin: "B0CH9FJY8V",
    title: "Adokoo Classic Minimalist White Leather Sneakers",
    category: "shoes",
    subCategory: "Footwear",
    badge: "Amazon's Choice",
    price: 21.99,
    originalPrice: 25.99,
    rating: 4.6,
    reviewsCount: 12580,
    image: "assets/adokoo-sneakers.jpg",
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
    id: "prod-03",
    asin: "B0D99Q3PDV",
    title: "Soft Vegan Leather Slouchy Hobo Shoulder Bag",
    category: "accessories",
    subCategory: "Bags",
    badge: "TikTok Viral",
    price: 28.90,
    originalPrice: 42.00,
    rating: 4.7,
    reviewsCount: 5210,
    image: "assets/slouchy-hobo-bag.jpg",
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
    id: "prod-04",
    asin: "B0DHRD1LWQ",
    title: "NIMIN High-Waisted Wide Leg Work Trouser Pants",
    category: "women",
    subCategory: "Bottoms",
    badge: "Best Seller",
    price: 38.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviewsCount: 8940,
    image: "assets/nimin-trouser-pants.jpg",
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
    id: "prod-05",
    asin: "B00JUMDZTC",
    title: "Hanes Men's Ultimate Heavyweight Fleece Pullover Hoodie",
    category: "men",
    subCategory: "Tops",
    badge: "Amazon Essential",
    price: 33.00,
    originalPrice: 42.00,
    rating: 4.6,
    reviewsCount: 48200,
    image: "assets/hanes-mens-hoodie.jpg",
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
    id: "prod-06",
    asin: "B08CTB2H6T",
    title: "PAVOI 14K Gold Plated Thick Huggie Hoop Earrings",
    category: "accessories",
    subCategory: "Jewelry",
    badge: "Under $15",
    price: 12.95,
    originalPrice: 17.99,
    rating: 4.9,
    reviewsCount: 48400,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
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
    id: "prod-07",
    asin: "B0CCDW18FN",
    title: "QINSEN Seamless Square-Neck Ribbed Bodysuit",
    category: "women",
    subCategory: "Tops",
    badge: "TikTok Viral",
    price: 24.99,
    originalPrice: 32.00,
    rating: 4.7,
    reviewsCount: 22400,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    tags: ["Dupe Alert", "Essential", "Sculpt"],
    shortDesc: "Double-layered compressive knit with a sculpting contour. The famous designer dupe with 20k+ reviews.",
    features: [
      "Double lined for 100% zero see-through",
      "Snug compression snatch effect",
      "Thong bottom with snap closure",
      "Available in 18 curated seasonal shades"
    ],
    amazonLink: getAffiliateLink("B0CCDW18FN")
  },
  {
    id: "prod-08",
    asin: "B07BJKZGRR",
    title: "Amazon Essentials Men's Slim-Fit Stretch Casual Chino Pant",
    category: "men",
    subCategory: "Bottoms",
    badge: "Amazon #1 Best Seller",
    price: 22.60,
    originalPrice: 32.00,
    rating: 4.5,
    reviewsCount: 31800,
    image: "assets/amazon-mens-chino.jpg?v=2",
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
    id: "prod-09",
    asin: "B08KHXGR58",
    title: "Soda Pilot Women's Chunky Lug Sole Chelsea Booties",
    category: "shoes",
    subCategory: "Boots",
    badge: "Fall Essential",
    price: 39.98,
    originalPrice: 59.99,
    rating: 4.7,
    reviewsCount: 21500,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80",
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
    id: "prod-11",
    asin: "B07XKH9K5M",
    title: "ANRABESS Oversized Turtleneck Batwing Ribbed Knit Sweater",
    category: "women",
    subCategory: "Sweaters",
    badge: "Best Seller",
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviewsCount: 38400,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
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
    id: "prod-12",
    asin: "B07Q7NQ3WB",
    title: "BUREI Ultra-Thin Minimalist Men's Leather Watch",
    category: "accessories",
    subCategory: "Watches",
    badge: "Top Rated",
    price: 29.99,
    originalPrice: 45.00,
    rating: 4.7,
    reviewsCount: 9400,
    image: "assets/burei-mens-watch.jpg",
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
    id: "prod-fracora-01",
    asin: "B0BVQC4TLH",
    title: "FRACORA Men's Minimalist White Leather Tennis Sneakers",
    category: "shoes",
    subCategory: "Footwear",
    badge: "Trending Pick",
    price: 26.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviewsCount: 4800,
    image: "assets/fracora-mens-sneakers.jpg",
    tags: ["Streetwear", "Minimalist", "Men", "White Sneakers"],
    shortDesc: "Clean, low-top white casual sneakers with cushioned insole and non-slip rubber cupsole. The quintessential smart-casual men's sneaker.",
    features: [
      "Durable wipe-clean vegan leather upper",
      "Breathable fabric lining & cushioned footbed",
      "Sturdy vulcanized rubber outsole for grip",
      "Classic versatile low-profile design"
    ],
    amazonLink: getAffiliateLink("B0BVQC4TLH")
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
        price: "$36.99",
        asin: "B09NY52NP7",
        amazonLink: getAffiliateLink("B09NY52NP7")
      },
      {
        name: "Ekouaer Swimsuit Beach Dress Shirt Cover-Up",
        category: "Cover-Up",
        price: "$16.14",
        asin: "B0GY34D6CM",
        amazonLink: "https://amzn.to/4yj1hFV"
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
        amazonLink: "https://amzn.to/4xC9O6N"
      }
    ]
  },
  {
    id: "outfit-01",
    title: "The Manhattan Quiet Luxury Look",
    tag: "Trending",
    description: "An effortless blend of tailored oversized trench coat, pleated wide-leg trousers, clean minimal white sneakers, and a slouchy vegan leather bag.",
    image: "assets/outfit-manhattan-trench.jpg",
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
    image: "assets/outfit-autumn-chai.jpg",
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
    image: "assets/outfit-urban-minimalist-men.jpg",
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
