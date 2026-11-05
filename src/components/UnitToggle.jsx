export default function UnitToggle({ unit, onChange }) {
  return (
    <div className="unit-toggle" role="group" aria-label="Đơn vị nhiệt độ">
      <button
        type="button"
        className={unit === "C" ? "on" : ""}
        onClick={() => onChange("C")}
      >
        °C
      </button>
      <button
        type="button"
        className={unit === "F" ? "on" : ""}
        onClick={() => onChange("F")}
      >
        °F
      </button>
    </div>
  );
}