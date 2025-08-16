import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Listings from "./pages/Listings.jsx";
import PropertyDetail from "./pages/PropertyDetail.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/propiedades" element={<Listings />} />
          <Route path="/propiedad/:id" element={<PropertyDetail />} />
          {/* Ruta de respaldo por si entras a algo raro */}
          <Route path="*" element={
            <div>
              <h2>Página no encontrada</h2>
              <Link to="/">Volver al inicio</Link>
            </div>
          }/>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

