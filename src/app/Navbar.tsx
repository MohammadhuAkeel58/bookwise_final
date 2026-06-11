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
  { label: "Online accounting", href: "/services/online-accounting", number: "03" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Apechain-style desktop behaviors: hide-on-scroll-down / show-on-scroll-up
  // and the Services mega-panel below the header.
  const [hidden, setHidden] = useState(false);
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
          setHidden(dy > 0 && y > 160);
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
          hidden && !panelOpen && !open ? "navbar-root--hidden" : ""
        } ${
          scrolled
            ? "max-md:border-ink/15 max-md:bg-background/95 max-md:shadow-[0_10px_28px_-22px_rgba(8,36,30,0.45)]"
            : "max-md:border-ink/10 max-md:bg-background/90"
        }`}
        onMouseLeave={() => setPanelOpen(false)}
      >
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
          className={`relative mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-5 md:px-8 transition-[padding] duration-300 ${
            scrolled ? "py-2.5 md:py-3" : "py-4 md:py-5"
          }`}
        >
          {/* MOBILE — original stacked logo + round hamburger (untouched).
              Plain <a> required: <Link> from next/link doesn't receive
              styled-jsx's auto-generated jsx-XXX class, so any styled-jsx
              CSS rule targeting these classes would silently miss. */}
          <a
            className="logo relative z-[60] inline-flex items-center text-ink md:hidden"
            href="/"
            onClick={close}
            aria-label="Bookwise — home"
          >
            <span className="logo-text font-headline text-[1.7rem] font-bold uppercase leading-[0.86] tracking-[0.01em]">
              Book
              <br />
              wise
            </span>
          </a>

          <button
            type="button"
            className="hamburger-btn relative z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-ink text-mint shadow-[0_8px_24px_-12px_rgba(8,36,30,0.6)] transition-transform duration-200 hover:scale-105 active:scale-95 md:hidden"
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
            aria-label="Bookwise — home"
          >
            <span className="logo-text">
              Bookwise<sup className="navbar-logo-r" aria-hidden="true">®</sup>
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
          /* ============ Scroll progress bar ============ */
          .navbar-progress {
            position: absolute;
            left: 0;
            bottom: -1px;
            width: 100%;
            height: 1.5px;
            background: var(--mint);
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
            text-decoration: none;
            color: var(--ink);
          }
          :global(.navbar-logo .logo-text) {
            font-family: var(--font-placard);
            font-weight: 700;
            font-size: clamp(1.7rem, 4vw, 2.6rem);
            line-height: 1;
            letter-spacing: -0.005em;
            text-transform: uppercase;
            color: var(--ink);
            display: inline-flex;
            align-items: flex-start;
          }
          .navbar-logo-r {
            font-size: 0.32em;
            font-weight: 700;
            line-height: 1;
            margin-top: 0.1em;
            margin-left: 0.06em;
            color: rgba(8, 36, 30, 0.55);
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
            background: var(--mint);
            color: var(--ink);
            font-family: var(--font-placard);
            font-weight: 700;
            font-size: 0.95rem;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            text-decoration: none;
            box-shadow: 0 12px 30px -18px rgba(8, 36, 30, 0.35);
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
            background: #6ce5b3;
            box-shadow: 0 18px 36px -16px rgba(8, 36, 30, 0.4);
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

          /* ============ Apechain-style header behavior (desktop) ======
             Hide on scroll down / show on scroll up. The transform only
             activates at md+ so mobile keeps its always-visible header. */
          .navbar-root {
            transition:
              transform 320ms cubic-bezier(0.45, 0, 0.2, 1),
              background-color 300ms ease,
              box-shadow 300ms ease,
              border-color 300ms ease;
          }
          @media (min-width: 768px) {
            .navbar-root--hidden {
              transform: translateY(-100%);
            }
          }

          /* Solid bar sliding down behind the links once scrolled */
          .navbar-solid-clip {
            position: absolute;
            inset: 0;
            overflow: hidden;
            pointer-events: none;
          }
          .navbar-solid {
            position: absolute;
            inset: 0;
            background: var(--background);
            border-bottom: 1px solid rgba(8, 36, 30, 0.12);
            box-shadow: 0 10px 28px -22px rgba(8, 36, 30, 0.45);
            transform: translateY(-101%);
            transition: transform 320ms cubic-bezier(0.45, 0, 0.2, 1);
          }
          .navbar-solid--on {
            transform: translateY(0);
          }

          /* Page dim while the services panel is open */
          .navbar-dim {
            position: fixed;
            inset: 0;
            z-index: -1;
            background: rgba(8, 36, 30, 0.14);
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
            background: linear-gradient(140deg, #08241e 0%, #0c2f27 100%);
            border-bottom: 1px solid rgba(220, 250, 232, 0.18);
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
              {/* Top row — logo + region badge + close button */}
              <div className="mob-menu-top mob-fade">
                <p className="mob-menu-logo">
                  Book
                  <br />
                  wise
                </p>

                <div className="mob-menu-top-right">
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
                      <span>{region === "uk" ? "UK" : "AU"}</span>
                      <span className="mob-menu-region-swap" aria-hidden="true">
                        ⇄
                      </span>
                    </button>
                  )}

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
              </div>

              {/* Main nav links — eyebrow number over a huge heading,
                  each rising out of its own overflow mask with a tilt */}
              <nav className="mob-menu-nav">
                {primaryLinks.map((link, i) => (
                  <span key={link.href} className="mob-menu-link-mask">
                    <a
                      href={link.href}
                      onClick={close}
                      className="mob-menu-link"
                      style={{ "--i": i } as React.CSSProperties}
                    >
                      <span className="mob-menu-link-num" aria-hidden="true">
                        {link.number}
                      </span>
                      <span className="mob-menu-link-label">{link.label}</span>
                    </a>
                  </span>
                ))}
              </nav>

              {/* Secondary services list — fills the mid space, mirrors
                  ignite's small "extras" links under the big headings */}
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
                        <span>{s.label}</span>
                        <span className="mob-menu-extra-arrow" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom CTA + tagline */}
              <div className="mob-menu-bottom mob-fade">
                <a href="/#contact" onClick={close} className="mob-menu-cta">
                  <span>Talk to us</span>
                  <span aria-hidden="true">›</span>
                </a>
                <a
                  href="mailto:hello@bookwise.com"
                  className="mob-menu-mail"
                  onClick={close}
                >
                  hello@bookwise.com
                </a>
                <p className="mob-menu-tag">
                  Accounting for the modern entrepreneur
                </p>
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
              background: rgba(5, 23, 18, 0.45);
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
              background: var(--mint);
            }
            .mob-panel--2 {
              background: #14503f;
              transition-delay: 180ms;
            }
            .mob-panel--3 {
              background: linear-gradient(140deg, #08241e 0%, #0c2f27 100%);
              transition-delay: 360ms;
            }
            /* Subtle dot texture on the menu face so empty areas have depth */
            .mob-panel--3::after {
              content: "";
              position: absolute;
              inset: 0;
              background-image: radial-gradient(
                rgba(220, 250, 232, 0.05) 1.2px,
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
              padding-top: 0.6rem;
            }
            .mob-menu-logo {
              font-family: var(--font-placard);
              font-size: 1.7rem;
              font-weight: 700;
              line-height: 0.86;
              letter-spacing: 0.01em;
              text-transform: uppercase;
              color: white;
            }
            .mob-menu-region {
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              padding: 0.45rem 0.55rem 0.45rem 0.75rem;
              border: 1px solid rgba(220, 250, 232, 0.25);
              border-radius: 999px;
              background: rgba(220, 250, 232, 0.04);
              font-family: var(--font-placard);
              font-size: 0.75rem;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.15em;
              color: var(--mint);
              cursor: pointer;
              transition:
                background 220ms ease,
                border-color 220ms ease,
                transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
            }
            .mob-menu-region:hover {
              background: rgba(220, 250, 232, 0.1);
              border-color: var(--mint);
            }
            .mob-menu-region:active {
              transform: scale(0.95);
            }
            .mob-menu-region-flag {
              font-size: 1rem;
              line-height: 1;
            }
            .mob-menu-region-swap {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 1.2rem;
              height: 1.2rem;
              border-radius: 999px;
              background: rgba(220, 250, 232, 0.12);
              font-size: 0.7rem;
              letter-spacing: 0;
            }

            .mob-menu-top-right {
              display: flex;
              align-items: center;
              gap: 0.7rem;
            }

            /* ============ X close button ============ */
            .mob-menu-close {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 2.7rem;
              height: 2.7rem;
              border-radius: 999px;
              border: 1px solid rgba(220, 250, 232, 0.25);
              background: rgba(220, 250, 232, 0.05);
              color: var(--mint);
              cursor: pointer;
              transition:
                transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
                background 200ms ease,
                border-color 200ms ease;
            }
            .mob-menu-close:hover {
              background: rgba(220, 250, 232, 0.12);
              border-color: var(--mint);
            }
            .mob-menu-close:active {
              transform: scale(0.92);
            }
            .mob-menu-close svg {
              width: 1.1rem;
              height: 1.1rem;
            }

            /* ============ Big nav links ============
               Ignite layout: top-aligned list, thin number column to the
               left of each huge heading. */
            .mob-menu-nav {
              display: flex;
              flex-direction: column;
              margin-top: 2.4rem;
            }
            /* Each link rises out of its own clip; hairline dividers
               between rows give the list structure */
            .mob-menu-link-mask {
              display: block;
              overflow: hidden;
              border-bottom: 1px solid rgba(220, 250, 232, 0.14);
              padding: 0.55rem 0;
            }
            .mob-menu-link-mask:first-child {
              border-top: 1px solid rgba(220, 250, 232, 0.14);
            }
            .mob-menu-link {
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              gap: 0.9rem;
              padding: 0.2rem 0;
              text-decoration: none;
              opacity: 0;
              transform: translateY(140%) rotate(10deg);
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
            .mob-menu-link-num {
              font-family: ui-monospace, monospace;
              font-size: 0.7rem;
              font-weight: 600;
              color: rgba(220, 250, 232, 0.55);
              letter-spacing: 0.2em;
              min-width: 1.5rem;
              flex-shrink: 0;
              padding-top: 0.35em;
            }
            .mob-menu-link-label {
              font-family: var(--font-placard);
              font-size: clamp(3.4rem, 15vw, 5.2rem);
              font-weight: 700;
              line-height: 0.9;
              letter-spacing: 0.005em;
              text-transform: uppercase;
              color: white;
              transition: color 200ms ease;
            }
            .mob-menu-link:active .mob-menu-link-label {
              color: var(--mint);
            }

            /* ============ Secondary services list ============ */
            .mob-menu-extras {
              margin-top: 2rem;
            }
            .mob-menu-extras-label {
              font-size: 0.68rem;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.28em;
              color: rgba(220, 250, 232, 0.5);
              margin-bottom: 0.7rem;
            }
            .mob-menu-extras-list {
              list-style: none;
              margin: 0;
              padding: 0;
              display: flex;
              flex-direction: column;
            }
            .mob-menu-extra-link {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 1rem;
              padding: 0.55rem 0;
              text-decoration: none;
              font-family: var(--font-placard);
              font-size: 1.35rem;
              font-weight: 700;
              letter-spacing: 0.04em;
              text-transform: uppercase;
              color: rgba(255, 255, 255, 0.88);
              transition: color 200ms ease;
            }
            .mob-menu-extra-link:active {
              color: var(--mint);
            }
            .mob-menu-extra-arrow {
              font-size: 1rem;
              color: rgba(220, 250, 232, 0.55);
            }

            /* ============ Bottom CTA + tagline ============ */
            .mob-menu-bottom {
              display: flex;
              flex-direction: column;
              align-items: stretch;
              gap: 0.7rem;
              margin-top: auto;
              padding-top: 1.6rem;
            }
            .mob-menu-mail {
              text-align: center;
              font-family: ui-monospace, monospace;
              font-size: 0.8rem;
              letter-spacing: 0.04em;
              color: rgba(220, 250, 232, 0.7);
              text-decoration: none;
              padding: 0.3rem 0;
              transition: color 200ms ease;
            }
            .mob-menu-mail:active {
              color: var(--mint);
            }
            .mob-menu-cta {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              gap: 0.7rem;
              padding: 1rem 1.4rem;
              border-radius: 999px;
              background: var(--mint);
              color: var(--ink);
              font-family: var(--font-placard);
              font-size: 1.1rem;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.04em;
              transition: transform 200ms ease;
            }
            .mob-menu-cta:active {
              transform: scale(0.97);
            }
            .mob-menu-tag {
              text-align: center;
              font-size: 0.7rem;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.25em;
              color: rgba(220, 250, 232, 0.45);
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
