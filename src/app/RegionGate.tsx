"use client";

import { useEffect, useState } from "react";
import { useRegion, type Region as ProviderRegion } from "./RegionProvider";

type Region = "uk" | "au";

const regions: {
  code: Region;
  name: string;
  flag: string;
  tagline: string;
  bullets: string[];
}[] = [
  {
    code: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    tagline: "HMRC · Companies House · VAT",
    bullets: [
      "Self Assessment & Corporation Tax",
      "Year-end accounts & VAT returns (MTD)",
      "PAYE, P60 & P11D for directors",
    ],
  },
  {
    code: "au",
    name: "Australia",
    flag: "🇦🇺",
    tagline: "ATO · ASIC · GST",
    bullets: [
      "Income Tax Returns & BAS lodgements",
      "GST, PAYG & Superannuation",
      "Company tax & financial statements",
    ],
  },
];

export default function RegionGate() {
  const { region, setRegion } = useRegion();
  const [modalOpen, setModalOpen] = useState(false);

  const choose = (code: Region) => {
    setRegion(code as ProviderRegion);
    setModalOpen(false);
  };

  const current = regions.find((r) => r.code === region);

  return (
    <>
      {/* ---------- Landing picker (first visit) ---------- */}
      {!region && <LandingPicker onChoose={choose} />}

      {/* ---------- Top banner (after choice) ---------- */}
      {region && current && (
        <div className="relative z-30 border-b border-ink/10 bg-mint">
          <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3 px-5 py-2 md:px-8">
            <p className="flex items-center gap-2 text-sm text-ink">
              <span aria-hidden="true" className="text-base">
                {current.flag}
              </span>
              <span>
                You are viewing the{" "}
                <strong className="font-semibold uppercase">{current.name}</strong> site.
              </span>
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="group inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-ink underline-offset-4 hover:underline"
            >
              Switch region{" "}
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                ›
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ---------- Modal (region switcher) ---------- */}
      {modalOpen && (
        <RegionModal
          currentRegion={region}
          onChoose={choose}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

/* =================================================================
 * Landing picker — fabulous split-screen visual gate
 * ================================================================= */
function LandingPicker({ onChoose }: { onChoose: (r: Region) => void }) {
  const [hover, setHover] = useState<Region | null>(null);
  const [leaving, setLeaving] = useState<Region | null>(null);

  const handleChoose = (code: Region) => {
    setLeaving(code);
    // brief delay for exit animation
    setTimeout(() => onChoose(code), 550);
  };

  return (
    <div
      className={`landing-root fixed inset-0 z-[100] overflow-hidden ${
        leaving ? "landing-leaving" : ""
      }`}
    >
      {/* Brand bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between px-5 py-5 md:px-10 md:py-8">
        <div className="landing-logo flex items-center gap-2 text-ink mix-blend-difference">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-[0.7rem]">
            <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="26" height="26" rx="6" fill="currentColor" />
              <path
                d="M11 9h7a4 4 0 0 1 0 8h-7zM11 17h8a4 4 0 0 1 0 8h-8z"
                stroke="#dcfae8"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="font-headline text-[1.55rem] font-bold uppercase leading-[0.86] tracking-[0.01em]">
            Book
            <br />
            wise
          </span>
        </div>
      </div>

      {/* Centered instruction */}
      <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-4">
        <div className="landing-instruction flex flex-col items-center gap-2 rounded-full border border-ink/15 bg-background/95 px-6 py-3 text-center shadow-[0_20px_50px_-20px_rgba(8,36,30,0.5)] backdrop-blur md:px-8 md:py-4">
          <p className="font-headline text-base font-bold uppercase leading-none tracking-wide text-ink md:text-xl">
            Choose your region to continue
          </p>
        </div>
      </div>

      {/* Two halves */}
      <div className="relative flex h-full w-full flex-col md:flex-row">
        {regions.map((r, i) => {
          const isHover = hover === r.code;
          const isOther = hover && hover !== r.code;
          const isLeaving = leaving === r.code;
          const isLeavingOther = leaving && leaving !== r.code;

          return (
            <button
              key={r.code}
              type="button"
              onMouseEnter={() => setHover(r.code)}
              onMouseLeave={() => setHover(null)}
              onClick={() => handleChoose(r.code)}
              className={`landing-half group relative flex-1 overflow-hidden text-left transition-[flex-grow,flex-basis] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none ${
                r.code === "uk" ? "landing-half--uk" : "landing-half--au"
              } ${isHover ? "md:flex-[1.35]" : ""} ${
                isOther ? "md:flex-[0.65]" : ""
              } ${isLeaving ? "landing-half--zoom" : ""} ${
                isLeavingOther ? "landing-half--shrink" : ""
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
              aria-label={`Enter ${r.name} site`}
            >
              {/* Decorative blobs */}
              <span aria-hidden="true" className="landing-blob landing-blob--1" />
              <span aria-hidden="true" className="landing-blob landing-blob--2" />

              {/* Animated diagonal lines pattern */}
              <span aria-hidden="true" className="landing-lines" />

              {/* Giant background flag */}
              <span
                aria-hidden="true"
                className="landing-bg-flag pointer-events-none select-none"
              >
                {r.flag}
              </span>

              {/* Content */}
              <div className="landing-content relative z-10 flex h-full flex-col justify-between px-7 py-24 md:px-14 md:py-28">
                {/* Top: country code + flag */}
                <div className="flex items-start justify-between">
                  <span className="landing-code font-headline text-[clamp(7rem,18vw,16rem)] font-bold uppercase leading-[0.78] tracking-tight">
                    {r.code === "uk" ? "UK" : "AU"}
                  </span>
                  <span
                    className="landing-flag-chip text-4xl md:text-5xl"
                    aria-hidden="true"
                  >
                    {r.flag}
                  </span>
                </div>

                {/* Bottom: name + cue */}
                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="landing-name font-headline text-3xl font-bold uppercase leading-none md:text-5xl">
                      {r.name}
                    </h2>
                  </div>
                  <span className="landing-arrow flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border text-2xl transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20 md:text-3xl">
                    ›
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Scoped styles */}
      <style jsx>{`
        .landing-root {
          background: var(--background);
          animation: landing-fade-in 600ms ease forwards;
        }
        .landing-root.landing-leaving {
          animation: landing-fade-out 550ms ease forwards;
        }
        @keyframes landing-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes landing-fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        .landing-half {
          position: relative;
          isolation: isolate;
          animation: landing-rise 800ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
          animation-delay: inherit;
        }
        @keyframes landing-rise {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .landing-half--uk {
          background: linear-gradient(135deg, #fbfaf5 0%, #f4efe7 100%);
          color: var(--ink);
          border-bottom: 1px solid rgba(8, 36, 30, 0.1);
        }
        @media (min-width: 768px) {
          .landing-half--uk {
            border-bottom: 0;
            border-right: 1px solid rgba(8, 36, 30, 0.1);
          }
        }

        .landing-half--au {
          background: linear-gradient(135deg, #08241e 0%, #0c2f27 100%);
          color: #ffffff;
        }

        /* Animated diagonal-line texture */
        .landing-lines {
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            45deg,
            transparent 0,
            transparent 22px,
            currentColor 22px,
            currentColor 23px
          );
          opacity: 0.04;
          transition: opacity 600ms ease, transform 1.2s ease;
          transform: translateY(0);
        }
        .landing-half:hover .landing-lines {
          opacity: 0.09;
          transform: translateY(-12px);
        }

        /* Floating blobs */
        .landing-blob {
          position: absolute;
          border-radius: 999px;
          filter: blur(60px);
          opacity: 0.45;
          transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 700ms ease;
          will-change: transform;
        }
        .landing-blob--1 {
          width: 320px;
          height: 320px;
          top: -80px;
          right: -90px;
          animation: landing-float 9s ease-in-out infinite;
        }
        .landing-blob--2 {
          width: 380px;
          height: 380px;
          bottom: -130px;
          left: -120px;
          animation: landing-float 11s ease-in-out infinite reverse;
        }
        .landing-half--uk .landing-blob--1 { background: #b9f6cc; }
        .landing-half--uk .landing-blob--2 { background: #a8d6dc; }
        .landing-half--au .landing-blob--1 { background: #dcfae8; opacity: 0.18; }
        .landing-half--au .landing-blob--2 { background: #b9f6cc; opacity: 0.16; }

        .landing-half:hover .landing-blob {
          opacity: 0.6;
        }
        .landing-half:hover .landing-blob--1 {
          transform: translate(-30px, 20px) scale(1.1);
        }
        .landing-half:hover .landing-blob--2 {
          transform: translate(30px, -20px) scale(1.15);
        }

        @keyframes landing-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -25px) scale(1.05); }
        }

        /* Giant background flag (ghosted) */
        .landing-bg-flag {
          position: absolute;
          right: -3rem;
          bottom: -3rem;
          font-size: clamp(14rem, 24vw, 26rem);
          line-height: 1;
          opacity: 0.06;
          transform: rotate(-8deg) translateY(0);
          transition: transform 800ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 600ms ease;
          z-index: 0;
        }
        .landing-half:hover .landing-bg-flag {
          transform: rotate(-4deg) translateY(-14px) scale(1.06);
          opacity: 0.11;
        }

        /* Country code letters */
        .landing-code {
          letter-spacing: -0.04em;
          transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1),
            color 300ms ease;
          display: inline-block;
        }
        .landing-half:hover .landing-code {
          transform: translateY(-6px);
        }
        .landing-half--uk .landing-code { color: var(--ink); }
        .landing-half--au .landing-code { color: var(--mint); }

        .landing-half--uk .landing-flag-chip {
          filter: drop-shadow(0 6px 18px rgba(8, 36, 30, 0.15));
        }

        /* Arrow chip */
        .landing-arrow {
          border-color: currentColor;
          transition: background 250ms ease, color 250ms ease,
            transform 300ms ease;
        }
        .landing-half--uk .landing-arrow { color: var(--ink); }
        .landing-half--au .landing-arrow { color: var(--mint); }
        .landing-half:hover .landing-arrow {
          background: currentColor;
        }
        .landing-half--uk:hover .landing-arrow {
          color: var(--mint);
        }
        .landing-half--au:hover .landing-arrow {
          color: var(--ink);
        }

        /* Exit animations */
        .landing-half--zoom {
          flex: 1 1 100% !important;
        }
        .landing-half--shrink {
          flex: 0 0 0% !important;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

/* =================================================================
 * Modal — region switcher (compact)
 * ================================================================= */
function RegionModal({
  currentRegion,
  onChoose,
  onClose,
}: {
  currentRegion: Region | null;
  onChoose: (r: Region) => void;
  onClose: () => void;
}) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-5 py-10">
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[1.5rem] border border-ink/15 bg-background shadow-2xl">
        <div className="flex items-start justify-between border-b border-ink/10 p-6 md:p-8">
          <div>
            <p className="eyebrow bg-mint text-ink">Switch region</p>
            <h2 className="mt-3 font-headline text-3xl font-bold uppercase leading-none text-ink md:text-4xl">
              Pick your country
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition-colors hover:bg-mint"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              ×
            </span>
          </button>
        </div>

        <div className="grid gap-3 p-6 md:grid-cols-2 md:p-8">
          {regions.map((r) => {
            const active = r.code === currentRegion;
            return (
              <button
                key={r.code}
                onClick={() => onChoose(r.code)}
                className={`group flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-200 ${
                  active
                    ? "border-ink bg-mint"
                    : "border-ink/15 bg-white hover:border-ink hover:bg-mint/40"
                }`}
              >
                <span className="text-4xl" aria-hidden="true">
                  {r.flag}
                </span>
                <span className="flex-1">
                  <span className="block font-headline text-2xl font-bold uppercase leading-none text-ink">
                    {r.name}
                  </span>
                  <span className="mt-1 block text-xs font-semibold uppercase tracking-wider text-ink/60">
                    {r.tagline}
                  </span>
                </span>
                {active && (
                  <span className="rounded-full bg-ink px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-mint">
                    Current
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
