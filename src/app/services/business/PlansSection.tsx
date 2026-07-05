"use client";

import Link from "next/link";
import { useRegion } from "../../RegionProvider";

/* ============================================================
 *  PlansSection — region-aware bookkeeping plans.
 *
 *  Instead of three parallel columns repeating the same rows,
 *  the shared services live once in an "every plan includes"
 *  panel, and each plan card lists only what it adds. Plan 02
 *  is the featured tier and takes the dark silk treatment.
 *  Content switches with the visitor's region: AU (ATO/GST)
 *  or UK (HMRC/VAT/CT600/MTD). UK is the fallback when no
 *  region has been chosen yet.
 * ============================================================ */

type Plan = {
  n: string;
  name: string;
  tagline: string;
  leadIn: string;
  featured: boolean;
  items: string[];
};

type RegionContent = {
  eyebrow: string;
  included: string[];
  plans: Plan[];
};

const CONTENT: Record<"au" | "uk", RegionContent> = {
  au: {
    eyebrow: "Bookkeeping plans · Australia",
    included: [
      "Xero, MYOB, QuickBooks & Reckon support",
      "Bank reconciliation",
      "Annual accounts & year-end financials",
      "GST reporting & lodging with ATO",
      "ATO management",
      "Profit & loss report",
      "Preparation of an annual budget",
      "Tax payment reminder service",
      "Annual business review meeting",
      "Email & phone support",
      "Year-end tax & budgeting advice",
    ],
    plans: [
      {
        n: "01",
        name: "Essentials + Payroll",
        tagline: "Compliance handled, staff paid right.",
        leadIn: "The essentials, plus payroll:",
        featured: false,
        items: [
          "Customised payslips",
          "PAYG, statutory sick pay & annual leave admin",
          "ATO payroll filing",
          "Summaries & analyses of staff costs",
          "Incentive schemes, bonuses & terminations",
        ],
      },
      {
        n: "02",
        name: "Growth",
        tagline: "A monthly rhythm with your accountant.",
        leadIn: "The essentials, plus:",
        featured: true,
        items: [
          "Monthly face-to-face business review",
          "Accounts payable & receivable, with reporting",
          "Bi-monthly performance reports & KPIs",
          "Online monthly transaction reviews & feedback",
          "GST preparation & review",
          "Monthly tax & business alerts",
          "Income tax returns prepared, filed & reminded",
          "Annual profit & cash flow plan",
        ],
      },
      {
        n: "03",
        name: "Performance",
        tagline: "Full visibility, forecasting and filing.",
        leadIn: "Everything in Growth, plus:",
        featured: false,
        items: [
          "Cash flow forecast & monitoring",
          "Monthly performance dashboard",
          "Detailed performance graphs & reports",
          "Annual budget & cash flow",
          "Monthly business review",
          "Preparation & filing of GST, PAYE & FBT returns",
        ],
      },
    ],
  },
  uk: {
    eyebrow: "Bookkeeping plans · United Kingdom",
    included: [
      "Xero, MYOB, QuickBooks & Reckon support",
      "Bank reconciliation",
      "Annual accounts & year-end financials",
      "VAT reporting & filing with HMRC",
      "HMRC management",
      "Corporation Tax returns (CT600)",
      "Making Tax Digital (MTD) compliance",
      "Monthly management accounts",
      "Profit & loss report",
      "Preparation of an annual budget",
      "Tax payment reminder service",
      "Annual business review meeting",
      "Email & phone support",
      "Year-end tax & budgeting advice",
    ],
    plans: [
      {
        n: "01",
        name: "Essentials + Payroll",
        tagline: "Compliance handled, staff paid right.",
        leadIn: "The essentials, plus payroll:",
        featured: false,
        items: [
          "Customised payslips",
          "PAYE, NIC & P11D administration",
          "HMRC filing — Real Time Information (RTI)",
          "Year-end P60s & P45s, prepared & distributed",
          "Tronc (gratuity & tips) management",
          "Summaries & analyses of staff costs",
          "Incentive schemes, bonuses & terminations",
        ],
      },
      {
        n: "02",
        name: "Growth",
        tagline: "A monthly rhythm with your accountant.",
        leadIn: "The essentials, plus:",
        featured: true,
        items: [
          "Monthly face-to-face business review",
          "Accounts payable & receivable, with reporting",
          "Bi-monthly performance reports & KPIs",
          "Online monthly transaction reviews & feedback",
          "VAT preparation & review",
          "Monthly tax & business alerts",
          "Income tax returns prepared, filed & reminded",
          "Annual profit & cash flow plan",
        ],
      },
      {
        n: "03",
        name: "Performance",
        tagline: "Weekly payruns, forecasting and full visibility.",
        leadIn: "Everything in Growth, plus:",
        featured: false,
        items: [
          "Weekly payrun management — PAYE, proforma & quotation",
          "Cash flow forecast for weekly payruns",
          "Reminders for receivable collections",
          "Cash flow forecast & monitoring",
          "Monthly performance dashboard",
          "Detailed performance graphs & reports",
          "Annual budget & cash flow",
          "Monthly business review",
        ],
      },
    ],
  },
};

