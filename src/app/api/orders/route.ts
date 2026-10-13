import { product } from "@/lib/product";
import { byId } from "@/lib/collection";

/**
 * Nhận đơn từ hai nơi:
 *   - form chốt đơn gen Solist (kind: "gen")  — combo 1/2/3, màu đen/da, size
 *   - popup mua hàng ở trang chi tiết (kind: "item") — slug sản phẩm, size, số lượng, phương thức thanh toán
 * rồi đẩy sang Google Apps Script (ghi Google Sheet + gửi Gmail). Xem scripts/google-apps-script.js.
 *
 * .env.local:
 *   ORDER_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
 *   ORDER_WEBHOOK_SECRET=chuoi-bi-mat-tuy-chon
 */

type Customer = { name: string; phone: string; address: string; note: string };

type Order = {
  createdAt: string;
  product: string;
  qty: number;
  color: string;
  size: string;
  total: number;
  payment: string;
} & Customer & { source: string; userAgent: string };

const PHONE_RE = /^(0|\+84)(\d{9})$/;
const PAYMENTS: Record<string, string> = {
  cod: "Thanh toán khi nhận hàng",
  bank: "Chuyển khoản ngân hàng",
};

function customer(b: Record<string, unknown>): { ok: true; data: Customer } | { ok: false; error: string } {
  const name = String(b.name ?? "").trim();
  if (name.length < 2) return { ok: false, error: "Vui lòng nhập họ tên." };
  const phone = String(b.phone ?? "").replace(/[\s.-]/g, "");
  if (!PHONE_RE.test(phone)) return { ok: false, error: "Số điện thoại chưa đúng. Ví dụ: 0904221887." };
  const address = String(b.address ?? "").trim();
  if (address.length < 8) return { ok: false, error: "Vui lòng nhập địa chỉ nhận hàng đầy đủ." };
  const note = String(b.note ?? "").trim().slice(0, 500);
  return { ok: true, data: { name, phone, address, note } };
}

const toNumber = (p: string | null) => (p ? Number(p.replace(/\D/g, "")) : 0);

function validate(body: unknown): { ok: true; order: Omit<Order, "source" | "userAgent"> } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Dữ liệu không hợp lệ." };
  const b = body as Record<string, unknown>;
  const c = customer(b);
  if (!c.ok) return c;
  const createdAt = new Date().toISOString();

  if (b.kind === "item") {
    const item = byId[String(b.slug ?? "")];
    if (!item) return { ok: false, error: "Không tìm thấy sản phẩm." };
    const size = String(b.size ?? "");
    if (!item.sizes.includes(size)) return { ok: false, error: "Vui lòng chọn size." };
    const qty = Math.floor(Number(b.qty));
    if (!(qty >= 1 && qty <= 10)) return { ok: false, error: "Số lượng từ 1 đến 10." };
    const payment = PAYMENTS[String(b.payment ?? "")];
    if (!payment) return { ok: false, error: "Vui lòng chọn phương thức thanh toán." };
    return {
      ok: true,
      order: { createdAt, product: item.name, qty, color: item.colors[0], size, total: toNumber(item.price) * qty, payment, ...c.data },
    };
  }

  // Mặc định: đơn gen Solist
  const qty = Number(b.qty);
  const combo = product.combos.find((x) => x.qty === qty);
  if (!combo) return { ok: false, error: "Vui lòng chọn số lượng." };
  const color = product.colors.find((x) => x.id === String(b.color ?? ""));
  if (!color) return { ok: false, error: "Vui lòng chọn màu." };
  const size = String(b.size ?? "");
  if (!(product.sizes as readonly string[]).includes(size)) return { ok: false, error: "Vui lòng chọn size." };
  return {
    ok: true,
    order: { createdAt, product: product.name, qty, color: color.label, size, total: combo.price, payment: PAYMENTS.cod, ...c.data },
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }
  const v = validate(body);
  if (!v.ok) return Response.json({ error: v.error }, { status: 400 });

  const order: Order = {
    ...v.order,
    source: request.headers.get("referer") ?? "",
    userAgent: request.headers.get("user-agent") ?? "",
  };

  const webhook = process.env.ORDER_WEBHOOK_URL;
  if (!webhook) {
    console.warn("[orders] ORDER_WEBHOOK_URL chưa cấu hình. Đơn nhận được:", order);
    return Response.json(
      { error: "Hệ thống nhận đơn chưa được kết nối. Vui lòng gọi hoặc nhắn Zalo để đặt hàng." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.ORDER_WEBHOOK_SECRET ?? "", order }),
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
    return Response.json({ ok: true, total: order.total });
  } catch (err) {
    console.error("[orders] Gửi webhook thất bại:", err, order);
    return Response.json(
      { error: "Chưa gửi được đơn. Vui lòng thử lại hoặc gọi cho chúng tôi." },
      { status: 502 },
    );
  }
}
