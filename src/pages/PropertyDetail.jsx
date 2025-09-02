import { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const FALLBACK =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='1600'><rect width='100%' height='100%' fill='%23eee'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='sans-serif' font-size='18'>Sin imagen</text></svg>";

export default function PropertyDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const [idx, setIdx] = useState(0);
  // 🔸 Modo por defecto: "portrait" (vertical 3:4 y tamaño contenido)
  const [mode, setMode] = useState("portrait"); // "portrait" | "fit" | "square"

  useEffect(() => {
    if (!id) return;
    const ref = doc(db, "properties", id);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          const imgs = Array.isArray(data.images) ? data.images.filter(Boolean) : [];
          setP({
            id: snap.id,
            ...data,
            images: imgs.length ? imgs : [FALLBACK],
            priceUSD: data.price ?? data.priceUSD ?? 0,
          });
          setIdx(0);
        } else {
          setP(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );
    return unsub;
  }, [id]);

  // Navegación con teclado
  useEffect(() => {
    function onKey(e) {
      if (!p?.images?.length || e.altKey || e.metaKey || e.ctrlKey) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [p, idx]);

  const imgs = p?.images || [FALLBACK];
  const total = imgs.length;
  const current = useMemo(() => imgs[Math.min(idx, imgs.length - 1)] || FALLBACK, [imgs, idx]);

  function next() { setIdx(i => (i + 1) % total); }
  function prev() { setIdx(i => (i - 1 + total) % total); }

  if (loading) return <div style={{ padding: 16 }}>Cargando propiedad…</div>;

  if (!p) {
    return (
      <div className="container" style={{ padding: 16 }}>
        <h2 style={{ marginTop: 0 }}>No encontramos esta propiedad</h2>
        <Link className="btn" to="/propiedades">Volver al listado</Link>
      </div>
    );
  }

  return (
    <section className="container" style={{ padding: 16 }}>
      <Link className="btn" to="/propiedades">← Volver</Link>

      <article className="card" style={{ marginTop: 12 }}>
        {/* Galería */}
        <div className="gallery">
          <div className={`gallery-main ${mode}`}>
            <img src={current} alt={p.title} loading="eager" fetchPriority="high" />
            {total > 1 && (
              <>
                <button className="gallery-arrow left btn" onClick={prev} aria-label="Foto anterior">‹</button>
                <button className="gallery-arrow right btn" onClick={next} aria-label="Foto siguiente">›</button>
              </>
            )}
          </div>

          {total > 1 && (
            <div className="thumbs-row centered">
              {imgs.map((url, i) => (
                <button
                  key={url + i}
                  className={`thumb-btn ${i === idx ? "active" : ""}`}
                  onClick={() => setIdx(i)}
                  aria-label={`Ver foto ${i + 1}`}
                >
                  <img src={url} alt="" loading="lazy" fetchPriority="low" />
                </button>
              ))}
            </div>
          )}

          <div className="gallery-tools">
            <span className="count">{idx + 1}/{total}</span>
            <div className="mode">
              <button className={`btn ${mode === "portrait" ? "primary" : ""}`} onClick={() => setMode("portrait")}>Vertical</button>
              <button className={`btn ${mode === "fit" ? "primary" : ""}`} onClick={() => setMode("fit")}>Original</button>
              <button className={`btn ${mode === "square" ? "primary" : ""}`} onClick={() => setMode("square")}>Cuadrado</button>
            </div>
          </div>
        </div>

        {/* Detalle */}
        <div className="card-body">
          <h1 className="card-title" style={{ marginTop: 0 }}>{p.title}</h1>
          <p className="price" style={{ marginTop: 4 }}>
            {p.city} {p.address ? `• ${p.address}` : ""} • {p.bedrooms ?? 0} dorm • {p.bathrooms ?? 0} baños • {p.area_m2 ?? 0} m²
          </p>
          <p className="price" style={{ fontSize: 18, marginTop: 8, fontWeight: 600 }}>
            {p.priceUSD ? `USD ${Intl.NumberFormat("es-AR").format(p.priceUSD)}` : "-"}
          </p>
          {p.description && (
            <p style={{ marginTop: 12, color: "rgba(0,0,0,.75)", lineHeight: 1.5 }}>
              {p.description}
            </p>
          )}
        </div>
      </article>
    </section>
  );
}




