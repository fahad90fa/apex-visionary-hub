import type { SVGProps } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Send, Facebook, MessageCircle, Youtube, Heart, MessageSquare, Share2, ArrowUpRight } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { Reveal, SectionTitle } from "./index";

const TikTokIcon = ({ size = 24, color = "#FE2C55" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z"
      fill={color}
    />
  </svg>
);

export const Route = createFileRoute("/social")({
  head: () => ({
    meta: [
      { title: "Social — Apex Forex Academy" },
      { name: "description", content: "Connect with Apex Forex Academy on Instagram, Telegram, TikTok, Facebook, and WhatsApp." },
      { property: "og:title", content: "Connect With Us — Apex Forex" },
      { property: "og:description", content: "Follow our journey and join the community across all platforms." },
    ],
  }),
  component: SocialPage,
});

const platforms = [
  { Icon: Instagram, label: "Instagram", sub: "@apexforexacademy", color: "#E1306C", href: "https://www.instagram.com/apexforexacademy?igsh=MTNyeW5jcThqa29u" },
  { Icon: Send, label: "Telegram", sub: "Join Our Channel", color: "#0088cc", href: "https://t.me/apexforexacademy" },
  { Icon: TikTokIcon, label: "TikTok", sub: "Follow Our Clips", color: "#FE2C55", href: "https://www.tiktok.com/@apex.forex.academy?_r=1&_t=ZS-97cK7bAxcAL" },
  { Icon: Youtube, label: "YouTube", sub: "Watch Our Videos", color: "#FF0000", href: "https://www.youtube.com/@apexforexacademy" },
  { Icon: Facebook, label: "Facebook", sub: "Follow Our Page", color: "#1877F2", href: "https://www.facebook.com/share/1EniqmTA4D/?mibextid=wwXIfr" },
  { Icon: MessageCircle, label: "WhatsApp", sub: "Join Community", color: "#25D366", href: "https://wa.me/923166513780" },
];

const feed = [
  { platform: "Instagram", Icon: Instagram, color: "#E1306C", text: "EUR/USD breakdown from this morning's live session. Clean rejection at supply, 1:4 RR runner closed.", likes: 1248, comments: 89, shares: 42 },
  { platform: "Telegram", Icon: Send, color: "#0088cc", text: "Today's signal pack is live in the channel. 3 setups across FX majors with full risk plans.", likes: 642, comments: 51, shares: 88 },
  { platform: "TikTok", Icon: TikTokIcon, color: "#FE2C55", text: "New 60-second breakdown: how pros read order flow before a breakout. Watch now.", likes: 3420, comments: 178, shares: 312 },
];

function SocialPage() {
  return (
    <>
      <PageHero
        badge="Stay Connected"
        title={<>Connect <span className="text-gradient">With Us</span></>}
        subtitle="Follow our journey and join the Apex Forex community across all platforms."
      />

      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {platforms.map((p, i) => (
              <Reveal key={p.label} delay={i * 80}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-2xl border border-white/5 bg-[rgba(5,15,40,0.6)] p-7 text-center backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.04]"
                  style={{ ["--c" as string]: p.color }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 24px 60px ${p.color}55, 0 0 0 1px ${p.color}77`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `radial-gradient(circle at 50% 0%, ${p.color}33, transparent 60%)` }} />
                  <div
                    className="relative mx-auto grid h-20 w-20 place-items-center rounded-2xl border transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                    style={{ borderColor: `${p.color}55`, background: `${p.color}15`, boxShadow: `0 0 24px ${p.color}55` }}
                  >
                    <p.Icon size={36} style={{ color: p.color }} />
                  </div>
                  <h3 className="relative mt-5 font-display text-lg font-bold text-white">{p.label}</h3>
                  <p className="relative mt-1 font-sub text-xs text-muted-foreground">{p.sub}</p>
                  <span className="relative mt-4 inline-flex items-center gap-1 font-sub text-[11px] font-bold uppercase tracking-[0.22em] opacity-0 transition-opacity group-hover:opacity-100" style={{ color: p.color }}>
                    Visit Now <ArrowUpRight size={12} />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle eyebrow="Community" title={<>Latest From Our <span className="text-gradient">Community</span></>} />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {feed.map((f, i) => (
              <Reveal key={f.platform} delay={i * 110}>
                <article
                  className="group h-full overflow-hidden rounded-2xl border border-white/5 bg-[rgba(5,15,40,0.6)] backdrop-blur-xl transition-all hover:-translate-y-1.5"
                  style={{ ["--c" as string]: f.color }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 24px 60px ${f.color}40, 0 0 0 1px ${f.color}66`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div className="absolute inset-0 animate-shimmer" style={{ background: `linear-gradient(90deg, transparent, ${f.color}33, transparent)`, backgroundSize: "200% 100%" }} />
                    <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 30%, ${f.color}55, transparent 60%)` }} />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border bg-black/60 px-3 py-1 font-sub text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur" style={{ borderColor: `${f.color}66`, color: f.color }}>
                      <f.Icon size={12} /> {f.platform}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="font-sub text-sm leading-relaxed text-white/90">{f.text}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 font-sub text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Heart size={13} /> {f.likes.toLocaleString()}</span>
                      <span className="flex items-center gap-1.5"><MessageSquare size={13} /> {f.comments}</span>
                      <span className="flex items-center gap-1.5"><Share2 size={13} /> {f.shares}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
