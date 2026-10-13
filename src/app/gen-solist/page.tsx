import type { Metadata } from "next";
import { Landing } from "@/components/landing/Landing";
import { Pixels } from "@/components/tracking/Pixels";
import { product } from "@/lib/product";

export const metadata: Metadata = {
  title: `${product.name} — SOLISST`,
  description: `${product.tagline} Đặt hàng, thanh toán khi nhận, giao toàn quốc.`,
  openGraph: {
    title: `${product.name} — SOLISST`,
    description: product.tagline,
    images: [{ url: product.images.hero.src }],
  },
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Pixels />
      <Landing />
    </main>
  );
}
