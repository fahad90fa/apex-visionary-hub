import { createFileRoute } from "@tanstack/react-router";
import { Monitor, UserCheck, Activity, ShieldCheck, CandlestickChart, Globe2, Brain, Users, BookOpen } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "./index";

export const Route = createFileRoute("/facilities")({
  head: () => ({
    meta: [
      { title: "Facilities — Apex Forex Academy" },
      { name: "description", content: "Live trading sessions, 1-on-1 mentorship, signals, risk training, and everything you need to trade professionally." },
      { property: "og:title", content: "What We Provide — Apex Forex" },
      { property: "og:description", content: "Everything you need to become a professional trader." },
    ],
  }),
  component: FacilitiesPage,
});

const services = [
  { Icon: Monitor, title: "Live Trading Sessions", text: "Trade alongside our experts in real-time live market sessions every week.", color: "var(--neon-blue)" },
  { Icon: UserCheck, title: "1-on-1 Mentorship", text: "Personalized coaching sessions tailored to your specific trading goals and level.", color: "var(--neon-green)" },
  { Icon: Activity, title: "Daily Trading Signals", text: "Receive professional daily forex signals with full analysis and entry/exit points.", color: "var(--neon-purple)" },
  { Icon: ShieldCheck, title: "Risk Management Training", text: "Learn institutional-grade risk management strategies to protect and grow your capital.", color: "var(--gold)" },
  { Icon: CandlestickChart, title: "Technical Analysis", text: "Deep dive into price action, indicators, patterns, and advanced charting techniques.", color: "var(--neon-blue)" },
  { Icon: Globe2, title: "Fundamental Analysis", text: "Understand economic data, central bank policies, and macro market drivers.", color: "var(--neon-green)" },
  { Icon: Brain, title: "Trading Psychology", text: "Develop the elite mindset, discipline, and emotional control of a pro trader.", color: "var(--neon-purple)" },
  { Icon: Users, title: "Private Community", text: "Join our exclusive members-only community of serious, like-minded traders worldwide.", color: "var(--gold)" },
  { Icon: BookOpen, title: "Lifetime Mentorship", text: "Get permanent access to all course content, updates, and new materials added over time.", color: "var(--neon-blue)" },
];

function FacilitiesPage() {
  return (
    <>
      <PageHero
        badge="What We Provide"
        title={<>Everything you need to <span className="text-gradient">trade professionally</span></>}
        subtitle="Nine pillars of support — engineered to take you from learner to elite operator."
      />

      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 100}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  return (
    <article
      className="group relative h-full overflow-hidden rounded-2xl border border-white/5 bg-[rgba(5,15,40,0.6)] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3"
      style={{ ["--c" as string]: service.color }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 24px 60px ${service.color}33, 0 0 0 1px ${service.color}66`)}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}
    >
      <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`, boxShadow: `0 0 14px ${service.color}` }} />
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40" style={{ background: service.color }} />

      <div
        className="mb-5 inline-grid h-14 w-14 place-items-center rounded-xl border transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
        style={{ borderColor: `${service.color}55`, background: `${service.color}15`, boxShadow: `0 0 22px ${service.color}40` }}
      >
        <service.Icon size={24} style={{ color: service.color }} />
      </div>
      <h3 className="font-display text-lg font-bold text-white">{service.title}</h3>
      <p className="mt-3 font-sub text-[14px] leading-relaxed text-muted-foreground">{service.text}</p>
    </article>
  );
}
