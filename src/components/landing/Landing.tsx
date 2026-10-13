import Image from "next/image";
import { business, formatVnd, product } from "@/lib/product";
import { Countdown } from "./Countdown";
import { CheckoutForm } from "./CheckoutForm";
import { IconCare, IconParcel, IconTag } from "@/components/loading/TrustIcons";

const fromPrice = Math.min(...product.combos.map((c) => c.price));

export function Landing() {
  const { hero, lookbook } = product.images;
  return (
    <>
      <header className="ld-top">
        <a href="#top" className="ld-top__logo">
          <Image src="/brand/solisst-logo.png" alt="SOLISST" width={1430} height={370} priority />
        </a>
        <a href="#dat-hang" className="ld-btn ld-btn--small">Đặt hàng</a>
      </header>

      {/* ---- Hero ---- */}
      <section id="top" className="ld-hero">
        <Image
          src={hero.src}
          alt={hero.alt}
          width={hero.width}
          height={hero.height}
          priority
          sizes="100vw"
          className="ld-hero__img"
          style={{ objectPosition: hero.focal }}
        />
        <div className="ld-hero__text">
          <h1 className="ld-hero__title">{product.name}</h1>
          <p className="ld-hero__sub">{product.tagline}</p>
          <p className="ld-hero__price">
            <span>Từ {formatVnd(fromPrice)}</span>
            {product.compareAtPrice && <s>{formatVnd(product.compareAtPrice)}</s>}
          </p>
          <a href="#dat-hang" className="ld-btn">Đặt hàng, thanh toán khi nhận</a>
        </div>
      </section>

      <Countdown />

      {/* ---- Chất liệu & lookbook ---- */}
      <section className="ld-look bg-cream" aria-labelledby="look-title">
        <div className="ld-look__copy">
          <h2 id="look-title" className="ld-h2">Mặc như nội y, giữ dáng như gen</h2>
          <dl className="ld-points">
            {product.highlights.map((h) => (
              <div key={h.title} className="ld-point">
                <dt>{h.title}</dt>
                <dd>{h.body}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="ld-look__grid">
          {lookbook.length > 0
            ? lookbook.map((img, i) => (
                <Image
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 900px) 40vw, 100vw"
                  className={`ld-look__img ld-look__img--${i + 1}`}
                />
              ))
            : [1, 2, 3].map((i) => (
                <div key={i} className={`ld-look__img ld-look__img--${i} ld-ph`} aria-hidden="true">
                  {process.env.NODE_ENV !== "production" && (
                    <span>Ảnh lookbook {i}: thêm vào product.images.lookbook</span>
                  )}
                </div>
              ))}
        </div>
      </section>

      {/* ---- Bảng size ---- */}
      <section id="size" className="ld-size bg-cream" aria-labelledby="size-title">
        <h2 id="size-title" className="ld-h2">Chọn size theo vòng eo</h2>
        <p className="ld-size__hint">
          Đo ngang rốn, không hóp bụng. Giữa hai size, chọn size lớn hơn để mặc thoải mái cả ngày.
        </p>
        <table className="ld-table">
          <thead>
            <tr>
              <th scope="col">Size</th>
              <th scope="col">Vòng eo</th>
              <th scope="col">Cân nặng</th>
            </tr>
          </thead>
          <tbody>
            {product.sizeGuide.map((r) => (
              <tr key={r.size}>
                <th scope="row">{r.size}</th>
                <td>{r.waist}</td>
                <td>{r.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ---- Chốt đơn ---- */}
      <section id="dat-hang" className="ld-order bg-nude" aria-labelledby="order-title">
        <div className="ld-order__side">
          <h2 id="order-title" className="ld-h2">Đặt hàng</h2>
          <p className="ld-order__lead">
            Điền ba dòng, chúng tôi gọi xác nhận trong hôm nay và giao tận nơi. Thanh toán khi nhận hàng.
          </p>
          <ul className="ld-trust">
            <li><IconTag /> <span>Sản phẩm chính hãng</span></li>
            <li><IconParcel /> <span>Giao hàng toàn quốc</span></li>
            <li><IconCare /> <span>Hỗ trợ tận tâm</span></li>
          </ul>
        </div>
        <CheckoutForm />
      </section>

      {/* ---- Liên hệ ---- */}
      <footer className="ld-foot bg-black">
        <div className="ld-foot__brand">
          <Image src="/brand/solisst-logo.png" alt="SOLISST" width={1430} height={370} />
          <p>Fashion / Lifestyle / You</p>
        </div>
        <address className="ld-foot__contact">
          <p>{business.contactName} · {business.city}</p>
          <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a>
          <a href={business.zalo} target="_blank" rel="noopener noreferrer">Zalo</a>
          <a href={business.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href={business.tiktok} target="_blank" rel="noopener noreferrer">TikTok Shop</a>
          <a href={business.maps} target="_blank" rel="noopener noreferrer">Chỉ đường</a>
        </address>
      </footer>

      {/* Thanh đặt hàng cố định trên mobile */}
      <div className="ld-sticky">
        <span>Từ {formatVnd(fromPrice)}</span>
        <a href="#dat-hang" className="ld-btn ld-btn--small">Đặt hàng</a>
      </div>
    </>
  );
}
