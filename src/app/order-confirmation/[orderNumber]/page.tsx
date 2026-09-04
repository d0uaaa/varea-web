"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getOrderByNumber, type Order } from "../../../lib/orders";

export default function OrderConfirmationPage() {
  const params = useParams<{ orderNumber: string }>();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    // One-time read from localStorage on mount; must run client-side only.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrder(getOrderByNumber(params.orderNumber) ?? null);
  }, [params.orderNumber]);

  if (order === undefined) return null;

  if (order === null) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 px-16">
        <p className="font-bold text-verae-text-dark text-2xl">Order not found</p>
        <p className="text-verae-text-muted text-sm">
          We couldn&apos;t find that order on this device. Orders are only stored locally in this demo.
        </p>
        <Link href="/products" className="font-semibold text-verae-accent-text text-sm hover:underline">
          Continue Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 px-16 py-16 w-full max-w-[720px] mx-auto">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-4xl">✓</span>
        <h1 className="font-bold text-verae-text-dark text-[28px]">Thank you, {order.shippingAddress.fullName.split(" ")[0]}!</h1>
        <p className="text-verae-text-muted text-sm">
          Your order has been placed. Confirmation number:{" "}
          <span className="font-semibold text-verae-text-dark">{order.orderNumber}</span>
        </p>
      </div>

      <div className="w-full bg-verae-lilac-bg-2 rounded p-6 flex flex-col gap-4">
        {order.lines.map((line) => (
          <div key={`${line.slug}-${line.size}`} className="flex gap-4 items-center">
            <div className="relative w-16 h-16 rounded bg-white shrink-0 overflow-hidden">
              <Image src={line.image} alt={line.name} fill className="object-contain p-2" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-verae-text-dark text-sm">{line.name}</p>
              <p className="text-verae-text-muted text-xs">
                {line.size} · Qty {line.qty}
              </p>
            </div>
            <p className="font-semibold text-verae-text-dark text-sm">${line.lineTotal.toFixed(2)}</p>
          </div>
        ))}
        <div className="border-t border-white pt-4 flex flex-col gap-1.5">
          <div className="flex justify-between text-verae-text-dark text-sm">
            <span>Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-verae-text-dark text-sm">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-verae-text-dark font-bold">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-1">
        <p className="font-semibold text-verae-text-dark text-sm">Shipping to</p>
        <p className="text-verae-text-muted text-sm">
          {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
          {order.shippingAddress.postalCode}, {order.shippingAddress.country}
        </p>
      </div>

      <div className="flex gap-6">
        <Link href="/account" className="font-semibold text-verae-accent-text text-sm hover:underline">
          View Order History
        </Link>
        <Link href="/products" className="font-semibold text-verae-accent-text text-sm hover:underline">
          Continue Shopping →
        </Link>
      </div>
    </div>
  );
}
