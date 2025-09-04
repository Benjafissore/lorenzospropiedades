export default function Footer() {
  const year = new Date().getFullYear();

  // 👉 Reemplazá con tus enlaces reales
  const IG = "https://instagram.com/tu_usuario";
  const WA = "https://wa.me/5493510000000"; // formato: 549 + código de área + número

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="/" className="footer__brand" aria-label="Inicio Lorenzo Propiedades">
          <img src="/4_logo.png" alt="" className="footer__logo" />
          <img src="/5_logo.png" alt="" className="footer__title" />
        </a>

        <nav className="footer__social" aria-label="Redes sociales">
          <a className="footer__icon" href={IG} target="_blank" rel="noopener noreferrer" aria-label="Abrir Instagram">
            {/* Instagram */}
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm6.5-2a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
            </svg>
          </a>

          <a className="footer__icon" href={WA} target="_blank" rel="noopener noreferrer" aria-label="Abrir WhatsApp">
            {/* WhatsApp */}
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.52 3.48A11.9 11.9 0 0012.04 0C5.44 0 .12 5.32.12 11.92c0 2.1.56 4.12 1.61 5.9L0 24l6.33-1.64a11.87 11.87 0 005.7 1.45h.01c6.6 0 11.93-5.32 11.93-11.92 0-3.19-1.24-6.19-3.45-8.4zM12.04 22.1h-.01a9.9 9.9 0 01-5.04-1.39l-.36-.21-3.76.98 1-3.66-.23-.38a9.89 9.89 0 01-1.5-5.12c0-5.47 4.45-9.92 9.93-9.92a9.86 9.86 0 019.93 9.92c0 5.47-4.46 9.92-9.96 9.92zm5.74-7.28c-.31-.16-1.84-.91-2.13-1.02-.29-.11-.5-.16-.71.16-.2.31-.81 1.02-.99 1.23-.18.2-.36.23-.67.08-.31-.16-1.3-.48-2.46-1.53-.91-.81-1.53-1.81-1.71-2.12-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.54.16-.18.2-.31.31-.52.1-.2.05-.39-.03-.55-.08-.16-.71-1.71-.98-2.34-.26-.63-.52-.55-.71-.56l-.61-.01c-.2 0-.52.08-.8.39-.27.31-1.05 1.03-1.05 2.51s1.08 2.91 1.23 3.11c.16.2 2.13 3.25 5.17 4.55.72.31 1.28.49 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.84-.75 2.1-1.47.26-.72.26-1.34.18-1.47-.08-.13-.28-.2-.59-.36z"/>
            </svg>
          </a>
        </nav>
      </div>

      <div className="container footer__meta">
        <p className="footer__copy">© {year} Lorenzo's Propiedades · Córdoba, Argentina</p>
        <ul className="footer__links" aria-label="Enlaces del sitio">
          <li><a href="/privacidad">Privacidad</a></li>
          <li><a href="/terminos">Términos</a></li>
          <li><a href="/contacto">Contacto</a></li>
        </ul>
      </div>
    </footer>
  );
}
