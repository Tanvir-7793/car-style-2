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
      <section className="relative h-[500px] md:*:h-[600px]  overflow-hidden">
        <Image
          src="/AboutPage.jpg"
          alt="Car Wash"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl font-bold drop-shadow-2xl">Our Passion for Perfection</h1>
          <p className="mt-4 text-lg drop-shadow-lg">
            Redefining automotive care in Satara since day one. More than a wash—we breathe new life into every car.
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
        
      </section>

      

      


       {/* Team */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Meet the Expert</h2>
        <div className="flex justify-center">
          <TeamCard name="Prasanna Jadhav" role="Owner & Founder" image="/prasanna.jpeg" description="" />
        </div>
      </section>

      
    
    </>
  );
}
