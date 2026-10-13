import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/product";
import { byId, faqs, items, promises, sizeGuide, steps } from "@/lib/collection";
import { IconCare, IconParcel, IconTag } from "@/components/loading/TrustIcons";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/nav/Footer";
import { HeroCards } from "./HeroCards";
import { ContactCta } from "./ContactCta";

const trustIcons = [IconTag, IconParcel, IconCare];
const pajamas = items.filter((i) => i.slug.startsWith("bo-"));

export function Home() {
  return (
    <>
      <Navbar />
      {/* ---- Hero: tái hiện bố cục màn loading trên nền tối ---- */}
      <section className="hm-hero" id="top">
        <header className="hm-hero__top" aria-hidden="true">
          <span />
          <span className="hm-hero__tag">
            Be your best self <span className="hm-rule" />
          </span>
        </header>

        <HeroCards />

        <div className="hm-hero__center">
          <p className="hm-eyebrow hm-eyebrow--light">Chào mừng bạn đến với</p>
          <Image
            src="/brand/solisst-logo.png"
            alt="Solisst"
            width={1430}
            height={370}
            priority
            className="hm-hero__logo"
          />
          <span className="hm-hero__line" />
          <p className="hm-hero__sub">Fashion / Lifestyle / You</p>
          <p className="hm-hero__loc">
            <span className="hm-dot" />
            {business.city}, Việt Nam
          </p>
        </div>

        <ul className="hm-hero__trust">
          {promises.map((p, i) => {
            const Icon = trustIcons[i];
            return (
              <li key={p.title}>
                <Icon />
                <div>
                  <strong>{p.title}</strong>
                  <em>{["Cam kết chất lượng", "Nhanh chóng – An toàn", "Luôn bên bạn"][i]}</em>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ---- Giới thiệu ---- */}
      <section className="hm-intro" data-reveal>
        <figure className="hm-intro__fig" data-parallax="0.06">
          <Image src={byId["dam-satin-nau"].src} alt={byId["dam-satin-nau"].name} width={1024} height={1024} sizes="(min-width: 900px) 44vw, 100vw" quality={90} />
          <figcaption>Đầm satin nâu dáng ôm, bán chạy nhất mùa này</figcaption>
        </figure>
        <div className="hm-intro__body">
          <p className="hm-eyebrow">{business.city}, Việt Nam</p>
          <h1 className="hm-h1">Thời trang cho người phụ nữ biết mình đẹp nhất ở đâu.</h1>
          <p className="hm-lead">
            SOLISST chọn chất liệu trước, chọn phom dáng sau. Mỗi thiết kế được may để tôn vóc dáng tự nhiên và mặc được nhiều lần, không chạy theo một mùa.
          </p>
          <p className="hm-intro__text">
            Từ đầm dạ tiệc satin đến bộ mặc nhà cotton, tất cả đều được kiểm tra đường may và đóng gói tại xưởng Bắc Ninh trước khi giao đến bạn.
          </p>
          <div className="hm-intro__actions">
            <Link href="/san-pham" className="hm-btn">Xem sản phẩm</Link>
            <a href="#bo-suu-tap" className="hm-link">Bộ sưu tập</a>
          </div>
        </div>
      </section>

      {/* ---- Bộ sưu tập ---- */}
      <section className="hm-collection" id="bo-suu-tap" data-reveal>
        <div className="hm-section__head">
          <h2 className="hm-h2">Bộ sưu tập</h2>
          <Link href="/san-pham" className="hm-link">Xem tất cả sản phẩm</Link>
        </div>
        <ul className="hm-grid" data-reveal="stagger">
          {items.map((it) => (
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
            </li>
          ))}
        </ul>
      </section>

      {/* ---- Lookbook ---- */}
      <section className="hm-look" id="lookbook" data-reveal>
        <Image src={byId["dam-satin-nau"].src} alt={byId["dam-satin-nau"].name} width={1024} height={1024} sizes="(min-width: 900px) 34vw, 100vw" className="hm-look__img" data-parallax="0.08" />
        <div className="hm-look__panel">
          <p className="hm-eyebrow hm-eyebrow--light">Lookbook</p>
          <h2 className="hm-h2 hm-h2--light">Một chiếc đầm, ba buổi tối khác nhau.</h2>
          <p>
            Đầm satin nâu đi cùng khăn voan ngà cho tiệc tối, khoác blazer đen cho buổi gặp đối tác, hoặc mặc trơn với sandal cho một bữa tối thong thả.
          </p>
          <a href={business.tiktok} target="_blank" rel="noopener noreferrer" className="hm-link hm-link--light">Xem đầm satin nâu</a>
        </div>
        <Image src={byId["dam-ong-navy"].src} alt={byId["dam-ong-navy"].name} width={1024} height={1024} sizes="(min-width: 900px) 32vw, 100vw" className="hm-look__img hm-look__img--2" data-parallax="0.08" />
      </section>

      {/* ---- Size ---- */}
      <section className="hm-size" id="size" data-reveal>
        <div className="hm-size__side">
          <p className="hm-eyebrow">Chọn size</p>
          <h2 className="hm-h2">Đo một lần, chọn đúng mọi mẫu.</h2>
          <p>
            Đo vòng ngực, eo và mông ở điểm rộng nhất, thước ôm sát nhưng không siết. Nếu nằm giữa hai size, nhắn SOLISST kèm chiều cao và cân nặng để được tư vấn.
          </p>
          <a href={business.facebook} target="_blank" rel="noopener noreferrer" className="hm-link">Nhắn tư vấn size</a>
        </div>
        <div className="hm-size__table">
          <table className="hm-table">
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
                  {r.values.map((v, i) => <td key={i}>{v ?? <span className="hm-ph">[Số đo]</span>}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="hm-table__note">{sizeGuide.note}</p>
        </div>
        <div className="hm-size__band" data-reveal="stagger">
          <Image src={byId["bo-ngu-dai-tay"].src} alt={byId["bo-ngu-dai-tay"].name} width={912} height={1280} quality={90} sizes="(min-width: 900px) 30vw, 100vw" />
          <Image src={byId["bo-mac-nha-hoa-nhi"].src} alt={byId["bo-mac-nha-hoa-nhi"].name} width={814} height={1280} quality={90} sizes="(min-width: 900px) 30vw, 100vw" />
          <Image src={byId["bo-mac-nha-navy"].src} alt={byId["bo-mac-nha-navy"].name} width={814} height={1280} quality={90} sizes="(min-width: 900px) 30vw, 100vw" />
        </div>
      </section>

      {/* ---- Ba bước ---- */}
      <section className="hm-steps" id="dat-hang" data-reveal>
        <h2 className="hm-h2">Đặt hàng trong ba bước</h2>
        <ul className="hm-strip" data-reveal="stagger">
          {pajamas.map((it) => (
            <li key={it.slug}>
              <Image src={it.src} alt={it.name} width={it.width} height={it.height} sizes="(min-width: 900px) 18vw, 40vw" />
            </li>
          ))}
        </ul>
        <ol className="hm-steps__list" data-reveal="stagger">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="hm-steps__num">{i + 1}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ---- Ba cam kết ---- */}
      <section className="hm-promise" data-reveal>
        <div className="hm-promise__head">
          <h2 className="hm-h2">Ba điều SOLISST giữ với bạn</h2>
          <div className="hm-promise__thumbs" aria-hidden="true" data-parallax="0.12">
            {["dam-tulle-hong", "dam-satin-nau", "dam-ong-navy"].map((s) => (
              <Image key={s} src={byId[s].src} alt="" width={1024} height={1024} sizes="8vw" />
            ))}
          </div>
        </div>
        <ul className="hm-promise__list" data-reveal="stagger">
          {promises.map((p, i) => {
            const Icon = trustIcons[i];
            return (
              <li key={p.title}>
                <Icon />
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ---- FAQ ---- */}
      <section className="hm-faq" data-reveal>
        <div className="hm-faq__side">
          <h2 className="hm-h2">Câu hỏi thường gặp</h2>
          <Image src={byId["dam-ong-navy"].src} alt={byId["dam-ong-navy"].name} width={1024} height={1024} sizes="(min-width: 900px) 22vw, 100vw" className="hm-faq__img" data-parallax="0.1" />
        </div>
        <dl className="hm-faq__list" data-reveal="stagger">
          {faqs.map((f) => (
            <div key={f.q}>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <ContactCta />

      {/* ---- Footer ---- */}
      <Footer />
    </>
  );
}
