import { useEffect, useMemo, useState } from "react";
import { CITIES } from "./data/cities";
import { fetchWeather } from "./api/weather";
import { removeDiacritics, getHour } from "./utils/format";
import { getTheme } from "./utils/weatherCode";
import CityList from "./components/CityList";
import UnitToggle from "./components/UnitToggle";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import "./App.css";

const FAV_KEY = "weather:favorites";

function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [data, setData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [reloadKey, setReloadKey] = useState(0); // tăng lên để "Thử lại"
  const [unit, setUnit] = useState("C");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(loadFavorites);

  const selectedCity = CITIES.find((c) => c.id === selectedId) || null;

  // Gọi API khi đổi thành phố hoặc bấm Thử lại (đổi unit thì KHÔNG chạy lại)
  useEffect(() => {
    if (!selectedCity) return;

    const controller = new AbortController();
    setStatus("loading");
    setErrorMsg("");

    fetchWeather(selectedCity, controller.signal)
      .then((result) => {
        setData(result);
        setStatus("success");
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // bị hủy do chọn thành phố khác
        setErrorMsg(err.message || "Không thể tải dữ liệu thời tiết");
        setStatus("error");
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, reloadKey]);

  // Lưu yêu thích vào localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
    } catch {
      /* bỏ qua nếu trình duyệt chặn localStorage */
    }
  }, [favorites]);

  // Lọc thành phố theo từ khóa, không phân biệt dấu
  const visibleCities = useMemo(() => {
    const keyword = removeDiacritics(search.trim());
    return CITIES.filter((c) => removeDiacritics(c.name).includes(keyword));
  }, [search]);

  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  const theme =
    status === "success" && data
      ? getTheme(data.current.code, getHour(data.current.time))
      : "idle";

  return (
    <div className={`app theme-${theme}`}>
      <header className="header">
        <h1>Thời tiết Việt Nam</h1>
        <UnitToggle unit={unit} onChange={setUnit} />
      </header>

      <main className="layout">
        <aside className="card sidebar">
          <h3>Thành phố</h3>
          <input
            type="search"
            className="search"
            placeholder="Tìm thành phố (vd: da lat)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <CityList
            cities={visibleCities}
            selectedId={selectedId}
            favorites={favorites}
            onSelect={setSelectedId}
            onToggleFavorite={toggleFavorite}
          />
        </aside>

        <div className="content">
          {status === "idle" && (
            <p className="card state">
              Hãy chọn một thành phố để xem thời tiết.
            </p>
          )}

          {status === "loading" && (
            <p className="card state">Đang tải dữ liệu thời tiết...</p>
          )}

          {status === "error" && (
            <div className="card state error">
              <p>Đã xảy ra lỗi: {errorMsg}</p>
              <button type="button" onClick={() => setReloadKey((k) => k + 1)}>
                Thử lại
              </button>
            </div>
          )}

          {status === "success" && data && (
            <>
              <CurrentWeather
                city={selectedCity}
                current={data.current}
                unit={unit}
              />
              <Forecast days={data.daily} unit={unit} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}