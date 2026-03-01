"use client";
import React, { useState } from "react";
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
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        subject: "Service Inquiry",
        message: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        phone: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [submittedData, setSubmittedData] = useState({
        name: "",
        phone: "",
        subject: "Service Inquiry"
    });

    const validatePhone = (phone: string) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {
            name: "",
            phone: ""
        };

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Mobile number is required";
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = "Mobile number must be exactly 10 digits";
        }

        setErrors(newErrors);
        return !newErrors.name && !newErrors.phone;
    };

    const handleSubmit = async () => {
        setSubmitMessage(null);
        setSubmitError(null);

        if (!validateForm()) {
            setSubmitError("Please fix the validation errors below.");
            return;
        }

        if (!formData.subject || !formData.message) {
            setSubmitError("Please fill all required fields (subject and message).");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.message || "Failed to send message.");
            }

            setSubmitMessage("Thank you! Your message has been sent. We will contact you soon.");
            setSubmittedData({
                name: formData.name,
                phone: formData.phone,
                subject: formData.subject
            });
            setShowSuccessModal(true);
            setFormData({
                name: "",
                phone: "",
                subject: "Service Inquiry",
                message: "",
            });
        } catch (err: any) {
            setSubmitError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20 font-space relative">
            {/* 1. Powerful Heading Section */}
            <section className="max-w-7xl mx-auto px-6 md:px-8 mb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                        Get In Touch
                    </span>
                    <h1 className="text-5xl md:text-7xl font-dm-serif text-gray-900 mb-6">
                        We’re Here to Make Your <br />
                        <span className="text-primary italic">Car Shine</span>
                    </h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        Have questions or want to book directly? Our team is ready to help you with
                        professional advice and premium detailing services.
                    </p>
                </motion.div>
            </section>

            <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Side: Contact Info & Action Buttons */}
                <div className="lg:col-span-5 space-y-12">

                    {/* 2. Contact Information Section */}
                    <section className="bg-white rounded-3xl p-8 md:p-10 border border-black/5 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>

                        <div className="space-y-8">
                            <div className="flex gap-5 group">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                                    <MapPin className="text-primary w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Visit Our Studio</p>
                                    <p className="text-gray-800 font-semibold leading-relaxed">
                                        307/24 Basappa peth, Opp. Yashwant Hospital, <br />
                                        Karanje Peth, Satara, Maharashtra 415001
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-5 group">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                                    <Phone className="text-primary w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Call Us Anywhere</p>
                                    <p className="text-gray-800 font-bold text-xl">+91 7058623593</p>
                                    <p className="text-gray-500 text-sm">+91 7058943593</p>
                                </div>
                            </div>

                            <div className="flex gap-5 group">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                                    <Mail className="text-primary w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Email Address</p>
                                    <p className="text-gray-800 font-semibold">carstyle3131@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex gap-5 group">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                                    <Clock className="text-primary w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Working Hours</p>
                                    <p className="text-gray-800 font-semibold">Mon – Sat: 8:00 AM – 8:00 PM</p>
                                    <p className="text-gray-800 font-semibold">Sunday: 9:00 AM – 5:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 5. Quick Action Buttons */}
                    <section className="space-y-4">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] px-2 mb-4">Quick Actions</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <a
                                href="tel:+917058623593"
                                className="flex items-center justify-center gap-3 bg-black text-white py-5 rounded-2xl font-bold hover:bg-primary transition-all shadow-xl active:scale-95"
                            >
                                <Phone className="w-5 h-5" /> Call Now
                            </a>
                            <a
                                href="https://wa.me/917058623593"
                                className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-5 rounded-2xl font-bold hover:bg-[#20ba59] transition-all shadow-xl active:scale-95"
                            >
                                <MessageCircle className="w-5 h-5" /> WhatsApp
                            </a>
                            <Link
                                href="/booking"
                                className="sm:col-span-2 flex items-center justify-center gap-3 border-2 border-primary text-primary py-5 rounded-2xl font-bold hover:bg-primary hover:text-white transition-all shadow-lg active:scale-95"
                            >
                                <Calendar className="w-5 h-5" /> Book Your Service
                            </Link>
                        </div>
                    </section>
                </div>

                {/* Right Side: Map & Form */}
                <div className="lg:col-span-7 space-y-12">

                    {/* 3. Google Map Section */}
                    <section className="bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm">
                        <div className="h-[400px] relative group">
                            <iframe
                                src="https://maps.google.com/maps?q=17.693748,73.995262&t=&z=17&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                className="grayscale group-hover:grayscale-0 transition-all duration-500 opacity-90 group-hover:opacity-100"
                            ></iframe>
                            <div className="absolute bottom-6 left-6 right-6">
                                <a
                                    href="https://www.google.com/maps/dir/?api=1&destination=307/24+Basappa+peth,+Opp.+Yashwant+Hospital,+Karanje+Peth,+Satara,+Maharashtra+415001"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold shadow-2xl hover:bg-primary hover:text-white transition-all group"
                                >
                                    Get Directions
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* 4. Contact Form Section */}
                    <section className="bg-white rounded-3xl p-8 md:p-10 border border-black/5 shadow-sm">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                            <p className="text-gray-500 text-sm">We reply within 10 minutes during working hours.</p>
                        </div>

                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                        className={`w-full bg-gray-50 border rounded-xl px-4 py-4 text-gray-900 font-semibold focus:ring-2 focus:ring-primary/20 outline-none ${
                                            errors.name ? "border-red-500" : "border-black/5"
                                        }`}
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs font-semibold mt-1">{errors.name}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter 10 digit mobile number"
                                        maxLength={10}
                                        className={`w-full bg-gray-50 border rounded-xl px-4 py-4 text-gray-900 font-semibold focus:ring-2 focus:ring-primary/20 outline-none ${
                                            errors.phone ? "border-red-500" : "border-black/5"
                                        }`}
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-xs font-semibold mt-1">{errors.phone}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Subject</label>
                                <select
                                    name="subject"
                                    className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-4 text-gray-900 font-semibold focus:ring-2 focus:ring-primary/20 outline-none appearance-none"
                                    value={formData.subject}
                                    onChange={handleChange}
                                >
                                    <option value="Service Inquiry">Service Inquiry</option>
                                    <option value="Standard/Premium Booking">Standard/Premium Booking</option>
                                    <option value="Complaint">Complaint</option>
                                    <option value="Feedback">Feedback</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Message</label>
                                <textarea
                                    rows={4}
                                    name="message"
                                    placeholder="How can we help you?"
                                    className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-4 text-gray-900 font-semibold focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="button"
                                disabled={isSubmitting}
                                onClick={handleSubmit}
                                className={`w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:bg-blue-600 transition-all flex items-center justify-center gap-3 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                    }`}
                            >
                                {isSubmitting ? "Sending..." : "Request a Callback"}
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>

                            {submitMessage && !showSuccessModal && (
                                <p className="text-green-500 text-xs font-semibold text-center mt-3">
                                    {submitMessage}
                                </p>
                            )}
                            {submitError && (
                                <p className="text-red-500 text-xs font-semibold text-center mt-3">
                                    {submitError}
                                </p>
                            )}
                        </form>

                        {/* 6. Trust Section inside Form Card */}
                        <div className="mt-12 pt-8 border-t border-black/5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div>
                                <p className="text-2xl font-bold text-gray-900">500+</p>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Happy Customers</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">5-Star</p>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Rated Service</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">Pro</p>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Equipment</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">Expert</p>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Detailers</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Additional Trust Section / Stats Bar */}
            <section className="max-w-7xl mx-auto px-6 md:px-8 mt-20">
                <div className="bg-black text-white rounded-[2.5rem] p-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none"></div>

                    <div className="space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto">
                            <Star className="text-primary w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold">Premium Quality</h3>
                        <p className="text-gray-400 text-sm">We use only high-end products for the best possible results.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto">
                            <Shield className="text-primary w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold">Secure Care</h3>
                        <p className="text-gray-400 text-sm">Your vehicle is handled with extreme care and fully insured.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto">
                            <Users className="text-primary w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold">12+ Years Exp</h3>
                        <p className="text-gray-400 text-sm">Over a decade of experience in premium automotive detailing.</p>
                    </div>
                </div>
            </section>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccessModal && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ y: 40, opacity: 0, scale: 0.96 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-black/5 p-8 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-blue-100/40" />

                            <div className="relative space-y-4 text-center">
                                <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                                    <CheckCircle2 className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-2xl font-dm-serif text-gray-900">
                                    Message Sent!
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Thank you, {submittedData.name || "Guest"}! Your message has been received.
                                    Our team will get back to you shortly on your provided phone number.
                                </p>

                                <div className="mt-4 text-xs text-gray-400 uppercase tracking-[0.2em]">
                                    Contact Details
                                </div>
                                <div className="mt-2 rounded-2xl bg-gray-50 border border-black/5 p-4 text-left text-xs space-y-1">
                                    <p className="flex justify-between">
                                        <span className="text-gray-500">Name</span>
                                        <span className="font-semibold text-gray-900">{submittedData.name || "Not set"}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="text-gray-500">Phone</span>
                                        <span className="font-semibold text-gray-900">{submittedData.phone || "Not set"}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="text-gray-500">Subject</span>
                                        <span className="font-semibold text-gray-900">{submittedData.subject}</span>
                                    </p>
                                </div>

                                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={() => setShowSuccessModal(false)}
                                        className="w-full bg-black text-white py-3 rounded-xl text-sm font-bold hover:bg-primary transition-colors"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={() => setShowSuccessModal(false)}
                                        className="w-full border border-black/10 py-3 rounded-xl text-sm font-bold text-gray-800 hover:bg-gray-50 flex items-center justify-center"
                                    >
                                        Stay on Page
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ContactPage;
