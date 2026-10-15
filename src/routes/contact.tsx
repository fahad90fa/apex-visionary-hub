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
      { title: "Contact Apex Forex Academy — Enroll in Pakistan's Top Forex Course" },
      { name: "description", content: "Enroll in Pakistan's leading Forex trading course. Call +92 316 6513780 or message Apex Forex Academy Gujranwala to start your trading journey today." },
      { name: "keywords", content: "contact forex academy Pakistan, enroll forex course, Apex Forex contact, forex classes Gujranwala, WhatsApp forex mentor" },
      { property: "og:title", content: "Contact Apex Forex Academy" },
      { property: "og:description", content: "Reach our mentors and take the first step toward financial freedom." },
      { property: "og:url", content: "https://www.apexacademypk.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://www.apexacademypk.com/contact" }],
  }),
  component: ContactPage,
});

const symbols = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD"];

const WHATSAPP_NUMBER = "923166513780";

/** Builds the WhatsApp chat link with the enquiry prefilled as the message text. */
function buildWhatsAppUrl(form: { full_name: string; email: string; phone: string; message: string }) {
  const lines = [
    "New enquiry from the Apex Forex Academy website",
    "",
    `Full Name: ${form.full_name}`,
    `Email Address: ${form.email}`,
    `Phone Number: ${form.phone}`,
  ];
  if (form.message) lines.push("", "Message:", form.message);
  const text = encodeURIComponent(lines.join("\n"));
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${text}&type=phone_number&app_absent=0`;
}

function ContactPage() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {symbols.map((s, i) => (
          <span
            key={s}
            className="absolute font-display text-7xl font-black tracking-[0.2em] text-gold/[0.05] sm:text-9xl"
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
  const [whatsappFallback, setWhatsappFallback] = useState<string | null>(null);
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

    const data = {
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
    };
    const whatsappUrl = buildWhatsAppUrl(data);
    setWhatsappFallback(whatsappUrl);

    // Save a copy to the admin inbox, but never let that hold up the WhatsApp hand-off:
    // give it a few seconds and carry on even if it fails.
    try {
      await Promise.race([
        submitFn({ data }),
        new Promise(resolve => setTimeout(resolve, 4000)),
      ]);
    } catch (err) {
      console.error("Contact form could not be saved to the inbox", err);
    }

    setForm({ full_name: "", email: "", phone: "", message: "" });
    setState("sent");
    window.location.assign(whatsappUrl);
  };

  return (
    <form onSubmit={onSubmit} className="glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
        <div className="h-px w-full animate-shimmer" />
      </div>

      <Field
        Icon={User}
        label="Full Name"
        required
        placeholder="Enter your full name"
        type="text"
        focusColor="var(--gold)"
        value={form.full_name}
        onChange={value => setForm(prev => ({ ...prev, full_name: value }))}
      />
      <Field
        Icon={Mail}
        label="Email Address"
        required
        placeholder="Enter your email address"
        type="email"
        focusColor="var(--gold-light)"
        value={form.email}
        onChange={value => setForm(prev => ({ ...prev, email: value }))}
      />
      <Field
        Icon={Phone}
        label="Phone Number"
        required
        placeholder="Enter your phone number"
        type="tel"
        focusColor="var(--silver)"
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
        className="group mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold to-gold-light px-6 py-4 font-sub text-sm font-bold uppercase tracking-[0.25em] text-navy shadow-[0_0_30px_rgba(212,168,76,0.55)] transition-all hover:scale-[1.01] disabled:opacity-90"
      >
        {state === "idle" && <>Send Message <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></>}
        {state === "sending" && <><Loader2 size={16} className="animate-spin" /> Sending</>}
        {state === "sent" && <><Check size={16} /> Opening WhatsApp</>}
        {state === "error" && <>Try Again</>}
      </button>

      {state === "sent" && (
        <p className="mt-4 text-center text-sm text-gold-light">
          Thanks! Taking you to our WhatsApp chat with your message ready to send.{" "}
          <a href={whatsappFallback ?? undefined} className="underline">Tap here if it does not open.</a>
        </p>
      )}
      {state === "error" && error && (
        <p className="mt-4 text-center text-sm text-red-300">{error}</p>
      )}
    </form>
  );
}

function Field({ Icon, label, placeholder, type, focusColor, value, onChange, required }: { Icon: typeof User; label: string; placeholder: string; type: string; focusColor: string; value: string; onChange: (value: string) => void; required?: boolean }) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  const sharedClass =
    "peer w-full bg-transparent pl-11 pr-3 pt-6 pb-2 font-sub text-sm text-white placeholder-transparent outline-none";

  return (
    <div className="mb-5">
      <div
        className="relative rounded-xl border bg-navy-deep/30 transition-all"
        style={{
          borderColor: focused ? focusColor : "rgba(255,255,255,0.08)",
          boxShadow: focused ? `0 0 22px ${focusColor}55` : undefined,
        }}
      >
        <Icon size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: focused ? focusColor : "#b4bdd6" }} />
        <label
          className="pointer-events-none absolute left-11 font-sub transition-all"
          style={{
            top: floated ? "8px" : type === "textarea" ? "16px" : "50%",
            transform: floated ? "translateY(0)" : type === "textarea" ? "none" : "translateY(-50%)",
            fontSize: floated ? "11px" : "14px",
            letterSpacing: floated ? "0.2em" : "0",
            textTransform: floated ? "uppercase" : "none",
            color: focused ? focusColor : "#b4bdd6",
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
            required={required}
          />
        )}
      </div>
    </div>
  );
}
