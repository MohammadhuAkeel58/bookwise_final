import Link from "next/link";
import Navbar from "../../Navbar";
import OtherServicesSection from "./OtherServicesSection";

export default function OtherServicesPage() {
  return (
    <div className="min-h-screen bg-background text-ink font-body antialiased">
      <Navbar />

      {/* ============ OTHER SERVICES ============ */}
      <OtherServicesSection />

      {/* ============ CTA ============ */}
      <section className="bg-mint px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto flex max-w-[1500px] flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-headline text-lg font-bold uppercase tracking-wider text-ink/60">
              One team, every task
            </p>
            <h2 className="mt-3 max-w-3xl font-headline text-section font-bold uppercase leading-[0.86] text-ink">
              Offload the busywork. Keep the focus.
            </h2>
          </div>
          <Link
            className="btn btn-solid shrink-0 justify-center px-8 py-5 text-lg"
            href="/#contact"
          >
            Talk to us <span aria-hidden="true">›</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
