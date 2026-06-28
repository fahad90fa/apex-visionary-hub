import React, { useEffect, useRef, useState } from "react";

type TVEmbedProps = {
  symbol: string;
  interval: string;
  className?: string;
  children?: React.ReactNode; // fallback content
};

export default function TVEmbed({ symbol, interval, className, children }: TVEmbedProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const host = hostRef.current;
    if (!host) return;
    host.innerHTML = "";

    let cancelled = false;

    const container = document.createElement("div");
    container.className = "tradingview-widget-container";
    container.style.height = "100%";
    container.style.width = "100%";

    const widgetDiv = document.createElement("div");
    widgetDiv.className = "tradingview-widget-container__widget";
    widgetDiv.style.height = "100%";
    widgetDiv.style.width = "100%";
    container.appendChild(widgetDiv);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.onload = () => {
      // if widget does not populate after a short delay, mark failed
      setTimeout(() => {
        if (cancelled) return;
        if (widgetDiv.children.length === 0) setFailed(true);
      }, 600);
    };
    script.onerror = () => {
      if (cancelled) return;
      setFailed(true);
    };

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval,
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      toolbar_bg: "#0a1530",
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      allow_symbol_change: true,
      save_image: false,
      backgroundColor: "rgba(5, 13, 36, 1)",
      gridColor: "rgba(0, 212, 255, 0.06)",
      support_host: "https://www.tradingview.com",
    });

    container.appendChild(script);
    host.appendChild(container);

    const to = setTimeout(() => {
      if (cancelled) return;
      setFailed(true);
    }, 4000);

    return () => {
      cancelled = true;
      clearTimeout(to);
      if (host) host.innerHTML = "";
    };
  }, [symbol, interval]);

  if (failed) {
    return <div className={className}>{children}</div>;
  }

  return <div ref={hostRef} className={className} />;
}
