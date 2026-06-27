const REPORTS = [
  {
    icon: '📰',
    name: 'Reporte Diario',
    desc: 'Panorama general de los mercados cada mañana: eventos del día, datos macro esperados e impacto probable en precios.',
  },
  {
    icon: '📊',
    name: 'Análisis Semanal',
    desc: 'Revisión de la semana: qué movió el mercado, qué ignorar y dónde pueden estar las oportunidades la siguiente.',
  },
  {
    icon: '🌐',
    name: 'Reporte Macro',
    desc: 'Contexto macroeconómico profundo: tasas de interés, inflación, decisiones de bancos centrales y su efecto en tus instrumentos.',
  },
  {
    icon: '⚡',
    name: 'Alerta de Evento',
    desc: 'Reporte inmediato cuando ocurre un evento de alto impacto: NFP, decisiones de la Fed, conflictos geopolíticos, resultados corporativos.',
  },
  {
    icon: '📈',
    name: 'Análisis Técnico',
    desc: 'Niveles clave de soporte y resistencia, tendencias en marcos temporales relevantes y zonas de reacción para tus instrumentos.',
  },
  {
    icon: '🗓️',
    name: 'Calendario Económico',
    desc: 'Resumen anticipado de todos los eventos económicos de la semana con estimados de consenso y relevancia por instrumento.',
  },
];

export default function Reports() {
  return (
    <section id="reportes" style={{
      background: '#F5F1EA',
      borderTop: '1px solid #C8C0B0',
      borderBottom: '1px solid #C8C0B0',
      padding: 'clamp(24px, 4vw, 56px) clamp(16px, 4vw, 40px)',
    }}>
      <style>{`
        .ts-reports-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          border: 1px solid #C8C0B0;
          margin-top: 24px;
        }
        .ts-report-card {
          padding: 18px 16px;
          border-right: 1px solid #C8C0B0;
          border-bottom: 1px solid #C8C0B0;
          background: #FDFAF5;
        }
        @media (max-width: 600px) {
          .ts-reports-grid {
            grid-template-columns: 1fr 1fr;
          }
          .ts-report-card:nth-child(even) {
            border-right: none;
          }
        }
        @media (max-width: 360px) {
          .ts-reports-grid {
            grid-template-columns: 1fr;
          }
          .ts-report-card {
            border-right: none;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: '#1A1A1A' }}>
          Reportes Profesionales
        </h2>
        <p style={{ fontSize: '13px', color: '#6B6B6B', maxWidth: '520px', marginTop: '6px' }}>
          Incluidos en ambas suscripciones. Documentos analíticos elaborados para darte contexto profundo sobre los mercados que operas.
        </p>

        <div className="ts-reports-grid">
          {REPORTS.map((r) => (
            <div key={r.name} className="ts-report-card">
              <div style={{ fontSize: '20px', marginBottom: '8px' }}>{r.icon}</div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '13px', fontWeight: 600, color: '#1A1A1A', marginBottom: '5px' }}>
                {r.name}
              </div>
              <p style={{ fontSize: '11px', color: '#6B6B6B', lineHeight: 1.6, marginBottom: '8px' }}>
                {r.desc}
              </p>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#B5841A',
                border: '1px solid #C8C0B0',
                padding: '2px 7px',
                display: 'inline-block',
              }}>
                Básico · Premium
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}