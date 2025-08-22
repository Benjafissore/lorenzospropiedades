import { useSearchParams } from "react-router-dom";

export default function SearchBar() {
  const [params, setParams] = useSearchParams();

  const bedrooms  = params.get("bedrooms") || ""; // antes era q
  const city      = params.get("city") || "";
  const type      = params.get("type") || "";
  const operation = params.get("operation") || "";

  function update(key, value) {
    const next = new URLSearchParams(params);
    if (!value) next.delete(key); else next.set(key, value);
    setParams(next, { replace: true });
  }

  return (
    <div className="search">
      <select
        className="field field--beds"
        value={bedrooms}
        onChange={(e) => update("bedrooms", e.target.value)}
        aria-label="Dormitorios"
      >
        <option value="">Dormitorios</option>
        <option value="monoambiente">Monoambiente</option>
        <option value="1 dormitorio">1 dormitorio</option>
        <option value="2 dormitorios">2 dormitorios</option>
        <option value="3 dormitorios">3 dormitorios</option>
      </select>

      <select
        className="field"
        value={operation}
        onChange={(e) => update("operation", e.target.value)}
        aria-label="Operación"
      >
        <option value="">Venta o Alquiler</option>
        <option>Venta</option>
        <option>Alquiler</option>
      </select>

      <select
        className="field"
        value={type}
        onChange={(e) => update("type", e.target.value)}
        aria-label="Tipo"
      >
        <option value="">Tipo</option>
        <option>Casa</option>
        <option>Departamento</option>
        <option>Terreno</option>
        <option>Local</option>
      </select>

      <input
        className="field field--city"
        placeholder="Ciudad"
        value={city}
        onChange={(e) => update("city", e.target.value)}
        aria-label="Ciudad"
        autoComplete="off"
      />
    </div>
  );
}


