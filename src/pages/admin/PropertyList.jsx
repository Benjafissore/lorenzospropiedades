// src/pages/admin/PropertyList.jsx
import { useEffect, useState } from "react";
import { db, storage } from "../../lib/firebase";
import { collection, onSnapshot, orderBy, query, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { ref, listAll, deleteObject } from "firebase/storage";

export default function PropertyList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
    return onSnapshot(q, snap => {
      setData(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const toggleFeatured = (p) =>
    updateDoc(doc(db, "properties", p.id), { featured: !p.featured });

  async function removeProperty(p) {
    if (!confirm("¿Eliminar la propiedad y sus imágenes?")) return;
    await deleteDoc(doc(db, "properties", p.id));
    const folderRef = ref(storage, `properties/${p.id}`);
    try {
      const res = await listAll(folderRef);
      await Promise.all(res.items.map(itemRef => deleteObject(itemRef)));
    } catch {}
  }

  return (
    <div className="card admin-card">
      <div className="admin-card-header">
        <h3 className="admin-card-title">Propiedades cargadas</h3>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Ciudad</th>
              <th>Precio</th>
              <th>Destacada</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map(p => (
              <tr key={p.id}>
                <td className="cell-ellipsis" title={p.title}>{p.title}</td>
                <td>{p.city}</td>
                <td>{p.price ?? "-"}</td>
                <td>{p.featured ? "Sí" : "No"}</td>
                <td>
                  <div className="row-actions">
                    <button className="btn" onClick={()=>toggleFeatured(p)}>
                      {p.featured ? "Quitar dest." : "Destacar"}
                    </button>
                    <button className="btn danger" onClick={()=>removeProperty(p)}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={5} style={{textAlign:"center", color:"rgba(0,0,0,.55)"}}>
                  Sin propiedades
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

