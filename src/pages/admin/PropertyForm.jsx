// src/pages/admin/PropertyForm.jsx
import { useMemo, useState } from "react";
import { db, storage } from "../../lib/firebase";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function slugify(text) {
  return text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

export default function PropertyForm() {
  const [form, setForm] = useState({
    title: "", description: "", price: "", address: "", city: "",
    bedrooms: 1, bathrooms: 1, area_m2: "", operation: "venta",
    type: "depto", featured: false
  });
  const [files, setFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const previews = useMemo(
    () => files.map(f => ({ name: f.name, url: URL.createObjectURL(f) })),
    [files]
  );

  const update = (k, v) => setForm(s => ({ ...s, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true); setMsg("");
    try {
      const col = collection(db, "properties");
      const newDocRef = doc(col);
      const folder = `properties/${newDocRef.id}`;

      // Subo imágenes
      const urls = [];
      for (const file of files) {
        const fileRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        urls.push(url);
      }

      const payload = {
        ...form,
        price: Number(form.price || 0),
        area_m2: Number(form.area_m2 || 0),
        bedrooms: Number(form.bedrooms || 0),
        bathrooms: Number(form.bathrooms || 0),
        images: urls,
        slug: slugify(form.title),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(newDocRef, payload);
      setMsg("✅ Propiedad creada");

      setForm({
        title:"", description:"", price:"", address:"", city:"",
        bedrooms:1, bathrooms:1, area_m2:"", operation:"venta",
        type:"depto", featured:false
      });
      setFiles([]);
    } catch (err) {
      setMsg("⚠️ " + err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card admin-card">
      <div className="admin-card-header">
        <h3 className="admin-card-title">Nueva propiedad</h3>
        <button className="btn primary" disabled={saving}>
          {saving ? "Guardando..." : "Guardar propiedad"}
        </button>
      </div>

      <div className="form-grid">
        <input className="input" placeholder="Título" value={form.title} onChange={e=>update("title", e.target.value)} required />
        <input className="input" placeholder="Precio (USD/ARS)" value={form.price} onChange={e=>update("price", e.target.value)} />
        <input className="input" placeholder="Dirección" value={form.address} onChange={e=>update("address", e.target.value)} />
        <input className="input" placeholder="Ciudad" value={form.city} onChange={e=>update("city", e.target.value)} />

        <input className="input" type="number" min="0" placeholder="Dormitorios" value={form.bedrooms} onChange={e=>update("bedrooms", e.target.value)} />
        <input className="input" type="number" min="0" placeholder="Baños" value={form.bathrooms} onChange={e=>update("bathrooms", e.target.value)} />
        <input className="input" type="number" min="0" placeholder="m²" value={form.area_m2} onChange={e=>update("area_m2", e.target.value)} />

        <select className="select" value={form.operation} onChange={e=>update("operation", e.target.value)}>
          <option value="venta">Venta</option>
          <option value="alquiler">Alquiler</option>
        </select>

        <select className="select" value={form.type} onChange={e=>update("type", e.target.value)}>
          <option value="depto">Departamento</option>
          <option value="casa">Casa</option>
          <option value="ph">PH</option>
          <option value="terreno">Terreno</option>
        </select>

        <label className="checkbox">
          <input type="checkbox" checked={form.featured} onChange={e=>update("featured", e.target.checked)} />
          <span>Destacada</span>
        </label>
      </div>

      <textarea className="textarea" placeholder="Descripción" rows={4} value={form.description} onChange={e=>update("description", e.target.value)} />

      <div className="uploader">
        <input
          id="photos"
          type="file"
          multiple
          accept="image/*"
          onChange={(e)=>setFiles(Array.from(e.target.files||[]))}
        />
        <label htmlFor="photos" className="btn">Subir fotos</label>
        <span className="hint">{files.length ? `${files.length} archivo(s) seleccionado(s)` : "JPG/PNG, peso liviano"}</span>
      </div>

      {!!previews.length && (
        <div className="thumb-grid">
          {previews.map(p => (
            <img key={p.url} src={p.url} alt={p.name} className="thumb" />
          ))}
        </div>
      )}

      {msg && <p className="msg">{msg}</p>}
    </form>
  );
}

