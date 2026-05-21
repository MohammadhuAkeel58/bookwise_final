"use client";

import { useRegion } from "./RegionProvider";

/* =========================================================
 *  Region-aware Hero
 *  - Cinematic waving flag (UK / AU)
 *  - Falls back to generic hero when no region chosen
 *
 *  Flag motion is built from FIVE layered effects:
 *   1. SVG turbulence + displacement → real cloth distortion
 *   2. CSS skew/wave → broad ripple
 *   3. 3D perspective rotateY → flag hangs in space
 *   4. Fold-shadow gradient sweep → depth & folds
 *   5. Light-catch sheen → cinematic highlight
 * ========================================================= */

export default function RegionalHero() {
  const { region } = useRegion();

  const baseHeadline = ["Better books.", "Less tax panic."];
  const baseIntro =
    "Bookwise handles your accounts, tax, and compliance so you can focus on building. Proactive advice, no surprises, and a team that actually speaks your language.";

  const theme =
    region === "uk"
      ? {
          eyebrow: "Accounting for entrepreneurs",
          headline: baseHeadline,
          intro: baseIntro,
          flag: <UnionJack />,
        }
      : region === "au"
        ? {
            eyebrow: "Accounting for entrepreneurs",
            headline: baseHeadline,
            intro: baseIntro,
            flag: <AusFlag />,
          }
        : {
            eyebrow: "Accounting for entrepreneurs",
            headline: baseHeadline,
            intro: baseIntro,
            flag: null,
          };

  return (
    <section className="hero-section relative overflow-hidden px-5 pb-16 pt-12 sm:pb-20 sm:pt-16 md:px-8 md:pb-28 md:pt-24">
      {/* Waving flag background */}
      {theme.flag && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
        >
          {/* 3D perspective stage */}
          <div className="flag-stage">
            <div className="flag-tilt">{theme.flag}</div>

            {/* Fold-shadow layer (depth) */}
            <div className="flag-folds" />
            {/* Light-catch sheen */}
            <div className="flag-sheen" />
          </div>

          {/* Soft wash so flag fades into background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/78 to-background/95" />
          {/* Vignette mask */}
          <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_28%,var(--background)_88%)]" />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-[1500px] text-center">
        <p className="eyebrow mx-auto bg-mint text-ink">{theme.eyebrow}</p>

        <h1
          key={region ?? "none"}
          className="hero-headline mx-auto mt-6 max-w-[22ch] font-headline text-[clamp(3rem,8vw,10.8rem)] font-bold uppercase leading-[0.84] tracking-normal text-ink sm:mt-8"
        >
          {theme.headline[0]}
          <span className="mt-[0.08em] block">{theme.headline[1]}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl px-2 text-base leading-relaxed text-ink/70 sm:mt-8 sm:text-lg">
          {theme.intro}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 md:mt-10">
          <a
            className="btn btn-solid w-full justify-center px-8 py-4 text-base sm:w-auto sm:text-lg"
            href="#contact"
          >
            Talk to us <span aria-hidden="true">›</span>
          </a>
          <a
            className="btn btn-outline w-full justify-center px-8 py-4 text-base sm:w-auto sm:text-lg"
            href="#services"
          >
            View services <span aria-hidden="true">›</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        /* ============ Headline pop ============ */
        .hero-headline {
          animation: hero-pop 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes hero-pop {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.985);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        /* ============ Flag stage (3D perspective) ============ */
        .flag-stage {
          position: absolute;
          inset: -6% -8%;
          opacity: 0.95;
          perspective: 1400px;
          transform-style: preserve-3d;
          animation: flag-breathe 9s ease-in-out infinite;
          filter: saturate(0.95) contrast(1.05);
          will-change: transform;
        }
        @keyframes flag-breathe {
          0%, 100% {
            transform: scale(1.04) translateZ(0);
          }
          50% {
            transform: scale(1.07) translateZ(20px);
          }
        }

        /* ============ Flag 3D tilt — like it's hanging on a pole ============ */
        .flag-tilt {
          position: absolute;
          inset: 0;
          transform-origin: left center;
          transform-style: preserve-3d;
          animation: flag-tilt 10s ease-in-out infinite;
        }
        @keyframes flag-tilt {
          0%, 100% {
            transform: rotateY(-2deg) rotateX(0deg);
          }
          25% {
            transform: rotateY(-5deg) rotateX(0.8deg);
          }
          50% {
            transform: rotateY(-2deg) rotateX(0deg);
          }
          75% {
            transform: rotateY(1deg) rotateX(-0.8deg);
          }
        }

        /* ============ CSS broad-skew ripple (applied to inner SVG) ============ */
        :global(.flag-wave) {
          width: 100%;
          height: 100%;
          transform-origin: left center;
          animation: flag-wave 7s ease-in-out infinite;
        }
        @keyframes flag-wave {
          0%, 100% {
            transform: skewX(0deg) skewY(0deg) translateX(0);
          }
          25% {
            transform: skewX(-2deg) skewY(0.6deg) translateX(-0.4%);
          }
          50% {
            transform: skewX(0deg) skewY(-0.6deg) translateX(0);
          }
          75% {
            transform: skewX(2deg) skewY(0.6deg) translateX(0.4%);
          }
        }

        /* ============ Moving fold-shadow gradient (depth) ============ */
        .flag-folds {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.22) 0%,
            transparent 18%,
            rgba(0, 0, 0, 0.16) 38%,
            transparent 55%,
            rgba(0, 0, 0, 0.18) 72%,
            transparent 88%,
            rgba(0, 0, 0, 0.2) 100%
          );
          background-size: 220% 100%;
          mix-blend-mode: multiply;
          opacity: 0.55;
          animation: folds-flow 9s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes folds-flow {
          0%, 100% {
            background-position: 0% 0;
            opacity: 0.4;
          }
          50% {
            background-position: 30% 0;
            opacity: 0.6;
          }
        }

        /* ============ Cinematic light-catch sheen ============ */
        .flag-sheen {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            108deg,
            transparent 28%,
            rgba(255, 255, 255, 0.08) 42%,
            rgba(255, 255, 255, 0.28) 50%,
            rgba(255, 255, 255, 0.08) 58%,
            transparent 72%
          );
          mix-blend-mode: overlay;
          animation: sheen-sweep 7.5s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes sheen-sweep {
          0% {
            transform: translateX(-100%);
          }
          55%, 100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}

/* =========================================================
 * Cloth-warp SVG filter (re-used by both flags)
 *  - feTurbulence generates animated noise
 *  - feDisplacementMap warps the flag based on that noise
 * ========================================================= */
function ClothFilter({ id }: { id: string }) {
  return (
    <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.013 0.045"
        numOctaves="2"
        seed="3"
        result="noise"
      >
        <animate
          attributeName="baseFrequency"
          dur="16s"
          values="0.013 0.045; 0.022 0.06; 0.013 0.045"
          repeatCount="indefinite"
        />
      </feTurbulence>
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale="22"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  );
}

/* =========================================================
 * Union Jack — with cloth-warp filter
 * ========================================================= */
function UnionJack() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 60 30"
        preserveAspectRatio="xMidYMid slice"
        className="flag-wave"
      >
        <defs>
          <ClothFilter id="uk-cloth" />
          <clipPath id="uk-t">
            <path d="M30,15 h30 v15 z M30,15 v15 h-30 z M30,15 h-30 v-15 z M30,15 v-15 h30 z" />
          </clipPath>
          {/* Radial vignette to add depth to the cloth */}
          <radialGradient id="uk-vig" cx="50%" cy="50%" r="65%">
            <stop offset="60%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
          </radialGradient>
        </defs>

        <g filter="url(#uk-cloth)">
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
          <path
            d="M0,0 L60,30 M60,0 L0,30"
            stroke="#C8102E"
            strokeWidth="4"
            clipPath="url(#uk-t)"
          />
          <path d="M30,0 v30 M0,15 h60" stroke="#ffffff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </g>

        {/* Cloth vignette overlay */}
        <rect width="60" height="30" fill="url(#uk-vig)" />
      </svg>
    </div>
  );
}

