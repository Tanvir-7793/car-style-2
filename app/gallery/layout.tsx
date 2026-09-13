import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery - Best Car Wash & Detailing Work in Satara | CAR STYLE",
  description: "See CAR STYLE gallery - best car washing center in Satara work: ceramic coating, PPF, interior detailing results at Karanje Peth. 100+ cars transformed.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
