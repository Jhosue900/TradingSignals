export default function HowItWorks() {
  return (
    <section id="como" style={{ padding: '3.5rem 2.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, marginBottom: '0.4rem' }}>Cómo funciona</h2>
      <p style={{ fontSize: '0.95rem', color: '#6B6B6B', marginBottom: '2.5rem' }}>Desde tu registro hasta la señal en tu bandeja de entrada, todo es automático.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1px solid #C8C0B0' }}>
        <div style={{ padding: '1.75rem 1.5rem', borderRight: '1px solid #C8C0B0' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, color: '#C8C0B0', lineHeight: 1, marginBottom: '0.5rem' }}>01</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 600, marginBottom: '0.4rem' }}>Te registras</h3>
          <p style={{ fontSize: '0.85rem', color: '#6B6B6B', lineHeight: 1.6 }}>Eliges tu plan, indicas los mercados que operas y configuras tu perfil en menos de 3 minutos.</p>
        </div>
        <div style={{ padding: '1.75rem 1.5rem', borderRight: '1px solid #C8C0B0' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, color: '#C8C0B0', lineHeight: 1, marginBottom: '0.5rem' }}>02</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 600, marginBottom: '0.4rem' }}>Monitoreamos</h3>
          <p style={{ fontSize: '0.85rem', color: '#6B6B6B', lineHeight: 1.6 }}>Nuestro sistema escanea fuentes financieras globales las 24 horas del día, los 7 días de la semana.</p>
        </div>
        <div style={{ padding: '1.75rem 1.5rem', borderRight: '1px solid #C8C0B0' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, color: '#C8C0B0', lineHeight: 1, marginBottom: '0.5rem' }}>03</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 600, marginBottom: '0.4rem' }}>Filtramos</h3>
          <p style={{ fontSize: '0.85rem', color: '#6B6B6B', lineHeight: 1.6 }}>Solo te llegan los eventos relevantes para tus instrumentos: eliminamos el ruido, entregamos señal.</p>
        </div>
        <div style={{ padding: '1.75rem 1.5rem' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, color: '#C8C0B0', lineHeight: 1, marginBottom: '0.5rem' }}>04</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 600, marginBottom: '0.4rem' }}>Analizas y operas</h3>
          <p style={{ fontSize: '0.85rem', color: '#6B6B6B', lineHeight: 1.6 }}>Con la alerta y el reporte adjunto, tomas decisiones fundamentadas antes de que el mercado se mueva.</p>
        </div>
      </div>
    </section>
  );
}
