const WEATHER_CODES = {
  0: { label: "Trời quang", icon: "☀️" },
  1: { label: "Gần như quang đãng", icon: "🌤️" },
  2: { label: "Có mây rải rác", icon: "⛅" },
  3: { label: "Nhiều mây", icon: "☁️" },
  45: { label: "Sương mù", icon: "🌫️" },
  48: { label: "Sương mù đóng băng", icon: "🌫️" },
  51: { label: "Mưa phùn nhẹ", icon: "🌦️" },
  53: { label: "Mưa phùn vừa", icon: "🌦️" },
  55: { label: "Mưa phùn dày", icon: "🌦️" },
  56: { label: "Mưa phùn lạnh nhẹ", icon: "🌧️" },
  57: { label: "Mưa phùn lạnh dày", icon: "🌧️" },
  61: { label: "Mưa nhẹ", icon: "🌧️" },
  63: { label: "Mưa vừa", icon: "🌧️" },
  65: { label: "Mưa to", icon: "🌧️" },
  66: { label: "Mưa lạnh nhẹ", icon: "🌧️" },
  67: { label: "Mưa lạnh to", icon: "🌧️" },
  71: { label: "Tuyết nhẹ", icon: "🌨️" },
  73: { label: "Tuyết vừa", icon: "🌨️" },
  75: { label: "Tuyết dày", icon: "❄️" },
  77: { label: "Hạt tuyết", icon: "❄️" },
  80: { label: "Mưa rào nhẹ", icon: "🌦️" },
  81: { label: "Mưa rào vừa", icon: "🌧️" },
  82: { label: "Mưa rào rất to", icon: "⛈️" },
  85: { label: "Mưa tuyết nhẹ", icon: "🌨️" },
  86: { label: "Mưa tuyết to", icon: "🌨️" },
  95: { label: "Dông", icon: "⛈️" },
  96: { label: "Dông kèm mưa đá nhẹ", icon: "⛈️" },
  99: { label: "Dông kèm mưa đá to", icon: "⛈️" },
};

export function getWeatherInfo(code) {
  return WEATHER_CODES[code] || { label: "Không xác định", icon: "❓" };
}

const RAIN_CODES = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99];

// Trả về tên theme: "night" | "rain" | "day"
export function getTheme(code, hour) {
  if (hour < 6 || hour >= 18) return "night";
  if (RAIN_CODES.includes(code)) return "rain";
  return "day";
}