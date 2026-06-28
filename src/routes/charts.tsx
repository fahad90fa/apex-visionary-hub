import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/charts")({
  head: () => ({
    meta: [
      { title: "Live Charts — ApexForex" },
      { name: "description", content: "Live TradingView charts for Gold, Bitcoin, Ethereum, EUR/USD and GBP/USD." },
      { property: "og:title", content: "Live Charts — ApexForex" },
      { property: "og:description", content: "Real-time market charts powered by TradingView." },
    ],
  }),
  component: ChartsPage,
});

type ChartDef = { title: string; symbol: string; id: string };

const CHARTS: ChartDef[] = [
  { title: "XAU/USD — Gold", symbol: "OANDA:XAUUSD", id: "tv_xauusd" },
  { title: "BTC/USD — Bitcoin", symbol: "BINANCE:BTCUSDT", id: "tv_btcusd" },
  { title: "ETH/USD — Ethereum", symbol: "BINANCE:ETHUSDT", id: "tv_ethusd" },
  { title: "EUR/USD — Forex", symbol: "FX:EURUSD", id: "tv_eurusd" },
  { title: "GBP/USD — Forex", symbol: "FX:GBPUSD", id: "tv_gbpusd" },
];

declare global {
  interface Window {
    TradingView?: { widget: new (cfg: Record<string, unknown>) => unknown };
  }
}

function TVChart({ symbol, containerId }: { symbol: string; containerId: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const render = () => {
      if (cancelled || !window.TradingView || !ref.current) return;
      ref.current.innerHTML = "";
      new window.TradingView.widget({
        container_id: containerId,
        symbol,
        interval: "1",
        theme: "dark",
        width: "100%",
        height: 400,
        timezone: "Etc/UTC",
        style: "1",
        locale: "en",
        toolbar_bg: "#0a1530",
        enable_publishing: false,
        hide_top_toolbar: false,
        hide_legend: false,
        allow_symbol_change: true,
        save_image: false,
      });
    };

    if (window.TradingView) {
      render();
    } else {
      const existing = document.querySelector<HTMLScriptElement>('script[src="https://s3.tradingview.com/tv.js"]');
      if (existing) {
        existing.addEventListener("load", render, { once: true });
      } else {
        const s = document.createElement("script");
        s.src = "https://s3.tradingview.com/tv.js";
        s.async = true;
        s.onload = render;
        document.head.appendChild(s);
      }
    }
    return () => { cancelled = true; };
  }, [symbol, containerId]);

  return <div id={containerId} ref={ref} className="h-[400px] w-full" />;
}

function ChartsPage() {
  return (
    <>
      <PageHero
        eyebrow="Markets"
        title="Live Charts"
        subtitle="Real-time TradingView charts across metals, crypto and major FX pairs."
      />
      <section className="relative px-5 pb-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2">
          {CHARTS.map((c) => (
            <div
              key={c.id}
              className="glass overflow-hidden rounded-2xl border border-white/10 p-4 hover-lift"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-base font-bold tracking-wider text-white">
                  {c.title}
                </h3>
                <span className="font-sub text-xs uppercase tracking-[0.2em] text-neon-green">
                  ● Live
                </span>
              </div>
              <TVChart symbol={c.symbol} containerId={c.id} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
