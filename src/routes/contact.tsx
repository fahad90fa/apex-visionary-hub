import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { User, Mail, Phone, MessageSquare, ArrowRight, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { PageHero } from "../components/PageHero";
import { submitContactForm } from "../lib/contact.functions";
import { Reveal } from "./index";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Apex Forex Academy" },
      { name: "description", content: "Start your trading journey. Get in touch with the Apex Forex Academy team." },
      { property: "og:title", content: "Start Your Trading Journey — Apex Forex" },
      { property: "og:description", content: "Reach our mentors and take the first step toward financial freedom." },
    ],
  }),
  component: ContactPage,
});

const symbols = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD"];

function ContactPage() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {symbols.map((s, i) => (
          <span
            key={s}
            className="absolute font-display text-7xl font-black tracking-[0.2em] text-neon-blue/[0.05] sm:text-9xl"
            style={{ left: `${(i * 41) % 80 + 5}%`, top: `${(i * 53) % 80 + 5}%`, transform: `rotate(${i * 11 - 25}deg)`, animation: `float-y ${12 + i}s ease-in-out infinite ${i}s` }}
          >
            {s}
          </span>
        ))}
      </div>

      <PageHero
        badge="Get In Touch"
        title={<>Start Your <span className="text-gradient">Trading Journey</span> Today</>}
        subtitle="Get in touch with our team and take the first step toward financial freedom."
      />

      <section className="relative pb-24">
        <div className="mx-auto max-w-2xl px-5">
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactForm() {
  const submitFn = useServerFn(submitContactForm);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    message: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setError(null);

    try {
      await submitFn({
        data: {
          full_name: form.full_name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
        },
      });

      setForm({ full_name: "", email: "", phone: "", message: "" });
      setState("sent");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Unable to send your message right now.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
        <div className="h-px w-full animate-shimmer" />
      </div>

      <Field
        Icon={User}
        label="Full Name"
        placeholder="Enter your full name"
        type="text"
        focusColor="var(--neon-blue)"
        value={form.full_name}
        onChange={value => setForm(prev => ({ ...prev, full_name: value }))}
      />
      <Field
        Icon={Mail}
        label="Email Address"
        placeholder="Enter your email address"
        type="email"
        focusColor="var(--neon-green)"
        value={form.email}
        onChange={value => setForm(prev => ({ ...prev, email: value }))}
      />
      <Field
        Icon={Phone}
        label="Phone Number"
        placeholder="Enter your phone number"
        type="tel"
        focusColor="var(--neon-purple)"
        value={form.phone}
        onChange={value => setForm(prev => ({ ...prev, phone: value }))}
      />
      <Field
        Icon={MessageSquare}
        label="Message"
        placeholder="Tell us about your trading goals..."
        type="textarea"
        focusColor="var(--gold)"
        value={form.message}
        onChange={value => setForm(prev => ({ ...prev, message: value }))}
      />

      <button
        type="submit"
        disabled={state === "sending"}
        className="group mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-green px-6 py-4 font-sub text-sm font-bold uppercase tracking-[0.25em] text-black shadow-[0_0_30px_rgba(0,212,255,0.55)] transition-all hover:scale-[1.01] disabled:opacity-90"
      >
        {state === "idle" && <>Send Message <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></>}
        {state === "sending" && <><Loader2 size={16} className="animate-spin" /> Sending</>}
        {state === "sent" && <><Check size={16} /> Message Sent</>}
        {state === "error" && <>Try Again</>}
      </button>

      {state === "sent" && (
        <p className="mt-4 text-center text-sm text-emerald-300">Thanks! Your message has been received and will appear in the admin inbox.</p>
      )}
      {state === "error" && error && (
        <p className="mt-4 text-center text-sm text-red-300">{error}</p>
      )}
    </form>
  );
}

function Field({ Icon, label, placeholder, type, focusColor, value, onChange }: { Icon: typeof User; label: string; placeholder: string; type: string; focusColor: string; value: string; onChange: (value: string) => void }) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  const sharedClass =
    "peer w-full bg-transparent pl-11 pr-3 pt-6 pb-2 font-sub text-sm text-white placeholder-transparent outline-none";

  return (
    <div className="mb-5">
      <div
        className="relative rounded-xl border bg-black/30 transition-all"
        style={{
          borderColor: focused ? focusColor : "rgba(255,255,255,0.08)",
          boxShadow: focused ? `0 0 22px ${focusColor}55` : undefined,
        }}
      >
        <Icon size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: focused ? focusColor : "#a0b4c8" }} />
        <label
          className="pointer-events-none absolute left-11 font-sub transition-all"
          style={{
            top: floated ? "8px" : type === "textarea" ? "16px" : "50%",
            transform: floated ? "translateY(0)" : type === "textarea" ? "none" : "translateY(-50%)",
            fontSize: floated ? "11px" : "14px",
            letterSpacing: floated ? "0.2em" : "0",
            textTransform: floated ? "uppercase" : "none",
            color: focused ? focusColor : "#a0b4c8",
            fontWeight: floated ? 700 : 400,
          }}
        >
          {label}
        </label>
        {type === "textarea" ? (
          <textarea
            rows={5}
            placeholder={placeholder}
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={sharedClass + " resize-none pt-7"}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={sharedClass + " h-14"}
          />
        )}
      </div>
    </div>
  );
}
