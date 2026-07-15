import Link from "next/link";

/* ============================================================
 *  OtherServicesSection — the support work around the numbers.
 *
 *  Same split layout as the taxation page: headline and copy
 *  on the left, the service list on a dark silk card on the
 *  right. Not region-specific — the list is identical for
 *  AU and UK visitors.
 * ============================================================ */

const services = [
  "Personal & virtual assistant support",
  "Customer care support",
  "Website & SEO support",
  "Social media management",
  "Content & post creation",
  "Outbound tele marketing",
  "Paraplanning",
];

export default function OtherServicesSection() {
  return (
    <section id="other-services" className="section-pad bg-cream">
      <div className="mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Left — headline + copy */}
        <div className="rise">
          <p className="eyebrow bg-ink text-mint">Service 03 · Other services</p>
          <h1 className="mt-6 font-headline text-section font-bold uppercase leading-[0.88] text-ink">
            Support beyond
            <br />
            the numbers
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70 md:text-lg">
            The same team that keeps your books clean can carry the busywork
            around them — from inbox and customers to content, calls and
            paraplanning.
          </p>
          <div className="mt-9">
            <Link className="btn btn-solid px-7 py-4 text-base" href="/contact">
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
            What we can take on
          </p>
          <ul className="mt-6 flex flex-col">
            {services.map((item, i) => (
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
