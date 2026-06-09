"use client";

import { useEffect, useState } from "react";

const ENTER_MS = 1300; // hairline draws + letters mask up
const SHIMMER_MS = 600;
const HOLD_MS = 250;
const REVEAL_MS = 1200; // tear + curtain split

const LETTERS_TOP = ["B", "O", "O", "K"];
const LETTERS_BOT = ["W", "I", "S", "E"];

export default function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [revealing, setRevealing] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";

    const total = ENTER_MS + SHIMMER_MS + HOLD_MS;
    const t1 = window.setTimeout(() => setRevealing(true), total);
    const t2 = window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent("bookwise:preloader-done"));
      setMounted(false);
      document.body.style.overflow = "";
    }, total + REVEAL_MS);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  const renderRow = (letters: string[], offset: number) =>
    letters.map((ch, i) => (
      <span key={`${offset}-${i}`} className="pre-mask">
        <span
          className="pre-glyph"
          style={{ "--d": `${500 + (offset + i) * 70}ms` } as React.CSSProperties}
        >
          {ch}
        </span>
      </span>
    ));

  const word = (
    <>
      <span className="pre-row">{renderRow(LETTERS_TOP, 0)}</span>
      <span className="pre-row">{renderRow(LETTERS_BOT, LETTERS_TOP.length)}</span>
    </>
  );

  return (
    <div className={`pre ${revealing ? "pre--out" : ""}`} aria-hidden="true">
      <span className="pre-curtain pre-curtain--top" />
      <span className="pre-curtain pre-curtain--bot" />

      <span className="pre-vignette" />
      <span className="pre-grain" />
      <span className="pre-hair" />

      <div className="pre-stage">
        <h1 className="pre-word pre-word--top" aria-label="Bookwise">
          {word}
        </h1>
        <h1 className="pre-word pre-word--bot" aria-hidden="true">
          {word}
        </h1>
      </div>

      <style jsx>{`
        .pre {
          position: fixed;
          inset: 0;
          z-index: 100;
          pointer-events: none;
          background: #061a16;
        }

        .pre-curtain {
          position: absolute;
          left: 0;
          right: 0;
          height: 50.3%;
          background: radial-gradient(
            140% 90% at 50% 50%,
            #0d2e26 0%,
            #08241e 55%,
            #051712 100%
          );
          will-change: transform;
          transition: transform ${REVEAL_MS}ms cubic-bezier(0.83, 0, 0.17, 1);
        }
        .pre-curtain--top {
          top: 0;
        }
        .pre-curtain--bot {
          bottom: 0;
        }
        .pre--out .pre-curtain--top {
          transform: translateY(-100%);
        }
        .pre--out .pre-curtain--bot {
          transform: translateY(100%);
        }

        .pre-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            120% 80% at 50% 50%,
            rgba(0, 0, 0, 0) 40%,
            rgba(0, 0, 0, 0.55) 100%
          );
          pointer-events: none;
        }

        .pre-grain {
          position: absolute;
          inset: 0;
          opacity: 0.06;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
          background-size: 240px 240px;
          pointer-events: none;
        }

        .pre-hair {
          position: absolute;
          left: 50%;
          top: 50%;
          width: min(72vw, 640px);
          height: 1px;
          transform: translate(-50%, -50%) scaleX(0);
          transform-origin: left center;
          background: linear-gradient(
            90deg,
            rgba(220, 250, 232, 0) 0%,
            rgba(220, 250, 232, 0.55) 50%,
            rgba(220, 250, 232, 0) 100%
          );
          animation:
            pre-hair-draw 600ms cubic-bezier(0.76, 0, 0.24, 1) forwards,
            pre-hair-out 500ms cubic-bezier(0.76, 0, 0.24, 1) 900ms forwards;
        }
        @keyframes pre-hair-draw {
          to {
            transform: translate(-50%, -50%) scaleX(1);
          }
        }
        @keyframes pre-hair-out {
          to {
            opacity: 0;
            transform: translate(-50%, -50%) scaleX(1.4);
          }
        }

        .pre-stage {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          z-index: 2;
        }
        .pre-word {
          position: absolute;
          left: 50%;
          top: 50%;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.02em;
          font-family: var(--font-placard);
          font-weight: 700;
          font-size: clamp(4rem, 18vw, 12rem);
          line-height: 0.84;
          letter-spacing: -0.005em;
          text-transform: uppercase;
          color: #ffffff;
          will-change: transform, opacity, clip-path;
          transition:
            transform ${REVEAL_MS}ms cubic-bezier(0.83, 0, 0.17, 1),
            opacity ${REVEAL_MS}ms ease;

          background: linear-gradient(
            100deg,
            #ffffff 0%,
            #ffffff 38%,
            var(--mint, #7cf0c0) 50%,
            #ffffff 62%,
            #ffffff 100%
          );
          background-size: 220% 100%;
          background-position: 130% 0;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: pre-sheen ${SHIMMER_MS}ms ease-out ${ENTER_MS}ms forwards;
        }
        @keyframes pre-sheen {
          0% {
            background-position: 130% 0;
          }
          100% {
            background-position: -50% 0;
          }
        }
        .pre-word--top {
          transform: translate(-50%, -50%);
          clip-path: inset(0 0 50% 0);
        }
        .pre-word--bot {
          transform: translate(-50%, -50%);
          clip-path: inset(50% 0 0 0);
        }
        .pre--out .pre-word--top {
          transform: translate(-50%, calc(-50% - 60vh)) scale(1.08);
        }
        .pre--out .pre-word--bot {
          transform: translate(-50%, calc(-50% + 60vh)) scale(1.08);
        }

        .pre-row {
          display: flex;
          line-height: 0.84;
        }
        .pre-mask {
          display: inline-block;
          overflow: hidden;
          line-height: 0.84;
          padding-bottom: 0.06em;
        }
        .pre-glyph {
          display: inline-block;
          transform: translateY(108%);
          animation: pre-glyph-in 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: var(--d);
        }
        @keyframes pre-glyph-in {
          to {
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pre,
          .pre-curtain,
          .pre-word,
          .pre-glyph,
          .pre-hair,
          .pre-grain {
            transition: none !important;
            animation: none !important;
          }
          .pre-glyph {
            transform: none !important;
          }
          .pre-word--top,
          .pre-word--bot {
            transform: translate(-50%, -50%) !important;
          }
          .pre-hair {
            opacity: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
