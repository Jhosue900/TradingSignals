import { useState, useEffect, useRef, useCallback } from 'react';

const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const GOLD_API_KEY = import.meta.env.VITE_GOLDAPI_API_KEY;

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
    if (currentData.gold.price !== null) items.push({ name: 'ORO', price: currentData.gold.price, change: currentData.gold.change ?? 0, prefix: '$', decimals: 2 });
    setTickerItems(items);
  }, []);

  const markUpdated = useCallback(() => {
    setLastUpdate(
      'Actualizado: ' + new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
    );
    setSidebarStatus('Precios en tiempo real ·');
  }, []);

  // ── Binance: BTC / ETH (REST fallback, el WS ya cubre el tiempo real) ──
  const fetchBinance = useCallback(async () => {
    try {
      const url =
        'https://api.binance.com/api/v3/ticker/24hr?symbols=' +
        encodeURIComponent(JSON.stringify(['BTCUSDT', 'ETHUSDT']));
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Binance ${res.status}`);
      const arr = await res.json();
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
    } catch (err) {
      console.error('[fetchBinance]', err);
    }
  }, [markUpdated, rebuildTicker]);

  // ── Forex: EUR/USD y USD/MXN ──
  const fetchForex = useCallback(async () => {
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!res.ok) throw new Error(`Forex ${res.status}`);
      const d = await res.json();
      if (d && d.rates) {
        const en = d.rates.EUR as number;
        const mn = d.rates.MXN as number;
        const updates: Partial<MarketData> = {};

        if (eurRef.current === null) {
          eurRef.current = en;
          updates.eur = { price: en, change: 0 };
        } else {
          updates.eur = { price: en, change: ((en - eurRef.current) / eurRef.current) * 100 };
          eurRef.current = en;
        }

        if (mxnRef.current === null) {
          mxnRef.current = mn;
          updates.mxn = { price: mn, change: 0 };
        } else {
          updates.mxn = { price: mn, change: ((mn - mxnRef.current) / mxnRef.current) * 100 };
          mxnRef.current = mn;
        }

        setData((prev) => {
          const next = { ...prev, ...updates };
          rebuildTicker(next);
          return next;
        });
        markUpdated();
      }
    } catch (err) {
      console.error('[fetchForex]', err);
    }
  }, [markUpdated, rebuildTicker]);

  // ── Índices (S&P500, Nasdaq, Dow) vía Finnhub, usando ETFs proxy ──
  // Finnhub bloquea los índices puros (^GSPC/^NDX/^DJI) detrás de un plan
  // pago, pero SPY/QQQ/DIA (los ETFs que los replican) sí están incluidos
  // en el free tier. El % de cambio (dp) es prácticamente idéntico al del
  // índice real, que es lo que usamos para el ticker.
  const fetchIndices = useCallback(async () => {
    if (!FINNHUB_API_KEY || FINNHUB_API_KEY.startsWith('TU_API_KEY')) {
      console.warn('[fetchIndices] Falta configurar FINNHUB_API_KEY');
      return;
    }
    try {
      const proxies: { symbol: string; key: keyof MarketData; multiplier: number }[] = [
        { symbol: 'SPY', key: 'sp500', multiplier: 10 },   // SPY ≈ S&P 500 / 10
        { symbol: 'QQQ', key: 'nasdaq', multiplier: 41 },  // QQQ ≈ Nasdaq 100 / 41 (aprox)
        { symbol: 'DIA', key: 'dow', multiplier: 100 },    // DIA ≈ Dow Jones / 100
      ];

      const results = await Promise.all(
        proxies.map(async (p) => {
          const url = `https://finnhub.io/api/v1/quote?symbol=${p.symbol}&token=${FINNHUB_API_KEY}`;
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Finnhub ${p.symbol} ${res.status}`);
          const q = await res.json();
          return { ...p, quote: q as { c?: number; dp?: number } };
        })
      );

      const updates: Partial<MarketData> = {};
      for (const r of results) {
        const close = r.quote?.c;
        const changePct = r.quote?.dp;
        if (close == null || isNaN(close) || close === 0) continue;
        updates[r.key] = {
          price: close * r.multiplier,
          change: changePct != null && !isNaN(changePct) ? changePct : 0,
        };
      }

      if (Object.keys(updates).length > 0) {
        setData((prev) => {
          const next = { ...prev, ...updates };
          rebuildTicker(next);
          return next;
        });
        markUpdated();
      }
    } catch (err) {
      console.error('[fetchIndices]', err);
    }
  }, [markUpdated, rebuildTicker]);

  // ── Oro vía GoldAPI ──
  const fetchGold = useCallback(async () => {
    if (!GOLD_API_KEY || GOLD_API_KEY.startsWith('TU_API_KEY')) {
      console.warn('[fetchGold] Falta configurar GOLD_API_KEY');
      return;
    }
    try {
      const res = await fetch('https://www.goldapi.io/api/XAU/USD', {
        headers: {
          'x-access-token': GOLD_API_KEY,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error(`GoldAPI ${res.status}`);
      const d = await res.json();
      const p = d?.price as number | undefined;
      if (p != null && !isNaN(p)) {
        let change = 0;
        if (goldRef.current === null) {
          goldRef.current = p;
        } else {
          change = ((p - goldRef.current) / goldRef.current) * 100;
          goldRef.current = p;
        }
        setData((prev) => {
          const next = { ...prev, gold: { price: p, change } };
          rebuildTicker(next);
          return next;
        });
        markUpdated();
      }
    } catch (err) {
      console.error('[fetchGold]', err);
    }
  }, [markUpdated, rebuildTicker]);

  const loadAll = useCallback(async () => {
    await Promise.allSettled([fetchBinance(), fetchForex(), fetchGold(), fetchIndices()]);
  }, [fetchBinance, fetchForex, fetchGold, fetchIndices]);

  // Carga inicial + refresco periódico.
  // Finnhub permite 60 req/min en el free tier (acá usamos 3 por ciclo para
  // los índices, más el resto), así que 30s da mucho margen. GoldAPI sí
  // tiene un límite diario más bajo — si te quedás sin cupo ahí, subí el
  // intervalo o cacheá el oro por más tiempo que el resto.
  useEffect(() => {
    loadAll();
    const interval = setInterval(loadAll, 30000);
    return () => clearInterval(interval);
  }, [loadAll]);

  // ── WebSocket BTC/ETH en tiempo real (Binance) ──
  useEffect(() => {
    let cancelled = false;
    let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

    const connectWS = () => {
      const ws = new WebSocket(
        'wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker'
      );
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
        } catch (err) {
          console.error('[ws.onmessage]', err);
        }
      };

      ws.onerror = () => {
        // El objeto Event de un error de WebSocket no trae detalle útil
        // (por diseño del navegador), así que solo dejamos un aviso corto.
        // Si el socket ya está cerrando/cerrado, es ruido esperado — lo ignoramos.
        if (ws.readyState === WebSocket.CLOSING || ws.readyState === WebSocket.CLOSED) return;
        console.warn('[ws] error de conexión, se reintentará automáticamente');
      };

      ws.onclose = () => {
        if (!cancelled) {
          reconnectTimeout = setTimeout(connectWS, 5000);
        }
      };
    };

    connectWS();

    return () => {
      cancelled = true;
      if (reconnectTimeout) clearTimeout(reconnectTimeout);

      const ws = wsRef.current;
      if (!ws) return;

      // Desconectamos TODOS los handlers antes de cerrar. Si dejamos
      // onerror/onmessage enchufados, cualquier frame (p. ej. un ping)
      // que llegue mientras el socket termina de cerrarse dispara esos
      // callbacks sobre un componente ya desmontado — eso es lo que
      // generaba el "Ping received after close" en consola.
      const silence = () => {
        ws.onopen = null;
        ws.onmessage = null;
        ws.onerror = null;
        ws.onclose = null;
      };

      if (ws.readyState === WebSocket.OPEN) {
        silence();
        ws.close();
      } else if (ws.readyState === WebSocket.CONNECTING) {
        // Todavía conectando: esperamos a que abra y lo cerramos sin reconectar,
        // pero sin dejar ningún handler activo.
        ws.onopen = () => {
          silence();
          ws.close();
        };
        ws.onerror = () => silence();
      }
      // Si ya está CLOSING o CLOSED no hace falta hacer nada más.
    };
  }, [markUpdated, rebuildTicker]);

  return { data, lastUpdate, sidebarStatus, tickerItems, fmtNum, arrow };
}