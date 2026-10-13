"use client";

import Image from "next/image";
import { useState } from "react";
import { byId } from "@/lib/collection";

const cards = [
  { slug: "dam-satin-nau", src: "/collection/hero-dam-satin-nau.webp", width: 1136, height: 1840, raw: true },
  { slug: "dam-tulle-hong" },
  { slug: "dam-ong-navy" },
] as const;

/** Ba vị trí: 0 = trước, 1 = giữa, 2 = sau. */
const slots = ["hm-hero__card--front", "hm-hero__card--mid", "hm-hero__card--back"];

/**
 * Cụm ba thẻ giấy xé xếp chồng. Bấm thẻ nào thì thẻ đó lên trước,
 * thẻ đang ở trước lùi về vị trí của thẻ vừa bấm.
 */
export function HeroCards() {
  // order[i] = chỉ số vị trí của thẻ i
  const [order, setOrder] = useState<number[]>([0, 1, 2]);

  const bringFront = (i: number) => {
    if (order[i] === 0) return;
    const next = [...order];
    const was = next[i];
    const frontIdx = next.indexOf(0);
    next[frontIdx] = was;
    next[i] = 0;
    setOrder(next);
  };

  return (
    <div className="hm-hero__stack" role="group" aria-label="Ảnh nổi bật, bấm để đổi thẻ" data-parallax="0.05">
      {cards.map((c, i) => {
        const item = byId[c.slug];
        const src = "src" in c ? c.src : item.src;
        const w = "width" in c ? c.width : item.width;
        const h = "height" in c ? c.height : item.height;
        const front = order[i] === 0;
        return (
          <button
            key={c.slug}
            type="button"
            className={`hm-hero__card ${slots[order[i]]}`}
            style={{ zIndex: 3 - order[i] }}
            onClick={() => bringFront(i)}
            aria-pressed={front}
            aria-label={front ? `${item.name}, đang hiển thị` : `Xem ${item.name}`}
          >
            <span className="hm-hero__paper">
              <Image
                src={src}
                alt={item.name}
                width={w}
                height={h}
                sizes="(min-width: 900px) 24vw, 60vw"
                quality={90}
                priority={i === 0}
                unoptimized={"raw" in c}
              />
              <span className="hm-hero__caption">{item.name}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
