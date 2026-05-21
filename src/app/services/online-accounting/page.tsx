import Navbar from "../../Navbar";

const features = [
  {
    title: "Real-time visibility",
    desc: "Live P&L, cash position, and runway updated as transactions hit your bank.",
    n: "01",
  },
  {
    title: "Receipt capture",
    desc: "Snap, email, or forward — receipts auto-matched and filed against the right line.",
    n: "02",
  },
  {
    title: "Bank feeds",
    desc: "Connected feeds from every major UK and AU bank. No CSV uploads, ever again.",
    n: "03",
  },
  {
    title: "Smart reports",
    desc: "Custom dashboards built around what you actually want to know each week.",
    n: "04",
  },
  {
    title: "Bank-grade security",
    desc: "256-bit encryption, MFA, and SOC 2-compliant infrastructure under the hood.",
    n: "05",
  },
  {
    title: "Work from anywhere",
    desc: "Desktop, tablet, phone. Same numbers. Same source of truth. Always synced.",
    n: "06",
  },
];

const stack = [
  "Xero",
  "QuickBooks",
  "FreeAgent",
  "Dext",
  "Stripe",
  "Wise",
  "Revolut",
  "Hubdoc",
];

export default function OnlineAccountingPage() {
  return (
    <div className="min-h-screen bg-background text-ink font-body antialiased">
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="svc-hero relative overflow-hidden bg-background pb-32 pt-14 md:pb-40 md:pt-20">
        <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-100" />
        {/* gradient orbs */}
        <span
          aria-hidden="true"
          className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-aqua/40 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-mint blur-3xl opacity-70"
        />

        <div className="relative mx-auto grid max-w-[1500px] gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="rise">
            <p className="eyebrow bg-ink text-mint">Service 03 · Online</p>
            <h1 className="mt-6 font-headline font-bold uppercase leading-[0.84] text-ink text-mega">
              Accounting,
              <br />
              <span className="text-aqua">in the cloud.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/75 md:text-xl">
              Live dashboards, automated feeds, and real-time numbers. The future of accounting is open in your browser — and ours.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a className="btn btn-solid px-7 py-4 text-base" href="/#contact">
                Get a demo <span aria-hidden="true">›</span>
              </a>
              <a
                className="btn btn-outline px-7 py-4 text-base"
                href="#features"
              >
                See features <span aria-hidden="true">›</span>
              </a>
            </div>

            <div className="mt-10 flex items-center gap-4 text-sm text-ink/60">
              <span className="flex h-2 w-2 rounded-full bg-mint">
                <span className="h-full w-full animate-ping rounded-full bg-mint" />
              </span>
              <span className="font-semibold uppercase tracking-widest">
                Synced 14 seconds ago
              </span>
            </div>
          </div>

          {/* Mock dashboard preview */}
          <div className="rise relative h-[520px]" style={{ animationDelay: "150ms" }}>
            {/* Main panel */}
            <div className="absolute right-0 top-4 w-[88%] rounded-3xl border border-ink/15 bg-white p-6 shadow-[0_30px_80px_-30px_rgba(8,36,30,0.35)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-mint" />
                  <span className="h-3 w-3 rounded-full bg-aqua" />
                  <span className="h-3 w-3 rounded-full bg-ink/15" />
                </div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-ink/50">
                  Bookwise Cloud
                </p>
              </div>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-ink/55">
                    Revenue (MTD)
                  </p>
                  <p className="mt-2 font-headline text-5xl font-bold text-ink">
                    £42.8k
                  </p>
                </div>
                <span className="rounded-full bg-mint px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink">
                  +24%
                </span>
              </div>

              {/* Chart SVG */}
              <svg
                viewBox="0 0 280 110"
                className="mt-6 w-full"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#08241e" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#08241e" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 80 L30 70 L60 75 L90 55 L120 60 L150 40 L180 48 L210 28 L240 36 L280 18 L280 110 L0 110 Z"
                  fill="url(#g1)"
                />
                <path
                  d="M0 80 L30 70 L60 75 L90 55 L120 60 L150 40 L180 48 L210 28 L240 36 L280 18"
                  stroke="#08241e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="280" cy="18" r="5" fill="#dcfae8" stroke="#08241e" strokeWidth="2" />
              </svg>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { l: "Expenses", v: "£18.2k" },
                  { l: "Profit", v: "£24.6k" },
                  { l: "Runway", v: "11 mo" },
                ].map((m) => (
                  <div
                    key={m.l}
                    className="rounded-xl bg-cream p-3"
                  >
                    <p className="text-[0.6rem] font-semibold uppercase tracking-widest text-ink/55">
                      {m.l}
                    </p>
                    <p className="mt-1 font-headline text-xl font-bold text-ink">
                      {m.v}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating cards */}
            <div
              className="mock-card left-0 top-32 w-56"
              style={{ animationDelay: "0.5s" }}
            >
              <p className="text-[0.6rem] font-semibold uppercase tracking-widest text-ink/55">
                New invoice paid
              </p>
              <p className="mt-1 font-headline text-2xl font-bold text-ink">
                +£3,200
              </p>
              <p className="mt-1 text-xs text-ink/60">Acme Studio · Just now</p>
            </div>

            <div
              className="mock-card -bottom-2 left-12 w-64 bg-ink text-white"
              style={{ animationDelay: "1.2s" }}
            >
              <p className="text-[0.6rem] font-semibold uppercase tracking-widest text-mint/60">
                Bank feed · synced
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-mint" />
                <p className="font-headline text-base font-bold text-mint">
                  24 transactions matched
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INTEGRATIONS ============ */}
      <section className="border-y border-ink/10 bg-cream py-12 md:py-16">
        <div className="mx-auto max-w-[1500px] px-5 md:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-ink/55">
            Built on tools you already know
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {stack.map((s, i) => (
              <span
                key={s}
                className="rise rounded-full border border-ink/15 bg-background px-5 py-2.5 font-headline text-base font-bold uppercase tracking-wide text-ink transition-colors duration-200 hover:bg-mint"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section id="features" className="section-pad bg-background">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-6 lg:grid-cols-[0.45fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow bg-mint text-ink">Features</p>
              <h2 className="mt-5 font-headline text-section font-bold uppercase leading-[0.88] text-ink">
                Always on. Always current.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-ink/70 md:text-lg lg:justify-self-end">
              The numbers don&apos;t wait until month-end. Neither should you. Bookwise Cloud is built to be open every day, not just when something&apos;s wrong.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <article
                key={f.n}
                className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-ink/12 bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-aqua/30 rise"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink/60">
                    {f.n}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 text-ink transition-all duration-200 group-hover:bg-ink group-hover:text-mint"
                  >
                    ›
                  </span>
                </div>
                <h3 className="mt-3 font-headline text-2xl font-bold uppercase leading-none text-ink md:text-3xl">
                  {f.title}
                </h3>
                <p className="text-base leading-relaxed text-ink/70">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TICKER ============ */}
      <section className="border-y border-ink/10 bg-ink py-8 text-white">
        <div className="marquee">
          <div className="marquee-track font-headline text-3xl font-bold uppercase text-mint md:text-5xl">
            {[
              "Live numbers",
              "Cloud-native",
              "Bank feeds",
              "Auto-matched",
              "Real-time P&L",
              "Live numbers",
              "Cloud-native",
              "Bank feeds",
              "Auto-matched",
              "Real-time P&L",
            ].map((t, i) => (
              <span key={i} className="flex items-center gap-12">
                {t}
                <span aria-hidden="true" className="text-white/40">
                  ●
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden bg-background px-5 py-24 md:px-8 md:py-32">
        <span
          aria-hidden="true"
          className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-aqua/40 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-mint blur-3xl"
        />
        <div className="relative mx-auto flex max-w-[1500px] flex-col items-center text-center">
          <p className="eyebrow bg-mint text-ink">Demo it</p>
          <h2 className="mt-6 max-w-3xl font-headline text-section font-bold uppercase leading-[0.86] text-ink">
            See your business, live.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/70 md:text-lg">
            Book a 20-minute walkthrough. We&apos;ll plug into your bank feeds and show you your numbers in real time.
          </p>
          <a
            className="btn btn-solid mt-8 justify-center px-10 py-5 text-lg"
            href="/#contact"
          >
            Book a demo <span aria-hidden="true">›</span>
          </a>
        </div>
      </section>
    </div>
  );
}
