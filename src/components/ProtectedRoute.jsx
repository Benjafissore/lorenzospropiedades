// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (user === undefined) return <div>Cargando...</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  return children;
}
