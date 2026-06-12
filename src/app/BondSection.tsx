"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PARA =
  "We keep the books clean, the taxes planned and the founders calm — clear numbers, plain English, across the UK and Australia.";

/** Split the paragraph into word groups of char spans so each character
 *  can scrub from dim to full opacity as the user scrolls. */
function splitPara(text: string) {
  return text.split(" ").map((word, wi) => (
    <span key={wi} className="bond-word">
      {word.split("").map((ch, ci) => (
        <span key={ci} className="bond-char">
          {ch}
        </span>
      ))}
    </span>
  ));
}

export default function BondSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const topLobeRef = useRef<HTMLDivElement>(null);
  const botLobeRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const paraWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const topLobe = topLobeRef.current;
    const botLobe = botLobeRef.current;
    const head = headRef.current;
    const paraWrap = paraWrapRef.current;
    if (!track || !topLobe || !botLobe || !head || !paraWrap) return;

    const chars = paraWrap.querySelectorAll<HTMLElement>(".bond-char");

    // The SSR'd inline translateY(±100%) keeps the first paint correct,
    // but GSAP parses it as a *pixel* y-offset and would stack its own
    // yPercent on top (lobes stuck at -200%…-160%, permanently
    // off-screen). Clear it and let the timeline own the transform —
    // the fromTo below re-applies the identical position the same tick.
    gsap.set([topLobe, botLobe, paraWrap], { clearProps: "transform" });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Static composition: lobes in place, headline readable, no scrub.
      gsap.set(topLobe, { yPercent: -60 });
      gsap.set(botLobe, { yPercent: 60 });
      gsap.set(paraWrap, { yPercent: 100 });
      gsap.set(chars, { opacity: 1 });
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Phase 1 — the two lobes sweep in from above/below and close over
    // the viewport, revealing the cream headline sitting on top of them.
    tl.fromTo(topLobe, { yPercent: -100 }, { yPercent: -60, duration: 0.4 }, 0);
    tl.fromTo(botLobe, { yPercent: 100 }, { yPercent: 60, duration: 0.4 }, 0);

    // Phase 2 — headline slides up and away, paragraph slide rises in.
    tl.fromTo(head, { yPercent: 0 }, { yPercent: -100, duration: 0.25 }, 0.5);
    tl.fromTo(
      paraWrap,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.25 },
      0.5
    );

    // Phase 3 — characters scrub from dim to full, word by word.
    if (chars.length) {
      tl.fromTo(
        chars,
        { opacity: 0.3 },
        { opacity: 1, duration: 0.25, stagger: 0.25 / chars.length },
        0.72
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section id="process" className="bond" aria-label="Why Bookwise">
      <div ref={trackRef} className="bond-track">
        <div className="bond-sticky">
          {/* Ink lobes — inline transforms so SSR paints them off-screen */}
          <div
            ref={topLobeRef}
            className="bond-lobe bond-lobe--top"
            style={{ transform: "translateY(-100%)" }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              <circle cx="50" cy="50" r="50" />
            </svg>
          </div>
          <div
            ref={botLobeRef}
            className="bond-lobe bond-lobe--bot"
            style={{ transform: "translateY(100%)" }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              <circle cx="50" cy="50" r="50" />
            </svg>
          </div>

          {/* Slide 1 — headline, cream so the sweeping ink reveals it */}
          <div ref={headRef} className="bond-headline-wrap">
            <h2 className="bond-headline">
              Nice to
              <br />
              count
              <br />
              on you
            </h2>
          </div>

          {/* Slide 2 — paragraph, chars scrub from dim to full */}
          <div
            ref={paraWrapRef}
            className="bond-para-wrap"
            style={{ transform: "translateY(100%)" }}
          >
            <p className="bond-para">{splitPara(PARA)}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bond {
          position: relative;
          background: var(--background);
        }
        .bond-track {
          position: relative;
          height: 400vh;
        }
        .bond-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
        }

        /* ============ Ink lobes ============ */
        .bond-lobe {
          position: absolute;
          left: 50%;
          height: 300vh;
          width: 300vh;
          margin-left: -150vh;
          will-change: transform;
        }
        .bond-lobe--top {
          top: 0;
        }
        .bond-lobe--bot {
          bottom: 0;
        }
        .bond-lobe svg {
          height: 100%;
          width: 100%;
          display: block;
        }
        .bond-lobe circle {
          fill: var(--ink);
        }

        /* ============ Slide 1 — headline ============ */
        .bond-headline-wrap {
          position: absolute;
          inset: 0;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform;
        }
        .bond-headline {
          margin: 0;
          font-family: var(--font-placard);
          font-weight: 700;
          font-size: clamp(4rem, 14vw, 11rem);
          line-height: 0.82;
          letter-spacing: -0.005em;
          text-transform: uppercase;
          text-align: center;
          color: var(--background);
        }

        /* ============ Slide 2 — paragraph ============ */
        .bond-para-wrap {
          position: absolute;
          inset: 0;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          will-change: transform;
        }
        .bond-para {
          margin: 0;
          max-width: 60rem;
          display: flex;
          flex-wrap: wrap;
          column-gap: 0.45em;
          row-gap: 0.1em;
          font-family: var(--font-placard);
          font-weight: 700;
          font-size: clamp(1.7rem, 4.5vw, 3.4rem);
          line-height: 1.05;
          text-transform: uppercase;
          color: var(--background);
        }
        :global(.bond-word) {
          display: inline-flex;
        }
        :global(.bond-char) {
          display: inline-block;
          opacity: 0.3;
        }

        @media (max-width: 767px) {
          .bond-para {
            max-width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.bond-char) {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
