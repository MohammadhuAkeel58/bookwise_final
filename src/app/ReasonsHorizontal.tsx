"use client";

import { useEffect, useRef } from "react";

const reasons = [
  {
    number: "01",
    title: "Books that stay clean",
    description:
      "Bookkeeping, reconciliations, and payables handled monthly so your numbers are always decision-ready.",
  },
  {
    number: "02",
    title: "Tax planned ahead",
    description:
      "Self Assessment, Corporation Tax, and VAT mapped out before deadlines — no scrambles, no surprise bills.",
  },
  {
    number: "03",
    title: "Live in the cloud",
    description:
      "Online accounting gives you real-time visibility into cash, profit, and obligations from any device.",
  },
  {
    number: "04",
    title: "People first",
    description:
      "Plain-English support from a team that picks up the phone when decisions get messy.",
  },
];

export default function ReasonsHorizontal() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!section || !track || !viewport) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // No pin/scrub — CSS falls back to a normal wrapped grid.
      return;
    }

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        if (scrollable <= 0) return;
        // 0 → 1 across the pinned span — drives the horizontal rail.
        const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
        const maxX = Math.max(0, track.scrollWidth - viewport.clientWidth);
        track.style.transform = `translate3d(${-progress * maxX}px, 0, 0)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="rhz" aria-label="Why choose Commonwealth Accounting Partners">
      <div className="rhz-pin">
        <div className="rhz-head">
          <p className="rhz-eyebrow">Why choose us</p>
          <h2 className="rhz-heading">We handle the numbers</h2>
          <p className="rhz-sub">
            Bookkeeping, taxation, and online accounting — under one roof
          </p>
        </div>

        <div ref={viewportRef} className="rhz-viewport">
          <div ref={trackRef} className="rhz-track">
            {reasons.map((r, i) => (
              <article
                className="rhz-card"
                key={r.title}
                data-skin={i % 2 === 0 ? "mint" : "dark"}
              >
                <span className="rhz-card-num" aria-hidden="true">
                  {r.number}
                </span>
                <h3 className="rhz-card-title">{r.title}</h3>
                <p className="rhz-card-desc">{r.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Tall track gives the pinned stage room to scrub horizontally.
           Kept lean (4 screens) so the cards move briskly with scroll. */
        .rhz {
          position: relative;
          height: 320vh;
          background: var(--ink);
          color: #fff;
        }
        .rhz-pin {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* ============ Centered heading ============ */
        .rhz-head {
          flex-shrink: 0;
          /* Clear the sticky header (region bar + navbar) then add a
             breathing gap, so the eyebrow is never tucked underneath. */
          padding: calc(var(--header-h) + clamp(1.25rem, 4vw, 2.5rem))
            clamp(1.25rem, 5vw, 4rem) 0;
          text-align: center;
        }
        .rhz-eyebrow {
          display: inline-block;
          margin-inline: auto;
          background: var(--mint);
          color: var(--ink);
          font-family: var(--font-placard);
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.35rem 0.7rem;
          border-radius: 4px;
        }
        .rhz-heading {
          margin: 1rem auto 0;
          max-width: 60rem;
          font-family: var(--font-placard);
          font-weight: 700;
          font-size: clamp(2.4rem, 6vw, 5rem);
          line-height: 0.9;
          letter-spacing: -0.005em;
          text-transform: uppercase;
          color: #fff;
        }
        .rhz-sub {
          margin: 1rem auto 0;
          max-width: 50rem;
          font-family: var(--font-placard);
          font-weight: 700;
          font-size: clamp(1.1rem, 2.4vw, 1.75rem);
          line-height: 1.05;
          text-transform: uppercase;
          color: var(--mint);
        }

        /* Horizontal viewport — the track translates inside it */
        .rhz-viewport {
          flex: 1;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .rhz-track {
          display: flex;
          gap: clamp(1rem, 2.5vw, 2rem);
          padding: 0 clamp(1.25rem, 5vw, 4rem);
          will-change: transform;
        }

        /* ============ Cards — Option 2 alternating mint ============ */
        .rhz-card {
          flex: 0 0 auto;
          width: clamp(280px, 60vw, 460px);
          display: flex;
          flex-direction: column;
          padding: 2.2rem 1.9rem;
          border-radius: 14px;
        }
        .rhz-card[data-skin="mint"] {
          background: var(--mint);
        }
        .rhz-card[data-skin="mint"] .rhz-card-num {
          color: rgba(3, 0, 46, 0.55);
        }
        .rhz-card[data-skin="mint"] .rhz-card-title {
          color: var(--ink);
        }
        .rhz-card[data-skin="mint"] .rhz-card-desc {
          color: rgba(3, 0, 46, 0.8);
        }
        .rhz-card[data-skin="dark"] {
          background: rgba(220, 232, 250, 0.04);
          border: 1px solid rgba(220, 232, 250, 0.18);
        }
        .rhz-card[data-skin="dark"] .rhz-card-num {
          color: rgba(220, 232, 250, 0.55);
        }
        .rhz-card[data-skin="dark"] .rhz-card-title {
          color: var(--mint);
        }
        .rhz-card[data-skin="dark"] .rhz-card-desc {
          color: rgba(255, 255, 255, 0.86);
        }

        .rhz-card-num {
          font-family: ui-monospace, monospace;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.25em;
        }
        .rhz-card-title {
          margin: 1.4rem 0 0;
          font-family: var(--font-placard);
          font-weight: 700;
          font-size: clamp(2rem, 3.6vw, 3rem);
          line-height: 0.95;
          text-transform: uppercase;
        }
        .rhz-card-desc {
          margin: 1.1rem 0 0;
          font-size: 1.05rem;
          line-height: 1.5;
        }

        @media (min-width: 768px) {
          .rhz-card {
            width: clamp(360px, 38vw, 480px);
            padding: 2.8rem 2.4rem;
          }
        }

        /* Reduced motion: drop the pin, lay cards out as a centered grid */
        @media (prefers-reduced-motion: reduce) {
          .rhz {
            height: auto;
          }
          .rhz-pin {
            position: static;
            height: auto;
            padding-bottom: clamp(3rem, 6vw, 5rem);
          }
          .rhz-viewport {
            overflow: visible;
          }
          .rhz-track {
            flex-wrap: wrap;
            transform: none !important;
            margin-top: 2.5rem;
            justify-content: center;
          }
          .rhz-card {
            width: clamp(260px, 100%, 520px);
          }
        }
      `}</style>
    </section>
  );
}
