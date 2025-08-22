import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PROPERTIES } from "../data/properties.js";
import PropertyCard from "../components/PropertyCard.jsx";
import SearchBar from "../components/SearchBar.jsx";

export default function Listings() {
  const [params] = useSearchParams();

  const list = useMemo(() => {
    const q = (params.get("q") || "").toLowerCase();
    const city = (params.get("city") || "").toLowerCase();
    const type = params.get("type");
    const op = params.get("operation");
    const min = params.get("min") ? Number(params.get("min")) : undefined;
    const max = params.get("max") ? Number(params.get("max")) : undefined;

    return PROPERTIES.filter(p => {
      const matchesQ = q ? (p.title + " " + p.description).toLowerCase().includes(q) : true;
      const matchesCity = city ? p.city.toLowerCase().includes(city) : true;
      const matchesType = type ? p.type === type : true;
      const matchesOp = op ? p.operation === op : true;
      const matchesMin = min ? p.priceUSD >= min : true;
      const matchesMax = max ? p.priceUSD <= max : true;
      return matchesQ && matchesCity && matchesType && matchesOp && matchesMin && matchesMax;
    });
  }, [params]);

  return (
    <section className="listings">
      <div className="container">
        <h2 className="listing-text">Propiedades</h2>
        <SearchBar />
        <div className="grid">
          {list.map(p => <PropertyCard key={p.id} p={p} />)}
        </div>
        {list.length === 0 && (
          <p>No encontramos resultados. <Link to="/propiedades">Limpiar filtros</Link></p>
        )}
      </div>
    </section>
  );
}
