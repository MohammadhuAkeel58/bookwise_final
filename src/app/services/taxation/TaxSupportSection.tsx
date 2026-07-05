"use client";

import Link from "next/link";
import { useRegion } from "../../RegionProvider";

/* ============================================================
 *  TaxSupportSection — region-aware tax services.
 *
 *  The same six services, worded for the visitor's tax office:
 *  AU → GST / ATO / FBT, UK → VAT / HMRC / MTD / P11D.
 *  Split layout: headline + reassurance copy on the left, the
 *  service list on a dark silk card on the right. UK is the
 *  fallback when no region has been chosen yet.
 * ============================================================ */

type RegionContent = {
  eyebrow: string;
  headline: [string, string];
  body: string;
  listTitle: string;
  items: string[];
};

const CONTENT: Record<"au" | "uk", RegionContent> = {
  au: {
    eyebrow: "Tax services · Australia",
    headline: ["GST, ATO and", "everything between"],
    body: "Registration, returns, activity statements and audits — handled by people who deal with the ATO every day, so you never face it alone.",
    listTitle: "What we take off your plate",
    items: [
      "Advice on registering for GST",
      "Filing & adjusting GST returns",
      "Activity statements & advice on tax payments",
      "GST / FBT obligations",
      "ATO audit assistance",
      "Managing any ATO audits or disputes",
    ],
  },
  uk: {
    eyebrow: "Tax services · United Kingdom",
    headline: ["VAT, HMRC and", "everything between"],
    body: "Registration, returns, MTD submissions and enquiries — handled by people who deal with HMRC every day, so you never face it alone.",
    listTitle: "What we take off your plate",
    items: [
      "Advice on registering for VAT",
      "Filing & adjusting VAT returns",
      "Making Tax Digital (MTD) / VAT submissions & advice on tax payments",
      "VAT / P11D (Benefits in Kind) obligations",
      "HMRC enquiry & investigation assistance",
      "Managing any HMRC enquiries or tax disputes",
    ],
  },
};

export default function TaxSupportSection() {
  const { region } = useRegion();
  const content = CONTENT[region === "au" ? "au" : "uk"];

  return (
    <section id="tax-support" className="section-pad bg-cream">
      <div className="mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Left — headline + reassurance */}
        <div className="rise">
          <p className="eyebrow bg-ink text-mint">{content.eyebrow}</p>
          <h1 className="mt-6 font-headline text-section font-bold uppercase leading-[0.88] text-ink">
            {content.headline[0]}
            <br />
            {content.headline[1]}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70 md:text-lg">
            {content.body}
          </p>
          <div className="mt-9">
            <Link className="btn btn-solid px-7 py-4 text-base" href="/#contact">
              Talk to us <span aria-hidden="true">›</span>
            </Link>
          </div>
        </div>

        {/* Right — dark silk service card */}
        <div
          className="rise bg-ink rounded-2xl p-8 text-white md:p-10"
          style={{ animationDelay: "120ms" }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-mint">
            {content.listTitle}
          </p>
          <ul className="mt-6 flex flex-col">
            {content.items.map((item, i) => (
              <li
                key={item}
                className={`flex items-baseline gap-4 py-4 text-base leading-relaxed text-white/85 md:text-lg ${
                  i > 0 ? "border-t border-mint/15" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="font-headline text-sm font-bold text-accent"
                >
                  0{i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
