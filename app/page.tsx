import Hero from "@/components/Hero";
import WashingServices from "@/components/WashingServices";
import PremiumServices from "@/components/PremiumServices";
import VideoGallery from "@/components/VideoGallery";
import WhyUs from "@/components/WhyUs";

import ContactCTA from "@/components/ContactCTA";
import FAQSection from "@/components/FAQSection";
import SEOContent from "@/components/SEOContent";
export const metadata = {
  title: "Best Car Washing Center in Satara | No.1 Car Detailing Shop",
  description:
    "Best car washing center in Satara - CAR STYLE is the top rated car washing shop & detailing center in Satara (Karanje Peth). Wash from ₹450, ceramic coating, PPF, interior detailing. Book now 7058623593.",
  keywords: [
    "best car washing center in Satara",
    "car washing shop in Satara",
    "car detailing center in Satara",
    "car wash Satara",
    "car washing center near me",
  ],
  alternates: { canonical: "https://car-style-2.vercel.app" },
  openGraph: {
    title: "Best Car Washing Center in Satara | CAR STYLE - Karanje Peth",
    description: "Top rated car washing shop & detailing center in Satara. Premium wash, detailing, ceramic & PPF.",
    url: "https://car-style-2.vercel.app",
    siteName: "CAR STYLE Satara",
    locale: "en_IN",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-space selection:bg-primary selection:text-white scroll-smooth transition-colors duration-500">
      <Hero />
      <WashingServices />
      <PremiumServices />
      <VideoGallery />
      <WhyUs />
      
      <FAQSection />
      <SEOContent />
      <ContactCTA />
    </div>
  );
}
