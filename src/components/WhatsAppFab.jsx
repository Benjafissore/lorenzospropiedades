export default function WhatsAppFab() {
  // Reemplazá con tu número en formato internacional SIN '+' ni espacios.
  // Ej: Argentina (Córdoba) 351-1234567 -> "5493511234567"
  const phone = "5493511234567";

  const currentUrl =
    typeof window !== "undefined" && window.location ? window.location.href : "";

  const text = encodeURIComponent(
    `Hola, vi esta propiedad en Lorenzo Propiedades y quiero más info. ${currentUrl}`
  );

  const href = `https://wa.me/${phone}?text=${text}`;

  return (
    <a
      href={href}
      className="wsp-fab"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      title="Chatear por WhatsApp"
    >
      {/* Ícono SVG oficial simplificado de WhatsApp */}
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        focusable="false"
        className="wsp-fab__icon"
      >
        <path
          d="M19.11 17.12c-.29-.15-1.71-.84-1.98-.94-.27-.1-.47-.15-.67.15-.2.29-.77.94-.94 1.13-.17.2-.35.22-.64.08-.29-.15-1.22-.45-2.33-1.44-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.35.44-.52.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.5-.17 0-.37 0-.57 0-.2 0-.52.07-.79.37-.27.29-1.03 1-1.03 2.44 0 1.44 1.06 2.84 1.22 3.03.15.2 2.09 3.19 5.06 4.47.71.31 1.27.49 1.7.63.71.22 1.35.19 1.86.12.57-.08 1.71-.7 1.95-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.2-.55-.35zM26.66 5.34C23.78 2.46 20.07 1 16.1 1 8.34 1 2 7.34 2 15.11c0 2.57.67 5.08 1.96 7.29L2 31l8.78-2.3c2.13 1.16 4.54 1.77 7.01 1.77h.01c7.76 0 14.1-6.34 14.1-14.11 0-3.96-1.55-7.66-4.34-10.55zM16.8 28.05h-.01c-2.22 0-4.39-.6-6.27-1.73l-.45-.27-5.21 1.36 1.39-5.08-.29-.47C4.62 19.93 4 17.57 4 15.11 4 8.45 9.45 3 16.1 3c3.77 0 7.31 1.47 9.97 4.13 2.66 2.67 4.13 6.2 4.13 9.97 0 7.66-6.45 13.95-13.4 13.95z"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}
