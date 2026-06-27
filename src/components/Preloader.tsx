import { useEffect, useState } from "react";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const duration = 2400;
    let raf = 0;
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, (elapsed / duration) * 100);
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else {
        setDone(true);
        setTimeout(() => setHidden(true), 600);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-500 ${done ? "opacity-0" : "opacity-100"}`}
      aria-hidden
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.18),transparent_60%)]" />

      <div className="relative flex flex-col items-center gap-8 px-6 text-center">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 animate-pulse-glow rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple grid place-items-center">
            <span className="font-display text-xl font-black text-black">A</span>
          </div>
          <div className="font-display text-2xl sm:text-3xl font-black tracking-[0.2em] text-gradient">
            APEX FOREX
          </div>
        </div>

        <svg width="280" height="60" viewBox="0 0 280 60" className="opacity-80">
          {Array.from({ length: 14 }).map((_, i) => {
            const x = i * 20 + 4;
            const built = (progress / 100) * 14 > i;
            const up = i % 3 !== 0;
            const cy = 30 + Math.sin(i) * 8;
            return built ? (
              <g key={i}>
                <line x1={x + 6} y1={cy - 18} x2={x + 6} y2={cy + 18} stroke={up ? "#00ff88" : "#ff4d6d"} strokeWidth="1" />
                <rect x={x} y={cy - 10} width="12" height="20" fill={up ? "#00ff88" : "#ff4d6d"} opacity="0.85" />
              </g>
            ) : null;
          })}
        </svg>

        <div className="w-72 sm:w-96">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-neon-blue to-neon-green shadow-[0_0_20px_rgba(0,212,255,0.8)] transition-[width] duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between font-sub text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <span>Initializing markets</span>
            <span className="text-neon-blue">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
