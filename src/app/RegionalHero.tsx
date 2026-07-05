"use client";

import { useRegion } from "./RegionProvider";
import {
  siXero,
  siQuickbooks,
  siSage,
  siStripe,
  siWise,
  siPaypal,
  siRevolut,
  siShopify,
  siMailchimp,
  siNotion,
  siTrello,
  siKlarna,
  siAsana,
  siHubspot,
  siCalendly,
  siZapier,
  siAirtable,
  siSquare,
} from "simple-icons";

type SimpleIcon = { title: string; path: string; hex: string };

/* Real brand logos drifting behind the headline.
   x / y in % of hero section. size in px.
   dur = animation seconds, delay = phase offset, variant = drift pattern.
   `mobileHide` removes the ones nearest the centre on small screens. */
type FloatingLogo = {
  icon: SimpleIcon;
  x: number;
  y: number;
  size: number;
  dur: number;
  delay: number;
  variant: "a" | "b" | "c" | "d";
  mobileHide?: boolean;
};

const LOGOS: FloatingLogo[] = [
  // Top band
  { icon: siXero,       x: 6,  y: 12, size: 78, dur: 11, delay: 0,   variant: "a" },
  { icon: siRevolut,    x: 22, y: 6,  size: 64, dur: 9,  delay: 2.4, variant: "c", mobileHide: true },
  { icon: siNotion,     x: 38, y: 4,  size: 60, dur: 10, delay: 1.1, variant: "d", mobileHide: true },
  { icon: siPaypal,     x: 56, y: 6,  size: 72, dur: 12, delay: 0.7, variant: "a", mobileHide: true },
  { icon: siTrello,     x: 72, y: 4,  size: 62, dur: 11, delay: 2.0, variant: "b", mobileHide: true },
  { icon: siQuickbooks, x: 90, y: 14, size: 86, dur: 13, delay: 1.5, variant: "b" },

  // Left rail
  { icon: siSage,       x: 3,  y: 38, size: 70, dur: 10, delay: 2.5, variant: "b" },
  { icon: siKlarna,     x: 6,  y: 64, size: 64, dur: 12, delay: 0.4, variant: "d" },
  { icon: siAsana,      x: 14, y: 50, size: 58, dur: 11, delay: 1.7, variant: "a", mobileHide: true },

  // Right rail
  { icon: siStripe,     x: 96, y: 40, size: 78, dur: 11, delay: 0.4, variant: "c" },
  { icon: siHubspot,    x: 92, y: 66, size: 66, dur: 13, delay: 1.9, variant: "a" },
  { icon: siCalendly,   x: 86, y: 52, size: 56, dur: 10, delay: 2.2, variant: "d", mobileHide: true },

  // Bottom band
  { icon: siWise,       x: 10, y: 86, size: 68, dur: 12, delay: 3.0, variant: "c" },
  { icon: siMailchimp,  x: 28, y: 92, size: 60, dur: 10, delay: 1.4, variant: "b", mobileHide: true },
  { icon: siZapier,     x: 44, y: 94, size: 62, dur: 11, delay: 2.7, variant: "d", mobileHide: true },
  { icon: siAirtable,   x: 60, y: 92, size: 60, dur: 12, delay: 0.5, variant: "a", mobileHide: true },
  { icon: siShopify,    x: 76, y: 86, size: 72, dur: 13, delay: 1.2, variant: "a" },
  { icon: siSquare,     x: 88, y: 90, size: 56, dur: 11, delay: 2.1, variant: "c", mobileHide: true },
];

/* =========================================================
 *  Editorial Hero — type-only
 *
 *  Pattern:
 *    BIG DISPLAY HEADLINE mixing bold condensed display
 *    with italic serif connector words ("is a", "for")
 *    [single underline link]
 *
 *  Region drives one word inside the headline:
 *    Bookwise® is a Modern BRITISH Accounting Practice for Entrepreneurs
 *    Bookwise® is a Modern AUSTRALIAN Accounting Practice for Entrepreneurs
 * ========================================================= */

