const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeather(city, signal) {
  const params = new URLSearchParams({
    latitude: city.lat,
    longitude: city.lon,
    current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "Asia/Bangkok",
  });

  const res = await fetch(`${BASE_URL}?${params.toString()}`, { signal });
  if (!res.ok) {
    throw new Error(`Máy chủ trả về lỗi ${res.status}`);
  }

  const json = await res.json();
  const { current, daily } = json;

  if (!current || !daily) {
    throw new Error("Dữ liệu trả về không hợp lệ");
  }

  return {
    current: {
      temperature: current.temperature_2m,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      code: current.weather_code,
      time: current.time,
    },
    daily: daily.time.map((date, i) => ({
      date,
      code: daily.weather_code[i],
      max: daily.temperature_2m_max[i],
      min: daily.temperature_2m_min[i],
    })),
  };
}