import Navbar from "../../Navbar";

const filings = [
  {
    code: "SA100",
    title: "Self Assessment",
    desc: "Personal tax return for directors — every allowance found, every detail accounted for.",
  },
  {
    code: "CT600",
    title: "Corporation Tax",
    desc: "Year-end company tax return prepared, optimised, and filed with HMRC. No drama.",
  },
  {
    code: "VAT",
    title: "VAT Returns",
    desc: "MTD-compliant filings, partial exemption, EU and US sales — all handled.",
  },
  {
    code: "P60",
    title: "Payroll & P11D",
    desc: "PAYE, NI, pensions, P60s, and benefits-in-kind reported cleanly each cycle.",
  },
  {
    code: "ACC",
    title: "Year-End Accounts",
    desc: "Statutory accounts prepared, reviewed, and lodged with Companies House.",
  },
  {
    code: "CGT",
    title: "Capital Gains",
    desc: "Disposals reviewed, reliefs claimed, and reported within the deadline.",
  },
];

const timeline = [
  { month: "Apr", event: "Tax year begins", color: "text-mint" },
  { month: "Jul", event: "Self Assessment payment on account", color: "text-mint" },
  { month: "Oct", event: "Paper SA deadline", color: "text-mint" },
  { month: "Jan", event: "Online SA & balance due", color: "text-mint" },
  { month: "Mar", event: "Year-end planning window", color: "text-mint" },
];

export default function TaxationPage() {
  return (
    <div className="min-h-screen bg-background text-ink font-body antialiased">
      <Navbar />

      {/* ============ HERO — ink background ============ */}
      <section className="svc-hero relative overflow-hidden bg-ink pb-24 pt-14 text-white md:pb-32 md:pt-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 dot-grid-mint opacity-50"
        />

        {/* Floating "stamps" */}
        <span
          aria-hidden="true"
          className="absolute right-6 top-24 hidden h-32 w-32 rotate-12 items-center justify-center rounded-full border-4 border-mint/30 font-headline text-xl font-bold uppercase text-mint/60 md:flex"
          style={{ animation: "float 6s ease-in-out infinite" }}
        >
          Filed
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-10 left-10 hidden h-24 w-24 -rotate-6 items-center justify-center rounded-full border-4 border-mint/20 font-headline text-sm font-bold uppercase text-mint/50 lg:flex"
          style={{ animation: "float 7s ease-in-out infinite reverse" }}
        >
          On time
        </span>

        <div className="relative mx-auto grid max-w-[1500px] gap-12 px-5 md:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="rise">
            <p className="eyebrow bg-mint text-ink">Service 02 · Taxation</p>
            <h1 className="mt-6 font-headline font-bold uppercase leading-[0.84] text-mega text-mint">
              The tax man
              <br />
              waits for
              <br />
              <span className="text-white">nobody.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">
              Every filing, every deadline, every allowance — engineered so HMRC has nothing to flag and you have nothing to chase.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                className="btn px-7 py-4 text-base"
                style={{
                  background: "var(--mint)",
                  color: "var(--ink)",
                  border: "1px solid var(--mint)",
                }}
                href="/#contact"
              >
                Talk to us <span aria-hidden="true">›</span>
              </a>
              <a
                className="btn px-7 py-4 text-base"
                style={{
                  background: "transparent",
                  color: "white",
                  borderColor: "rgba(255,255,255,0.3)",
                }}
                href="#filings"
              >
                What we file <span aria-hidden="true">›</span>
              </a>
            </div>
          </div>

          {/* Calendar mock */}
          <div
            className="rise relative rounded-3xl border border-mint/20 bg-ink/40 p-5 backdrop-blur md:p-6"
            style={{ animationDelay: "120ms" }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <p className="font-headline text-2xl font-bold uppercase text-mint">
                Jan
              </p>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/55">
                Deadlines
              </p>
            </div>
            <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-white/55">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-1 text-center text-sm">
              {Array.from({ length: 35 }).map((_, i) => {
                const day = i - 1;
                const flag = day === 30; // Jan 31 highlighted
                const filed = day === 14 || day === 22;
                return (
                  <span
                    key={i}
                    className={`flex aspect-square items-center justify-center rounded-lg ${
                      day < 1 || day > 31
                        ? "text-white/20"
                        : flag
                          ? "bg-mint font-bold text-ink"
                          : filed
                            ? "border border-mint/50 text-mint"
                            : "text-white/80"
                    }`}
                  >
                    {day > 0 && day <= 31 ? day : ""}
                  </span>
                );
              })}
            </div>
            <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs text-white/70">
              <p className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-mint" /> 31 Jan — SA online deadline
              </p>
              <p className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full border border-mint/60" /> Already filed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TIMELINE BAND ============ */}
      <section className="border-b border-ink/10 bg-background py-10 md:py-14">
        <div className="mx-auto max-w-[1500px] px-5 md:px-8">
          <p className="eyebrow bg-mint text-ink">Tax calendar</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {timeline.map((t, i) => (
              <div
                key={t.month}
                className="rise rounded-2xl border border-ink/12 bg-cream px-5 py-5"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <p className="font-headline text-4xl font-bold uppercase leading-none text-ink">
                  {t.month}
                </p>
                <p className="mt-3 text-sm text-ink/70">{t.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FILINGS GRID ============ */}
      <section id="filings" className="section-pad bg-background">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-6 lg:grid-cols-[0.4fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow bg-mint text-ink">What we file</p>
              <h2 className="mt-5 font-headline text-section font-bold uppercase leading-[0.88] text-ink">
                Every form. Every year.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-ink/70 md:text-lg lg:justify-self-end">
              From statutory accounts to the smallest benefit-in-kind. We treat every filing like an opportunity to plan, not just paperwork to push.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filings.map((f, i) => (
              <article
                key={f.code}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-ink/12 bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:bg-mint rise"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <span className="inline-flex w-fit items-center rounded-full border border-ink/20 bg-background px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-ink">
                  {f.code}
                </span>
                <h3 className="font-headline text-3xl font-bold uppercase leading-none text-ink md:text-4xl">
                  {f.title}
                </h3>
                <p className="text-base leading-relaxed text-ink/70">{f.desc}</p>
                <span
                  aria-hidden="true"
                  className="mt-auto inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-ink"
                >
                  Read more
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    ›
                  </span>
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ QUOTE STRIP ============ */}
      <section className="bg-ink px-5 py-20 text-white md:px-8 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p
            aria-hidden="true"
            className="font-headline text-7xl font-bold leading-none text-mint md:text-9xl"
          >
            “
          </p>
          <p className="mt-4 font-headline text-3xl font-bold uppercase leading-[1.05] text-white md:text-5xl">
            We file before the deadline, not because of it.
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-mint/70">
            The Bookwise principle
          </p>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-mint px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto flex max-w-[1500px] flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-headline text-lg font-bold uppercase tracking-wider text-ink/60">
              Stop dreading January
            </p>
            <h2 className="mt-3 max-w-3xl font-headline text-section font-bold uppercase leading-[0.86] text-ink">
              Hand us the deadlines. Sleep through them.
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
