"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 3–5 business days within the continental US. Orders over $75 ship free.",
  },
  {
    q: "What's your return policy?",
    a: "Unopened products can be returned within 30 days of delivery for a full refund. See Shipping & Returns for the full policy.",
  },
  {
    q: "Are your products cruelty-free?",
    a: "Yes — every product is cruelty-free, and we don't sell in markets that legally require animal testing.",
  },
  {
    q: "Can I refill my Verae bottles?",
    a: "Most of our packaging is designed for refills. Check the product page for a specific item to see if a refill format is available.",
  },
  {
    q: "How do I track my order?",
    a: "Use the Track Order page with your order number, which was emailed to you at checkout.",
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col items-center px-16 py-12 w-full">
      <div className="flex flex-col gap-6 w-full max-w-[720px]">
        <h1 className="font-bold text-verae-text-dark text-[32px]">Frequently Asked Questions</h1>
        <div className="flex flex-col">
          {faqs.map((item, i) => (
            <div key={item.q} className="border-b border-verae-lilac-bg-2 py-4">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="font-semibold text-verae-text-dark text-sm">{item.q}</span>
                <span className="text-verae-text-dark text-lg">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && <p className="text-verae-text-muted text-sm mt-3">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
