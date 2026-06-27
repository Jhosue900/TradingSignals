const STEPS = [
  {
    num: '01',
    title: 'Te registras',
    desc: 'Eliges tu plan, indicas los mercados que operas y configuras tu perfil en menos de 3 minutos.',
  },
  {
    num: '02',
    title: 'Monitoreamos',
    desc: 'Nuestro sistema escanea fuentes financieras globales las 24 horas del día, los 7 días de la semana.',
  },
  {
    num: '03',
    title: 'Filtramos',
    desc: 'Solo te llegan los eventos relevantes para tus instrumentos: eliminamos el ruido, entregamos señal.',
  },
  {
    num: '04',
    title: 'Analizas y operas',
    desc: 'Con la alerta y el reporte adjunto, tomas decisiones fundamentadas antes de que el mercado se mueva.',
  },
];

export default function HowItWorks() {
  return (
    <section id="como" style={{ padding: 'clamp(24px, 4vw, 56px) clamp(16px, 4vw, 40px)', borderBottom: '1px solid #C8C0B0', background: '#FDFAF5' }}>
      <style>{`
        .ts-how-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid #C8C0B0;
          margin-top: 24px;
        }
        .ts-how-step {
          padding: 20px 16px;
          border-right: 1px solid #C8C0B0;
        }
        .ts-how-step:last-child {
          border-right: none;
        }
        @media (max-width: 580px) {
          .ts-how-grid {
            grid-template-columns: 1fr 1fr;
          }
          .ts-how-step:nth-child(2) {
            border-right: none;
          }
          .ts-how-step:nth-child(1),
          .ts-how-step:nth-child(2) {
            border-bottom: 1px solid #C8C0B0;
          }
        }
        @media (max-width: 340px) {
          .ts-how-grid {
            grid-template-columns: 1fr;
          }
          .ts-how-step {
            border-right: none !important;
            border-bottom: 1px solid #C8C0B0 !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: '#1A1A1A' }}>
          Cómo funciona
        </h2>
        <p style={{ fontSize: '13px', color: '#6B6B6B', marginTop: '6px' }}>
          Desde tu registro hasta la señal en tu bandeja de entrada, todo es automático.
        </p>

        <div className="ts-how-grid">
          {STEPS.map((step) => (
            <div key={step.num} className="ts-how-step">
              <div style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '28px',
                fontWeight: 700,
                color: '#C8C0B0',
                lineHeight: 1,
                marginBottom: '6px',
              }}>
                {step.num}
              </div>
              <div style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '13px',
                fontWeight: 600,
                color: '#1A1A1A',
                marginBottom: '5px',
              }}>
                {step.title}
              </div>
              <p style={{ fontSize: '11px', color: '#6B6B6B', lineHeight: 1.6 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}