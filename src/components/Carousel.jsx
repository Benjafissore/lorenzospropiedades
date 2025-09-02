import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Carousel (sin librerías) pensado para cards de propiedades
 *
 * ✅ Sin dependencias externas
 * ✅ Soporta mouse drag, touch swipe, teclado (← →), foco accesible
 * ✅ Flechas y bullets (se pueden ocultar)
 * ✅ Auto-height según imagen activa (útil en cards)
 * ✅ Callbacks y control externo opcional
 * ✅ Muy fácil de reusar: <Carousel images={[{src, alt}, ...]} />
 *
 * ───────── Cómo usar ─────────
 * import Carousel from "./Carousel";
 *
 * function PropertyCard({ property }) {
 *   return (
 *     <article className="card">
 *       <Carousel
 *         images={property.images}
 *         aspect="16/10" // o "4/3" | "1/1" | "auto"
 *         rounded
 *         showDots
 *         showArrows
 *       />
 *       <h3>{property.title}</h3>
 *       <p>{property.location}</p>
 *     </article>
 *   );
 * }
 *
 * // Estructura esperada de images:
 * // images = [{ src: "url.jpg", alt: "Dormitorio principal" }, ...]
 */

export default function Carousel({
  images = [],
  startIndex = 0,
  onIndexChange,
  showArrows = true,
  showDots = true,
  loop = true,
  aspect = "16/9",
  rounded = false,
  className = "",
  ariaLabel = "Galería de imágenes",
}) {
  const [index, setIndex] = useState(
    Math.min(Math.max(startIndex, 0), Math.max(images.length - 1, 0))
  );
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, lastX: 0, moved: false });

  // Inyecta CSS una sola vez
  useEffect(() => {
    if (document.getElementById("carousel-core-css")) return;
    const style = document.createElement("style");
    style.id = "carousel-core-css";
    style.textContent = coreCSS;
    document.head.appendChild(style);
  }, []);

  const goTo = (next) => {
    const total = images.length;
    if (total === 0) return;
    let n = next;
    if (loop) {
      n = (next + total) % total;
    } else {
      n = Math.min(Math.max(next, 0), total - 1);
    }
    setIndex(n);
    onIndexChange?.(n);
  };

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  // Actualiza el transform del track cuando cambia el index
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = "transform 280ms ease";
    track.style.transform = `translateX(${-index * 100}%)`;
    const t = setTimeout(() => {
      if (track) track.style.transition = "none";
    }, 300);
    return () => clearTimeout(t);
  }, [index]);

  // Altura automática según slide activo
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const img = el.querySelector(`.carousel__slide[data-i='${index}'] img`);
    if (img?.complete) el.style.setProperty("--h", img.naturalHeight + "px");
    const onLoad = () => {
      el.style.setProperty("--h", img.naturalHeight + "px");
    };
    img?.addEventListener("load", onLoad);
    return () => img?.removeEventListener("load", onLoad);
  }, [index, images]);

  // Drag / Swipe
  const onPointerDown = (e) => {
    if (!trackRef.current) return;
    drag.current.active = true;
    drag.current.moved = false;
    drag.current.startX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    drag.current.lastX = drag.current.startX;
    trackRef.current.setPointerCapture?.(e.pointerId || 1);
  };
  const onPointerMove = (e) => {
    if (!drag.current.active || !trackRef.current) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? drag.current.lastX;
    const dx = x - drag.current.startX;
    drag.current.lastX = x;
    if (Math.abs(dx) > 2) drag.current.moved = true;
    trackRef.current.style.transform = `translateX(${-index * 100 + (dx / (trackRef.current.clientWidth || 1)) * 100}%)`;
  };
  const onPointerUp = () => {
    if (!drag.current.active || !trackRef.current) return;
    const totalW = trackRef.current.clientWidth || 1;
    const movedPct = ((drag.current.lastX - drag.current.startX) / totalW) * 100;
    drag.current.active = false;
    if (movedPct > 18) prev();
    else if (movedPct < -18) next();
    else goTo(index);
  };

  // Teclado
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  const ratio = useMemo(() => {
    if (aspect === "auto") return null;
    const [w, h] = aspect.split("/").map(Number);
    if (!w || !h) return null;
    return (h / w) * 100; // padding-top technique
  }, [aspect]);

  return (
    <div
      ref={containerRef}
      className={[
        "carousel",
        rounded ? "carousel--rounded" : "",
        className,
      ].join(" ")}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
    >
      <div
        className="carousel__viewport"
        style={ratio ? { paddingTop: `${ratio}%` } : undefined}
      >
        <div
          className="carousel__track"
          ref={trackRef}
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onMouseLeave={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
          role="group"
        >
          {images.map((img, i) => (
            <div className="carousel__slide" key={i} data-i={i}>
              <img
                src={img.src}
                alt={img.alt ?? `Imagen ${i + 1}`}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
          ))}
        </div>
      </div>

      {showArrows && images.length > 1 && (
        <>
          <button
            className="carousel__arrow carousel__arrow--left"
            aria-label="Anterior"
            onClick={prev}
            type="button"
          >
            ◀
          </button>
          <button
            className="carousel__arrow carousel__arrow--right"
            aria-label="Siguiente"
            onClick={next}
            type="button"
          >
            ▶
          </button>
        </>
      )}

      {showDots && images.length > 1 && (
        <div className="carousel__dots" role="tablist">
          {images.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Ir a imagen ${i + 1}`}
              className={"carousel__dot" + (i === index ? " is-active" : "")}
              onClick={() => goTo(i)}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
}

const coreCSS = `
:root {
  --carousel-bg: transparent;
  --carousel-dot: #9ca3af;
  --carousel-dot-active: #ffffff;
  --carousel-arrow-bg: rgba(17,17,17,.55);
  --carousel-arrow-fg: #fff;
  --carousel-shadow: 0 10px 24px -12px rgba(0,0,0,.45);
}
.carousel { position: relative; user-select: none; outline: none; }
.carousel--rounded { border-radius: 14px; overflow: hidden; }
.carousel__viewport { position: relative; background: var(--carousel-bg); }
.carousel__viewport::before { content: ""; display: block; }
.carousel__track { display: grid; grid-auto-flow: column; grid-auto-columns: 100%; height: var(--h, auto); }
.carousel__slide { position: relative; width: 100%; height: 100%; }
.carousel__slide img { width: 100%; height: 100%; display: block; object-fit: cover; }
.carousel__arrow { position: absolute; top: 50%; transform: translateY(-50%); z-index: 3; border: 0; width: 38px; height: 38px; border-radius: 999px; background: var(--carousel-arrow-bg); color: var(--carousel-arrow-fg); display: grid; place-items: center; cursor: pointer; box-shadow: var(--carousel-shadow); }
.carousel__arrow--left { left: 8px; }
.carousel__arrow--right { right: 8px; }
.carousel__arrow:focus-visible { outline: 2px solid #60a5fa; }
.carousel__dots { position: absolute; left: 0; right: 0; bottom: 8px; display: flex; gap: 8px; justify-content: center; z-index: 3; }
.carousel__dot { width: 8px; height: 8px; border-radius: 999px; background: var(--carousel-dot); border: 0; opacity: .85; cursor: pointer; }
.carousel__dot.is-active { background: var(--carousel-dot-active); opacity: 1; transform: scale(1.25); }
.carousel__dot:focus-visible { outline: 2px solid #60a5fa; }
`;