import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import unnamedPic from "../pics/unnamed.jpg";

const links = [
  { to: "/", label: "Home" },
  { to: "/team", label: "Team" },
  { to: "/vision", label: "Vision" },
  { to: "/facilities", label: "Facilities" },
  { to: "/charts", label: "Charts" },
  { to: "/news", label: "News" },
  { to: "/location", label: "Location" },
  { to: "/contact", label: "Contact" },
  { to: "/social", label: "Social" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: s => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/5 bg-black/85 backdrop-blur-xl" : "bg-black/40 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="group flex items-center">
          <img
            src={unnamedPic}
            alt="Apex Forex logo"
            className="h-16 w-16 rounded-lg object-cover shadow-[0_0_22px_rgba(0,212,255,0.7)] transition-transform group-hover:scale-105"
          />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map(l => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`group relative px-4 py-2 font-sub text-sm font-medium tracking-wide transition-colors ${
                    active ? "text-neon-blue" : "text-muted-foreground hover:text-white"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gradient-to-r from-neon-blue to-neon-purple transition-transform duration-300 ${
                      active ? "scale-x-100 shadow-[0_0_8px_#00d4ff]" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          to="/contact"
          className="hidden lg:inline-flex items-center justify-center rounded-full bg-gradient-to-r from-neon-blue to-neon-green px-5 py-2.5 font-sub text-xs font-bold uppercase tracking-[0.18em] text-black shadow-[0_0_24px_rgba(0,212,255,0.55)] transition-transform hover:scale-105"
        >
          Join Now
        </Link>

        <button
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-white lg:hidden"
          onClick={() => setOpen(o => !o)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 top-[72px] z-40 origin-top bg-black/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? "scale-y-100 opacity-100" : "pointer-events-none scale-y-95 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 p-6">
          {links.map((l, i) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <li key={l.to} style={{ animationDelay: `${i * 60}ms` }} className={open ? "animate-fade-up" : ""}>
                <Link
                  to={l.to}
                  className={`flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-5 py-4 font-display text-base font-bold tracking-wide ${
                    active ? "text-neon-blue" : "text-white"
                  }`}
                >
                  {l.label}
                  <span className="text-neon-blue">→</span>
                </Link>
              </li>
            );
          })}
          <li className="mt-3">
            <Link
              to="/contact"
              className="block rounded-xl bg-gradient-to-r from-neon-blue to-neon-green px-5 py-4 text-center font-sub text-sm font-bold uppercase tracking-[0.2em] text-black shadow-[0_0_24px_rgba(0,212,255,0.55)]"
            >
              Join Now
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
