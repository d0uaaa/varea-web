export default function ShippingReturnsPage() {
  return (
    <div className="flex flex-col items-center px-16 py-12 w-full">
      <div className="flex flex-col gap-6 w-full max-w-[720px]">
        <h1 className="font-bold text-verae-text-dark text-[32px]">Shipping &amp; Returns</h1>

        <section className="flex flex-col gap-2">
          <h2 className="font-semibold text-verae-text-dark text-lg">Shipping</h2>
          <p className="text-verae-text-muted text-sm">
            Orders over $75 ship free. Orders under $75 have a flat $6.50 shipping rate. Standard
            delivery takes 3–5 business days within the continental US.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-semibold text-verae-text-dark text-lg">Returns</h2>
          <p className="text-verae-text-muted text-sm">
            Unopened products can be returned within 30 days of delivery for a full refund.
            Opened products are eligible for store credit if you had a reaction — reach out via
            the Contact page and we&apos;ll take care of it.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-semibold text-verae-text-dark text-lg">Damaged or Missing Items</h2>
          <p className="text-verae-text-muted text-sm">
            If anything arrives damaged, contact us within 7 days with a photo and your order
            number and we&apos;ll send a replacement at no cost.
          </p>
        </section>
      </div>
    </div>
  );
}
