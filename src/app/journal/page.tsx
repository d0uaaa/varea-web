import Link from "next/link";
import Image from "next/image";
import { journalPosts } from "../../lib/journal";

export default function JournalPage() {
  return (
    <div className="flex flex-col gap-8 items-start px-16 py-12 w-full">
      <div>
        <p className="font-semibold text-verae-accent-text text-[11px] tracking-[1.5px]">
          THE JOURNAL
        </p>
        <h1 className="font-bold text-verae-text-dark text-[32px]">Notes on Skin &amp; Sustainability</h1>
      </div>

      <div className="grid grid-cols-3 gap-6 w-full">
        {journalPosts.map((post) => (
          <Link key={post.slug} href={`/journal/${post.slug}`} className="flex flex-col gap-2.5 group">
            <div className="relative h-[180px] w-full rounded bg-verae-lilac-bg-2 overflow-hidden">
              <Image src={post.image} alt={post.title} fill className="object-contain p-6" />
            </div>
            <p className="font-semibold text-verae-accent-text text-[10px] tracking-[1px]">{post.tag}</p>
            <p className="font-semibold text-verae-text-dark text-base group-hover:text-verae-accent-text transition-colors">
              {post.title}
            </p>
            <p className="text-verae-text-muted text-xs">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
