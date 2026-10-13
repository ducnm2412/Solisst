import Image from "next/image";
import { business } from "@/lib/product";
import { byId } from "@/lib/collection";

const polaroids = [
  { slug: "dam-satin-nau", pos: "cc__card--tl", tilt: -7, label: "satin nâu" },
  { slug: "dam-tulle-hong", pos: "cc__card--bl", tilt: 5, label: "tulle hồng" },
  { slug: "dam-ong-navy", pos: "cc__card--tr", tilt: 8, label: "navy & voan" },
  { slug: "bo-mac-nha-hoa-nhi", pos: "cc__card--br", tilt: -4, label: "hoa nhí" },
];

/** Section cuối: lời mời liên hệ trên nền tối, ảnh polaroid xòe hai bên. */
export function ContactCta() {
  return (
    <section className="cc" id="lien-he-cta" aria-labelledby="cc-title" data-reveal>
      {polaroids.map((p) => {
        const it = byId[p.slug];
        return (
          <figure
            key={p.slug}
            className={`cc__card ${p.pos}`}
            style={{ "--tilt": `${p.tilt}deg` } as React.CSSProperties}
            aria-hidden="true"
          >
            <Image src={it.src} alt="" width={it.width} height={it.height} sizes="(min-width: 900px) 18vw, 36vw" quality={85} />
            <figcaption>{p.label}</figcaption>
          </figure>
        );
      })}

      <div className="cc__body">
        <p className="cc__kicker">Hẹn gặp bạn ở SOLISST</p>
        <p className="cc__eyebrow">Liên hệ &amp; tư vấn</p>
        <h2 id="cc-title" className="cc__title">Hôm nay bạn muốn mặc gì?</h2>
        <p className="cc__lead">
          Nhắn SOLISST qua Facebook hoặc Zalo, gọi điện hay ghé xưởng ở Bắc Ninh. Shop tư vấn size, gợi ý mẫu phù hợp và giữ hàng cho bạn.
        </p>
        <a href={business.facebook} target="_blank" rel="noopener noreferrer" className="cc__pill">
          <span>Nhắn tư vấn chọn mẫu</span>
          <span className="cc__pill-arrow" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </a>
        <ul className="cc__chips">
          <li>
            <a href={business.facebook} target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.6 19.3v-5.5H6.1V12h2.3V9.8c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .2 2 .2v2.3h-1.2c-1.1 0-1.5.7-1.5 1.4V12h2.6l-.4 2.8h-2.2v5.5A10 10 0 0 0 12 2Z"/></svg>
              Facebook
            </a>
          </li>
          <li>
            <a href={business.zalo} target="_blank" rel="noopener noreferrer">
              <span className="cc__zalo" aria-hidden="true">Zalo</span>
              Zalo
            </a>
          </li>
          <li>
            <a href={`tel:${business.phone}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>
              {business.phoneDisplay}
            </a>
          </li>
        </ul>
        <p className="cc__hours">
          Tư vấn hằng ngày từ 08:00 đến 21:00 · Xưởng tại {business.city}, Việt Nam
        </p>
      </div>
    </section>
  );
}
