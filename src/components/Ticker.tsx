import { useMarketData } from '../hooks/useMarketData';

export default function Ticker() {
  const { tickerItems, fmtNum } = useMarketData();
  const chgClass = (v: number) => (v >= 0 ? 'up' : 'down');
  const arrow = (v: number) => (v >= 0 ? '▲' : '▼');

  const items = tickerItems.length > 0 ? tickerItems : [
    { name: 'Cargando mercados', price: null, change: 0, prefix: '', decimals: 2 },
  ];

  const doubleItems = [...items, ...items];

  return (
    <div style={{ background: '#1A1A1A', color: '#FDFAF5', padding: '0.5rem 0', overflow: 'hidden', whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif", fontSize: '0.78rem' }}>
      <div className="animate-ticker" style={{ display: 'inline-flex', gap: '2.5rem' }}>
        {doubleItems.map((item, i) => {
          const cls = chgClass(item.change);
          return (
            <span key={`${item.name}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#AAA', letterSpacing: '0.05em' }}>{item.name}</span>
              {item.price !== null ? (
                <span className={cls} style={{ fontWeight: 600 }}>
                  {item.prefix}{fmtNum(item.price, item.decimals)} {arrow(item.change)}{Math.abs(item.change).toFixed(2)}%
                </span>
              ) : (
                <span style={{ color: '#AAA', fontWeight: 600 }}>— — —</span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
