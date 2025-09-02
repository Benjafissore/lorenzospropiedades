// src/pages/admin/AdminDashboard.jsx
import { useAuth } from "../../context/AuthContext";
import PropertyForm from "./PropertyForm.jsx";
import PropertyList from "./PropertyList.jsx";

export default function AdminDashboard() {
  const { logout } = useAuth();

  return (
    <div className="admin-wrap">
      <header className="card admin-header">
        <div>
          <h2 className="admin-title">Panel de Propiedades</h2>
          <p className="admin-sub">Carga, edita y destaca propiedades</p>
        </div>
        <button className="btn" onClick={logout}>Salir</button>
      </header>

      <PropertyForm />
      <PropertyList />
    </div>
  );
}

