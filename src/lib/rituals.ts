export interface Ritual {
  slug: string;
  eyebrow: string;
  title: string;
  desc: string;
  discountLabel: string;
  discountRate: number; // e.g. 0.2 for 20% off
  productSlugs: string[];
  image: string;
}

export const rituals: Ritual[] = [
  {
    slug: "morning-ritual",
    eyebrow: "THE MORNING RITUAL",
    title: "The Morning Ritual",
    desc: "Cleanse, hydrate, protect. Everything your skin needs before the day begins.",
    discountLabel: "SAVE 20%",
    discountRate: 0.2,
    productSlugs: ["fresh-green-rice-mochi-cleanser", "mighty-bamboo-panthenol-cream"],
    image: "/images/purito-panthenol-cream.jpg",
  },
  {
    slug: "evening-ritual",
    eyebrow: "THE EVENING RITUAL",
    title: "The Evening Ritual",
    desc: "Repair, renew, restore. Overnight recovery for visibly healthier skin.",
    discountLabel: "SAVE 15%",
    discountRate: 0.15,
    productSlugs: ["zero-pore-pad", "salicylic-acid-2-percent-solution", "effaclar-duo-plus"],
    image: "/images/la-roche-posay-effaclar-duo.jpg",
  },
];

export function getRitualBySlug(slug: string): Ritual | undefined {
  return rituals.find((r) => r.slug === slug);
}
