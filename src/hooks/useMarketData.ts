import { useState, useEffect, useCallback } from 'react';

export interface MarketData {
  sp500: { price: number | null; change: number | null };
  nasdaq: { price: number | null; change: number | null };
  dow: { price: number | null; change: number | null };
  btc: { price: number | null; change: number | null };
  eth: { price: number | null; change: number | null };
  eur: { price: number | null; change: number | null };
  mxn: { price: number | null; change: number | null };
  gold: { price: number | null; change: number | null };
}

export interface TickerItem {
  name: string;
  price: number | null;
  change: number;
  prefix: string;
  decimals: number;
}

// 📌 DATOS ESTÁTICOS DE MOCK (Sin llamadas a red)
const MOCK_DATA: MarketData = {
  sp500: { price: 5050.25, change: 0.45 },
  nasdaq: { price: 16100.50, change: 0.82 },
  dow: { price: 38900.10, change: -0.12 },
  btc: { price: 63500.00, change: 2.15 },
  eth: { price: 3450.00, change: 1.20 },
  eur: { price: 1.0850, change: 0.05 },
  mxn: { price: 16.75, change: -0.30 },
  gold: { price: 2350.80, change: 0.65 },
};

export function useMarketData() {
  const [data] = useState<MarketData>(MOCK_DATA);
  const [lastUpdate] = useState<string>('Modo Desarrollo (Estático)');
  const [sidebarStatus] = useState<string>('Precios pausados (Dev) ·');
  const [tickerItems, setTickerItems] = useState<TickerItem[]>([]);

  const fmtNum = (n: number | null, dec = 2): string => {
    if (n == null || isNaN(n)) return '—';
    if (n >= 1000) return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
    return n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  };

  const arrow = (v: number) => (v >= 0 ? '▲' : '▼');

  const rebuildTicker = useCallback((currentData: MarketData) => {
    const items: TickerItem[] = [];
    if (currentData.sp500.price !== null) items.push({ name: 'S&P 500', price: currentData.sp500.price, change: currentData.sp500.change ?? 0, prefix: '', decimals: 0 });
    if (currentData.nasdaq.price !== null) items.push({ name: 'NASDAQ', price: currentData.nasdaq.price, change: currentData.nasdaq.change ?? 0, prefix: '', decimals: 0 });
    if (currentData.dow.price !== null) items.push({ name: 'DOW JONES', price: currentData.dow.price, change: currentData.dow.change ?? 0, prefix: '', decimals: 0 });
    if (currentData.btc.price !== null) items.push({ name: 'BTC/USD', price: currentData.btc.price, change: currentData.btc.change ?? 0, prefix: '$', decimals: 0 });
    if (currentData.eth.price !== null) items.push({ name: 'ETH/USD', price: currentData.eth.price, change: currentData.eth.change ?? 0, prefix: '$', decimals: 2 });
    if (currentData.eur.price !== null) items.push({ name: 'EUR/USD', price: currentData.eur.price, change: currentData.eur.change ?? 0, prefix: '', decimals: 4 });
    if (currentData.mxn.price !== null) items.push({ name: 'USD/MXN', price: currentData.mxn.price, change: currentData.mxn.change ?? 0, prefix: '', decimals: 2 });
    if (currentData.gold.price !== null) items.push({ name: 'ORO', price: currentData.gold.price, change: currentData.gold.change ?? 0, prefix: '$', decimals: 2 });
    setTickerItems(items);
  }, []);

  // Carga inicial del Ticker usando únicamente los datos falsos sin usar red ni intervalos
  useEffect(() => {
    rebuildTicker(MOCK_DATA);
  }, [rebuildTicker]);

  return { data, lastUpdate, sidebarStatus, tickerItems, fmtNum, arrow };
}