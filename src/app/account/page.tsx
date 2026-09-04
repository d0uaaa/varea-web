"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getOrders, type Order } from "../../lib/orders";

export default function AccountPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // One-time read from localStorage on mount; must run client-side only.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrders(getOrders());
  }, []);

  return (
    <div className="flex flex-col gap-8 items-start px-16 py-12 w-full">
      <div>
        <h1 className="font-bold text-verae-text-dark text-[28px]">Your Account</h1>
        <p className="text-verae-text-muted text-xs mt-1">
          This is a demo storefront with no real accounts or login — the order history below is
          stored locally in this browser, tied to this device only.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <h2 className="font-semibold text-verae-text-dark text-lg">Order History</h2>

        {orders.length === 0 ? (
          <div className="flex flex-col gap-2 items-start">
            <p className="text-verae-text-muted text-sm">No orders placed yet on this device.</p>
            <Link href="/products" className="font-semibold text-verae-accent-text text-sm hover:underline">
              Browse Products →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            {orders.map((order) => (
              <div key={order.orderNumber} className="border border-verae-lilac-bg-2 rounded p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-verae-text-dark text-sm">{order.orderNumber}</p>
                    <p className="text-verae-text-muted text-xs">
                      {new Date(order.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <Link
                    href={`/order-confirmation/${order.orderNumber}`}
                    className="font-semibold text-verae-accent-text text-xs hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
                <div className="flex gap-2">
                  {order.lines.map((line) => (
                    <div key={`${line.slug}-${line.size}`} className="relative w-12 h-12 rounded bg-verae-lilac-bg-2 overflow-hidden">
                      <Image src={line.image} alt={line.name} fill className="object-contain p-1" />
                    </div>
                  ))}
                </div>
                <p className="font-semibold text-verae-text-dark text-sm">
                  {order.lines.reduce((s, l) => s + l.qty, 0)} items · ${order.total.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
