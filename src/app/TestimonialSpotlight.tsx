"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
 *  TestimonialSpotlight — "The Spotlight"
 *
 *  A full-bleed navy cinematic band echoing the hero (grain +
 *  vignette). One client story at a time: oversized gold quote
 *  glyph, italic-serif quote, gold-ringed initials avatar, name
 *  in condensed caps, company/region beneath. Numbered tabs
 *  (01–05) switch stories with a crossfade + rise. Autoplays
 *  every 7s, pauses on hover/focus, honours reduced-motion.
 *
 *  NOTE: these are PLACEHOLDER testimonials. Replace with real,
 *  attributable client quotes before publishing.
 * ============================================================ */

type Testimonial = {
  quote: string;
  name: string;
  initials: string;
  company: string;
  region: "UK" | "AU";
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "They turned quarter-end from a fire drill into a formality. Sharp, responsive, and refreshingly honest about the numbers.",
    name: "Eleanor Hargreave",
    initials: "EH",
    company: "Hargreave & Co Interiors",
    region: "UK",
  },
  {
    quote:
      "Finally an accountant who explains tax in plain English. Saved us more in the first year than their fees cost.",
    name: "Damon Fitch",
    initials: "DF",
    company: "Fitch Bros Joinery",
    region: "UK",
  },
  {
    quote:
      "Payroll and BAS used to eat my Sundays. Now it just happens — quietly, correctly, every time.",
    name: "Priya Nathan",
    initials: "PN",
    company: "Nathan & Wren Dental",
    region: "AU",
  },
  {
    quote:
      "Cash flow forecasting that actually holds up. They caught a seasonal shortfall three months before it hit.",
    name: "Callum Reeve",
    initials: "CR",
    company: "Reeve Outdoor Adventures",
    region: "AU",
  },
  {
    quote:
      "They made VAT registration painless and never once talked down to a one-person business.",
    name: "Beatrix Somerled",
    initials: "BS",
    company: "Somerled Ceramics Studio",
    region: "UK",
  },
];

const AUTOPLAY_MS = 7000;

