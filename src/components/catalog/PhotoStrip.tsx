import Image from "next/image";
import Link from "next/link";
import { items } from "@/lib/collection";

/** Góc nghiêng cố định cho từng ảnh để bố cục không đổi giữa server và client. */
const tilts = [-4, 3, -2, 5, -3, 2, -5, 4];

/**
 * Dải ảnh sản phẩm trên nền tối: mỗi ảnh có viền trắng kiểu giấy xé,
 * nghiêng nhẹ xen kẽ. Cuộn ngang trên mobile, dàn đều trên desktop.
 */
export function PhotoStrip() {
  return (
    <section className="ps" aria-label="Ảnh sản phẩm">
      <ul className="ps__track">
        {items.map((it, i) => (
          <li
            key={it.slug}
            className="ps__item"
            style={{ "--tilt": `${tilts[i % tilts.length]}deg` } as React.CSSProperties}
          >
            <Link href={`/san-pham/${it.slug}`} className="ps__paper" aria-label={it.name}>
              <Image
                src={it.src}
                alt={it.name}
                width={it.width}
                height={it.height}
                sizes="(min-width: 900px) 16vw, 44vw"
                quality={85}
                priority={i < 3}
              />
              <span className="ps__label">{it.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
