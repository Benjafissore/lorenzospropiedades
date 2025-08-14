import { Link } from 'react-router-dom'

export default function PropertyCard({ p }) {
  return (
    <article className="card">
      <img src={p.img} alt={p.title} className="card-img" />
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
  )
}