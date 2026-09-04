import Link from "next/link";

const columns = [
  {
    heading: "SHOP",
    links: [
      { label: "Bestsellers", href: "/products" },
      { label: "New Arrivals", href: "/products" },
      { label: "Rituals", href: "/rituals" },
      { label: "Gift Sets", href: "/products" },
    ],
  },
  {
    heading: "COMPANY",
    links: [
      { label: "Our Story", href: "/our-story" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Journal", href: "/journal" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "HELP",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "FAQ", href: "/faq" },
      { label: "Track Order", href: "/track-order" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-verae-plum flex flex-col gap-8 items-start pb-8 pt-14 px-16 w-full">
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col gap-2.5 items-start">
          <p className="font-bold text-verae-text-on-dark-strong text-base tracking-[2px]">VERAE</p>
          <p className="font-normal text-verae-text-on-dark text-[11px] w-[220px]">
            Sustainable luxury skincare, formulated with regenerative botanicals.
          </p>
        </div>

        {columns.map(({ heading, links }) => (
          <div key={heading} className="flex flex-col gap-2.5 items-start">
            <p className="font-semibold text-verae-accent text-[11px] tracking-[1px]">{heading}</p>
            <div className="flex flex-col font-normal text-verae-text-on-dark text-xs">
              {links.map((link) => (
                <Link key={link.label} href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-verae-text-on-dark h-px w-full" />

      <div className="flex font-normal items-start justify-between text-verae-text-on-dark text-[11px] w-full">
        <p>© 2026 Verae. All rights reserved.</p>
        <p className="flex gap-1">
          <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <span>·</span>
          <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
        </p>
      </div>
    </footer>
  );
}
