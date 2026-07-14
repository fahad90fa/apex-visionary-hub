import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { Flame, TrendingUp, Globe, Clock, AlertTriangle, Loader2, RefreshCw } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { getTradingNews, type NewsItem } from "../lib/news.functions";

const newsQuery = queryOptions({
  queryKey: ["trading-news"],
  queryFn: () => getTradingNews(),
  staleTime: 60_000,
  refetchInterval: 5 * 60_000,
});

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Live Forex News & Economic Calendar — Apex Forex Academy" },
      { name: "description", content: "Live high & medium impact Forex news from ForexFactory, real-time FX rates and economic calendar for Pakistani traders. Updated every 5 minutes." },
      { name: "keywords", content: "forex news, forex factory news, economic calendar, live FX rates, high impact news, forex news Pakistan" },
      { property: "og:title", content: "Live Forex News & Economic Calendar — Apex Forex Academy" },
      { property: "og:description", content: "High & medium impact economic events and live FX rates for Forex traders." },
      { property: "og:url", content: "https://www.apexacademypk.com/news" },
    ],
    links: [{ rel: "canonical", href: "https://www.apexacademypk.com/news" }],
  }),
  loader: ({ context }) => { context.queryClient.ensureQueryData(newsQuery); },
  component: NewsPage,
});

function NewsPage() {
  return (
    <>
      <PageHero
        badge="Live Market Intel"
        title={<>Trading <span className="text-gradient">News</span> & Live Rates</>}
        subtitle="High & medium impact economic events from ForexFactory, paired with real-time FX rates."
      />
      <section className="relative px-5 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Suspense fallback={<LoadingState />}>
            <NewsContent />
          </Suspense>
        </div>
      </section>
    </>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-24 text-neon-blue">
      <Loader2 className="h-8 w-8 animate-spin" />
      <span className="ml-3 font-sub text-sm uppercase tracking-[0.25em]">Loading market data…</span>
    </div>
  );
}

function NewsContent() {
  const { data, refetch, isFetching } = useSuspenseQuery(newsQuery);
  const high = data.news.filter(n => n.impact === "High");
  const medium = data.news.filter(n => n.impact === "Medium");

  return (
    <div className="space-y-12">
      {/* Rates Ticker */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-neon-green/10 text-neon-green">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white">Live FX Rates</h2>
              <p className="font-sub text-xs text-muted-foreground">
                {data.rates ? `Base ${data.rates.base} • ${data.rates.date}` : data.errors.rates ?? "Unavailable"}
              </p>
            </div>
          </div>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-2 rounded-full border border-neon-blue/40 bg-neon-blue/5 px-4 py-2 font-sub text-xs font-bold uppercase tracking-[0.2em] text-neon-blue hover:bg-neon-blue/10 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>
        {data.rates && (
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {Object.entries(data.rates.rates).map(([code, rate]) => (
              <div key={code} className="rounded-xl border border-white/5 bg-black/40 p-3 text-center">
                <div className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {data.rates!.base}/{code}
                </div>
                <div className="mt-1 font-display text-lg font-bold text-neon-blue">{rate.toFixed(4)}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* High Impact */}
      <NewsSection
        title="High Impact"
        icon={<Flame className="h-5 w-5" />}
        color="red"
        items={high}
        empty="No high-impact events this week."
        error={data.errors.news}
      />

      {/* Medium Impact */}
      <NewsSection
        title="Medium Impact"
        icon={<TrendingUp className="h-5 w-5" />}
        color="amber"
        items={medium}
        empty="No medium-impact events this week."
        error={data.errors.news}
      />

      <p className="text-center font-sub text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        Sources: ForexFactory · Fixer.io · Updated {new Date(data.fetchedAt).toLocaleTimeString()}
      </p>
    </div>
  );
}

function NewsSection({
  title, icon, color, items, empty, error,
}: {
  title: string;
  icon: React.ReactNode;
  color: "red" | "amber";
  items: NewsItem[];
  empty: string;
  error?: string;
}) {
  const palette = color === "red"
    ? { text: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", glow: "shadow-[0_0_24px_rgba(239,68,68,0.25)]" }
    : { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", glow: "shadow-[0_0_24px_rgba(245,158,11,0.2)]" };

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <div className={`grid h-10 w-10 place-items-center rounded-lg ${palette.bg} ${palette.text} ${palette.glow}`}>
          {icon}
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-white">{title} Events</h2>
          <p className="font-sub text-xs text-muted-foreground">{items.length} scheduled this week</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-300">
          <AlertTriangle className="h-4 w-4" /> {error}
        </div>
      )}

      {items.length === 0 && !error ? (
        <p className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-6 text-center font-sub text-sm text-muted-foreground">
          {empty}
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
          <div className="grid grid-cols-[110px_60px_1fr_80px_80px] gap-3 border-b border-white/5 bg-black/40 px-4 py-3 font-sub text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground sm:grid-cols-[160px_80px_1fr_100px_100px]">
            <span>When</span><span>CCY</span><span>Event</span><span className="text-right">Forecast</span><span className="text-right">Previous</span>
          </div>
          {items.map((n, i) => (
            <div
              key={i}
              className="group grid grid-cols-[110px_60px_1fr_80px_80px] items-center gap-3 border-b border-white/5 px-4 py-3 transition-colors hover:bg-white/[0.03] last:border-0 sm:grid-cols-[160px_80px_1fr_100px_100px]"
            >
              <div className="flex items-center gap-2 font-sub text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{new Date(n.date).toLocaleString([], { weekday: "short", hour: "2-digit", minute: "2-digit" })}</span>
              </div>
              <span className={`inline-flex w-fit items-center rounded-md ${palette.bg} px-2 py-0.5 font-display text-[11px] font-bold ${palette.text}`}>
                {n.country}
              </span>
              <span className="truncate font-sub text-sm text-white">{n.title}</span>
              <span className="text-right font-display text-sm text-neon-blue">{n.forecast || "—"}</span>
              <span className="text-right font-display text-sm text-muted-foreground">{n.previous || "—"}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
