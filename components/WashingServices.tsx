"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ChevronRight } from "lucide-react";
import ScrollFloat from "@/components/ScrollFloat";
import { washingServices as defaultWashingServices } from "@/data/services";
import { useI18n, toLocalDigits } from "@/lib/i18n";

type WashingService = (typeof defaultWashingServices)[number];

interface WashingServicesProps {
    services?: WashingService[];
}

const WashingServices: React.FC<WashingServicesProps> = ({ services = defaultWashingServices }) => {
    const { t, locale } = useI18n();
    const [activeService, setActiveService] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveService((prev) => (prev + 1) % services.length);
        }, 8000);

        return () => clearInterval(interval);
    }, [services.length]);

    return (
        <section id="about" className="py-12 md:py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                {/* Service Tabs */}
                <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 md:gap-4 mb-10 md:mb-16 overflow-x-auto scrollbar-none snap-x snap-mandatory px-1 -mx-6 md:mx-0 scroll-smooth">
                    {services.map((service, index) => (

                        <button
                            key={service.id}
                            onClick={() => setActiveService(index)}
                            className={`shrink-0 snap-center px-4 md:px-8 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer ${activeService === index
                                ? "bg-primary text-white shadow-lg shadow-primary/30"
                                : "bg-gray-100 text-gray-500 hover:bg-gray-200 active:scale-95"
                                }`}
                        >

                            {t(service.title)}

                        </button>

                    ))}
                </div>

                {/* Active Service Content */}
                <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16">
                    <div className="lg:w-1/2 w-full">
                        
                        <ScrollFloat
                            animationDuration={0.1}
                            ease='back.inOut(2)'
                            scrollStart='center bottom+=50%'
                            scrollEnd='bottom bottom-=50%'
                            stagger={0.03}
                        >
                            <span className="text-primary font-bold uppercase tracking-widest text-[10px] md:text-xs block mb-1">
                                {t(services[activeService].subtitle)}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                                {t(services[activeService].title)}
                            </h2>
                            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                            {t(services[activeService].description)}
                        </p>
                        </ScrollFloat>

                        

                        {/* Pricing Grid */}
                        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8 md:mb-10">
                            {services[activeService].pricing.map((tier, i) => (
                                <div key={i} className="bg-gray-50 p-3 md:p-4 rounded-xl border border-black/5 text-center group hover:bg-primary transition-all duration-300">
                                    <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-1 text-gray-400 group-hover:text-white/70">
                                        {t(tier.size)}
                                    </div>
                                    <div className="text-sm md:text-xl font-bold text-gray-900 group-hover:text-white">
                                        ₹{toLocalDigits(tier.price, locale)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Service List - 2 Columns on all devices for space efficiency */}
                        <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-2 md:gap-y-3 mb-8 md:mb-10">
                            {services[activeService].features.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 md:gap-3 group border-b border-black/5 pb-1">
                                    <CheckCircle2 className="text-primary w-3.5 md:w-5 h-3.5 md:h-5 shrink-0" />
                                    <span className="text-[11px] md:text-[14px] font-semibold text-gray-700 truncate">{t(item)}</span>
                                </div>
                            ))}
                        </div>

                        <Link href="/booking">
                            <button className="bg-primary hover:bg-blue-600 text-white px-8 md:px-10 py-3 md:py-4 rounded font-bold transition-all inline-flex items-center gap-2 group shadow-xl shadow-primary/20 text-xs md:text-base">
                                {t("cta.bookWash")}
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>

                    <div className="lg:w-1/2 w-full relative">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-black/5 aspect-4/3 lg:aspect-video">
                                <Image
                                    key={services[activeService].image}
                                    src={services[activeService].image}
                                    alt={services[activeService].title}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority={false}
                                    loading="lazy"
                                    className="object-cover transition-all duration-700 hover:scale-105"
                                />
                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WashingServices;
