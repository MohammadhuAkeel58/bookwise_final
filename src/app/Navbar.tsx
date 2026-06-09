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

/** Split a string into <span class="mob-menu-char"> wrappers so each
 *  character can mask-rise independently when the menu opens. */
function splitChars(text: string, animate: boolean) {
  return text.split("").map((ch, ci) => (
    <span
      key={ci}
      className="mob-menu-char"
      style={animate ? ({ "--ci": ci } as React.CSSProperties) : undefined}
    >
      <span className="mob-menu-char-inner">
        {ch === " " ? " " : ch}
      </span>
    </span>
  ));
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafId = useRef<number | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const { region, setRegion } = useRegion();

  // Scroll-aware: drive the bottom progress bar via direct DOM writes
  // (no per-frame React re-render) and flip the `scrolled` class at 80px.
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
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        rafId.current = requestAnimationFrame(() => setVisible(true));
      });
    } else if (mounted) {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      setVisible(false);
      closeTimer.current = setTimeout(() => {
        setMounted(false);
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
        className={`sticky top-0 z-50 border-b backdrop-blur transition-[background,box-shadow,border-color] duration-300 ${
          scrolled
            ? "border-ink/15 bg-background/95 shadow-[0_10px_28px_-22px_rgba(8,36,30,0.45)]"
            : "border-ink/10 bg-background/90"
        }`}
      >
        <nav
          className={`mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-5 md:px-8 transition-[padding] duration-300 ${
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

          <div className="navbar-right hidden md:inline-flex">
            <a className="navbar-cta" href="/#contact" onClick={close}>
              <span>Talk to us</span>
              <span className="navbar-cta-arrow" aria-hidden="true">
                →
              </span>
            </a>

            <button
              type="button"
              className="navbar-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="navbar-menu-text">
                {open ? "Close" : "Menu"}
              </span>
              <span className="navbar-menu-icon" aria-hidden="true">
                <MenuToggleIcon open={open} className="size-5" duration={450} />
              </span>
            </button>
          </div>
        </nav>

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

          /* ============ MENU trigger ============ */
          .navbar-menu {
            display: inline-flex;
            align-items: center;
            gap: 0.55rem;
            padding: 0.55rem 0.55rem 0.55rem 0.9rem;
            background: none;
            border: 0;
            cursor: pointer;
            color: var(--ink);
            font-family: var(--font-placard);
            font-weight: 700;
            font-size: 1.1rem;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            transition: color 220ms ease;
          }
          @media (min-width: 768px) {
            .navbar-menu {
              font-size: 1.25rem;
            }
          }
          .navbar-menu-text {
            display: inline-block;
          }
          .navbar-menu-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 2rem;
            height: 2rem;
            border-radius: 999px;
            background: var(--ink);
            color: var(--mint);
            transition:
              transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
              background 220ms ease;
          }
          .navbar-menu:hover .navbar-menu-icon {
            transform: rotate(90deg);
          }
        `}</style>
      </header>

      {/* ============ MOBILE MENU ============ */}
      {mounted && (
        <div
          className={`mob-menu ${visible ? "mob-menu--open" : "mob-menu--closing"}`}
          aria-hidden={!visible}
        >
          {/* Animated bg — iris-reveal from hamburger position */}
          <div className="mob-menu-bg" />

          {/* Subtle dot pattern overlay */}
          <div className="mob-menu-pattern" aria-hidden="true" />

          {/* Soft mint orb decoration */}
          <span aria-hidden="true" className="mob-menu-orb" />

          {/* Content */}
          <div className="mob-menu-content">
            {/* Top row — logo + region badge + close button */}
            <div className="mob-menu-top">
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

            {/* Main nav links */}
            <nav className="mob-menu-nav">
              {primaryLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  aria-label={link.label}
                  className="mob-menu-link"
                  style={
                    {
                      "--i": i,
                      "--ri": primaryLinks.length - 1 - i,
                    } as React.CSSProperties
                  }
                >
                  <span className="mob-menu-link-num" aria-hidden="true">
                    {link.number}
                  </span>
                  <span className="mob-menu-link-label" aria-hidden="true">
                    <span className="mob-menu-link-mask">
                      <span className="mob-menu-link-base">
                        {splitChars(link.label, true)}
                      </span>
                      <span className="mob-menu-link-hover">
                        {splitChars(link.label, false)}
                      </span>
                    </span>
                  </span>
                  <span aria-hidden="true" className="mob-menu-link-arrow">
                    →
                  </span>
                </a>
              ))}
            </nav>

            {/* Bottom CTA + tagline */}
            <div className="mob-menu-bottom">
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

          <style jsx>{`
            /* =========================================================
             *  Mobile menu — full-screen overlay
             *  Entrance: iris-reveal from hamburger button position
             *  Exit: reverse stagger + iris collapse
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

            /* ============ Animated background (iris) ============ */
            .mob-menu-bg {
              position: absolute;
              inset: 0;
              background: linear-gradient(140deg, #08241e 0%, #0c2f27 100%);
              clip-path: circle(0% at calc(100% - 2.5rem) 2.5rem);
              transition: clip-path 700ms cubic-bezier(0.76, 0, 0.24, 1);
              will-change: clip-path;
            }
            .mob-menu--open .mob-menu-bg {
              clip-path: circle(160% at calc(100% - 2.5rem) 2.5rem);
            }

            /* ============ Decorative dot pattern ============ */
            .mob-menu-pattern {
              position: absolute;
              inset: 0;
              background-image: radial-gradient(
                rgba(220, 250, 232, 0.07) 1.4px,
                transparent 1.4px
              );
              background-size: 26px 26px;
              opacity: 0;
              transition: opacity 500ms ease;
            }
            .mob-menu--open .mob-menu-pattern {
              opacity: 1;
              transition-delay: 320ms;
            }

            /* ============ Floating mint orb ============ */
            .mob-menu-orb {
              position: absolute;
              left: -8rem;
              bottom: -8rem;
              width: 22rem;
              height: 22rem;
              border-radius: 999px;
              background: var(--mint);
              filter: blur(60px);
              opacity: 0;
              transition:
                opacity 800ms ease,
                transform 1200ms cubic-bezier(0.22, 1, 0.36, 1);
              transform: scale(0.6);
            }
            .mob-menu--open .mob-menu-orb {
              opacity: 0.28;
              transform: scale(1);
              transition-delay: 250ms;
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

            /* ============ Top row ============ */
            .mob-menu-top {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-top: 0.6rem;
              opacity: 0;
              transform: translateY(-10px);
              transition:
                opacity 500ms ease,
                transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
            }
            .mob-menu--open .mob-menu-top {
              opacity: 1;
              transform: translateY(0);
              transition-delay: 200ms;
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
                border-color 200ms ease,
                opacity 400ms ease;
              opacity: 0;
              transform: scale(0.6) rotate(-90deg);
            }
            .mob-menu--open .mob-menu-close {
              opacity: 1;
              transform: scale(1) rotate(0deg);
              transition:
                opacity 500ms cubic-bezier(0.22, 1, 0.36, 1) 360ms,
                transform 600ms cubic-bezier(0.22, 1, 0.36, 1) 360ms,
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

            /* ============ Big nav links ============ */
            .mob-menu-nav {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              gap: 0.25rem;
              margin-top: 1.5rem;
            }
            .mob-menu-link {
              display: flex;
              align-items: baseline;
              gap: 1rem;
              padding: 0.9rem 0;
              border-bottom: 1px solid rgba(220, 250, 232, 0.12);
              text-decoration: none;
              opacity: 0;
              transform: translateY(36px);
              transition:
                opacity 450ms ease,
                transform 550ms cubic-bezier(0.22, 1, 0.36, 1),
                gap 250ms ease;
            }
            .mob-menu--open .mob-menu-link {
              opacity: 1;
              transform: translateY(0);
              transition-delay: calc(280ms + var(--i) * 70ms);
            }
            .mob-menu--closing .mob-menu-link {
              opacity: 0;
              transform: translateY(-24px);
              transition:
                opacity 280ms ease,
                transform 320ms ease;
              transition-delay: calc(var(--ri) * 45ms);
            }
            .mob-menu-link:active {
              gap: 1.4rem;
            }
            .mob-menu-link-num {
              font-family: ui-monospace, monospace;
              font-size: 0.75rem;
              font-weight: 600;
              color: rgba(220, 250, 232, 0.55);
              letter-spacing: 0.1em;
              flex-shrink: 0;
              min-width: 1.6rem;
            }
            .mob-menu-link-label {
              flex: 1;
              font-family: var(--font-placard);
              font-size: clamp(2rem, 9.5vw, 3.2rem);
              font-weight: 700;
              line-height: 0.92;
              letter-spacing: 0.005em;
              text-transform: uppercase;
              color: white;
              transition: color 200ms ease;
            }
            .mob-menu-link:active .mob-menu-link-label {
              color: var(--mint);
            }
            .mob-menu-link-arrow {
              font-family: var(--font-placard);
              font-size: 1.4rem;
              color: rgba(220, 250, 232, 0.5);
              transition: transform 250ms ease, color 200ms ease;
            }
            .mob-menu-link:active .mob-menu-link-arrow {
              transform: translateX(6px);
              color: var(--mint);
            }

            /* ============ Bottom CTA + tagline ============ */
            .mob-menu-bottom {
              display: flex;
              flex-direction: column;
              align-items: stretch;
              gap: 0.7rem;
              margin-top: auto;
              padding-top: 1.6rem;
              opacity: 0;
              transform: translateY(20px);
              transition:
                opacity 500ms ease,
                transform 550ms cubic-bezier(0.22, 1, 0.36, 1);
            }
            .mob-menu--open .mob-menu-bottom {
              opacity: 1;
              transform: translateY(0);
              transition-delay: 560ms;
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

            /* ============ Dual-label mask (Ignite-style label-roll)
               On mobile the hover copy is hidden so the label looks
               exactly as before. At md+ the mask becomes active. */
            .mob-menu-link-mask {
              display: inline-block;
              line-height: 0.9;
            }
            .mob-menu-link-base {
              display: inline-block;
              line-height: 0.9;
            }
            .mob-menu-link-hover {
              display: none;
            }

            /* ============ Per-character mask-rise on link labels
               Each char gets its own overflow:hidden wrapper. The inner
               span starts translated 110% down and slides into place with
               a per-link + per-char stagger when the menu opens. The
               hover copy uses the same chars (no stagger) so the
               label-roll on hover still works one solid unit. */
            .mob-menu-char {
              display: inline-block;
              overflow: hidden;
              line-height: 0.9;
              vertical-align: bottom;
            }
            .mob-menu-char-inner {
              display: inline-block;
              line-height: 0.9;
              transform: translateY(110%);
              transition: transform 820ms cubic-bezier(0.22, 1, 0.36, 1);
            }
            /* On menu open — chars rise into place. Compound stagger:
               base link delay (i * 60ms) + per-char delay (ci * 28ms). */
            .mob-menu--open
              .mob-menu-link-base
              .mob-menu-char-inner {
              transform: translateY(0);
              transition-delay: calc(280ms + var(--i) * 60ms + var(--ci) * 28ms);
            }
            /* Hover-copy chars sit ready in place — no animation needed. */
            .mob-menu-link-hover .mob-menu-char-inner {
              transform: translateY(0);
              transition: none;
            }
            /* On close — base chars exit upward with reverse stagger. */
            .mob-menu--closing
              .mob-menu-link-base
              .mob-menu-char-inner {
              transform: translateY(-110%);
              transition: transform 420ms cubic-bezier(0.76, 0, 0.24, 1);
              transition-delay: calc(var(--ri) * 40ms + var(--ci) * 14ms);
            }

            /* The previous whole-link translate would compound with the
               per-char rise — disable it so chars do the work. The link
               itself just fades to coordinate the entrance. */
            .mob-menu-link {
              transform: none;
            }
            .mob-menu--open .mob-menu-link {
              transform: none;
            }
            .mob-menu--closing .mob-menu-link {
              transform: none;
            }

            /* ============ Desktop polish ============
               Everything below only kicks in at md+. Mobile is untouched. */
            @media (min-width: 768px) {
              .mob-menu-content {
                padding: 2.4rem 4rem 2.4rem;
              }

              .mob-menu-top {
                padding-top: 0;
              }
              .mob-menu-logo {
                font-size: 2.2rem;
              }
              .mob-menu-close {
                width: 3.4rem;
                height: 3.4rem;
              }
              .mob-menu-close svg {
                width: 1.4rem;
                height: 1.4rem;
              }

              /* Center nav block, give it room */
              .mob-menu-nav {
                max-width: 1280px;
                width: 100%;
                margin: 0 auto;
                gap: 0.25rem;
              }
              .mob-menu-link {
                position: relative;
                padding: 1rem 0;
                gap: 1.6rem;
                align-items: center;
              }
              .mob-menu-link-num {
                font-size: 0.9rem;
                letter-spacing: 0.25em;
                min-width: 2.4rem;
                opacity: 0.55;
              }
              .mob-menu-link-arrow {
                font-size: 2.4rem;
                opacity: 0.4;
                transition:
                  opacity 250ms ease,
                  transform 350ms cubic-bezier(0.76, 0, 0.24, 1),
                  color 200ms ease;
              }

              /* Bigger display type */
              .mob-menu-link-label {
                font-size: clamp(4.5rem, 9.5vw, 9rem);
                line-height: 0.9;
                letter-spacing: -0.005em;
              }

              /* Activate dual-label mask — vertical roll on hover */
              .mob-menu-link-mask {
                position: relative;
                display: inline-flex;
                flex-direction: column;
                overflow: hidden;
                vertical-align: bottom;
                line-height: 0.9;
                height: 1em;
              }
              .mob-menu-link-base,
              .mob-menu-link-hover {
                display: block;
                line-height: 0.9;
                transition: transform 540ms cubic-bezier(0.76, 0, 0.24, 1);
              }
              .mob-menu-link-hover {
                color: var(--mint);
              }

              /* Hover state: rolls the label upward, mint slides in below */
              .mob-menu-link:hover .mob-menu-link-base,
              .mob-menu-link:hover .mob-menu-link-hover {
                transform: translateY(-100%);
              }
              .mob-menu-link:hover .mob-menu-link-arrow {
                opacity: 1;
                color: var(--mint);
                transform: translateX(14px);
              }
              .mob-menu-link:hover .mob-menu-link-num {
                opacity: 1;
                color: var(--mint);
              }

              /* Bottom CTA wider with email + tag side-by-side */
              .mob-menu-bottom {
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                max-width: 1280px;
                width: 100%;
                margin: 2rem auto 0;
                gap: 2rem;
              }
              .mob-menu-cta {
                padding: 1.1rem 2rem;
                font-size: 1.05rem;
              }
              .mob-menu-mail {
                font-size: 0.95rem;
              }
              .mob-menu-tag {
                margin: 0;
                text-align: right;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
