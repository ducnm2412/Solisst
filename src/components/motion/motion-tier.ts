/**
 * Phân tầng chuyển động theo thiết bị, chạy càng sớm càng tốt (inline trong <head>)
 * để tránh chớp hiệu ứng rồi mới tắt.
 *
 *   html.motion-full  — máy đủ mạnh, chuột: đầy đủ (cuộn quán tính, parallax, blur, bóng đổ)
 *   html.motion-lite  — điện thoại / máy yếu / tiết kiệm dữ liệu: bỏ cuộn quán tính, parallax,
 *                       blur và filter; giữ fade/trượt ngắn
 *   html.motion-off   — người dùng bật "giảm chuyển động": không animation, không transition
 *
 * Tiêu chí lite: thiết bị cảm ứng / con trỏ thô, màn nhỏ (< 700 px cạnh ngắn), RAM < 4 GB,
 * ≤ 4 nhân CPU, Save-Data, hoặc mạng 2g/3g. Ngoài ra `watchFrameRate()` tự hạ từ full
 * xuống lite nếu đo được khung hình thực tế thấp trong vài giây đầu.
 */
export const MOTION_TIER_SCRIPT = `(function(){try{
var d=document.documentElement,n=navigator,m=window.matchMedia;
var off=m&&m("(prefers-reduced-motion: reduce)").matches;
var coarse=m&&m("(hover: none), (pointer: coarse), (any-pointer: coarse)").matches;
var touch=("ontouchstart" in window)||(n.maxTouchPoints||0)>0;
var mem=n.deviceMemory||8, cpu=n.hardwareConcurrency||8;
var c=n.connection||{}, slow=!!c.saveData||/(^|[^0-9])[23]g/.test(c.effectiveType||"");
var small=Math.min(screen.width,screen.height)<700;
var lite=coarse||touch||small||mem<4||cpu<=4||slow;
d.classList.add(off?"motion-off":lite?"motion-lite":"motion-full");
try{var k="solisst:intro-seen";if(sessionStorage.getItem(k)){d.classList.add("intro-seen","app-ready")}else{sessionStorage.setItem(k,"1")}}catch(e){}
}catch(e){document.documentElement.classList.add("motion-lite")}})();`;

/** Đọc tầng hiện tại ở phía client. */
export function motionTier(): "full" | "lite" | "off" {
  if (typeof document === "undefined") return "lite";
  const c = document.documentElement.classList;
  if (c.contains("motion-off")) return "off";
  if (c.contains("motion-full")) return "full";
  return "lite";
}

/**
 * Đo FPS thực tế trong ~2 giây đầu sau khi trang sẵn sàng. Nếu trung bình dưới 45 fps
 * (máy yếu, trình duyệt bật tiết kiệm pin, màn 60 Hz nhưng GPU quá tải), hạ từ full xuống lite.
 * Chỉ hạ một chiều, không nâng lại, để tránh nhấp nháy.
 */
export function watchFrameRate() {
  if (typeof window === "undefined" || motionTier() !== "full") return () => {};
  let frames = 0;
  let start = 0;
  let raf = 0;
  const tick = (t: number) => {
    if (!start) start = t;
    frames += 1;
    if (t - start >= 2000) {
      const fps = (frames * 1000) / (t - start);
      if (fps < 45) {
        const c = document.documentElement.classList;
        c.remove("motion-full");
        c.add("motion-lite", "motion-downgraded");
        window.dispatchEvent(new Event("motion-tier-change"));
      }
      return;
    }
    raf = requestAnimationFrame(tick);
  };
  const begin = () => { raf = requestAnimationFrame(tick); };
  if (document.readyState === "complete") window.setTimeout(begin, 800);
  else window.addEventListener("load", () => window.setTimeout(begin, 800), { once: true });
  return () => cancelAnimationFrame(raf);
}
