/**
 * Phân tầng chuyển động theo thiết bị, chạy càng sớm càng tốt (inline trong <head>)
 * để tránh chớp hiệu ứng rồi mới tắt.
 *
 *   html.motion-full  — máy đủ mạnh, chuột: đầy đủ (cuộn quán tính, parallax, blur, bóng đổ)
 *   html.motion-lite  — điện thoại / máy yếu / tiết kiệm dữ liệu: bỏ cuộn quán tính, parallax,
 *                       blur và filter; giữ fade/trượt ngắn
 *   html.motion-off   — người dùng bật "giảm chuyển động": không animation, không transition
 *
 * Tiêu chí lite: con trỏ thô (cảm ứng), RAM < 4 GB, ≤ 4 nhân CPU, Save-Data, hoặc mạng 2g/3g.
 */
export const MOTION_TIER_SCRIPT = `(function(){try{
var d=document.documentElement,n=navigator,m=window.matchMedia;
var off=m&&m("(prefers-reduced-motion: reduce)").matches;
var coarse=m&&m("(hover: none), (pointer: coarse)").matches;
var mem=n.deviceMemory||8, cpu=n.hardwareConcurrency||8;
var c=n.connection||{}, slow=!!c.saveData||/(^|[^0-9])[23]g/.test(c.effectiveType||"");
var lite=coarse||mem<4||cpu<=4||slow;
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
