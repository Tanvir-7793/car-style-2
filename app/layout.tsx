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
  keywords: "car detailing, car washing, car care in satara, premium detailing studio, ceramic coating, car protection, luxury car care,book car wash in Satara,car wash near me Satara,affordable car wash Satara,bike washing service Satara,car polishing Satara,top car wash services in Satara, professional car care, car maintenance, car care services in satara, car care near me, car care in satara, car wash satara, car cleaning satara, doorstep car wash satara, car polish satara",
  authors: [{ name: "CAR STYLE" }],
  creator: "Tanvir Mujawar",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "CAR STYLE - Premium Car Detailing Studio in Satara",
    description: "Professional car detailing, washing, and protection services in Satara. Experience luxury car care with ceramic coating, interior detailing, and doorstep service.",
    url: "https://carstyle-satara.com",
    siteName: "CAR STYLE Satara",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CAR STYLE - Premium Car Detailing Studio Satara",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  metadataBase: new URL("https://carstyle-satara.com"),
  alternates: {
    canonical: "https://carstyle-satara.com",
  },
};


import TopInfoBar from "@/components/TopInfoBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
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
        <SpeedInsights />
      </body>
    </html>
  );
}


