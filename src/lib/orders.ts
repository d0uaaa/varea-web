import type { CartLineWithProduct } from "./cart-context";

export interface ShippingAddress {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  orderNumber: string;
  date: string; // ISO string
  lines: CartLineWithProduct[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
}

const STORAGE_KEY = "verae-orders";

export function generateOrderNumber(): string {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `VR-${random}`;
}

export function saveOrder(order: Order) {
  if (typeof window === "undefined") return;
  const existing = getOrders();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([order, ...existing]));
}

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Order[]) : [];
  } catch {
    return [];
  }
}

export function getOrderByNumber(orderNumber: string): Order | undefined {
  return getOrders().find((o) => o.orderNumber === orderNumber);
}
