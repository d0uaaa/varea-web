import type { ReactNode } from "react";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col items-center px-16 py-12 w-full">
      <div className="flex flex-col gap-5 w-full max-w-[720px]">
        <h1 className="font-bold text-verae-text-dark text-[32px]">Terms of Service</h1>
        <p className="text-verae-text-muted text-xs">Last updated: September 2026 · Demo copy for this project</p>

        <Section title="Demo Storefront">
          This site is a demonstration e-commerce build. Orders placed here are not fulfilled,
          and no real payment is processed — the checkout flow exists to show a complete
          shopping experience.
        </Section>
        <Section title="Product Information">
          Product names and photos are real; prices, stock levels, and reviews shown are
          illustrative placeholder data, not sourced from the actual retailers.
        </Section>
        <Section title="Use of the Site">
          You agree to use this site for its intended demonstration purpose and not to submit
          harmful, illegal, or abusive content through any of its forms.
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
