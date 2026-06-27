interface PricingProps {
  onSelectPlan: (plan: 'Básico' | 'Premium') => void;
}

const PLAN_BASIC = [
  'Alertas de noticias en tiempo real',
  'Hasta 5 instrumentos a elegir',
  'Alertas inmediatas por evento de mercado',
  'Resumen diario de mercado',
  'Análisis técnico básico adjunto',
];

const PLAN_PREMIUM = [
  'Alertas de noticias en tiempo real',
  'Hasta 15 instrumentos a elegir',
  'Alertas inmediatas por evento de mercado',
  'Análisis técnico profesional',
  'Resumen diario detallado',
  'Soporte prioritario 24/7',
  'Acceso anticipado a nuevas señales',
];

function PlanButton({ label, variant, onClick }: { label: string; variant: 'outline' | 'gold'; onClick: () => void }) {
  const isGold = variant === 'gold';
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '12px',
        fontFamily: "'Inter', sans-serif",
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        border: isGold ? 'none' : '1.5px solid #1A1A1A',
        background: isGold ? '#B5841A' : 'transparent',
        color: isGold ? '#fff' : '#1A1A1A',
        transition: 'background 0.15s, color 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = isGold ? '#8A6010' : '#1A1A1A';
        e.currentTarget.style.color = '#fff';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isGold ? '#B5841A' : 'transparent';
        e.currentTarget.style.color = isGold ? '#fff' : '#1A1A1A';
      }}
    >
      {label}
    </button>
  );
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  const handleSelect = (plan: 'Básico' | 'Premium') => {
    onSelectPlan(plan);
    document.getElementById('registro')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="planes" style={{ background: '#FDFAF5', padding: 'clamp(24px, 4vw, 56px) clamp(16px, 4vw, 40px)', borderBottom: '1px solid #C8C0B0' }}>
      <style>{`
        .ts-pricing-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border: 1.5px solid #1A1A1A;
          max-width: 720px;
          margin: 24px auto 0;
        }
        .ts-plan-basic {
          border-right: 1.5px solid #1A1A1A;
        }
        @media (max-width: 540px) {
          .ts-pricing-grid {
            grid-template-columns: 1fr;
          }
          .ts-plan-basic {
            border-right: none;
            border-bottom: 1.5px solid #1A1A1A;
          }
        }
      `}</style>

      <div style={{ textAlign: 'center', marginBottom: '4px' }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: '#1A1A1A' }}>
          Suscripciones
        </h2>
        <p style={{ fontSize: '13px', color: '#6B6B6B', maxWidth: '480px', margin: '6px auto 0' }}>
          Dos niveles de acceso diseñados para traders que toman en serio sus operaciones.
        </p>
      </div>

      <div className="ts-pricing-grid">

        {/* BÁSICO */}
        <div className="ts-plan-basic" style={{ padding: '24px 22px' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B6B6B', marginBottom: '3px' }}>Suscripción</p>
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', fontWeight: 700, color: '#1A1A1A' }}>Básico</p>
          <hr style={{ border: 'none', borderTop: '1px solid #C8C0B0', margin: '14px 0' }} />
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '36px', fontWeight: 700, color: '#1A1A1A', lineHeight: 1 }}>
            <sup style={{ fontSize: '14px', verticalAlign: 'super', fontWeight: 400, color: '#6B6B6B' }}>$</sup>150
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#B5841A', fontWeight: 600, marginTop: '4px' }}>Pesos mexicanos (MXN)</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#6B6B6B', marginTop: '2px', marginBottom: '16px' }}>por mes · renovación mensual</div>
          <ul style={{ listStyle: 'none', marginBottom: '20px' }}>
            {PLAN_BASIC.map((f) => (
              <li key={f} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', padding: '6px 0', borderBottom: '1px solid #E8E2D8', fontSize: '12px', color: '#3D3D3D', lineHeight: 1.4 }}>
                <span style={{ color: '#1A6B3C', fontWeight: 700, flexShrink: 0 }}>✓</span> {f}
              </li>
            ))}
            <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', padding: '6px 0', borderBottom: '1px solid #E8E2D8', fontSize: '12px', color: '#3D3D3D', lineHeight: 1.4 }}>
              <span style={{ color: '#1A6B3C', fontWeight: 700, flexShrink: 0 }}>✓</span>
              <span style={{ flex: 1 }}>Reportes profesionales de mercado</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: '#F5F1EA', color: '#B5841A', padding: '1px 6px', border: '1px solid #C8C0B0', flexShrink: 0 }}>Incluido</span>
            </li>
          </ul>
          <PlanButton label="Suscribirse al Básico" variant="outline" onClick={() => handleSelect('Básico')} />
        </div>

        {/* PREMIUM */}
        <div style={{ padding: '24px 22px', position: 'relative' }}>
          <div style={{
            background: '#B5841A',
            color: '#fff',
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textAlign: 'center',
            padding: '5px',
            margin: '-24px -22px 18px',
          }}>
            Suscripción más completa
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B6B6B', marginBottom: '3px' }}>Suscripción</p>
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', fontWeight: 700, color: '#B5841A' }}>Premium</p>
          <hr style={{ border: 'none', borderTop: '1px solid #C8C0B0', margin: '14px 0' }} />
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '36px', fontWeight: 700, color: '#B5841A', lineHeight: 1 }}>
            <sup style={{ fontSize: '14px', verticalAlign: 'super', fontWeight: 400, color: '#6B6B6B' }}>$</sup>300
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#B5841A', fontWeight: 600, marginTop: '4px' }}>Pesos mexicanos (MXN)</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#6B6B6B', marginTop: '2px', marginBottom: '16px' }}>por mes · renovación mensual</div>
          <ul style={{ listStyle: 'none', marginBottom: '20px' }}>
            {PLAN_PREMIUM.map((f) => (
              <li key={f} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', padding: '6px 0', borderBottom: '1px solid #E8E2D8', fontSize: '12px', color: '#3D3D3D', lineHeight: 1.4 }}>
                <span style={{ color: '#1A6B3C', fontWeight: 700, flexShrink: 0 }}>✓</span> {f}
              </li>
            ))}
            <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', padding: '6px 0', borderBottom: '1px solid #E8E2D8', fontSize: '12px', color: '#3D3D3D', lineHeight: 1.4 }}>
              <span style={{ color: '#1A6B3C', fontWeight: 700, flexShrink: 0 }}>✓</span>
              <span style={{ flex: 1 }}>Reportes profesionales avanzados</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: '#F5F1EA', color: '#B5841A', padding: '1px 6px', border: '1px solid #C8C0B0', flexShrink: 0 }}>Incluido</span>
            </li>
          </ul>
          <PlanButton label="Suscribirse al Premium" variant="gold" onClick={() => handleSelect('Premium')} />
        </div>

      </div>
    </section>
  );
}