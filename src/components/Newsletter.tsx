"use client";

import { useState, type FormEvent } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire up to email service
    console.log("Subscribe:", email);
  };

  return (
    <section className="bg-verae-plum flex flex-col gap-4 items-center justify-center p-16 w-full">
      <h2 className="font-bold text-verae-text-on-dark-strong text-[26px] text-center">
        Join the Ritual
      </h2>
      <p className="font-normal text-verae-text-on-dark text-[13px] text-center">
        15% off your first order, plus early access to new drops.
      </p>

      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="bg-white px-4 py-3 w-[300px] font-normal text-verae-text-dark text-[13px] placeholder:text-verae-text-muted outline-none"
        />
        <button
          type="submit"
          className="bg-verae-accent px-5 py-3 font-semibold text-verae-plum-dark text-xs tracking-[1px] hover:opacity-90 transition-opacity"
        >
          SUBSCRIBE
        </button>
      </form>
    </section>
  );
}
