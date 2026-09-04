export default function SustainabilityPage() {
  const pledges = [
    {
      title: "Regenerative Sourcing",
      body: "Every botanical ingredient comes from farms verified to be actively rebuilding soil health, not just avoiding synthetic pesticides.",
    },
    {
      title: "Refillable by Design",
      body: "Packaging is engineered to survive dozens of refills. Keep the bottle, replace the contents.",
    },
    {
      title: "Carbon-Neutral Shipping",
      body: "We offset 100% of shipping emissions on every order, calculated per shipment rather than averaged across the year.",
    },
    {
      title: "Cruelty-Free, Always",
      body: "No formula or ingredient is tested on animals at any stage, and we don't sell in markets that require it by law.",
    },
  ];

  return (
    <div className="flex flex-col items-center px-16 py-12 w-full">
      <div className="flex flex-col gap-8 w-full max-w-[720px]">
        <div>
          <p className="font-semibold text-verae-accent-text text-[11px] tracking-[1.5px]">
            THE SUSTAINABILITY PLEDGE
          </p>
          <h1 className="font-bold text-verae-text-dark text-[32px]">
            What &ldquo;Sustainable&rdquo; Actually Means Here
          </h1>
        </div>

        <div className="flex flex-col gap-6">
          {pledges.map((p) => (
            <div key={p.title} className="border-l-2 border-verae-accent pl-5 flex flex-col gap-1.5">
              <p className="font-semibold text-verae-text-dark text-lg">{p.title}</p>
              <p className="text-verae-text-muted text-sm">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
