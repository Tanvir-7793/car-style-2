import { JSX } from "react";
import Image from "next/image";
import TeamCard from "@/components/TeamCard";
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
export default function About(): JSX.Element {
  return (
    <>
      
      {/* Banner */}
      <section className="relative h-[500px]">
        <Image
          src="/banner1.jpg"
          alt="Car Wash"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl font-bold drop-shadow-2xl">Our Passion for Perfection</h1>
          <p className="mt-4 text-lg drop-shadow-lg">
            Redefining automotive care in Satara since 2015. We don’t just wash cars; we rejuvenate them.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">The CAR STYLE Story</h2>
        <p className="text-gray-700 mb-6">
          Founded in the heart of Satara, CAR STYLE began with a single vision: to provide a level of automotive detailing usually reserved for high-end showrooms to our local community.
        </p>
        <p className="text-gray-700 mb-6">
          What started as a small passion project with two dedicated detailers has grown into Satara’s premier destination for professional car care. We’ve spent years researching the best ceramic coatings, the safest cleaning agents, and the most efficient techniques to ensure your vehicle leaves our facility looking better than the day you bought it.
        </p>
        <p className="text-gray-700">
          At CAR STYLE, we believe every vehicle deserves to shine. We combine advanced technology with hand-finished precision to deliver results that speak for themselves.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <img src="/detailing.jpg" alt="Detailing" className="rounded shadow" />
          <img src="/wheel.jpg" alt="Clean Wheel" className="rounded shadow" />
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-gray-100 px-6 py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Mission & Values</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white p-6 shadow rounded">
            <h3 className="font-bold text-lg">Uncompromising Quality</h3>
            <p>We never cut corners. Our meticulous multi-step process ensures every inch of your vehicle is treated with care.</p>
          </div>
          <div className="bg-white p-6 shadow rounded">
            <h3 className="font-bold text-lg">Eco-Conscious Care</h3>
            <p>We use biodegradable cleaning products and water-saving technologies to protect Satara’s environment.</p>
          </div>
          <div className="bg-white p-6 shadow rounded">
            <h3 className="font-bold text-lg">Customer First</h3>
            <p>Our success is built on trust and transparency. We aim for 100% satisfaction on every single visit.</p>
          </div>
        </div>
      </section>

      {/* Additional Trust Section / Stats Bar */}
                  <section className="max-w-7xl mx-auto px-6 md:px-8 mt-20">
                      <div className="bg-black text-white rounded-[2.5rem] p-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none"></div>
      
                          <div className="space-y-4">
                              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto">
                                  <Star className="text-primary w-8 h-8" />
                              </div>
                              <h3 className="text-xl font-bold">Premium Quality</h3>
                              <p className="text-gray-400 text-sm">We use only high-end products for the best possible results.</p>
                          </div>
      
                          <div className="space-y-4">
                              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto">
                                  <Shield className="text-primary w-8 h-8" />
                              </div>
                              <h3 className="text-xl font-bold">Secure Care</h3>
                              <p className="text-gray-400 text-sm">Your vehicle is handled with extreme care and fully insured.</p>
                          </div>
      
                          <div className="space-y-4">
                              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto">
                                  <Users className="text-primary w-8 h-8" />
                              </div>
                              <h3 className="text-xl font-bold">12+ Years Exp</h3>
                              <p className="text-gray-400 text-sm">Over a decade of experience in premium automotive detailing.</p>
                          </div>
                      </div>
                  </section>


      {/* Team */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Meet the Experts</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <TeamCard name="Vikram Patil" role="Founder & Master Detailer" image="/vikram.jpg" description="With over 10 years of experience in automotive detailing, Vikram founded CAR STYLE with a vision to bring showroom-quality care to every vehicle." />
          <TeamCard name="Rajesh Shinde" role="Lead Interior Specialist" image="/rajesh.jpg" description="Specializing in interior restoration and leather care, Rajesh ensures every vehicle's cabin feels brand new with meticulous attention to detail." />
          <TeamCard name="Amit Deshmukh" role="Ceramic Coating Expert" image="/amit.jpg" description="Certified in advanced ceramic coating applications, Amit provides long-lasting protection that preserves your vehicle's finish for years." />
          <TeamCard name="Suresh Kadam" role="Exterior Finish Specialist" image="/suresh.jpg" description="Expert in paint correction and exterior detailing, Suresh brings out the deep gloss and mirror-like finish in every vehicle he works on." />
        </div>
      </section>

      
    
    </>
  );
}
