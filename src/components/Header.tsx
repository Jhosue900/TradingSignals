import { useMemo, useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const today = useMemo(() => {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const hoy = new Date();
    return `${dias[hoy.getDay()]}, ${hoy.getDate()} de ${meses[hoy.getMonth()]} de ${hoy.getFullYear()}`;
  }, []);

  const navItems = [
    { href: '#hero', label: 'Inicio' },
    { href: '#planes', label: 'Suscripciones' },
    { href: '#reportes', label: 'Reportes' },
    { href: '#como', label: 'Cómo funciona' },
    { href: '#registro', label: 'Suscribirme ahora', accent: true },
  ];

  return (
    <header style={{ background: '#FDFAF5', borderBottom: '3px double #1A1A1A' }}>

      {/* Barra superior */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 24px',
        borderBottom: '1px solid #C8C0B0',
        fontSize: '11px',
        color: '#6B6B6B',
        flexWrap: 'wrap',
        gap: '4px',
      }}>
        <span>Edición digital · México</span>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {/* {['+52 961 996 7728', '+52 553 894 4850'].map((phone) => (
            <a
              key={phone}
              href={`tel:+${phone.replace(/\D/g, '')}`}
              style={{ color: '#6B6B6B', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#B5841A')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6B6B6B')}
            >
              📞 {phone}
            </a>
          ))} */}

          {['+52 553 103 9219'].map((phone) => (
            <a
              key={phone}
              href={`tel:+${phone.replace(/\D/g, '')}`}
              style={{ color: '#6B6B6B', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#B5841A')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6B6B6B')}
            >
              📞 {phone}
            </a>
          ))}
        </div>
        <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }}>{today}</span>
      </div>

      {/* Logo */}
      <div style={{ textAlign: 'center', padding: 'clamp(16px, 3vw, 28px) 16px' }}>
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(28px, 6vw, 48px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          color: '#1A1A1A',
        }}>
          Trading<span style={{ color: '#B5841A' }}>Signals</span>
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: '#6B6B6B',
          marginTop: '6px',
        }}>
          Inteligencia de Mercados · Señales Profesionales en Tiempo Real
        </div>
      </div>

      {/* Nav */}
      <nav style={{ borderTop: '1px solid #C8C0B0', position: 'relative' }}>

        {/* Botón hamburguesa – solo visible en móvil con CSS */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Menú de navegación"
          style={{
            display: 'none', // ocultado por defecto; el CSS de tu proyecto lo muestra en móvil
            width: '100%',
            padding: '10px',
            background: '#FDFAF5',
            border: 'none',
            borderBottom: '1px solid #C8C0B0',
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#1A1A1A',
            cursor: 'pointer',
          }}
          className="ts-hamburger"
        >
          {menuOpen ? '✕ Cerrar' : '☰ Menú'}
        </button>

        <div
          className={menuOpen ? 'ts-nav-open' : 'ts-nav-closed'}
          style={{ display: 'flex', flexWrap: 'wrap' }}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                flex: '1 1 auto',
                textAlign: 'center',
                padding: '10px 8px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '10px',
                fontWeight: item.accent ? 700 : 600,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                textDecoration: 'none',
                borderRight: '1px solid #C8C0B0',
                color: item.accent ? '#fff' : '#4A4A4A',
                background: item.accent ? '#B5841A' : '#FDFAF5',
                transition: 'background 0.15s, color 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = item.accent ? '#8A6010' : '#1A1A1A';
                e.currentTarget.style.color = '#FDFAF5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = item.accent ? '#B5841A' : '#FDFAF5';
                e.currentTarget.style.color = item.accent ? '#fff' : '#4A4A4A';
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}