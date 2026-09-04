import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="bg-verae-plum flex items-stretch w-full">
      <div className="flex flex-col gap-5 items-start justify-center px-16 py-20 flex-1">
        <p className="font-semibold text-verae-accent text-[11px] tracking-[1.5px]">
          SUSTAINABLY SOURCED &nbsp;·&nbsp; CLINICALLY PROVEN
        </p>

        <h1 className="font-bold text-verae-text-on-dark-strong text-5xl leading-tight">
          Skincare, Rooted
          <br />
          in Truth.
        </h1>

        <p className="font-normal text-verae-text-on-dark text-[15px] w-[420px]">
          Editorial-grade formulas made from regenerative botanicals — for skin and planet alike.
        </p>

        <div className="flex gap-6 items-center pt-2">
          <Link
            href="/products"
            className="bg-verae-accent px-7 py-3.5 rounded-sm font-semibold text-verae-plum-dark text-xs tracking-[1px] hover:opacity-90 transition-opacity"
          >
            SHOP THE EDIT
          </Link>
          <Link href="/sustainability" className="font-medium text-verae-text-on-dark-strong text-[13px] hover:underline">
            The Sustainability Pledge
          </Link>
        </div>
      </div>

      <div className="relative flex-1 min-h-[480px] hidden md:block">
        <Image
          src="/images/hero.jpg"
          alt="Pastel skincare and makeup flatlay"
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
}
