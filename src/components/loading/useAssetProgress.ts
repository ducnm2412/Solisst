"use client";

import { useEffect, useRef, useState } from "react";

export type LoadStatus = "loading" | "ready" | "timeout";

type Options = {
  /** Danh sách URL ảnh cần tải trước khi coi là sẵn sàng. */
  images: string[];
  /** Thời gian hiển thị tối thiểu (ms) để khoảnh khắc thương hiệu không bị chớp. */
  minDuration?: number;
  /** Thời gian tối đa (ms); vượt quá sẽ cho người dùng đi tiếp dù chưa tải xong. */
  maxDuration?: number;
};

/**
 * Theo dõi tiến trình tải THẬT của các tài nguyên khởi tạo:
 *   - từng ảnh trong `images` (lỗi tải cũng được tính là xong để không kẹt),
 *   - bộ font web (document.fonts.ready),
 *   - sự kiện `load` của cửa sổ.
 *
 * `progress` là tỉ lệ 0–1 của số mục đã hoàn tất, không phải bộ đếm giả.
 */
export function useAssetProgress({
  images,
  minDuration = 1400,
  maxDuration = 7000,
}: Options) {
  const [done, setDone] = useState(0);
  const [status, setStatus] = useState<LoadStatus>("loading");
  const startedAt = useRef<number>(0);

  const total = images.length + 2; // + fonts + window load

  useEffect(() => {
    startedAt.current = performance.now();
    let cancelled = false;
    let completed = 0;

    const tick = () => {
      if (cancelled) return;
      completed += 1;
      setDone(completed);
    };

    // 1. Ảnh
    const imgs = images.map((src) => {
      const img = new Image();
      img.onload = tick;
      img.onerror = tick; // ảnh lỗi: vẫn cho đi tiếp
      img.src = src;
      return img;
    });

    // 2. Font
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(tick, tick);
    } else {
      tick();
    }

    // 3. Trang đã load xong
    if (document.readyState === "complete") {
      tick();
    } else {
      window.addEventListener("load", tick, { once: true });
    }

    // Chốt chặn: không để người dùng kẹt lại
    const failsafe = window.setTimeout(() => {
      if (!cancelled) setStatus((s) => (s === "loading" ? "timeout" : s));
    }, maxDuration);

    return () => {
      cancelled = true;
      imgs.forEach((i) => {
        i.onload = null;
        i.onerror = null;
      });
      window.removeEventListener("load", tick);
      window.clearTimeout(failsafe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Khi đủ 100%: chờ nốt thời gian tối thiểu rồi chuyển trạng thái
  useEffect(() => {
    if (done < total || status !== "loading") return;
    const elapsed = performance.now() - startedAt.current;
    const wait = Math.max(0, minDuration - elapsed);
    const t = window.setTimeout(() => setStatus("ready"), wait);
    return () => window.clearTimeout(t);
  }, [done, total, status, minDuration]);

  return { progress: Math.min(1, done / total), status };
}
