"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product, Review } from "../lib/types";
import { useCart } from "../lib/cart-context";
import ProductCard from "./ProductCard";
import WishlistButton from "./WishlistButton";

export default function ProductDetailClient({
  product,
  reviews,
  related,
}: {
  product: Product;
  reviews: Review[];
  related: Product[];
}) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [openSection, setOpenSection] = useState<string | null>("details");
  const [added, setAdded] = useState(false);

  const avgRating =
    reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : product.rating;

  const handleAdd = () => {
    addItem(product.slug, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white flex flex-col items-start w-full">
      <p className="font-normal text-verae-text-muted text-[11px] px-16 pt-8">
        Home / Shop / {product.category} /{" "}
        <span className="text-verae-text-dark">{product.name}</span>
      </p>

      <div className="flex gap-16 items-start px-16 py-8 w-full">
        {/* Gallery */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="relative w-full h-[520px] bg-verae-lilac-bg-2 rounded overflow-hidden">
            <Image src={product.image} alt={product.name} fill className="object-contain p-16" />
          </div>
        </div>

        {/* Info */}
        <div className="w-[420px] flex flex-col gap-1 shrink-0">
          <p className="font-semibold text-verae-accent-text text-[11px] tracking-[1px]">
            {product.badge ? `${product.badge} · ` : ""}
            {product.brand}
          </p>
          <div className="flex items-center justify-between mt-2 mb-2">
            <h1 className="font-bold text-verae-text-dark text-[32px]">{product.name}</h1>
            <WishlistButton slug={product.slug} className="text-2xl text-verae-plum" />
          </div>
          <p className="text-verae-accent-text text-[13px] mb-3">
            {"★".repeat(Math.round(avgRating))}
            {"☆".repeat(5 - Math.round(avgRating))} {product.reviewCount} Reviews
          </p>
          <p className="font-bold text-verae-text-dark text-2xl mb-5">${product.price.toFixed(2)}</p>

          <p className="font-normal text-verae-text-muted text-sm mb-6">{product.description}</p>

          <p className="font-semibold text-verae-text-dark text-[11px] tracking-[1px] mb-2">SIZE</p>
          <div className="flex gap-2 mb-6">
            {product.sizes.map((s: string) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-4 py-2.5 rounded border text-sm font-medium transition-colors ${
                  size === s
                    ? "border-verae-plum bg-verae-plum text-white"
                    : "border-verae-lavender text-verae-text-dark hover:border-verae-plum"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            onClick={handleAdd}
            className="bg-verae-plum text-white font-semibold text-sm tracking-[1px] rounded py-4 mb-4 hover:opacity-90 transition-opacity"
          >
            {added ? "ADDED TO BAG ✓" : `ADD TO BAG — $${product.price.toFixed(2)}`}
          </button>

          <p className="text-verae-text-muted text-xs mb-4">
            🌿 Vegan &nbsp; ♻ Refillable &nbsp; ✎ Derm Tested
          </p>

          <Accordion
            title="Full Ingredient List"
            open={openSection === "ingredients"}
            onToggle={() => setOpenSection(openSection === "ingredients" ? null : "ingredients")}
          >
            {product.ingredients}
          </Accordion>
          <Accordion
            title="How to Use"
            open={openSection === "how-to-use"}
            onToggle={() => setOpenSection(openSection === "how-to-use" ? null : "how-to-use")}
          >
            {product.howToUse}
          </Accordion>
          <Accordion
            title="Shipping & Returns"
            open={openSection === "shipping"}
            onToggle={() => setOpenSection(openSection === "shipping" ? null : "shipping")}
          >
            Free shipping on orders over $75. Free 30-day returns on unopened items.
          </Accordion>
        </div>
      </div>

      {/* Reviews */}
      <div className="flex flex-col gap-6 items-start px-16 py-12 w-full bg-verae-lilac-bg-2">
        <p className="font-semibold text-verae-accent-text text-[10px] tracking-[1px]">
          CUSTOMER REVIEWS
        </p>
        <div className="flex items-baseline gap-3">
          <p className="font-bold text-verae-text-dark text-4xl">{avgRating.toFixed(1)}</p>
          <p className="text-verae-accent-text text-sm">
            {"★".repeat(Math.round(avgRating))}
            {"☆".repeat(5 - Math.round(avgRating))} Based on {product.reviewCount} reviews
          </p>
        </div>
        <div className="flex flex-col gap-6 w-full">
          {reviews.map((r) => (
            <div key={r.name} className="flex flex-col gap-1.5">
              <p className="text-verae-accent-text text-sm">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
              <p className="font-semibold text-verae-text-dark text-sm">{r.name} — Verified Buyer</p>
              <p className="text-verae-text-muted text-sm max-w-[900px]">{r.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="flex flex-col gap-6 items-start px-16 py-16 w-full">
          <p className="font-semibold text-verae-accent-text text-[10px] tracking-[1px]">
            FREQUENTLY PAIRED WITH {product.name.toUpperCase()}
          </p>
          <h2 className="font-bold text-verae-text-dark text-[26px]">Complete the Ritual</h2>
          <div className="flex gap-5 items-start w-full">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}

      <Link
        href="/products"
        className="mx-16 mb-16 font-medium text-verae-accent-text text-sm hover:underline"
      >
        ← Back to All Products
      </Link>
    </div>
  );
}

function Accordion({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-verae-lilac-bg-2 py-4">
      <button onClick={onToggle} className="flex items-center justify-between w-full text-left">
        <span className="font-medium text-verae-text-dark text-sm">{title}</span>
        <span className="text-verae-text-dark text-lg">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="text-verae-text-muted text-sm mt-3">{children}</p>}
    </div>
  );
}
