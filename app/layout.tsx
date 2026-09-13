import type { Metadata } from "next";
import { Space_Grotesk, DM_Serif_Display, Niconne, Mukta, Tiro_Devanagari_Hindi } from "next/font/google";
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

const niconne = Niconne({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-niconne",
});

// Premium Devanagari fonts - Mukta (sans, matches Space Grotesk) + Tiro (serif, matches DM Serif)
const mukta = Mukta({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-mukta",
  display: "swap",
});

const tiroHindi = Tiro_Devanagari_Hindi({
  subsets: ["devanagari"],
  weight: ["400"],
  variable: "--font-tiro",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Best Car Washing Center in Satara | Car Detailing Shop - CAR STYLE",
    template: "%s | CAR STYLE - Car Washing & Detailing Center Satara",
  },
  description:
    "No.1 Car Washing Center in Satara | CAR STYLE - Best car washing shop, detailing center & car care studio in Satara. Premium wash from ₹450, ceramic coating, PPF, interior detailing at Karanje Peth. Call 7058623593.",
  keywords: [
    "car washing center in Satara",
    "car washing shop in Satara",
    "car detailing center in Satara",
    "best car washing center in Satara",
    "car wash in Satara",
    "car wash near me Satara",
    "car detailing shop in Satara",
    "ceramic coating in Satara",
    "PPF coating in Satara",
    "car cleaning center Satara",
    "car polishing center Satara",
    "car care center Satara Karanje Peth",
  ],
  authors: [{ name: "CAR STYLE", url: "https://car-style-2.vercel.app" }],
  creator: "CAR STYLE",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Best Car Washing Center in Satara | CAR STYLE Detailing Shop",
    description:
      "Best car washing shop & detailing center in Satara. Premium wash, ceramic coating, PPF & interior detailing at Karanje Peth. 127+ 5-star reviews.",
    url: "https://car-style-2.vercel.app",
    siteName: "CAR STYLE - Car Washing & Detailing Center Satara",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Best Car Washing Center in Satara - CAR STYLE Detailing Shop Karanje Peth",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Car Washing Center in Satara | CAR STYLE",
    description: "Best car washing shop & detailing center in Satara. Wash from ₹450. Call 7058623593.",
    images: ["/og-image.jpg"],
  },
  metadataBase: new URL("https://car-style-2.vercel.app"),
  alternates: {
    canonical: "https://car-style-2.vercel.app",
  },
  verification: {
    google: "pending-verification",
  },
};


import TopInfoBar from "@/components/TopInfoBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { LanguageProvider } from "@/lib/i18n";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["AutoWash", "AutoDetailing", "LocalBusiness"],
      "@id": "https://car-style-2.vercel.app/#business",
      name: "CAR STYLE - Best Car Washing Center in Satara",
      alternateName: "CAR STYLE Premium Detailing Studio - Car Washing Shop Satara",
      image: "https://car-style-2.vercel.app/logo1.PNG",
      url: "https://car-style-2.vercel.app",
      telephone: "+917058623593",
      priceRange: "₹450 - ₹7000",
      address: {
        "@type": "PostalAddress",
        streetAddress: "307/24 Basappa peth, Opp. To Yashwant Hospital, Karanje Peth",
        addressLocality: "Satara",
        addressRegion: "Maharashtra",
        postalCode: "415001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 17.693748,
        longitude: 73.995262,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "127",
        bestRating: "5",
      },
      areaServed: { "@type": "City", name: "Satara" },
      keywords:
        "car washing center in Satara, car washing shop in Satara, car detailing center in Satara, best car washing center in Satara, car wash near me Satara",
      sameAs: ["https://www.instagram.com/car_style___/"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Car Washing & Detailing Services Satara",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Standard Wash Satara", description: "Car washing center in Satara - Standard Wash from ₹450" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ceramic Coating Satara" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "PPF Coating Satara" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interior Detailing Satara" } },
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://car-style-2.vercel.app" },
        { "@type": "ListItem", position: 2, name: "Services - Car Washing Center Satara", item: "https://car-style-2.vercel.app/services" },
        { "@type": "ListItem", position: 3, name: "Gallery", item: "https://car-style-2.vercel.app/gallery" },
        { "@type": "ListItem", position: 4, name: "Contact - Car Detailing Shop Satara", item: "https://car-style-2.vercel.app/contact" },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSerif.variable} ${niconne.variable} ${mukta.variable} ${tiroHindi.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          <TopInfoBar />
          <Navbar />
          {children}
          <FloatingCallButton />
          <Footer />
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}


