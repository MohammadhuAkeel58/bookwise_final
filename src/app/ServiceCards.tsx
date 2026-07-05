"use client";

import { ReactNode, useRef, CSSProperties } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRegion } from "./RegionProvider";

/* ============================================================
 *  Region-aware service cards — landmark cards.
 *  Australia → dark theme · United Kingdom → light theme.
 *  Solid theme colour up top (badge, country, title); a curved
 *  cut-out at the bottom reveals the country's landmark and a
 *  Learn-more link. All on the ink / cream / mint palette.
 *
 *  Landmarks render as line-art by default. To use real photos
 *  drop images in /public and point REGION_PHOTO at them
 *  (e.g. au: "/au.jpg") — they replace the line-art seamlessly.
 * ============================================================ */

export type Service = {
  title: string;
  href: string;
  description: string;
  icon: ReactNode;
};

type RegionCode = "uk" | "au";
type Theme = "dark" | "light";

const REGION_PHOTO: Record<RegionCode, string | null> = {
  au: null,
  uk: null,
};

/* ---- Landmark line-art ---- */
const auMap = (
  <>
    <path d="M30 40c-5-10 5-12 12-8 8-7 16-2 18 6 12-8 28-6 35 4 13 2 17 13 9 22-4 14-16 22-30 20-14 8-30 4-38-8-10-10-12-24-6-36Z" />
    <path d="M70 96c3-3 8 1 5 7-5 2-8-3-5-7Z" />
  </>
);

const bigBen = (
  <>
    <path d="M32 5v4" />
    <path d="M26 19l6-10 6 10" />
    <path d="M27 19h10v4H27z" />
    <rect x="25" y="23" width="14" height="12" rx="1" />
    <circle cx="32" cy="29" r="3.4" />
    <path d="M32 29v-2.2M32 29h1.8" />
    <path d="M26.5 35l-2 23h15l-2-23" />
    <path d="M24.5 44h15M23.8 51h16.4" />
    <path d="M22 58h20" />
  </>
);

const operaHouse = (
  <>
    <path d="M6 52h84" />
    <path d="M14 52c1-15 9-23 20-27-3 10-5 18-5 27Z" />
    <path d="M29 52c1-15 9-24 20-29-3 11-5 20-5 29Z" />
    <path d="M44 52c1-14 8-22 19-26-3 10-5 18-5 26Z" />
    <path d="M59 52c1-12 7-18 15-21-2 9-3 14-3 21Z" />
  </>
);

type Art = { vb: string; sw: number; node: ReactNode };

const REGION: Record<
  RegionCode,
  { name: string; theme: Theme; badge: Art; scene: Art }
> = {
  au: {
    name: "Australia",
    theme: "dark",
    badge: { vb: "0 0 120 110", sw: 3.5, node: auMap },
    scene: { vb: "0 0 96 64", sw: 2, node: operaHouse },
  },
  uk: {
    name: "United Kingdom",
    theme: "light",
    badge: { vb: "0 0 64 64", sw: 2, node: bigBen },
    scene: { vb: "0 0 64 64", sw: 2, node: bigBen },
  },
};

export default function ServiceCards({ services }: { services: Service[] }) {
  const { region } = useRegion();
  const code: RegionCode = region === "au" ? "au" : "uk";

  return (
    <>
      {/* Mobile / tablet — sticky scroll-stack */}
      <div className="lg:hidden">
        <MobileStack services={services} region={code} />
      </div>

      {/* Desktop — 3-up grid */}
      <DesktopGrid services={services} region={code} />
    </>
  );
}

/* Desktop: three across, staggered reveal on scroll-in. */
function DesktopGrid({
  services,
  region,
}: {
  services: Service[];
  region: RegionCode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <div ref={ref} className="hidden gap-5 lg:grid lg:grid-cols-3">
      {services.map((service, index) => (
        <LandmarkCard
          key={service.title}
          index={index}
          service={service}
          region={region}
          inView={inView}
        />
      ))}
    </div>
  );
}

/* Mobile: cards pin to the top and the next slides up over them. */
function MobileStack({
  services,
  region,
}: {
  services: Service[];
  region: RegionCode;
}) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className="relative">
      {services.map((service, index) => (
        <StackItem
          key={service.title}
          index={index}
          count={services.length}
          progress={scrollYProgress}
          service={service}
          region={region}
        />
      ))}
    </div>
  );
}

function StackItem({
  index,
  count,
  progress,
  service,
  region,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
  service: Service;
  region: RegionCode;
}) {
  // Each earlier card recedes (scales down) as later cards rise over it.
  const targetScale = 1 - (count - index) * 0.04;
  const scale = useTransform(progress, [index / count, 1], [1, targetScale]);

  return (
    <div
      className="sticky flex justify-center"
      style={{ top: `calc(var(--header-h) + 0.75rem + ${index * 1.1}rem)` }}
    >
      <motion.div
        style={{ scale, transformOrigin: "top center" }}
        className="w-full"
      >
        <LandmarkCard index={index} service={service} region={region} inView />
      </motion.div>
    </div>
  );
}

function LandmarkCard({
  index,
  service,
  region,
  inView,
}: {
  index: number;
  service: Service;
  region: RegionCode;
  inView: boolean;
}) {
  const meta = REGION[region];
  const photo = REGION_PHOTO[region];

  return (
    <article
      className="svc2-card"
      data-region={region}
      data-theme={meta.theme}
      data-inview={inView ? "true" : "false"}
      style={{ "--i": index } as CSSProperties}
    >
      {/* ---- Bottom scene: photo or landmark line-art ---- */}
      {photo ? (
        <>
          <div
            className="svc2-photo"
            data-has-photo="true"
            style={{ backgroundImage: `url(${photo})` }}
          />
          <span aria-hidden="true" className="svc2-photo-fade" />
        </>
      ) : (
        <svg
          aria-hidden="true"
          className="svc2-monument"
          viewBox={meta.scene.vb}
          fill="none"
          stroke="currentColor"
          strokeWidth={meta.scene.sw}
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          {meta.scene.node}
        </svg>
      )}

      {/* ---- Curved theme-colour top ---- */}
      <svg
        aria-hidden="true"
        className="svc2-curve"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d="M0 0H100V55C75 74 35 67 0 70Z" fill="currentColor" />
      </svg>

      {/* ---- Header + title ---- */}
      <div className="svc2-top">
        <span className="svc2-badge">
          <svg
            aria-hidden="true"
            viewBox={meta.badge.vb}
            fill="none"
            stroke="currentColor"
            strokeWidth={meta.badge.sw}
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            {meta.badge.node}
          </svg>
        </span>
        <p className="svc2-country-name">{meta.name}</p>
        <span aria-hidden="true" className="svc2-underline" />
        <h3 className="svc2-title">{service.title}</h3>
      </div>

      {/* ---- Full-card link: stretched overlay so the whole card is
              clickable; the Learn-more row below stays as the visual
              affordance. ---- */}
      <a
        href={service.href}
        className="svc2-card-link"
        aria-label={`${service.title} — learn more`}
      />

      {/* ---- Learn more (visual only — the overlay handles the click) ---- */}
      <span className="svc2-learn group/btn" aria-hidden="true">
        <span className="svc2-learn-label">Learn more</span>
        <span className="svc2-learn-arrow">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </span>
    </article>
  );
}
