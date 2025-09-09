// src/pages/Contact.jsx
import { useMemo, useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const address = "Humberto primo 330, Rio Cuarto, Cordoba, Argentina";
  const mapSrc = useMemo(
    () =>
      `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`,
    [address]
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  }

  function validate() {
    const err = {};
    if (!form.nombre.trim()) err.nombre = "Ingresá tu nombre.";
    if (!form.email.trim()) err.email = "Ingresá tu email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = "Email inválido.";
    if (!form.mensaje.trim() || form.mensaje.trim().length < 10)
      err.mensaje = "Contanos un poco más (mín. 10 caracteres).";
    return err;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) return setErrors(err);
    setStatus("sending");

    // Integrá acá Formspree/EmailJS/tu API
    await new Promise((r) => setTimeout(r, 800));

    setStatus("sent");
    setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
  }

  return (
    <div className="container contact">
      <section className="contact-hero hero--fullbleed" aria-label="Hero">
       <img src="/fotohero.jpg" alt="" className="contact-hero-img" />
        
        <div className="contact-hero-overlay">
            <h2>CONTACTO</h2>
        </div>


       
      </section>

      <div className="contact-grid">
        {/* Columna: datos + mapa */}
        <section className="card">
          <h2>Hablemos</h2>
          <ul className="contact-list">
            <li>
              📞 <a href="tel:+54 9 3585 04 9328">+54 9 3585 04 9328</a>
            </li>
            <li>
              💬{" "}
              <a
                href="https://wa.me/5493585049328"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>{" "}
              ·{" "}
              <a
                href="https://instagram.com/lorenzospropiedades"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>{" "}
              ·{" "}
              <a
                href="https://facebook.com/profile.php?id=61576778300387&locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>📍 {address}</li>
          </ul>

          <div className="map-wrapper" aria-label="Mapa de ubicación">
            <iframe
              src={mapSrc}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación en Google Maps"
            />
          </div>
        </section>

        {/* Columna: formulario */}
        <section className="card">
          <h2>Dejanos tu consulta</h2>
          <form onSubmit={handleSubmit} noValidate className="form-grid">
            <div>
              <label htmlFor="nombre">Nombre y apellido</label>
              <input
                id="nombre"
                name="nombre"
                className="input"
                placeholder="Juan Pérez"
                value={form.nombre}
                onChange={handleChange}
                autoComplete="name"
              />
              {errors.nombre && (
                <small className="error">{errors.nombre}</small>
              )}
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="input"
                placeholder="tu@correo.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                inputMode="email"
              />
              {errors.email && <small className="error">{errors.email}</small>}
            </div>

            <div>
              <label htmlFor="telefono">Teléfono (opcional)</label>
              <input
                id="telefono"
                name="telefono"
                className="input"
                placeholder="+54 9 11 0000 0000"
                value={form.telefono}
                onChange={handleChange}
                autoComplete="tel"
                inputMode="tel"
              />
            </div>

            <div>
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                className="input"
                rows={5}
                placeholder="¿En qué podemos ayudarte?"
                value={form.mensaje}
                onChange={handleChange}
              />
              {errors.mensaje && (
                <small className="error">{errors.mensaje}</small>
              )}
            </div>

            <button
              className="btn"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Enviando..." : "Enviar consulta"}
            </button>

            <p
              className="status"
              aria-live="polite"
              role="status"
              style={{ minHeight: 20 }}
            >
              {status === "sent" &&
                "¡Gracias! Te responderemos a la brevedad."}
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}

