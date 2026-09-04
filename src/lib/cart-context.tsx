"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductBySlug } from "./products";

export interface CartLine {
  slug: string;
  size: string;
  qty: number;
}

export interface CartLineWithProduct extends CartLine {
  name: string;
  brand: string;
  price: number;
  image: string;
  lineTotal: number;
}

interface CartContextValue {
  lines: CartLineWithProduct[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (slug: string, size: string, qty?: number) => void;
  removeItem: (slug: string, size: string) => void;
  updateQty: (slug: string, size: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "verae-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [rawLines, setRawLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart on mount.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // One-time hydration from localStorage on mount; must run client-side only
      // to avoid an SSR/client mismatch, so an effect is the correct tool here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setRawLines(JSON.parse(stored));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  // Persist on every change, once hydrated (avoids wiping storage on first render).
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rawLines));
  }, [rawLines, hydrated]);

  const addItem = (slug: string, size: string, qty = 1) => {
    setRawLines((prev) => {
      const existing = prev.find((l) => l.slug === slug && l.size === size);
      if (existing) {
        return prev.map((l) =>
          l.slug === slug && l.size === size ? { ...l, qty: l.qty + qty } : l
        );
      }
      return [...prev, { slug, size, qty }];
    });
    setIsOpen(true);
  };

  const removeItem = (slug: string, size: string) => {
    setRawLines((prev) => prev.filter((l) => !(l.slug === slug && l.size === size)));
  };

  const updateQty = (slug: string, size: string, qty: number) => {
    if (qty < 1) {
      removeItem(slug, size);
      return;
    }
    setRawLines((prev) =>
      prev.map((l) => (l.slug === slug && l.size === size ? { ...l, qty } : l))
    );
  };

  const clearCart = () => setRawLines([]);

  const lines: CartLineWithProduct[] = useMemo(
    () =>
      rawLines
        .map((line) => {
          const product = getProductBySlug(line.slug);
          if (!product) return null;
          return {
            ...line,
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.image,
            lineTotal: product.price * line.qty,
          };
        })
        .filter((l): l is CartLineWithProduct => l !== null),
    [rawLines]
  );

  const itemCount = lines.reduce((sum, l) => sum + l.qty, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);

  return (
    <CartContext.Provider
      value={{
        lines,
        itemCount,
        subtotal,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        removeItem,
        updateQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
