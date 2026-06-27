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
    <section id="hero" className="bg-[#FDFAF5] border-b border-[#C8C0B0] grid grid-cols-1 lg:grid-cols-[1fr_340px] max-w-1100 mx-auto">
      {/* Columna principal */}
      <div className="px-5 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12 border-r-0 lg:border-r border-[#C8C0B0]">
        <div className="flex items-center gap-2 text-accent text-[0.6rem] sm:text-[0.7rem] font-bold uppercase tracking-[0.18em] mb-4">
          <span className="w-5 h-px bg-accent"></span>
          Análisis de Mercados
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.18] tracking-[-0.02em] text-ink mb-5">
          La información correcta,<br />en el momento que importa.
        </h1>
        <p className="text-base sm:text-lg text-ink-mid leading-relaxed mb-6 font-light max-w-[560px] border-l-3 border-accent pl-4 italic">
          Cada movimiento del mercado comienza con una noticia. Nuestro sistema monitorea, filtra y te alerta antes de que el mercado reaccione.
        </p>
        <div className="text-sm sm:text-base text-ink-mid leading-relaxed mb-6 columns-1 sm:columns-2 gap-6">
          <p>Los operadores profesionales no toman decisiones en el vacío. Cada posición que abren está respaldada por información macroeconómica, noticias corporativas y eventos geopolíticos que mueven los precios.</p>
          <p>TradingSignals entrega esa inteligencia directamente a tu correo, acompañada de reportes analíticos redactados por especialistas, para que cada operación sea una decisión informada.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="#planes" className="bg-accent text-white px-5 sm:px-7 py-3 font-sans text-sm font-semibold uppercase tracking-wide hover:bg-accent-dk transition-colors">
            Ver suscripciones
          </a>
          <a href="#reportes" className="border-2 border-ink text-ink px-5 sm:px-7 py-3 font-sans text-sm font-medium uppercase tracking-wide hover:bg-ink hover:text-[#FDFAF5] transition-all">
            Conocer los reportes
          </a>
        </div>
      </div>

      {/* Sidebar de mercados */}
      <div className="bg-paper px-4 sm:px-6 py-6 sm:py-8 lg:py-10 order-first lg:order-last">
        <div className="font-sans text-[0.6rem] sm:text-[0.67rem] font-bold uppercase tracking-[0.2em] text-[#6B6B6B] mb-4 pb-2 border-b-2 border-ink">
          Mercados al cierre
        </div>
        <div className="font-sans text-[0.6rem] sm:text-[0.72rem] text-[#6B6B6B] mb-2">{sidebarStatus}</div>
        <ul className="space-y-1">
          {marketItems.map((item) => {
            const m = data[item.key];
            const price = m?.price;
            const chg = m?.change;
            return (
              <li key={item.key} className="flex justify-between items-baseline py-2 border-b border-[#E8E2D8] font-sans text-sm">
                <span className="text-ink-mid">{item.label}</span>
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-ink">
                    {price !== null ? item.prefix + fmtNum(price, item.decimals) : '—'}
                  </span>
                  <span className={`${chgClass(chg)} text-xs font-medium`}>
                    {chg !== null ? `${arrow(chg)}${Math.abs(chg).toFixed(2)}%` : ' —'}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
        <div className="font-sans text-[0.6rem] sm:text-[0.68rem] text-[#6B6B6B] mt-3">{lastUpdate}</div>
        <hr className="border-t border-[#C8C0B0] my-6" />
        <blockquote className="font-serif text-base sm:text-lg italic text-ink leading-relaxed border-l-3 border-accent pl-3">
          "En los mercados financieros, el que tiene la información primero, tiene la ventaja."
        </blockquote>
        <p className="text-xs text-[#6B6B6B] italic mt-5">
          Precios en tiempo real vía APIs públicas. No constituyen asesoría de inversión.
        </p>
      </div>
    </section>
  );
}