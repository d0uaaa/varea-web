"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="flex flex-col items-center px-16 py-12 w-full">
      <div className="flex flex-col gap-6 w-full max-w-[560px]">
        <h1 className="font-bold text-verae-text-dark text-[32px]">Contact Us</h1>

        {submitted ? (
          <div className="bg-verae-lilac-bg-2 rounded p-6 text-verae-text-dark text-sm">
            Thanks for reaching out — this is a demo form, so nothing was actually sent, but in a
            real store this would land in our support inbox.
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="flex flex-col gap-4"
          >
            <label className="flex flex-col gap-1">
              <span className="text-verae-text-dark text-xs font-medium">Name</span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border border-verae-lavender rounded px-3 py-2.5 text-sm outline-none focus:border-verae-plum"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-verae-text-dark text-xs font-medium">Email</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border border-verae-lavender rounded px-3 py-2.5 text-sm outline-none focus:border-verae-plum"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-verae-text-dark text-xs font-medium">Message</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="border border-verae-lavender rounded px-3 py-2.5 text-sm outline-none focus:border-verae-plum resize-none"
              />
            </label>
            <button
              type="submit"
              className="bg-verae-plum text-white font-semibold text-sm tracking-[1px] rounded py-3.5 hover:opacity-90 transition-opacity"
            >
              SEND MESSAGE
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
