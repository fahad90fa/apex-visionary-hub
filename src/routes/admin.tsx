import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { LogOut, Save, Shield, Loader2, CheckCircle2, AlertCircle, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  getSiteContent,
  getAdminStatus,
  saveSiteContent,
  bootstrapAdmin,
  isBootstrapAvailable,
} from "@/lib/admin.functions";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — Apex Forex Academy" },
      { name: "description", content: "Secure admin portal to manage Apex Forex Academy contact and social information." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type Mode = "loading" | "bootstrap" | "login" | "admin" | "not-admin";

const FIELDS: { key: string; label: string; group: string; type?: "url" | "text" }[] = [
  { key: "contact_phone", label: "Phone Number", group: "Contact" },
  { key: "contact_email", label: "Email Address", group: "Contact" },
  { key: "contact_address", label: "Office Address", group: "Contact" },
  { key: "contact_hours", label: "Office Hours", group: "Contact" },
  { key: "maps_url", label: "Google Maps URL", group: "Location", type: "url" },
  { key: "social_instagram", label: "Instagram URL", group: "Social", type: "url" },
  { key: "social_telegram", label: "Telegram URL", group: "Social", type: "url" },
  { key: "social_tiktok", label: "TikTok URL", group: "Social", type: "url" },
  { key: "social_youtube", label: "YouTube URL", group: "Social", type: "url" },
  { key: "social_facebook", label: "Facebook URL", group: "Social", type: "url" },
  { key: "social_whatsapp", label: "WhatsApp URL", group: "Social", type: "url" },
];

function AdminPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("loading");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [content, setContent] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  const fnGetContent = useServerFn(getSiteContent);
  const fnGetAdmin = useServerFn(getAdminStatus);
  const fnSave = useServerFn(saveSiteContent);
  const fnBootstrap = useServerFn(bootstrapAdmin);
  const fnBootstrapAvailable = useServerFn(isBootstrapAvailable);

  async function refresh() {
    setError(null);
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      try {
        const { available } = await fnBootstrapAvailable();
        setMode(available ? "bootstrap" : "login");
      } catch (e) {
        setError((e as Error).message);
        setMode("login");
      }
      return;
    }
    try {
      const status = await fnGetAdmin();
      if (!status.isAdmin) {
        setMode("not-admin");
        return;
      }
      const c = await fnGetContent();
      setContent(c);
      setMode("admin");
    } catch (e) {
      setError((e as Error).message);
      setMode("login");
    }
  }

  useEffect(() => {
    void refresh();
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      void refresh();
    });
    return () => sub.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    setPassword("");
    await refresh();
  }

  async function onBootstrap(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await fnBootstrap({ data: { email, password } });
      // Auto sign-in
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setPassword("");
      await refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function onLogout() {
    await supabase.auth.signOut();
    setContent({});
    setDirty(false);
    await refresh();
    router.invalidate();
  }

  async function onSave() {
    setBusy(true);
    setError(null);
    try {
      const updates = FIELDS.map((f) => ({ key: f.key, value: content[f.key] ?? "" }));
      await fnSave({ data: { updates } });
      setDirty(false);
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 2400);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHero
        badge="Restricted"
        title={<>Admin <span className="text-gradient">Portal</span></>}
        subtitle="Secure control panel for managing contact details, social links and website information."
      />

      <section className="relative pb-24">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          {mode === "loading" && (
            <div className="glass grid place-items-center rounded-3xl p-16">
              <Loader2 className="animate-spin text-neon-blue" />
            </div>
          )}

          {(mode === "login" || mode === "bootstrap") && (
            <AuthCard
              title={mode === "bootstrap" ? "Create Admin Account" : "Admin Sign In"}
              subtitle={
                mode === "bootstrap"
                  ? "No administrator exists yet. Create the first admin account to secure this portal."
                  : "Enter your credentials to access the control panel."
              }
              email={email}
              password={password}
              onEmail={setEmail}
              onPassword={setPassword}
              onSubmit={mode === "bootstrap" ? onBootstrap : onLogin}
              busy={busy}
              cta={mode === "bootstrap" ? "Create Admin" : "Sign In"}
              error={error}
            />
          )}

          {mode === "not-admin" && (
            <div className="glass rounded-3xl p-8 text-center">
              <AlertCircle className="mx-auto mb-3 text-red-400" size={36} />
              <h2 className="font-display text-xl font-bold text-white">Access Denied</h2>
              <p className="mt-2 font-sub text-sm text-white/70">
                This account does not have admin privileges.
              </p>
              <button
                onClick={onLogout}
                className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-sub text-sm text-white hover:bg-white/10"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          )}

          {mode === "admin" && (
            <>
              <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-neon-green/20 bg-neon-green/5 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 font-sub text-sm text-neon-green">
                  <Shield size={16} />
                  <span>Authenticated as administrator</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to="/admin/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-sub text-xs uppercase tracking-[0.18em] text-white hover:bg-white/10"
                  >
                    View Contact Messages
                  </Link>
                  <button
                    onClick={onLogout}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 font-sub text-xs uppercase tracking-[0.18em] text-white hover:bg-white/10"
                  >
                    <LogOut size={12} /> Sign Out
                  </button>
                </div>
              </div>

              {(["Contact", "Location", "Social"] as const).map((group) => (
                <div key={group} className="glass mb-5 rounded-3xl p-6">
                  <h3 className="mb-4 font-display text-lg font-bold text-white">{group}</h3>
                  <div className="grid gap-4">
                    {FIELDS.filter((f) => f.group === group).map((f) => (
                      <label key={f.key} className="block">
                        <span className="mb-1.5 block font-sub text-[11px] font-bold uppercase tracking-[0.2em] text-neon-blue">
                          {f.label}
                        </span>
                        {f.key === "contact_address" || f.type === "url" ? (
                          <textarea
                            value={content[f.key] ?? ""}
                            onChange={(e) => {
                              setContent((c) => ({ ...c, [f.key]: e.target.value }));
                              setDirty(true);
                            }}
                            rows={f.type === "url" ? 2 : 2}
                            className="w-full resize-none rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-sub text-sm text-white outline-none focus:border-neon-blue/60"
                          />
                        ) : (
                          <input
                            type="text"
                            value={content[f.key] ?? ""}
                            onChange={(e) => {
                              setContent((c) => ({ ...c, [f.key]: e.target.value }));
                              setDirty(true);
                            }}
                            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-sub text-sm text-white outline-none focus:border-neon-blue/60"
                          />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {error && (
                <div className="mb-4 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-2 font-sub text-sm text-red-300">
                  {error}
                </div>
              )}

              <div className="sticky bottom-4 flex items-center justify-between rounded-2xl border border-neon-blue/30 bg-black/80 px-5 py-3 backdrop-blur">
                <div className="font-sub text-xs text-white/70">
                  {savedFlash ? (
                    <span className="inline-flex items-center gap-1.5 text-neon-green">
                      <CheckCircle2 size={14} /> Saved
                    </span>
                  ) : dirty ? (
                    "Unsaved changes"
                  ) : (
                    "All changes saved"
                  )}
                </div>
                <button
                  onClick={onSave}
                  disabled={busy || !dirty}
                  className="inline-flex items-center gap-2 rounded-lg border border-neon-blue bg-neon-blue/15 px-5 py-2 font-sub text-sm font-bold uppercase tracking-wider text-neon-blue transition-all hover:bg-neon-blue/25 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {busy ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  Save Changes
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

function AuthCard(props: {
  title: string;
  subtitle: string;
  email: string;
  password: string;
  onEmail: (v: string) => void;
  onPassword: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  busy: boolean;
  cta: string;
  error: string | null;
}) {
  return (
    <div className="glass mx-auto max-w-md rounded-3xl p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-xl border border-neon-blue/40 bg-neon-blue/10 shadow-[0_0_24px_rgba(0,212,255,0.35)]">
          <Lock className="text-neon-blue" size={20} />
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-white">{props.title}</h2>
          <p className="font-sub text-xs text-white/60">{props.subtitle}</p>
        </div>
      </div>
      <form onSubmit={props.onSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block font-sub text-[11px] font-bold uppercase tracking-[0.2em] text-neon-blue">Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={props.email}
            onChange={(e) => props.onEmail(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-sub text-sm text-white outline-none focus:border-neon-blue/60"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-sub text-[11px] font-bold uppercase tracking-[0.2em] text-neon-blue">Password</span>
          <input
            type="password"
            required
            minLength={8}
            autoComplete={props.cta === "Create Admin" ? "new-password" : "current-password"}
            value={props.password}
            onChange={(e) => props.onPassword(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-sub text-sm text-white outline-none focus:border-neon-blue/60"
          />
        </label>
        {props.error && (
          <div className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 font-sub text-xs text-red-300">
            {props.error}
          </div>
        )}
        <button
          type="submit"
          disabled={props.busy}
          className="w-full rounded-lg border border-neon-blue bg-neon-blue/15 px-5 py-2.5 font-sub text-sm font-bold uppercase tracking-wider text-neon-blue transition-all hover:bg-neon-blue/25 disabled:opacity-40"
        >
          {props.busy ? "Please wait…" : props.cta}
        </button>
      </form>
    </div>
  );
}
