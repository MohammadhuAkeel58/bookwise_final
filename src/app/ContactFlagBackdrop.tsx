"use client";

import { useEffect, useRef } from "react";
import { useRegion } from "./RegionProvider";
import { drawFlag } from "./flagDraw";

/* ============================================================
 *  ContactFlagBackdrop — the region flag as a darkened, living
 *  backdrop for the contact page. Uses the same procedural flag
 *  artwork as the hero (drawFlag), but static and heavily muted
 *  behind navy + vignette + grain so the form stays readable.
 * ============================================================ */

export default function ContactFlagBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { region } = useRegion();
  const code = region === "au" ? "au" : "uk";

  useEffect(() => {
    if (canvasRef.current) drawFlag(canvasRef.current, code);
  }, [code]);

  return (
    <div className="cflag" aria-hidden="true">
      <canvas ref={canvasRef} width={1200} height={800} className="cflag-canvas" />
      <span className="cflag-tint" />
      <span className="cflag-vignette" />
      <span className="cflag-grain" />

      <style jsx>{`
        .cflag {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          background: #03002e;
          pointer-events: none;
        }
        .cflag-canvas {
          position: absolute;
          inset: -4%;
          width: 108%;
          height: 108%;
          object-fit: cover;
          opacity: 0.5;
          transform-origin: center;
          animation: cflag-drift 22s ease-in-out infinite alternate;
        }
        @keyframes cflag-drift {
          from {
            transform: scale(1) translate3d(0, 0, 0);
          }
          to {
            transform: scale(1.07) translate3d(-1.5%, -1%, 0);
          }
        }
        /* Deep navy wash so the flag reads as texture, not subject */
        .cflag-tint {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              120% 90% at 50% 30%,
              rgba(6, 19, 63, 0.72) 0%,
              rgba(3, 0, 46, 0.86) 55%,
              rgba(2, 7, 28, 0.94) 100%
            ),
            linear-gradient(180deg, rgba(3, 0, 46, 0.4), rgba(3, 0, 46, 0.7));
        }
        .cflag-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            110% 80% at 50% 45%,
            transparent 34%,
            rgba(1, 8, 34, 0.72) 100%
          );
        }
        .cflag-grain {
          position: absolute;
          inset: 0;
          opacity: 0.05;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
          background-size: 240px 240px;
        }
        @media (prefers-reduced-motion: reduce) {
          .cflag-canvas {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
