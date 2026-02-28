"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import LogoLoop from "@/components/LogoLoop";
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
    const [currentBg, setCurrentBg] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBg((prev) => (prev + 1) % bgImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <main id="home" className="relative min-h-[calc(100vh-120px)] flex flex-col justify-center px-8 lg:px-24 pt-24 md:pt-0 overflow-hidden">
            {/* Background Images Loop */}
            <div className="absolute inset-0 z-0 bg-black">
                {bgImages.map((img, index) => (
                    <div
                        key={img}
                        className={`absolute inset-0 bg-cover bg-position-[50%_center] max-md:bg-position-[60%_center] max-md:scale-110 transition-opacity duration-1000 ${index === currentBg ? "opacity-100" : "opacity-0"
                            }`}
                        style={{
                            backgroundImage: `url('${img}')`,
                        }}
                    />
                ))}
                {/* Dark gradient overlay for readability */}
                <div className="absolute inset-0 bg-linear-to-r from-black via-black/40 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-2xl">
                <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-5 md:mb-1 text-white">
                    <span className="font-dm-serif">CAR STYLE</span> <br />
                    <span className="  text-5xl md:text-6xl gap-2 text-primary italic">Premium Detailing Studio</span>
                </h1>

                <p className="text-lg md:text-2sm text-gray-300 mb-10 leading-relaxed max-w-xl">
                    Your Car Deserves The Best Care !
                    Professional car care that keeps your vehicle looking pristine.
                </p>

                <div className="flex flex-wrap gap-4 mb-18 md:mb-5">
                    <Link href="/booking">
                        <button className="bg-primary hover:bg-blue-600 text-white px-10 py-4 rounded font-bold transition-all transform hover:scale-105 shadow-xl shadow-primary/30">
                            Book Your Wash
                        </button>
                    </Link>
                    <Link href="/services">
                        <button className="border border-black/10 hover:border-black/30 text-black px-10 py-4 rounded font-bold transition-all bg-white/50 backdrop-blur-sm cursor-pointer">
                            View Services
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
