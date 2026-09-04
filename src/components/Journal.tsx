import Link from "next/link";
import Image from "next/image";
import { journalPosts } from "../lib/journal";

export default function Journal() {
  return (
    <section className="bg-verae-lilac-bg-2 flex flex-col gap-6 items-start p-16 w-full">
      <p className="font-semibold text-verae-accent-text text-[11px] tracking-[1.5px]">
        THE JOURNAL
      </p>
      <h2 className="font-bold text-verae-text-dark text-[26px]">Notes on Skin &amp; Sustainability</h2>

      <div className="flex gap-6 items-start w-full">
        {journalPosts.map((post) => (
          <Link key={post.slug} href={`/journal/${post.slug}`} className="flex flex-1 flex-col gap-2 items-start group">
            <div className="relative h-[180px] w-full rounded bg-white overflow-hidden">
              <Image src={post.image} alt={post.title} fill className="object-contain p-6" />
            </div>
            <p className="font-semibold text-verae-accent-text text-[10px] tracking-[1px]">{post.tag}</p>
            <p className="font-semibold text-verae-text-dark text-sm group-hover:text-verae-accent-text transition-colors">
              {post.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
