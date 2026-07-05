import Navbar from "./Navbar";
import LivingHero from "./LivingHero";
import BondSection from "./BondSection";
import ReasonsHorizontal from "./ReasonsHorizontal";
import ServiceCards from "./ServiceCards";

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
    title: "Other Services",
    href: "/services/other",
    description:
      "Virtual assistance, customer care, web and content support, telemarketing and paraplanning — one team for the busywork.",
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

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-ink font-body antialiased">
      <Navbar />

      <main>
        {/* Sticky stack — hero pins, services scrolls up and covers it */}
        <div className="stack">
          <div className="stack-pin">
            <LivingHero />
          </div>

          <section id="services" className="stack-over section-pad bg-background">
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
        </div>

        {/* Services → next: the 4 reasons scroll sideways across a pinned stage */}
        <ReasonsHorizontal />

        <BondSection />

        <section id="contact" className="bg-mint px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-[1500px]">
            {/* Mobile */}
            <div className="section-header-mobile lg:hidden">
              <p className="eyebrow bg-ink text-mint">Let&apos;s talk</p>
              <h2 className="section-heading-mobile">
                Build your empire
              </h2>
              <p className="section-subtitle-mobile">
                We&apos;ll watch the numbers
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
            <a href="/services/other">Other Services</a>
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
