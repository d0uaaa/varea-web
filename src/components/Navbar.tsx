"use client";

import Link from "next/link";
import { useCart } from "../lib/cart-context";
import { useWishlist } from "../lib/wishlist-context";
import { useSearch } from "../lib/search-context";

export default function Navbar() {
  const { itemCount, openCart } = useCart();
  const { slugs } = useWishlist();
  const { openSearch } = useSearch();

  return (
    <div className="bg-white flex items-center justify-between px-12 py-5 w-full sticky top-0 z-30">
      <Link href="/" className="font-bold text-verae-plum text-xl tracking-[3px]">
        VERAE
      </Link>

      <nav className="flex gap-8 items-center font-medium text-verae-text-dark text-[13px]">
        <Link href="/products" className="hover:text-verae-accent-text transition-colors">
          Shop
        </Link>
        <Link href="/products" className="hover:text-verae-accent-text transition-colors">
          Bestsellers
        </Link>
        <Link href="/rituals" className="hover:text-verae-accent-text transition-colors">
          Rituals
        </Link>
        <Link href="/our-story" className="hover:text-verae-accent-text transition-colors">
          Our Story
        </Link>
        <Link href="/journal" className="hover:text-verae-accent-text transition-colors">
          Journal
        </Link>
      </nav>

      <div className="flex gap-6 items-center font-medium text-verae-text-dark text-[13px]">
        <button onClick={openSearch} className="hover:text-verae-accent-text transition-colors">
          Search
        </button>
        <Link href="/account" className="hover:text-verae-accent-text transition-colors">
          Account
        </Link>
        <Link href="/wishlist" className="hover:text-verae-accent-text transition-colors">
          Wishlist ({slugs.length})
        </Link>
        <button onClick={openCart} className="hover:text-verae-accent-text transition-colors">
          Bag ({itemCount})
        </button>
      </div>
    </div>
  );
}
