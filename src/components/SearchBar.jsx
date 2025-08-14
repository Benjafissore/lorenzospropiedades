import { useSearchParams } from "react-router-dom";

export default function SearchBar() {
  const [params, setParams] = useSearchParams();

  const q = params.get("q") || "";
  const city = params.get("city") || "";
  const type = params.get("type") || "";
  const operation = params.get("operation") || "";
  const min = params.get("min") || "";
  const max = params.get("max") || "";

  function update(key, value) {
    const next = new URLSearchParams(params);
    if (!value) next.delete(key); else next.set(key, value);
    setParams(next, { replace: true });
  }

  return (
    <div className="search">
      <input
        placeholder="Buscar (ej: 2 ambientes, quincho)"
        value={q}
        onChange={(e) => update("q", e.target.value)}
      />
      <select value={operation} onChange={(e) => update("operation", e.target.value)}>
        <option value="">Venta o Alquiler</option>
        <option>Venta</option>
        <option>Alquiler</option>
      </select>
      <select value={type} onChange={(e) => update("type", e.target.value)}>
        <option value="">Tipo</option>
        <option>Casa</option>
        <option>Departamento</option>
        <option>Terreno</option>
        <option>Local</option>
      </select>
      <input
        type="number"
        placeholder="Mín USD"
        value={min}
        onChange={(e) => update("min", e.target.value)}
      />
      <input
        type="number"
        placeholder="Máx USD"
        value={max}
        onChange={(e) => update("max", e.target.value)}
      />
      <input
        placeholder="Ciudad"
        value={city}
        onChange={(e) => update("city", e.target.value)}
      />
    </div>
  );
}

