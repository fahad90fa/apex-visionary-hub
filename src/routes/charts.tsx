import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import TVEmbed from "@/components/TVEmbed";

export const Route = createFileRoute("/charts")({
  head: () => ({
    meta: [
      { title: "Live Forex Charts — Gold, Silver, BTC, EUR/USD | Apex Forex Academy" },
      { name: "description", content: "Live TradingView charts for Gold (XAUUSD), Silver, Bitcoin, Ethereum, EUR/USD & GBP/USD. Real-time market analysis by Apex Forex Academy Pakistan." },
      { name: "keywords", content: "live forex charts, XAUUSD live chart, gold price chart, silver chart, EURUSD chart, GBPUSD chart, BTC chart, TradingView charts" },
      { property: "og:title", content: "Live Forex Charts — Apex Forex Academy" },
      { property: "og:description", content: "Real-time Gold, Silver, Crypto & Forex charts powered by TradingView." },
      { property: "og:url", content: "https://www.apexacademypk.com/charts" },
    ],
    links: [{ rel: "canonical", href: "https://www.apexacademypk.com/charts" }],
  }),
  component: ChartsPage,
});

type ChartDef = { title: string; symbol: string };

const CHARTS: ChartDef[] = [
  { title: "XAU/USD — Gold", symbol: "XAUUSD" },
  { title: "XAG/USD — Silver", symbol: "TVC:SILVER" },
  { title: "BTC/USD — Bitcoin", symbol: "BINANCE:BTCUSDT" },
  { title: "ETH/USD — Ethereum", symbol: "BINANCE:ETHUSDT" },
  { title: "EUR/USD — Forex", symbol: "FX:EURUSD" },
  { title: "GBP/USD — Forex", symbol: "FX:GBPUSD" },
];

const INTERVALS = [
  { label: "1m", value: "1" },
  { label: "5m", value: "5" },
  { label: "15m", value: "15" },
  { label: "30m", value: "30" },
  { label: "1H", value: "60" },
  { label: "4H", value: "240" },
  { label: "1D", value: "D" },
  { label: "1W", value: "W" },
];

function TVChart({ symbol, interval }: { symbol: string; interval: string }) {
  const points = [18, 32, 24, 42, 37, 58, 55, 63, 60, 72, 68, 86];
  const width = 320;
  const height = 180;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const stepX = width / (points.length - 1);
  const path = points
    .map((point, index) => {
      const x = index * stepX;
      const y = height - ((point - min) / (max - min || 1)) * (height - 20) - 10;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <TVEmbed symbol={symbol} interval={interval} className="h-[420px] w-full">
      <div className="relative h-[420px] w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#071227] to-[#08143a] p-4">
        <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-wide text-white/60">
          <span>{symbol}</span>
          <span>{interval}</span>
        </div>
        <svg viewBox={`0 0 ${width} ${height}`} className="h-[280px] w-full">
          <rect x="0" y="0" width={width} height={height} rx="16" fill="rgba(255,255,255,0.03)" />
          {[0, 1, 2, 3].map((line) => (
            <line key={line} x1={0} y1={20 + line * 35} x2={width} y2={20 + line * 35} stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
          ))}
          <path d={path} fill="none" stroke="#00d4ff" strokeWidth={3} strokeLinecap="round" />
          <path d={`${path} L ${width} ${height} L 0 ${height} Z`} fill="url(#gradient)" opacity={0.16} />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#071227" />
            </linearGradient>
          </defs>
        </svg>
        <div className="mt-4 rounded-lg border border-neon-blue/20 bg-neon-blue/10 px-3 py-2 text-sm text-neon-blue">
          Market data is currently unavailable. This preview is a local chart placeholder until live connectivity is restored.
        </div>
      </div>
    </TVEmbed>
  );
}

function ChartsPage() {
  const [interval, setInterval] = useState("1");

  return (
    <>
      <PageHero
        badge="Markets"
        title="Live Charts"
        subtitle="Real-time TradingView charts across metals, crypto and major FX pairs."
      />

      <section className="relative px-5 pb-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
            <div>
              <p className="font-sub text-xs uppercase tracking-[0.25em] text-neon-blue">Interval</p>
              <p className="font-display text-sm text-white/70">Apply timeframe to all charts</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {INTERVALS.map((i) => {
                const active = i.value === interval;
                return (
                  <button
                    key={i.value}
                    onClick={() => setInterval(i.value)}
                    className={`rounded-lg border px-3 py-1.5 font-sub text-xs font-bold uppercase tracking-wider transition-all ${
                      active
                        ? "border-neon-blue bg-neon-blue/15 text-neon-blue shadow-[0_0_18px_rgba(0,212,255,0.45)]"
                        : "border-white/10 bg-white/5 text-white/70 hover:border-neon-blue/40 hover:text-white"
                    }`}
                  >
                    {i.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {CHARTS.map((c) => (
              <div key={c.symbol} className="glass overflow-hidden rounded-2xl border border-white/10 p-4 hover-lift">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-display text-base font-bold tracking-wider text-white">{c.title}</h3>
                  <span className="font-sub text-xs uppercase tracking-[0.2em] text-neon-green">● Live</span>
                </div>
                <TVChart symbol={c.symbol} interval={interval} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
