/**
 * DỮ LIỆU TRANG CHỦ SOLISST.
 * ⚠ GIÁ, SỐ ĐO VÀ SỐ NGÀY DƯỚI ĐÂY LÀ SỐ TẠM (đặt theo mặt bằng chung), SHOP CẦN XÁC NHẬN LẠI.
 */

export type Item = {
  slug: string;
  name: string;
  src: string;
  width: number;
  height: number;
  /** null = hiện "[GIÁ]" */
  price: string | null;
  /** Nhóm: "dam" (đầm) hoặc "mac-nha" (bộ mặc nhà) */
  group: "dam" | "mac-nha";
  /** Một câu mô tả ngắn hiện dưới tên */
  tagline: string;
  /** Mô tả chi tiết, mỗi phần tử một đoạn */
  description: string[];
  material: string;
  colors: string[];
  sizes: string[];
  care: string[];
  /** Nhãn hiển thị trên thẻ: "Bán chạy", "Mới về"… */
  badge?: "Bán chạy" | "Mới về";
  /** Số đã bán (tạm) để xếp bestseller */
  sold: number;
};

const careDress = [
  "Giặt tay nước lạnh, không vắt mạnh.",
  "Phơi trong bóng râm, là ở nhiệt độ thấp mặt trái.",
  "Treo bằng móc có đệm vai để giữ phom.",
];
const careHome = [
  "Giặt máy chế độ nhẹ, túi giặt riêng.",
  "Không sấy nóng, phơi nơi thoáng.",
  "Lộn trái khi giặt để giữ màu in.",
];
const sizesDress = ["S", "M", "L", "XL"];
const freesize = ["Freesize 40–60 kg"];

const img = (slug: string, width: number, height: number) => ({
  src: `/collection/${slug}.webp`,
  width,
  height,
});

