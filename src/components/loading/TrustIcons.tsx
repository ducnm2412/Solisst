import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  width: 28,
  height: 28,
  viewBox: "0 0 28 28",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

/** Nhãn treo — sản phẩm chính hãng */
export function IconTag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M14 3.5 24.5 14 14 24.5 3.5 14V3.5h10.5Z" />
      <circle cx="8.5" cy="8.5" r="1.5" />
    </svg>
  );
}

/** Hộp giao hàng — giao hàng toàn quốc */
export function IconParcel(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9.5 14 4l10 5.5v9L14 24 4 18.5v-9Z" />
      <path d="M4 9.5 14 15l10-5.5M14 15v9" />
    </svg>
  );
}

/** Bàn tay nâng — hỗ trợ tận tâm */
export function IconCare(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 16.5c3-1 5.5-1 8 0.5l4 1.5c1.3.5 1.3 2.2 0 2.5l-4.5.5" />
      <path d="M12 20.5 20 19c1.5-.3 2.6-1 3.5-2L24 16" />
      <path d="M14 11.5c-2.3-1.6-3.5-3-3.5-4.6A2.2 2.2 0 0 1 14 5.6a2.2 2.2 0 0 1 3.5 1.3c0 1.6-1.2 3-3.5 4.6Z" />
    </svg>
  );
}
