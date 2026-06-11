"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

// Session-scoped flag. Setting it after the preloader plays the first
// time means it won't play again on reloads or service-page navigation
// in the same browser tab. Closing the tab clears it, so a brand-new
// visit still gets the full cinematic intro.
const STORAGE_KEY = "bw-preloader-played";

const CLIP_ID = "bw-pre-clip";

// Sharp "slow in, decisive out" curve used across the whole sequence.
const EASE_ID = "bwPre";
const EASE_CURVE = "0.7, 0.05, 0.13, 1";

// Timing (seconds)
const REVEAL_DUR = 0.95;
const REVEAL_STAGGER = 0.08;
const HOLD_AFTER_REVEAL = 0.15;
const SPREAD_DUR = 1.2;
const D_SQUARE_IN = 0.3;
const D_TO_RECT = 1.1;
const D_TO_FULL = 0.8;
const OVERLAP_RECT_FULL = 0.25;

// Even-odd path: full-cover rect with a centered rectangular hole.
// Used as an SVG clipPath on the dark cover so the page shows through.
function holePath(W: number, H: number, hw: number, hh: number) {
  const outer = `M0 0H${W}V${H}H0Z`;
  if (hw <= 0 || hh <= 0) return outer;
  const x = (W - hw) / 2;
  const y = (H - hh) / 2;
  return `${outer} M${x} ${y}H${x + hw}V${y + hh}H${x}Z`;
}

function markDone() {
  window.dispatchEvent(new CustomEvent("bookwise:preloader-done"));
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // sessionStorage unavailable (privacy mode) — it'll just play again
    // next reload, which is fine.
  }
}

