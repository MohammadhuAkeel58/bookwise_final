"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Progressive-enhancement client navigation.
 *
 * The site uses plain <a> tags for its internal links (styled-jsx needs the
 * generated scope class on the real element, which next/link doesn't reliably
 * receive). Plain <a> means every internal click triggers a full document
 * reload — re-downloading the bundle and re-running the load sequence, which
 * feels janky and "stuck".
 *
 * This listener intercepts left-clicks on same-origin links and routes them
 * through the App Router instead, giving instant client-side transitions while
 * the <a href> stays intact for SEO, middle-click, and no-JS fallback.
 */
export default function SmoothNav() {
  const router = useRouter();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Respect modified clicks and anything already handled.
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const anchor = (e.target as HTMLElement)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Skip new-tab links, downloads, and non-navigations.
      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#")
      ) {
        return;
      }

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      // Only same-origin navigations.
      if (url.origin !== window.location.origin) return;

      // Same-page hash links: let the browser handle native smooth scroll.
      if (url.pathname === window.location.pathname && url.hash) return;

      e.preventDefault();
      router.push(url.pathname + url.search + url.hash);
    };

    // Prefetch same-origin routes on hover/focus so the click feels instant
    // (App Router's <Link> prefetches automatically; our plain <a> tags don't).
    const prefetched = new Set<string>();
    const onPointerOver = (e: Event) => {
      const anchor = (e.target as HTMLElement)?.closest?.("a");
      const href = anchor?.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname) return;
        if (prefetched.has(url.pathname)) return;
        prefetched.add(url.pathname);
        router.prefetch(url.pathname);
      } catch {
        // ignore malformed hrefs
      }
    };

    document.addEventListener("click", onClick);
    document.addEventListener("pointerover", onPointerOver);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointerover", onPointerOver);
    };
  }, [router]);

  return null;
}
