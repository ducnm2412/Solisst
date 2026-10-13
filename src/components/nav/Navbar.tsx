"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { business } from "@/lib/product";
import { ProductMenu } from "./ProductMenu";
import { categories } from "@/lib/collection";

const BASE = "/";
const links = [
  { href: `${BASE}#bo-suu-tap`, label: "Bộ sưu tập" },
  { href: `${BASE}#size`, label: "Chọn size" },
  { href: `${BASE}#dat-hang`, label: "Đặt hàng" },
  { href: `${BASE}#lien-he`, label: "Liên hệ" },
];

/**
 * Thanh điều hướng cố định. Trong suốt khi ở đầu trang (trên hero tối),
 * chuyển nền ivory + chữ espresso khi cuộn xuống. Menu trượt trên mobile.
 */
export function Navbar({ solidAlways = false }: { solidAlways?: boolean } = {}) {
  const [solid, setSolid] = useState(solidAlways);
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);

  useEffect(() => {
    if (solidAlways) return;
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solidAlways]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className={`nav ${solid ? "nav--solid" : ""} ${open ? "nav--open" : ""}`} aria-label="Điều hướng chính">
      <Link href="/#top" className="nav__brand" onClick={() => setOpen(false)}>
        <Image src="/brand/solisst-logo.png" alt="SOLISST" width={1430} height={370} priority />
      </Link>

      <ul className="nav__links">
        {links.map((l, i) => (
          <Fragment key={l.href}>
            <li>
              <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            </li>
            {i === 0 && <ProductMenu />}
          </Fragment>
        ))}
      </ul>

      <a href={`tel:${business.phone}`} className="nav__cta">
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
        </svg>
        Tư vấn {business.phoneDisplay}
      </a>

      <button
        type="button"
        className="nav__burger"
        aria-expanded={open}
        aria-controls="nav-menu"
        aria-label={open ? "Đóng menu" : "Mở menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>

      <div id="nav-menu" className="nav__sheet" hidden={!open}>
        <ul>
          {links.map((l, i) => (
            <Fragment key={l.href}>
              <li>
                <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
              </li>
              {i === 0 && (
                <li className={`nav__sub ${subOpen ? "is-open" : ""}`}>
                  <button type="button" aria-expanded={subOpen} onClick={() => setSubOpen((v) => !v)}>
                    Sản phẩm
                    <svg width="14" height="14" viewBox="0 0 10 10" aria-hidden="true">
                      <path d="M1 3.5 5 7l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </button>
                  <ul hidden={!subOpen}>
                    <li><Link href="/san-pham" onClick={() => setOpen(false)}>Tất cả sản phẩm</Link></li>
                    <li><Link href="/san-pham#ban-chay" onClick={() => setOpen(false)}>Bán chạy nhất</Link></li>
                    {categories.map((c) => (
                      <li key={c.id}><Link href={`/san-pham/nhom/${c.id}`} onClick={() => setOpen(false)}>{c.name}</Link></li>
                    ))}
                  </ul>
                </li>
              )}
            </Fragment>
          ))}
        </ul>
        <a href={`tel:${business.phone}`} className="nav__cta nav__cta--sheet">
          Gọi tư vấn {business.phoneDisplay}
        </a>
        <p className="nav__sheetNote">
          <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a> · {business.city}, Việt Nam
        </p>
      </div>
    </nav>
  );
}