export default function TestimonialSpotlight() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Respect prefers-reduced-motion (disables autoplay + transforms).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Autoplay — skipped when paused or reduced-motion.
  useEffect(() => {
    if (paused || reduced) return;
    timer.current = setInterval(() => {
      setActive((i) => (i + 1) % TESTIMONIALS.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, reduced]);

  const go = (dir: 1 | -1) =>
    setActive(
      (i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length
    );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  const current = TESTIMONIALS[active];

  return (
    <section
      className="tspot"
      aria-label="Client testimonials"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={onKeyDown}
    >
      <span className="tspot-vignette" aria-hidden="true" />
      <span className="tspot-grain" aria-hidden="true" />

      <div className="tspot-inner">
        {/* Header */}
        <p className="tspot-eyebrow">Client stories</p>
        <h2 className="tspot-heading">
          <span className="tspot-heading-w">What our clients</span>{" "}
          <span className="tspot-heading-c">say about us</span>
        </h2>

        {/* Slide viewport — stories stacked, crossfaded */}
        <div className="tspot-stage">
          <span className="tspot-watermark" aria-hidden="true">
            {String(active + 1).padStart(2, "0")}
          </span>

          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              className={`tspot-slide ${i === active ? "is-active" : ""}`}
              aria-hidden={i === active ? undefined : true}
            >
              <span className="tspot-quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="tspot-quote">{t.quote}</blockquote>
              <figcaption className="tspot-cite">
                <span className="tspot-avatar" aria-hidden="true">
                  {t.initials}
                </span>
                <span className="tspot-cite-text">
                  <span className="tspot-name">{t.name}</span>
                  <span className="tspot-meta">
                    {t.company}
                    <span className="tspot-region"> · {t.region}</span>
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Numbered pagination */}
        <div className="tspot-dots" role="tablist" aria-label="Choose a testimonial">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show testimonial ${i + 1}: ${t.name}`}
              className={`tspot-dot ${i === active ? "is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className="tspot-dot-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="tspot-dot-mark" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .tspot {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          background: radial-gradient(
            120% 90% at 50% 30%,
            #06133f 0%,
            #03002e 55%,
            #02071c 100%
          );
          padding: clamp(4rem, 9vw, 7.5rem) 1.4rem;
        }
        .tspot-vignette {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: radial-gradient(
            110% 80% at 50% 45%,
            transparent 38%,
            rgba(1, 8, 34, 0.72) 100%
          );
          pointer-events: none;
        }
        .tspot-grain {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0.05;
          mix-blend-mode: overlay;
          pointer-events: none;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
          background-size: 240px 240px;
        }
        .tspot-inner {
          position: relative;
          z-index: 1;
          max-width: 720px;
          margin: 0 auto;
          text-align: center;
        }

        /* Header */
        .tspot-eyebrow {
          margin: 0 0 1rem;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #b99328;
        }
        .tspot-heading {
          margin: 0 0 clamp(2rem, 5vw, 3.2rem);
          font-family: var(--font-placard);
          font-weight: 700;
          font-size: clamp(1.9rem, 5.5vw, 3.4rem);
          line-height: 0.95;
          letter-spacing: 0.005em;
        }
        .tspot-heading-w {
          text-transform: uppercase;
          color: #f6f4ee;
        }
        .tspot-heading-c {
          font-family: Georgia, "Times New Roman", serif;
          font-style: italic;
          font-weight: 400;
          text-transform: none;
          letter-spacing: 0;
          color: var(--mint);
        }

        /* Stage */
        .tspot-stage {
          position: relative;
          min-height: clamp(15rem, 34vw, 17rem);
          display: grid;
        }
        .tspot-watermark {
          position: absolute;
          top: -1.4rem;
          right: 0;
          z-index: 0;
          font-family: var(--font-placard);
          font-weight: 700;
          font-size: clamp(7rem, 22vw, 13rem);
          line-height: 1;
          color: rgba(220, 232, 250, 0.05);
          pointer-events: none;
          user-select: none;
        }

        .tspot-slide {
          grid-area: 1 / 1;
          position: relative;
          z-index: 1;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(14px);
          transition:
            opacity 600ms ease,
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }
        .tspot-slide.is-active {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .tspot-quote-mark {
          display: block;
          font-family: Georgia, serif;
          font-size: 4rem;
          line-height: 0.4;
          color: #b99328;
          margin-bottom: 0.6rem;
        }
        .tspot-quote {
          margin: 0 0 1.8rem;
          max-width: 40ch;
          font-family: Georgia, "Times New Roman", serif;
          font-style: italic;
          font-size: clamp(1.15rem, 2.6vw, 1.5rem);
          line-height: 1.5;
          color: #f2f5fb;
        }
        .tspot-cite {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          transition-delay: 90ms;
        }
        .tspot-avatar {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.9rem;
          height: 2.9rem;
          flex-shrink: 0;
          border-radius: 999px;
          border: 2px solid #b99328;
          background: rgba(185, 147, 40, 0.08);
          font-family: var(--font-placard);
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.04em;
          color: #f6f4ee;
        }
        .tspot-cite-text {
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        .tspot-name {
          font-family: var(--font-placard);
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #f6f4ee;
        }
        .tspot-meta {
          font-family: Georgia, serif;
          font-style: italic;
          font-size: 0.82rem;
          color: rgba(220, 232, 250, 0.65);
        }
        .tspot-region {
          color: #b99328;
          font-style: normal;
          font-weight: 600;
        }

        /* Pagination */
        .tspot-dots {
          display: inline-flex;
          gap: 0.55rem;
          margin-top: clamp(2rem, 5vw, 3rem);
        }
        .tspot-dot {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 2.5rem;
          padding: 0.4rem 0.2rem;
          border: 0;
          background: none;
          cursor: pointer;
          border-radius: 6px;
        }
        .tspot-dot-num {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: rgba(220, 232, 250, 0.4);
          transition: color 240ms ease;
        }
        .tspot-dot.is-active .tspot-dot-num,
        .tspot-dot:hover .tspot-dot-num,
        .tspot-dot:focus-visible .tspot-dot-num {
          color: #f6f4ee;
        }
        .tspot-dot-mark {
          position: absolute;
          left: 50%;
          bottom: -0.1rem;
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 999px;
          transform: translateX(-50%) scale(0.7);
          background: rgba(220, 232, 250, 0.28);
          transition:
            background 240ms ease,
            transform 240ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .tspot-dot.is-active .tspot-dot-mark {
          background: var(--red);
          transform: translateX(-50%) scale(1);
        }

        /* Numbers hidden on the narrowest screens — dots only */
        @media (max-width: 520px) {
          .tspot-dot {
            min-width: 0;
            padding: 0.55rem 0.35rem;
          }
          .tspot-dot-num {
            display: none;
          }
          .tspot-dot-mark {
            position: static;
            transform: scale(0.8);
          }
          .tspot-dot.is-active .tspot-dot-mark {
            transform: scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tspot-slide {
            transition: opacity 200ms ease;
            transform: none;
          }
          .tspot-slide.is-active {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
