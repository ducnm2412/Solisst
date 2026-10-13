"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { business } from "@/lib/product";
import type { Item } from "@/lib/collection";
import { track } from "@/components/tracking/track";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "done"; total: number } | { kind: "error"; message: string };

const toNumber = (p: string | null) => (p ? Number(p.replace(/\D/g, "")) : 0);
const vnd = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + " ₫";

/** Hai nút hành động + popup đặt hàng cho một sản phẩm trong bộ sưu tập. */
export function BuyBox({ item }: { item: Item }) {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(item.sizes[item.sizes.length > 1 ? 1 : 0]);
  const [qty, setQty] = useState(1);
  const [payment, setPayment] = useState<"cod" | "bank">("cod");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const dialog = useRef<HTMLDivElement>(null);
  const unit = toNumber(item.price);
  const total = unit * qty;

  const close = () => {
    setOpen(false);
    if (status.kind !== "done") setStatus({ kind: "idle" });
  };

  // Khóa cuộn + Esc đóng + focus vào popup
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    dialog.current?.querySelector<HTMLElement>("input, button")?.focus();
    track("InitiateCheckout", { content_name: item.name, currency: "VND", value: total });
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "item",
          slug: item.slug,
          size,
          qty,
          payment,
          name: fd.get("name"),
          phone: fd.get("phone"),
          address: fd.get("address"),
          note: fd.get("note"),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; total?: number; error?: string };
      if (!res.ok || !data.ok) {
        setStatus({ kind: "error", message: data.error ?? "Chưa gửi được đơn. Vui lòng thử lại." });
        return;
      }
      track("Purchase", { content_name: item.name, currency: "VND", value: data.total, num_items: qty });
      setStatus({ kind: "done", total: data.total ?? total });
    } catch {
      setStatus({ kind: "error", message: "Mất kết nối. Vui lòng kiểm tra mạng và thử lại." });
    }
  }

  return (
    <>
      <div className="pd-actions">
        <button type="button" className="pd-btn" onClick={() => setOpen(true)}>
          Mua hàng
        </button>
        <a href={business.facebook} target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn--ghost">
          Nhắn Facebook để đặt
        </a>
      </div>

      {open && (
        <div className="bb" onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div ref={dialog} className="bb__dialog" role="dialog" aria-modal="true" aria-labelledby="bb-title">
            <button type="button" className="bb__close" onClick={close} aria-label="Đóng">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>

            {status.kind === "done" ? (
              <div className="bb__done" role="status">
                <p className="bb__doneTitle">Đã nhận đơn của bạn</p>
                <p className="bb__doneBody">
                  {qty} × {item.name}, size {size}. Thành tiền {vnd(status.total)}.{" "}
                  {payment === "cod"
                    ? "Thanh toán khi nhận hàng, SOLISST sẽ gọi xác nhận trong hôm nay."
                    : "SOLISST sẽ gọi xác nhận và gửi thông tin chuyển khoản trong hôm nay."}
                </p>
                <button type="button" className="pd-btn" onClick={close}>Đóng</button>
              </div>
            ) : (
              <form className="bb__form" onSubmit={onSubmit} noValidate>
                <header className="bb__head">
                  <p className="hm-eyebrow">Đặt hàng</p>
                  <h2 id="bb-title" className="bb__title">{item.name}</h2>
                  <p className="bb__price">{item.price}</p>
                </header>

                <div className="bb__row">
                  <fieldset className="bb__field">
                    <legend>Size</legend>
                    <div className="ld-chips">
                      {item.sizes.map((s) => (
                        <label key={s} className={`ld-chip ${size === s ? "is-on" : ""}`}>
                          <input type="radio" name="size" value={s} checked={size === s} onChange={() => setSize(s)} />
                          {s}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div className="bb__field">
                    <span className="bb__label">Số lượng</span>
                    <div className="bb__qty">
                      <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Giảm">−</button>
                      <output aria-live="polite">{qty}</output>
                      <button type="button" onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Tăng">+</button>
                    </div>
                  </div>
                </div>

                <div className="bb__inputs">
                  <label className="ld-input">
                    <span>Họ tên</span>
                    <input name="name" type="text" autoComplete="name" required minLength={2} />
                  </label>
                  <label className="ld-input">
                    <span>Số điện thoại</span>
                    <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required />
                  </label>
                  <label className="ld-input ld-input--full">
                    <span>Địa chỉ nhận hàng</span>
                    <input name="address" type="text" autoComplete="street-address" required minLength={8} placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành" />
                  </label>
                  <label className="ld-input ld-input--full">
                    <span>Ghi chú (không bắt buộc)</span>
                    <input name="note" type="text" maxLength={500} />
                  </label>
                </div>

                <fieldset className="bb__field">
                  <legend>Phương thức thanh toán</legend>
                  <div className="bb__pay">
                    <label className={`bb__payOpt ${payment === "cod" ? "is-on" : ""}`}>
                      <input type="radio" name="payment" value="cod" checked={payment === "cod"} onChange={() => setPayment("cod")} />
                      <strong>Thanh toán khi nhận hàng</strong>
                      <span>Kiểm hàng trước khi trả tiền</span>
                    </label>
                    <label className={`bb__payOpt ${payment === "bank" ? "is-on" : ""}`}>
                      <input type="radio" name="payment" value="bank" checked={payment === "bank"} onChange={() => setPayment("bank")} />
                      <strong>Chuyển khoản</strong>
                      <span>Shop gửi số tài khoản khi xác nhận</span>
                    </label>
                  </div>
                </fieldset>

                <div className="bb__foot">
                  <p className="bb__total">
                    <span>Thành tiền</span>
                    <strong>{vnd(total)}</strong>
                  </p>
                  <button type="submit" className="pd-btn" disabled={status.kind === "sending"}>
                    {status.kind === "sending" ? "Đang gửi đơn…" : "Xác nhận đặt hàng"}
                  </button>
                </div>

                {status.kind === "error" && (
                  <p className="bb__error" role="alert">
                    {status.message}{" "}
                    <a href={`tel:${business.phone}`}>Gọi {business.phoneDisplay}</a>
                    {" hoặc "}
                    <a href={business.zalo} target="_blank" rel="noopener noreferrer">nhắn Zalo</a>.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
