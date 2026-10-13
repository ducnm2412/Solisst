"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

/**
 * Đếm ngược tới thời điểm kết thúc THẬT trong cấu hình. Hết giờ thì tự ẩn.
 * variant "block": khối lớn ở landing gen Solist. variant "bar": dải mảnh dùng
 * chung cho trang chủ, trang sản phẩm, chi tiết.
 */
export function Countdown({ variant = "block", className = "" }: { variant?: "block" | "bar"; className?: string } = {}) {
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

  if (variant === "bar") {
    return (
      <Link href="/san-pham#ban-chay" className={`sale-bar ${className}`} aria-label={`${flashSale.label}, xem sản phẩm`}>
        <span className="sale-bar__label">{flashSale.label}</span>
        <span className="sale-bar__sep" aria-hidden="true" />
        <span className="sale-bar__clock" aria-live="off">
          <span>kết thúc sau</span>
          {left.d > 0 && <strong>{left.d}<small>ngày</small></strong>}
          <strong>{pad(left.h)}<small>giờ</small></strong>
          <strong>{pad(left.m)}<small>phút</small></strong>
          <strong>{pad(left.s)}<small>giây</small></strong>
        </span>
        <span className="sale-bar__sep" aria-hidden="true" />
        <span className="sale-bar__perk">{flashSale.perks[0]}</span>
      </Link>
    );
  }

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
