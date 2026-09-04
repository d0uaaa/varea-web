"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearch } from "../lib/search-context";
import { getAllProducts } from "../lib/products";

export default function SearchOverlay() {
  const { isOpen, closeSearch } = useSearch();
  const [query, setQuery] = useState("");
  const allProducts = getAllProducts();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.concerns.some((c) => c.toLowerCase().includes(q))
    );
  }, [query, allProducts]);

  const handleClose = () => {
    closeSearch();
    setQuery("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center bg-black/40 px-4 pt-24" onClick={handleClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-[560px] rounded-lg shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-verae-lilac-bg-2">
          <span className="text-verae-text-muted">🔍</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands, concerns..."
            className="flex-1 outline-none text-verae-text-dark text-sm"
          />
          <button onClick={handleClose} className="text-verae-text-muted text-sm">
            ESC
          </button>
        </div>

        {query.trim() !== "" && (
          <div className="max-h-[420px] overflow-y-auto">
            {results.length === 0 ? (
              <p className="text-verae-text-muted text-sm px-5 py-8 text-center">
                No products found for &ldquo;{query}&rdquo;.
              </p>
            ) : (
              results.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  onClick={handleClose}
                  className="flex items-center gap-4 px-5 py-3 hover:bg-verae-lilac-bg-2 transition-colors"
                >
                  <div className="relative w-12 h-12 rounded bg-verae-lilac-bg-2 shrink-0 overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-verae-text-dark text-sm truncate">{p.name}</p>
                    <p className="text-verae-text-muted text-xs">{p.brand}</p>
                  </div>
                  <p className="font-semibold text-verae-text-dark text-sm">${p.price.toFixed(2)}</p>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
