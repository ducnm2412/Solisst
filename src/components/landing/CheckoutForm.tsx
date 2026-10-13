"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { business, formatVnd, product } from "@/lib/product";
import { track } from "@/components/tracking/track";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "done"; total: number } | { kind: "error"; message: string };

export function CheckoutForm() {
  const [qty, setQty] = useState<1 | 2 | 3>(1);
  const [color, setColor] = useState<"den" | "da">("den");
  const [size, setSize] = useState<string>("M");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const touched = useRef(false);

  useEffect(() => {
    track("ViewContent", { content_name: product.name, currency: "VND" });
  }, []);

  const combo = product.combos.find((c) => c.qty === qty)!;
  const colorLabel = product.colors.find((c) => c.id === color)!.label;

  const onFirstTouch = () => {
    if (touched.current) return;
    touched.current = true;
    track("InitiateCheckout", { content_name: product.name, currency: "VND", value: combo.price });
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          qty,
          color,
          size,
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
      track("Purchase", { content_name: product.name, currency: "VND", value: data.total, num_items: qty });
      setStatus({ kind: "done", total: data.total ?? combo.price });
    } catch {
      setStatus({ kind: "error", message: "Mất kết nối. Vui lòng kiểm tra mạng và thử lại." });
    }
  }

  if (status.kind === "done") {
    return (
      <div className="ld-form ld-form--done" role="status">
        <p className="ld-form__doneTitle">Đã nhận đơn của bạn</p>
        <p className="ld-form__doneBody">
          {qty} × {product.shortName}, màu {colorLabel}, size {size}. Thành tiền {formatVnd(status.total)}, thanh toán khi nhận hàng.
          SOLISST sẽ gọi xác nhận trong hôm nay.
        </p>
        <a className="ld-link" href={`tel:${business.phone}`}>
          Cần đổi thông tin? Gọi {business.phoneDisplay}
        </a>
      </div>
    );
  }

  return (
    <form className="ld-form" onSubmit={onSubmit} onFocusCapture={onFirstTouch} noValidate>
      <fieldset className="ld-field">
        <legend className="ld-field__legend">Số lượng</legend>
        <div className="ld-combos">
          {product.combos.map((c) => (
            <label key={c.qty} className={`ld-combo ${qty === c.qty ? "is-on" : ""}`}>
              <input
                type="radio"
                name="qty"
                value={c.qty}
                checked={qty === c.qty}
                onChange={() => setQty(c.qty)}
              />
              <span className="ld-combo__qty">{c.qty}</span>
              <span className="ld-combo__price">{formatVnd(c.price)}</span>
              <span className="ld-combo__note">{c.note}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="ld-field ld-field--row">
        <fieldset className="ld-field">
          <legend className="ld-field__legend">Màu</legend>
          <div className="ld-chips">
            {product.colors.map((c) => (
              <label key={c.id} className={`ld-chip ${color === c.id ? "is-on" : ""}`}>
                <input type="radio" name="color" value={c.id} checked={color === c.id} onChange={() => setColor(c.id)} />
                <span className="ld-chip__swatch" style={{ background: c.swatch }} />
                {c.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="ld-field">
          <legend className="ld-field__legend">
            Size <a href="#size" className="ld-field__hint">Xem bảng size</a>
          </legend>
          <div className="ld-chips">
            {product.sizes.map((s) => (
              <label key={s} className={`ld-chip ${size === s ? "is-on" : ""}`}>
                <input type="radio" name="size" value={s} checked={size === s} onChange={() => setSize(s)} />
                {s}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="ld-inputs">
        <label className="ld-input">
          <span>Họ tên</span>
          <input name="name" type="text" autoComplete="name" required minLength={2} />
        </label>
        <label className="ld-input">
          <span>Số điện thoại</span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required pattern="^(0|\+84)\d{9}$" />
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

      <div className="ld-form__foot">
        <p className="ld-form__total">
          <span>Thành tiền</span>
          <strong>{formatVnd(combo.price)}</strong>
          <small>Thanh toán khi nhận hàng</small>
        </p>
        <button type="submit" className="ld-btn" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Đang gửi đơn…" : "Đặt hàng"}
        </button>
      </div>

      {status.kind === "error" && (
        <p className="ld-form__error" role="alert">
          {status.message}{" "}
          <a className="ld-link" href={`tel:${business.phone}`}>Gọi {business.phoneDisplay}</a>
          {" hoặc "}
          <a className="ld-link" href={business.zalo} target="_blank" rel="noopener noreferrer">nhắn Zalo</a>.
        </p>
      )}
    </form>
  );
}
