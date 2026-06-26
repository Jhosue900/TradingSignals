export default function Reports() {
  return (
    <section id="reportes" style={{ background: '#F5F1EA', borderTop: '1px solid #C8C0B0', borderBottom: '1px solid #C8C0B0', padding: '3.5rem 2.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, marginBottom: '0.5rem' }}>Reportes Profesionales</h2>
          <p style={{ fontSize: '0.95rem', color: '#6B6B6B', maxWidth: '560px' }}>Incluidos en ambas suscripciones. Documentos analíticos elaborados para darte contexto profundo sobre los mercados que operas.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 0, border: '1px solid #C8C0B0' }}>
          <div style={{ padding: '1.75rem', borderRight: '1px solid #C8C0B0', background: '#FDFAF5' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>📰</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.4rem', color: '#1A1A1A' }}>Reporte Diario</div>
            <div style={{ fontSize: '0.85rem', color: '#6B6B6B', lineHeight: 1.6, marginBottom: '0.75rem' }}>Panorama general de los mercados cada mañana: eventos del día, datos macro esperados e impacto probable en precios.</div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#B5841A', border: '1px solid #C8C0B0', padding: '2px 8px', display: 'inline-block' }}>Básico · Premium</span>
          </div>
          <div style={{ padding: '1.75rem', borderRight: '1px solid #C8C0B0', background: '#FDFAF5' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>📊</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.4rem', color: '#1A1A1A' }}>Análisis Semanal</div>
            <div style={{ fontSize: '0.85rem', color: '#6B6B6B', lineHeight: 1.6, marginBottom: '0.75rem' }}>Revisión de la semana: qué movió el mercado, qué ignorar y dónde pueden estar las oportunidades la semana siguiente.</div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#B5841A', border: '1px solid #C8C0B0', padding: '2px 8px', display: 'inline-block' }}>Básico · Premium</span>
          </div>
          <div style={{ padding: '1.75rem', borderRight: '1px solid #C8C0B0', background: '#FDFAF5' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>🌐</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.4rem', color: '#1A1A1A' }}>Reporte Macro</div>
            <div style={{ fontSize: '0.85rem', color: '#6B6B6B', lineHeight: 1.6, marginBottom: '0.75rem' }}>Contexto macroeconómico profundo: tasas de interés, inflación, decisiones de bancos centrales y su efecto en tus instrumentos.</div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#B5841A', border: '1px solid #C8C0B0', padding: '2px 8px', display: 'inline-block' }}>Básico · Premium</span>
          </div>
          <div style={{ padding: '1.75rem', borderRight: '1px solid #C8C0B0', background: '#FDFAF5' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>⚡</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.4rem', color: '#1A1A1A' }}>Alerta de Evento</div>
            <div style={{ fontSize: '0.85rem', color: '#6B6B6B', lineHeight: 1.6, marginBottom: '0.75rem' }}>Reporte inmediato cuando ocurre un evento de alto impacto: NFP, decisiones de la Fed, conflictos geopolíticos, resultados corporativos.</div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#B5841A', border: '1px solid #C8C0B0', padding: '2px 8px', display: 'inline-block' }}>Básico · Premium</span>
          </div>
          <div style={{ padding: '1.75rem', borderRight: '1px solid #C8C0B0', background: '#FDFAF5' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>📈</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.4rem', color: '#1A1A1A' }}>Análisis Técnico</div>
            <div style={{ fontSize: '0.85rem', color: '#6B6B6B', lineHeight: 1.6, marginBottom: '0.75rem' }}>Niveles clave de soporte y resistencia, tendencias en marcos temporales relevantes y zonas de reacción para tus instrumentos.</div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#B5841A', border: '1px solid #C8C0B0', padding: '2px 8px', display: 'inline-block' }}>Básico · Premium</span>
          </div>
          <div style={{ padding: '1.75rem', background: '#FDFAF5' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>🗓️</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.4rem', color: '#1A1A1A' }}>Calendario Económico</div>
            <div style={{ fontSize: '0.85rem', color: '#6B6B6B', lineHeight: 1.6, marginBottom: '0.75rem' }}>Resumen anticipado de todos los eventos económicos de la semana con estimados de consenso y relevancia por instrumento.</div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#B5841A', border: '1px solid #C8C0B0', padding: '2px 8px', display: 'inline-block' }}>Básico · Premium</span>
          </div>
        </div>
      </div>
    </section>
  );
}
