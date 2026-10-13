"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { LoadingScreen } from "./LoadingScreen";
import { campaign } from "./campaign";
import { useAssetProgress } from "./useAssetProgress";
import { motionTier } from "@/components/motion/motion-tier";

const EXIT_MS = 900;

/**
 * Bọc nội dung trang: hiển thị màn hình loading thương hiệu trong lúc
 * tài nguyên khởi tạo đang tải, sau đó mờ dần và trả lại trang chính.
 *
 * Chỉ chạy ở lần vào đầu tiên của phiên (cờ sessionStorage). Tải lại trang,
 * mở link khác trong cùng tab, hay quay lại sau đó thì vào thẳng nội dung.
 * Đóng tab rồi mở lại sẽ thấy intro lần nữa.
 */
export function LoadingGate({ children }: { children: ReactNode }) {
  // Cờ `intro-seen` được script inline trong <head> gắn lên <html> trước khi vẽ
  // (xem motion-tier.ts); CSS `.intro-seen .ls-screen{display:none}` ẩn màn loading
  // ngay trong HTML server. useSyncExternalStore trả false khi SSR và giá trị thật
  // sau hydrate, không gây lệch server/client.
  const skip = useSyncExternalStore(
    () => () => {},
    () => document.documentElement.classList.contains("intro-seen"),
    () => false,
  );

  const images = [
    "/brand/solisst-logo.png",
    ...(campaign.desktop ? [campaign.desktop] : []),
    ...(campaign.mobile ? [campaign.mobile] : []),
  ];

  const tier = typeof document !== "undefined" ? motionTier() : "lite";
  const { progress, status } = useAssetProgress({
    images,
    minDuration: tier === "off" ? 0 : tier === "lite" ? 900 : 1400,
  });
  const [mounted, setMounted] = useState(true);
  const leaving = skip || status !== "loading";

  useEffect(() => {
    if (!leaving) return;
    document.documentElement.classList.add("app-ready");
    // skip: màn đã bị CSS ẩn, gỡ ngay ở tick kế tiếp; bình thường: chờ fade-out
    const t = window.setTimeout(() => setMounted(false), skip || motionTier() === "off" ? 0 : EXIT_MS);
    return () => window.clearTimeout(t);
  }, [leaving, skip]);

  return (
    <>
      {/* Nội dung chính luôn được render để trình duyệt tải song song,
          chỉ ẩn khỏi trợ năng khi loading còn hiển thị. */}
      <div aria-hidden={mounted ? true : undefined} className="flex flex-1 flex-col">
        {children}
      </div>
      {mounted && (
        <LoadingScreen
          progress={leaving ? 1 : progress}
          leaving={leaving}
          timedOut={status === "timeout"}
        />
      )}
    </>
  );
}
