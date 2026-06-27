import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Play, Shield, Globe, Cpu, LineChart, Quote, Star } from "lucide-react";
import { ParticleField } from "../components/ParticleField";
import { CandlestickBg } from "../components/CandlestickBg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apex Forex Academy — Where Future Traders Are Built" },
      { name: "description", content: "Elite Forex trading education with live mentorship, daily signals, and a global community of professional traders." },
      { property: "og:title", content: "Apex Forex Academy" },
      { property: "og:description", content: "Master the markets with elite Forex education." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <WhyChoose />
      <Stats />
      <VideoShowcase />
      <Testimonials />
    </>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,212,255,0.22),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(182,109,255,0.22),transparent_55%)]" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 opacity-60"><CandlestickBg opacity={0.22} /></div>
      <ParticleField density={100} />

      {/* Floating dashboard glassy UI bits */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
        <div className="absolute right-[6%] top-[18%] hidden h-44 w-72 rounded-xl border border-neon-blue/40 bg-neon-blue/5 backdrop-blur lg:block" />
        <div className="absolute left-[4%] bottom-[20%] hidden h-32 w-60 rounded-xl border border-neon-purple/40 bg-neon-purple/5 backdrop-blur lg:block" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:px-8">
        <div className="text-center lg:text-left">
          <span className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-neon-blue/30 bg-neon-blue/5 px-4 py-1.5 font-sub text-[11px] font-bold uppercase tracking-[0.25em] text-neon-blue shadow-[0_0_24px_rgba(0,212,255,0.25)]">
            🚀 The Future of Forex Education
          </span>

          <h1 className="mt-6 animate-fade-up font-display text-[44px] font-black leading-[1.02] sm:text-6xl lg:text-7xl xl:text-[88px]" style={{ animationDelay: "120ms" }}>
            <span className="block text-white">Master the Markets</span>
            <span className="block text-gradient">with Apex Forex</span>
            <span className="block text-white/90">Academy</span>
          </h1>

          <p className="mt-6 animate-fade-up font-sub text-lg italic text-muted-foreground sm:text-xl" style={{ animationDelay: "260ms" }}>
            Where Future Traders Are Built.
          </p>

          <div className="mt-9 flex animate-fade-up flex-wrap justify-center gap-4 lg:justify-start" style={{ animationDelay: "380ms" }}>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-blue to-neon-green px-7 py-3.5 font-sub text-sm font-bold uppercase tracking-[0.18em] text-black shadow-[0_0_30px_rgba(0,212,255,0.55)] transition-transform hover:scale-105"
            >
              Join Now
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/facilities"
              className="group inline-flex items-center gap-2 rounded-full border border-neon-blue/50 bg-neon-blue/5 px-7 py-3.5 font-sub text-sm font-bold uppercase tracking-[0.18em] text-neon-blue backdrop-blur-md transition-all hover:bg-neon-blue/10 hover:shadow-[0_0_28px_rgba(0,212,255,0.4)]"
            >
              Explore Programs
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* mini stat strip */}
          <div className="mt-12 grid max-w-md animate-fade-up grid-cols-3 gap-4 lg:mx-0 mx-auto" style={{ animationDelay: "500ms" }}>
            {[["5K+", "Traders"], ["95%", "Success"], ["10+", "Mentors"]].map(([n, l]) => (
              <div key={l} className="glass px-3 py-3 text-center">
                <div className="font-display text-xl font-black text-gradient">{n}</div>
                <div className="font-sub text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right visual: animated trading panel */}
        <div className="relative hidden lg:block">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-neon-blue/30 via-transparent to-neon-purple/30 blur-2xl" />
          <div className="relative glass-strong rounded-3xl p-5 animate-float">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-neon-green shadow-[0_0_10px_#00ff88]" />
                <span className="font-display text-xs font-bold tracking-[0.2em]">EUR/USD</span>
              </div>
              <span className="font-sub text-xs text-neon-green">+1.84%</span>
            </div>
            <div className="my-3 font-display text-3xl font-black text-white">
              1.0<span className="text-gradient">9248</span>
            </div>
            <div className="relative h-44 overflow-hidden rounded-xl bg-black/40">
              <CandlestickBg opacity={0.7} />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 font-sub text-[11px]">
              {[["High", "1.0962", "text-neon-green"], ["Low", "1.0902", "text-destructive"], ["Vol", "2.4M", "text-neon-blue"]].map(([k, v, c]) => (
                <div key={k} className="rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-2">
                  <div className="text-muted-foreground">{k}</div>
                  <div className={`font-bold ${c}`}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-1 text-muted-foreground">
        <span className="font-sub text-[10px] uppercase tracking-[0.3em]">Scroll to explore</span>
        <ChevronDown size={18} className="animate-bounce text-neon-blue" />
      </div>
    </section>
  );
}

const features = [
  { Icon: LineChart, color: "var(--neon-blue)", title: "Expert-Led Live Training", text: "Learn directly from professional traders with years of real market experience and proven track records." },
  { Icon: Shield, color: "var(--neon-green)", title: "Risk Management Mastery", text: "Master the art of protecting capital while maximizing returns through proven institutional strategies." },
  { Icon: Globe, color: "var(--neon-purple)", title: "Global Trading Community", text: "Join thousands of traders worldwide in our exclusive private network of elite market professionals." },
  { Icon: Cpu, color: "var(--gold)", title: "Lifetime Access & Support", text: "Get lifetime access to all materials, updates, and ongoing mentor support throughout your trading career." },
];

function WhyChoose() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(182,109,255,0.12),transparent_50%)]" />
      <ParticleField density={50} />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionTitle eyebrow="Why Apex" title={<>Why Choose <span className="text-gradient">Apex Forex Academy</span></>} subtitle="We don't just teach trading. We build elite traders." />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 100}>
              <article
                className="group relative h-full overflow-hidden rounded-2xl border border-white/5 bg-[rgba(5,15,40,0.55)] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-transparent"
                style={{ ["--c" as string]: f.color }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 20px 60px ${f.color}33, 0 0 0 1px ${f.color}55`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-30 blur-3xl" style={{ background: f.color }} />
                <div
                  className="mb-5 inline-grid h-14 w-14 place-items-center rounded-xl border transition-transform group-hover:scale-110"
                  style={{ borderColor: `${f.color}55`, background: `${f.color}15`, boxShadow: `0 0 24px ${f.color}40` }}
                >
                  <f.Icon size={26} style={{ color: f.color }} />
                </div>
                <h3 className="font-display text-xl font-bold text-white">{f.title}</h3>
                <p className="mt-3 font-sub text-[15px] leading-relaxed text-muted-foreground">{f.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: 5000, suffix: "+", label: "Students Enrolled" },
    { value: 95, suffix: "%", label: "Success Rate" },
    { value: 10, suffix: "+", label: "Expert Mentors" },
  ];
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="glass relative overflow-hidden rounded-3xl p-10 lg:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.12),transparent_60%)]" />
          <div className="relative grid gap-10 sm:grid-cols-3 sm:divide-x sm:divide-white/5">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 120}>
                <div className="px-2 text-center">
                  <Counter target={s.value} suffix={s.suffix} />
                  <div className="mt-3 font-sub text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const start = Date.now();
          const dur = 1800;
          const tick = () => {
            const t = Math.min(1, (Date.now() - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            setN(Math.floor(target * eased));
            if (t < 1) requestAnimationFrame(tick);
            else setN(target);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return (
    <div ref={ref} className="font-display text-5xl font-black text-gradient sm:text-6xl">
      {n.toLocaleString()}{suffix}
    </div>
  );
}

function VideoShowcase() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(182,109,255,0.12),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <SectionTitle eyebrow="Watch & Learn" title={<>See How We <span className="text-gradient">Transform Traders</span></>} subtitle="A glimpse inside the live sessions, mentorship floor, and the daily rhythm of Apex." />

        <Reveal>
          <div className="relative mt-14">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-neon-blue via-neon-purple to-gold opacity-50 blur-xl" />
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-neon-blue/40 bg-black">
              <CandlestickBg opacity={0.35} />
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60" />
              {/* corner brackets */}
              {[
                "left-4 top-4 border-l-2 border-t-2",
                "right-4 top-4 border-r-2 border-t-2",
                "left-4 bottom-4 border-l-2 border-b-2",
                "right-4 bottom-4 border-r-2 border-b-2",
              ].map(c => <span key={c} className={`absolute h-8 w-8 border-neon-blue ${c}`} />)}
              <button className="absolute inset-0 m-auto grid h-20 w-20 place-items-center rounded-full border border-neon-blue/60 bg-black/40 text-neon-blue backdrop-blur-md transition-transform hover:scale-110 animate-pulse-glow">
                <Play size={28} fill="currentColor" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const testimonials = [
  { name: "Marcus Chen", role: "Full-time Forex Trader", flag: "🇸🇬", quote: "Apex didn't just teach me strategy — they rebuilt how I think about risk. Six months in, I'm consistently profitable.", color: "var(--neon-blue)" },
  { name: "Aisha Patel", role: "Prop Firm Funded Trader", flag: "🇦🇪", quote: "I passed two prop firm challenges in 30 days using the risk system from the academy. The mentorship is unreal.", color: "var(--neon-green)" },
  { name: "Diego Alvarez", role: "Swing Trader", flag: "🇲🇽", quote: "The community alone is worth it. Daily breakdowns from people actually trading size — not influencers.", color: "var(--neon-purple)" },
];

function Testimonials() {
  return (
    <section className="relative overflow-hidden py-28">
      <ParticleField density={50} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(0,212,255,0.12),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionTitle eyebrow="Testimonials" title={<>What Our <span className="text-gradient">Students Say</span></>} subtitle="Real results from real traders around the world." />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <article
                className="group relative h-full overflow-hidden rounded-2xl border border-white/5 bg-[rgba(5,15,40,0.55)] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2"
                style={{ ["--c" as string]: t.color }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 20px 60px ${t.color}33, 0 0 0 1px ${t.color}55`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}
              >
                <Quote size={32} style={{ color: t.color }} className="opacity-70" />
                <p className="mt-4 font-sub text-[15px] leading-relaxed text-white/90">"{t.quote}"</p>
                <div className="mt-5 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} className="fill-gold text-gold" />)}
                </div>
                <div className="mt-5 flex items-center gap-3 border-t border-white/5 pt-5">
                  <div className="grid h-11 w-11 place-items-center rounded-full font-display text-sm font-bold text-black" style={{ background: t.color }}>
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-display text-sm font-bold text-white">{t.name} <span>{t.flag}</span></div>
                    <div className="truncate font-sub text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- shared ---------------- */

export function SectionTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div className="text-center">
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-neon-blue/30 bg-neon-blue/5 px-4 py-1.5 font-sub text-[11px] font-bold uppercase tracking-[0.25em] text-neon-blue">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-5 font-display text-3xl font-black sm:text-4xl lg:text-5xl">{title}</h2>
      <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-neon-blue to-transparent shadow-[0_0_12px_#00d4ff]" />
      {subtitle && <p className="mx-auto mt-5 max-w-2xl font-sub text-base text-muted-foreground sm:text-lg">{subtitle}</p>}
    </div>
  );
}

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { setShow(true); io.disconnect(); } });
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
    >
      {children}
    </div>
  );
}
