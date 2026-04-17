import type { Metadata } from "next";
import localFont from "next/font/local";
import { Special_Elite, Work_Sans } from "next/font/google";
import "./globals.css";

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

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const specialElite = Special_Elite({
  variable: "--font-special-elite",
  subsets: ["latin"],
  weight: ["400"],
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
      className={`${placard.variable} ${workSans.variable} ${specialElite.variable} light h-full`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
