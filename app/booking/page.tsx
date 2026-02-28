"use client";
import React, { useState, useMemo } from "react";
import {
    Calendar as CalendarIcon,
    Clock,
    Car,
    User,
    Phone,
    Mail,
    MapPin,
    ChevronRight,
    CheckCircle2,
    CreditCard,
    Wallet,
    Info,
    ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";

// Service Data
const services = [
    { id: "std-wash", name: "Standard Wash", price: 450, category: "Washing" },
    { id: "dlx-wash", name: "Deluxe Wash", price: 800, category: "Washing" },
    { id: "prm-wash", name: "Premium Wash", price: 2500, category: "Washing" },
    { id: "lux-wash", name: "Luxury Wash", price: 7000, category: "Washing" },
    { id: "prm-polish", name: "Premium Polish", price: 3500, category: "Detailing" },
    { id: "int-detail", name: "Interior Detailing", price: 2000, category: "Detailing" },
    { id: "ceramic", name: "Ceramic Coating", price: 15000, category: "Protection" },
    { id: "ppf", name: "Paint Protection Film (PPF)", price: 45000, category: "Protection" },
];

const carSizes = [
    { id: "small", name: "Small Car", multiplier: 1, desc: "Hatchbacks" },
    { id: "medium", name: "Medium Car", multiplier: 1.2, desc: "Sedans / Compact SUVs" },
    { id: "large", name: "Large Car", multiplier: 1.5, desc: "SUVs / Luxury Sedans" },
];

const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
];

