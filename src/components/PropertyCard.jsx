import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function PropertyCard({ p }) {
  // Si hay p.images (array), lo usamos; si no, caemos a [p.img]
  const images = useMemo(() => {
    if (Array.isArray(p.images) && p.images.length) return p.images;
    return p.img ? [p.img] : [];
  }, [p.images, p.img]);

  const [idx, setIdx] = useState(0);
  const hasMany = images.length > 1;

  const prev = (e) => {
    e.preventDefault(); e.stopPropagation();
    setIdx((i) => (i - 1 + images.length) % images.length);
  };
  const next = (e) => {
    e.preventDefault(); e.stopPropagation();
    setIdx((i) => (i + 1) % images.length);
  };

  return (
    <article className="card">
      {/* Wrapper para posicionar flechas, NO cambia tus clases */}
      <div style={{ position: 'relative' }}>
        <img src={images[idx]} alt={p.title} className="card-img" />
        {hasMany && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Foto anterior"
              style={{
                position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)',
                width: 34, height: 34, borderRadius: '999px', border: 0,
                background: 'rgba(17,17,17,.55)', color: '#fff', cursor: 'pointer'
              }}
            >◀</button>
            <button
              type="button"
              onClick={next}
              aria-label="Foto siguiente"
              style={{
                position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)',
                width: 34, height: 34, borderRadius: '999px', border: 0,
                background: 'rgba(17,17,17,.55)', color: '#fff', cursor: 'pointer'
              }}
            >▶</button>
          </>
        )}
      </div>

      <div className="card-body">
        <h3 className="card-title">{p.title}</h3>
        <p className="muted">{p.city}, {p.province}</p>
        <p className="price">{p.operation} · USD {p.priceUSD.toLocaleString()}</p>
        <ul className="tags">
          {p.rooms > 0 && <li>{p.rooms} amb</li>}
          {p.baths > 0 && <li>{p.baths} baños</li>}
          {p.parking && <li>Cochera</li>}
        </ul>
        <Link to={`/propiedad/${p.id}`} className="btn">Ver detalle</Link>
      </div>
    </article>
  );
}


