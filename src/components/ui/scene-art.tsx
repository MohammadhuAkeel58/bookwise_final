import type { CSSProperties, ReactNode } from "react";

/* ============================================================
 *  Scene art — faceted 3D figures drawn in the site palette.
 *
 *  Each figure is built from flat isometric faces that key off
 *  five custom properties, so one drawing reads correctly on a
 *  pale card and on an ink one:
 *
 *    --art-hi    lit face
 *    --art-mid   turned face
 *    --art-lo    shadow face
 *    --art-line  hairline detail
 *    --art-pop   the red accent, used once per figure at most
 *
 *  Surfaces declare those in globals.css. The figures never pick
 *  a colour themselves, which is what keeps one set of drawings
 *  working across the mint, white and ink panels.
 *
 *  SceneArt wraps a figure with the shared drift, plus the tilt a
 *  hovered card triggers. All motion is CSS and drops out under
 *  prefers-reduced-motion.
 * ============================================================ */

export function SceneArt({
  children,
  size = "5.5rem",
  delay = 0,
  className,
}: {
  children: ReactNode;
  size?: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={className ? `scene-art ${className}` : "scene-art"}
      style={
        { "--art-size": size, "--art-delay": `${delay}s` } as CSSProperties
      }
    >
      <span className="scene-art-tilt">
        <span className="scene-art-float">{children}</span>
      </span>
    </span>
  );
}

const svg = {
  viewBox: "0 0 100 100",
  fill: "none" as const,
  xmlns: "http://www.w3.org/2000/svg",
};

/* ---- Business services: a stack of ledgers ---- */
export function LedgerFigure() {
  return (
    <svg {...svg}>
      <path d="M20 62 50 77 50 86 20 71Z" fill="var(--art-lo)" />
      <path d="M80 62 50 77 50 86 80 71Z" fill="var(--art-mid)" />
      <path d="M20 53 50 68 50 77 20 62Z" fill="var(--art-lo)" />
      <path d="M80 53 50 68 50 77 80 62Z" fill="var(--art-mid)" />
      <path d="M50 29 80 44 50 59 20 44Z" fill="var(--art-hi)" />
      <path d="M20 44 50 59 50 68 20 53Z" fill="var(--art-lo)" />
      <path d="M80 44 50 59 50 68 80 53Z" fill="var(--art-mid)" />
      <path d="M59 33.5 63.5 35.75 33.5 50.75 29 48.5Z" fill="var(--art-pop)" />
      <path
        d="M20 62 50 77 80 62M20 53 50 68 80 53"
        stroke="var(--art-line)"
        strokeOpacity="0.28"
        strokeWidth="1.4"
      />
    </svg>
  );
}

/* ---- Taxation services: a filing sheet and a levy coin ---- */
export function FilingFigure() {
  return (
    <svg {...svg}>
      <path
        d="M28 14 66 24 58 68 20 58Z"
        fill="var(--art-hi)"
        stroke="var(--art-line)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M26.6 21.9 55.1 29.4M25.3 29 53.8 36.5M24 36 52.5 43.5M22.7 43 39.8 47.5"
        stroke="var(--art-line)"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M51 72v8a19 9.5 0 0 0 38 0v-8Z" fill="var(--art-lo)" />
      <ellipse
        cx="70"
        cy="72"
        rx="19"
        ry="9.5"
        fill="var(--art-mid)"
        stroke="var(--art-line)"
        strokeWidth="1.6"
      />
      <path
        d="M77 68.5 63 75.5"
        stroke="var(--art-line)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="64.5" cy="69.6" r="2.3" fill="var(--art-line)" />
      <circle cx="75.5" cy="74.4" r="2.3" fill="var(--art-line)" />
    </svg>
  );
}

/* ---- Other services: the support desk headset ---- */
export function HeadsetFigure() {
  return (
    <svg {...svg}>
      <path
        d="M20 60C20 28 80 28 80 60"
        stroke="var(--art-lo)"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path d="M22 53.5 31 58 22 62.5 13 58Z" fill="var(--art-hi)" />
      <path d="M13 58 22 62.5 22 76 13 71.5Z" fill="var(--art-lo)" />
      <path d="M31 58 22 62.5 22 76 31 71.5Z" fill="var(--art-mid)" />
      <path d="M78 53.5 87 58 78 62.5 69 58Z" fill="var(--art-hi)" />
      <path d="M69 58 78 62.5 78 76 69 71.5Z" fill="var(--art-lo)" />
      <path d="M87 58 78 62.5 78 76 87 71.5Z" fill="var(--art-mid)" />
      <path
        d="M78 76c0 12-12 16-21 13"
        stroke="var(--art-lo)"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <circle cx="56" cy="88" r="5.5" fill="var(--art-pop)" />
    </svg>
  );
}

