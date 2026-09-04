import type { ReactNode } from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col items-center px-16 py-12 w-full">
      <div className="flex flex-col gap-5 w-full max-w-[720px]">
        <h1 className="font-bold text-verae-text-dark text-[32px]">Privacy Policy</h1>
        <p className="text-verae-text-muted text-xs">Last updated: September 2026 · Demo copy for this project</p>

        <Section title="What We Collect">
          Contact and shipping details you provide at checkout, and order history stored locally
          in your browser for this demo (no server-side account database exists in this build).
        </Section>
        <Section title="What We Don't Do">
          We don&apos;t sell customer data to third parties, and we don&apos;t use browsing data for ad
          targeting outside this site.
        </Section>
        <Section title="Cookies & Local Storage">
          This site uses your browser&apos;s local storage to remember your cart, wishlist, and order
          history between visits — no third-party tracking cookies are set.
        </Section>
        <Section title="Contact">
          Questions about this policy can be sent via the Contact page.
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-1.5">
      <h2 className="font-semibold text-verae-text-dark text-lg">{title}</h2>
      <p className="text-verae-text-muted text-sm">{children}</p>
    </section>
  );
}
