import { getWeatherInfo } from "../utils/weatherCode";
import { formatTemp, formatUpdateTime } from "../utils/format";

export default function CurrentWeather({ city, current, unit }) {
  const info = getWeatherInfo(current.code);

  return (
    <section className="card current">
      <h2>{city.name}</h2>
      <div className="current-main">
        <span className="big-icon" aria-hidden="true">
          {info.icon}
        </span>
        <div>
          <div className="temp">{formatTemp(current.temperature, unit)}</div>
          <div className="desc">{info.label}</div>
        </div>
      </div>
      <dl className="current-details">
        <div>
          <dt>Độ ẩm</dt>
          <dd>{current.humidity}%</dd>
        </div>
        <div>
          <dt>Tốc độ gió</dt>
          <dd>{current.windSpeed} km/h</dd>
        </div>
        <div>
          <dt>Cập nhật lúc</dt>
          <dd>{formatUpdateTime(current.time)}</dd>
        </div>
      </dl>
    </section>
  );
}