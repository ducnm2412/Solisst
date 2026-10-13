"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { motionTier, watchFrameRate } from "./motion-tier";

/**
 * Cuộn mượt có quán tính (Lenis). Chỉ bật ở tầng "full" (máy đủ mạnh, có chuột);
 * điện thoại và máy yếu dùng cuộn gốc của trình duyệt cho nhẹ và tự nhiên.
 * Liên kết neo (#bo-suu-tap, #size…) được cuộn chậm rãi tới đúng vị trí.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const ref = useRef<Lenis | null>(null);

  // Đổi trang (client-side) → chiều cao nội dung đổi → tính lại giới hạn cuộn
  useEffect(() => {
    const l = ref.current;
    if (!l) return;
    const t = window.setTimeout(() => l.resize(), 120);
    return () => window.clearTimeout(t);
  }, [pathname]);

  // Đo FPS thực tế; nếu thấp, hạ tầng và tắt cuộn quán tính
  useEffect(() => watchFrameRate(), []);

  useEffect(() => {
    if (motionTier() !== "full") return;
    const onDowngrade = () => ref.current?.destroy();
    window.addEventListener("motion-tier-change", onDowngrade, { once: true });

    const lenis = new Lenis({
      duration: 1.9,
      easing: (t) => 1 - Math.pow(1 - t, 4), // ease-out quart: trôi chậm rãi về cuối
      lerp: 0.075,
      wheelMultiplier: 0.9,
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    ref.current = lenis;

    // <html> cao cố định 100% nên Lenis không thấy nội dung dài ra; theo dõi <body>
    // (min-height 100%, lớn theo nội dung) và ảnh tải xong để cập nhật giới hạn cuộn.
    const ro = new ResizeObserver(() => lenis.resize());
    ro.observe(document.body);
    const onLoad = () => lenis.resize();
    window.addEventListener("load", onLoad, { once: true });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
      if (!a) return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const target = document.querySelector<HTMLElement>(url.hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -8, duration: 2.2 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("load", onLoad);
      window.removeEventListener("motion-tier-change", onDowngrade);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      ref.current = null;
    };
  }, []);

  return null;
}
