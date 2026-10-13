/**
 * GOOGLE APPS SCRIPT — nhận đơn từ website, ghi vào Google Sheet và gửi Gmail.
 *
 * CÀI ĐẶT (5 phút):
 *  1. Tạo Google Sheet mới, đặt tên tab đầu tiên là "Orders".
 *  2. Menu Extensions → Apps Script, dán toàn bộ file này vào, sửa 2 hằng số bên dưới.
 *  3. Deploy → New deployment → Type: Web app
 *       Execute as: Me  |  Who has access: Anyone
 *     Bấm Deploy, copy URL dạng https://script.google.com/macros/s/.../exec
 *  4. Trong dự án Next.js, tạo .env.local:
 *       ORDER_WEBHOOK_URL=<URL vừa copy>
 *       ORDER_WEBHOOK_SECRET=<giống SECRET bên dưới>
 */

const NOTIFY_EMAIL = "thay-bang-email-cua-shop@gmail.com";
const SECRET = "doi-chuoi-nay"; // phải trùng ORDER_WEBHOOK_SECRET

const HEADERS = [
  "Thời gian", "Sản phẩm", "Số lượng", "Màu", "Size", "Thành tiền", "Thanh toán",
  "Họ tên", "SĐT", "Địa chỉ", "Ghi chú", "Nguồn", "Thiết bị",
];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    if (SECRET && payload.secret !== SECRET) {
      return json_({ ok: false, error: "unauthorized" });
    }
    const o = payload.order;
    const sheet = getSheet_();
    sheet.appendRow([
      new Date(o.createdAt), o.product, o.qty, o.color, o.size, o.total, o.payment || "",
      o.name, "'" + o.phone, o.address, o.note, o.source, o.userAgent,
    ]);
    notify_(o);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Orders");
  if (!sheet) sheet = ss.insertSheet("Orders");
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function notify_(o) {
  const subject = "[SOLISST] Đơn mới: " + o.name + " – " + o.qty + " x " + o.color + "/" + o.size;
  const body = [
    "Sản phẩm: " + o.product,
    "Số lượng: " + o.qty + "  |  Màu: " + o.color + "  |  Size: " + o.size,
    "Thành tiền: " + Number(o.total).toLocaleString("vi-VN") + " đ",
    "Thanh toán: " + (o.payment || "Thanh toán khi nhận hàng"),
    "",
    "Khách: " + o.name,
    "SĐT: " + o.phone,
    "Địa chỉ: " + o.address,
    "Ghi chú: " + (o.note || "—"),
    "",
    "Thời gian: " + o.createdAt,
  ].join("\n");
  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
