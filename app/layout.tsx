import type { Metadata } from "next";
import { Space_Grotesk, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
});

export const metadata: Metadata = {
  title: "CAR STYLE | Premium Detailing Studio",
  description: "CAR STYLE offers professional car care that keeps your vehicle looking pristine. Premium washing, detailing, and protection services.",
};

import TopInfoBar from "@/components/TopInfoBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSerif.variable}`}>
      <body className="antialiased">
        <TopInfoBar />
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}


