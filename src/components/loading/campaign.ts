/**
 * Cấu hình ảnh campaign cho màn hình loading.
 *
 * CÁCH THAY ẢNH THẬT:
 *  1. Đặt ảnh đã được phê duyệt vào thư mục `public/campaign/`:
 *       - desktop.jpg  (ảnh ngang, khuyến nghị 2400×1500 trở lên)
 *       - mobile.jpg   (ảnh dọc, khuyến nghị 1200×2000 trở lên)
 *  2. Đổi `desktop` / `mobile` bên dưới thành đường dẫn tương ứng.
 *  3. Điều chỉnh `focalPoint` để người mẫu không bị chữ che
 *     (giá trị theo CSS `object-position`, ví dụ "50% 20%" = canh giữa, ưu tiên phần trên).
 *
 * Khi cả hai đường dẫn là `null`, màn loading dùng nền ivory phẳng, tối giản.
 */
export type CampaignConfig = {
  desktop: string | null;
  mobile: string | null;
  alt: string;
  focalPoint: { desktop: string; mobile: string };
};

export const campaign: CampaignConfig = {
  desktop: null,
  mobile: null,
  alt: "Chiến dịch SOLISST — người mẫu trong trang phục tông nude và beige",
  focalPoint: { desktop: "50% 18%", mobile: "50% 15%" },
};
