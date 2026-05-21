"use client";

import { useEffect, useState } from "react";

const mobileLinks = [
  { label: "Services", href: "/#services", number: "01" },
  { label: "Process", href: "/#process", number: "02" },
  { label: "Contact", href: "/#contact", number: "03" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-background/90 backdrop-blur">
        <nav className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-5 py-4 md:grid md:grid-cols-3 md:px-8">
          {/* Logo */}
          <a
            className="logo relative z-[60] inline-flex items-center text-ink"
            href="/"
            onClick={() => setOpen(false)}
            aria-label="Bookwise — home"
          >
            <span className="logo-text font-headline text-[1.7rem] font-bold uppercase leading-[0.86] tracking-[0.01em]">
              Book
              <br />
              wise
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center justify-center gap-10 text-[0.95rem] font-medium md:flex">
            <a className="nav-link" href="/#services">Services</a>
            <a className="nav-link" href="/#process">Process</a>
            <a className="nav-link" href="/#contact">Contact</a>
          </div>

          {/* Right side */}
          <div className="flex items-center justify-end gap-3">
            <a className="btn btn-solid hidden md:inline-flex" href="/#contact">
              Talk to us <span aria-hidden="true">›</span>
            </a>

            {/* Hamburger — mobile only */}
            <button
              className="relative z-[60] flex h-12 w-12 flex-col items-center justify-center gap-[6px] rounded-full border border-ink/15 bg-ink text-white shadow-[0_8px_24px_-12px_rgba(8,36,30,0.6)] transition-transform duration-200 hover:scale-105 active:scale-95 md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={`block h-[2px] w-5 rounded-full bg-mint transition-all duration-300 ${
                  open ? "translate-y-[8px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-5 rounded-full bg-mint transition-all duration-200 ${
                  open ? "scale-x-0 opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-5 rounded-full bg-mint transition-all duration-300 ${
                  open ? "-translate-y-[8px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ink text-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Top spacer matching header height */}
          <div className="h-[5.25rem] flex-shrink-0" />

          {/* Eyebrow */}
          <div className="px-7 pt-4">
            <p
              className="inline-flex items-center rounded-md bg-mint px-2 py-1 font-headline text-sm font-bold uppercase leading-none text-ink"
            >
              Menu
            </p>
          </div>

          {/* Links */}
          <nav className="flex-1 overflow-y-auto px-7 pt-6">
            <ul className="flex flex-col">
              {mobileLinks.map((link, i) => (
                <li
                  key={link.href}
                  className={`border-b border-white/10 transition-all duration-500 ${
                    open
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: open ? `${150 + i * 70}ms` : "0ms",
                  }}
                >
                  <a
                    className="group flex items-center justify-between gap-4 py-5"
                    href={link.href}
                    onClick={() => setOpen(false)}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-mint/70">
                        {link.number}
                      </span>
                      <span className="font-headline text-4xl font-bold uppercase leading-none text-white transition-colors duration-200 group-hover:text-mint">
                        {link.label}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-2xl text-mint/60 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-mint"
                    >
                      ›
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer CTA */}
          <div
            className={`flex flex-shrink-0 flex-col gap-4 border-t border-white/10 px-7 py-6 transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: open ? "450ms" : "0ms" }}
          >
            <a
              className="flex items-center justify-center gap-2 rounded-full bg-mint px-6 py-4 font-headline text-lg font-bold uppercase tracking-wide text-ink transition-transform duration-200 active:scale-95"
              href="#contact"
              onClick={() => setOpen(false)}
            >
              Talk to us <span aria-hidden="true">›</span>
            </a>
            <p className="text-center text-xs uppercase tracking-widest text-white/40">
              Accounting for entrepreneurs
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
