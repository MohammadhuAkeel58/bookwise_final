import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { RegionProvider } from "./RegionProvider";

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
  title: "Bookwise - Radical Zine Edition",
  description: "Accounting for the modern entrepreneur.",
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
        <RegionProvider>{children}</RegionProvider>
      </body>
    </html>
  );
}
