import Navbar from "../../Navbar";

const capabilities = [
  {
    n: "01",
    title: "Bank Reconciliation",
    desc: "Every transaction matched, categorised, and tied back to the source. No mystery entries, no creeping errors.",
  },
  {
    n: "02",
    title: "Accounts Payable",
    desc: "Supplier bills scheduled, approved, and paid before they get expensive. Cash out, on your terms.",
  },
  {
    n: "03",
    title: "Accounts Receivable",
    desc: "Invoices sent fast, followed up faster. We turn outstanding balances into actual money in the bank.",
  },
  {
    n: "04",
    title: "Management Accounts",
    desc: "Monthly P&L, Balance Sheet, and Cash Flow — distilled into the three numbers you actually need.",
  },
];

const operations = [
  "Bookkeeping",
  "Reconciliations",
  "Invoicing",
  "Payables",
  "Receivables",
  "Cash Flow",
  "Reporting",
  "Forecasting",
  "Compliance",
  "Audit Prep",
];

const stats = [
  { value: "100%", label: "Reconciled monthly" },
  { value: "48h", label: "Average response" },
  { value: "0", label: "Missed deadlines" },
  { value: "1:1", label: "Dedicated lead" },
];

export default function BusinessServicesPage() {
  return (
    <div className="min-h-screen bg-background text-ink font-body antialiased">
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="svc-hero relative overflow-hidden bg-cream pb-24 pt-14 md:pb-32 md:pt-20">
        <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-60" />
        <div className="relative mx-auto grid max-w-[1500px] gap-12 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="rise">
            <p className="eyebrow bg-mint text-ink">Service 01 · Business</p>
            <h1 className="mt-6 font-headline font-bold uppercase leading-[0.84] text-ink text-mega">
              Books that
              <br />
              don&apos;t lie.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/75 md:text-xl">
              The day-to-day work of finance — done cleanly, on time, with numbers you can actually trust when the stakes get real.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a className="btn btn-solid px-7 py-4 text-base" href="/#contact">
                Talk to us <span aria-hidden="true">›</span>
              </a>
              <a
                className="btn btn-outline px-7 py-4 text-base"
                href="#capabilities"
              >
                What&apos;s included <span aria-hidden="true">›</span>
              </a>
            </div>
          </div>

          {/* Hero visual — stacked stat tiles */}
          <div
            className="rise relative grid grid-cols-2 gap-3"
            style={{ animationDelay: "120ms" }}
          >
            <div className="rounded-2xl border border-ink/15 bg-background p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink/55">
                Cash in
              </p>
              <p className="mt-3 font-headline text-4xl font-bold text-ink md:text-5xl">
                £128k
              </p>
              <div className="mt-3 flex items-end gap-1">
                {[40, 60, 35, 70, 55, 80, 65].map((h, i) => (
                  <span
                    key={i}
                    className="w-3 rounded-t bg-ink"
                    style={{ height: `${h * 0.4}px` }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-ink/15 bg-ink p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-mint/70">
                Cash out
              </p>
              <p className="mt-3 font-headline text-4xl font-bold text-mint md:text-5xl">
                £84k
              </p>
              <div className="mt-3 flex items-end gap-1">
                {[50, 30, 65, 40, 75, 45, 60].map((h, i) => (
                  <span
                    key={i}
                    className="w-3 rounded-t bg-mint"
                    style={{ height: `${h * 0.4}px` }}
                  />
                ))}
              </div>
            </div>
            <div className="col-span-2 rounded-2xl border border-ink/15 bg-mint p-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-ink/60">
                    Net this month
                  </p>
                  <p className="mt-3 font-headline text-5xl font-bold text-ink md:text-6xl">
                    +£44,318
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1 text-xs font-semibold uppercase tracking-wider text-mint">
                  ▲ 18%
                </span>
              </div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-ink/10">
                <div className="h-full w-[68%] rounded-full bg-ink" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <section className="border-y border-ink/10 bg-background py-8">
        <div className="marquee">
          <div className="marquee-track font-headline text-4xl font-bold uppercase text-ink/85 md:text-6xl">
            {[...operations, ...operations].map((op, i) => (
              <span key={i} className="flex items-center gap-12">
                {op}
                <span aria-hidden="true" className="text-mint">
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CAPABILITIES ============ */}
      <section id="capabilities" className="section-pad bg-background">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.36fr_1fr] lg:gap-20">
          <div className="lg:sticky-col">
            <p className="eyebrow bg-mint text-ink">Inside the service</p>
            <h2 className="mt-5 font-headline text-section font-bold uppercase leading-[0.88] text-ink">
              Four pillars
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70 md:text-lg">
              We focus on the daily work that compounds quietly — the systems and habits that make every other financial decision easier.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {capabilities.map((c, i) => (
              <article
                key={c.n}
                className="cap-card rise"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <span className="cap-number">{c.n}</span>
                <h3 className="font-headline text-3xl font-bold uppercase leading-none text-ink md:text-4xl">
                  {c.title}
                </h3>
                <p className="text-base leading-relaxed text-ink/70">
                  {c.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="section-pad bg-ink text-white">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-6 lg:grid-cols-[0.5fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow bg-mint text-ink">By the numbers</p>
              <h2 className="mt-5 font-headline text-section font-bold uppercase leading-[0.88] text-white">
                Quiet, clean, accurate
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-white/70 md:text-lg lg:justify-self-end">
              We measure ourselves by the things that should never happen — missed entries, late filings, surprises at year-end.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="stat-card rise"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <p className="font-headline text-5xl font-bold leading-none text-mint md:text-6xl">
                  {s.value}
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-mint px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto flex max-w-[1500px] flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-headline text-lg font-bold uppercase tracking-wider text-ink/60">
              Ready when you are
            </p>
            <h2 className="mt-3 max-w-3xl font-headline text-section font-bold uppercase leading-[0.86] text-ink">
              Hand us the books. Get your evenings back.
            </h2>
          </div>
          <a
            className="btn btn-solid shrink-0 justify-center px-8 py-5 text-lg"
            href="/#contact"
          >
            Talk to us <span aria-hidden="true">›</span>
          </a>
        </div>
      </section>
    </div>
  );
}