export const items: Item[] = [
  {
    slug: "dam-ong-navy",
    sold: 640,
    name: "Đầm ống navy & khăn voan",
    ...img("dam-ong-navy", 1024, 1024),
    price: "489.000 ₫",
    group: "dam",
    tagline: "Đầm ống dáng suông kèm khăn voan ngà, cho buổi tối cần sự chỉn chu.",
    description: [
      "Phần thân trên cúp ngực có gọng mềm và dây kéo giấu bên hông, ôm nhẹ mà không siết. Thân váy suông thẳng, dài chấm gót, tôn chiều cao.",
      "Khăn voan ngà đi kèm rộng 70 cm, choàng vai cho buổi tối se lạnh hoặc buộc hờ làm điểm nhấn.",
    ],
    material: "Vải tuytsi dày dặn, lót lụa lạnh. Khăn voan tơ mỏng.",
    colors: ["Navy"],
    sizes: sizesDress,
    care: careDress,
  },
  {
    slug: "dam-satin-nau",
    sold: 1280,
    badge: "Bán chạy",
    name: "Đầm satin nâu dáng ôm",
    ...img("dam-satin-nau", 1024, 1024),
    price: "529.000 ₫",
    group: "dam",
    tagline: "Satin nâu cacao, cổ xoắn hai dây, ôm từ ngực xuống hông rồi buông nhẹ.",
    description: [
      "Cổ xoắn tạo điểm nhìn ở ngực, hai dây mảnh điều chỉnh được. Thân ôm theo đường cong rồi xòe nhẹ từ gối, bước đi mềm mại.",
      "Mặt satin bắt sáng vừa phải, lên hình đẹp dưới đèn tiệc. Đi kèm khăn voan ngà như ảnh.",
    ],
    material: "Satin lụa Hàn hai lớp, không bai dão.",
    colors: ["Nâu cacao"],
    sizes: sizesDress,
    care: careDress,
  },
  {
    slug: "dam-tulle-hong",
    sold: 420,
    name: "Đầm tulle hồng cổ V",
    ...img("dam-tulle-hong", 1024, 1024),
    price: "459.000 ₫",
    group: "dam",
    tagline: "Tulle hồng phấn, cổ V tay ngắn, chân váy xòe nhẹ bồng bềnh.",
    description: [
      "Cổ V vừa phải, tay ngắn phủ vai, phần eo chiết gọn tôn dáng. Chân váy nhiều lớp tulle xòe nhẹ, không cộm.",
      "Phù hợp dự tiệc cưới ban ngày, chụp ảnh ngoài trời hoặc buổi hẹn cần sự dịu dàng.",
    ],
    material: "Tulle mềm ba lớp, lót cotton lạnh thoáng mát.",
    colors: ["Hồng phấn"],
    sizes: sizesDress,
    care: careDress,
  },
  {
    slug: "bo-mac-nha-hoa-nhi",
    sold: 960,
    badge: "Bán chạy",
    name: "Bộ mặc nhà hoa nhí",
    ...img("bo-mac-nha-hoa-nhi", 814, 1280),
    price: "189.000 ₫",
    group: "mac-nha",
    tagline: "Áo babydoll tay lỡ và quần short, họa tiết hoa nhí nền kem.",
    description: [
      "Áo cổ vuông nhún nhẹ, tay lỡ bồng, dáng babydoll che bụng tốt. Quần short lưng chun, ống rộng thoải mái.",
      "Vải mỏng thoáng, mặc ở nhà hay ra ngõ đều ổn.",
    ],
    material: "Tole lụa 2 da, mềm và mát.",
    colors: ["Hoa nhí kem"],
    sizes: freesize,
    care: careHome,
  },
  {
    slug: "bo-mac-nha-hoa-xanh",
    sold: 540,
    name: "Bộ mặc nhà hoa xanh",
    ...img("bo-mac-nha-hoa-xanh", 814, 1280),
    price: "189.000 ₫",
    group: "mac-nha",
    tagline: "Cùng phom babydoll, họa tiết hoa xanh nhạt nền trắng.",
    description: [
      "Phom giống bộ hoa nhí: cổ vuông, tay lỡ, quần short lưng chun. Họa tiết hoa xanh mát mắt cho ngày hè.",
    ],
    material: "Tole lụa 2 da, mềm và mát.",
    colors: ["Hoa xanh"],
    sizes: freesize,
    care: careHome,
  },
  {
    slug: "bo-mac-nha-navy",
    sold: 870,
    badge: "Bán chạy",
    name: "Bộ mặc nhà navy",
    ...img("bo-mac-nha-navy", 814, 1280),
    price: "189.000 ₫",
    group: "mac-nha",
    tagline: "Nền navy họa tiết nhỏ, trầm hơn, dễ phối và ít lộ bẩn.",
    description: [
      "Phom babydoll tay lỡ, quần short lưng chun. Nền navy tôn da, hợp người thích màu trầm.",
    ],
    material: "Tole lụa 2 da, mềm và mát.",
    colors: ["Navy"],
    sizes: freesize,
    care: careHome,
  },
  {
    slug: "bo-mac-nha-vang",
    sold: 260,
    badge: "Mới về",
    name: "Bộ mặc nhà vàng",
    ...img("bo-mac-nha-vang", 814, 1280),
    price: "189.000 ₫",
    group: "mac-nha",
    tagline: "Nền vàng kem họa tiết gấu nhỏ, tươi và ấm.",
    description: [
      "Phom babydoll tay lỡ, quần short lưng chun. Màu vàng kem sáng mặt, hợp tông da sáng và trung bình.",
    ],
    material: "Tole lụa 2 da, mềm và mát.",
    colors: ["Vàng kem"],
    sizes: freesize,
    care: careHome,
  },
  {
    slug: "bo-ngu-dai-tay",
    sold: 310,
    badge: "Mới về",
    name: "Bộ ngủ dài tay",
    ...img("bo-ngu-dai-tay", 912, 1280),
    price: "229.000 ₫",
    group: "mac-nha",
    tagline: "Áo dài tay cổ nơ, quần dài ống suông, cho đêm mát và sáng se lạnh.",
    description: [
      "Áo cổ tròn có dây nơ, tay dài bo chun nhẹ. Quần dài lưng chun ống suông, không bó bắp chân.",
      "Họa tiết in nhỏ nền trắng kem, giặt nhiều lần vẫn giữ màu.",
    ],
    material: "Tole lụa 2 da, dày hơn bộ short một chút.",
    colors: ["Trắng kem"],
    sizes: freesize,
    care: careHome,
  },
];

