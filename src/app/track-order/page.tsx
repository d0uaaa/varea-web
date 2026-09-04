"use client";

import { useState, type FormEvent } from "react";
import { getOrderByNumber, type Order } from "../../lib/orders";

export default function TrackOrderPage() {
  const [input, setInput] = useState("");
  const [searched, setSearched] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setOrder(getOrderByNumber(input.trim()) ?? null);
    setSearched(true);
  };

  return (
    <div className="flex flex-col items-center px-16 py-12 w-full">
      <div className="flex flex-col gap-6 w-full max-w-[520px]">
        <h1 className="font-bold text-verae-text-dark text-[32px]">Track Your Order</h1>
        <p className="text-verae-text-muted text-sm">
          Orders are only stored on the device that placed them in this demo — enter the order
          number you received on the confirmation page.
        </p>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. VR-482913"
            className="flex-1 border border-verae-lavender rounded px-3 py-2.5 text-sm outline-none focus:border-verae-plum"
          />
          <button
            type="submit"
            className="bg-verae-plum text-white font-semibold text-xs tracking-[1px] rounded px-5 hover:opacity-90 transition-opacity"
          >
            TRACK
          </button>
        </form>

        {searched && (
          <div className="bg-verae-lilac-bg-2 rounded p-5">
            {order ? (
              <div className="flex flex-col gap-1.5">
                <p className="font-semibold text-verae-text-dark text-sm">{order.orderNumber}</p>
                <p className="text-verae-text-muted text-xs">
                  Placed {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="text-verae-accent-text text-sm font-medium mt-2">Status: In Transit</p>
                <p className="text-verae-text-muted text-xs">
                  {order.lines.reduce((s, l) => s + l.qty, 0)} items · ${order.total.toFixed(2)}
                </p>
              </div>
            ) : (
              <p className="text-verae-text-muted text-sm">
                No order found with that number on this device.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
