import { useEffect, useRef } from "react";

export function CandlestickBg({ opacity = 0.18 }: { opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0;
    let offset = 0;
    const candleW = 14;
    const gap = 6;

    type C = { open: number; close: number; high: number; low: number };
    let candles: C[] = [];
    let price = 100;

    const newCandle = (): C => {
      const open = price;
      const change = (Math.random() - 0.5) * 8;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 3;
      const low = Math.min(open, close) - Math.random() * 3;
      price = close;
      return { open, close, high, low };
    };

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const need = Math.ceil(w / (candleW + gap)) + 4;
      candles = Array.from({ length: need }, newCandle);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // sine wave line
      ctx.beginPath();
      ctx.strokeStyle = `rgba(0, 255, 136, ${opacity * 1.2})`;
      ctx.lineWidth = 1.5;
      for (let x = 0; x <= w; x += 4) {
        const y = h / 2 + Math.sin((x + offset * 2) * 0.012) * 30 + Math.sin((x + offset) * 0.03) * 12;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // candles
      const min = Math.min(...candles.map(c => c.low));
      const max = Math.max(...candles.map(c => c.high));
      const range = max - min || 1;
      const padY = 40;
      const usableH = h - padY * 2;

      candles.forEach((c, i) => {
        const x = i * (candleW + gap) - (offset % (candleW + gap));
        const yOpen = padY + ((max - c.open) / range) * usableH;
        const yClose = padY + ((max - c.close) / range) * usableH;
        const yHigh = padY + ((max - c.high) / range) * usableH;
        const yLow = padY + ((max - c.low) / range) * usableH;
        const up = c.close >= c.open;
        const color = up ? `rgba(0, 255, 136, ${opacity})` : `rgba(255, 77, 109, ${opacity})`;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + candleW / 2, yHigh);
        ctx.lineTo(x + candleW / 2, yLow);
        ctx.stroke();
        const top = Math.min(yOpen, yClose);
        const ht = Math.max(2, Math.abs(yClose - yOpen));
        ctx.fillRect(x, top, candleW, ht);
      });

      offset += 0.3;
      if (offset > candleW + gap) {
        offset -= candleW + gap;
        candles.shift();
        candles.push(newCandle());
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [opacity]);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />;
}
