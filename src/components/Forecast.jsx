import { getWeatherInfo } from "../utils/weatherCode";
import { formatDay, formatTemp } from "../utils/format";

export default function Forecast({ days, unit }) {
  return (
    <section className="card">
      <h3>Dự báo 7 ngày</h3>
      <ul className="forecast">
        {days.map((day) => {
          const info = getWeatherInfo(day.code);
          const { weekday, date } = formatDay(day.date);
          return (
            <li key={day.date} className="forecast-item">
              <div className="f-day">
                <strong>{weekday}</strong>
                <span className="muted">{date}</span>
              </div>
              <span className="f-icon" title={info.label}>
                {info.icon}
              </span>
              <div className="f-temp">
                <span className="max">{formatTemp(day.max, unit)}</span>
                <span className="min">{formatTemp(day.min, unit)}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}