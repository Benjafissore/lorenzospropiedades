import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      navigate("/admin");
    } catch (e) {
      setErr(e.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="card auth-card">
        <h2 className="auth-title">Acceso / Admin</h2>

        <label className="field">
          <span>Email</span>
          <input
            placeholder="tu@email.com"
            type="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="field">
          <span>Contraseña</span>
          <input
            placeholder="••••••••"
            type="password"
            autoComplete="current-password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            required
          />
        </label>

        <button className="btn" disabled={loading}>
          {loading ? "Ingresando…" : "Ingresar"}
        </button>

        {err && <p className="auth-error">{err}</p>}
      </form>
    </div>
  );
}

