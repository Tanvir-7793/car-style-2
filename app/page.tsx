import Hero from "@/components/Hero";
import WashingServices from "@/components/WashingServices";
import PremiumServices from "@/components/PremiumServices";
import WhyUs from "@/components/WhyUs";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-space selection:bg-primary selection:text-white scroll-smooth transition-colors duration-500">
      <Hero />
      <WashingServices />
      <PremiumServices />
      <WhyUs />
      <ContactCTA />
    </div>
  );
}
