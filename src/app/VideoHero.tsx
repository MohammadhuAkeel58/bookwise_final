"use client";

import { useEffect, useState } from "react";

/* ============================================================
 *  VideoHero — full-bleed brand film hero.
 *
 *  Plays the 16:9 film on desktop and the 9:16 vertical cut on
 *  mobile. Autoplay + muted + loop + playsInline so it starts
 *  on its own. Falls back to the poster image when the visitor
 *  prefers reduced motion. Only the matching video is mounted,
 *  so phones never download the desktop file (or vice versa).
 * ============================================================ */

const POSTER = "/hero/commonwealth-hero-poster.jpg";

export default function VideoHero() {
  // null until mounted so SSR renders the poster (no hydration
  // mismatch, and we never load the wrong-orientation video).
  const [mobile, setMobile] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 1023px)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setMobile(mqMobile.matches);
      setReduced(mqReduced.matches);
    };
    apply();
    mqMobile.addEventListener("change", apply);
    mqReduced.addEventListener("change", apply);
    return () => {
      mqMobile.removeEventListener("change", apply);
      mqReduced.removeEventListener("change", apply);
    };
  }, []);

  const showVideo = mobile !== null && !reduced;

  return (
    <section className="vhero" aria-label="Commonwealth Accounting Partners brand film">
      {showVideo ? (
        mobile ? (
          <video
            key="mobile"
            className="vhero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={POSTER}
          >
            <source src="/hero/commonwealth-hero-9x16.mp4" type="video/mp4" />
          </video>
        ) : (
          <video
            key="desktop"
            className="vhero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={POSTER}
          >
            <source
              src="/hero/commonwealth-hero-1920x1080.webm"
              type="video/webm"
            />
            <source
              src="/hero/commonwealth-hero-1920x1080.mp4"
              type="video/mp4"
            />
          </video>
        )
      ) : (
        <div className="vhero-poster" aria-hidden="true" />
      )}

      <span className="vhero-scrim" aria-hidden="true" />

      <span className="vhero-scroll" aria-hidden="true">
        <span className="vhero-scroll-label">Scroll</span>
        <span className="vhero-scroll-line" />
      </span>

      <style jsx>{`
        .vhero {
          position: relative;
          width: 100%;
          /* Fill the viewport BELOW the sticky header so the whole
             film is in view without scrolling (the header is in flow
             and would otherwise push the hero bottom past the fold). */
          min-height: calc(100svh - var(--header-h, 128px));
          background: #03002e;
          overflow: hidden;
        }
        .vhero-video,
        .vhero-poster {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          /* cover = full-bleed, fills the hero edge to edge. The hero
             height is already trimmed to fit under the header, so the
             top/bottom crop stays small and the film's safe area holds. */
          object-fit: cover;
          display: block;
        }
        .vhero-poster {
          background: #03002e url(${POSTER}) center / cover no-repeat;
        }
        /* Gentle darkening at the very bottom so the scroll cue reads */
        .vhero-scrim {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            transparent 72%,
            rgba(3, 0, 46, 0.45) 100%
          );
        }
        .vhero-scroll {
          position: absolute;
          left: 50%;
          bottom: 1.6rem;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          opacity: 0;
          animation: vhero-fade 900ms ease 900ms forwards;
        }
        .vhero-scroll-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.62rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(220, 232, 250, 0.6);
        }
        .vhero-scroll-line {
          width: 1px;
          height: 42px;
          background: linear-gradient(
            to bottom,
            var(--mint, #9fc0f5),
            transparent
          );
          transform-origin: top;
          animation: vhero-scroll 2s ease-in-out infinite;
        }
        @keyframes vhero-scroll {
          0%,
          100% {
            transform: scaleY(0.3);
            opacity: 0.4;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
        @keyframes vhero-fade {
          to {
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .vhero-scroll-line {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
