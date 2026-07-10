"use client";

import { useEffect } from "react";

/**
 * Removes the `cwap-loading` class from <html> once the client has
 * hydrated — by which point every styled-jsx <style> block has been
 * injected — so the page fades in fully styled instead of flashing
 * unstyled SSR markup first. See the anti-FOUC gate in globals.css.
 */
export default function HydrationGate() {
  useEffect(() => {
    const root = document.documentElement;
    // Two frames: let the browser apply the just-injected styled-jsx
    // rules before we drop the gate, so the reveal is already styled.
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => root.classList.remove("cwap-loading"))
    );
    return () => cancelAnimationFrame(id);
  }, []);

  return null;
}
