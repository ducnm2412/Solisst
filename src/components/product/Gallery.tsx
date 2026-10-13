"use client";

import Image from "next/image";
import { useState } from "react";
import type { GalleryImage } from "@/lib/gallery";

type Props = {
  main: GalleryImage;
  extras: GalleryImage[];
  name: string;
};

/** Ảnh chính + dải ảnh phụ bên dưới. Bấm ảnh phụ để đổi ảnh chính. */
export function Gallery({ main, extras, name }: Props) {
  const all = [main, ...extras];
  const [idx, setIdx] = useState(0);
  const cur = all[idx];

  return (
    <div className="pd-gallery">
      <div className="pd-gallery__main">
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
      </div>
      {all.length > 1 && (
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
    </div>
  );
}
