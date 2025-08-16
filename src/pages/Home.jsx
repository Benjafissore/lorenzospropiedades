import { useMemo } from "react";
import { PROPERTIES } from "../data/properties";
import PropertyCard from "../components/PropertyCard";

export default function Home() {
  const featured = useMemo(() => PROPERTIES.filter(p => p.featured), []);

  return (

    <section className="home">
      <section className="hero hero--fullbleed" aria-label="Hero">
       <img src="/fotohero.jpg" alt="" className="hero-img" />
       {/* Si querés texto encima:
         <div className="hero-overlay">
         <h1>Tu título</h1>
         <p>Subtítulo</p>
       </div> */}
      </section>
      {/* Foto a la izquierda (no afecta el layout) */}
      
      <div className="home-content">
        {featured.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section-header">
                <h2>Destacados</h2>
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



