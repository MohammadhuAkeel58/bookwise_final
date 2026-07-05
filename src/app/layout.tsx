import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { RegionProvider } from "./RegionProvider";
import RegionGate from "./RegionGate";
import SiteAnimations from "./SiteAnimations";

const placard = localFont({
  src: [
    {
      path: "../../placard-mt-std/PlacardMTStdCondensed.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../placard-mt-std/PlacardMTStdCondensedBd.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-placard",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bookwise.com"),
  title: {
    default: "Bookwise — Accounting for modern entrepreneurs",
    template: "%s · Bookwise",
  },
  description:
    "Bookkeeping, taxation and online accounting for founders, studios and creators across the UK and Australia. Calmly handled, plainly explained.",
  openGraph: {
    title: "Bookwise — Accounting for modern entrepreneurs",
    description:
      "Bookkeeping, taxation and online accounting for founders, studios and creators across the UK and Australia.",
    type: "website",
    siteName: "Bookwise",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bookwise — Accounting for modern entrepreneurs",
    description:
      "Bookkeeping, taxation and online accounting for founders, studios and creators across the UK and Australia.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#03002e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${placard.variable} light h-full`}
    >
      <body className="min-h-full">
        <SiteAnimations />
        <RegionProvider>
          <RegionGate />
          {children}
        </RegionProvider>
      </body>
    </html>
  );
}
