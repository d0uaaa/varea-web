"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../lib/cart-context";
import { saveOrder, generateOrderNumber, type ShippingAddress } from "../../lib/orders";

const FREE_SHIPPING_THRESHOLD = 75;
const FLAT_SHIPPING = 6.5;

export default function CheckoutPage() {
  const { lines, subtotal, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState<ShippingAddress>({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "United States",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;

  const update = (field: keyof ShippingAddress, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const next: Partial<Record<keyof ShippingAddress, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Required";
    if (!form.email.trim() || !form.email.includes("@")) next.email = "Enter a valid email";
    if (!form.address.trim()) next.address = "Required";
    if (!form.city.trim()) next.city = "Required";
    if (!form.postalCode.trim()) next.postalCode = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) return;
    if (!validate()) return;

    setSubmitting(true);
    const orderNumber = generateOrderNumber();
    saveOrder({
      orderNumber,
      date: new Date().toISOString(),
      lines,
      subtotal,
      shipping,
      total,
      shippingAddress: form,
    });
    clearCart();
    router.push(`/order-confirmation/${orderNumber}`);
  };

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 px-16">
        <p className="font-bold text-verae-text-dark text-2xl">Your bag is empty</p>
        <p className="text-verae-text-muted text-sm">Add something to your bag before checking out.</p>
        <Link href="/products" className="font-semibold text-verae-accent-text text-sm hover:underline">
          Browse Products →
        </Link>
      </div>
    );
  }

  return (
    <div className="flex gap-16 items-start px-16 py-12 w-full">
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-8">
        <div>
          <p className="font-normal text-verae-text-muted text-[11px] mb-2">
            <Link href="/products" className="hover:underline">Shop</Link> / <Link href="/" className="hover:underline">Cart</Link> / <span className="text-verae-text-dark">Checkout</span>
          </p>
          <h1 className="font-bold text-verae-text-dark text-[28px]">Checkout</h1>
        </div>

        <fieldset className="flex flex-col gap-3">
          <legend className="font-semibold text-verae-text-dark text-sm mb-1">Contact</legend>
          <Field label="Full Name" value={form.fullName} error={errors.fullName} onChange={(v) => update("fullName", v)} />
          <Field label="Email" type="email" value={form.email} error={errors.email} onChange={(v) => update("email", v)} />
        </fieldset>

        <fieldset className="flex flex-col gap-3">
          <legend className="font-semibold text-verae-text-dark text-sm mb-1">Shipping Address</legend>
          <Field label="Address" value={form.address} error={errors.address} onChange={(v) => update("address", v)} />
          <div className="flex gap-3">
            <Field label="City" value={form.city} error={errors.city} onChange={(v) => update("city", v)} />
            <Field label="Postal Code" value={form.postalCode} error={errors.postalCode} onChange={(v) => update("postalCode", v)} />
          </div>
          <Field label="Country" value={form.country} onChange={(v) => update("country", v)} />
        </fieldset>

        <fieldset className="flex flex-col gap-3">
          <legend className="font-semibold text-verae-text-dark text-sm mb-1">Payment</legend>
          <div className="bg-verae-lilac-bg-2 rounded p-4 text-verae-text-muted text-xs">
            This is a demo storefront — no real payment provider is connected. Submitting this
            form will place a mock order and skip straight to a confirmation page.
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={submitting}
          className="bg-verae-plum text-white font-semibold text-sm tracking-[1px] rounded py-4 hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {submitting ? "PLACING ORDER..." : `PLACE ORDER — $${total.toFixed(2)}`}
        </button>
      </form>

      <aside className="w-[360px] shrink-0 flex flex-col gap-5 bg-verae-lilac-bg-2 rounded p-6">
        <h2 className="font-bold text-verae-text-dark text-lg">Order Summary</h2>
        <div className="flex flex-col gap-4 divide-y divide-white">
          {lines.map((line) => (
            <div key={`${line.slug}-${line.size}`} className="flex gap-3 pt-4 first:pt-0">
              <div className="relative w-14 h-14 rounded bg-white shrink-0 overflow-hidden">
                <Image src={line.image} alt={line.name} fill className="object-contain p-1.5" />
                <span className="absolute -top-1.5 -right-1.5 bg-verae-plum text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {line.qty}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-verae-text-dark text-xs">{line.name}</p>
                <p className="text-verae-text-muted text-[11px]">{line.size}</p>
              </div>
              <p className="font-semibold text-verae-text-dark text-xs">${line.lineTotal.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 border-t border-white pt-4">
          <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
          <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} />
          <Row label="Total" value={`$${total.toFixed(2)}`} bold />
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <label className="flex-1 flex flex-col gap-1">
      <span className="text-verae-text-dark text-xs font-medium">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border rounded px-3 py-2.5 text-sm outline-none ${
          error ? "border-red-400" : "border-verae-lavender focus:border-verae-plum"
        }`}
      />
      {error && <span className="text-red-500 text-[11px]">{error}</span>}
    </label>
  );
}

function Row({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <p className={`text-verae-text-dark text-sm ${bold ? "font-bold" : ""}`}>{label}</p>
      <p className={`text-verae-text-dark text-sm ${bold ? "font-bold" : ""}`}>{value}</p>
    </div>
  );
}
