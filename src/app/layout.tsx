import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
// Nạp CSS component ngay trong stylesheet gốc để không bị nạp trễ ở chế độ dev
import "@/components/loading/loading-screen.css";
import "@/components/nav/navbar.css";
import "@/components/motion/reveal.css";
import "@/components/home/home.css";
import "@/components/landing/landing.css";
import "@/components/product/product.css";
import "@/components/catalog/catalog.css";
import { LoadingGate } from "@/components/loading/LoadingGate";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Reveal } from "@/components/motion/Reveal";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SOLISST — Fashion / Lifestyle / You",
  description:
    "SOLISST — thương hiệu thời trang Bắc Ninh. Be your best self.",
};

export const viewport: Viewport = {
  themeColor: "#F7F2EA",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <LoadingGate>{children}</LoadingGate>
        <SmoothScroll />
        <Reveal />
      </body>
    </html>
  );
}
