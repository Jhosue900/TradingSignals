import { useMarketData } from '../hooks/useMarketData';

const MARKET_ITEMS = [
  { label: 'S&P 500',   key: 'sp500'  as const, decimals: 0, prefix: ''  },
  { label: 'NASDAQ',    key: 'nasdaq' as const, decimals: 0, prefix: ''  },
  { label: 'DOW JONES', key: 'dow'    as const, decimals: 0, prefix: ''  },
  { label: 'BTC / USD', key: 'btc'    as const, decimals: 0, prefix: '$' },
  { label: 'ETH / USD', key: 'eth'    as const, decimals: 2, prefix: '$' },
  { label: 'ORO (oz)',  key: 'gold'   as const, decimals: 2, prefix: '$' },
  { label: 'EUR / USD', key: 'eur'    as const, decimals: 4, prefix: ''  },
  { label: 'USD / MXN', key: 'mxn'    as const, decimals: 2, prefix: ''  },
];

export default function Hero() {
  const { data, lastUpdate, sidebarStatus, fmtNum } = useMarketData();

  const chgColor = (v: number | null) =>
    v == null ? '#4A4A4A' : v >= 0 ? '#1a7a3c' : '#a33333';
  const arrow = (v: number | null) =>
    v == null ? '' : v >= 0 ? '▲' : '▼';

  return (
    <section id="hero" style={{ borderBottom: '1px solid #C8C0B0' }}>
      <style>{`
        .ts-hero-grid {
          display: grid;
          grid-template-columns: 1fr 260px;
          background: #FDFAF5;
        }
        @media (max-width: 640px) {
          .ts-hero-grid {
            grid-template-columns: 1fr;
          }
          .ts-hero-sidebar {
            order: -1;
            border-right: none !important;
            border-bottom: 1px solid #C8C0B0;
          }
          .ts-hero-body-cols {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div className="ts-hero-grid">

        {/* Columna principal */}
        <div style={{
          padding: 'clamp(20px, 4vw, 48px)',
          borderRight: '1px solid #C8C0B0',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#B5841A',
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            marginBottom: '14px',
            fontFamily: "'Inter', sans-serif",
          }}>
            <span style={{ width: '20px', height: '1px', background: '#B5841A', display: 'block' }} />
            Análisis de Mercados
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(22px, 4vw, 36px)',
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '-0.02em',
            color: '#1A1A1A',
            marginBottom: '16px',
          }}>
            La información correcta,<br />en el momento que importa.
          </h1>

          <p style={{
            fontSize: '14px',
            color: '#4A4A4A',
            lineHeight: 1.7,
            marginBottom: '16px',
            borderLeft: '3px solid #B5841A',
            paddingLeft: '14px',
            fontStyle: 'italic',
          }}>
            Cada movimiento del mercado comienza con una noticia. Nuestro sistema monitorea, filtra y te alerta antes de que el mercado reaccione.
          </p>

          <div
            className="ts-hero-body-cols"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              fontSize: '13px',
              color: '#6B6B6B',
              lineHeight: 1.7,
              marginBottom: '24px',
            }}
          >
            <p>Los operadores profesionales no toman decisiones en el vacío. Cada posición está respaldada por información macroeconómica, noticias corporativas y eventos geopolíticos que mueven los precios.</p>
            <p>TradingSignals entrega esa inteligencia directamente a tu correo, acompañada de reportes analíticos redactados por especialistas, para que cada operación sea una decisión informada.</p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a
              href="#planes"
              style={{
                background: '#B5841A',
                color: '#fff',
                padding: '11px 22px',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                fontFamily: "'Inter', sans-serif",
                transition: 'background 0.15s',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#8A6010')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#B5841A')}
            >
              Ver suscripciones
            </a>
            <a
              href="#reportes"
              style={{
                border: '2px solid #1A1A1A',
                color: '#1A1A1A',
                padding: '11px 22px',
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                fontFamily: "'Inter', sans-serif",
                transition: 'all 0.15s',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.color = '#FDFAF5'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1A1A1A'; }}
            >
              Conocer los reportes
            </a>
          </div>
        </div>

        {/* Sidebar de mercados */}
        <div
          className="ts-hero-sidebar"
          style={{ background: '#F5F1EA', padding: 'clamp(16px, 3vw, 28px) 16px' }}
        >
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '9px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#6B6B6B',
            borderBottom: '2px solid #1A1A1A',
            paddingBottom: '8px',
            marginBottom: '10px',
          }}>
            Mercados al cierre
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#6B6B6B', marginBottom: '8px' }}>
            {sidebarStatus}
          </div>
          <ul style={{ listStyle: 'none' }}>
            {MARKET_ITEMS.map((item) => {
              const m = data[item.key];
              const price = m?.price ?? null;
              const chg = m?.change ?? null;
              return (
                <li key={item.key} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  padding: '7px 0',
                  borderBottom: '1px solid #E8E2D8',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                }}>
                  <span style={{ color: '#4A4A4A' }}>{item.label}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 600, color: '#1A1A1A' }}>
                      {price !== null ? `${item.prefix}${fmtNum(price, item.decimals)}` : '—'}
                    </span>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: chgColor(chg) }}>
                      {chg !== null ? `${arrow(chg)}${Math.abs(chg).toFixed(2)}%` : '—'}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#6B6B6B', marginTop: '10px' }}>
            {lastUpdate}
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #C8C0B0', margin: '16px 0' }} />
          <blockquote style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '13px',
            fontStyle: 'italic',
            color: '#1A1A1A',
            lineHeight: 1.55,
            borderLeft: '3px solid #B5841A',
            paddingLeft: '10px',
          }}>
            "En los mercados financieros, el que tiene la información primero, tiene la ventaja."
          </blockquote>
          <p style={{ fontSize: '10px', color: '#6B6B6B', marginTop: '10px' }}>
            Precios indicativos vía APIs públicas. No constituyen asesoría de inversión.
          </p>
        </div>

      </div>
    </section>
  );
}