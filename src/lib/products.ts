import type { Product, Review } from "./types";

export const products: Product[] = [
  {
    slug: "mighty-bamboo-panthenol-cream",
    name: "Mighty Bamboo Panthenol Cream",
    brand: "Purito Seoul",
    price: 24.0,
    category: "Moisturizers",
    concerns: ["Hydration", "Barrier Repair"],
    skinTypes: ["Dry", "Sensitive", "Combination"],
    rating: 4.8,
    reviewCount: 214,
    badge: "BESTSELLER",
    image: "/images/purito-panthenol-cream.jpg",
    shortDesc: "Bamboo + panthenol moisture barrier cream",
    description:
      "A lightweight yet deeply nourishing cream built around bamboo extract and panthenol to reinforce a compromised moisture barrier. Absorbs quickly without pilling, leaving skin soft and calm — a daily staple for dry or reactive skin.",
    sizes: ["50ml", "100ml"],
    ingredients:
      "Bamboo Water, Panthenol, Centella Asiatica Extract, Ceramide NP, Hyaluronic Acid, Squalane.",
    howToUse:
      "Apply as the last step of your routine, morning and night, after serums. Warm a pea-sized amount between fingers and press into skin.",
  },
  {
    slug: "fresh-green-rice-mochi-cleanser",
    name: "Fresh Green Rice Mochi Cleanser",
    brand: "Arencia",
    price: 19.0,
    category: "Cleansers",
    concerns: ["Brightening"],
    skinTypes: ["Combination", "Oily"],
    rating: 4.6,
    reviewCount: 98,
    badge: "NEW",
    image: "/images/arencia-rice-mochi-cleanser.jpg",
    shortDesc: "Green tea + rice bran gel-to-foam cleanser",
    description:
      "A gentle gel cleanser that transforms into a soft, mochi-like foam. Green tea and fermented rice bran lift away impurities and buildup without stripping skin, leaving a brighter, more even-toned finish.",
    sizes: ["120g"],
    ingredients: "Green Tea Extract, Rice Bran Water, Betaine, Panthenol, Centella Asiatica Extract.",
    howToUse:
      "Massage a small amount onto damp skin morning and night, working into a light lather, then rinse thoroughly with lukewarm water.",
  },
  {
    slug: "zero-pore-pad",
    name: "Zero Pore Pad",
    brand: "medicube",
    price: 29.0,
    category: "Exfoliants",
    concerns: ["Brightening", "Barrier Repair"],
    skinTypes: ["Oily", "Combination"],
    rating: 4.7,
    reviewCount: 341,
    badge: "BESTSELLER",
    image: "/images/medicube-zero-pore-pad.jpg",
    shortDesc: "AHA/BHA + panthenol toner pads for visible pores",
    description:
      "Dual-textured exfoliating pads that sweep away dead skin and excess oil with a gentle AHA/BHA blend, while panthenol and allantoin keep the barrier calm. Pores look tighter and texture smoother after just a few uses.",
    sizes: ["70 pads"],
    ingredients: "Salicylic Acid, Glycolic Acid, Panthenol, Allantoin, Sodium Hyaluronate, Niacinamide.",
    howToUse:
      "After cleansing, sweep a pad over the face 2–3 times using the textured side first, then the smooth side. Use 2–3x per week, building up as tolerated.",
  },
  {
    slug: "effaclar-duo-plus",
    name: "Effaclar Duo (+)",
    brand: "La Roche-Posay",
    price: 32.0,
    category: "Treatments",
    concerns: ["Redness Relief", "Barrier Repair"],
    skinTypes: ["Oily", "Sensitive"],
    rating: 4.5,
    reviewCount: 512,
    image: "/images/la-roche-posay-effaclar-duo.jpg",
    shortDesc: "Corrective anti-imperfections care",
    description:
      "A dermatologist-developed corrective care that targets blemishes and marks while helping to prevent recurrence. Formulated with La Roche-Posay thermal spring water to soothe as it treats.",
    sizes: ["40ml"],
    ingredients: "Niacinamide, Piroctone Olamine, Zinc PCA, La Roche-Posay Thermal Spring Water.",
    howToUse:
      "Apply morning and evening to clean, dry skin, focusing on blemish-prone areas. Follow with sunscreen during the day.",
  },
  {
    slug: "salicylic-acid-2-percent-solution",
    name: "Salicylic Acid 2% Solution",
    brand: "The Ordinary",
    price: 9.0,
    category: "Treatments",
    concerns: ["Brightening", "Barrier Repair"],
    skinTypes: ["Oily", "Combination"],
    rating: 4.3,
    reviewCount: 892,
    badge: "ONLY 5 LEFT",
    image: "/images/ordinary-salicylic-acid.jpg",
    shortDesc: "Targeted exfoliating solution for acne-prone skin",
    description:
      "A clinical-strength salicylic acid solution formulated to exfoliate within the pore lining, targeting congestion and texture. A little goes a long way — best introduced gradually into a routine.",
    sizes: ["30ml"],
    ingredients: "Salicylic Acid 2%, Hydroxyethylcellulose, Glycerin.",
    howToUse:
      "Apply a thin layer to targeted areas of concern using a cotton pad, once daily. Avoid the eye area and always follow with SPF during the day.",
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, count = 4): Product[] {
  return products.filter((p) => p.slug !== slug).slice(0, count);
}

// Static, illustrative reviews — not tied to real customers.
export const reviewsBySlug: Record<string, Review[]> = {
  "mighty-bamboo-panthenol-cream": [
    { initials: "JK", name: "J. Kim", rating: 5, body: "My barrier finally feels calm again. Layers beautifully under sunscreen." },
    { initials: "MR", name: "M. Ramirez", rating: 5, body: "Lightweight but genuinely hydrating — my go-to for sensitive skin days." },
  ],
  "fresh-green-rice-mochi-cleanser": [
    { initials: "AT", name: "A. Tran", rating: 4, body: "Foams up gently and doesn't leave that tight, stripped feeling." },
    { initials: "SP", name: "S. Park", rating: 5, body: "Skin looks noticeably brighter after a couple weeks of daily use." },
  ],
  "zero-pore-pad": [
    { initials: "DL", name: "D. Lee", rating: 5, body: "Pores look visibly smaller within two weeks. Texture side works wonders." },
    { initials: "NC", name: "N. Cho", rating: 4, body: "Strong but not harsh if you build up slowly. Great value for 70 pads." },
  ],
  "effaclar-duo-plus": [
    { initials: "RB", name: "R. Bennett", rating: 4, body: "Calms redness fast without drying me out like other spot treatments." },
    { initials: "LW", name: "L. White", rating: 5, body: "A dermatologist recommended this and it's lived up to the hype." },
  ],
  "salicylic-acid-2-percent-solution": [
    { initials: "TH", name: "T. Huang", rating: 4, body: "Budget-friendly and effective — just start slow, it's potent." },
    { initials: "OB", name: "O. Brooks", rating: 4, body: "Cleared up my congestion within a couple weeks of nightly use." },
  ],
};
