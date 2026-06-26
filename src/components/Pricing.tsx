interface PricingProps {
  onSelectPlan: (plan: 'Básico' | 'Premium') => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  const handleSelect = (plan: 'Básico' | 'Premium') => {
    onSelectPlan(plan);
    const el = document.getElementById('registro');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="planes">
      <div style={{ background: '#FDFAF5', padding: '3.5rem 2.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, marginBottom: '0.5rem' }}>Suscripciones</h2>
          <p style={{ fontSize: '0.95rem', color: '#6B6B6B', maxWidth: '500px', margin: '0 auto' }}>
            Dos niveles de acceso diseñados para traders que toman en serio sus operaciones.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1.5px solid #1A1A1A', maxWidth: '860px', margin: '0 auto' }}>
          {/* BÁSICO */}
          <div style={{ padding: '2.25rem 2.5rem', borderRight: '1.5px solid #1A1A1A' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B6B6B', marginBottom: '0.3rem' }}>Suscripción</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.9rem', fontWeight: 700, color: '#1A1A1A', marginBottom: '0.1rem' }}>Básico</p>
            <hr style={{ border: 'none', borderTop: '1px solid #C8C0B0', margin: '1.25rem 0' }} />
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', fontWeight: 700, color: '#1A1A1A', lineHeight: 1 }}>
                <sup style={{ fontSize: '1.1rem', verticalAlign: 'super', fontWeight: 400, color: '#6B6B6B' }}>$</sup>150
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#B5841A', fontWeight: 600, letterSpacing: '0.05em', marginTop: '3px' }}>Pesos mexicanos (MXN)</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#6B6B6B', marginTop: '2px' }}>por mes · renovación mensual</div>
            </div>
            <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '0.5rem 0', fontSize: '0.9rem', color: '#3D3D3D', borderBottom: '1px solid #E8E2D8', lineHeight: 1.4 }}>
                <span style={{ color: '#1A6B3C', fontWeight: 700, flexShrink: 0 }}>✓</span> Alertas de noticias en tiempo real
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '0.5rem 0', fontSize: '0.9rem', color: '#3D3D3D', borderBottom: '1px solid #E8E2D8', lineHeight: 1.4 }}>
                <span style={{ color: '#1A6B3C', fontWeight: 700, flexShrink: 0 }}>✓</span> Hasta 5 instrumentos a elegir
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '0.5rem 0', fontSize: '0.9rem', color: '#3D3D3D', borderBottom: '1px solid #E8E2D8', lineHeight: 1.4 }}>
                <span style={{ color: '#1A6B3C', fontWeight: 700, flexShrink: 0 }}>✓</span> Alertas inmediatas por evento de mercado
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '0.5rem 0', fontSize: '0.9rem', color: '#3D3D3D', borderBottom: '1px solid #E8E2D8', lineHeight: 1.4 }}>
                <span style={{ color: '#1A6B3C', fontWeight: 700, flexShrink: 0 }}>✓</span> Resumen diario de mercado
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '0.5rem 0', fontSize: '0.9rem', color: '#3D3D3D', borderBottom: '1px solid #E8E2D8', lineHeight: 1.4 }}>
                <span style={{ color: '#1A6B3C', fontWeight: 700, flexShrink: 0 }}>✓</span> Análisis técnico básico adjunto
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '0.5rem 0', fontSize: '0.9rem', color: '#3D3D3D', borderBottom: '1px solid #E8E2D8', lineHeight: 1.4 }}>
                <span style={{ color: '#1A6B3C', fontWeight: 700, flexShrink: 0 }}>✓</span> Reportes profesionales de mercado
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: '#F5F1EA', color: '#B5841A', padding: '1px 6px', border: '1px solid #C8C0B0', marginLeft: 'auto', whiteSpace: 'nowrap', flexShrink: 0 }}>Incluido</span>
              </li>
            </ul>
            <button
              onClick={() => handleSelect('Básico')}
              style={{ width: '100%', padding: '0.85rem', background: 'transparent', color: '#1A1A1A', border: '1.5px solid #1A1A1A', fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.color = '#FDFAF5'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1A1A1A'; }}
            >
              Suscribirse al Básico
            </button>
          </div>
          {/* PREMIUM */}
          <div style={{ padding: '2.25rem 2.5rem', position: 'relative' }}>
            <div style={{ background: '#B5841A', color: '#FDFAF5', fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.3rem 0', textAlign: 'center', margin: '-2.25rem -2.5rem 1.75rem' }}>
              Suscripción más completa
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B6B6B', marginBottom: '0.3rem' }}>Suscripción</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.9rem', fontWeight: 700, color: '#B5841A', marginBottom: '0.1rem' }}>Premium</p>
            <hr style={{ border: 'none', borderTop: '1px solid #C8C0B0', margin: '1.25rem 0' }} />
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', fontWeight: 700, color: '#B5841A', lineHeight: 1 }}>
                <sup style={{ fontSize: '1.1rem', verticalAlign: 'super', fontWeight: 400, color: '#6B6B6B' }}>$</sup>300
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#B5841A', fontWeight: 600, letterSpacing: '0.05em', marginTop: '3px' }}>Pesos mexicanos (MXN)</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: '#6B6B6B', marginTop: '2px' }}>por mes · renovación mensual</div>
            </div>
            <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '0.5rem 0', fontSize: '0.9rem', color: '#3D3D3D', borderBottom: '1px solid #E8E2D8', lineHeight: 1.4 }}>
                <span style={{ color: '#1A6B3C', fontWeight: 700, flexShrink: 0 }}>✓</span> Alertas de noticias en tiempo real
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '0.5rem 0', fontSize: '0.9rem', color: '#3D3D3D', borderBottom: '1px solid #E8E2D8', lineHeight: 1.4 }}>
                <span style={{ color: '#1A6B3C', fontWeight: 700, flexShrink: 0 }}>✓</span> Hasta 15 instrumentos a elegir
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '0.5rem 0', fontSize: '0.9rem', color: '#3D3D3D', borderBottom: '1px solid #E8E2D8', lineHeight: 1.4 }}>
                <span style={{ color: '#1A6B3C', fontWeight: 700, flexShrink: 0 }}>✓</span> Alertas inmediatas por evento de mercado
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '0.5rem 0', fontSize: '0.9rem', color: '#3D3D3D', borderBottom: '1px solid #E8E2D8', lineHeight: 1.4 }}>
                <span style={{ color: '#1A6B3C', fontWeight: 700, flexShrink: 0 }}>✓</span> Análisis técnico profesional
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '0.5rem 0', fontSize: '0.9rem', color: '#3D3D3D', borderBottom: '1px solid #E8E2D8', lineHeight: 1.4 }}>
                <span style={{ color: '#1A6B3C', fontWeight: 700, flexShrink: 0 }}>✓</span> Resumen diario detallado
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '0.5rem 0', fontSize: '0.9rem', color: '#3D3D3D', borderBottom: '1px solid #E8E2D8', lineHeight: 1.4 }}>
                <span style={{ color: '#1A6B3C', fontWeight: 700, flexShrink: 0 }}>✓</span> Reportes profesionales avanzados
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: '#F5F1EA', color: '#B5841A', padding: '1px 6px', border: '1px solid #C8C0B0', marginLeft: 'auto', whiteSpace: 'nowrap', flexShrink: 0 }}>Incluido</span>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '0.5rem 0', fontSize: '0.9rem', color: '#3D3D3D', borderBottom: '1px solid #E8E2D8', lineHeight: 1.4 }}>
                <span style={{ color: '#1A6B3C', fontWeight: 700, flexShrink: 0 }}>✓</span> Soporte prioritario 24/7
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '0.5rem 0', fontSize: '0.9rem', color: '#3D3D3D', borderBottom: '1px solid #E8E2D8', lineHeight: 1.4 }}>
                <span style={{ color: '#1A6B3C', fontWeight: 700, flexShrink: 0 }}>✓</span> Acceso anticipado a nuevas señales
              </li>
            </ul>
            <button
              onClick={() => handleSelect('Premium')}
              style={{ width: '100%', padding: '0.85rem', background: '#B5841A', color: '#FDFAF5', border: 'none', fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#8A6010')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#B5841A')}
            >
              Suscribirse al Premium
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
