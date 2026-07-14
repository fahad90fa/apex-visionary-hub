import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "./index";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "Visit Us in Gujranwala, Pakistan — Apex Forex Academy" },
      { name: "description", content: "Visit Apex Forex Academy at Plot 44-45 Mumtaz Market, Gujranwala, Pakistan. Phone +92 316 6513780. Open Mon–Sat 9AM–6PM. Get directions on Google Maps." },
      { name: "keywords", content: "forex academy Gujranwala, forex trading academy near me, Apex Forex location, forex academy Mumtaz Market, forex course Pakistan address" },
      { property: "og:title", content: "Visit Apex Forex Academy — Gujranwala, Pakistan" },
      { property: "og:description", content: "Our doors are open in Gujranwala — experience elite Forex trading education in person." },
      { property: "og:url", content: "https://www.apexacademypk.com/location" },
    ],
    links: [{ rel: "canonical", href: "https://www.apexacademypk.com/location" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://www.apexacademypk.com/#localbusiness",
        name: "Apex Forex Academy",
        image: "https://www.apexacademypk.com/logo.png",
        url: "https://www.apexacademypk.com/",
        telephone: "+92-316-6513780",
        email: "apexforex0@gmail.com",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Plot Number 44-45, Mumtaz Market",
          addressLocality: "Gujranwala",
          addressRegion: "Punjab",
          postalCode: "52250",
          addressCountry: "PK",
        },
        geo: { "@type": "GeoCoordinates", latitude: 32.1877, longitude: 74.1945 },
        openingHoursSpecification: [{
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "18:00",
        }],
        hasMap: "https://www.google.com/maps/place/Forex+Trading+Academy+%7C+Apex+Forex+Trading+Academy",
      }),
    }],
  }),
  component: LocationPage,
});

const items = [
  { Icon: MapPin, color: "var(--neon-blue)", label: "Office Address", value: "Plot Number 44 45 Mumtaz Market Gujranwala, Pakistan" },
  { Icon: Phone, color: "var(--neon-green)", label: "Phone Number", value: "+92 3166513780" },
  { Icon: Mail, color: "var(--neon-purple)", label: "Email Address", value: "apexforex0@gmail.com" },
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
            <a
              href="https://www.google.com/maps/place/Forex+Trading+Academy+%7C+Apex+Forex+Trading+Academy+%7C+Forex+Trading+Course+near+Gujranwala+%7C+Forex+trading/data=!4m2!3m1!1s0x0:0xf98e8b0378baa157?sa=X&ved=1t:2428&ictx=111&cshid=1783603530019561"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block group"
              aria-label="Open Apex Forex Academy on Google Maps"
            >
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-neon-blue/40 via-transparent to-neon-purple/40 blur-xl" />
              <div className="relative aspect-[16/12] overflow-hidden rounded-3xl border border-neon-blue/40 bg-[#020818] cursor-pointer transition-transform group-hover:scale-[1.01]">
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
                    <div className="font-display text-sm font-bold text-white">Pakistan, Gujranwala</div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-neon-green/15 px-3 py-1 font-sub text-[10px] font-bold uppercase tracking-[0.2em] text-neon-green transition-all group-hover:bg-neon-green/25">
                    <span className="h-1.5 w-1.5 rounded-full bg-neon-green shadow-[0_0_8px_#00ff88]" />
                    Open Now · View on Maps
                  </span>
                </div>
              </div>
            </a>
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
