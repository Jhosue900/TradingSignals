import { useMarketData } from '../hooks/useMarketData';

export default function Hero() {
  const { data, lastUpdate, sidebarStatus, fmtNum } = useMarketData();
  const chgClass = (v: number | null) => (v == null ? '' : v >= 0 ? 'up' : 'down');
  const arrow = (v: number | null) => (v == null ? '' : v >= 0 ? '▲' : '▼');

  const marketItems = [
    { label: 'S&P 500', key: 'sp500' as const, decimals: 0, prefix: '' },
    { label: 'NASDAQ', key: 'nasdaq' as const, decimals: 0, prefix: '' },
    { label: 'DOW JONES', key: 'dow' as const, decimals: 0, prefix: '' },
    { label: 'BTC / USD', key: 'btc' as const, decimals: 0, prefix: '$' },
    { label: 'ETH / USD', key: 'eth' as const, decimals: 2, prefix: '$' },
    { label: 'ORO (oz)', key: 'gold' as const, decimals: 2, prefix: '$' },
    { label: 'EUR / USD', key: 'eur' as const, decimals: 4, prefix: '' },
    { label: 'USD / MXN', key: 'mxn' as const, decimals: 2, prefix: '' },
  ];

  return (
    <div id="hero" style={{ background: '#FDFAF5', borderBottom: '1px solid #C8C0B0', display: 'grid', gridTemplateColumns: '1fr 340px', gap: 0, maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ padding: '3rem 2.5rem', borderRight: '1px solid #C8C0B0' }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B5841A', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'inline-block', width: '20px', height: '1px', background: '#B5841A' }} />
          Análisis de Mercados
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)', fontWeight: 700, lineHeight: 1.18, letterSpacing: '-0.02em', color: '#1A1A1A', marginBottom: '1.25rem' }}>
          La información correcta,<br />en el momento que importa.
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#3D3D3D', lineHeight: 1.7, marginBottom: '1.75rem', fontWeight: 300, maxWidth: '560px', borderLeft: '3px solid #B5841A', paddingLeft: '1rem', fontStyle: 'italic' }}>
          Cada movimiento del mercado comienza con una noticia. Nuestro sistema monitorea, filtra y te alerta antes de que el mercado reaccione.
        </p>
        <div style={{ fontSize: '0.95rem', color: '#3D3D3D', lineHeight: 1.8, marginBottom: '2rem', columns: '2', columnGap: '1.75rem' }}>
          <p>Los operadores profesionales no toman decisiones en el vacío. Cada posición que abren está respaldada por información macroeconómica, noticias corporativas y eventos geopolíticos que mueven los precios.</p>
          <p>TradingSignals entrega esa inteligencia directamente a tu correo, acompañada de reportes analíticos redactados por especialistas, para que cada operación sea una decisión informada.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="#planes" style={{ background: '#B5841A', color: '#FDFAF5', border: 'none', padding: '0.75rem 1.75rem', fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.background = '#8A6010')} onMouseLeave={(e) => (e.currentTarget.style.background = '#B5841A')}>Ver suscripciones</a>
          <a href="#reportes" style={{ background: 'transparent', color: '#1A1A1A', border: '1.5px solid #1A1A1A', padding: '0.73rem 1.5rem', fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', transition: 'all 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.color = '#FDFAF5'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1A1A1A'; }}>Conocer los reportes</a>
        </div>
      </div>
      <div style={{ padding: '2.5rem 1.75rem', background: '#F5F1EA' }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.67rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B6B6B', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '2px solid #1A1A1A' }}>Mercados al cierre</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', color: '#6B6B6B', marginBottom: '0.5rem' }}>{sidebarStatus}</div>
        <ul style={{ listStyle: 'none' }}>
          {marketItems.map((item) => {
            const m = data[item.key];
            const price = m?.price;
            const chg = m?.change;
            return (
              <li key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0.7rem 0', borderBottom: '1px solid #E8E2D8', fontFamily: "'Inter', sans-serif", fontSize: '0.82rem' }}>
                <span style={{ color: '#3D3D3D' }}>{item.label}</span>
                <span>
                  <span style={{ fontWeight: 600, color: '#1A1A1A' }}>
                    {price !== null ? item.prefix + fmtNum(price, item.decimals) : '—'}
                  </span>
                  <span className={chgClass(chg)} style={{ fontSize: '0.75rem', fontWeight: 500 }}>
                    {chg !== null ? `${arrow(chg)}${Math.abs(chg).toFixed(2)}%` : ' —'}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', color: '#6B6B6B', marginTop: '0.5rem' }}>{lastUpdate}</div>
        <hr style={{ border: 'none', borderTop: '1px solid #C8C0B0', margin: '1.5rem 0' }} />
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontStyle: 'italic', color: '#1A1A1A', lineHeight: 1.55, borderLeft: '3px solid #B5841A', paddingLeft: '0.9rem' }}>
          "En los mercados financieros, el que tiene la información primero, tiene la ventaja."
        </p>
        <p style={{ fontSize: '0.75rem', color: '#6B6B6B', fontStyle: 'italic', lineHeight: 1.5, marginTop: '1.25rem' }}>
          Precios en tiempo real vía APIs públicas. No constituyen asesoría de inversión.
        </p>
      </div>
    </div>
  );
}
