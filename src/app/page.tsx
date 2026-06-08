import Navbar from "./Navbar";
import RegionGate from "./RegionGate";
import RegionalHero from "./RegionalHero";
import ServiceCards from "./ServiceCards";

const audiences = [
  {
    title: "Founders",
    description: "Support for entrepreneurs juggling sales, delivery, hiring, and cash flow.",
  },
  {
    title: "Studios",
    description: "Clean reporting for teams that need sharper numbers before each decision.",
  },
  {
    title: "Consultants",
    description: "Practical tax planning for independent experts building durable income.",
  },
  {
    title: "Agencies",
    description: "Month-by-month visibility across projects, payroll, VAT, and profit.",
  },
  {
    title: "Creators",
    description: "Accounting that keeps pace with modern income streams and expenses.",
  },
  {
    title: "Small Teams",
    description: "A dependable finance rhythm without the overhead of an in-house department.",
  },
];

const services = [
  {
    title: "Business Services",
    href: "/services/business",
    description:
      "Bookkeeping, reconciliations, payables, and receivables handled so your numbers stay clean and decisions stay sharp.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path
          d="M8 13h24a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V15a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M15 13v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M6 22h28" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Taxation Services",
    href: "/services/taxation",
    description:
      "Self Assessment, Corporation Tax, VAT, and year-end filings — accurate, on time, and planned ahead of every deadline.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path
          d="M12 6h12l8 8v18a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M24 6v8h8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path
          d="M16 24l8-8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="17" cy="21" r="1.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="23" cy="27" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Online Accounting",
    href: "/services/online-accounting",
    description:
      "Cloud-based accounting that gives you live visibility into your business, anywhere, on any device.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path
          d="M12 24a6 6 0 0 1 1.5-11.8A8 8 0 0 1 29 14a5.5 5.5 0 0 1 .5 11H13a5 5 0 0 1-1-1Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M16 30l2-3 3 2 3-4 3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const reasons = [
  {
    title: "Books that stay clean",
    description: "Bookkeeping, reconciliations, and payables handled monthly so your numbers are always decision-ready.",
  },
  {
    title: "Tax planned ahead",
    description: "Self Assessment, Corporation Tax, and VAT mapped out before deadlines — no scrambles, no surprise bills.",
  },
  {
    title: "Live in the cloud",
    description: "Online accounting gives you real-time visibility into cash, profit, and obligations from any device.",
  },
  {
    title: "People first",
    description: "Plain-English support from a team that picks up the phone when decisions get messy.",
  },
];

const process = [
  {
    step: "Step 1",
    label: "Talk to us",
    title: "Where are you at and what is keeping you up?",
    description:
      "We figure out what needs fixing, what can wait, and which of the three pillars — books, tax, or cloud — to start with.",
  },
  {
    step: "Step 2",
    label: "Clean the books",
    title: "Bookkeeping and reconciliations done right",
    description:
      "We tidy your ledger, payables, and receivables so every figure ties back to a source and decisions stay sharp.",
  },
  {
    step: "Step 3",
    label: "Go live online",
    title: "Cloud accounting you can actually read",
    description:
      "We move you onto online accounting so cash, profit, and VAT positions are visible from any device, in real time.",
  },
  {
    step: "Step 4",
    label: "Taxes sorted",
    title: "Self Assessment, Corporation Tax, and VAT, calmly filed",
    description:
      "Returns are prepared accurately, tax is minimised legally, and every deadline is mapped well ahead of time.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-ink font-body antialiased">
      <RegionGate />
      <Navbar />

      <main>
        <RegionalHero />

        <section id="services" className="section-pad bg-background">
          <div className="mx-auto max-w-[1500px]">
            {/* ---------- Section header ---------- */}
            {/* Mobile: sticky eyebrow → big heading → subtitle */}
            <div className="section-header-mobile lg:hidden">
              <p className="eyebrow bg-mint text-ink">Our services</p>
              <h2 className="section-heading-mobile">
                Built for resilience
              </h2>
              <p className="section-subtitle-mobile">
                Three pillars, one focus
              </p>
            </div>

            {/* Tablet + desktop: original side-by-side header */}
            <div className="hidden gap-8 lg:grid lg:grid-cols-[1fr_0.45fr] lg:items-end">
              <div>
                <p className="eyebrow bg-mint text-ink">Our services</p>
                <h2 className="mt-5 max-w-5xl font-headline text-section font-bold uppercase leading-[0.86] text-ink">
                  Built for resilience
                </h2>
              </div>
              <p className="max-w-xl text-lg leading-relaxed text-ink/75">
                Business support, taxation, and online accounting — three pillars that keep your finances tidy, compliant, and a step ahead of every deadline.
              </p>
            </div>

            {/* Region-aware cards — UK "Ledger House" / AU "Open Sky" */}
            <div className="mt-12">
              <ServiceCards services={services} />
            </div>
          </div>
        </section>

        <section className="section-pad bg-ink text-white">
          <div className="mx-auto max-w-[1500px]">
            {/* Mobile header — centered stack matching other sections */}
            <div className="section-header-mobile section-header-mobile--dark lg:hidden">
              <p className="eyebrow bg-mint text-ink">Why choose us</p>
              <h2 className="section-heading-mobile">
                We handle
                <br />
                the numbers
              </h2>
              <p className="section-subtitle-mobile">
                Books, tax, and cloud — covered
              </p>
            </div>

            {/* Desktop header */}
            <div className="hidden lg:block lg:text-center">
              <p className="eyebrow mx-auto bg-mint text-ink">Why choose us</p>
              <h2 className="mx-auto mt-5 max-w-4xl font-headline text-section font-bold uppercase leading-[0.9] text-white">
                We handle the numbers
              </h2>
              <p className="mt-4 font-headline text-3xl font-bold uppercase text-mint">
                Bookkeeping, taxation, and online accounting — under one roof
              </p>
            </div>

            <div className="mt-12 grid gap-0 md:grid-cols-2 xl:grid-cols-4">
              {reasons.map((reason) => (
                <article className="reason-card" key={reason.title}>
                  <h3 className="font-headline text-3xl font-bold uppercase leading-none text-mint">
                    {reason.title}
                  </h3>
                  <p className="mt-6 text-base leading-relaxed text-white/86">
                    {reason.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section-pad bg-background">
          <div className="mx-auto max-w-[1500px]">
            {/* Mobile header */}
            <div className="section-header-mobile mb-10 lg:hidden">
              <p className="eyebrow bg-mint text-ink">Process</p>
              <h2 className="section-heading-mobile">
                How Bookwise gets to work
              </h2>
              <p className="section-subtitle-mobile">
                From first call to filed return
              </p>
              <a
                className="btn btn-solid mt-7 px-6"
                href="#contact"
              >
                Talk to us <span aria-hidden="true">›</span>
              </a>
            </div>

            {/* Desktop header */}
            <div className="mb-10 hidden gap-5 lg:flex lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow bg-mint text-ink">Process</p>
                <h2 className="mt-5 max-w-4xl font-headline text-section font-bold uppercase leading-[0.88] text-ink">
                  How Bookwise gets to work
                </h2>
              </div>
              <a className="btn btn-solid self-start md:self-end" href="#contact">
                Talk to us <span aria-hidden="true">›</span>
              </a>
            </div>

            <div className="grid gap-4">
              {process.map((item) => (
                <article className="process-row" key={item.step}>
                  <div>
                    <p className="text-sm font-semibold uppercase text-ink/60">{item.step}</p>
                    <p className="mt-2 font-headline text-2xl font-bold uppercase text-ink">
                      {item.label}
                    </p>
                  </div>
                  <h3 className="font-headline text-3xl font-bold uppercase leading-none text-ink md:text-5xl">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-ink/70 md:text-lg">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-mint px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-[1500px]">
            {/* Mobile */}
            <div className="section-header-mobile lg:hidden">
              <p className="eyebrow bg-ink text-mint">Let's talk</p>
              <h2 className="section-heading-mobile">
                Build your empire
              </h2>
              <p className="section-subtitle-mobile">
                We'll watch the numbers
              </p>
              <a className="btn btn-solid mt-7 px-7 py-4 text-base" href="#">
                Talk to us <span aria-hidden="true">›</span>
              </a>
            </div>

            {/* Desktop */}
            <div className="hidden gap-8 lg:flex lg:items-center lg:justify-between">
              <div>
                <p className="font-headline text-2xl font-bold uppercase text-ink/70">
                  Accounting for the modern entrepreneur
                </p>
                <h2 className="mt-4 max-w-4xl font-headline text-section font-bold uppercase leading-[0.85] text-ink">
                  Build your empire. We will watch the numbers.
                </h2>
              </div>
              <a className="btn btn-solid shrink-0 justify-center px-8 py-4 text-lg" href="#">
                Talk to us <span aria-hidden="true">›</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink px-5 py-12 text-white md:px-8">
        <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-[1fr_1.2fr_1fr]">
          <div>
            <p className="font-headline text-4xl font-bold uppercase leading-[0.8]">
              Book
              <br />
              wise
            </p>
            <p className="mt-5 max-w-xs text-white/70">
              Accountants for ambitious businesses that would rather be building.
            </p>
          </div>
          <nav className="grid gap-3 text-white/80 sm:grid-cols-2">
            <a href="/services/business">Business Services</a>
            <a href="/services/taxation">Taxation Services</a>
            <a href="/services/online-accounting">Online Accounting</a>
            <a href="#services">Our services</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="text-sm text-white/60 md:text-right">
            <p>© 2026 Bookwise. All rights reserved.</p>
            <p className="mt-3">Privacy · Terms · Compliance</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
