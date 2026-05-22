"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Region = "uk" | "au" | null;

type Ctx = {
  region: Region;
  setRegion: (r: Region) => void;
  hydrated: boolean;
};

const STORAGE_KEY = "bookwise-region";

const RegionContext = createContext<Ctx | null>(null);

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setRegionState] = useState<Region>(null);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from sessionStorage on first mount (only persists for the current tab)
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved === "uk" || saved === "au") {
        setRegionState(saved);
      }
    } catch {
      // sessionStorage might be unavailable in some environments
    }
    setHydrated(true);
  }, []);

  const setRegion = (r: Region) => {
    setRegionState(r);
    try {
      if (r) {
        sessionStorage.setItem(STORAGE_KEY, r);
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  };

  return (
    <RegionContext.Provider value={{ region, setRegion, hydrated }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error("useRegion must be used within RegionProvider");
  return ctx;
}
