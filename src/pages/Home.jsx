import { useMemo } from "react";
import { PROPERTIES } from "../data/properties";
import PropertyCard from "../components/PropertyCard";

export default function Home() {
  const featured = useMemo(() => PROPERTIES.filter(p => p.featured), []);

  return (
    <div
      className="home"
      style={{
        backgroundImage: "url('/2_foto.png')"
      }}
    >
      {/* DESTACADOS */}
      {featured.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Destacados</h2>
            </div>

            <div className="grid">
              {featured.map(p => (
                <PropertyCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ejemplo de otra sección para ver el efecto */}
      <section className="section">
        <div className="container">
          <h2>Otra sección</h2>
          <p>Este contenido también pasa por encima de la foto de fondo.</p>
        </div>
      </section>
    </div>
  );
}


