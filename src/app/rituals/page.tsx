"use client";

import Image from "next/image";
import { rituals } from "../../lib/rituals";
import { getProductBySlug } from "../../lib/products";
import { useCart } from "../../lib/cart-context";

export default function RitualsPage() {
  const { addItem } = useCart();

  return (
    <div className="flex flex-col gap-10 items-start px-16 py-12 w-full">
      <div>
        <p className="font-semibold text-verae-accent-text text-[11px] tracking-[1.5px]">
          CURATED ROUTINES
        </p>
        <h1 className="font-bold text-verae-text-dark text-[32px]">Shop the Ritual</h1>
        <p className="text-verae-text-muted text-sm mt-2 max-w-[600px]">
          Pre-built routines, bundled at a discount. Each ritual adds every product below to your
          bag at once.
        </p>
      </div>

      <div className="flex gap-8 w-full">
        {rituals.map((ritual) => {
          const bundleProducts = ritual.productSlugs
            .map(getProductBySlug)
            .filter((p) => p !== undefined);
          const bundleSubtotal = bundleProducts.reduce((sum, p) => sum + p.price, 0);
          const discountedTotal = bundleSubtotal * (1 - ritual.discountRate);

          return (
            <div key={ritual.slug} className="flex-1 flex flex-col gap-4 bg-verae-lilac-bg-2 rounded p-6">
              <p className="font-semibold text-verae-accent-text text-[10px] tracking-[1px]">
                {ritual.eyebrow}
              </p>
              <h2 className="font-bold text-verae-text-dark text-xl">{ritual.title}</h2>
              <p className="text-verae-text-muted text-sm">{ritual.desc}</p>

              <div className="flex flex-col gap-3">
                {bundleProducts.map((p) => (
                  <div key={p.slug} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded bg-white shrink-0 overflow-hidden">
                      <Image src={p.image} alt={p.name} fill className="object-contain p-1.5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-verae-text-dark text-xs">{p.name}</p>
                      <p className="text-verae-text-muted text-[11px]">{p.brand}</p>
                    </div>
                    <p className="text-verae-text-dark text-xs">${p.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-baseline gap-2 pt-2">
                <p className="font-bold text-verae-text-dark text-lg">${discountedTotal.toFixed(2)}</p>
                <p className="text-verae-text-muted text-xs line-through">${bundleSubtotal.toFixed(2)}</p>
                <span className="font-semibold text-verae-accent-text text-[11px]">{ritual.discountLabel}</span>
              </div>

              <button
                onClick={() => bundleProducts.forEach((p) => addItem(p.slug, p.sizes[0]))}
                className="bg-verae-plum text-white font-semibold text-xs tracking-[1px] rounded py-3.5 hover:opacity-90 transition-opacity"
              >
                ADD BUNDLE TO BAG
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