/* ---- Reason 01: books that stay clean ---- */
export function CleanBooksFigure() {
  return (
    <svg {...svg}>
      <path d="M20 60 50 75 50 84 20 69Z" fill="var(--art-lo)" />
      <path d="M80 60 50 75 50 84 80 69Z" fill="var(--art-mid)" />
      <path d="M50 36 80 51 50 66 20 51Z" fill="var(--art-hi)" />
      <path d="M20 51 50 66 50 75 20 60Z" fill="var(--art-lo)" />
      <path d="M80 51 50 66 50 75 80 60Z" fill="var(--art-mid)" />
      <path
        d="M20 60 50 75 80 60"
        stroke="var(--art-line)"
        strokeOpacity="0.28"
        strokeWidth="1.4"
      />
      <circle cx="73" cy="27" r="17" fill="var(--art-lo)" />
      <path
        d="M65 27.5 71 34 82 20"
        stroke="var(--art-hi)"
        strokeWidth="4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---- Reason 02: tax planned ahead ---- */
export function CalendarFigure() {
  return (
    <svg {...svg}>
      <path d="M50 26 78 40 50 54 22 40Z" fill="var(--art-hi)" />
      <path d="M22 40 50 54 50 80 22 66Z" fill="var(--art-lo)" />
      <path d="M78 40 50 54 50 80 78 66Z" fill="var(--art-mid)" />
      <g fill="var(--art-line)" fillOpacity="0.45">
        <ellipse cx="50" cy="33" rx="2.6" ry="1.3" />
        <ellipse cx="57" cy="36.5" rx="2.6" ry="1.3" />
        <ellipse cx="64" cy="40" rx="2.6" ry="1.3" />
        <ellipse cx="43" cy="36.5" rx="2.6" ry="1.3" />
        <ellipse cx="50" cy="40" rx="2.6" ry="1.3" />
        <ellipse cx="36" cy="40" rx="2.6" ry="1.3" />
        <ellipse cx="43" cy="43.5" rx="2.6" ry="1.3" />
        <ellipse cx="57" cy="43.5" rx="2.6" ry="1.3" />
      </g>
      <ellipse cx="50" cy="47" rx="4.4" ry="2.3" fill="var(--art-pop)" />
      <path
        d="M22 40 50 54 78 40"
        stroke="var(--art-line)"
        strokeOpacity="0.3"
        strokeWidth="1.4"
      />
      <path
        d="M40.2 30.9v-9M59.8 30.9v-9"
        stroke="var(--art-lo)"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---- Reason 03: live in the cloud ---- */
export function CloudFigure() {
  return (
    <svg {...svg}>
      <path
        d="M30 46c-9 0-13-8-8-14 3-4 8-5 12-3 1-10 10-16 19-13 7 2 11 8 11 15 6-1 11 4 10 10-1 4-4 5-7 5Z"
        fill="var(--art-hi)"
        stroke="var(--art-line)"
        strokeOpacity="0.32"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M30 46h37l-3 7H33Z" fill="var(--art-mid)" />
      <path d="M30 68 38 72 30 76 22 72Z" fill="var(--art-hi)" />
      <path d="M22 72 30 76 30 90 22 86Z" fill="var(--art-lo)" />
      <path d="M38 72 30 76 30 90 38 86Z" fill="var(--art-mid)" />
      <path d="M50 62 58 66 50 70 42 66Z" fill="var(--art-hi)" />
      <path d="M42 66 50 70 50 90 42 86Z" fill="var(--art-lo)" />
      <path d="M58 66 50 70 50 90 58 86Z" fill="var(--art-mid)" />
      <path d="M70 56 78 60 70 64 62 60Z" fill="var(--art-pop)" />
      <path d="M62 60 70 64 70 90 62 86Z" fill="var(--art-lo)" />
      <path d="M78 60 70 64 70 90 78 86Z" fill="var(--art-mid)" />
    </svg>
  );
}

/* ---- Reason 04: people first ---- */
export function PeopleFigure() {
  return (
    <svg {...svg}>
      <circle cx="63" cy="42" r="10.5" fill="var(--art-mid)" />
      <path d="M48 100c0-61 30-61 30 0Z" fill="var(--art-mid)" />
      <circle
        cx="38"
        cy="50"
        r="13"
        fill="var(--art-hi)"
        stroke="var(--art-line)"
        strokeWidth="1.6"
      />
      <path
        d="M20 100c0-51 36-51 36 0Z"
        fill="var(--art-hi)"
        stroke="var(--art-line)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M67 10h21a5 5 0 0 1 5 5v12a5 5 0 0 1-5 5h-7l-7 7v-7h-7a5 5 0 0 1-5-5V15a5 5 0 0 1 5-5Z"
        fill="var(--art-pop)"
      />
    </svg>
  );
}

/* ---- Contact: the conversation ---- */
export function ChatFigure() {
  return (
    <svg {...svg}>
      <path
        d="M22 32h50a9 9 0 0 1 9 9v22a9 9 0 0 1-9 9H46L30 86V72h-8a9 9 0 0 1-9-9V41a9 9 0 0 1 9-9Z"
        fill="var(--art-mid)"
        transform="translate(8 8)"
      />
      <path
        d="M22 32h50a9 9 0 0 1 9 9v22a9 9 0 0 1-9 9H46L30 86V72h-8a9 9 0 0 1-9-9V41a9 9 0 0 1 9-9Z"
        fill="var(--art-hi)"
        stroke="var(--art-line)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <g fill="var(--art-line)" fillOpacity="0.55">
        <circle cx="34" cy="52" r="4" />
        <circle cx="48" cy="52" r="4" />
        <circle cx="62" cy="52" r="4" />
      </g>
      <circle cx="82" cy="20" r="11" fill="var(--art-pop)" />
    </svg>
  );
}
