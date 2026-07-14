import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Preloader } from "../components/Preloader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-black text-gradient">404</h1>
        <h2 className="mt-4 font-sub text-xl font-semibold text-foreground">Position not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page drifted off the chart. Let's get you back to the markets.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-neon-blue to-neon-green px-5 py-2.5 font-sub text-xs font-bold uppercase tracking-[0.2em] text-black shadow-[0_0_24px_rgba(0,212,255,0.55)]"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-neon-blue to-neon-green px-5 py-2.5 font-sub text-xs font-bold uppercase tracking-[0.2em] text-black"
          >
            Try again
          </button>
          <a href="/" className="inline-flex items-center justify-center rounded-full border border-neon-blue/40 px-5 py-2.5 font-sub text-xs font-bold uppercase tracking-[0.2em] text-neon-blue">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Apex Forex Academy — #1 Forex Trading Academy in Pakistan | Gujranwala" },
      { name: "description", content: "Pakistan's leading Forex trading academy in Gujranwala. Learn Forex, Gold & crypto trading with live mentorship, daily signals, and expert mentors. Join Apex Forex Academy today." },
      { name: "keywords", content: "Apex Forex Academy, Apex Academy Pakistan, forex trading academy Pakistan, forex course Gujranwala, forex trading course Pakistan, learn forex Pakistan, forex mentorship, forex signals Pakistan, gold trading course, best forex academy, XAUUSD trading, forex classes Gujranwala" },
      { name: "author", content: "Apex Forex Academy" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow" },
      { name: "theme-color", content: "#00d4ff" },
      { property: "og:site_name", content: "Apex Forex Academy" },
      { property: "og:title", content: "Apex Forex Academy — #1 Forex Trading Academy in Pakistan" },
      { property: "og:description", content: "Learn Forex, Gold & crypto trading with Pakistan's elite mentors. Live sessions, daily signals & a global community." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:url", content: "https://www.apexacademypk.com/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Apex Forex Academy — #1 Forex Trading Academy in Pakistan" },
      { name: "twitter:description", content: "Elite Forex trading education in Gujranwala, Pakistan." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;800;900&family=Rajdhani:wght@400;500;600;700&family=Exo+2:wght@300;400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "EducationalOrganization",
              "@id": "https://www.apexacademypk.com/#organization",
              name: "Apex Forex Academy",
              alternateName: ["Apex Academy Pakistan", "Apex Forex Trading Academy"],
              url: "https://www.apexacademypk.com/",
              logo: "https://www.apexacademypk.com/logo.png",
              description: "Pakistan's leading Forex trading academy offering live mentorship, daily signals, and professional trading education in Gujranwala.",
              email: "apexforex0@gmail.com",
              telephone: "+92-316-6513780",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Plot Number 44-45, Mumtaz Market",
                addressLocality: "Gujranwala",
                addressRegion: "Punjab",
                addressCountry: "PK",
              },
              sameAs: [
                "https://www.instagram.com/apexforexacademy",
                "https://t.me/apexforexacademy",
                "https://www.tiktok.com/@apex.forex.academy",
                "https://www.youtube.com/@apexforexacademy",
                "https://www.facebook.com/share/1EniqmTA4D/",
                "https://wa.me/923166513780",
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://www.apexacademypk.com/#website",
              url: "https://www.apexacademypk.com/",
              name: "Apex Forex Academy",
              publisher: { "@id": "https://www.apexacademypk.com/#organization" },
              inLanguage: "en",
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="dark">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Preloader />
      <Navbar />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
