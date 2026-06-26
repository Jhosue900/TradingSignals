import { useState, useEffect, useRef, useCallback } from 'react';

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

export function useMarketData() {
  const [data, setData] = useState<MarketData>({
    sp500: { price: null, change: null },
    nasdaq: { price: null, change: null },
    dow: { price: null, change: null },
    btc: { price: null, change: null },
    eth: { price: null, change: null },
    eur: { price: null, change: null },
    mxn: { price: null, change: null },
    gold: { price: null, change: null },
  });
  const [lastUpdate, setLastUpdate] = useState<string>('—');
  const [sidebarStatus, setSidebarStatus] = useState<string>('Actualizando precios...');
  const [tickerItems, setTickerItems] = useState<TickerItem[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const eurRef = useRef<number | null>(null);
  const mxnRef = useRef<number | null>(null);
  const goldRef = useRef<number | null>(null);

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
    setTickerItems(items);
  }, []);

  const markUpdated = useCallback(() => {
    setLastUpdate(
      'Actualizado: ' + new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
    );
    setSidebarStatus('Precios en tiempo real ·');
  }, []);

  const fetchBinance = useCallback(async () => {
    try {
      const url =
        'https://api.binance.com/api/v3/ticker/24hr?symbols=' +
        encodeURIComponent(JSON.stringify(['BTCUSDT', 'ETHUSDT']));
      const arr = await (await fetch(url)).json();
      if (Array.isArray(arr)) {
        const updates: Partial<MarketData> = {};
        arr.forEach((t: { symbol: string; lastPrice: string; priceChangePercent: string }) => {
          const price = parseFloat(t.lastPrice);
          const chg = parseFloat(t.priceChangePercent);
          if (t.symbol === 'BTCUSDT') updates.btc = { price, change: chg };
          if (t.symbol === 'ETHUSDT') updates.eth = { price, change: chg };
        });
        if (Object.keys(updates).length > 0) {
          setData((prev) => {
            const next = { ...prev, ...updates };
            rebuildTicker(next);
            return next;
          });
          markUpdated();
        }
      }
    } catch {
      // silently fail
    }
  }, [markUpdated, rebuildTicker]);

  const fetchForex = useCallback(async () => {
    try {
      const d = await (await fetch('https://open.er-api.com/v6/latest/USD')).json();
      if (d && d.rates) {
        const en = d.rates.EUR as number;
        const mn = d.rates.MXN as number;
        const updates: Partial<MarketData> = {};
        if (eurRef.current === null) {
          eurRef.current = en;
          updates.eur = { price: en, change: 0 };
        } else {
          updates.eur = { price: en, change: ((en - eurRef.current) / eurRef.current) * 100 };
        }
        if (mxnRef.current === null) {
          mxnRef.current = mn;
          updates.mxn = { price: mn, change: 0 };
        } else {
          updates.mxn = { price: mn, change: ((mn - mxnRef.current) / mxnRef.current) * 100 };
        }
        setData((prev) => {
          const next = { ...prev, ...updates };
          rebuildTicker(next);
          return next;
        });
        markUpdated();
      }
    } catch {
      // silently fail
    }
  }, [markUpdated, rebuildTicker]);

  const fetchIndex = useCallback(async (sym: string, key: keyof MarketData) => {
    try {
      const url = `https://stooq.com/q/l/?s=${sym}&f=sd2t2ohlcv&h&e=csv`;
      const text = await (await fetch(url)).text();
      const lines = text.trim().split('\n');
      if (lines.length < 2) return;
      const cols = lines[1].split(',');
      const close = parseFloat(cols[6]);
      const open = parseFloat(cols[3]);
      if (isNaN(close) || isNaN(open)) return;
      const chg = ((close - open) / open) * 100;
      setData((prev) => {
        const next = { ...prev, [key]: { price: close, change: chg } };
        rebuildTicker(next);
        return next;
      });
      markUpdated();
    } catch {
      // silently fail
    }
  }, [markUpdated, rebuildTicker]);

  const fetchGold = useCallback(async () => {
    try {
      const d = await (await fetch('https://api.metals.live/v1/spot')).json();
      if (Array.isArray(d)) {
        const g = d.find((x: { gold?: number }) => x.gold);
        if (g && g.gold) {
          const p = g.gold as number;
          let change = 0;
          if (goldRef.current === null) {
            goldRef.current = p;
          } else {
            change = ((p - goldRef.current) / goldRef.current) * 100;
          }
          setData((prev) => {
            const next = { ...prev, gold: { price: p, change } };
            rebuildTicker(next);
            return next;
          });
          markUpdated();
        }
      }
    } catch {
      // silently fail
    }
  }, [markUpdated, rebuildTicker]);

  const loadAll = useCallback(async () => {
    await Promise.allSettled([
      fetchBinance(),
      fetchForex(),
      fetchGold(),
      fetchIndex('^spx', 'sp500'),
      fetchIndex('^ndq', 'nasdaq'),
      fetchIndex('^dji', 'dow'),
    ]);
  }, [fetchBinance, fetchForex, fetchGold, fetchIndex]);

  // Initial load + interval
  useEffect(() => {
    loadAll();
    const interval = setInterval(loadAll, 30000);
    return () => clearInterval(interval);
  }, [loadAll]);

  // WebSocket BTC/ETH real-time
  useEffect(() => {
    const connectWS = () => {
      const ws = new WebSocket('wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker');
      wsRef.current = ws;
      ws.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data);
          const t = msg.data;
          if (!t) return;
          const price = parseFloat(t.c);
          const chg = parseFloat(t.P);
          const updates: Partial<MarketData> = {};
          if (t.s === 'BTCUSDT') updates.btc = { price, change: chg };
          if (t.s === 'ETHUSDT') updates.eth = { price, change: chg };
          if (Object.keys(updates).length > 0) {
            setData((prev) => {
              const next = { ...prev, ...updates };
              rebuildTicker(next);
              return next;
            });
            markUpdated();
          }
        } catch {
          // ignore
        }
      };
      ws.onclose = () => {
        setTimeout(connectWS, 5000);
      };
    };
    connectWS();
    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, [markUpdated, rebuildTicker]);

  return { data, lastUpdate, sidebarStatus, tickerItems, fmtNum, arrow };
}
