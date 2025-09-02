// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = cargando, null = deslogueado

  useEffect(() =>
    onAuthStateChanged(auth, (u) => setUser(u ?? null))
  , []);

  const logout = () => signOut(auth);

  return (
    <AuthCtx.Provider value={{ user, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
