import { Routes, Route, Link } from "react-router-dom";

// Páginas públicas
import Home from "./pages/Home.jsx";
import Listings from "./pages/Listings.jsx";
import PropertyDetail from "./pages/PropertyDetail.jsx";
import Contact from "./pages/Contact.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

// 🔐 Paso 5: Auth + rutas protegidas
import AuthProvider from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Admin
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

export default function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Header />
        <main>
          <Routes>
            {/* Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/propiedades" element={<Listings />} />
            <Route path="/propiedad/:id" element={<PropertyDetail />} />
            <Route path="/contacto" element={<Contact />} />

            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={
                <div>
                  <h2>Página no encontrada</h2>
                  <Link to="/">Volver al inicio</Link>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}


