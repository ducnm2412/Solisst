"use client";

import { useEffect, useState, type ReactNode } from "react";
import { LoadingScreen } from "./LoadingScreen";
import { campaign } from "./campaign";
import { useAssetProgress } from "./useAssetProgress";

const EXIT_MS = 900;

/**
 * Bọc nội dung trang: hiển thị màn hình loading thương hiệu trong lúc
 * tài nguyên khởi tạo đang tải, sau đó mờ dần và trả lại trang chính.
 */
export function LoadingGate({ children }: { children: ReactNode }) {
  const images = [
    "/brand/solisst-logo.png",
    ...(campaign.desktop ? [campaign.desktop] : []),
    ...(campaign.mobile ? [campaign.mobile] : []),
  ];

  const { progress, status } = useAssetProgress({ images });
  const [mounted, setMounted] = useState(true);
  const leaving = status !== "loading";

  useEffect(() => {
    if (!leaving) return;
    document.documentElement.classList.add("app-ready");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setMounted(false), reduce ? 0 : EXIT_MS);
    return () => window.clearTimeout(t);
  }, [leaving]);

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
