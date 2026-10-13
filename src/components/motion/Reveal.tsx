"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motionTier } from "./motion-tier";

/**
 * Hiện dần các phần tử có thuộc tính `data-reveal` khi chúng cuộn vào khung nhìn.
 * Con của phần tử có `data-reveal="stagger"` xuất hiện lần lượt.
 * Chạy lại mỗi khi đổi trang và tự bắt các phần tử mới được thêm vào DOM,
 * nên nội dung không bị kẹt ở trạng thái ẩn sau khi điều hướng phía client.
 * Tôn trọng prefers-reduced-motion (xử lý trong reveal.css).
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    // Chờ cây React hydrate / render xong rồi mới chạm vào DOM
    let cleanup: (() => void) | undefined;
    const timer = window.setTimeout(() => {
      cleanup = setup();
    }, 80);
    return () => {
      window.clearTimeout(timer);
      cleanup?.();
    };
  }, [pathname]);

  return null;
}

function setup(): () => void {
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        en.target.classList.add("is-in");
        io.unobserve(en.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
  );

  const observeAll = (root: ParentNode) => {
    root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
  };
  observeAll(document);

  // Bắt các phần tử reveal được thêm sau (chuyển trang, render muộn)
  const mo = new MutationObserver((muts) => {
    for (const m of muts) {
      m.addedNodes.forEach((n) => {
        if (!(n instanceof HTMLElement)) return;
        if (n.matches("[data-reveal]")) io.observe(n);
        observeAll(n);
      });
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });

  // Parallax: phần tử có data-parallax trôi chậm hơn tốc độ cuộn.
  // Chỉ ở tầng full, và chỉ bắt đầu sau khi trang load xong + một nhịp rảnh,
  // để không ghi inline transform trước khi React hydrate xong (gây lệch hydrate).
  const px = motionTier() === "full" ? Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]")) : [];
  let raf = 0;
  let started = false;
  const update = () => {
    raf = 0;
    const vh = window.innerHeight;
    for (const el of px) {
      const speed = Number(el.dataset.parallax ?? 0.1);
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - vh / 2;
      el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
    }
  };
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };
  const start = () => {
    if (started || px.length === 0) return;
    started = true;
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  };
  const idle = (cb: () => void) => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (typeof w.requestIdleCallback === "function") w.requestIdleCallback(cb, { timeout: 600 });
    else window.setTimeout(cb, 250);
  };
  const onLoad = () => idle(start);
  if (document.readyState === "complete") onLoad();
  else window.addEventListener("load", onLoad, { once: true });

  return () => {
    io.disconnect();
    mo.disconnect();
    window.removeEventListener("load", onLoad);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    if (raf) cancelAnimationFrame(raf);
    px.forEach((el) => (el.style.transform = ""));
  };
}
