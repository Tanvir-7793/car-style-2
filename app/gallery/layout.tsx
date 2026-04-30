import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | CAR STYLE Premium Detailing Studio",
  description:
    "Browse our latest car detailing, washing, ceramic coating, and interior care work. See real results from CAR STYLE — Satara's premium detailing studio.",
  keywords:
    "car detailing gallery, car wash photos Satara, ceramic coating results, car care before after, car styling gallery",
  openGraph: {
    title: "Gallery | CAR STYLE Premium Detailing Studio",
    description:
      "Browse our latest car care work — every detail, perfected.",
    url: "https://carstyle-satara.com/gallery",
    siteName: "CAR STYLE Satara",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

