import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Loader2, Mail, Phone, MessageSquare, User } from "lucide-react";
import { PageHero } from "../../components/PageHero";
import { getContactMessages } from "../../lib/contact.functions";

export const Route = createFileRoute("/admin/contact")({
  head: () => ({
    meta: [
      { title: "Admin Contact Messages — Apex Forex Academy" },
      { name: "description", content: "Review submitted contact messages from the website." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminContactPage,
});

type ContactMessage = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
};

function AdminContactPage() {
  const fnGetMessages = useServerFn(getContactMessages);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const data = await fnGetMessages();
        setMessages(data.messages ?? []);
        setStatus("loaded");
      } catch (e) {
        setError((e as Error).message);
        setStatus("error");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageHero
        badge="Admin"
        title={<>Contact <span className="text-gradient">Submissions</span></>}
        subtitle="Review messages submitted by visitors through the contact page."
      />

      <section className="relative pb-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/5"
            >
              <ArrowLeft size={16} /> Back to Admin
            </Link>
            <p className="text-sm text-white/75">{messages.length} submission{messages.length === 1 ? "" : "s"} found</p>
          </div>

          {status === "loading" && (
            <div className="glass grid place-items-center rounded-3xl p-16">
              <Loader2 className="animate-spin text-neon-blue" />
            </div>
          )}

          {status === "error" && (
            <div className="glass rounded-3xl p-8 text-center">
              <p className="font-sub text-sm text-red-200">{error ?? "Unable to load messages."}</p>
            </div>
          )}

          {status === "loaded" && (
            <div className="space-y-5">
              {messages.length === 0 ? (
                <div className="glass rounded-3xl p-8 text-center text-white/80">
                  No contact messages have been submitted yet.
                </div>
              ) : (
                <div className="grid gap-5">
                  {messages.map((message) => (
                    <div key={message.id} className="glass rounded-3xl p-6">
                      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h2 className="font-display text-xl font-bold text-white">{message.name}</h2>
                          <p className="mt-1 text-sm text-white/70">Submitted {new Date(message.created_at).toLocaleString()}</p>
                        </div>
                        <div className="grid gap-2 text-sm text-white/75 sm:text-right">
                          <span className="inline-flex items-center gap-2">
                            <Mail size={14} /> {message.email}
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <Phone size={14} /> {message.phone}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 rounded-2xl border border-white/10 bg-black/40 p-4 text-sm leading-7 text-white/85">
                        <p className="inline-flex items-start gap-2 text-neon-blue"><MessageSquare size={16} /> Message</p>
                        <p className="mt-3 whitespace-pre-line">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
