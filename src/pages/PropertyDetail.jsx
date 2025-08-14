import { useParams, Link } from "react-router-dom";
import { PROPERTIES } from "../data/properties.js";

export default function PropertyDetail() {
  const { id } = useParams();
  const p = PROPERTIES.find(x => x.id === id);
  if (!p) return <div className="container"><p>Propiedad no encontrada.</p></div>;

  function mailto() {
    const subject = encodeURIComponent(`Consulta por ${p.title} (${p.id})`);
    const body = encodeURIComponent(`Hola, estoy interesado/a en ${p.title} ubicado en ${p.address}, ${p.city}. ¿Sigue disponible?`);
    return `mailto:tuemail@tuinmobiliaria.com?subject=${subject}&body=${body}`;
  }

  return (
    <section className="detail container">
      <Link to="/propiedades" className="back">← Volver</Link>
      <div className="detail-layout">
        <img src={p.img} alt={p.title} className="detail-img" />
        <div className="detail-info">
          <h1>{p.title}</h1>
          <p className="muted">{p.address}, {p.city}</p>
          <p className="price">{p.operation} · USD {p.priceUSD.toLocaleString()}</p>
          <ul className="tags">
            {p.areaM2 > 0 && <li>{p.areaM2} m²</li>}
            {p.rooms > 0 && <li>{p.rooms} amb</li>}
            {p.baths > 0 && <li>{p.baths} baños</li>}
            {p.parking && <li>Cochera</li>}
          </ul>
          <p>{p.description}</p>
          <a className="btn btn-lg" href={mailto()}>Contactar</a>
        </div>
      </div>
    </section>
  );
}

