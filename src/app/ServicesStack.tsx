"use client";

import { ReactLenis } from "lenis/react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { useRef, ReactNode } from "react";

/* ============================================================
 *  Mobile-only stacking variant of the services section.
 *  Cards pin to the top of the viewport and scale down as the
 *  next one rises behind them — same brand styling as the
 *  desktop service-card (dark ink bg + mint Placard title).
 * ============================================================ */

export type Service = {
  title: string;
  href: string;
  description: string;
  icon: ReactNode;
};

export default function ServicesStack({ services }: { services: Service[] }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      <div ref={container} className="relative">
        {services.map((s, i) => {
          // Each card shrinks slightly more than the next one
          const targetScale = 1 - (services.length - i) * 0.04;
          return (
            <StackCard
              key={s.title}
              index={i}
              isLast={i === services.length - 1}
              service={s}
              progress={scrollYProgress}
              range={[i * (1 / services.length), 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </ReactLenis>
  );
}

/* ============ Single sticky card ============ */
function StackCard({
  index,
  isLast,
  service,
  progress,
  range,
  targetScale,
}: {
  index: number;
  isLast: boolean;
  service: Service;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-[16rem] flex h-[55vh] items-start justify-center"
    >
      <motion.article
        style={{
          scale,
          top: `${index * 18}px`,
          transformOrigin: "top center",
        }}
        className="relative w-full overflow-hidden rounded-[1.5rem] border border-mint/20 bg-ink p-7 text-white shadow-[0_30px_60px_-30px_rgba(8,36,30,0.6)]"
      >
        {/* Top row: number + icon */}
        <div className="flex items-start justify-between">
          <span className="font-headline text-2xl font-bold leading-none text-mint/60">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-mint/40 text-mint">
            <span className="block h-6 w-6">{service.icon}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-10 font-headline text-[2.4rem] font-bold uppercase leading-[0.9] text-mint">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mt-5 text-[0.95rem] leading-relaxed text-white/85">
          {service.description}
        </p>

        {/* Footer: link + decorative arrow */}
        <div className="mt-8 flex items-center justify-between">
          <a
            href={service.href}
            className="group inline-flex items-center gap-2 border-b border-mint/40 pb-1 font-headline text-sm font-bold uppercase tracking-wider text-mint transition-colors hover:border-mint"
          >
            Learn more
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              ›
            </span>
          </a>
          <span
            aria-hidden="true"
            className="font-headline text-sm font-semibold uppercase tracking-[0.25em] text-mint/40"
          >
            {service.href.split("/").pop()}
          </span>
        </div>

        {/* Subtle decorative dot grid in the background */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(rgba(220, 250, 232, 0.4) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
      </motion.article>
    </div>
  );
}
