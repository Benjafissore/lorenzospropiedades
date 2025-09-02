// src/pages/admin/AdminLogin.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      navigate("/admin");
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 380 }}>
      <h2>Acceso / Admin</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Contraseña" type="password" value={pass} onChange={e=>setPass(e.target.value)} />
      <button>Ingresar</button>
      {err && <p style={{ color: "tomato" }}>{err}</p>}
    </form>
  );
}
