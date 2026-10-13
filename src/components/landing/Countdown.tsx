"use client";

import { useEffect, useState } from "react";
import { flashSale } from "@/lib/product";

function remaining(endsAt: string) {
  const diff = new Date(endsAt).getTime() - Date.now();
  if (diff <= 0) return null;
  const s = Math.floor(diff / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

/** Đếm ngược tới thời điểm kết thúc THẬT trong cấu hình. Hết giờ thì tự ẩn. */
export function Countdown() {
  const [left, setLeft] = useState<ReturnType<typeof remaining>>(null);

  useEffect(() => {
    if (!flashSale.endsAt) return;
    const end = flashSale.endsAt;
    const id = window.setInterval(() => setLeft(remaining(end)), 1000);
    const first = window.setTimeout(() => setLeft(remaining(end)), 0);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(first);
    };
  }, []);

  if (!left) return null;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="ld-sale" aria-label={flashSale.label}>
      <div className="ld-sale__inner">
        <p className="ld-sale__label">{flashSale.label} kết thúc sau</p>
        <p className="ld-sale__clock" aria-live="off">
          {left.d > 0 && (
            <>
              <span>{left.d}</span>
              <small>ngày</small>
            </>
          )}
          <span>{pad(left.h)}</span>
          <small>giờ</small>
          <span>{pad(left.m)}</span>
          <small>phút</small>
          <span>{pad(left.s)}</span>
          <small>giây</small>
        </p>
        <ul className="ld-sale__perks">
          {flashSale.perks.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
