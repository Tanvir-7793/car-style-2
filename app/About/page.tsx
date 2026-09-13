import type { Metadata } from "next";
import { JSX } from "react";
import Image from "next/image";
import { AboutBanner, AboutStory, AboutTeam } from "@/components/AboutContent";
import {
    Phone,
    MessageCircle,
    Mail,
    MapPin,
    Clock,
    CheckCircle2,
    ArrowRight,
    ExternalLink,
    Calendar,
    Star,
    Shield,
    Users
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Best Car Washing Center in Satara | CAR STYLE Story",
  description: "About CAR STYLE - Best car washing center & detailing shop in Satara (Karanje Peth). Our story, expert team & why we are the top car detailing center in Satara.",
};

export default function About(): JSX.Element {
  return (
    <>
      
      {/* Banner */}
      <section className="relative h-[500px] md:*:h-[600px]  overflow-hidden">
        <Image
          src="/AboutPage.jpg"
          alt="Best car washing center in Satara - CAR STYLE team at Karanje Peth studio"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        <AboutBanner />
      </section>

      <AboutStory />

      <AboutTeam />

      
    
    </>
  );
}
