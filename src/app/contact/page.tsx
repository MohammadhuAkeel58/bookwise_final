import type { Metadata } from "next";
import Navbar from "../Navbar";
import ContactFlagBackdrop from "../ContactFlagBackdrop";
import ContactForm from "../ContactForm";

export const metadata: Metadata = {
  title: "Contact — Talk to Your Accountants",
  description:
    "Get in touch with Commonwealth Accounting Partners for bookkeeping, tax and advisory across the UK and Australia. Tell us what you need — we reply within one working day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Commonwealth Accounting Partners",
    description:
      "Bookkeeping, tax and advisory for UK and Australian businesses. We reply within one working day.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-ink text-white font-body antialiased">
      <Navbar />

      <section className="relative overflow-hidden">
        <ContactFlagBackdrop />

        <div className="relative z-[1] mx-auto max-w-[1500px] px-5 py-20 md:px-8 md:py-28 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            {/* Left — headline + details */}
            <div>
              <p
                className="font-headline text-xs font-bold uppercase tracking-[0.32em]"
                style={{ color: "#b99328" }}
              >
                Contact
              </p>
              <h1 className="mt-4 font-headline text-[clamp(2.4rem,7vw,4.6rem)] font-bold uppercase leading-[0.9] text-[#f6f4ee] [text-shadow:0_6px_40px_rgba(1,8,34,0.7)]">
                Talk to
                <br />
                your{" "}
                <span
                  className="text-mint"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    textTransform: "none",
                  }}
                >
                  accountants
                </span>
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-mint/70">
                Tell us where your business is based and what you need.
                Bookkeeping, tax, or a second opinion — we&apos;ll come back
                within one working day.
              </p>

              <div className="mt-9 space-y-5">
                <a
                  href="mailto:hello@comaccpar.com"
                  className="flex items-center gap-3 transition-opacity hover:opacity-80"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mint text-ink">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>
                  <span>
                    <span
                      className="block text-[0.62rem] font-semibold uppercase tracking-[0.2em]"
                      style={{ color: "#b99328" }}
                    >
                      Email
                    </span>
                    <span className="text-[#f6f4ee]">hello@comaccpar.com</span>
                  </span>
                </a>

                <a
                  href="tel:+61437487578"
                  className="flex items-center gap-3 transition-opacity hover:opacity-80"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mint text-ink">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
                    </svg>
                  </span>
                  <span>
                    <span
                      className="block text-[0.62rem] font-semibold uppercase tracking-[0.2em]"
                      style={{ color: "#b99328" }}
                    >
                      Phone
                    </span>
                    <span className="text-[#f6f4ee]">0437 487 578</span>
                  </span>
                </a>

                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mint text-ink">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
                    </svg>
                  </span>
                  <span>
                    <span
                      className="block text-[0.62rem] font-semibold uppercase tracking-[0.2em]"
                      style={{ color: "#b99328" }}
                    >
                      Regions
                    </span>
                    <span className="text-[#f6f4ee]">
                      United Kingdom · Australia
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

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
            <a href="/#services">Our services</a>
            <a href="/#process">Process</a>
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
