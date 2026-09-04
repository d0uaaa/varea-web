import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { journalPosts, getJournalPostBySlug } from "../../../lib/journal";

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} — Verae Journal`, description: post.excerpt };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="flex flex-col items-center px-16 py-12 w-full">
      <article className="flex flex-col gap-6 w-full max-w-[720px]">
        <p className="font-normal text-verae-text-muted text-[11px]">
          <Link href="/journal" className="hover:underline">Journal</Link> / {post.tag}
        </p>
        <h1 className="font-bold text-verae-text-dark text-[32px]">{post.title}</h1>

        <div className="relative h-[320px] w-full rounded bg-verae-lilac-bg-2 overflow-hidden">
          <Image src={post.image} alt={post.title} fill className="object-contain p-16" />
        </div>

        <div className="flex flex-col gap-4">
          {post.body.map((paragraph, i) => (
            <p key={i} className="text-verae-text-dark text-[15px] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <Link href="/journal" className="font-semibold text-verae-accent-text text-sm hover:underline mt-4">
          ← Back to the Journal
        </Link>
      </article>
    </div>
  );
}
