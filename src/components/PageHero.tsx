import type { ReactNode } from "react";
import { ParticleField } from "./ParticleField";

export function PageHero({ badge, title, subtitle, children }: { badge?: string; title: ReactNode; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-20">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,212,255,0.18),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(182,109,255,0.18),transparent_55%)]" />
      <ParticleField density={60} />
      <div className="relative mx-auto max-w-5xl px-5 text-center lg:px-8">
        {badge && (
          <span className="inline-flex items-center gap-2 rounded-full border border-neon-blue/30 bg-neon-blue/5 px-4 py-1.5 font-sub text-[11px] font-bold uppercase tracking-[0.25em] text-neon-blue shadow-[0_0_24px_rgba(0,212,255,0.25)]">
            {badge}
          </span>
        )}
        <h1 className="mt-6 font-display text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && <p className="mx-auto mt-5 max-w-2xl font-sub text-base text-muted-foreground sm:text-lg">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