const BookingPage = () => {
    // Form State
    const [selectedService, setSelectedService] = useState(services[0]);
    const [selectedSize, setSelectedSize] = useState(carSizes[0]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("pay-at-location");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        city: "Satara",
        vehicleModel: "",
        vehicleNumber: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Calculations
    const basePrice = selectedService.price;
    const sizeSurge = selectedSize.multiplier > 1 ? (basePrice * (selectedSize.multiplier - 1)) : 0;
    const subtotal = basePrice + sizeSurge;
    const discount = 0; // Can implement promo logic
    const finalAmount = subtotal - discount;

    const handleBookingSubmit = async () => {
        setSubmitMessage(null);
        setSubmitError(null);

        if (!formData.name || !formData.phone || !formData.vehicleModel || !selectedDate || !selectedTime) {
            setSubmitError("Please fill all required fields (name, phone, vehicle, date & time).");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    city: formData.city,
                    vehicleModel: formData.vehicleModel,
                    vehicleNumber: formData.vehicleNumber,
                    selectedService,
                    selectedSize,
                    pricing: {
                        basePrice,
                        subtotal,
                        discount,
                        finalAmount,
                    },
                    date: selectedDate,
                    timeSlot: selectedTime,
                    paymentMethod,
                }),
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.message || "Failed to save booking.");
            }

            setSubmitMessage("Your booking has been saved successfully! We will contact you shortly.");
            setShowSuccessModal(true);
        } catch (err: any) {
            setSubmitError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20 font-space relative">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm font-bold mb-6 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-dm-serif text-gray-900 mb-4">Book Your <span className="text-primary italic">Service</span></h1>
                    <p className="text-gray-500 max-w-xl">Complete the form below to schedule your premium car care session.<span className="text-primary font-bold">No advance payment required.</span> Secure your slot now and our team will contact you shortly.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Left: Form Sections */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* 1. Service Selection */}
                        <section className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                                <h2 className="text-xl font-bold text-gray-900">Select Service & Vehicle</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Service</label>
                                    <select
                                        className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-4 text-gray-900 font-semibold focus:ring-2 focus:ring-primary/20 outline-none appearance-none"
                                        value={selectedService.id}
                                        onChange={(e) => setSelectedService(services.find(s => s.id === e.target.value) || services[0])}
                                    >
                                        {services.map(s => (
                                            <option key={s.id} value={s.id}>{s.name} (Starts at ₹{s.price})</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Vehicle Size</label>
                                    <div className="flex gap-2">
                                        {carSizes.map(size => (
                                            <button
                                                key={size.id}
                                                onClick={() => setSelectedSize(size)}
                                                className={`flex-1 py-3 px-2 rounded-xl text-[10px] font-bold uppercase transition-all border ${selectedSize.id === size.id
                                                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                                    : "bg-gray-50 text-gray-400 border-black/5 hover:border-black/20"
                                                    }`}
                                            >
                                                {size.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Vehicle Model</label>
                                    <input
                                        type="text"
                                        name="vehicleModel"
                                        placeholder="e.g. BMW X5 / Swift"
                                        className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-4 text-gray-900 font-semibold focus:ring-2 focus:ring-primary/20 outline-none"
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Vehicle Number (Optional)</label>
                                    <input
                                        type="text"
                                        name="vehicleNumber"
                                        placeholder="e.g. MH 11 AB 1234"
                                        className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-4 text-gray-900 font-semibold focus:ring-2 focus:ring-primary/20 outline-none"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* 2. Date & Time */}
                        <section className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
                                <h2 className="text-xl font-bold text-gray-900">Preferred Date & Time</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Select Date</label>
                                    <input
                                        type="date"
                                        className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-4 text-gray-900 font-semibold outline-none"
                                        min={new Date().toISOString().split('T')[0]}
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Select Time Slot</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {timeSlots.map(time => (
                                            <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`py-2.5 rounded-lg text-[10px] font-bold transition-all border ${selectedTime === time
                                                    ? "bg-black text-white border-black"
                                                    : "bg-gray-50 text-gray-500 border-black/5 hover:border-black/20"
                                                    }`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 3. Personal Details */}
                        <section className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
                                <h2 className="text-xl font-bold text-gray-900">Your Contact Details</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter your name"
                                            className="w-full bg-gray-50 border border-black/5 rounded-xl pl-12 pr-4 py-4 text-gray-900 font-semibold outline-none focus:ring-2 focus:ring-primary/20"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Mobile Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="+91 00000 00000"
                                            className="w-full bg-gray-50 border border-black/5 rounded-xl pl-12 pr-4 py-4 text-gray-900 font-semibold outline-none focus:ring-2 focus:ring-primary/20"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="your@email.com"
                                            className="w-full bg-gray-50 border border-black/5 rounded-xl pl-12 pr-4 py-4 text-gray-900 font-semibold outline-none focus:ring-2 focus:ring-primary/20"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">City</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            name="city"
                                            defaultValue="Satara"
                                            className="w-full bg-gray-50 border border-black/5 rounded-xl pl-12 pr-4 py-4 text-gray-900 font-semibold outline-none focus:ring-2 focus:ring-primary/20"
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 4. Payment Option */}
                        <section className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">4</div>
                                <h2 className="text-xl font-bold text-gray-900">Payment Option</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => setPaymentMethod("pay-at-location")}
                                    className={`p-6 rounded-2xl border flex items-center justify-between text-left transition-all ${paymentMethod === 'pay-at-location'
                                        ? "border-primary bg-primary/5 shadow-lg"
                                        : "border-black/5 bg-gray-50"
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${paymentMethod === 'pay-at-location' ? 'bg-primary text-white' : 'bg-white text-gray-400 border border-black/5'}`}>
                                            <Wallet className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Pay at Studio</p>
                                            <p className="text-xs text-gray-500">Pay after your service is done</p>
                                        </div>
                                    </div>
                                    {paymentMethod === 'pay-at-location' && <CheckCircle2 className="text-primary w-5 h-5" />}
                                </button>

                                <button
                                    onClick={() => setPaymentMethod("advance-booking")}
                                    className={`p-6 rounded-2xl border flex items-center justify-between text-left transition-all opacity-60 cursor-not-allowed ${paymentMethod === 'advance-booking'
                                        ? "border-primary bg-primary/5"
                                        : "border-black/5 bg-gray-50"
                                        }`}
                                    disabled
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl bg-white text-gray-400 border border-black/5`}>
                                            <CreditCard className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Advance Online</p>
                                            <p className="text-xs text-gray-400 italic">Coming Soon</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* Right: Booking Summary (Sticky) */}
                    <div className="lg:sticky lg:top-32 h-fit">
                        <section className="bg-[#0b0b0b] text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[80px]"></div>

                            <h2 className="text-2xl font-dm-serif mb-8 flex items-center gap-3">
                                <Info className="w-5 h-5 text-primary" />
                                Booking Summary
                            </h2>

                            <div className="space-y-6">
                                <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3">Service Details</p>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-300">{selectedService.name}</span>
                                        <span className="font-bold">₹{basePrice}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-sm text-gray-300">{selectedSize.name} ({selectedSize.desc})</span>
                                        <span className="font-bold">₹{sizeSurge}</span>
                                    </div>
                                    <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                                        <span className="text-sm font-bold text-primary">Subtotal</span>
                                        <span className="text-lg font-bold">₹{subtotal}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group transition-colors">
                                            <CalendarIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Date</p>
                                            <p className="text-sm font-semibold">{selectedDate || "Not selected"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Time Slot</p>
                                            <p className="text-sm font-semibold">{selectedTime || "Not selected"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary">
                                            <Car className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Vehicle</p>
                                            <p className="text-sm font-semibold">{formData.vehicleModel || "e.g. BMW X5"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/10 space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Discount applied</span>
                                        <span className="text-green-500 font-bold">- ₹{discount}</span>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Total Payable</p>
                                            <p className="text-3xl font-bold text-white">₹{finalAmount}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="px-2 py-1 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase">Estimated</span>
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                    disabled={isSubmitting}
                                    onClick={handleBookingSubmit}
                                    className={`w-full bg-primary hover:bg-blue-600 text-white py-5 rounded-2xl font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-3 transition-colors text-lg ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {isSubmitting ? "Saving Booking..." : "Confirm My Booking"}
                                    {!isSubmitting && <ChevronRight className="w-5 h-5" />}
                                </motion.button>

                                {submitMessage && !showSuccessModal && (
                                    <p className="text-green-400 text-xs font-semibold text-center">
                                        {submitMessage}
                                    </p>
                                )}
                                {submitError && (
                                    <p className="text-red-400 text-xs font-semibold text-center">
                                        {submitError}
                                    </p>
                                )}

                                <p className="text-center text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-4">
                                    Secure Booking • No Hidden Charges
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

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
                                    Booking Confirmed!
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Thank you, {formData.name || "Guest"}! Your booking has been received.
                                    Our team will call you shortly to confirm the exact time and details.
                                </p>

                                <div className="mt-4 text-xs text-gray-400 uppercase tracking-[0.2em]">
                                    Booking Summary
                                </div>
                                <div className="mt-2 rounded-2xl bg-gray-50 border border-black/5 p-4 text-left text-xs space-y-1">
                                    <p className="flex justify-between">
                                        <span className="text-gray-500">Service</span>
                                        <span className="font-semibold text-gray-900">{selectedService.name}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="text-gray-500">Vehicle</span>
                                        <span className="font-semibold text-gray-900">{formData.vehicleModel || "N/A"}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="text-gray-500">Date & Time</span>
                                        <span className="font-semibold text-gray-900">
                                            {selectedDate || "Not set"} • {selectedTime || "Not set"}
                                        </span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="text-gray-500">Est. Amount</span>
                                        <span className="font-semibold text-gray-900">₹{finalAmount}</span>
                                    </p>
                                </div>

                                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={() => setShowSuccessModal(false)}
                                        className="w-full bg-black text-white py-3 rounded-xl text-sm font-bold hover:bg-primary transition-colors"
                                    >
                                        Close
                                    </button>
                                    <Link
                                        href="/"
                                        className="w-full border border-black/10 py-3 rounded-xl text-sm font-bold text-gray-800 hover:bg-gray-50 flex items-center justify-center"
                                        onClick={() => setShowSuccessModal(false)}
                                    >
                                        Back to Home
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BookingPage;
