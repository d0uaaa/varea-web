import Link from "next/link";
import { rituals } from "../lib/rituals";

export default function ShopTheRitual() {
  return (
    <section className="bg-verae-lilac-bg-2 flex flex-col gap-6 items-start p-16 w-full">
      <p className="font-semibold text-verae-accent-text text-[11px] tracking-[1.5px]">
        CURATED ROUTINES
      </p>
      <h2 className="font-bold text-verae-text-dark text-[26px]">Shop the Ritual</h2>

      <div className="flex gap-6 items-start w-full">
        {rituals.map((ritual) => (
          <div key={ritual.slug} className="flex flex-1 flex-col gap-2.5 items-start">
            <div className="h-[360px] w-full rounded bg-verae-plum" />
            <p className="font-semibold text-verae-accent-text text-[10px] tracking-[1px]">{ritual.eyebrow}</p>
            <p className="font-bold text-verae-text-dark text-lg">{ritual.title}</p>
            <p className="font-normal text-verae-text-muted text-xs">{ritual.desc}</p>
            <Link
              href="/rituals"
              className="border border-verae-text-dark px-4 py-2.5 font-semibold text-verae-text-dark text-[11px] tracking-[0.5px] hover:bg-verae-text-dark hover:text-white transition-colors"
            >
              SHOP THE RITUAL — {ritual.discountLabel}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
