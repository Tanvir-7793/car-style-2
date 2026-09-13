"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import LogoLoop from "@/components/LogoLoop";
import { useI18n } from "@/lib/i18n";
import {
    SiBmw,
    SiMercedes,
    SiAudi,
    SiToyota,
    SiHonda,
    SiTesla,
    SiFord,
    SiVolkswagen,
    SiHyundai,
    SiNissan
} from "react-icons/si";

const carLogos = [
    { node: <SiBmw className="text-gray-400/80 hover:text-white transition-colors duration-300" />, title: "BMW" },
    { node: <SiMercedes className="text-gray-400/80 hover:text-white transition-colors duration-300" />, title: "Mercedes" },
    { node: <SiAudi className="text-gray-400/80 hover:text-white transition-colors duration-300" />, title: "Audi" },
    { node: <SiToyota className="text-gray-400/80 hover:text-white transition-colors duration-300" />, title: "Toyota" },
    { node: <SiHonda className="text-gray-400/80 hover:text-white transition-colors duration-300" />, title: "Honda" },
    { node: <SiTesla className="text-gray-400/80 hover:text-white transition-colors duration-300" />, title: "Tesla" },
    { node: <SiFord className="text-gray-400/80 hover:text-white transition-colors duration-300" />, title: "Ford" },
    { node: <SiVolkswagen className="text-gray-400/80 hover:text-white transition-colors duration-300" />, title: "Volkswagen" },
    { node: <SiHyundai className="text-gray-400/80 hover:text-white transition-colors duration-300" />, title: "Hyundai" },
    { node: <SiNissan className="text-gray-400/80 hover:text-white transition-colors duration-300" />, title: "Nissan" },
];

const bgImages = [
    "/bg1.jpg",
    "/bg2.jpg",
    "/bg3.jpg",
    "/hero-bg.png",
    "/premium-services-img8.jpg"
];

const Hero = () => {
    const { t } = useI18n();
    const [currentBg, setCurrentBg] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBg((prev) => (prev + 1) % bgImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <main id="home" className="relative min-h-[calc(100svh-88px)] md:min-h-[calc(100dvh-88px)] flex flex-col justify-center px-8 lg:px-24 py-10 md:py-12 overflow-hidden">
            {/* Background Images Loop */}
            <div className="absolute inset-0 z-0 bg-black">
                {bgImages.map((img, index) => (
                    <div
                        key={img}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBg ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                    >
                        <Image
                            src={img}
                            alt={`Best car washing center in Satara - CAR STYLE detailing shop background ${index + 1}`}
                            fill
                            priority={index === 0}
                            sizes="100vw"
                            className="object-cover object-[50%_center] max-md:object-[60%_center] max-md:scale-110"
                        />
                    </div>
                ))}
                {/* Heavy dark overlay - left side blur black effect */}
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30"></div>
                {/* Extra left blur fade - solid black with soft blur */}
                <div className="absolute inset-y-0 left-0 w-full md:w-[68%] bg-gradient-to-r from-black via-black to-transparent opacity-95"></div>
                <div className="absolute inset-y-0 left-0 w-full md:w-[58%] bg-black/90 backdrop-blur-[1px]"></div>
            </div>

            <div className="relative z-10 max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-5 md:mb-1 text-white">
                    <span className="font-dm-serif">CAR STYLE</span> <br />
                    <span className="font-niconne text-5xl md:text-6xl gap-2 text-primary italic tracking-wider">{t("hero.title1")}</span><br />
                    <span className="text-2xl md:text-3xl font-bold tracking-wide text-white/90">{t("hero.title2")} </span>
                    <span className="font-niconne text-3xl md:text-4xl gap-2 text-primary italic tracking-wider">{t("hero.title3")}</span>
                </h1>

                <p className="text-base md:text-lg text-gray-300 mb-10 leading-relaxed max-w-xl">
                    {t("hero.desc")}
                </p>

                <div className="flex flex-wrap gap-4 mb-18 md:mb-5">
                    <Link href="/booking">
                        <button className="bg-primary hover:bg-blue-600 text-white px-10 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-xl shadow-primary/30 cursor-pointer">
                            {t("hero.book")}
                        </button>
                    </Link>
                    <Link href="/services">
                        <button className="bg-white hover:bg-gray-100 text-gray-900 border border-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg cursor-pointer">
                            {t("hero.services")}
                        </button>
                    </Link>
                </div>
            </div>

            {/* Brand Logos Integrated into Hero Background */}
            <div className="relative z-10 mt-1 md:mt-5 -mx-8 lg:-mx-24 border-t border-white/10 pt-8">
                <LogoLoop
                    logos={carLogos}
                    speed={40}
                    gap={80}
                    logoHeight={50}
                    direction="left"
                    scaleOnHover
                    fadeOut
                    fadeOutColor="#000000"
                />
            </div>
        </main>
    );
};

export default Hero;
