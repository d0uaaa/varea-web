# Verae — Full E-Commerce Site (Next.js)

A complete, working storefront. Every nav link and footer link goes somewhere real — nothing is a dead `#` link or a Figma-style mockup. Built with Next.js 16 (App Router), TypeScript, and Tailwind v4.

Verified before delivery: `npm install`, `next build` (27/27 routes compiled and generated), and `eslint` all pass clean.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Every page, and what actually works on it

| Page | What's real |
|---|---|
| `/` Homepage | Hero, trust bar, bestsellers, editorial quote, rituals, journal, newsletter form |
| `/products` | Live filtering (concern, skin type, price, rating) and sorting — not decorative |
| `/products/[slug]` | Size picker, add-to-bag, expandable ingredients/how-to-use, reviews, cross-sell to the other real products |
| `/rituals` | Two bundles mapped to real products; "Add Bundle to Bag" adds every item in one click |
| `/journal` + `/journal/[slug]` | 3 full articles, not stubs |
| `/wishlist` | Heart-toggle from any product card or detail page; persists across visits |
| `/checkout` | Real form with validation; submitting creates an order and clears the cart |
| `/order-confirmation/[orderNumber]` | Shows the order you just placed |
| `/account` | Local order history (see limitation below) |
| `/track-order` | Look up an order by number |
| `/our-story`, `/sustainability`, `/faq`, `/shipping-returns`, `/contact`, `/privacy-policy`, `/terms-of-service`, `/careers` | Real written content, not lorem ipsum |

Cart, wishlist, and order history all persist via `localStorage`, so refreshing the page doesn't lose your bag.

## Honest limitations — read this before showing it to anyone

This is a **demo storefront**, not a production e-commerce backend. Specifically:

1. **No real payment processing.** Checkout collects a shipping address and "places" an order, but there's no Stripe/PayPal/etc. integration. This is explicitly stated on the checkout page itself.
2. **No real user accounts.** `/account` shows order history stored in *this browser's* `localStorage` — there's no login, no server-side database, and no way to see your orders from a different device or browser. It says so on the page.
3. **Ritual bundle discounts are cosmetic.** The `/rituals` page displays a bundle price with a discount, but the cart itself still charges each product at full price when the bundle's items are added — there's no real discount/promo-code engine wired into the cart total. If you need real bundle pricing, that's the next thing to build (a `discountedTotal` override per cart line, or a promo-code system).
4. **The 5-product catalog is intentional, not a limitation to apologize for** — every product has a real photo you provided. I didn't pad it with placeholder SKUs that have no real image.
5. **No inventory/stock tracking** — "ONLY 5 LEFT" on one product is static copy, not a real counter that decrements.

## Structure

- `src/lib/` — all shared data and state: `products.ts`, `journal.ts`, `rituals.ts`, `orders.ts` (order persistence), `cart-context.tsx`, `wishlist-context.tsx`, `search-context.tsx`, `types.ts`.
- `src/components/` — `ProductCard`, `CartDrawer`, `SearchOverlay`, `WishlistButton` are the shared interactive pieces reused across pages; the rest are homepage sections.
- `src/app/` — one folder per route, following the table above.

## Extending it

- **Add a product**: add an entry to `src/lib/products.ts` and drop an image in `public/images/`. It automatically appears in the listing, homepage bestsellers, and gets its own detail page.
- **Add a real payment provider**: replace the mock submit handler in `src/app/checkout/page.tsx` with a real Stripe Checkout session or Payment Intent call.
- **Add real accounts**: swap `src/lib/orders.ts`'s `localStorage` calls for a real database + auth provider (NextAuth, Clerk, etc.) — the rest of the app (`/account`, `/order-confirmation`) is already shaped to consume an `Order[]`, so the UI layer mostly doesn't need to change.