/* =========================================================
 * Australian Flag — with cloth-warp filter
 * ========================================================= */
function AusFlag() {
  const star = (cx: number, cy: number, r: number, points = 7) => {
    const inner = r * 0.42;
    let d = "";
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? r : inner;
      const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      d += i === 0 ? `M${x},${y}` : `L${x},${y}`;
    }
    return d + "Z";
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 120 60"
        preserveAspectRatio="xMidYMid slice"
        className="flag-wave"
      >
        <defs>
          <ClothFilter id="au-cloth" />
          <radialGradient id="au-vig" cx="50%" cy="50%" r="65%">
            <stop offset="60%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
          </radialGradient>
        </defs>

        <g filter="url(#au-cloth)">
          <rect width="120" height="60" fill="#012169" />

          {/* Mini union jack canton */}
          <g>
            <clipPath id="au-canton">
              <rect width="60" height="30" />
            </clipPath>
            <g clipPath="url(#au-canton)">
              <clipPath id="au-t">
                <path d="M30,15 h30 v15 z M30,15 v15 h-30 z M30,15 h-30 v-15 z M30,15 v-15 h30 z" />
              </clipPath>
              <path
                d="M0,0 L60,30 M60,0 L0,30"
                stroke="#ffffff"
                strokeWidth="6"
              />
              <path
                d="M0,0 L60,30 M60,0 L0,30"
                stroke="#C8102E"
                strokeWidth="4"
                clipPath="url(#au-t)"
              />
              <path d="M30,0 v30 M0,15 h60" stroke="#ffffff" strokeWidth="10" />
              <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
            </g>
          </g>

          {/* Commonwealth Star (7-pointed) below canton */}
          <path d={star(30, 45, 6, 7)} fill="#ffffff" />

          {/* Southern Cross */}
          <path d={star(90, 12, 3, 7)} fill="#ffffff" />
          <path d={star(102, 22, 3, 7)} fill="#ffffff" />
          <path d={star(82, 30, 3, 7)} fill="#ffffff" />
          <path d={star(96, 40, 3, 7)} fill="#ffffff" />
          <path d={star(98, 28, 1.6, 5)} fill="#ffffff" />
        </g>

        {/* Cloth vignette overlay */}
        <rect width="120" height="60" fill="url(#au-vig)" />
      </svg>
    </div>
  );
}
