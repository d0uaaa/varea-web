import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProducts, getProductBySlug, getRelatedProducts, reviewsBySlug } from "../../../lib/products";
import ProductDetailClient from "../../../components/ProductDetailClient";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Verae`,
    description: product.shortDesc,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const reviews = reviewsBySlug[slug] ?? [];
  const related = getRelatedProducts(slug, 4);

  return <ProductDetailClient product={product} reviews={reviews} related={related} />;
}
