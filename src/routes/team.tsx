import { createFileRoute } from "@tanstack/react-router";
import { Linkedin, Twitter, Send } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "./index";
import { CandlestickBg } from "../components/CandlestickBg";
import adilPic from "../pics/adil.jpeg";
import azeemPic from "../pics/azeem.jpeg";
import hassanPic from "../pics/hassan.jpeg";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — Apex Forex Academy" },
      { name: "description", content: "Meet the elite mentors guiding your trading journey at Apex Forex Academy." },
      { property: "og:title", content: "Meet the Market Experts — Apex Forex" },
      { property: "og:description", content: "Mentor, Portfolio Manager, Portfolio Manager, and Lead Mentor." },
    ],
  }),
  component: TeamPage,
});

const team = [
  { name: "Adil tanveer", role: "Mentor", color: "var(--neon-blue)", bio: "Turning beginners into confident traders with real market experience and smart trading systems.", years: "6+ yrs", tags: ["TechnicalAnalysis", "FundamentalAnalysis", "TradingPsychology"], image: adilPic },
  { name: "MUHAMMAD AZEEM ", role: "Community Manager", color: "var(--neon-green)", bio: "Providing top level support, managing members, and maintaining a high-quality trading environment.", years: "3+ yrs", tags: ["ClientSupport", "SupportTeam", "MemberGrowth"], image: azeemPic },
  { name: "Hassan bilal", role: "Portfolio Manager", color: "var(--neon-purple)", bio: "Delivering steady portfolio growth through high-probability trades and disciplined risk management.", years: "3 yrs", tags: ["AssetManagement", "FundManager", "CapitalManagement"], image: hassanPic },
];

function TeamPage() {
  return (
    <>
      {/* ticker */}
      <div className="fixed top-[72px] z-30 w-full overflow-hidden border-y border-white/5 bg-black/70 py-1.5 backdrop-blur-md">
        <div className="flex w-[200%] animate-ticker gap-10 whitespace-nowrap font-sub text-[11px] uppercase tracking-[0.2em]">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0 gap-10">
              {[["EUR/USD", "1.0924", true], ["GBP/USD", "1.2731", true], ["USD/JPY", "151.84", false], ["AUD/USD", "0.6612", false], ["XAU/USD", "2412.30", true], ["BTC/USD", "68,420", true], ["USD/CAD", "1.3608", false], ["NZD/USD", "0.5984", true]].map(([p, v, up]) => (
                <span key={`${k}-${p}`} className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-white">{p as string}</span>
                  <span className={(up ? "text-neon-green" : "text-destructive")}>{v as string}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 -z-10 opacity-30"><CandlestickBg opacity={0.12} /></div>

      <PageHero
        badge="The Team"
        title={<>Meet the <span className="text-gradient">Market Experts</span></>}
        subtitle="The elite minds guiding your trading journey."
      />

      <section className="relative py-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid gap-7 md:grid-cols-2">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 110}>
                <FlipCard member={m} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function FlipCard({ member }: { member: (typeof team)[number] }) {
  return (
    <div className="group h-[360px] [perspective:1400px]">
      <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* front */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl border border-white/5 bg-[rgba(5,15,40,0.7)] p-8 backdrop-blur-xl [backface-visibility:hidden]"
          style={{ boxShadow: `0 0 0 1px ${member.color}25, 0 20px 60px ${member.color}20` }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--c),transparent_60%)] opacity-20" style={{ ["--c" as string]: member.color }} />
          <div className="relative flex h-full flex-col items-center justify-center text-center">
            <div className="relative">
              <div className="absolute inset-0 -m-2 animate-spin-slow rounded-full border border-dashed" style={{ borderColor: `${member.color}66` }} />
              <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-white/10 shadow-lg" style={{ boxShadow: `0 0 30px ${member.color}66`, backgroundColor: '#000' }}>
                {member.image ? (
                  <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                ) : (
                  <div
                    className="grid h-full w-full place-items-center font-display text-3xl font-black text-white"
                    style={{ background: `linear-gradient(135deg, ${member.color}33, transparent)` }}
                  >
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                )}
              </div>
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold text-white">{member.name}</h3>
            <span
              className="mt-3 inline-flex rounded-full border px-4 py-1.5 font-sub text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ borderColor: `${member.color}55`, color: member.color, background: `${member.color}10` }}
            >
              {member.role}
            </span>
            <p className="mt-6 font-sub text-xs uppercase tracking-[0.25em] text-muted-foreground">Hover to connect</p>
          </div>
        </div>

        {/* back */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl border border-white/5 bg-[rgba(5,15,40,0.85)] p-8 backdrop-blur-xl [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ boxShadow: `0 0 0 1px ${member.color}55, 0 20px 60px ${member.color}33` }}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-xl font-bold text-white">{member.name}</h3>
              <span className="font-display text-sm font-bold" style={{ color: member.color }}>{member.years}</span>
            </div>
            <p className="mt-4 font-sub text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {member.tags.map(t => (
                <span key={t} className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-sub text-[11px] text-white/80">{t}</span>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-5">
              <div className="flex gap-2">
                {[Linkedin, Twitter, Send].map((Icon, i) => (
                  <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-all hover:scale-110" style={{ ["--c" as string]: member.color }} onMouseEnter={e => (e.currentTarget.style.color = member.color, e.currentTarget.style.boxShadow = `0 0 18px ${member.color}66`)} onMouseLeave={e => (e.currentTarget.style.color = "", e.currentTarget.style.boxShadow = "")}>
                    <Icon size={15} />
                  </a>
                ))}
              </div>
              <a href="#" className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-sub text-[11px] font-bold uppercase tracking-[0.2em] text-black" style={{ background: member.color, boxShadow: `0 0 20px ${member.color}88` }}>
                Connect
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
