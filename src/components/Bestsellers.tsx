import Link from "next/link";
import { getAllProducts } from "../lib/products";
import ProductCard from "./ProductCard";

export default function Bestsellers() {
  const products = getAllProducts();

  return (
    <section className="bg-verae-lilac-bg-2 flex flex-col gap-6 items-start p-16 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-1.5 items-start">
          <p className="font-semibold text-verae-accent-text text-[11px] tracking-[1.5px]">
            LOVED ON REPEAT
          </p>
          <h2 className="font-bold text-verae-text-dark text-[26px]">The Bestsellers</h2>
        </div>
        <Link href="/products" className="font-medium text-verae-accent-text text-[13px] hover:underline">
          View All Bestsellers →
        </Link>
      </div>

      <div className="flex gap-5 items-start w-full">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
