const REPORTS = [
  {
    name: "Reporte Diario",
    desc: "Panorama general de los mercados cada mañana: eventos del día, datos macro esperados e impacto probable en precios.",
  },
  {
    name: "Análisis Semanal",
    desc: "Revisión de la semana: qué movió el mercado, qué ignorar y dónde pueden estar las oportunidades la siguiente.",
  },
  {
    name: "Reporte Macro",
    desc: "Contexto macroeconómico profundo: tasas de interés, inflación, decisiones de bancos centrales y su efecto en tus instrumentos.",
  },
  {
    name: "Alerta de Evento",
    desc: "Reporte inmediato cuando ocurre un evento de alto impacto: NFP, decisiones de la Fed, conflictos geopolíticos, resultados corporativos.",
  },
  {
    name: "Análisis Técnico",
    desc: "Niveles clave de soporte y resistencia, tendencias en marcos temporales relevantes y zonas de reacción para tus instrumentos.",
  },
  {
    name: "Calendario Económico",
    desc: "Resumen anticipado de todos los eventos económicos de la semana con estimados de consenso y relevancia por instrumento.",
  },
];

export default function Reports() {
  return (
    <section
      id="reportes"
      style={{
        background: "#F5F1EA",
        borderTop: "1px solid #C8C0B0",
        borderBottom: "1px solid #C8C0B0",
        padding: "clamp(24px, 4vw, 56px) clamp(16px, 4vw, 40px)",
      }}
    >
      <style>{`
        .ts-reports-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid #C8C0B0;
  margin-top: 24px;
}
.ts-report-card {
  padding: 18px 16px;
  border-right: 1px solid #C8C0B0;
  border-bottom: 1px solid #C8C0B0;
  background: #FDFAF5;
}
/* quita el borde derecho de la 3ra columna (últimos de cada fila) */
.ts-report-card:nth-child(3n) {
  border-right: none;
}
/* quita el borde inferior de la última fila (los 3 últimos cards) */
.ts-report-card:nth-last-child(-n+3) {
  border-bottom: none;
}

@media (max-width: 900px) {
  .ts-reports-grid {
    grid-template-columns: 1fr 1fr;
  }
  .ts-report-card:nth-child(3n) {
    border-right: 1px solid #C8C0B0; /* revertimos la regla de 3 columnas */
  }
  .ts-report-card:nth-child(even) {
    border-right: none;
  }
  .ts-report-card:nth-last-child(-n+3) {
    border-bottom: 1px solid #C8C0B0; /* revertimos */
  }
  .ts-report-card:nth-last-child(-n+2) {
    border-bottom: none;
  }
}

@media (max-width: 480px) {
  .ts-reports-grid {
    grid-template-columns: 1fr;
  }
  .ts-report-card {
    border-right: none;
  }
  .ts-report-card:nth-last-child(-n+2) {
    border-bottom: 1px solid #C8C0B0; /* revertimos */
  }
  .ts-report-card:last-child {
    border-bottom: none;
  }
}
      `}</style>

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(20px, 3vw, 28px)",
            fontWeight: 700,
            color: "#1A1A1A",
          }}
        >
          Reportes Profesionales
        </h2>
        <p
          style={{
            fontSize: "13px",
            color: "#6B6B6B",
            maxWidth: "520px",
            marginTop: "6px",
          }}
        >
          Incluidos en ambas suscripciones. Documentos analíticos elaborados
          para darte contexto profundo sobre los mercados que operas.
        </p>

        <div className="ts-reports-grid">
          {REPORTS.map((r) => (
            <div key={r.name} className="ts-report-card">
              <div
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#1A1A1A",
                  marginBottom: "5px",
                }}
              >
                {r.name}
              </div>
              <p
                style={{
                  fontSize: "11px",
                  color: "#6B6B6B",
                  lineHeight: 1.6,
                  marginBottom: "8px",
                }}
              >
                {r.desc}
              </p>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#B5841A",
                  border: "1px solid #C8C0B0",
                  padding: "2px 7px",
                  display: "inline-block",
                }}
              >
                Básico · Premium
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
