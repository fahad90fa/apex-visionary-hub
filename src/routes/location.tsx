import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "./index";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "Location — Apex Forex Academy" },
      { name: "description", content: "Visit Apex Forex Academy in Dubai. Address, hours, and contact details." },
      { property: "og:title", content: "Visit Apex Forex" },
      { property: "og:description", content: "Our doors are open — experience elite trading education firsthand." },
    ],
  }),
  component: LocationPage,
});

const items = [
  { Icon: MapPin, color: "var(--neon-blue)", label: "Office Address", value: "14F, Skyline Financial Tower, Dubai Marina, United Arab Emirates" },
  { Icon: Phone, color: "var(--neon-green)", label: "Phone Number", value: "+971 4 555 0188" },
  { Icon: Mail, color: "var(--neon-purple)", label: "Email Address", value: "hello@apexforexacademy.com" },
  { Icon: Clock, color: "var(--gold)", label: "Office Hours", value: "Monday – Saturday · 9:00 AM – 6:00 PM" },
];

const pairs = ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD", "XAU/USD", "USD/CAD"];

function LocationPage() {
  return (
    <>
      <PageHero
        badge="Visit Us"
        title={<>Visit <span className="text-gradient">Apex Forex Academy</span></>}
        subtitle="Our doors are open — come experience elite trading education firsthand."
      />

      <section className="relative overflow-hidden py-12">
        <div className="absolute inset-0 grid-bg opacity-25" />
        {pairs.map((p, i) => (
          <span
            key={p}
            className="pointer-events-none absolute font-display text-5xl font-black tracking-widest text-neon-blue/[0.06] sm:text-7xl"
            style={{ left: `${(i * 37) % 80 + 5}%`, top: `${(i * 53) % 80 + 10}%`, transform: `rotate(${i * 7 - 15}deg)`, animation: `float-y ${10 + i}s ease-in-out infinite` }}
          >
            {p}
          </span>
        ))}

        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1.4fr_1fr] lg:px-8">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-neon-blue/40 via-transparent to-neon-purple/40 blur-xl" />
              <div className="relative aspect-[16/12] overflow-hidden rounded-3xl border border-neon-blue/40 bg-[#020818]">
                {[
                  "left-3 top-3 border-l-2 border-t-2",
                  "right-3 top-3 border-r-2 border-t-2",
                  "left-3 bottom-3 border-l-2 border-b-2",
                  "right-3 bottom-3 border-r-2 border-b-2",
                ].map(c => <span key={c} className={`absolute z-20 h-8 w-8 border-neon-blue ${c}`} />)}

                {/* dark map mock */}
                <div className="absolute inset-0 grid-bg opacity-50" />
                <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
                  <defs>
                    <pattern id="streets" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M0 20 H40 M20 0 V40" stroke="rgba(0,212,255,0.08)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="400" height="300" fill="url(#streets)" />
                  <path d="M20,180 Q120,140 180,160 T380,140" stroke="rgba(0,212,255,0.5)" strokeWidth="2" fill="none" />
                  <path d="M0,80 L140,90 L220,60 L400,90" stroke="rgba(182,109,255,0.4)" strokeWidth="1.5" fill="none" />
                  <path d="M60,260 L180,230 L260,250 L380,220" stroke="rgba(0,255,136,0.35)" strokeWidth="1.5" fill="none" />
                  <circle cx="80" cy="120" r="2" fill="#a0b4c8" />
                  <circle cx="320" cy="200" r="2" fill="#a0b4c8" />
                  <circle cx="260" cy="100" r="2" fill="#a0b4c8" />
                </svg>

                {/* pin */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute inset-0 -m-1 rounded-full bg-neon-blue/50" style={{ animation: "pulse-ring 2.2s ease-out infinite" }} />
                  <span className="absolute inset-0 -m-1 rounded-full bg-neon-blue/50" style={{ animation: "pulse-ring 2.2s ease-out infinite 1.1s" }} />
                  <div className="relative grid h-10 w-10 place-items-center rounded-full border-2 border-neon-blue bg-black shadow-[0_0_24px_#00d4ff]">
                    <MapPin size={18} className="text-neon-blue" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between rounded-xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-md">
                  <div>
                    <div className="font-sub text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Apex HQ</div>
                    <div className="font-display text-sm font-bold text-white">Dubai Marina, UAE</div>
                  </div>
                  <span className="rounded-full bg-neon-green/15 px-3 py-1 font-sub text-[10px] font-bold uppercase tracking-[0.2em] text-neon-green">Open Now</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="glass rounded-3xl p-6 sm:p-7">
              <h2 className="font-display text-xl font-bold">Contact Details</h2>
              <ul className="mt-6 space-y-4">
                {items.map(it => (
                  <li
                    key={it.label}
                    className="group flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all"
                    style={{ ["--c" as string]: it.color }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${it.color}55`, e.currentTarget.style.boxShadow = `0 0 22px ${it.color}26`)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "", e.currentTarget.style.boxShadow = "")}
                  >
                    <div
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition-transform group-hover:scale-110"
                      style={{ borderColor: `${it.color}55`, background: `${it.color}15`, boxShadow: `0 0 18px ${it.color}40` }}
                    >
                      <it.Icon size={18} style={{ color: it.color }} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-sub text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: it.color }}>{it.label}</div>
                      <div className="mt-1 font-sub text-sm text-white">{it.value}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
