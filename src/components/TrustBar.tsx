const items = [
  "100% Vegan Formulas",
  "Refillable Packaging",
  "Cruelty-Free, Always",
  "Carbon-Neutral Shipping",
];

export default function TrustBar() {
  return (
    <div className="bg-verae-lilac-bg-2 flex items-center justify-between px-16 py-6 w-full">
      {items.map((label) => (
        <div key={label} className="flex gap-2 items-center">
          <span className="block size-1.5 rounded-full bg-verae-accent" />
          <p className="font-medium text-verae-text-dark text-xs whitespace-nowrap">{label}</p>
        </div>
      ))}
    </div>
  );
}
