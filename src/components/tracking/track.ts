/* Lớp mỏng bọc TikTok Pixel và Meta Pixel. An toàn khi pixel chưa gắn. */

type Params = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (event: string, params?: Params) => void; page?: () => void };
  }
}

export function track(event: "ViewContent" | "InitiateCheckout" | "Purchase", params: Params = {}) {
  if (typeof window === "undefined") return;
  window.fbq?.("track", event, params);
  const ttEvent = { ViewContent: "ViewContent", InitiateCheckout: "InitiateCheckout", Purchase: "PlaceAnOrder" }[event];
  window.ttq?.track(ttEvent, params);
}
