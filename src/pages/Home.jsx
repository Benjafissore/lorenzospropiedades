import { useMemo } from "react";
import { PROPERTIES } from "../data/properties";
import PropertyCard from "../components/PropertyCard";
import { Link } from "react-router-dom";

export default function Home() {
  const featured = useMemo(() => PROPERTIES.filter(p => p.featured), []);

  return (

    <section className="home">
      <section className="hero hero--fullbleed" aria-label="Hero">
       <img src="/fotohero.jpg" alt="" className="hero-img" />

        <div className="hero-overlay">
          <div className="container hero-panel">
            <h1 className="hero-title">Más de 15 años asesorando</h1>

            <nav className="hero-chips" aria-label="Acciones rápidas">
              <Link className="chip" to="/propiedades?operacion=alquiler">Alquiler</Link>
              <Link className="chip" to="/propiedades?operacion=venta">Venta</Link>
              <Link className="chip chip-cta" to="/contacto">Quiero vender</Link>
            </nav>
          </div>
        </div>
       
      </section>
      {/* Foto a la izquierda (no afecta el layout) */}
      
      <div className="home-content">
        {featured.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section-header">
                <h2>Ultimos destacados</h2>
              </div>

              <div className="grid">
                {featured.map(p => (<PropertyCard key={p.id} p={p} />))}
              </div>
            </div>
          </section>
        )}
      </div>
    </section>
  );
}



