import Navbar from "./Navbar";
import LivingHero from "./LivingHero";
import BondSection from "./BondSection";
import ReasonsHorizontal from "./ReasonsHorizontal";
import ServiceCards from "./ServiceCards";
import TestimonialSpotlight from "./TestimonialSpotlight";
import {
  SceneArt,
  LedgerFigure,
  FilingFigure,
  HeadsetFigure,
  ChatFigure,
} from "@/components/ui/scene-art";

const services = [
  {
    title: "Business Services",
    href: "/services/business",
    description:
      "Bookkeeping, reconciliations, payables, and receivables handled so your numbers stay clean and decisions stay sharp.",
    icon: (
      <SceneArt size="6.75rem">
        <LedgerFigure />
      </SceneArt>
    ),
  },
  {
    title: "Taxation Services",
    href: "/services/taxation",
    description:
      "Self Assessment, Corporation Tax, VAT, and year-end filings, accurate, on time, and planned ahead of every deadline.",
    icon: (
      <SceneArt size="6.75rem" delay={-2.5}>
        <FilingFigure />
      </SceneArt>
    ),
  },
  {
    title: "Other Services",
    href: "/services/other",
    description:
      "Virtual assistance, customer care, web and content support, telemarketing and paraplanning. One team for the busywork.",
    icon: (
      <SceneArt size="6.75rem" delay={-5}>
        <HeadsetFigure />
      </SceneArt>
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
                Business support, taxation, and online accounting. Three pillars that keep your finances tidy, compliant, and a step ahead of every deadline.
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

        <TestimonialSpotlight />

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
              <a
                className="btn btn-solid mt-7 px-7 py-4 text-base"
                href="/contact"
              >
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
              <span className="cta-art-host shrink-0">
                <SceneArt size="7rem">
                  <ChatFigure />
                </SceneArt>
              </span>
              <a
                className="btn btn-solid shrink-0 justify-center px-8 py-4 text-lg"
                href="/contact"
              >
                Talk to us <span aria-hidden="true">›</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink px-5 py-12 text-white md:px-8">
        <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-[1fr_1.2fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/commonwealth-logo.svg"
                alt=""
                className="h-14 w-auto shrink-0"
              />
              <p className="font-headline text-3xl font-bold uppercase leading-[0.85]">
                Commonwealth
                <span className="mt-1.5 block text-[0.65rem] font-semibold tracking-[0.28em] text-white/60">
                  Accounting Partners
                </span>
              </p>
            </div>
            <p className="mt-5 max-w-xs text-white/70">
              Accurate records. Stronger business. Global partners.
            </p>
          </div>
          <nav className="grid gap-3 text-white/80 sm:grid-cols-2">
            <a href="/services/business">Business Services</a>
            <a href="/services/taxation">Taxation Services</a>
            <a href="/services/other">Other Services</a>
            <a href="#services">Our services</a>
            <a href="#process">Process</a>
            <a href="/contact">Contact</a>
          </nav>
          <div className="text-sm text-white/60 md:text-right">
            <p>© 2026 Commonwealth Accounting Partners. All rights reserved.</p>
            <p className="mt-3">Privacy · Terms · Compliance</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
