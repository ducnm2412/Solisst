import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/product";
import { bestsellers, byId, categories, items } from "@/lib/collection";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/nav/Footer";
import { IconCare, IconParcel, IconTag } from "@/components/loading/TrustIcons";
import { ProductCard } from "./ProductCard";
import { Catalog } from "./Catalog";
import { PhotoStrip } from "./PhotoStrip";

export function CatalogPage() {
  const newest = items.filter((i) => i.badge === "Mới về");

  return (
    <>
      <Navbar solidAlways />

      {/* ---- Đầu trang ---- */}
      <section className="ct-hero ct-hero--center">
        <div className="ct-hero__copy">
          <p className="hm-eyebrow">Sản phẩm</p>
          <h1 className="hm-h1">Chọn một chiếc, mặc nhiều dịp.</h1>
          <p className="ct-hero__lead">
            Đầm dạ tiệc may theo size S đến XL và bộ mặc nhà freesize, giao toàn quốc, thanh toán khi nhận.
          </p>
          <div className="ct-hero__actions">
            <a href="#tat-ca" className="ct-btn">Xem tất cả</a>
            <a href="#ban-chay" className="ct-btn ct-btn--ghost">Bán chạy nhất</a>
          </div>
        </div>
      </section>

      <PhotoStrip />

      {/* ---- Ưu đãi ---- */}
      <ul className="ct-perks" aria-label="Ưu đãi">
        <li><IconParcel /> Freeship đơn từ 2 sản phẩm</li>
        <li><IconTag /> Kiểm hàng trước khi thanh toán</li>
        <li><IconCare /> Đổi size trong 7 ngày</li>
      </ul>

      {/* ---- Bán chạy ---- */}
      <section id="ban-chay" className="ct-section" aria-labelledby="best-title" data-reveal>
        <div className="hm-section__head">
          <h2 id="best-title" className="hm-h2">Bán chạy nhất</h2>
          <a href="#tat-ca" className="hm-link">Xem tất cả</a>
        </div>
        <ul className="hm-grid" data-reveal="stagger">
          {bestsellers.map((it, i) => (
            <ProductCard key={it.slug} item={it} priority={i < 2} />
          ))}
        </ul>
      </section>

      {/* ---- Danh mục ---- */}
      <section className="ct-section" aria-labelledby="cat-title" data-reveal>
        <h2 id="cat-title" className="hm-h2 ct-section__title">Mua theo nhóm</h2>
        <ul className="ct-cats" data-reveal="stagger">
          {categories.map((c) => {
            const cover = byId[c.cover];
            const count = items.filter((i) => i.group === c.id).length;
            return (
              <li key={c.id} className="ct-cat">
                <Link href={`/san-pham/nhom/${c.id}`}>
                  <Image src={cover.src} alt="" width={cover.width} height={cover.height} sizes="(min-width: 900px) 50vw, 100vw" quality={85} />
                  <span className="ct-cat__body">
                    <strong>{c.name}</strong>
                    <span>{c.blurb}</span>
                    <em>{count} mẫu</em>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ---- Mới về ---- */}
      {newest.length > 0 && (
        <section className="ct-section" aria-labelledby="new-title" data-reveal>
          <div className="hm-section__head">
            <h2 id="new-title" className="hm-h2">Mới về</h2>
          </div>
          <ul className="hm-grid" data-reveal="stagger">
            {newest.map((it) => (
              <ProductCard key={it.slug} item={it} />
            ))}
          </ul>
        </section>
      )}

      {/* ---- Tất cả + lọc ---- */}
      <Catalog />

      {/* ---- CTA ---- */}
      <section className="ct-cta" data-reveal>
        <h2 className="hm-h2 hm-h2--light">Chưa chắc size?</h2>
        <p>Nhắn SOLISST kèm chiều cao, cân nặng và số đo. Shop tư vấn trong giờ làm việc, đổi size trong 7 ngày.</p>
        <div className="ct-hero__actions">
          <a href={business.facebook} target="_blank" rel="noopener noreferrer" className="ct-btn ct-btn--light">Nhắn Facebook</a>
          <a href={`tel:${business.phone}`} className="ct-btn ct-btn--ghostLight">Gọi {business.phoneDisplay}</a>
        </div>
      </section>

      <Footer />
    </>
  );
}
