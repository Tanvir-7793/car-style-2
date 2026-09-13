"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Footer = () => {
    const { t } = useI18n();
    return (
        <footer className="bg-[#0b0b0b] text-white pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 lg:col-span-1">
                    <div className="flex items-center gap-3 mb-8">
                        <Image
                            src="/logo1.PNG"
                            alt="CAR STYLE Logo"
                            width={150}
                            height={40}
                            className="h-10 w-auto object-contain brightness-0 invert"
                        />
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        {t("footer.desc")}
                    </p>
                    <div className="flex items-center gap-4 mb-6">
                        <a href="https://www.instagram.com/car_style___/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-full hover:bg-primary transition-colors hover:scale-110"><Instagram className="w-5 h-5" /></a>
                    </div>
                    <LanguageSwitcher variant="footer" />
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-8">{t("footer.quick")}</h4>
                    <ul className="space-y-4 text-gray-400 text-sm font-space">
                        <li><Link href="/" className="hover:text-primary transition-colors">{t("nav.home")}</Link></li>
                        <li><Link href="/services" className="hover:text-primary transition-colors">{t("nav.services")}</Link></li>
                        <li><Link href="/gallery" className="hover:text-primary transition-colors">{t("nav.gallery")}</Link></li>
                        <li><Link href="/About" className="hover:text-primary transition-colors">{t("nav.about")}</Link></li>
                        <li><Link href="/#why-us" className="hover:text-primary transition-colors">{t("nav.whyUs")}</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors">{t("nav.contact")}</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-8">{t("footer.hours")}</h4>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li className="flex justify-between">
                            <span>Mon-Sat:</span>
                            <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Sunday:</span>
                            <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
                        </li>
                        <li className="mt-8">
                            <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                                <p className="text-primary text-xs font-bold uppercase tracking-widest text-center">{t("common.openToday")}</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-8">{t("footer.contact")}</h4>
                    <ul className="space-y-6 text-gray-400 text-sm">
                        <li className="flex gap-4">
                            <MapPin className="text-primary w-5 h-5 shrink-0" />
                            <a href="https://www.google.com/maps/dir/?api=1&destination=307/24+Basappa+peth,+Opp.+Yashwant+Hospital,+Karanje+Peth,+Satara,+Maharashtra+415001" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">307/24 Basappa peth, <br />Opp. To Yashwant Hospital, <br />Karanje Peth, Satara</a>
                        </li>
                        <li className="flex gap-4">
                            <Phone className="text-primary w-5 h-5 shrink-0" />
                            <span><a href="tel:+917058623593" className="hover:text-white transition-colors">+91 7058623593</a> <br /><a href="tel:+917058943593" className="hover:text-white transition-colors">+91 7058943593</a></span>
                        </li>
                        <li className="flex gap-4">
                            <Mail className="text-primary w-5 h-5 shrink-0" />
                            <a href="mailto:carstyle3131@gmail.com" className="hover:text-white transition-colors">carstyle3131@gmail.com</a>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-primary text-lg font-bold shrink-0">🌐</span>
                            <a href="https://car-style-2.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">car-style-2.vercel.app</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 pt-6 flex flex-wrap justify-center gap-4 text-gray-400 text-xs">
                <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <span className="text-white/10">|</span>
                <Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
                <span className="text-white/10">|</span>
                <Link href="/refund-policy" className="hover:text-primary transition-colors">Cancellation & Refund</Link>
            </div>

            <div className="max-w-7xl mx-auto px-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
                <p>{t("footer.rights")}</p>
                <p>
                    Built with <span className="text-red-500">♥</span> by{' '}
                    <a href="https://wa.me/919860193973" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        <span className="font-bold tracking-wider">WEBNIVO</span> <span className="font-medium text-xs">web studio</span>
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
