import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { db } from "../lib/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import PropertyCard from "../components/PropertyCard.jsx";
import SearchBar from "../components/SearchBar.jsx";

export default function Listings() {
  const [params] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Traer propiedades desde Firestore (en vivo)
  useEffect(() => {
    const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const rows = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            ...data,
            // compat con tu card/buscador si antes usabas priceUSD
            priceUSD: data.price ?? data.priceUSD ?? 0,
            images: Array.isArray(data.images) ? data.images : [],
          };
        });
        setItems(rows);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore error:", err);
        setLoading(false);
      }
    );
    return unsub;
  }, []);

  // Filtros (igual que tu versión anterior)
  const list = useMemo(() => {
    const q = (params.get("q") || "").toLowerCase();
    const city = (params.get("city") || "").toLowerCase();
    const type = params.get("type");
    const op = params.get("operation");
    const min = params.get("min") ? Number(params.get("min")) : undefined;
    const max = params.get("max") ? Number(params.get("max")) : undefined;

    return items.filter((p) => {
      const price = typeof p.priceUSD === "number" ? p.priceUSD : 0;
      const matchesQ = q ? ((p.title || "") + " " + (p.description || "")).toLowerCase().includes(q) : true;
      const matchesCity = city ? (p.city || "").toLowerCase().includes(city) : true;
      const matchesType = type ? p.type === type : true;
      const matchesOp = op ? p.operation === op : true;
      const matchesMin = min !== undefined ? price >= min : true;
      const matchesMax = max !== undefined ? price <= max : true;
      return matchesQ && matchesCity && matchesType && matchesOp && matchesMin && matchesMax;
    });
  }, [params, items]);

  return (
    <section className="listings">
      <div className="container">
        <h2 className="listing-text">Propiedades</h2>
        <SearchBar />

        {loading ? (
          <p style={{ padding: 16 }}>Cargando propiedades…</p>
        ) : (
          <>
            <div className="grid">
              {list.map((p) => <PropertyCard key={p.id} p={p} />)}
            </div>

            {list.length === 0 && (
              <p style={{ marginTop: 12 }}>
                No encontramos resultados. <Link to="/propiedades">Limpiar filtros</Link>
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

