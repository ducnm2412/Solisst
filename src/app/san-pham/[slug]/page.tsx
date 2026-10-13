import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/product/ProductPage";
import { byId, items } from "@/lib/collection";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = byId[slug];
  if (!item) return {};
  return {
    title: `${item.name} — SOLISST`,
    description: item.tagline,
    openGraph: { title: item.name, description: item.tagline, images: [{ url: item.src }] },
  };
}

/** Đọc params bên trong Suspense để phần vỏ tĩnh vẫn được prerender (Cache Components). */
async function Product({ params }: Props) {
  const { slug } = await params;
  const item = byId[slug];
  if (!item) notFound();
  return <ProductPage item={item} />;
}

export default function Page({ params }: Props) {
  return (
    <main className="flex flex-1 flex-col">
      <Suspense fallback={null}>
        <Product params={params} />
      </Suspense>
    </main>
  );
}
