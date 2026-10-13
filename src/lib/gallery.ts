/** Ảnh phụ tự sinh từ ảnh gốc (cắt góc). Thay bằng ảnh chụp thật khi có. */
export type GalleryImage = { src: string; width: number; height: number; label: string };
export const gallery: Record<string, GalleryImage[]> = {
  "bo-mac-nha-hoa-nhi": [
    { src: "/collection/gallery/bo-mac-nha-hoa-nhi-than-tren.webp", width: 814, height: 768, label: "Thân trên" },
    { src: "/collection/gallery/bo-mac-nha-hoa-nhi-than-duoi.webp", width: 814, height: 704, label: "Thân dưới" },
    { src: "/collection/gallery/bo-mac-nha-hoa-nhi-chat-lieu.webp", width: 814, height: 896, label: "Cận chất liệu" },
  ],
  "bo-mac-nha-hoa-xanh": [
    { src: "/collection/gallery/bo-mac-nha-hoa-xanh-than-tren.webp", width: 814, height: 768, label: "Thân trên" },
    { src: "/collection/gallery/bo-mac-nha-hoa-xanh-than-duoi.webp", width: 814, height: 704, label: "Thân dưới" },
    { src: "/collection/gallery/bo-mac-nha-hoa-xanh-chat-lieu.webp", width: 814, height: 896, label: "Cận chất liệu" },
  ],
  "bo-mac-nha-navy": [
    { src: "/collection/gallery/bo-mac-nha-navy-than-tren.webp", width: 814, height: 768, label: "Thân trên" },
    { src: "/collection/gallery/bo-mac-nha-navy-than-duoi.webp", width: 814, height: 704, label: "Thân dưới" },
    { src: "/collection/gallery/bo-mac-nha-navy-chat-lieu.webp", width: 814, height: 896, label: "Cận chất liệu" },
  ],
  "bo-mac-nha-vang": [
    { src: "/collection/gallery/bo-mac-nha-vang-than-tren.webp", width: 814, height: 768, label: "Thân trên" },
    { src: "/collection/gallery/bo-mac-nha-vang-than-duoi.webp", width: 814, height: 704, label: "Thân dưới" },
    { src: "/collection/gallery/bo-mac-nha-vang-chat-lieu.webp", width: 814, height: 896, label: "Cận chất liệu" },
  ],
  "bo-ngu-dai-tay": [
    { src: "/collection/gallery/bo-ngu-dai-tay-than-tren.webp", width: 912, height: 768, label: "Thân trên" },
    { src: "/collection/gallery/bo-ngu-dai-tay-than-duoi.webp", width: 912, height: 704, label: "Thân dưới" },
    { src: "/collection/gallery/bo-ngu-dai-tay-chat-lieu.webp", width: 912, height: 896, label: "Cận chất liệu" },
  ],
  "dam-ong-navy": [
    { src: "/collection/gallery/dam-ong-navy-toan-than.webp", width: 960, height: 1600, label: "Toàn thân" },
    { src: "/collection/gallery/dam-ong-navy-chat-lieu.webp", width: 720, height: 720, label: "Cận chất liệu" },
  ],
  "dam-satin-nau": [
    { src: "/collection/gallery/dam-satin-nau-truoc.webp", width: 832, height: 1600, label: "Mặt trước" },
    { src: "/collection/gallery/dam-satin-nau-sau.webp", width: 832, height: 1600, label: "Mặt sau" },
    { src: "/collection/gallery/dam-satin-nau-chat-lieu.webp", width: 720, height: 720, label: "Cận chất liệu" },
  ],
  "dam-tulle-hong": [
    { src: "/collection/gallery/dam-tulle-hong-toan-than.webp", width: 960, height: 1600, label: "Toàn thân" },
    { src: "/collection/gallery/dam-tulle-hong-chat-lieu.webp", width: 720, height: 720, label: "Cận chất liệu" },
  ],
};