export default function Preloader() {
  // Initial state = true so the preloader renders on first paint (SSR + first
  // hydration), preventing a flash of unstyled hero content before the cover
  // appears. On subsequent visits in the same session the useEffect below
  // immediately flips it to false (and dispatches the done event so the rest
  // of the site's entrance animations still fire).
  const [mounted, setMounted] = useState(true);

  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const leftMaskRef = useRef<HTMLSpanElement>(null);
  const rightMaskRef = useRef<HTMLSpanElement>(null);
  const clipPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Already played in this tab → skip the cinematic, hand off to the
    // hero entrance immediately.
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        window.dispatchEvent(new CustomEvent("bookwise:preloader-done"));
        // Defer to a microtask (runs before paint, so no dark flash) to
        // avoid a synchronous setState inside the effect body.
        queueMicrotask(() => setMounted(false));
        return;
      }
    } catch {
      // fall through and play normally
    }

    const root = rootRef.current;
    const bg = bgRef.current;
    const inner = innerRef.current;
    const leftMask = leftMaskRef.current;
    const rightMask = rightMaskRef.current;
    const clipEl = clipPathRef.current;
    if (!root || !bg || !inner || !leftMask || !rightMask || !clipEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      markDone();
      const fade = gsap.to(root, {
        opacity: 0,
        duration: 0.4,
        ease: "power1.out",
        onComplete: () => setMounted(false),
      });
      return () => {
        fade.kill();
      };
    }

    if (!CustomEase.get(EASE_ID)) CustomEase.create(EASE_ID, EASE_CURVE);

    const masks = [leftMask, rightMask];
    const words = masks.map((m) => m.firstElementChild as HTMLElement);

    const W = Math.max(1, Math.round(window.innerWidth));
    const H = Math.max(1, Math.round(window.innerHeight));
    const minDim = Math.min(W, H);

    // Hole sizes: small square → wide 3:2 rectangle → full screen.
    const startSize = Math.max(32, Math.round(minDim * 0.14));
    const ratio = 4.5 / 3;
    let midW = Math.round(W * 0.66);
    let midH = Math.round(midW / ratio);
    if (midH > H * 0.66) {
      midH = Math.round(H * 0.66);
      midW = Math.round(midH * ratio);
    }

    const hole = { w: 0, h: 0 };
    const updatePath = () => {
      clipEl.setAttribute("d", holePath(W, H, hole.w, hole.h));
    };
    updatePath();
    // Only clip once the path covers everything, so the bg never flashes
    // the page underneath before the timeline starts.
    gsap.set(bg, { clipPath: `url(#${CLIP_ID})` });

    // Where the words fly off to at the end (bottom-left / bottom-right).
    const offscreen = (el: HTMLElement, side: "left" | "right") => {
      const rect = el.getBoundingClientRect();
      const pad = 48;
      return {
        x: side === "left" ? -(rect.right + pad) : W - rect.left + rect.width + pad,
        y: H - rect.top + rect.height + pad,
      };
    };

    let doneFired = false;
    const fireDoneOnce = () => {
      if (doneFired) return;
      doneFired = true;
      markDone();
    };

    const tl = gsap.timeline({
      defaults: { ease: EASE_ID },
      onComplete: () => setMounted(false),
    });

    // --- Phase 1: masked letter reveal --------------------------------
    tl.set(masks, { opacity: 1 }, 0);
    tl.set(words, { yPercent: 110 }, 0);
    tl.to(
      words,
      { yPercent: 0, duration: REVEAL_DUR, stagger: REVEAL_STAGGER },
      0
    );
    tl.to({}, { duration: HOLD_AFTER_REVEAL }, ">");

    // --- Phase 2: spread to edges while shrinking (FLIP) ---------------
    tl.addLabel("spread", ">");
    tl.add(() => {
      const first = masks.map((el) => el.getBoundingClientRect());
      inner.classList.add("pre-inner--spread");
      masks.forEach((el, i) => {
        const last = el.getBoundingClientRect();
        gsap.set(el, { x: first[i].left - last.left, y: first[i].top - last.top });
      });
    }, "spread");
    tl.to(leftMask, { x: 0, y: 0, duration: SPREAD_DUR }, "spread");
    tl.to(rightMask, { x: 0, y: 0, duration: SPREAD_DUR * 0.85 }, "spread");
    tl.to(masks, { scale: 0.28, duration: 0.8 }, "spread");

    // --- Phase 3: cutout reveal (square → rect → fullscreen) -----------
    tl.addLabel("cut", ">");
    tl.to(
      hole,
      { w: startSize, h: startSize, duration: D_SQUARE_IN, onUpdate: updatePath },
      "cut"
    );
    tl.to(
      hole,
      { w: midW, h: midH, duration: D_TO_RECT, onUpdate: updatePath },
      `cut+=${D_SQUARE_IN}`
    );

    const toFullStart = D_SQUARE_IN + D_TO_RECT - OVERLAP_RECT_FULL;
    tl.to(
      hole,
      { w: W, h: H, duration: D_TO_FULL, onUpdate: updatePath },
      `cut+=${toFullStart}`
    );

    // --- Phase 4: words exit bottom-left / bottom-right ----------------
    tl.to(
      leftMask,
      {
        x: () => offscreen(leftMask, "left").x,
        y: () => offscreen(leftMask, "left").y,
        duration: D_TO_FULL,
      },
      `cut+=${toFullStart}`
    );
    tl.to(
      rightMask,
      {
        x: () => offscreen(rightMask, "right").x,
        y: () => offscreen(rightMask, "right").y,
        duration: D_TO_FULL,
      },
      `cut+=${toFullStart}`
    );

    // Release the page (hero entrance etc.) just as the hole opens wide,
    // so the entrance plays visibly through the reveal.
    tl.call(fireDoneOnce, undefined, `cut+=${toFullStart + D_TO_FULL * 0.15}`);

    return () => {
      tl.kill();
      fireDoneOnce();
    };
  }, []);

  if (!mounted) return null;

  return (
    // Inline styles mirror the styled-jsx below so the cover is a solid,
    // opaque, full-screen layer on the very first painted frame — before
    // styled-jsx injects its CSS on the client. Without this the SSR'd
    // .pre / .pre-bg render transparent for a frame and the page content
    // flashes through before the preloader appears (FOUC on reload).
    <div
      ref={rootRef}
      className="pre"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1100,
        pointerEvents: "none",
      }}
    >
      <svg className="pre-clip-svg" width="0" height="0">
        <defs>
          <clipPath id={CLIP_ID} clipPathUnits="userSpaceOnUse">
            <path ref={clipPathRef} clipRule="evenodd" fillRule="evenodd" d="" />
          </clipPath>
        </defs>
      </svg>

      <div
        ref={bgRef}
        className="pre-bg"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(140% 90% at 50% 50%, #0d2e26 0%, #08241e 55%, #051712 100%)",
        }}
      >
        <span className="pre-vignette" />
        <span className="pre-grain" />
      </div>

      <div ref={innerRef} className="pre-inner">
        <span ref={leftMaskRef} className="pre-mask pre-mask--left">
          <span className="pre-word">BOOK</span>
        </span>
        <span ref={rightMaskRef} className="pre-mask pre-mask--right">
          <span className="pre-word">WISE</span>
        </span>
      </div>

      <style jsx>{`
        .pre {
          position: fixed;
          inset: 0;
          /* Must sit above RegionGate (z-999) so the gate stays hidden
             until the preloader has finished revealing. */
          z-index: 1100;
          pointer-events: none;
        }

        .pre-clip-svg {
          position: absolute;
          width: 0;
          height: 0;
          pointer-events: none;
          opacity: 0;
        }

        .pre-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            140% 90% at 50% 50%,
            #0d2e26 0%,
            #08241e 55%,
            #051712 100%
          );
          will-change: clip-path;
        }

        .pre-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            120% 80% at 50% 50%,
            rgba(0, 0, 0, 0) 40%,
            rgba(0, 0, 0, 0.55) 100%
          );
        }

        .pre-grain {
          position: absolute;
          inset: 0;
          opacity: 0.06;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
          background-size: 240px 240px;
        }

        .pre-inner {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.22em;
          font-size: clamp(2.75rem, 10.5vw, 8.5rem);
          z-index: 2;
        }
        .pre-inner--spread {
          justify-content: space-between;
          padding: 0 clamp(1.25rem, 4vw, 3rem);
        }

        .pre-mask {
          display: inline-block;
          overflow: hidden;
          opacity: 0;
          padding-bottom: 0.06em;
          will-change: transform;
        }
        .pre-mask--left {
          transform-origin: left center;
        }
        .pre-mask--right {
          transform-origin: right center;
        }

        .pre-word {
          display: inline-block;
          transform: translateY(110%);
          font-family: var(--font-placard);
          font-weight: 700;
          font-size: 1em;
          line-height: 0.84;
          letter-spacing: -0.005em;
          text-transform: uppercase;
          color: #ffffff;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .pre-mask {
            opacity: 1;
          }
          .pre-word {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