export const bestsellers = [...items].sort((a, b) => b.sold - a.sold).slice(0, 4);
export const categories = [
  { id: "dam", name: "Đầm dạ tiệc", blurb: "Satin, tulle và voan cho buổi tối cần sự chỉn chu.", cover: "dam-satin-nau" },
  { id: "mac-nha", name: "Bộ mặc nhà", blurb: "Tole lụa mát, phom babydoll, freesize 40–60 kg.", cover: "bo-mac-nha-hoa-nhi" },
] as const;

export const byId = Object.fromEntries(items.map((i) => [i.slug, i])) as Record<string, Item>;

export const sizeGuide = {
  columns: ["Cân nặng", "Ngực", "Eo", "Mông"],
  rows: [
    { size: "S", values: ["40–47 kg", "80–84", "62–66", "86–90"] },
    { size: "M", values: ["47–53 kg", "84–88", "66–70", "90–94"] },
    { size: "L", values: ["53–59 kg", "88–92", "70–74", "94–98"] },
    { size: "XL", values: ["59–66 kg", "92–96", "74–78", "98–102"] },
  ] as { size: string; values: (string | null)[] }[],
  note: "Đơn vị cm. Bộ mặc nhà là freesize cho 40–60 kg.",
};

export const steps = [
  {
    title: "Chọn mẫu và size",
    body: "Xem bộ sưu tập, đối chiếu bảng size hoặc nhắn số đo để SOLISST chọn giúp.",
  },
  {
    title: "Đặt trên TikTok Shop hoặc Facebook",
    body: "Mua trực tiếp trên TikTok Shop, hoặc nhắn Facebook để đặt và chọn hình thức thanh toán.",
  },
  {
    title: "Nhận và kiểm hàng",
    body: "Mở gói kiểm tra trước khi thanh toán; cần đổi size, nhắn SOLISST ngay khi nhận.",
  },
];

export const promises = [
  {
    title: "Sản phẩm chính hãng",
    body: "Mỗi sản phẩm được kiểm tra đường may, chất liệu và đóng gói tại xưởng trước khi gửi đi.",
  },
  {
    title: "Giao hàng toàn quốc",
    body: "Gửi đi trong ngày làm việc, được kiểm hàng trước khi thanh toán.",
  },
  {
    title: "Hỗ trợ tận tâm",
    body: "Tư vấn size và đổi trả qua Facebook hoặc số 0904 221 887, mọi ngày trong tuần.",
  },
];

/** Số ngày là số tạm, shop xác nhận lại. */
export const faqs = [
  {
    q: "Bao lâu thì nhận được hàng?",
    a: "Đơn gửi từ Bắc Ninh trong ngày làm việc; miền Bắc thường 1–2 ngày, miền Trung và Nam 3–5 ngày.",
  },
  {
    q: "Mặc không vừa thì đổi thế nào?",
    a: "Nhắn SOLISST trong 7 ngày kể từ khi nhận, sản phẩm còn tem và chưa qua sử dụng; shop hướng dẫn gửi đổi size.",
  },
  {
    q: "Giặt đầm satin và voan ra sao?",
    a: "Giặt tay nước lạnh, không vắt mạnh, phơi trong bóng râm và là ở nhiệt độ thấp mặt trái.",
  },
  {
    q: "Có mua trực tiếp được không?",
    a: "Hiện SOLISST bán trực tuyến qua TikTok Shop và Facebook; khách ở Bắc Ninh có thể nhắn hẹn xem hàng tại xưởng.",
  },
];
