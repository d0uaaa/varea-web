"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "../lib/cart-context";

const FREE_SHIPPING_THRESHOLD = 75;

export default function CartDrawer() {
  const { lines, subtotal, isOpen, closeCart, removeItem, updateQty } = useCart();
  const router = useRouter();

  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const progressPct = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-verae-lilac-bg-2">
          <h2 className="font-bold text-verae-text-dark text-xl">Your Bag ({lines.length})</h2>
          <button onClick={closeCart} aria-label="Close cart" className="text-verae-text-dark text-lg">
            ✕
          </button>
        </div>

        {subtotal < FREE_SHIPPING_THRESHOLD && lines.length > 0 && (
          <div className="px-6 py-4">
            <p className="text-verae-text-dark text-[13px] mb-2">
              You&apos;re ${remaining.toFixed(0)} away from Free Shipping
            </p>
            <div className="h-1.5 w-full bg-verae-lilac-bg-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-verae-accent rounded-full transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 divide-y divide-verae-lilac-bg-2">
          {lines.length === 0 ? (
            <p className="text-verae-text-muted text-sm py-10 text-center">Your bag is empty.</p>
          ) : (
            lines.map((line) => (
              <div key={`${line.slug}-${line.size}`} className="flex gap-4 py-5">
                <div className="relative w-[72px] h-[72px] rounded bg-verae-lilac-bg-2 shrink-0 overflow-hidden">
                  <Image src={line.image} alt={line.name} fill className="object-contain p-1.5" />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <p className="font-semibold text-verae-text-dark text-sm">{line.name}</p>
                  <p className="text-verae-text-muted text-xs">{line.size}</p>
                  <div className="flex items-center gap-3 border border-verae-lilac-bg-2 rounded w-fit px-2 py-1">
                    <button
                      onClick={() => updateQty(line.slug, line.size, line.qty - 1)}
                      aria-label="Decrease quantity"
                      className="text-verae-text-dark px-1"
                    >
                      −
                    </button>
                    <span className="text-verae-text-dark text-sm w-4 text-center">{line.qty}</span>
                    <button
                      onClick={() => updateQty(line.slug, line.size, line.qty + 1)}
                      aria-label="Increase quantity"
                      className="text-verae-text-dark px-1"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(line.slug, line.size)}
                    className="text-verae-text-muted text-xs text-left hover:text-verae-accent-text"
                  >
                    Remove
                  </button>
                </div>
                <p className="font-semibold text-verae-text-dark text-sm whitespace-nowrap">
                  ${line.lineTotal.toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-verae-lilac-bg-2 px-6 py-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-verae-text-dark">Subtotal</p>
            <p className="font-semibold text-verae-text-dark">${subtotal.toFixed(2)}</p>
          </div>
          <p className="text-verae-text-muted text-xs">Shipping &amp; taxes calculated at checkout</p>
          <button
            disabled={lines.length === 0}
            onClick={() => {
              closeCart();
              router.push("/checkout");
            }}
            className="bg-verae-plum disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm tracking-[1px] rounded py-3.5 hover:opacity-90 transition-opacity"
          >
            CHECKOUT — ${subtotal.toFixed(2)}
          </button>
          <p className="text-verae-text-muted text-[11px] text-center">
            🔒 Secure Checkout · Free 30-Day Returns
          </p>
        </div>
      </aside>
    </>
  );
}
