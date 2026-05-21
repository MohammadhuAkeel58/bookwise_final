import Navbar from "./Navbar";
import RegionGate from "./RegionGate";
import RegionalHero from "./RegionalHero";

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
    title: "We speak business",
    description: "Plain-English advice that connects the numbers to the choices in front of you.",
  },
  {
    title: "You do not panic",
    description: "You always know what is due, what is changing, and what needs attention.",
  },
  {
    title: "We plan ahead",
    description: "Tax, profit, and cash flow are reviewed before surprises become expensive.",
  },
  {
    title: "People first",
    description: "Support that feels direct, human, and useful when decisions get messy.",
  },
];

const process = [
  {
    step: "Step 1",
    label: "Talk to us",
    title: "Where are you at and what is keeping you up?",
    description:
      "We figure out what needs fixing, what can wait, and what should change first.",
  },
  {
    step: "Step 2",
    label: "Build defences",
    title: "Systems, habits, and records that protect your time",
    description:
      "We tighten bookkeeping, tax habits, expenses, and reporting so your position is clear.",
  },
  {
    step: "Step 3",
    label: "Review often",
    title: "Quarterly reporting that gives you control",
    description:
      "We flag issues, increase savings, and summarise your financial position before decisions stack up.",
  },
  {
    step: "Step 4",
    label: "Taxes sorted",
    title: "No unnecessary taxes, no surprises, no scramble",
    description:
      "Returns are filed accurately, tax is minimised legally, and deadlines stay calm.",
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
            <div className="grid gap-8 lg:grid-cols-[1fr_0.45fr] lg:items-end">
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

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {services.map((service, index) => (
                <article className="service-card" key={service.title}>
                  <div className="flex items-start justify-between">
                    <span className="service-number">0{index + 1}</span>
                    <span className="service-icon flex h-12 w-12 items-center justify-center rounded-full border border-mint/40 text-mint transition-all duration-300">
                      <span className="block h-6 w-6">{service.icon}</span>
                    </span>
                  </div>
                  <h3 className="mt-10 font-headline text-4xl font-bold uppercase leading-[0.9] text-mint">
                    {service.title}
                  </h3>
                  <p className="mt-6 text-base leading-relaxed text-white/86">
                    {service.description}
                  </p>
                  <a
                    href={service.href}
                    className="service-card-link group/btn inline-flex w-fit items-center gap-2 border-b border-mint/40 pt-8 pb-1 font-headline text-sm font-bold uppercase tracking-wider text-mint transition-all duration-200 hover:border-mint"
                  >
                    Learn more
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover/btn:translate-x-1"
                    >
                      ›
                    </span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad bg-ink text-white">
          <div className="mx-auto max-w-[1500px] text-center">
            <p className="eyebrow mx-auto bg-mint text-ink">Why choose us</p>
            <h2 className="mx-auto mt-5 max-w-4xl font-headline text-section font-bold uppercase leading-[0.9] text-white">
              Numbers are not for you
            </h2>
            <p className="mt-4 font-headline text-3xl font-bold uppercase text-mint">
              Bespoke accounting for modern entrepreneurs
            </p>

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
            <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow bg-mint text-ink">Process</p>
                <h2 className="mt-5 max-w-4xl font-headline text-section font-bold uppercase leading-[0.88] text-ink">
                  Do not run from the tax man
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
          <div className="mx-auto flex max-w-[1500px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
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
            <a href="#services">Quarterly Reports</a>
            <a href="#services">Annual Accounts</a>
            <a href="#services">VAT</a>
            <a href="#services">Self Assessment</a>
            <a href="#who">Who we help</a>
            <a href="#process">Process</a>
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
