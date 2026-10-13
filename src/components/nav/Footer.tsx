import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/product";

/** Footer dùng chung cho mọi trang. */
export function Footer() {
  return (
    <footer className="hm-foot bg-black" id="lien-he">
      <div className="hm-foot__brand">
        <Link href="/">
          <Image src="/brand/solisst-logo.png" alt="Solisst" width={1430} height={370} />
        </Link>
        <p>Fashion / Lifestyle / You</p>
      </div>
      <dl className="hm-foot__cols">
        <div>
          <dt>Liên hệ</dt>
          <dd><a href={`tel:${business.phone}`}>{business.phoneDisplay}</a></dd>
          <dd><a href={business.zalo} target="_blank" rel="noopener noreferrer">Zalo</a></dd>
        </div>
        <div>
          <dt>Mua sắm</dt>
          <dd><Link href="/san-pham">Sản phẩm</Link></dd>
          <dd><a href={business.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></dd>
          <dd><a href={business.tiktok} target="_blank" rel="noopener noreferrer">TikTok Shop</a></dd>
        </div>
        <div>
          <dt>Xưởng</dt>
          <dd><a href={business.maps} target="_blank" rel="noopener noreferrer">{business.city}, Việt Nam</a></dd>
        </div>
      </dl>
      <div className="hm-foot__bar">
        <span>© SOLISST</span>
        <span>Be your best self</span>
      </div>
    </footer>
  );
}
