"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Region = "uk" | "au" | null;

type Ctx = {
  region: Region;
  setRegion: (r: Region) => void;
};

const RegionContext = createContext<Ctx | null>(null);

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setRegion] = useState<Region>(null);
  return (
    <RegionContext.Provider value={{ region, setRegion }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error("useRegion must be used within RegionProvider");
  return ctx;
}