export default function RegionalHero() {
  const { region, setRegion } = useRegion();

  const regionWord =
    region === "uk" ? "British" : region === "au" ? "Australian" : "Modern";
  // When a region IS chosen, the "Modern" before it should drop so we don't
  // get "Modern British Modern". Keep it simple:
  //   - no region: "is a Modern Accounting Practice"
  //   - region:    "is a Modern British / Australian Accounting Practice"
  const showRegionWord = Boolean(region);

  const swapRegion = () => setRegion(region === "uk" ? "au" : "uk");

  return (
    <section className="hero-section relative bg-background">
      {/* Floating brand logos — ambient layer behind the headline.
          Inline layout below mirrors what styled-jsx applies, so the layer
          is correctly clipped to the hero even if CSS injects late. */}
      <div
        className="hero-bg"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {LOGOS.map((logo) => (
          <span
            key={logo.icon.title}
            className={`hero-bg-logo float-${logo.variant} ${
              logo.mobileHide ? "is-md-only" : ""
            }`}
            style={{
              // Inline layout so the logo is bounded even before
              // styled-jsx CSS injects (prevents FOUC giant logos).
              position: "absolute",
              display: "block",
              top: `${logo.y}%`,
              left: `${logo.x}%`,
              width: `${logo.size}px`,
              height: `${logo.size}px`,
              // Hidden by default — SiteAnimations fades them in
              // after the preloader finishes. Without this they
              // briefly peek through during the preloader reveal.
              opacity: 0,
              animationDuration: `${logo.dur}s`,
              animationDelay: `${logo.delay}s`,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label={logo.icon.title}
              fill={`#${logo.icon.hex}`}
              width={logo.size}
              height={logo.size}
              style={{ display: "block", width: "100%", height: "100%" }}
            >
              <path d={logo.icon.path} />
            </svg>
          </span>
        ))}
      </div>

      <div className="hero-container">
        {/* Display headline */}
        <h1 className="hero-headline" key={region ?? "none"}>
          <span className="hero-line">
            <span className="hero-line-inner">
              <span className="hero-w">
                Bookwise<sup className="hero-reg">®</sup>
              </span>
              <span className="hero-c"> is a </span>
              <span className="hero-w">Modern</span>
            </span>
          </span>

          {showRegionWord && (
            <span className="hero-line">
              <span className="hero-line-inner">
                <button
                  type="button"
                  onClick={swapRegion}
                  className="hero-w hero-w--region"
                  aria-label={`Region: ${regionWord}. Tap to switch.`}
                >
                  {regionWord}
                </button>
                <span className="hero-c"> Accounting</span>
              </span>
            </span>
          )}

          {!showRegionWord && (
            <span className="hero-line">
              <span className="hero-line-inner">
                <span className="hero-w">Accounting</span>
              </span>
            </span>
          )}

          <span className="hero-line">
            <span className="hero-line-inner">
              <span className="hero-w">Practice</span>
              <span className="hero-c"> for </span>
              <span className="hero-w">Entrepreneurs</span>
            </span>
          </span>
        </h1>

        {/* Single underline-arrow CTA */}
        <a className="hero-link" href="#contact">
          <span className="hero-link-text">Start with a call</span>
          <span className="hero-link-arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          overflow: hidden;
          padding-top: 5rem;
          padding-bottom: 0;
        }
        @media (min-width: 768px) {
          .hero-section {
            padding-top: 8rem;
          }
        }

        .hero-container {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.4rem 5rem;
          text-align: center;
        }
        @media (min-width: 768px) {
          .hero-container {
            padding: 0 2rem 7rem;
          }
        }

        /* ============ Display headline ============ */
        .hero-headline {
          margin: 0;
          font-family: var(--font-placard);
          font-weight: 700;
          font-size: clamp(2.6rem, 8.6vw, 8.4rem);
          line-height: 0.9;
          letter-spacing: -0.012em;
          text-transform: uppercase;
          color: var(--ink);
        }
        .hero-line {
          display: block;
          overflow: hidden;
          padding-bottom: 0.06em;
        }
        .hero-line-inner {
          display: inline-block;
          white-space: normal;
        }
        .hero-w {
          display: inline;
          color: var(--ink);
        }
        .hero-w--region {
          background: none;
          border: 0;
          padding: 0;
          font: inherit;
          color: var(--mint);
          letter-spacing: inherit;
          text-transform: inherit;
          cursor: pointer;
          position: relative;
          transition: color 220ms ease;
        }
        .hero-w--region::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0.04em;
          height: 0.06em;
          background: var(--mint);
          opacity: 0;
          transition: opacity 220ms ease;
        }
        .hero-w--region:hover {
          color: var(--ink);
        }
        .hero-w--region:hover::after {
          opacity: 1;
          background: var(--ink);
        }
        .hero-reg {
          font-size: 0.32em;
          vertical-align: super;
          margin-left: 0.05em;
          color: rgba(3, 0, 46, 0.55);
          font-weight: 700;
        }

        /* Italic serif connector — "is a", "for", " Accounting"
           This typographic mix is the whole move. */
        .hero-c {
          display: inline;
          font-family: Georgia, "Iowan Old Style", "Times New Roman", serif;
          font-style: italic;
          font-weight: 400;
          text-transform: none;
          letter-spacing: 0;
          color: rgba(3, 0, 46, 0.78);
          font-size: 0.78em;
          line-height: 1;
          padding: 0 0.06em;
          vertical-align: 0.06em;
        }

        /* ============ Single link CTA ============ */
        .hero-link {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          margin-top: 2.2rem;
          padding: 0.5rem 0;
          font-family: var(--font-placard);
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--ink);
          text-decoration: none;
        }
        .hero-link-text {
          position: relative;
        }
        .hero-link-text::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -4px;
          height: 1.5px;
          background: var(--ink);
          transform-origin: left center;
          transition: transform 420ms cubic-bezier(0.76, 0, 0.24, 1);
        }
        .hero-link:hover .hero-link-text::after {
          transform-origin: right center;
          transform: scaleX(0);
        }
        .hero-link-arrow {
          display: inline-block;
          transition: transform 320ms cubic-bezier(0.76, 0, 0.24, 1);
        }
        .hero-link:hover .hero-link-arrow {
          transform: translateX(6px);
        }

        /* ============ Floating background logos ============ */
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .hero-bg-logo {
          position: absolute;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          opacity: 0.34;
          will-change: transform;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          /* Anchor: translate logo so its centre sits at (left, top) */
          transform: translate(-50%, -50%);
        }
        .hero-bg-logo svg {
          display: block;
          width: 100%;
          height: auto;
          /* Slight saturate down so the colours feel ambient, not loud */
          filter: saturate(0.85);
        }

        .float-a {
          animation-name: hero-float-a;
        }
        .float-b {
          animation-name: hero-float-b;
        }
        .float-c {
          animation-name: hero-float-c;
        }
        .float-d {
          animation-name: hero-float-d;
        }

        /* Larger drift distances + scale pulses so motion reads strongly */
        @keyframes hero-float-a {
          0%, 100% {
            transform: translate(-50%, -50%) rotate(-4deg) scale(1);
          }
          50% {
            transform: translate(calc(-50% + 38px), calc(-50% - 54px))
              rotate(8deg)
              scale(1.08);
          }
        }
        @keyframes hero-float-b {
          0%, 100% {
            transform: translate(-50%, -50%) rotate(4deg) scale(1);
          }
          50% {
            transform: translate(calc(-50% - 42px), calc(-50% + 48px))
              rotate(-9deg)
              scale(0.94);
          }
        }
        @keyframes hero-float-c {
          0%, 100% {
            transform: translate(-50%, -50%) rotate(0deg) scale(1);
          }
          33% {
            transform: translate(calc(-50% - 36px), calc(-50% - 44px))
              rotate(10deg)
              scale(1.06);
          }
          66% {
            transform: translate(calc(-50% + 32px), calc(-50% + 40px))
              rotate(-7deg)
              scale(0.96);
          }
        }
        @keyframes hero-float-d {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) scale(1);
          }
          25% {
            transform: translate(calc(-50% + 28px), calc(-50% + 22px))
              rotate(-6deg)
              scale(1.04);
          }
          50% {
            transform: translate(calc(-50% + 46px), calc(-50% - 30px))
              rotate(6deg)
              scale(1.08);
          }
          75% {
            transform: translate(calc(-50% - 24px), calc(-50% - 38px))
              rotate(-4deg)
              scale(0.97);
          }
          100% {
            transform: translate(-50%, -50%) rotate(0deg) scale(1);
          }
        }

        /* Hide the logos that crowd the headline on small screens */
        @media (max-width: 768px) {
          .hero-bg-logo.is-md-only {
            display: none;
          }
          .hero-bg-logo {
            opacity: 0.26;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-bg-logo {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
