import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { RegionProvider } from "./RegionProvider";
import RegionGate from "./RegionGate";
import SiteAnimations from "./SiteAnimations";
import HydrationGate from "./HydrationGate";
import SmoothNav from "./SmoothNav";
import StructuredData from "./StructuredData";
import WhatsAppButton from "./WhatsAppButton";

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
  metadataBase: new URL("https://comaccpar.com"),
  title: {
    default:
      "Commonwealth Accounting Partners — Bookkeeping, Accounting, Compliance & Advisory",
    template: "%s · Commonwealth Accounting Partners",
  },
  description:
    "Bookkeeping, accounting, compliance and advisory for founders, studios and creators across the UK and Australia. Accurate records. Stronger business. Global partners.",
  alternates: { canonical: "/" },
  openGraph: {
    title:
      "Commonwealth Accounting Partners — Bookkeeping, Accounting, Compliance & Advisory",
    description:
      "Bookkeeping, accounting, compliance and advisory for founders, studios and creators across the UK and Australia.",
    type: "website",
    siteName: "Commonwealth Accounting Partners",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Commonwealth Accounting Partners — Bookkeeping, Accounting, Compliance & Advisory",
    description:
      "Bookkeeping, accounting, compliance and advisory for founders, studios and creators across the UK and Australia.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "JYPpF8iBPw16AT_qK7pddh6LD-vytOt-g8PgxVYWFCU",
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
      className={`${placard.variable} light h-full cwap-loading`}
    >
      <body className="min-h-full">
        {/* JS-disabled visitors never get the styled-jsx styles, but
            they also never hit the flash — reveal the page immediately. */}
        <noscript>
          <style>{`html.cwap-loading body{opacity:1 !important;animation:none !important;}`}</style>
        </noscript>
        <StructuredData />
        <HydrationGate />
        <SmoothNav />
        <SiteAnimations />
        <RegionProvider>
          <RegionGate />
          {children}
        </RegionProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}
