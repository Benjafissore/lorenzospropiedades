import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          <img
            src="/4_logo.png"
            alt="Inmobiliaria Simple"
            className="brand-logo"
            fetchpriority="high"
            decoding="async"
          />
          <img
            src="/5_logo.png"
            alt="Inmobiliaria Simple"
            className="brand-logo-text"
            fetchpriority="high"
            decoding="async"
          />
          
        </Link>
        

        <nav className="nav">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/propiedades">Propiedades</NavLink>
          <NavLink to="/contacto">Contacto</NavLink> 
        </nav>
      </div>
    </header>
  );
}
