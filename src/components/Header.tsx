import { useMemo } from 'react';

export default function Header() {
  const today = useMemo(() => {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const hoy = new Date();
    return dias[hoy.getDay()] + ', ' + hoy.getDate() + ' de ' + meses[hoy.getMonth()] + ' de ' + hoy.getFullYear();
  }, []);

  return (
    <header style={{ background: '#FDFAF5', borderBottom: '3px double #1A1A1A', padding: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 2.5rem', borderBottom: '1px solid #C8C0B0', fontFamily: "'Inter', sans-serif", fontSize: '0.73rem', color: '#6B6B6B' }}>
        <span>Edición digital · México</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="tel:+5296199677288" style={{ color: '#6B6B6B', textDecoration: 'none' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#B5841A')} onMouseLeave={(e) => (e.currentTarget.style.color = '#6B6B6B')}>📞 +52 961 996 7728</a>
          <a href="tel:+525538944850" style={{ color: '#6B6B6B', textDecoration: 'none' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#B5841A')} onMouseLeave={(e) => (e.currentTarget.style.color = '#6B6B6B')}>📞 +52 553 894 4850</a>
        </div>
        <span>{today}</span>
      </div>
      <div style={{ textAlign: 'center', padding: '1.25rem 2.5rem 1rem' }}>
        <div style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif", fontSize: 'clamp(2.4rem, 6vw, 4rem)', fontWeight: 700, letterSpacing: '-0.01em', color: '#1A1A1A', lineHeight: 1 }}>
          Trading<span style={{ color: '#B5841A' }}>Signals</span>
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6B6B6B', marginTop: '0.35rem' }}>
          Inteligencia de Mercados · Señales Profesionales en Tiempo Real
        </div>
      </div>
      <nav style={{ display: 'flex', justifyContent: 'center', gap: 0, borderTop: '1px solid #C8C0B0' }}>
        <a href="#hero" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', color: '#3D3D3D', padding: '0.55rem 1.4rem', borderRight: '1px solid #C8C0B0', transition: 'background 0.15s, color 0.15s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.color = '#FDFAF5'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#FDFAF5'; e.currentTarget.style.color = '#3D3D3D'; }}>Inicio</a>
        <a href="#planes" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', color: '#3D3D3D', padding: '0.55rem 1.4rem', borderRight: '1px solid #C8C0B0', transition: 'background 0.15s, color 0.15s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.color = '#FDFAF5'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#FDFAF5'; e.currentTarget.style.color = '#3D3D3D'; }}>Suscripciones</a>
        <a href="#reportes" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', color: '#3D3D3D', padding: '0.55rem 1.4rem', borderRight: '1px solid #C8C0B0', transition: 'background 0.15s, color 0.15s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.color = '#FDFAF5'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#FDFAF5'; e.currentTarget.style.color = '#3D3D3D'; }}>Reportes</a>
        <a href="#como" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', color: '#3D3D3D', padding: '0.55rem 1.4rem', borderRight: '1px solid #C8C0B0', transition: 'background 0.15s, color 0.15s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.color = '#FDFAF5'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#FDFAF5'; e.currentTarget.style.color = '#3D3D3D'; }}>Cómo funciona</a>
        <a href="#registro" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', background: '#B5841A', color: '#FDFAF5', padding: '0.55rem 1.4rem', borderRight: '1px solid #C8C0B0', transition: 'background 0.15s, color 0.15s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#8A6010'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#B5841A'; }}>Suscribirme ahora</a>
      </nav>
    </header>
  );
}
