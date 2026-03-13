import Hero from "@/components/Hero";
import WashingServices from "@/components/WashingServices";
import PremiumServices from "@/components/PremiumServices";
import VideoGallery from "@/components/VideoGallery";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-space selection:bg-primary selection:text-white scroll-smooth transition-colors duration-500">
      <Hero />
      <WashingServices />
      <PremiumServices />
      <VideoGallery />
      <WhyUs />
      <Testimonials />
      <ContactCTA />
    </div>
  );
}
