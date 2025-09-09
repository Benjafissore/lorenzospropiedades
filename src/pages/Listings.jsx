import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { db } from "../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import PropertyCard from "../components/PropertyCard.jsx";
import SearchBar from "../components/SearchBar.jsx";

// Normaliza strings: trim, minúsculas, sin acentos, sin puntos
function norm(s = "") {
  return String(s)
    .trim()
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[.]/g, "");
}

// Canonicaliza el tipo a una etiqueta fija (maneja plurales y sinónimos)
function normalizeType(s) {
  const n = norm(s);
  if (["departamento","departamentos","depto","depto","depto.","apto","apartment"].includes(n)) return "departamento";
  if (["casa","casas","house"].includes(n)) return "casa";
  if (["terreno","terrenos","lote","lotes","loteo","loteos"].includes(n)) return "terreno";
  if (["local","locales","comercial","negocio"].includes(n)) return "local";
  return n || ""; // fallback
}

export default function Listings() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const col = collection(db, "properties");
    const unsub = onSnapshot(
      col,
      (snap) => {
        const rows = snap.docs
          .map((d) => {
            const data = d.data() || {};
            const createdAt =
              typeof data.createdAt?.seconds === "number"
                ? data.createdAt.seconds
                : 0;
            return {
              id: d.id,
              title: data.title || "",
              description: data.description || "",
              city: data.city || "",
              type: data.type || "",
              operation: data.operation || "",
              bedrooms: Number.isFinite(data.bedrooms) ? data.bedrooms : 0,
              bathrooms: Number.isFinite(data.bathrooms) ? data.bathrooms : 0,
              m2: Number.isFinite(data.m2)
                ? data.m2
                : Number.isFinite(data.area_m2)
                ? data.area_m2
                : 0,
              images: Array.isArray(data.images) ? data.images : [],
              coverUrl:
                data.coverUrl ||
                (Array.isArray(data.images) && data.images[0]) ||
                "",
              priceUSD: Number.isFinite(data.priceUSD)
                ? data.priceUSD
                : Number.isFinite(data.price)
                ? data.price
                : null,
              createdAt,
            };
          })
          .sort((a, b) => b.createdAt - a.createdAt);

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

  // Mapear el parámetro de dormitorios
  function parseBedroomsParam(v) {
    switch (norm(v)) {
      case "monoambiente":   return { op: "eq", value: 0 };
      case "1 dormitorio":   return { op: "eq", value: 1 };
      case "2 dormitorios":  return { op: "eq", value: 2 };
      case "3 dormitorios":  return { op: "gte", value: 3 }; // 3 o más
      default:               return null;
    }
  }

  const list = useMemo(() => {
    const citySel = norm(params.get("city") || "");
    const typeSel = normalizeType(params.get("type") || "");
    const opSel   = norm(params.get("operation") || "");
    const bedsSel = parseBedroomsParam(params.get("bedrooms"));

    return items.filter((p) => {
      const matchesCity = citySel ? norm(p.city).includes(citySel) : true;

      const pType = normalizeType(p.type);
      const matchesType = typeSel ? pType === typeSel : true;

      const matchesOp = opSel ? norm(p.operation) === opSel : true;

      const pb = Number.isFinite(p.bedrooms) ? p.bedrooms : 0;
      const matchesBeds = bedsSel
        ? (bedsSel.op === "eq" ? pb === bedsSel.value : pb >= bedsSel.value)
        : true;

      return matchesCity && matchesType && matchesOp && matchesBeds;
    });
  }, [items, params.toString()]);

  function clearFilters() {
    setParams(new URLSearchParams(), { replace: true });
  }

  return (
    <section className="listings">
      <section className="contact-hero hero--fullbleed" aria-label="Hero">
       <img src="/fotohero.jpg" alt="" className="contact-hero-img" />
        
        <div className="contact-hero-overlay">
            <h2>PROPIEDADES</h2>
        </div>


       
      </section>
      <div className="container-listing">

        <SearchBar />

        {loading ? (
          <p style={{ padding: 16 }}>Cargando propiedades…</p>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "8px 0" }}>
              <small>{list.length} de {items.length} resultados</small>
              <button className="btn-clear" onClick={clearFilters}>
                <span className="x">✕</span> Limpiar filtros
              </button>
            </div>

            <div className="grid">
              {list.map((p) => (
                <PropertyCard key={p.id} p={p} />
              ))}
            </div>

            {list.length === 0 && (
              <p style={{ marginTop: 12 }}>
                No encontramos resultados.{" "}
                <button className="btn-link" onClick={clearFilters}>Limpiar filtros</button>
                {" "}o <Link to="/propiedades">volver</Link>
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}





