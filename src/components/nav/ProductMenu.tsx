"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { bestsellers, byId, categories, items } from "@/lib/collection";

const quick = [
  { href: "/san-pham#ban-chay", label: "Bán chạy nhất" },
  { href: "/san-pham#tat-ca", label: "Tất cả sản phẩm" },
  { href: "/#size", label: "Hướng dẫn chọn size" },
];

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").toLowerCase();

/** Menu thả xuống "Sản phẩm" trên desktop: nhóm, bán chạy, liên kết nhanh và tìm nhanh. */
export function ProductMenu({ onNavigate }: { onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const wrap = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<number>(0);

  const results = q.trim().length >= 2
    ? items.filter((i) => normalize(i.name).includes(normalize(q))).slice(0, 5)
    : [];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const enter = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const leave = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 160);
  };
  const go = () => {
    setOpen(false);
    setQ("");
    onNavigate?.();
  };

  return (
    <li ref={wrap} className={`pm ${open ? "is-open" : ""}`} onMouseEnter={enter} onMouseLeave={leave}>
      <Link href="/san-pham" className="pm__trigger" onClick={go}>
        Sản phẩm
      </Link>
      <button
        type="button"
        className="pm__toggle"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={open ? "Đóng menu sản phẩm" : "Mở menu sản phẩm"}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
          <path d="M1 3.5 5 7l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>

      <div className="pm__panel" hidden={!open}>
        <div className="pm__cols">
          <div className="pm__col pm__col--cats">
            <p className="pm__label">Mua theo nhóm</p>
            <ul>
              {categories.map((c) => {
                const cover = byId[c.cover];
                const n = items.filter((i) => i.group === c.id).length;
                return (
                  <li key={c.id}>
                    <Link href={`/san-pham/nhom/${c.id}`} className="pm__cat" onClick={go}>
                      <Image src={cover.src} alt="" width={cover.width} height={cover.height} sizes="72px" quality={80} />
                      <span>
                        <strong>{c.name}</strong>
                        <em>{n} mẫu</em>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="pm__label">Đi nhanh</p>
            <ul className="pm__quick">
              {quick.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={go}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="pm__col pm__col--best">
            <p className="pm__label">Bán chạy</p>
            <ul className="pm__best">
              {bestsellers.slice(0, 3).map((it) => (
                <li key={it.slug}>
                  <Link href={`/san-pham/${it.slug}`} onClick={go}>
                    <Image src={it.src} alt="" width={it.width} height={it.height} sizes="120px" quality={80} />
                    <span>{it.name}</span>
                    <small>{it.price}</small>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pm__search">
          <label>
            <span className="sr-only">Tìm sản phẩm</span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm nhanh: đầm satin, bộ ngủ…"
              autoComplete="off"
            />
          </label>
          {q.trim().length >= 2 && (
            <ul className="pm__results" aria-live="polite">
              {results.length === 0 && <li className="pm__empty">Không có mẫu nào khớp “{q}”.</li>}
              {results.map((it) => (
                <li key={it.slug}>
                  <Link href={`/san-pham/${it.slug}`} onClick={go}>
                    <Image src={it.src} alt="" width={it.width} height={it.height} sizes="40px" quality={70} />
                    <span>{it.name}</span>
                    <small>{it.price}</small>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
}
