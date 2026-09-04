export interface JournalPost {
  slug: string;
  tag: string;
  title: string;
  image: string;
  excerpt: string;
  body: string[];
}

export const journalPosts: JournalPost[] = [
  {
    slug: "what-regenerative-botanical-means",
    tag: "INGREDIENTS",
    title: 'What "Regenerative Botanical" Actually Means',
    image: "/images/purito-panthenol-cream.jpg",
    excerpt: "It's more than a buzzword on a label — here's what it takes for an ingredient to earn the claim.",
    body: [
      "Regenerative agriculture goes a step further than \"organic.\" Rather than simply avoiding synthetic pesticides, regenerative farms actively rebuild soil health — through crop rotation, composting, and minimal tilling — so the land produces more nutrient-dense plants over time instead of being gradually depleted.",
      "For skincare, that matters because the potency of a plant extract is only as good as the soil it grew in. A botanical grown in exhausted soil year after year yields weaker actives, forcing brands to use higher concentrations (or synthetic boosters) to hit the same performance.",
      "When we say a formula is built on regenerative botanicals, we mean the source farms are verified to be actively improving their soil health, not just avoiding the worst practices. It's a slower, more expensive way to source ingredients — but it's the only way we've found to keep both the skin and the land better off after every harvest.",
    ],
  },
  {
    slug: "building-a-minimalist-routine",
    tag: "RITUALS",
    title: "Building a Minimalist 4-Step Routine",
    image: "/images/arencia-rice-mochi-cleanser.jpg",
    excerpt: "More steps isn't more results. Here's how to build a routine that actually earns its place on your shelf.",
    body: [
      "It's easy to end up with twelve products and no idea which ones are actually doing anything. A minimalist routine isn't about deprivation — it's about making sure every step has a clear, non-overlapping job.",
      "Start with a gentle cleanser that doesn't leave skin feeling tight. If your skin feels stripped after washing, that's your first sign to simplify, not add more steps to compensate.",
      "Follow with one targeted treatment for your primary concern — not three. Layering multiple actives (retinoids, acids, vitamin C) in the same routine is the fastest way to irritate a barrier that hasn't been given time to adjust.",
      "Lock it in with a moisturizer suited to your barrier's current state, and finish mornings with SPF, non-negotiably. Four steps, done well and consistently, will outperform ten steps done inconsistently — almost every time.",
    ],
  },
  {
    slug: "inside-our-refill-program",
    tag: "SUSTAINABILITY",
    title: "Inside Our Refill Program",
    image: "/images/medicube-zero-pore-pad.jpg",
    excerpt: "Why we design every bottle to be reused, and what that actually looks like in practice.",
    body: [
      "The most sustainable packaging is the packaging you don't have to manufacture a second time. That's the entire logic behind designing for refills: every bottle you already own becomes infrastructure instead of waste.",
      "In practice, that means our containers are built with a slightly heavier-duty pump and cap mechanism than a single-use bottle would need, so they can be refilled dozens of times without the mechanism failing.",
      "It also means our formulas are shipped in concentrate where possible, which cuts the carbon cost of shipping water-heavy products across long distances. You add water at home for some lines, or simply pour in the refill concentrate for others.",
      "It's a small shift in habit — keep the bottle, replace the contents — but multiplied across a customer base, it's the single biggest lever we have on packaging waste, bigger than any material swap alone.",
    ],
  },
];

export function getJournalPostBySlug(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug);
}
