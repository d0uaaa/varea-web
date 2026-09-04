import Link from "next/link";

export default function EditorialQuote() {
  return (
    <section className="bg-white flex gap-12 items-center p-16 w-full">
      <div className="bg-verae-plum h-[360px] w-[500px] rounded shrink-0" />

      <div className="flex flex-1 flex-col gap-4 items-start">
        <p className="font-semibold text-verae-accent-text text-[11px] tracking-[1.5px]">OUR STORY</p>
        <p className="font-semibold text-verae-text-dark text-[26px] w-[420px]">
          &ldquo;We don&apos;t chase trends. We cultivate ingredients that outlast them.&rdquo;
        </p>
        <p className="font-normal text-verae-text-muted text-[13px] w-[420px]">
          Verae was founded on a simple belief: that beauty and sustainability are not opposites.
          Every formula begins in regenerative botanical partnerships across four continents, and
          every bottle is designed to be refilled — not replaced.
        </p>
        <Link href="/our-story" className="font-semibold text-verae-accent-text text-[13px] hover:underline">
          Read Our Full Story →
        </Link>
      </div>
    </section>
  );
}
