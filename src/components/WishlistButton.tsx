"use client";

import { useWishlist } from "../lib/wishlist-context";

export default function WishlistButton({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const { isWishlisted, toggle } = useWishlist();
  const active = isWishlisted(slug);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      className={`transition-colors ${className}`}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}
