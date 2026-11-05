export default function CityList({
  cities,
  selectedId,
  favorites,
  onSelect,
  onToggleFavorite,
}) {
  if (cities.length === 0) {
    return <p className="muted">Không tìm thấy thành phố phù hợp.</p>;
  }

  return (
    <ul className="city-list">
      {cities.map((city) => {
        const active = city.id === selectedId;
        const isFav = favorites.includes(city.id);
        return (
          <li key={city.id} className={"city-item" + (active ? " active" : "")}>
            <button
              type="button"
              className="city-name"
              aria-pressed={active}
              onClick={() => onSelect(city.id)}
            >
              {city.name}
            </button>
            <button
              type="button"
              className={"fav-btn" + (isFav ? " on" : "")}
              aria-label={
                isFav
                  ? `Bỏ yêu thích ${city.name}`
                  : `Thêm ${city.name} vào yêu thích`
              }
              onClick={() => onToggleFavorite(city.id)}
            >
              {isFav ? "★" : "☆"}
            </button>
          </li>
        );
      })}
    </ul>
  );
}