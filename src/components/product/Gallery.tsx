"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { GalleryImage } from "@/lib/gallery";

type Props = {
  main: GalleryImage;
  extras: GalleryImage[];
  name: string;
};

/**
 * Ảnh chính + dải ảnh phụ bên dưới. Bấm ảnh phụ để đổi ảnh chính,
 * bấm ảnh chính để mở xem phóng to (lightbox) với chuyển ảnh trước/sau.
 */
export function Gallery({ main, extras, name }: Props) {
  const all = [main, ...extras];
  const [idx, setIdx] = useState(0);
  const [zoom, setZoom] = useState(false);
  const cur = all[idx];
  const n = all.length;

  const prev = useCallback(() => setIdx((i) => (i - 1 + n) % n), [n]);
  const next = useCallback(() => setIdx((i) => (i + 1) % n), [n]);

  useEffect(() => {
    if (!zoom) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [zoom, prev, next]);

  return (
    <div className="pd-gallery">
      <button
        type="button"
        className="pd-gallery__main"
        onClick={() => setZoom(true)}
        aria-label={`Phóng to ảnh: ${name} – ${cur.label}`}
      >
        <Image
          key={cur.src}
          src={cur.src}
          alt={`${name} – ${cur.label}`}
          width={cur.width}
          height={cur.height}
          priority={idx === 0}
          quality={95}
          sizes="(min-width: 900px) 50vw, 100vw"
        />
        <span className="pd-gallery__zoomHint" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5M11 8v6M8 11h6" /></svg>
          Phóng to
        </span>
      </button>

      {n > 1 && (
        <ul className="pd-gallery__thumbs" aria-label="Các góc nhìn khác">
          {all.map((g, i) => (
            <li key={g.src}>
              <button
                type="button"
                className={`pd-gallery__thumb ${i === idx ? "is-on" : ""}`}
                onClick={() => setIdx(i)}
                aria-pressed={i === idx}
                aria-label={g.label}
              >
                <Image src={g.src} alt="" width={g.width} height={g.height} sizes="120px" quality={80} />
                <span>{g.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {zoom && (
        <div className="lb" role="dialog" aria-modal="true" aria-label={`${name} – ${cur.label}`} onMouseDown={(e) => e.target === e.currentTarget && setZoom(false)}>
          <button type="button" className="lb__close" onClick={() => setZoom(false)} aria-label="Đóng">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
          {n > 1 && (
            <>
              <button type="button" className="lb__nav lb__nav--prev" onClick={prev} aria-label="Ảnh trước">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m15 5-7 7 7 7" /></svg>
              </button>
              <button type="button" className="lb__nav lb__nav--next" onClick={next} aria-label="Ảnh sau">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m9 5 7 7-7 7" /></svg>
              </button>
            </>
          )}
          <figure className="lb__fig">
            <Image
              key={cur.src}
              src={cur.src}
              alt={`${name} – ${cur.label}`}
              width={cur.width}
              height={cur.height}
              quality={95}
              sizes="100vw"
              priority
            />
            <figcaption>
              {cur.label} · {idx + 1}/{n}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
