"use client";

import Link from "next/link";
import { useWishlist } from "../../lib/wishlist-context";
import { getProductBySlug } from "../../lib/products";
import ProductCard from "../../components/ProductCard";

export default function WishlistPage() {
  const { slugs } = useWishlist();
  const products = slugs.map(getProductBySlug).filter((p) => p !== undefined);

  return (
    <div className="flex flex-col gap-6 items-start px-16 py-12 w-full">
      <h1 className="font-bold text-verae-text-dark text-[28px]">Your Wishlist</h1>

      {products.length === 0 ? (
        <div className="flex flex-col gap-3 items-start py-12">
          <p className="text-verae-text-muted text-sm">
            Nothing saved yet. Tap the ♡ on any product to add it here.
          </p>
          <Link href="/products" className="font-semibold text-verae-accent-text text-sm hover:underline">
            Browse Products →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-6 w-full">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
