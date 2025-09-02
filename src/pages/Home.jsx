// src/pages/Home.jsx
import { Link } from "react-router-dom";
import Featured from "../components/Featured.jsx";

export default function Home() {
  return (
    <section className="home">
      <section className="hero hero--fullbleed" aria-label="Hero">
        <img src="/fotohero.jpg" alt="" className="hero-img" />

        <div className="hero-overlay">
          <div className="container hero-panel">
            <h1 className="hero-title">Más de 15 años asesorando</h1>

            <nav className="hero-chips" aria-label="Acciones rápidas">
              {/* corregido: operation (no 'operacion') para que funcione con SearchBar */}
              <Link className="chip" to="/propiedades?operation=alquiler">Alquiler</Link>
              <Link className="chip" to="/propiedades?operation=venta">Venta</Link>
              <Link className="chip chip-cta" to="/contacto">Quiero vender</Link>
            </nav>
          </div>
        </div>
      </section>

      <div className="home-content">
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Últimos destacados</h2>
            </div>

            <Featured />
          </div>
        </section>
      </div>
    </section>
  );
}




