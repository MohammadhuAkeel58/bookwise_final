"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
// Plain <a> is required for the elements styled inside <style jsx> below.
// next/link does not forward styled-jsx's auto-generated jsx-XXX class to
// the rendered <a>, so any styled-jsx CSS rule (.navbar-cta { ... } etc.)
// targeting those classes would silently miss in production.

import { useEffect, useRef, useState } from "react";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useRegion } from "./RegionProvider";

const primaryLinks = [
  { label: "Services", href: "/#services", number: "01" },
  { label: "Process", href: "/#process", number: "02" },
  { label: "Contact", href: "/#contact", number: "03" },
];

// Desktop mega-panel items (Services dropdown)
const serviceLinks = [
  { label: "Business", href: "/services/business", number: "01" },
  { label: "Taxation", href: "/services/taxation", number: "02" },
  { label: "Other services", href: "/services/other", number: "03" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Apechain-style desktop Services mega-panel below the header. The bar
  // itself stays sticky + visible throughout (no hide-on-scroll-down).
  const [panelOpen, setPanelOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // True once the menu has actually been open in this mount cycle. A fresh
  // mount must render with NO state class so the panels start off-screen
  // right; applying --closing pre-open parks them at x:0 and the whole
  // drawer slides in as one dark block (no colour sweep).
  const [hasOpened, setHasOpened] = useState(false);
  const rafId = useRef<number | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const lastY = useRef(0);
  const panelOpenRef = useRef(false);
  const { region, setRegion } = useRegion();

  useEffect(() => {
    panelOpenRef.current = panelOpen;
  }, [panelOpen]);

  // Scroll-aware: drive the bottom progress bar via direct DOM writes
  // (no per-frame React re-render), flip the `scrolled` class at 80px,
  // and track scroll direction for the hide/show header.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${pct})`;
        }
        setScrolled((prev) => {
          const next = y > 80;
          return prev === next ? prev : next;
        });
        const dy = y - lastY.current;
        if (Math.abs(dy) > 8) {
          // Navbar stays sticky + visible throughout the page (no
          // hide-on-scroll-down). We only close the services panel
          // when the user scrolls.
          if (panelOpenRef.current) setPanelOpen(false);
          lastY.current = y;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Esc closes the desktop services panel
  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setPanelOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panelOpen]);

  const toggleRegion = () => setRegion(region === "uk" ? "au" : "uk");

  // Mount → next 2 frames → flip visible → CSS transitions fire
  useEffect(() => {
    if (open) {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
      rafId.current = requestAnimationFrame(() => {
        rafId.current = requestAnimationFrame(() => {
          setHasOpened(true);
          setVisible(true);
        });
      });
    } else if (mounted) {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      setVisible(false);
      closeTimer.current = setTimeout(() => {
        setMounted(false);
        setHasOpened(false);
        closeTimer.current = null;
      }, 750);
    }
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [open, mounted]);

  // Lock body scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Esc closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`navbar-root sticky top-0 z-50 max-md:border-b max-md:backdrop-blur ${
          scrolled
            ? "max-md:border-ink/15 max-md:bg-background/95 max-md:shadow-[0_10px_28px_-22px_rgba(3,0,46,0.45)]"
            : "max-md:border-ink/10 max-md:bg-background/90"
        }`}
        onMouseLeave={() => setPanelOpen(false)}
      >
        {/* Region bar — pinned with the header on every page so the
            visitor can always switch market. */}
        {region && (
          <div className="region-bar">
            <div className="region-bar-inner">
              <p className="region-bar-status">
                <span className="region-bar-dot" aria-hidden="true" />
                <span className="region-bar-label region-bar-lead">
                  You&apos;re viewing
                </span>
                <span className="region-bar-region">
                  {region === "uk" ? "United Kingdom" : "Australia"}
                </span>
              </p>
              <button
                type="button"
                onClick={toggleRegion}
                className="region-bar-switch"
              >
                Switch to {region === "uk" ? "Australia" : "the UK"}
                <span className="region-bar-switch-arrow" aria-hidden="true">
                  ⇄
                </span>
              </button>
            </div>
            <span className="region-bar-sheen" aria-hidden="true" />
          </div>
        )}

        {/* Desktop: page-dim while the services panel is open (apechain's
            bg-black/10 overlay). Pointer-events stay off — close is handled
            by mouseleave / Esc / scroll. */}
        <span
          className={`navbar-dim hidden md:block ${panelOpen ? "navbar-dim--on" : ""}`}
          aria-hidden="true"
        />

        {/* Desktop: solid bar that slides down behind the links once
            scrolled (apechain's ::before translateY(-100%) → 0). Clipped
            so it can only slide in from above. */}
        <span className="navbar-solid-clip hidden md:block" aria-hidden="true">
          <span
            className={`navbar-solid ${scrolled || panelOpen ? "navbar-solid--on" : ""}`}
          />
        </span>

        <nav
          className="relative mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-5 py-3 md:px-8 md:py-3.5"
        >
          {/* MOBILE — original stacked logo + round hamburger (untouched).
              Plain <a> required: <Link> from next/link doesn't receive
              styled-jsx's auto-generated jsx-XXX class, so any styled-jsx
              CSS rule targeting these classes would silently miss. */}
          <a
            className="logo relative z-[60] inline-flex items-center text-ink md:hidden"
            href="/"
            onClick={close}
            aria-label="Commonwealth Accounting Partners — home"
          >
            <img
              src="/commonwealth-logo.svg"
              alt=""
              className="h-10 w-auto shrink-0"
            />
            <span className="ml-2 flex flex-col justify-center">
              <span className="logo-text font-headline text-[1.25rem] font-bold uppercase leading-[0.9] tracking-[0.01em]">
                Commonwealth
              </span>
              <span className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-ink/60">
                Accounting Partners
              </span>
            </span>
          </a>

          <button
            type="button"
            className="hamburger-btn relative z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-ink text-mint shadow-[0_8px_24px_-12px_rgba(3,0,46,0.6)] transition-transform duration-200 hover:scale-105 active:scale-95 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuToggleIcon open={open} className="size-6" duration={450} />
          </button>

          {/* DESKTOP only — big wordmark + pill CTA + MENU text */}
          <a
            className="navbar-logo hidden md:inline-flex"
            href="/"
            onClick={close}
            aria-label="Commonwealth Accounting Partners — home"
          >
            <img
              src="/commonwealth-logo.svg"
              alt=""
              className="navbar-logo-mark"
            />
            <span className="navbar-logo-stack">
              <span className="logo-text">Commonwealth</span>
              <span className="navbar-logo-sub">Accounting Partners</span>
            </span>
          </a>

          {/* Centered inline links — apechain treatment: idle 60% opacity,
              rise to 100% on hover/focus. Services expands the mega-panel. */}
          <div className="navbar-center hidden md:flex">
            <button
              type="button"
              className={`navbar-link navbar-link--services ${
                panelOpen ? "navbar-link--active" : ""
              }`}
              aria-expanded={panelOpen}
              aria-controls="navbar-services-panel"
              onMouseEnter={() => setPanelOpen(true)}
              onClick={() => setPanelOpen((v) => !v)}
            >
              Services
              <span
                className={`navbar-link-chev ${panelOpen ? "navbar-link-chev--up" : ""}`}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>
            <a
              className="navbar-link"
              href="/#process"
              onMouseEnter={() => setPanelOpen(false)}
              onClick={close}
            >
              Process
            </a>
            <a
              className="navbar-link"
              href="/#contact"
              onMouseEnter={() => setPanelOpen(false)}
              onClick={close}
            >
              Contact
            </a>
          </div>

          <div className="navbar-right hidden md:inline-flex">
            <a
              className="navbar-cta"
              href="/#contact"
              onMouseEnter={() => setPanelOpen(false)}
              onClick={close}
            >
              <span>Talk to us</span>
              <span className="navbar-cta-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </nav>

        {/* Desktop services mega-panel — slides down from under the header
            (clipped by the wrap), links stagger-rise in, label rolls to
            mint on hover. */}
        <div
          id="navbar-services-panel"
          className={`navbar-panel-wrap hidden md:block ${
            panelOpen ? "navbar-panel-wrap--open" : ""
          }`}
        >
          <div className="navbar-panel">
            <div className="navbar-panel-inner">
              {/* Giant category title on the left (apechain's "BUILD").
                  Split per character so each glyph mask-rises with a
                  stagger when the panel opens. */}
              <p className="navbar-panel-title" aria-hidden="true">
                {"Services".split("").map((ch, ci) => (
                  <span key={ci} className="navbar-panel-title-mask">
                    <span
                      className="navbar-panel-title-char"
                      style={{ "--ci": ci } as React.CSSProperties}
                    >
                      {ch}
                    </span>
                  </span>
                ))}
              </p>

              {/* Vertical sub-link list to the right */}
              <div className="navbar-panel-list">
                {serviceLinks.map((s, i) => (
                  <a
                    key={s.href}
                    href={s.href}
                    className="navbar-panel-link"
                    style={{ "--i": i } as React.CSSProperties}
                    onClick={() => setPanelOpen(false)}
                  >
                    <span className="navbar-panel-mask">
                      <span className="navbar-panel-base">{s.label}</span>
                      <span className="navbar-panel-hover" aria-hidden="true">
                        {s.label}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll progress — thin mint bar pinned to bottom of header */}
        <span
          ref={progressRef}
          className="navbar-progress"
          aria-hidden="true"
        />

        <style jsx>{`
          /* ============ Region bar ============
             Slim midnight strip above the nav — silk sheen, monospace
             small caps, hairline switch pill that fills red on hover. */
          .region-bar {
            position: relative;
            z-index: 2;
            overflow: hidden;
            background:
              radial-gradient(
                130% 160% at 10% -30%,
                rgba(84, 70, 200, 0.35) 0%,
                rgba(38, 28, 130, 0.14) 40%,
                transparent 65%
              ),
              linear-gradient(90deg, #02001f 0%, #060342 55%, #02001f 100%);
            border-bottom: 1px solid rgba(159, 192, 245, 0.14);
          }
          .region-bar-inner {
            max-width: 1500px;
            margin: 0 auto;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            padding: 0.45rem 1.25rem;
            white-space: nowrap;
          }
          @media (min-width: 768px) {
            .region-bar-inner { padding: 0.5rem 2rem; }
          }
          .region-bar-status {
            display: inline-flex;
            align-items: baseline;
            gap: 0.6rem;
            margin: 0;
            min-width: 0;
            overflow: hidden;
          }
          .region-bar-dot {
            align-self: center;
            flex-shrink: 0;
            width: 6px;
            height: 6px;
            border-radius: 999px;
            background: var(--red);
            box-shadow: 0 0 0 0 rgba(200, 16, 46, 0.6);
            animation: region-bar-pulse 2000ms ease-out infinite;
          }
          @keyframes region-bar-pulse {
            0% { box-shadow: 0 0 0 0 rgba(200, 16, 46, 0.5); }
            70% { box-shadow: 0 0 0 6px rgba(200, 16, 46, 0); }
            100% { box-shadow: 0 0 0 0 rgba(200, 16, 46, 0); }
          }
          .region-bar-label {
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            font-size: 0.62rem;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: rgba(159, 192, 245, 0.75);
          }
          .region-bar-region {
            font-family: var(--font-placard, inherit);
            font-size: 0.86rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #ffffff;
          }
          .region-bar-switch {
            display: inline-flex;
            flex-shrink: 0;
            align-items: center;
            gap: 0.5rem;
            padding: 0.32rem 0.9rem;
            border-radius: 999px;
            border: 1px solid rgba(159, 192, 245, 0.35);
            background: transparent;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            font-size: 0.62rem;
            font-weight: 600;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--mint);
            cursor: pointer;
            transition:
              background 240ms ease,
              border-color 240ms ease,
              color 240ms ease;
          }
          .region-bar-switch:hover {
            background: var(--red);
            border-color: var(--red);
            color: #ffffff;
          }
          .region-bar-switch-arrow {
            font-size: 0.8rem;
            line-height: 1;
            transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .region-bar-switch:hover .region-bar-switch-arrow {
            transform: rotate(180deg);
          }
          .region-bar-sheen {
            position: absolute;
            left: 0;
            bottom: 0;
            height: 1px;
            width: 35%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(159, 192, 245, 0.9),
              transparent
            );
            animation: region-bar-sheen 6s linear infinite;
            pointer-events: none;
          }
          @keyframes region-bar-sheen {
            from { transform: translateX(-100%); }
            to { transform: translateX(386%); }
          }
          @media (max-width: 600px) {
            .region-bar-hide,
            .region-bar-lead { display: none; }
            .region-bar-label { font-size: 0.56rem; }
            .region-bar-region { font-size: 0.78rem; letter-spacing: 0.06em; }
            .region-bar-switch { font-size: 0.56rem; padding: 0.28rem 0.7rem; }
            .region-bar-inner { gap: 0.6rem; }
          }
          @media (prefers-reduced-motion: reduce) {
            .region-bar-dot,
            .region-bar-sheen {
              animation: none;
            }
          }

          /* ============ Scroll progress bar ============ */
          .navbar-progress {
            position: absolute;
            left: 0;
            bottom: -1px;
            width: 100%;
            height: 1.5px;
            background: var(--red);
            transform: scaleX(0);
            transform-origin: left center;
            pointer-events: none;
          }

          /* ============ Logo ============
             NB: do NOT set display here. Tailwind owns it via the
             hidden / md:inline-flex utilities on the element.
             Overriding display here defeats the responsive hide. */
          .navbar-logo {
            position: relative;
            z-index: 60;
            align-items: center;
            gap: 0.65rem;
            text-decoration: none;
            color: var(--ink);
          }
          :global(.navbar-logo .navbar-logo-mark) {
            height: clamp(2.5rem, 4vw, 3.1rem);
            width: auto;
            flex-shrink: 0;
            display: block;
          }
          :global(.navbar-logo .navbar-logo-stack) {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 0.18rem;
          }
          :global(.navbar-logo .logo-text) {
            font-family: var(--font-placard);
            font-weight: 700;
            font-size: clamp(1.35rem, 2.6vw, 1.9rem);
            line-height: 0.95;
            letter-spacing: -0.005em;
            text-transform: uppercase;
            color: var(--ink);
            display: inline-flex;
            align-items: flex-start;
          }
          :global(.navbar-logo .navbar-logo-sub) {
            font-size: 0.58rem;
            font-weight: 600;
            line-height: 1;
            letter-spacing: 0.26em;
            text-transform: uppercase;
            color: rgba(3, 0, 46, 0.55);
          }

          /* ============ Right cluster ============
             Same note: Tailwind owns display via hidden / md:inline-flex. */
          .navbar-right {
            position: relative;
            z-index: 60;
            align-items: center;
            gap: 0.8rem;
          }
          @media (min-width: 640px) {
            .navbar-right {
              gap: 1.4rem;
            }
          }

          /* ============ Pill CTA ============ */
          .navbar-cta {
            display: inline-flex;
            align-items: center;
            gap: 0.55rem;
            padding: 0.78rem 1.2rem;
            border-radius: 999px;
            background: var(--red);
            color: #ffffff;
            font-family: var(--font-placard);
            font-weight: 700;
            font-size: 0.95rem;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            text-decoration: none;
            box-shadow: 0 12px 30px -18px rgba(3, 0, 46, 0.35);
            transition:
              transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
              background 220ms ease,
              box-shadow 220ms ease;
          }
          @media (min-width: 768px) {
            .navbar-cta {
              padding: 0.9rem 1.5rem;
              font-size: 1.02rem;
            }
          }
          .navbar-cta:hover {
            transform: translateY(-1px);
            background: var(--red-deep);
            box-shadow: 0 18px 36px -16px rgba(3, 0, 46, 0.4);
          }
          .navbar-cta:active {
            transform: translateY(0);
          }
          .navbar-cta-arrow {
            display: inline-block;
            transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .navbar-cta:hover .navbar-cta-arrow {
            transform: translateX(4px);
          }

          /* Header is permanently pinned: no transform, no size change.
             Only surface styling (background, shadow) may transition. */
          .navbar-root {
            transition:
              background-color 300ms ease,
              box-shadow 300ms ease,
              border-color 300ms ease;
          }

          /* Solid bar sliding down behind the links once scrolled */
          .navbar-solid-clip {
            position: absolute;
            inset: 0;
            overflow: hidden;
            pointer-events: none;
          }
          /* Permanently solid — the header never goes transparent, so
             nothing slides, fades, or repaints while scrolling. */
          .navbar-solid {
            position: absolute;
            inset: 0;
            background: var(--background);
            border-bottom: 1px solid rgba(3, 0, 46, 0.12);
            box-shadow: 0 10px 28px -22px rgba(3, 0, 46, 0.45);
          }

          /* Page dim while the services panel is open */
          .navbar-dim {
            position: fixed;
            inset: 0;
            z-index: -1;
            background: rgba(3, 0, 46, 0.14);
            opacity: 0;
            transition: opacity 300ms ease;
            pointer-events: none;
          }
          .navbar-dim--on {
            opacity: 1;
          }

          /* ============ Centered inline links ============ */
          .navbar-center {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            align-items: center;
            gap: 2.4rem;
          }
          .navbar-link {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.4rem 0.1rem;
            background: none;
            border: 0;
            cursor: pointer;
            font-family: var(--font-placard);
            font-weight: 700;
            font-size: 1.18rem;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: var(--ink);
            text-decoration: none;
            opacity: 0.6;
            transition: opacity 300ms ease;
          }
          .navbar-link:hover,
          .navbar-link:focus-visible,
          .navbar-link--active {
            opacity: 1;
          }
          .navbar-link-chev {
            font-size: 0.65em;
            transition: transform 300ms ease;
          }
          .navbar-link-chev--up {
            transform: rotate(180deg);
          }

          /* ============ Services mega-panel ============ */
          .navbar-panel-wrap {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            overflow: hidden;
            pointer-events: none;
            visibility: hidden;
            transition: visibility 0s linear 480ms;
          }
          .navbar-panel-wrap--open {
            pointer-events: auto;
            visibility: visible;
            transition-delay: 0s;
          }
          .navbar-panel {
            background: linear-gradient(140deg, #03002e 0%, #150f63 100%);
            border-bottom: 1px solid rgba(220, 232, 250, 0.18);
            transform: translateY(-101%);
            transition: transform 420ms cubic-bezier(0.76, 0, 0.24, 1);
            will-change: transform;
          }
          .navbar-panel-wrap--open .navbar-panel {
            transform: translateY(0);
          }
          .navbar-panel-inner {
            max-width: 1500px;
            margin: 0 auto;
            padding: 3rem 2rem 4rem;
            display: flex;
            align-items: flex-start;
            gap: clamp(3rem, 6vw, 6rem);
          }
          /* Giant left category title (apechain's "BUILD").
             Each char rises out of its own overflow-hidden mask. */
          .navbar-panel-title {
            margin: 0;
            font-family: var(--font-placard);
            font-weight: 700;
            font-size: clamp(7rem, 16vw, 15rem);
            line-height: 0.78;
            letter-spacing: -0.01em;
            text-transform: uppercase;
            color: #ffffff;
          }
          .navbar-panel-title-mask {
            display: inline-block;
            overflow: hidden;
            line-height: 0.78;
            vertical-align: bottom;
            padding-bottom: 0.04em;
          }
          .navbar-panel-title-char {
            display: inline-block;
            line-height: 0.78;
            transform: translateY(112%);
            transition: transform 640ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .navbar-panel-wrap--open .navbar-panel-title-char {
            transform: translateY(0);
            transition-delay: calc(150ms + var(--ci) * 42ms);
          }
          /* Vertical sub-link list */
          .navbar-panel-list {
            display: flex;
            flex-direction: column;
            gap: 0.55rem;
            padding-top: 0.6rem;
          }
          /* Sub-links: the whole label slides up out of the link's own
             overflow clip, one after another. */
          .navbar-panel-link {
            display: inline-flex;
            overflow: hidden;
            text-decoration: none;
          }
          .navbar-panel-link .navbar-panel-mask {
            transform: translateY(115%);
            transition: transform 560ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .navbar-panel-wrap--open .navbar-panel-link .navbar-panel-mask {
            transform: translateY(0);
            transition-delay: calc(260ms + var(--i) * 85ms);
          }
          /* Dual-label vertical roll — base rolls up, mint copy in below.
             Font-size lives on the mask so its 1em height matches the
             label height exactly (children inherit). */
          .navbar-panel-mask {
            display: inline-flex;
            flex-direction: column;
            overflow: hidden;
            font-family: var(--font-placard);
            font-weight: 700;
            font-size: clamp(2.4rem, 4vw, 3.8rem);
            height: 0.95em;
            line-height: 0.9;
          }
          .navbar-panel-base,
          .navbar-panel-hover {
            display: block;
            line-height: 0.9;
            letter-spacing: -0.005em;
            text-transform: uppercase;
            color: #ffffff;
            transition: transform 500ms cubic-bezier(0.76, 0, 0.24, 1);
          }
          .navbar-panel-hover {
            color: var(--mint);
          }
          .navbar-panel-link:hover .navbar-panel-base,
          .navbar-panel-link:hover .navbar-panel-hover,
          .navbar-panel-link:focus-visible .navbar-panel-base,
          .navbar-panel-link:focus-visible .navbar-panel-hover {
            transform: translateY(-100%);
          }

          @media (prefers-reduced-motion: reduce) {
            .navbar-root,
            .navbar-solid,
            .navbar-panel,
            .navbar-panel-link,
            .navbar-panel-title-char,
            .navbar-panel-mask,
            .navbar-panel-base,
            .navbar-panel-hover,
            .navbar-dim {
              transition: none !important;
            }
            .navbar-root--hidden {
              transform: none;
            }
            .navbar-panel-title-char,
            .navbar-panel-link .navbar-panel-mask {
              transform: none;
            }
          }
        `}</style>
      </header>

      {/* ============ MOBILE MENU ============
          Ignite-style: dim overlay fades in, three colour panels sweep
          in from the right (staggered), links rise with a slight tilt
          and straighten as they land, extras fade up last. Close slides
          the whole drawer back out to the right. */}
      {mounted && (
        <div
          className={`mob-menu ${
            visible ? "mob-menu--open" : hasOpened ? "mob-menu--closing" : ""
          }`}
          aria-hidden={!visible}
        >
          {/* Dim overlay */}
          <div className="mob-overlay" onClick={close} />

          {/* Drawer — panel sweep happens behind the content */}
          <div className="mob-drawer">
            <span className="mob-panel mob-panel--1" aria-hidden="true" />
            <span className="mob-panel mob-panel--2" aria-hidden="true" />
            <span className="mob-panel mob-panel--3" aria-hidden="true" />

            <div className="mob-menu-content">
              {/* Top row — logo chip + wordmark, close button only.
                  The region switcher lives in its own card below. */}
              <div className="mob-menu-top mob-fade">
                <p className="mob-menu-logo">
                  <img
                    src="/commonwealth-logo.svg"
                    alt=""
                    className="mob-menu-logo-mark"
                  />
                  <span className="mob-menu-logo-stack">
                    <span className="mob-menu-logo-word">Commonwealth</span>
                    <span className="mob-menu-logo-sub">
                      Accounting Partners
                    </span>
                  </span>
                </p>

                <button
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className="mob-menu-close"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              {/* Main nav links — calmer scale, gold index numbers,
                  arrow pinned right, hairline dividers */}
              <nav className="mob-menu-nav">
                {primaryLinks.map((link, i) => (
                  <span key={link.href} className="mob-menu-link-mask">
                    <a
                      href={link.href}
                      onClick={close}
                      className="mob-menu-link"
                      style={{ "--i": i } as React.CSSProperties}
                    >
                      <span className="mob-menu-link-label">{link.label}</span>
                    </a>
                  </span>
                ))}
              </nav>

              {/* Secondary services — outlined pill chips */}
              <div className="mob-menu-extras mob-fade">
                <p className="mob-menu-extras-label">Our services</p>
                <ul className="mob-menu-extras-list">
                  {serviceLinks.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        onClick={close}
                        className="mob-menu-extra-link"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Navy footer band — region switcher + CTA + email */}
              <div className="mob-menu-bottom mob-fade">
                <div className="mob-menu-bottom-row">
                  {region && (
                    <button
                      type="button"
                      onClick={toggleRegion}
                      className="mob-menu-region"
                      aria-label={`Switch region — currently ${region === "uk" ? "United Kingdom" : "Australia"}`}
                    >
                      <span className="mob-menu-region-flag">
                        {region === "uk" ? "🇬🇧" : "🇦🇺"}
                      </span>
                      <span>
                        {region === "uk" ? "United Kingdom" : "Australia"}
                      </span>
                      <span className="mob-menu-region-switch">
                        Switch <span aria-hidden="true">⇄</span>
                      </span>
                    </button>
                  )}
                  <a href="/#contact" onClick={close} className="mob-menu-cta">
                    <span>Talk to us</span>
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
                <a
                  href="mailto:hello@commonwealthaccountingpartners.com"
                  className="mob-menu-mail"
                  onClick={close}
                >
                  hello@commonwealthaccountingpartners.com
                </a>
              </div>
            </div>
          </div>

          <style jsx>{`
            /* =========================================================
             *  Mobile menu — Ignite-style staggered panel sweep
             *  Open: overlay fade + 3 panels wipe in from the right,
             *  links rise with a 10° tilt, extras fade up.
             *  Close: whole drawer slides out right, overlay fades.
             * ========================================================= */
            .mob-menu {
              position: fixed;
              inset: 0;
              z-index: 55;
              overflow: hidden;
            }
            .mob-menu--closing {
              pointer-events: none;
            }

            /* ============ Dim overlay ============ */
            .mob-overlay {
              position: absolute;
              inset: 0;
              background: rgba(2, 10, 40, 0.45);
              opacity: 0;
              transition: opacity 500ms ease;
            }
            .mob-menu--open .mob-overlay {
              opacity: 1;
            }
            .mob-menu--closing .mob-overlay {
              opacity: 0;
            }

            /* ============ Drawer + panel sweep ============ */
            .mob-drawer {
              position: absolute;
              inset: 0;
              transform: translateX(0);
              transition: transform 700ms cubic-bezier(0.65, 0.01, 0.05, 0.99);
            }
            .mob-menu--closing .mob-drawer {
              transform: translateX(120%);
            }

            .mob-panel {
              position: absolute;
              inset: 0;
              transform: translateX(101%);
              transition: transform 700ms cubic-bezier(0.65, 0.01, 0.05, 0.99);
              will-change: transform;
            }
            .mob-panel--1 {
              background: var(--red);
            }
            .mob-panel--2 {
              background: var(--ink);
              transition-delay: 180ms;
            }
            .mob-panel--3 {
              background: #f6f4ee;
              transition-delay: 360ms;
            }
            /* Whisper-subtle dot texture so empty areas have depth */
            .mob-panel--3::after {
              content: "";
              position: absolute;
              inset: 0;
              background-image: radial-gradient(
                rgba(3, 0, 46, 0.045) 1.2px,
                transparent 1.2px
              );
              background-size: 24px 24px;
            }
            .mob-menu--open .mob-panel {
              transform: translateX(0);
            }
            /* On close the drawer carries the panels out — freeze them */
            .mob-menu--closing .mob-panel {
              transition: none;
              transform: translateX(0);
            }

            /* ============ Content layout ============ */
            .mob-menu-content {
              position: relative;
              z-index: 1;
              display: flex;
              height: 100%;
              flex-direction: column;
              padding: 1.4rem 1.6rem 1.6rem;
              overflow-y: auto;
              -webkit-overflow-scrolling: touch;
            }

            /* ============ Fade-up targets (top row / bottom) ======= */
            .mob-fade {
              opacity: 0;
              transform: translateY(50%);
              transition:
                opacity 500ms ease,
                transform 600ms cubic-bezier(0.65, 0.01, 0.05, 0.99);
            }
            .mob-menu--open .mob-fade {
              opacity: 1;
              transform: translateY(0);
            }
            .mob-menu--open .mob-menu-top {
              transition-delay: 780ms;
            }
            .mob-menu--open .mob-menu-extras {
              transition-delay: 840ms;
            }
            .mob-menu--open .mob-menu-bottom {
              transition-delay: 920ms;
            }
            .mob-menu--closing .mob-fade {
              transition: none;
            }

            /* ============ Top row ============ */
            .mob-menu-top {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0.6rem 0 1.2rem;
            }
            .mob-menu-logo {
              display: inline-flex;
              align-items: center;
              gap: 0.7rem;
              color: var(--ink);
            }
            /* Full-colour emblem — it's designed for light surfaces */
            .mob-menu-logo-mark {
              height: 2.7rem;
              width: auto;
              flex-shrink: 0;
              display: block;
            }
            .mob-menu-logo-stack {
              display: flex;
              flex-direction: column;
              gap: 0.28rem;
            }
            .mob-menu-logo-word {
              font-family: var(--font-placard);
              font-size: 1rem;
              font-weight: 700;
              line-height: 1;
              letter-spacing: 0.16em;
              text-transform: uppercase;
            }
            .mob-menu-logo-sub {
              font-size: 0.5rem;
              font-weight: 600;
              line-height: 1;
              letter-spacing: 0.3em;
              text-transform: uppercase;
              color: #b99328;
            }

            /* ============ X close button ============ */
            .mob-menu-close {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 2.7rem;
              height: 2.7rem;
              border-radius: 999px;
              border: 1px solid var(--ink);
              background: var(--ink);
              color: #f6f4ee;
              cursor: pointer;
              transition:
                transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
                background 200ms ease,
                border-color 200ms ease;
            }
            .mob-menu-close:hover {
              background: var(--red);
              border-color: var(--red);
            }
            .mob-menu-close:active {
              transform: scale(0.92);
            }
            .mob-menu-close svg {
              width: 1.1rem;
              height: 1.1rem;
            }

            /* ============ Main nav links ============
               Editorial rows: red index numbers, navy labels,
               hairline dividers between rows. */
            .mob-menu-nav {
              display: flex;
              flex-direction: column;
              margin-top: 0.2rem;
            }
            .mob-menu-link-mask {
              display: block;
              overflow: hidden;
              border-top: 1px solid rgba(3, 0, 46, 0.12);
            }
            .mob-menu-link-mask:last-child {
              border-bottom: 1px solid rgba(3, 0, 46, 0.12);
            }
            .mob-menu-link {
              display: flex;
              align-items: baseline;
              justify-content: center;
              gap: 0.9rem;
              padding: 1.2rem 0;
              text-decoration: none;
              opacity: 0;
              transform: translateY(140%) rotate(6deg);
              transform-origin: left bottom;
              transition:
                opacity 360ms ease,
                transform 700ms cubic-bezier(0.65, 0.01, 0.05, 0.99);
              will-change: transform;
            }
            .mob-menu--open .mob-menu-link {
              opacity: 1;
              transform: translateY(0) rotate(0deg);
              transition-delay: calc(520ms + var(--i) * 50ms);
            }
            .mob-menu--closing .mob-menu-link {
              transition: none;
            }
            .mob-menu-link-label {
              font-family: var(--font-placard);
              font-size: clamp(3rem, 13vw, 3.9rem);
              font-weight: 700;
              line-height: 0.92;
              letter-spacing: 0.01em;
              text-transform: uppercase;
              color: var(--ink);
              transition: color 200ms ease;
            }
            .mob-menu-link:active .mob-menu-link-label {
              color: var(--red);
            }

            /* ============ Secondary services — pill chips ============ */
            .mob-menu-extras {
              margin-top: 1.6rem;
              /* Guaranteed gap before the navy footer band even when
                 the content fills the viewport and margin-top:auto on
                 .mob-menu-bottom collapses to zero. */
              padding-bottom: 1.8rem;
            }
            .mob-menu-extras-label {
              text-align: center;
              font-size: 0.85rem;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.32em;
              color: #b99328;
              margin-bottom: 1rem;
            }
            .mob-menu-extras-list {
              list-style: none;
              margin: 0;
              padding: 0;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              gap: 0.55rem;
            }
            .mob-menu-extra-link {
              display: inline-block;
              padding: 0.75rem 1.5rem;
              border: 1px solid rgba(3, 0, 46, 0.22);
              border-radius: 999px;
              text-decoration: none;
              font-size: 1.05rem;
              font-weight: 500;
              letter-spacing: 0.02em;
              color: var(--ink);
              transition:
                border-color 200ms ease,
                background 200ms ease,
                color 200ms ease;
            }
            .mob-menu-extra-link:active {
              background: var(--ink);
              border-color: var(--ink);
              color: #f6f4ee;
            }

            /* ============ Navy footer band ============
               Bleeds past the content padding so it anchors the
               bottom edge like a letterhead footer. */
            .mob-menu-bottom {
              display: flex;
              flex-direction: column;
              align-items: stretch;
              gap: 0.75rem;
              margin-top: auto;
              margin-left: -1.6rem;
              margin-right: -1.6rem;
              margin-bottom: -1.6rem;
              padding: 1.3rem 1.6rem calc(1.4rem + env(safe-area-inset-bottom));
              background: var(--ink);
            }
            .mob-menu-bottom-row {
              display: flex;
              flex-direction: column;
              align-items: stretch;
              gap: 0.95rem;
            }
            .mob-menu-region {
              display: flex;
              align-items: center;
              gap: 0.45rem;
              padding: 0 0 0.95rem;
              border: none;
              border-bottom: 1px solid rgba(255, 255, 255, 0.12);
              background: none;
              font-size: 0.8rem;
              font-weight: 500;
              color: rgba(255, 255, 255, 0.85);
              cursor: pointer;
            }
            .mob-menu-region-flag {
              font-size: 0.95rem;
              line-height: 1;
            }
            .mob-menu-region-switch {
              display: inline-flex;
              align-items: center;
              gap: 0.3rem;
              margin-left: auto;
              font-size: 0.68rem;
              font-weight: 600;
              letter-spacing: 0.08em;
              text-transform: uppercase;
              color: #b99328;
            }
            .mob-menu-cta {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              gap: 0.55rem;
              padding: 0.72rem 1.35rem;
              border-radius: 999px;
              background: var(--red);
              color: white;
              font-family: var(--font-placard);
              font-size: 0.92rem;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.12em;
              text-decoration: none;
              transition: transform 200ms ease;
            }
            .mob-menu-cta:active {
              transform: scale(0.97);
            }
            .mob-menu-mail {
              text-align: center;
              font-size: 0.7rem;
              letter-spacing: 0.03em;
              color: rgba(255, 255, 255, 0.4);
              text-decoration: none;
              transition: color 200ms ease;
            }
            .mob-menu-mail:active {
              color: #b99328;
            }

            @media (prefers-reduced-motion: reduce) {
              .mob-overlay,
              .mob-drawer,
              .mob-panel,
              .mob-fade,
              .mob-menu-link {
                transition: none !important;
              }
              .mob-panel,
              .mob-fade,
              .mob-menu-link {
                transform: none !important;
                opacity: 1 !important;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
