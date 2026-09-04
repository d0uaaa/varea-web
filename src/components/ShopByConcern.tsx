const concerns = [
  { label: "Hydration", count: "12 Products", color: "bg-verae-plum" },
  { label: "Barrier Repair", count: "8 Products", color: "bg-verae-pink" },
  { label: "Brightening", count: "10 Products", color: "bg-verae-lilac-bg-2" },
];

export default function ShopByConcern() {
  return (
    <section className="bg-white flex flex-col gap-6 items-start p-16 w-full">
      <p className="font-semibold text-verae-accent-text text-[11px] tracking-[1.5px]">
        SHOP BY CONCERN
      </p>
      <h2 className="font-bold text-verae-text-dark text-[28px]">What does your skin need?</h2>

      <div className="flex gap-6 items-start w-full">
        {concerns.map(({ label, count, color }) => (
          <button key={label} className="flex flex-1 flex-col gap-2 items-start text-left group">
            <div className={`h-[280px] w-full rounded ${color} group-hover:opacity-90 transition-opacity`} />
            <p className="font-medium text-verae-text-muted text-[11px]">{count}</p>
            <p className="font-semibold text-verae-text-dark text-base">{label}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
