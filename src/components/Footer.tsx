import { Link } from "@tanstack/react-router";
import { Instagram, Send, Youtube, Facebook, MessageCircle, MapPin, Phone, Mail, Clock } from "lucide-react";

const socials = [
  { Icon: Instagram, label: "Instagram", color: "#E1306C" },
  { Icon: Send, label: "Telegram", color: "#0088cc" },
  { Icon: Youtube, label: "YouTube", color: "#FF0000" },
  { Icon: Facebook, label: "Facebook", color: "#1877F2" },
  { Icon: MessageCircle, label: "WhatsApp", color: "#25D366" },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5 bg-black">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple shadow-[0_0_18px_rgba(0,212,255,0.6)]">
                <span className="font-display text-base font-black text-black">A</span>
              </div>
              <span className="font-display text-base font-black tracking-[0.22em]">
                APEX<span className="text-gradient">FOREX</span>
              </span>
            </Link>
            <p className="mt-5 font-sub text-sm leading-relaxed text-muted-foreground">
              Where Future Traders Are Built. An elite Forex education ecosystem combining institutional knowledge with a global community of serious traders.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(s => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="group grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-muted-foreground transition-all hover:text-white"
                  style={{ ["--c" as string]: s.color }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 18px ${s.color}66`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}
                >
                  <s.Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Quick Links" items={[
            { label: "Home", to: "/" },
            { label: "Team", to: "/team" },
            { label: "Vision", to: "/vision" },
            { label: "Facilities", to: "/facilities" },
            { label: "Location", to: "/location" },
            { label: "Contact", to: "/contact" },
            { label: "Social Media", to: "/social" },
          ]} />

          <FooterCol title="Our Services" items={[
            { label: "Live Trading Sessions" },
            { label: "1-on-1 Mentorship" },
            { label: "Daily Signals" },
            { label: "Risk Management" },
            { label: "Technical Analysis" },
            { label: "Trading Psychology" },
          ]} />

          <div>
            <h4 className="font-sub text-xs font-bold uppercase tracking-[0.22em] text-neon-blue">Contact Us</h4>
            <ul className="mt-5 space-y-4 font-sub text-sm text-muted-foreground">
              <li className="flex gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-neon-blue" /> 14F, Skyline Financial Tower, Dubai Marina, UAE</li>
              <li className="flex gap-3"><Phone size={16} className="mt-0.5 shrink-0 text-neon-green" /> +971 4 555 0188</li>
              <li className="flex gap-3"><Mail size={16} className="mt-0.5 shrink-0 text-neon-purple" /> hello@apexforexacademy.com</li>
              <li className="flex gap-3"><Clock size={16} className="mt-0.5 shrink-0 text-gold" /> Mon – Sat: 9:00 AM – 6:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sub text-[13px] text-muted-foreground/70">© 2026 Apex Forex Academy. All Rights Reserved.</p>
          <div className="flex gap-5 font-sub text-[13px] text-muted-foreground/70">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; to?: string }[] }) {
  return (
    <div>
      <h4 className="font-sub text-xs font-bold uppercase tracking-[0.22em] text-neon-blue">{title}</h4>
      <ul className="mt-5 space-y-3 font-sub text-sm">
        {items.map(it => (
          <li key={it.label}>
            {it.to ? (
              <Link to={it.to} className="group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-neon-blue">
                <span className="h-px w-0 bg-neon-blue transition-all group-hover:w-4" />
                {it.label}
              </Link>
            ) : (
              <span className="group inline-flex cursor-default items-center gap-2 text-muted-foreground transition-colors hover:text-neon-blue">
                <span className="h-px w-0 bg-neon-blue transition-all group-hover:w-4" />
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