export default function PlansSection() {
  const { region } = useRegion();
  const content = CONTENT[region === "au" ? "au" : "uk"];

  return (
    <section id="plans" className="section-pad bg-cream">
      <div className="mx-auto max-w-[1500px]">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mx-auto bg-ink text-mint">{content.eyebrow}</p>
          <h2 className="mt-5 font-headline text-section font-bold uppercase leading-[0.88] text-ink">
            Pick your level of support
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/70 md:text-lg">
            Every plan covers the essentials below. Step up when you want more
            insight, rhythm and forecasting.
          </p>
        </div>

        {/* Every plan includes */}
        <div className="rise mt-12 rounded-2xl border border-ink/12 bg-white p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            Every plan includes
          </p>
          <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {content.included.map((item) => (
              <li
                key={item}
                className="flex items-baseline gap-2.5 text-[0.95rem] leading-relaxed text-ink/80"
              >
                <span aria-hidden="true" className="font-bold text-ink">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Plan cards */}
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {content.plans.map((plan, i) => (
            <article
              key={plan.n}
              className={`rise relative flex flex-col rounded-2xl p-7 md:p-8 ${
                plan.featured
                  ? "bg-ink text-white"
                  : "border border-ink/12 bg-white text-ink"
              }`}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              {plan.featured && (
                <span className="absolute -top-3.5 left-7 rounded-full bg-accent px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-white">
                  Most popular
                </span>
              )}

              <p
                className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                  plan.featured ? "text-mint/70" : "text-ink/50"
                }`}
              >
                Plan {plan.n}
              </p>
              <h3 className="mt-3 font-headline text-3xl font-bold uppercase leading-none md:text-4xl">
                {plan.name}
              </h3>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  plan.featured ? "text-white/70" : "text-ink/65"
                }`}
              >
                {plan.tagline}
              </p>

              <p
                className={`mt-6 border-t pt-5 text-xs font-bold uppercase tracking-[0.14em] ${
                  plan.featured
                    ? "border-mint/20 text-mint"
                    : "border-ink/10 text-ink/70"
                }`}
              >
                {plan.leadIn}
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {plan.items.map((item) => (
                  <li
                    key={item}
                    className={`flex items-baseline gap-2.5 text-[0.95rem] leading-relaxed ${
                      plan.featured ? "text-white/85" : "text-ink/80"
                    }`}
                  >
                    <span aria-hidden="true" className="font-bold text-accent">
                      +
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-2">
                <Link
                  className={`btn w-full justify-center px-6 py-4 text-base ${
                    plan.featured ? "btn-solid" : "btn-outline"
                  }`}
                  href="/#contact"
                >
                  Talk to us <span aria-hidden="true">›</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink/55">
          Not sure which fits? Start with a call — we&apos;ll map your books to
          the right plan in fifteen minutes.
        </p>
      </div>
    </section>
  );
}
