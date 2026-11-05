const WEEKDAYS = [
  "Chủ nhật",
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
];

const pad = (n) => String(n).padStart(2, "0");

// Đổi °C sang °F rồi làm tròn, ghép ký hiệu đơn vị
export function formatTemp(celsius, unit) {
  const value = unit === "F" ? (celsius * 9) / 5 + 32 : celsius;
  return `${Math.round(value)}°${unit}`;
}

// "2026-11-05" -> { weekday: "Thứ năm", date: "05/11" }
export function formatDay(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const weekday = WEEKDAYS[new Date(y, m - 1, d).getDay()];
  return { weekday, date: `${pad(d)}/${pad(m)}` };
}

// "2026-11-05T14:30" -> "14:30 - 05/11/2026"
export function formatUpdateTime(timeStr) {
  const [date, time] = timeStr.split("T");
  const [y, m, d] = date.split("-");
  return `${time} - ${d}/${m}/${y}`;
}

// "2026-11-05T14:30" -> 14
export function getHour(timeStr) {
  return Number(timeStr.slice(11, 13));
}

// "Đà Lạt" -> "da lat" (phục vụ tìm kiếm không phân biệt dấu)
export function removeDiacritics(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}