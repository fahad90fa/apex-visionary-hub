import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Users, Briefcase, Trophy } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { Reveal, SectionTitle } from "./index";

export const Route = createFileRoute("/vision")({
  head: () => ({
    meta: [
      { title: "Vision — Apex Forex Academy" },
      { name: "description", content: "Our vision: building the next generation of elite global traders through education, community, and discipline." },
      { property: "og:title", content: "Our Vision — Apex Forex" },
      { property: "og:description", content: "Democratizing institutional-grade trading education." },
    ],
  }),
  component: VisionPage,
});

const pillars = [
  { Icon: GraduationCap, title: "Education Excellence", text: "Institutional-grade curriculum built by traders who've sat the desk.", color: "var(--neon-blue)" },
  { Icon: Users, title: "Community & Support", text: "A global circle of serious traders, mentors, and accountability partners.", color: "var(--neon-green)" },
  { Icon: Briefcase, title: "Real-World Application", text: "Live execution, prop firm pathways, and real capital — not theory.", color: "var(--neon-purple)" },
  { Icon: Trophy, title: "Financial Freedom", text: "Independence built on discipline, edge, and consistent profitable habits.", color: "var(--gold)" },
];

const milestones = [
  { year: "2019", title: "Academy Founded", text: "Apex launches with 12 students in a private mentorship pilot.", color: "var(--neon-blue)" },
  { year: "2021", title: "First 1,000 Students", text: "The first thousand traders complete the core program.", color: "var(--neon-green)" },
  { year: "2023", title: "International Expansion", text: "Mentors and students across 28 countries.", color: "var(--neon-purple)" },
  { year: "2025", title: "5,000+ Traders Trained", text: "Crossing the milestone with a 95% retention rate.", color: "var(--gold)" },
  { year: "Next", title: "The Future", text: "AI co-pilots, prop desk launches, and a global trader pipeline.", color: "var(--neon-blue)" },
];

function VisionPage() {
  return (
    <>
      <PageHero
        badge="Our Vision"
        title={<>Building the next generation of <span className="text-gradient">elite global traders</span></>}
        subtitle="Democratizing professional trading education — building a worldwide community of disciplined, profitable traders."
      />

      {/* Statement + globe */}
      <section className="relative py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div>
              <p className="font-display text-2xl font-bold leading-snug sm:text-3xl">
                <span className="text-gradient">Financial freedom</span> shouldn't be reserved for the few who happened to know the right people.
              </p>
              <div className="mt-6 space-y-4 font-sub text-base leading-relaxed text-muted-foreground">
                <p>
                  Apex exists to put institutional-grade Forex education in the hands of anyone willing to do the work. We believe trading is a craft — built through reps, mentorship, and disciplined risk — not a shortcut.
                </p>
                <p>
                  Our students don't graduate as gamblers chasing setups. They graduate as <span className="text-white">elite operators</span> — calm under fire, surgical with risk, and connected to a global community that holds the line with them.
                </p>
                <p>
                  This is the trader we're building. This is the future we're funding.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.25),transparent_60%)] blur-2xl" />
              <div className="absolute inset-0 animate-spin-slow rounded-full border border-neon-blue/30" />
              <div className="absolute inset-4 animate-spin-slow rounded-full border border-dashed border-neon-purple/30" style={{ animationDirection: "reverse", animationDuration: "40s" }} />
              <div className="absolute inset-10 rounded-full border border-neon-blue/40 bg-[radial-gradient(circle_at_30%_30%,rgba(0,212,255,0.4),rgba(0,0,0,0.9))] shadow-[inset_0_0_60px_rgba(0,212,255,0.4),0_0_80px_rgba(0,212,255,0.4)]">
                <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full opacity-60">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <ellipse key={`h${i}`} cx="100" cy="100" rx="92" ry={92 - i * 11} fill="none" stroke="rgba(0,212,255,0.35)" strokeWidth="0.4" />
                  ))}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <ellipse key={`v${i}`} cx="100" cy="100" rx={92 - Math.abs(i - 6) * 14} ry="92" fill="none" stroke="rgba(0,212,255,0.25)" strokeWidth="0.4" />
                  ))}
                </svg>
                {[
                  { x: "30%", y: "38%" }, { x: "55%", y: "30%" }, { x: "70%", y: "55%" }, { x: "40%", y: "65%" }, { x: "60%", y: "70%" }, { x: "25%", y: "55%" },
                ].map((p, i) => (
                  <span key={i} className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-green shadow-[0_0_12px_#00ff88]" style={{ left: p.x, top: p.y }}>
                    <span className="absolute inset-0 rounded-full bg-neon-green" style={{ animation: `pulse-ring 2.4s ease-out infinite ${i * 0.4}s` }} />
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle eyebrow="Pillars" title={<>The Four <span className="text-gradient">Pillars</span></>} subtitle="The foundations of every trader we build." />

          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-neon-blue/40 to-transparent lg:block" />
            <div className="grid gap-8 lg:grid-cols-4">
              {pillars.map((p, i) => (
                <Reveal key={p.title} delay={i * 100}>
                  <div className="text-center">
                    <div
                      className="relative mx-auto grid h-24 w-24 place-items-center rounded-2xl border-2"
                      style={{ borderColor: p.color, background: `${p.color}15`, boxShadow: `0 0 28px ${p.color}55` }}
                    >
                      <p.Icon size={32} style={{ color: p.color }} />
                      <span className="absolute -top-3 -right-3 grid h-9 w-9 place-items-center rounded-full bg-black font-display text-sm font-black" style={{ color: p.color, border: `1px solid ${p.color}` }}>
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-lg font-bold text-white">{p.title}</h3>
                    <p className="mt-3 font-sub text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="relative py-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <SectionTitle eyebrow="Roadmap" title={<>Our <span className="text-gradient">Journey & Milestones</span></>} />

          <div className="relative mt-16">
            <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-neon-blue/60 via-neon-purple/40 to-transparent shadow-[0_0_10px_#00d4ff]" />
            <ul className="space-y-10">
              {milestones.map((m, i) => (
                <li key={m.year}>
                  <Reveal delay={i * 80}>
                    <div className="flex gap-6">
                      <div className="relative shrink-0">
                        <div
                          className={`grid h-12 w-12 place-items-center rounded-full border-2 font-display text-[10px] font-black ${i === milestones.length - 1 ? "animate-pulse-glow" : ""}`}
                          style={{ borderColor: m.color, background: "#000", color: m.color, boxShadow: `0 0 20px ${m.color}88` }}
                        >
                          {m.year}
                        </div>
                      </div>
                      <div className="glass flex-1 rounded-2xl p-6">
                        <h3 className="font-display text-lg font-bold text-white">{m.title}</h3>
                        <p className="mt-2 font-sub text-sm leading-relaxed text-muted-foreground">{m.text}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
