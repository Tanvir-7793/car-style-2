import React from "react";
import Image from "next/image";
import ScrollFloat from "@/components/ScrollFloat";
import { Droplets, ShieldCheck, Clock } from "lucide-react";

const whyUsItems = [
    {
        title: "Eco-Friendly Products",
        desc: "We use biodegradable soaps and water-saving techniques to protect the environment while protecting your car.",
        icon: Droplets
    },
    {
        title: "Expert Detailers",
        desc: "Our team consists of certified detailing professionals who understand the science of car care.",
        icon: ShieldCheck
    },
    {
        title: "Quick Turnaround",
        desc: "We respect your time. Our efficient processes ensure high-quality results in record time.",
        icon: Clock
    }
];

const WhyUs = () => {
    return (
        <section id="why-us" className="py-24 bg-white scroll-mt-20">
            <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row-reverse items-center gap-16">
                <div className="lg:w-1/2">
                    <ScrollFloat
                        animationDuration={0.1}
                        ease='back.inOut(2)'
                        scrollStart='center bottom+=50%'
                        scrollEnd='bottom bottom-=50%'
                        stagger={0.03}
                    >
                        <span className="text-primary font-bold uppercase tracking-widest text-sm block mb-4">The Difference</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">Why Car Owners Trust Us</h2>
                    </ScrollFloat>

                    <div className="space-y-10">
                        {whyUsItems.map((item, i) => (
                            <div key={i} className="flex gap-6">
                                <div className="bg-primary/5 p-4 rounded-xl shrink-0 h-fit">
                                    <item.icon className="text-primary w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:w-1/2 relative px-8 py-8">
                    <div className="absolute inset-0 bg-primary/5 rounded-3xl -rotate-2"></div>
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl z-10">
                        <Image
                            src="/bg-image-client.jpg"
                            alt="Detailed Car Close-up"
                            width={800}
                            height={1000}
                            className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-transparent"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
