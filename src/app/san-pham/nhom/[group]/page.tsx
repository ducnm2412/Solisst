import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, items } from "@/lib/collection";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/nav/Footer";
import { ProductCard } from "@/components/catalog/ProductCard";

type Props = { params: Promise<{ group: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ group: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { group } = await params;
  const cat = categories.find((c) => c.id === group);
  return cat ? { title: `${cat.name} — SOLISST`, description: cat.blurb } : {};
}

async function GroupList({ params }: Props) {
  const { group } = await params;
  const cat = categories.find((c) => c.id === group);
  if (!cat) notFound();
  const list = items.filter((i) => i.group === cat.id).sort((a, b) => b.sold - a.sold);
  return (
    <>
      <Navbar solidAlways />
      <nav className="pd-crumb" aria-label="Đường dẫn">
        <Link href="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <Link href="/san-pham">Sản phẩm</Link>
        <span aria-hidden="true">/</span>
        <span>{cat.name}</span>
      </nav>
      <section className="ct-all bg-cream">
        <div className="ct-all__head">
          <div>
            <h1 className="hm-h2">{cat.name}</h1>
            <p className="ct-count">{cat.blurb}</p>
          </div>
          <Link href="/san-pham#tat-ca" className="hm-link">Xem tất cả sản phẩm</Link>
        </div>
        <p className="ct-count">{list.length} sản phẩm</p>
        <ul className="hm-grid">
          {list.map((it, i) => (
            <ProductCard key={it.slug} item={it} priority={i < 2} />
          ))}
        </ul>
      </section>
      <Footer />
    </>
  );
}

export default function Page({ params }: Props) {
  return (
    <main className="flex flex-1 flex-col">
      <Suspense fallback={null}>
        <GroupList params={params} />
      </Suspense>
    </main>
  );
}
