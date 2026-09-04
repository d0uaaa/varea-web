"use client";

import { useMemo, useState, type ReactNode } from "react";
import { getAllProducts } from "../../lib/products";
import type { Concern, SkinType } from "../../lib/types";
import ProductCard from "../../components/ProductCard";

const ALL_CONCERNS: Concern[] = ["Hydration", "Barrier Repair", "Brightening", "Redness Relief"];
const ALL_SKIN_TYPES: SkinType[] = ["Dry", "Combination", "Oily", "Sensitive"];
const PRICE_BANDS = [
  { label: "Under $20", test: (p: number) => p < 20 },
  { label: "$20 – $30", test: (p: number) => p >= 20 && p <= 30 },
  { label: "$30+", test: (p: number) => p > 30 },
];
type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

export default function ProductsPage() {
  const allProducts = getAllProducts();

  const [concerns, setConcerns] = useState<Concern[]>([]);
  const [skinTypes, setSkinTypes] = useState<SkinType[]>([]);
  const [priceBand, setPriceBand] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [sort, setSort] = useState<SortKey>("featured");

  const toggle = <T,>(list: T[], value: T, setter: (v: T[]) => void) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const clearAll = () => {
    setConcerns([]);
    setSkinTypes([]);
    setPriceBand(null);
    setMinRating(null);
  };

  const filtered = useMemo(() => {
    let result = allProducts.filter((p) => {
      if (concerns.length && !concerns.some((c) => p.concerns.includes(c))) return false;
      if (skinTypes.length && !skinTypes.some((s) => p.skinTypes.includes(s))) return false;
      if (priceBand) {
        const band = PRICE_BANDS.find((b) => b.label === priceBand);
        if (band && !band.test(p.price)) return false;
      }
      if (minRating && p.rating < minRating) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return result;
  }, [allProducts, concerns, skinTypes, priceBand, minRating, sort]);

  const activeFilters: { label: string; onClear: () => void }[] = [
    ...concerns.map((c) => ({ label: c, onClear: () => toggle(concerns, c, setConcerns) })),
    ...skinTypes.map((s) => ({ label: s, onClear: () => toggle(skinTypes, s, setSkinTypes) })),
    ...(priceBand ? [{ label: priceBand, onClear: () => setPriceBand(null) }] : []),
    ...(minRating ? [{ label: `${minRating}★ & up`, onClear: () => setMinRating(null) }] : []),
  ];

  return (
    <div className="bg-white flex flex-col items-start w-full">
      <div className="flex flex-col gap-2 items-start px-16 pt-8 pb-4 w-full">
        <p className="font-normal text-verae-text-muted text-[11px]">Home / Shop / All Products</p>
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-verae-text-dark text-[32px]">All Products</h1>
            <p className="font-normal text-verae-text-muted text-xs">{filtered.length} products</p>
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="border border-verae-lavender rounded-full px-3.5 py-2 font-medium text-verae-text-dark text-xs outline-none"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex gap-2.5 items-center px-16 pb-4 w-full flex-wrap">
          {activeFilters.map((f) => (
            <button
              key={f.label}
              onClick={f.onClear}
              className="bg-verae-lavender/30 px-3 py-1.5 rounded-full font-medium text-verae-plum text-[11px]"
            >
              {f.label} ✕
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-10 items-start px-16 pb-16 w-full">
        <aside className="flex flex-col gap-7 items-start w-[220px] shrink-0">
          <FilterGroup title="SHOP BY CONCERN">
            {ALL_CONCERNS.map((c) => (
              <Checkbox
                key={c}
                label={c}
                checked={concerns.includes(c)}
                onChange={() => toggle(concerns, c, setConcerns)}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="SKIN TYPE">
            {ALL_SKIN_TYPES.map((s) => (
              <Checkbox
                key={s}
                label={s}
                checked={skinTypes.includes(s)}
                onChange={() => toggle(skinTypes, s, setSkinTypes)}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="PRICE">
            {PRICE_BANDS.map((b) => (
              <Checkbox
                key={b.label}
                label={b.label}
                checked={priceBand === b.label}
                onChange={() => setPriceBand(priceBand === b.label ? null : b.label)}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="CUSTOMER RATING">
            <Checkbox
              label="★★★★☆ & up"
              checked={minRating === 4}
              onChange={() => setMinRating(minRating === 4 ? null : 4)}
            />
          </FilterGroup>

          {activeFilters.length > 0 && (
            <button
              onClick={clearAll}
              className="font-semibold text-verae-accent-text text-xs hover:underline"
            >
              Clear All Filters
            </button>
          )}
        </aside>

        <div className="flex-1 flex flex-col gap-6 items-start min-w-0">
          {filtered.length === 0 ? (
            <p className="text-verae-text-muted text-sm py-12 w-full text-center">
              No products match those filters.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-6 w-full">
              {filtered.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}

          <div className="flex flex-col gap-2 items-start pt-4">
            <p className="font-semibold text-verae-accent-text text-[10px] tracking-[1px]">
              ABOUT THIS COLLECTION
            </p>
            <p className="font-normal text-verae-text-muted text-xs max-w-[900px]">
              Every Verae formula is chosen for a compromised or reactive skin barrier —
              vegan, cruelty-free, and designed to work together as a gentle daily routine.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 items-start">
      <p className="font-semibold text-verae-text-dark text-[11px] tracking-[1px]">{title}</p>
      {children}
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex gap-2 items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-3 accent-verae-plum"
      />
      <span className="text-verae-text-dark text-xs">{label}</span>
    </label>
  );
}
