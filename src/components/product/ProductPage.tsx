import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/product";
import { items, sizeGuide, type Item } from "@/lib/collection";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/nav/Footer";
import { Gallery } from "./Gallery";
import { BuyBox } from "./BuyBox";
import { Countdown } from "@/components/landing/Countdown";
import { gallery } from "@/lib/gallery";
import { IconCare, IconParcel, IconTag } from "@/components/loading/TrustIcons";

function ItemGrid({ list }: { list: Item[] }) {
  return (
    <ul className="hm-grid" data-reveal="stagger">
      {list.map((it) => (
        <li key={it.slug} className="hm-item">
          <Link href={`/san-pham/${it.slug}`} className="hm-item__link">
            <div className="hm-item__frame">
              <Image src={it.src} alt={it.name} width={it.width} height={it.height} sizes="(min-width: 900px) 22vw, 46vw" quality={90} />
            </div>
            <p className="hm-item__meta">
              <span>{it.name}</span>
              <span className="hm-ph">{it.price ?? "[Giá]"}</span>
            </p>
          </Link>
          <BuyBox item={it} compact />
        </li>
      ))}
    </ul>
  );
}

export function ProductPage({ item }: { item: Item }) {
  const similar = items.filter((i) => i.slug !== item.slug && i.group === item.group).slice(0, 4);
  const others = items.filter((i) => i.group !== item.group).slice(0, 4);
  const isDress = item.group === "dam";

  return (
    <>
      <Navbar solidAlways />

      <Countdown variant="bar" className="sale-bar--top" />

      <nav className="pd-crumb" aria-label="Đường dẫn">
        <Link href="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <Link href="/#bo-suu-tap">Bộ sưu tập</Link>
        <span aria-hidden="true">/</span>
        <span>{item.name}</span>
      </nav>

      <div className="pd-bg">
      <article className="pd">
        <div className="pd-media">
          <Gallery
            name={item.name}
            main={{ src: item.src, width: item.width, height: item.height, label: "Ảnh chính" }}
            extras={gallery[item.slug] ?? []}
          />
        </div>

        <div className="pd-info">
          <p className="hm-eyebrow">{isDress ? "Đầm" : "Bộ mặc nhà"}</p>
          <h1 className="pd-title">{item.name}</h1>
          <p className="pd-tagline">{item.tagline}</p>
          <p className="pd-price">{item.price ?? "Liên hệ"}</p>

          <dl className="pd-specs">
            <div>
              <dt>Màu</dt>
              <dd>{item.colors.join(", ")}</dd>
            </div>
            <div>
              <dt>Size</dt>
              <dd>
                {item.sizes.join(" · ")}
                {isDress && (
                  <>
                    {" "}
                    <Link href="/#size" className="hm-link pd-sizeLink">Bảng size</Link>
                  </>
                )}
              </dd>
            </div>
            <div>
              <dt>Chất liệu</dt>
              <dd>{item.material}</dd>
            </div>
          </dl>

          <BuyBox item={item} />
          <p className="pd-note">
            Thanh toán khi nhận, kiểm hàng trước khi trả tiền. Cần tư vấn size, gọi{" "}
            <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a>.
          </p>

        </div>
      </article>
      </div>

      {/* ---- Chi tiết: mô tả, bảo quản, bảng size, cam kết ---- */}
      <section className="pd-details bg-cream" data-reveal>
        <div className="pd-details__grid">
      <section className="pd-desc">
            <h2>Mô tả</h2>
            {item.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
    
          <section className="pd-desc">
            <h2>Bảo quản</h2>
            <ul>
              {item.care.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>
    
          {isDress && (
            <section className="pd-desc">
              <h2>Bảng size</h2>
              <table className="hm-table pd-table">
                <thead>
                  <tr>
                    <th scope="col">Size</th>
                    {sizeGuide.columns.map((c) => <th key={c} scope="col">{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {sizeGuide.rows.map((r) => (
                    <tr key={r.size}>
                      <th scope="row">{r.size}</th>
                      {r.values.map((v, i) => <td key={i}>{v ?? "—"}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="hm-table__note">{sizeGuide.note}</p>
            </section>
          )}
    
          <ul className="pd-trust">
            <li><IconTag /> Sản phẩm chính hãng</li>
            <li><IconParcel /> Giao hàng toàn quốc</li>
            <li><IconCare /> Hỗ trợ tận tâm</li>
          </ul>
            </div>
      </section>

      {similar.length > 0 && (
        <section className="pd-more bg-cream" data-reveal>
          <div className="hm-section__head">
            <h2 className="hm-h2">{isDress ? "Đầm tương tự" : "Bộ mặc nhà tương tự"}</h2>
            <Link href="/#bo-suu-tap" className="hm-link">Xem tất cả</Link>
          </div>
          <ItemGrid list={similar} />
        </section>
      )}

      {others.length > 0 && (
        <section className="pd-more pd-more--alt bg-nude" data-reveal>
          <div className="hm-section__head">
            <h2 className="hm-h2">{isDress ? "Bộ mặc nhà bạn có thể thích" : "Đầm cho buổi tối"}</h2>
            <Link href="/#bo-suu-tap" className="hm-link">Xem bộ sưu tập</Link>
          </div>
          <ItemGrid list={others} />
        </section>
      )}

      <Footer />
    </>
  );
}
