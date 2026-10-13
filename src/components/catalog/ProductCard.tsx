import Image from "next/image";
import Link from "next/link";
import type { Item } from "@/lib/collection";
import { BuyBox } from "@/components/product/BuyBox";

export function ProductCard({ item, priority = false }: { item: Item; priority?: boolean }) {
  return (
    <li className="hm-item ct-card">
      <Link href={`/san-pham/${item.slug}`} className="hm-item__link">
        <div className="hm-item__frame">
          {item.badge && <span className={`ct-badge ${item.badge === "Mới về" ? "ct-badge--new" : ""}`}>{item.badge}</span>}
          <Image
            src={item.src}
            alt={item.name}
            width={item.width}
            height={item.height}
            sizes="(min-width: 900px) 30vw, 50vw"
            quality={90}
            priority={priority}
          />
        </div>
        <p className="hm-item__meta">
          <span>{item.name}</span>
          <span className="hm-ph">{item.price ?? "[Giá]"}</span>
        </p>
        <p className="ct-card__sub">
          {item.group === "dam" ? `Size ${item.sizes.join("–").replace(/–.*–/, "–")}` : item.sizes[0]} · Đã bán {item.sold.toLocaleString("vi-VN")}
        </p>
      </Link>
      <BuyBox item={item} compact />
    </li>
  );
}
