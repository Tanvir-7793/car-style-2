"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Plus } from "lucide-react";
import ScrollFloat from "./ScrollFloat";
import { premiumServices as defaultPremiumServices } from "@/data/services";

type PremiumService = (typeof defaultPremiumServices)[number];

interface PremiumServicesProps {
    services?: PremiumService[];
    view?: "home" | "full";
}

const PremiumServices: React.FC<PremiumServicesProps> = ({ view = "home", services = defaultPremiumServices }) => {
    const isFull = view === "full";
    const displayedServices = isFull ? services : services.slice(0, 2);


    return (
        <section id="services" className={`py-24 ${isFull ? 'bg-transparent' : ' bg-gradient-to-b from-blue-100 to-gray-100'}`}>
            <div className="max-w-7xl mx-auto px-8">
                <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
                    <ScrollFloat
                        animationDuration={0.1}
                        ease='back.inOut(2)'
                        scrollStart='center bottom+=50%'
                        scrollEnd='bottom bottom-=50%'
                        stagger={0.03}
                    >
                        <span className="text-primary font-bold uppercase tracking-widest text-sm block mb-4">Professional Detailing</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Premium Services</h2>
                        <p className="text-gray-600 text-lg max-w-2xl">
                            Tailored solutions for every vehicle. From daily drivers to luxury vehicles, we offer best-in-class care that fits your needs.
                        </p>
                    </ScrollFloat>
                </div>

                <div className={`grid grid-cols-1 ${isFull ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-8 transition-all duration-500`}>
                    {displayedServices.map((service, i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-black/5 group">
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {service.tag}
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                                <ul className="space-y-2 mb-5 border-t border-black/5 pt-3">
                                    {service.features.map((feature, j) => (
                                        <li key={j} className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                                            <CheckCircle2 className="w-4 h-4 text-primary" /> {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/booking"
                                    className="w-full border border-black/10 py-3 rounded-lg font-bold hover:bg-black hover:text-white transition-all text-sm uppercase tracking-widest leading-none flex items-center justify-center gap-2"
                                >
                                    Book This Service <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {!isFull && (
                    <div className="mt-16 text-center">
                        <Link
                            href="/services#services"
                            className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 inline-flex items-center gap-2 group shadow-lg shadow-primary/5"
                        >
                            See More Services
                            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PremiumServices;
