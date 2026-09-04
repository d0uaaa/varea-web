const tiles = [
  "bg-verae-pink",
  "bg-verae-lilac-bg-2",
  "bg-verae-plum",
  "bg-verae-plum-dark",
  "bg-verae-lavender",
  "bg-verae-pink",
];

export default function AsWornByYou() {
  return (
    <section className="bg-white flex flex-col gap-6 items-start p-16 w-full">
      <p className="font-semibold text-verae-accent-text text-[11px] tracking-[1.5px]">
        #VERAERITUAL
      </p>
      <h2 className="font-bold text-verae-text-dark text-[26px]">As Worn By You</h2>

      <div className="flex gap-4 items-start w-full">
        {tiles.map((color, i) => (
          <div key={i} className={`flex-1 h-[160px] rounded ${color}`} />
        ))}
      </div>
    </section>
  );
}
