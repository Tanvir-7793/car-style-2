import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
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
                    <p className="text-gray-400 text-sm leading-relaxed mb-8">
                        CAR STYLE is your premier car wash and detailing destination. Providing high-end care for vehicles since 2012. We bring the shine back to your drive.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="bg-white/5 p-3 rounded-full hover:bg-primary transition-colors hover:scale-110"><Facebook className="w-5 h-5" /></a>
                        <a href="#" className="bg-white/5 p-3 rounded-full hover:bg-primary transition-colors hover:scale-110"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="bg-white/5 p-3 rounded-full hover:bg-primary transition-colors hover:scale-110"><Twitter className="w-5 h-5" /></a>
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-8">Quick Links</h4>
                    <ul className="space-y-4 text-gray-400 text-sm font-space">
                        <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                        <li><Link href="/services" className="hover:text-primary transition-colors">Our Services</Link></li>
                        <li><Link href="/#about" className="hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link href="/services" className="hover:text-primary transition-colors">Pricing Plans</Link></li>
                        <li><Link href="/#reviews" className="hover:text-primary transition-colors">Reviews</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-8">Operating Hours</h4>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li className="flex justify-between">
                            <span>Mon-Sat:</span>
                            <span className="text-white font-medium">8:00 AM - 8:00 PM</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Sunday:</span>
                            <span className="text-white font-medium">9:00 AM - 5:00 PM</span>
                        </li>
                        <li className="mt-8">
                            <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                                <p className="text-primary text-xs font-bold uppercase tracking-widest text-center">Open Today</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-8">Contact Info</h4>
                    <ul className="space-y-6 text-gray-400 text-sm">
                        <li className="flex gap-4">
                            <MapPin className="text-primary w-5 h-5 shrink-0" />
                            <span>307/24 Basappa peth, <br />Opp. To Yashwant Hospital, <br />Karanje Peth, Satara</span>
                        </li>
                        <li className="flex gap-4">
                            <Phone className="text-primary w-5 h-5 shrink-0" />
                            <span>+91 7058623593 <br />+91 7058943593</span>
                        </li>
                        <li className="flex gap-4">
                            <Mail className="text-primary w-5 h-5 shrink-0" />
                            <span>carstyle3131@gmail.com</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-primary text-lg font-bold shrink-0">🌐</span>
                            <span>www.carstyle.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 pt-12 border-t border-white/5 text-center text-gray-500 text-xs">
                <p>© 2026 CAR STYLE Detailer Studio. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
