"use client";
import React from "react";
import { Phone, MapPin, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const ContactCTA = () => {
    return (
        <section id="contact" className="py-24 bg-blue-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="bg-white rounded-3xl shadow-2xl border border-black/5 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Content Side */}
                        <div className="p-10 md:p-16 flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                                    Get in Touch
                                </span>
                                <h2 className="text-4xl md:text-5xl font-dm-serif mb-6 leading-tight text-gray-900">
                                    Have Questions? <br />
                                    <span className="text-primary italic">Talk to Our Experts</span>
                                </h2>
                                <p className="text-gray-500 text-lg mb-10 max-w-md leading-relaxed">
                                    Whether you need a simple wash or a full ceramic coating, our team is ready to assist you with the best care for your vehicle. Inquiry now for a custom quote.
                                </p>

                                <div className="space-y-8 mb-12">
                                    <div className="flex items-start gap-5 group">
                                        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-300">
                                            <Phone className="text-primary w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Emergency Inquiry</p>
                                            <p className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">+91 7058623593</p>
                                            <p className="text-sm text-gray-500 font-medium mt-0.5">+91 7058943593</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5 group">
                                        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors duration-300">
                                            <MapPin className="text-primary w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Visit Studio</p>
                                            <p className="text-base font-semibold text-gray-800 leading-relaxed max-w-[280px]">
                                                307/24 Basappa peth, Opp. To Yashwant Hospital, Karanje Peth, Satara
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <motion.a
                                        href="tel:+917058623593"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-xl font-bold text-base shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:bg-primary transition-all group"
                                    >
                                        Call Now for Inquiry
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </motion.a>

                                    <Link href="/services" className="inline-flex items-center justify-center gap-2 border border-black/10 px-8 py-4 rounded-xl font-bold text-base hover:bg-gray-50 transition-all">
                                        View All Services
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        {/* Map Side */}
                        <div className="h-[450px] lg:h-auto min-h-[500px] relative p-4 lg:p-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-inner border border-black/5 relative group"
                            >
                                <iframe
                                    src="https://maps.google.com/maps?q=17.693748,73.995262&t=&z=18&ie=UTF8&iwloc=&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1) brightness(0.95)' }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="absolute inset-0 w-full h-full"
                                ></iframe>
                                <div className="absolute inset-0 bg-primary/5 pointer-events-none group-hover:bg-transparent transition-colors duration-500"></div>

                                {/* Floating Label */}
                                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] text-primary font-bold uppercase tracking-wider mb-0.5">Studio Location</p>
                                        <p className="text-xs font-bold text-gray-900">Karanje Peth, Satara</p>
                                    </div>
                                    <a
                                        href="https://www.google.com/maps?q=17.693748,73.995262"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-black text-white p-2 rounded-lg hover:bg-primary transition-colors"
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

import Link from "next/link";

export default ContactCTA;
