/**
 * CẤU HÌNH SẢN PHẨM & CHIẾN DỊCH — chỉnh ở đây, không cần sửa component.
 *
 * ⚠ GIÁ, SIZE VÀ ẢNH LOOKBOOK DƯỚI ĐÂY LÀ GIÁ TRỊ TẠM, CẦN XÁC NHẬN VỚI SHOP.
 *   TikTok Shop chặn truy cập tự động nên không lấy được giá thật.
 */

export type Combo = { qty: 1 | 2 | 3; price: number; note: string };
export type ColorOption = { id: "den" | "da"; label: string; swatch: string };

export const product = {
  name: "Đai latex định hình vòng hai Solist",
  shortName: "Gen Solist",
  tagline: "Ren Chantilly, siêu thoáng, hai màu đen và da.",
  compareAtPrice: 429_000 as number | null,
  combos: [
    { qty: 1, price: 289_000, note: "Dùng thử 1 cái" },
    { qty: 2, price: 499_000, note: "Tiết kiệm 79.000 ₫, freeship" },
    { qty: 3, price: 719_000, note: "Tiết kiệm 148.000 ₫, freeship" },
  ] satisfies Combo[],
  colors: [
    { id: "den", label: "Đen", swatch: "#171514" },
    { id: "da", label: "Da", swatch: "#D8C2AC" },
  ] satisfies ColorOption[],
  sizes: ["S", "M", "L", "XL", "2XL"],
  /** Bảng size tạm — thay bằng số đo thật của shop. */
  sizeGuide: [
    { size: "S", waist: "58–64 cm", weight: "40–47 kg" },
    { size: "M", waist: "64–70 cm", weight: "47–53 kg" },
    { size: "L", waist: "70–76 cm", weight: "53–60 kg" },
    { size: "XL", waist: "76–82 cm", weight: "60–67 kg" },
    { size: "2XL", waist: "82–88 cm", weight: "67–75 kg" },
  ],
  highlights: [
    {
      title: "Latex định hình",
      body: "Lớp latex ôm vòng hai, giữ dáng cả ngày mà không hằn qua lớp váy.",
    },
    {
      title: "Ren Chantilly",
      body: "Viền ren mỏng, mềm, nằm phẳng dưới áo. Nhìn như nội y, không như gen.",
    },
    {
      title: "Siêu thoáng",
      body: "Lỗ thoáng khí dọc thân, mặc được trong ngày nắng và khi đi tiệc tối.",
    },
  ],
  /** Ảnh. Hero là phần người mẫu cắt từ banner Solist 10/10 (670×1200). */
  images: {
    hero: {
      src: "/product/solist-hero.webp",
      alt: "Người mẫu mặc đai latex Solist màu đen cùng váy xanh",
      width: 670,
      height: 1200,
      focal: "50% 20%",
    },
    /**
     * Lookbook: đặt ảnh thật vào public/lookbook/ rồi điền vào đây.
     * Khi mảng rỗng, trang hiển thị khung placeholder có nhãn.
     */
    lookbook: [
      { src: "/product/detail/toan-than.webp", alt: "Dáng eo khi mặc đai Solist dưới váy", width: 1120, height: 1520 },
      { src: "/product/detail/can-dai.webp", alt: "Cận đai latex và viền ren", width: 840, height: 680 },
      { src: "/product/detail/can-mong-cai.webp", alt: "Cận ba hàng móc cài và thanh nẹp", width: 540, height: 320 },
    ] as { src: string; alt: string; width: number; height: number }[],
  },
} as const;

export const business = {
  brand: "SOLISST",
  contactName: "Bá Mỹ",
  phone: "0904221887",
  phoneDisplay: "0904 221 887",
  zalo: "https://zalo.me/0904221887",
  facebook: "https://www.facebook.com/xike.my.7/",
  maps: "https://maps.app.goo.gl/keLqtX2kAbS4rpcZ6",
  tiktok: "https://shop.tiktok.com/vn/pdp/1734569027011249683",
  city: "Bắc Ninh",
};

/**
 * Flash sale. Đặt `endsAt` là thời điểm kết thúc thật (ISO, múi giờ +07:00).
 * Khi đã qua giờ hoặc để null, thanh đếm ngược tự ẩn — không đếm giả.
 */
export const flashSale = {
  endsAt: "2026-10-31T23:59:59+07:00" as string | null,
  label: "Siêu sale tháng 10",
  perks: ["Giảm 30%", "Freeship từ 2 cái", "Thanh toán khi nhận"],
};

export const formatVnd = (n: number) =>
  new Intl.NumberFormat("vi-VN").format(n) + " ₫";
