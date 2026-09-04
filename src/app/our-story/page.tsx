import Image from "next/image";

export default function OurStoryPage() {
  return (
    <div className="flex flex-col items-center px-16 py-12 w-full">
      <div className="flex flex-col gap-6 w-full max-w-[720px]">
        <p className="font-semibold text-verae-accent-text text-[11px] tracking-[1.5px]">OUR STORY</p>
        <h1 className="font-bold text-verae-text-dark text-[32px]">Skincare, Rooted in Truth.</h1>

        <div className="relative h-[320px] w-full rounded bg-verae-plum overflow-hidden">
          <Image src="/images/hero.jpg" alt="Verae flatlay" fill className="object-cover" />
        </div>

        <p className="text-verae-text-dark text-[15px] leading-relaxed">
          Verae started with a simple frustration: most of what gets marketed as
          &ldquo;clean&rdquo; or &ldquo;sustainable&rdquo; beauty asks you to take the claim on
          faith. No sourcing detail, no packaging math, no way to actually check the story
          behind the bottle.
        </p>
        <p className="text-verae-text-dark text-[15px] leading-relaxed">
          So we built the opposite: a small catalog of formulas we can trace end to end, from the
          regenerative farms the botanicals come from, to the refillable packaging designed to
          outlast a dozen uses instead of one.
        </p>
        <p className="text-verae-text-dark text-[15px] leading-relaxed">
          We&apos;d rather sell five products we can stand behind completely than fifty we can&apos;t.
          That&apos;s still true today — every formula in our catalog earned its place there.
        </p>
      </div>
    </div>
  );
}
