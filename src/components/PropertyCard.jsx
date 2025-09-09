// src/components/PropertyCard.jsx
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";

const FALLBACK =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='640' height='640'><rect width='100%' height='100%' fill='%23eee'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='sans-serif' font-size='18'>Sin imagen</text></svg>";

export default function PropertyCard({ p, data }) {
  const item = p || data || {};
  const id = item.id;

  const images = useMemo(() => {
    const arr = Array.isArray(item.images) ? item.images.filter(Boolean) : [];
    return arr.length ? arr : [FALLBACK];
  }, [item.images]);

  const [idx, setIdx] = useState(0);
  useEffect(() => { setIdx(0); }, [images.length]);

  const current = useMemo(
    () => images[Math.min(idx, images.length - 1)] || FALLBACK,
    [images, idx]
  );

  const next = (e) => {
    e?.preventDefault(); e?.stopPropagation();
    setIdx((i) => (i + 1) % images.length);
  };
  const prev = (e) => {
    e?.preventDefault(); e?.stopPropagation();
    setIdx((i) => (i - 1 + images.length) % images.length);
  };

  const title = item.title || "Propiedad";
  const city = item.city || "";
  const bedrooms = Number.isFinite(item.bedrooms) ? item.bedrooms : 0;
  const m2 =
    Number.isFinite(item.area_m2) ? item.area_m2 :
    Number.isFinite(item.m2) ? item.m2 : 0;
  const priceVal =
    Number.isFinite(item.priceUSD) ? item.priceUSD :
    Number.isFinite(item.price) ? item.price : null;
  const priceText = priceVal != null
    ? `USD ${Intl.NumberFormat("es-AR").format(priceVal)}`
    : "-";

  if (!id) return null;

  return (
    <article className="card">
      <div className="card-img-wrap">
        <img
          className="card-img"
          src={current}
          alt={title}
          loading="lazy"
          fetchPriority="low"
        />
        {images.length > 1 && (
          <>
            <button className="gallery-arrow left" onClick={prev} aria-label="Foto anterior">‹</button>
            <button className="gallery-arrow right" onClick={next} aria-label="Foto siguiente">›</button>
          </>
        )}
      </div>

      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="price">
          {city} • {bedrooms} dorm • 
        </p>
        <p className="price">{priceText}</p>
        <Link className="btn" to={`/propiedad/${id}`}>Ver detalle</Link>
      </div>
    </article>
  );
}




