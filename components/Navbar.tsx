"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    React.useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMenuOpen]);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "About", href: "/#about" },
        { name: "Why Us", href: "/#why-us" },
        { name: "Contact", href: "/contact" },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="sticky top-0 z-50 glass-morphism border-b border-black/5 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 py-3 w-full">
                <div className="flex items-center gap-2 md:gap-3">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/logo1.PNG"
                            alt="CAR STYLE Logo"
                            width={150}
                            height={40}
                            className="h-9 md:h-10 w-auto object-contain cursor-pointer"
                            priority
                        />
                    </Link>
                    <span className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest ml-1 hidden lg:inline border-l border-black/10 pl-3 leading-none">
                        Premium Detailing Studio
                    </span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`transition-all relative py-1 hover:text-primary ${isActive
                                    ? "text-primary"
                                    : "text-gray-600"
                                    }`}
                            >
                                {link.name}
                                {isActive && (
                                    <motion.span
                                        layoutId="navUnderline"
                                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/booking">
                        <button className="hidden sm:block bg-black text-white px-5 md:px-6 py-2 md:py-2.5 rounded text-xs md:text-sm font-bold hover:bg-primary transition-all shadow-md active:scale-95">
                            Book Now
                        </button>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 text-gray-700 hover:text-primary transition-colors focus:outline-none relative z-50"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-40 md:hidden bg-white h-screen flex flex-col pt-24 px-8 overflow-y-auto"
                    >
                        <div className="flex flex-col gap-6">
                            <div className="space-y-2">
                                <p className="text-[10px] text-primary font-bold uppercase tracking-[0.3em] mb-4">Menu</p>
                                {navLinks.map((link, index) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <motion.div
                                            key={link.name}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: index * 0.05, duration: 0.3 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className={`text-3xl font-dm-serif transition-colors py-1.5 flex items-center justify-between group ${isActive ? "text-primary" : "text-gray-900"
                                                    }`}
                                            >
                                                {link.name}
                                                {isActive && (
                                                    <div className="w-2 h-2 bg-primary rounded-full" />
                                                )}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="mt-6 pt-8 border-t border-black/5"
                            >
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-4">Quick Contact</p>
                                <div className="space-y-3">
                                    <a href="tel:+917058623593" className="block text-lg font-bold text-gray-800">
                                        +91 7058623593
                                    </a>
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        307/24 Basappa peth, Karanje Peth, Satara
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-8 mb-12"
                            >
                                <Link href="/booking" onClick={() => setIsMenuOpen(false)}>
                                    <button className="w-full bg-black text-white py-4 rounded-xl font-bold text-base shadow-lg active:scale-95 transition-all">
                                        Book Your Appointment
                                    </button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
