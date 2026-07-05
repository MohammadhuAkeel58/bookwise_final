"use client";

import { useEffect } from "react";
import { useRegion, type Region } from "./RegionProvider";

/* ============================================================
 *  RegionGate — first-visit region popup.
 *
 *  Until the visitor picks a region, a centred modal sits over
 *  the page: choose United Kingdom or Australia and the whole
 *  site (heroes, plans, tax services) speaks that market's
 *  language. Switching later happens from the region bar in
 *  the sticky header. Mounted once in the root layout.
 * ============================================================ */

const regions: {
  code: Region;
  name: string;
  tagline: string;
}[] = [
  {
    code: "uk",
    name: "United Kingdom",
    tagline: "HMRC · Companies House · VAT",
  },
  {
    code: "au",
    name: "Australia",
    tagline: "ATO · ASIC · GST",
  },
];

export default function RegionGate() {
  const { region, setRegion, hydrated } = useRegion();
  const open = hydrated && !region;

  // Lock body scroll while the popup is up. Restore to "" so a
  // sibling layer that also toggled overflow doesn't leave us locked.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="region-pop"
      role="dialog"
      aria-modal="true"
      aria-label="Choose your region"
    >
      <div className="region-pop-card">
        <p className="region-pop-brand">
          Bookwise<span aria-hidden="true">®</span>
        </p>
        <p className="region-pop-eyebrow">Welcome</p>
        <h2 className="region-pop-title">Where is your business based?</h2>
        <p className="region-pop-sub">
          We tailor everything — tax rules, filings and plans — to your
          region.
        </p>

        <div className="region-pop-options">
          {regions.map((r) => (
            <button
              key={r.code}
              type="button"
              className="region-pop-option"
              data-region={r.code}
              onClick={() => setRegion(r.code)}
            >
              <span className="region-pop-name">{r.name}</span>
              <span className="region-pop-tagline">{r.tagline}</span>
              <span className="region-pop-go">
                Continue <span aria-hidden="true">→</span>
              </span>
            </button>
          ))}
        </div>

        <p className="region-pop-note">
          You can switch anytime from the bar at the top.
        </p>
      </div>

      <style jsx>{`
        .region-pop {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
          background: rgba(2, 0, 31, 0.78);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          animation: region-pop-fade 400ms ease backwards;
        }
        @keyframes region-pop-fade {
          from { opacity: 0; }
        }

        .region-pop-card {
          width: 100%;
          max-width: 30rem;
          border-radius: 1.35rem;
          background: var(--background, #f8fafd);
          padding: 2.2rem 2rem 1.8rem;
          text-align: center;
          box-shadow: 0 60px 120px -40px rgba(2, 0, 31, 0.8);
          animation: region-pop-rise 550ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
        }
        @keyframes region-pop-rise {
          from { opacity: 0; transform: translateY(26px) scale(0.98); }
        }

        .region-pop-brand {
          margin: 0;
          font-family: var(--font-placard, inherit);
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          line-height: 1;
          text-transform: uppercase;
          color: var(--ink, #03002e);
        }
        .region-pop-brand span {
          font-size: 0.5em;
          vertical-align: super;
        }

        .region-pop-eyebrow {
          margin: 1.3rem 0 0;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.66rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--red, #c8102e);
        }

        .region-pop-title {
          margin: 0.5rem 0 0;
          font-family: var(--font-placard, inherit);
          font-size: clamp(1.8rem, 5.5vw, 2.4rem);
          font-weight: 700;
          line-height: 0.95;
          text-transform: uppercase;
          color: var(--ink, #03002e);
        }

        .region-pop-sub {
          margin: 0.9rem auto 0;
          max-width: 24rem;
          font-size: 0.9rem;
          line-height: 1.55;
          color: rgba(3, 0, 46, 0.62);
        }

        .region-pop-options {
          display: grid;
          gap: 0.7rem;
          margin-top: 1.5rem;
        }
        @media (min-width: 480px) {
          .region-pop-options { grid-template-columns: 1fr 1fr; }
        }

        .region-pop-option {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.4rem;
          border-radius: 1rem;
          padding: 1.15rem 1.15rem 1rem;
          text-align: left;
          cursor: pointer;
          transition:
            transform 240ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 240ms ease,
            border-color 240ms ease;
        }
        .region-pop-option[data-region="uk"] {
          border: 1px solid rgba(3, 0, 46, 0.16);
          background: #ffffff;
          color: var(--ink, #03002e);
        }
        .region-pop-option[data-region="au"] {
          border: 1px solid rgba(3, 0, 46, 0.9);
          background: var(--ink, #03002e);
          color: #ffffff;
          background-image:
            radial-gradient(
              130% 100% at 12% -10%,
              rgba(84, 70, 200, 0.32) 0%,
              rgba(38, 28, 130, 0.16) 38%,
              transparent 62%
            );
        }
        .region-pop-option:hover {
          transform: translateY(-3px);
          box-shadow: 0 22px 44px -24px rgba(2, 0, 31, 0.55);
        }
        .region-pop-option[data-region="uk"]:hover {
          border-color: var(--red, #c8102e);
        }

        .region-pop-name {
          font-family: var(--font-placard, inherit);
          font-size: 1.35rem;
          font-weight: 700;
          line-height: 0.95;
          text-transform: uppercase;
        }
        .region-pop-tagline {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.6;
        }
        .region-pop-go {
          margin-top: 0.5rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--red, #c8102e);
        }
        .region-pop-option[data-region="au"] .region-pop-go {
          color: #f0899a;
        }
        .region-pop-go span {
          display: inline-block;
          transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .region-pop-option:hover .region-pop-go span {
          transform: translateX(4px);
        }

        .region-pop-note {
          margin: 1.3rem 0 0;
          font-size: 0.72rem;
          color: rgba(3, 0, 46, 0.45);
        }

        @media (prefers-reduced-motion: reduce) {
          .region-pop,
          .region-pop-card {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
