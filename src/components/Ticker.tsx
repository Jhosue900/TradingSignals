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
    <div className="bg-ink text-[#FDFAF5] py-2 overflow-hidden whitespace-nowrap font-sans text-xs sm:text-sm">
      <div className="animate-ticker inline-flex gap-6 sm:gap-10">
        {doubleItems.map((item, i) => {
          const cls = chgClass(item.change);
          return (
            <span key={`${item.name}-${i}`} className="inline-flex items-center gap-2">
              <span className="text-[#AAA] tracking-wide">{item.name}</span>
              {item.price !== null ? (
                <span className={`${cls} font-semibold`}>
                  {item.prefix}{fmtNum(item.price, item.decimals)} {arrow(item.change)}{Math.abs(item.change).toFixed(2)}%
                </span>
              ) : (
                <span className="text-[#AAA] font-semibold">— — —</span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}