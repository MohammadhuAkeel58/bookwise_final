"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SiteAnimations() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ============================================================
       *  HERO — fires after preloader (or 3.5s fallback)
       * ============================================================ */
      const heroLines = gsap.utils.toArray<HTMLElement>(".hero-line-inner");
      const heroLink = gsap.utils.toArray<HTMLElement>(".hero-link");
      const heroBgLogos = gsap.utils.toArray<HTMLElement>(".hero-bg-logo");

      gsap.set(heroLink, { autoAlpha: 0, y: 24 });
      gsap.set(heroLines, { yPercent: 110 });
      gsap.set(heroBgLogos, { autoAlpha: 0 });

      let played = false;
      const playHero = () => {
        if (played) return;
        played = true;
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        if (heroBgLogos.length) {
          tl.to(heroBgLogos, {
            autoAlpha: 0.34,
            duration: 1.2,
            stagger: { each: 0.05, from: "random" },
            ease: "power2.out",
          });
        }
        if (heroLines.length) {
          tl.to(
            heroLines,
            {
              yPercent: 0,
              duration: 1.1,
              stagger: 0.08,
              ease: "expo.out",
            },
            "-=0.9"
          );
        }
        if (heroLink.length) {
          tl.to(heroLink, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.55");
        }
      };

      window.addEventListener("bookwise:preloader-done", playHero, {
        once: true,
      });
      const heroFallback = window.setTimeout(playHero, 3500);

      /* ============================================================
       *  Section headings — clip-path mask reveal on scroll
       * ============================================================ */
      gsap.utils.toArray<HTMLElement>("section h2").forEach((h2) => {
        if (h2.classList.contains("hero-headline")) return;
        gsap.from(h2, {
          y: 70,
          autoAlpha: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: h2,
            start: "top 85%",
            once: true,
          },
        });
      });

      /* ============================================================
       *  Eyebrows below the hero — fade up on scroll
       * ============================================================ */
      gsap.utils.toArray<HTMLElement>(".eyebrow").forEach((el) => {
        if (el.closest(".hero-section")) return;
        gsap.from(el, {
          y: 22,
          autoAlpha: 0,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      /* ============================================================
       *  Section descriptive paragraphs
       * ============================================================ */
      gsap.utils
        .toArray<HTMLElement>(
          "section p.section-subtitle-mobile, section .lg\\:text-center p.font-headline, section p.text-lg"
        )
        .forEach((p) => {
          if (p.closest(".hero-section")) return;
          gsap.from(p, {
            y: 28,
            autoAlpha: 0,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: { trigger: p, start: "top 90%", once: true },
          });
        });

      /* ============================================================
       *  Service cards — batch stagger on scroll
       * ============================================================ */
      ScrollTrigger.batch(".service-card, [data-service-card]", {
        start: "top 88%",
        once: true,
        onEnter: (els) => {
          gsap.from(els, {
            y: 60,
            autoAlpha: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.12,
            overwrite: "auto",
          });
        },
      });

      /* ============================================================
       *  Reason cards — staggered rise
       * ============================================================ */
      ScrollTrigger.batch(".reason-card", {
        start: "top 88%",
        once: true,
        onEnter: (els) => {
          gsap.from(els, {
            y: 50,
            autoAlpha: 0,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.1,
            overwrite: "auto",
          });
        },
      });

      /* ============================================================
       *  Process rows — slide in from the left
       * ============================================================ */
      gsap.utils.toArray<HTMLElement>(".process-row").forEach((row) => {
        gsap.from(row, {
          x: -40,
          y: 30,
          autoAlpha: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
      });

      /* ============================================================
       *  CTA section — gentle lift
       * ============================================================ */
      const ctaSection = document.querySelector<HTMLElement>("#contact");
      if (ctaSection) {
        gsap.from(ctaSection.querySelectorAll(":scope > div > *"), {
          y: 40,
          autoAlpha: 0,
          duration: 0.95,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ctaSection,
            start: "top 80%",
            once: true,
          },
        });
      }

      /* ============================================================
       *  Footer columns — fade up
       * ============================================================ */
      const footer = document.querySelector<HTMLElement>("footer");
      if (footer) {
        gsap.from(footer.querySelectorAll(":scope > div > *"), {
          y: 30,
          autoAlpha: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: footer,
            start: "top 92%",
            once: true,
          },
        });
      }

      /* ============================================================
       *  Navbar logo — micro entrance on initial load
       * ============================================================ */
      const navLogo = document.querySelector<HTMLElement>(".logo-text");
      if (navLogo) {
        gsap.from(navLogo, {
          autoAlpha: 0,
          y: -14,
          duration: 0.9,
          ease: "expo.out",
          delay: 0.2,
        });
      }

      // Cleanup attached via gsap.context — but also clear the fallback
      return () => {
        window.removeEventListener("bookwise:preloader-done", playHero);
        window.clearTimeout(heroFallback);
      };
    });

    return () => ctx.revert();
  }, []);

  return null;
}
