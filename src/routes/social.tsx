import type { SVGProps } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Send, Facebook, MessageCircle, ArrowUpRight } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "./index";

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
      { title: "Follow Us on Social Media — Apex Forex Academy" },
      { name: "description", content: "Follow Apex Forex Academy on WhatsApp, Instagram, Facebook, TikTok & Telegram for daily Forex signals, market analysis & trading tips." },
      { name: "keywords", content: "Apex Forex Instagram, forex signals Telegram, forex TikTok, forex WhatsApp group Pakistan" },
      { property: "og:title", content: "Follow Apex Forex Academy on Social Media" },
      { property: "og:description", content: "Join our community on WhatsApp, Instagram, Facebook, TikTok and Telegram." },
      { property: "og:url", content: "https://www.apexacademypk.com/social" },
    ],
    links: [{ rel: "canonical", href: "https://www.apexacademypk.com/social" }],
  }),
  component: SocialPage,
});

const platforms = [
  { Icon: MessageCircle, label: "WhatsApp", sub: "Join Community", color: "#25D366", href: "https://wa.me/923166513780" },
  { Icon: Instagram, label: "Instagram", sub: "@apexforexacademy", color: "#E1306C", href: "https://www.instagram.com/apexforexacademy?igsh=MTNyeW5jcThqa29u" },
  { Icon: Facebook, label: "Facebook", sub: "Follow Our Page", color: "#1877F2", href: "https://www.facebook.com/share/1EniqmTA4D/?mibextid=wwXIfr" },
  { Icon: TikTokIcon, label: "TikTok", sub: "Follow Our Clips", color: "#FE2C55", href: "https://www.tiktok.com/@apex.forex.academy?_r=1&_t=ZS-97cK7bAxcAL" },
  { Icon: Send, label: "Telegram", sub: "Join Our Channel", color: "#0088cc", href: "https://t.me/apexforexacademy" },
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
    </>
  );
}
