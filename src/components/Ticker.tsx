import { useMarketData } from '../hooks/useMarketData';

export default function Ticker() {
  const { tickerItems, fmtNum } = useMarketData();

  const items = tickerItems.length > 0 ? tickerItems : [
    { name: 'Cargando mercados', price: null, change: 0, prefix: '', decimals: 2 },
  ];

  const doubled = [...items, ...items];

  return (
    <div style={{
      background: '#1A1A1A',
      color: '#FDFAF5',
      padding: '8px 0',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      fontSize: '11px',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div
        style={{
          display: 'inline-flex',
          gap: '28px',
          animation: 'ts-ticker 30s linear infinite',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = 'paused')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = 'running')}
      >
        <style>{`
          @keyframes ts-ticker {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
        {doubled.map((item, i) => (
          <span key={`${item.name}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#999', letterSpacing: '0.04em' }}>{item.name}</span>
            {item.price !== null ? (
              <span style={{
                color: item.change >= 0 ? '#5ecb8a' : '#e07070',
                fontWeight: 600,
              }}>
                {item.prefix}{fmtNum(item.price, item.decimals)}{' '}
                {item.change >= 0 ? '▲' : '▼'}{Math.abs(item.change).toFixed(2)}%
              </span>
            ) : (
              <span style={{ color: '#999', fontWeight: 600 }}>— — —</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}