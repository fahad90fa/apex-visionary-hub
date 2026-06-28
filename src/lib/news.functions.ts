import { createServerFn } from "@tanstack/react-start";

export type NewsItem = {
  title: string;
  country: string;
  date: string; // ISO
  impact: "High" | "Medium" | "Low" | "Holiday";
  forecast: string;
  previous: string;
};

export type FixerRates = {
  base: string;
  date: string;
  timestamp: number;
  rates: Record<string, number>;
};

export type NewsPayload = {
  news: NewsItem[];
  rates: FixerRates | null;
  fetchedAt: string;
  errors: { news?: string; rates?: string };
};

function pick(xml: string, tag: string): string {
  const m = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
  if (!m) return "";
  return m[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim();
}

function parseFFXml(xml: string): NewsItem[] {
  const events = xml.match(/<event>[\s\S]*?<\/event>/gi) ?? [];
  const items: NewsItem[] = [];
  for (const ev of events) {
    const impactRaw = pick(ev, "impact");
    const impact = (impactRaw || "Low") as NewsItem["impact"];
    if (impact !== "High" && impact !== "Medium") continue;
    const dateStr = pick(ev, "date");
    const timeStr = pick(ev, "time");
    let iso = "";
    try {
      // Date like "12-28-2026", time like "8:30am" or "All Day"
      const [mo, da, yr] = dateStr.split("-");
      const safeTime = /am|pm/i.test(timeStr) ? timeStr : "12:00am";
      iso = new Date(`${yr}-${mo}-${da} ${safeTime} UTC`).toISOString();
    } catch {
      iso = new Date().toISOString();
    }
    items.push({
      title: pick(ev, "title"),
      country: pick(ev, "country"),
      date: iso,
      impact,
      forecast: pick(ev, "forecast"),
      previous: pick(ev, "previous"),
    });
  }
  return items.sort((a, b) => +new Date(a.date) - +new Date(b.date));
}

export const getTradingNews = createServerFn({ method: "GET" }).handler(async (): Promise<NewsPayload> => {
  const errors: NewsPayload["errors"] = {};
  let news: NewsItem[] = [];
  let rates: FixerRates | null = null;

  try {
    const res = await fetch("https://nfs.faireconomy.media/ff_calendar_thisweek.xml", {
      headers: { "User-Agent": "Mozilla/5.0 ApexForexAcademy" },
    });
    if (!res.ok) throw new Error(`ForexFactory ${res.status}`);
    const xml = await res.text();
    news = parseFFXml(xml);
  } catch (e) {
    errors.news = e instanceof Error ? e.message : "Failed to fetch news";
  }

  try {
    const key = process.env.FIXER_API_KEY;
    if (!key) throw new Error("FIXER_API_KEY missing");
    const res = await fetch(
      `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,GBP,JPY,AUD,CAD,CHF,NZD,CNY`,
    );
    const json = (await res.json()) as {
      success: boolean;
      base?: string;
      date?: string;
      timestamp?: number;
      rates?: Record<string, number>;
      error?: { info?: string };
    };
    if (!json.success || !json.rates) throw new Error(json.error?.info ?? "Fixer error");
    rates = {
      base: json.base ?? "EUR",
      date: json.date ?? "",
      timestamp: json.timestamp ?? 0,
      rates: json.rates,
    };
  } catch (e) {
    errors.rates = e instanceof Error ? e.message : "Failed to fetch rates";
  }

  return { news, rates, fetchedAt: new Date().toISOString(), errors };
});
