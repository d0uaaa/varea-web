"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "../lib/types";
import { useCart } from "../lib/cart-context";
import WishlistButton from "./WishlistButton";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="flex flex-1 flex-col gap-1.5 items-start min-w-0">
      <Link href={`/products/${product.slug}`} className="w-full group">
        <div className="relative h-[220px] w-full rounded bg-white overflow-hidden">
          {product.badge && (
            <span className="absolute top-2 left-2 z-10 bg-white px-2 py-1 rounded-sm font-semibold text-verae-plum text-[9px] tracking-[0.5px]">
              {product.badge}
            </span>
          )}
          <WishlistButton
            slug={product.slug}
            className="absolute top-2 right-2 z-10 bg-white rounded-full w-7 h-7 flex items-center justify-center text-verae-plum text-sm"
          />
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform"
          />
        </div>
      </Link>
      <Link href={`/products/${product.slug}`}>
        <p className="font-semibold text-verae-text-dark text-sm hover:text-verae-accent-text transition-colors">
          {product.name}
        </p>
      </Link>
      <p className="font-normal text-verae-text-muted text-[11px]">{product.shortDesc}</p>
      <div className="flex items-center justify-between w-full">
        <p className="text-verae-accent-text text-[11px]">
          {"★".repeat(Math.round(product.rating))}
          {"☆".repeat(5 - Math.round(product.rating))} {product.reviewCount}
        </p>
        <p className="font-semibold text-verae-text-dark text-[13px]">${product.price.toFixed(2)}</p>
      </div>
      <button
        onClick={() => addItem(product.slug, product.sizes[0])}
        className="w-full border border-verae-text-dark py-2 font-semibold text-verae-text-dark text-[10px] tracking-[1px] hover:bg-verae-text-dark hover:text-white transition-colors"
      >
        QUICK ADD
      </button>
    </div>
  );
}
