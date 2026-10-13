import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog/CatalogPage";

export const metadata: Metadata = {
  title: "Sản phẩm — SOLISST",
  description: "Đầm dạ tiệc và bộ mặc nhà SOLISST. Bán chạy, mới về, lọc theo nhóm và giá. Giao toàn quốc, thanh toán khi nhận.",
};

export default function Page() {
  return (
    <main className="flex flex-1 flex-col">
      <CatalogPage />
    </main>
  );
}
