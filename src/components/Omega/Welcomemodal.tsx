import { useEffect } from "react";

interface WelcomeModalProps {
  name?: string | null;
  plan?: string | null;
  onClose: () => void;
}

const FEATURES = [
  "Señales de mercado en tiempo real activadas",
  "Créditos de tu plan ya cargados en tu cuenta",
  "Acceso al Panel VIP y reportes profesionales",
];

export default function WelcomeModal({ name, plan, onClose }: WelcomeModalProps) {
  // Solo el primer nombre, para no romper el layout con nombres largos
  const firstName = name?.trim().split(" ")[0];
  // Cierra con ESC y bloquea el scroll del body mientras el modal está abierto
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "rgba(26,26,26,0.72)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        animation: "ts-modal-fade 0.25s ease-out",
      }}
    >
      <style>{`
        @keyframes ts-modal-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes ts-modal-rise {
          from { opacity: 0; transform: translateY(14px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .ts-welcome-card {
          animation: ts-modal-rise 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ts-welcome-close:hover {
          color: #B5841A !important;
        }
        .ts-welcome-cta:hover {
          background: #8A6010 !important;
        }
        .ts-welcome-cta:active {
          transform: scale(0.98);
        }
      `}</style>

      <div
        className="ts-welcome-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#FDFAF5",
          border: "1px solid #C8C0B0",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 24px 60px -12px rgba(26,26,26,0.35)",
          position: "relative",
        }}
      >
        {/* Cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="ts-welcome-close"
          style={{
            position: "absolute",
            top: "14px",
            right: "16px",
            background: "none",
            border: "none",
            fontSize: "16px",
            color: "#6B6B6B",
            cursor: "pointer",
            lineHeight: 1,
            transition: "color 0.15s",
          }}
        >
          ✕
        </button>

        {/* Banda superior, mismo patrón que la card Premium de Pricing */}
        <div
          style={{
            background: "#B5841A",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textAlign: "center",
            padding: "8px",
          }}
        >
          Suscripción confirmada
        </div>

        <div style={{ padding: "32px 28px 28px", textAlign: "center" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              margin: "0 auto 16px",
              borderRadius: "9999px",
              border: "1.5px solid #B5841A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              color: "#B5841A",
            }}
          >
            ✓
          </div>

          <h2
            id="welcome-modal-title"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(20px, 3vw, 26px)",
              fontWeight: 700,
              color: "#1A1A1A",
              lineHeight: 1.2,
            }}
          >
            {firstName ? `Bienvenido, ${firstName}` : "Acceso Omega concedido"}
          </h2>

          <p
            style={{
              fontSize: "13px",
              color: "#6B6B6B",
              marginTop: "8px",
              lineHeight: 1.6,
            }}
          >
            Tu pago fue procesado y tu cuenta ya está activa. Ya tenés acceso
            completo a la experiencia Omega de TradingSignals.
          </p>

          {plan && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#F5F1EA",
                border: "1px solid #C8C0B0",
                borderRadius: "9999px",
                padding: "6px 14px",
                margin: "16px 0 4px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
              }}
            >
              <span style={{ color: "#6B6B6B" }}>Plan activado:</span>
              <strong style={{ color: "#B5841A", textTransform: "capitalize" }}>
                {plan}
              </strong>
            </div>
          )}

          <ul
            style={{
              listStyle: "none",
              marginTop: "20px",
              marginBottom: "26px",
              textAlign: "left",
            }}
          >
            {FEATURES.map((f) => (
              <li
                key={f}
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "flex-start",
                  padding: "8px 0",
                  borderBottom: "1px solid #E8E2D8",
                  fontSize: "12px",
                  color: "#3D3D3D",
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: "#1A6B3C", fontWeight: 700, flexShrink: 0 }}>
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>

          <button
            onClick={onClose}
            className="ts-welcome-cta"
            style={{
              width: "100%",
              padding: "13px",
              background: "#B5841A",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background 0.15s, transform 0.1s",
            }}
          >
            Ir al Dashboard de Trading
          </button>

        </div>
      </div>
    </div>
  );
}