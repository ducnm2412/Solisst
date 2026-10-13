import type { Metadata } from "next";
import { Home } from "@/components/home/Home";
import { Pixels } from "@/components/tracking/Pixels";

export const metadata: Metadata = {
  title: "SOLISST — Fashion / Lifestyle / You",
  description:
    "Thời trang cho người phụ nữ biết mình đẹp nhất ở đâu. Đầm dạ tiệc satin, bộ mặc nhà cotton, may và kiểm tra tại xưởng Bắc Ninh.",
};

export default function Page() {
  return (
    <main className="flex flex-1 flex-col">
      <Pixels />
      <Home />
    </main>
  );
}
