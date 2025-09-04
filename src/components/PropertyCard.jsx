// src/components/PropertyCard.jsx
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const FALLBACK =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='640' height='640'><rect width='100%' height='100%' fill='%23eee'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='sans-serif' font-size='18'>Sin imagen</text></svg>";

export default function PropertyCard({ p }) {
  const imgs = Array.isArray(p.images) && p.images.length ? p.images : [FALLBACK];
  const [idx, setIdx] = useState(0);
  const current = useMemo(() => imgs[Math.min(idx, imgs.length - 1)] || FALLBACK, [imgs, idx]);

  const next = (e) => { e?.preventDefault(); e?.stopPropagation(); setIdx(i => (i + 1) % imgs.length); };
  const prev = (e) => { e?.preventDefault(); e?.stopPropagation(); setIdx(i => (i - 1 + imgs.length) % imgs.length); };

  return (
    <article className="card">
      <div className="card-img-wrap">
        <img className="card-img" src={current} alt={p.title} loading="lazy" fetchPriority="low" />
        {imgs.length > 1 && (
          <>
            <button className="gallery-arrow left"  onClick={prev} aria-label="Foto anterior">‹</button>
            <button className="gallery-arrow right" onClick={next} aria-label="Foto siguiente">›</button>
          </>
        )}
      </div>

      <div className="card-body">
        <h3 className="card-title">{p.title}</h3>
        <p className="price">
          {p.city} • {p.bedrooms ?? 0} dorm • {p.area_m2 ?? 0} m²
        </p>
        <p className="price">
          {p.priceUSD ? `USD ${Intl.NumberFormat("es-AR").format(p.priceUSD)}` : "-"}
        </p>
        <Link className="btn" to={`/propiedad/${p.id}`}>Ver detalle</Link>
      </div>
    </article>
  );
}



