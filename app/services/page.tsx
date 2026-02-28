import React from "react";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import WashingServices from "@/components/WashingServices";
import PremiumServices from "@/components/PremiumServices";
import { dbConnect } from "@/lib/mongodb";
import Service from "@/models/Service";

const ServicesPage = async () => {
    await dbConnect();
    const docs = await Service.find().lean();

    // Fully serialize to remove ObjectId and other non-plain values
    const plainDocs = JSON.parse(JSON.stringify(docs)) as any[];

    const washing = plainDocs
        .filter((svc) => svc.type === "washing" || svc.type === "Washing")
        .map((svc) => {
            // Handle both old structure (pricing array) and new structure (single price)
            let pricing = [];
            if (svc.pricing && Array.isArray(svc.pricing) && svc.pricing.length > 0) {
                // Old structure: pricing array
                pricing = svc.pricing.map((p: any) => ({
                    size: p.size,
                    price: String(p.price || "0"),
                }));
            } else if (svc.price) {
                // New structure: single price field
                pricing = [
                    { size: "Standard", price: String(svc.price) },
                    { size: "Medium", price: String(parseInt(svc.price) * 1.2) },
                    { size: "Large", price: String(parseInt(svc.price) * 1.4) }
                ];
            } else {
                // Fallback pricing
                pricing = [
                    { size: "Small Cars", price: "450" },
                    { size: "Medium Cars", price: "550" },
                    { size: "Large Cars", price: "650" }
                ];
            }

            return {
                id: svc.slug || String(svc._id),
                title: svc.title || svc.name || "Unnamed Service",
                subtitle: svc.subtitle || svc.category || "Standard Service",
                description: svc.description,
                image: svc.image || "/car-washing-img1.jpg",
                pricing: pricing,
                features: svc.features || [],
            };
        });

    const premium = plainDocs
        .filter((svc) => svc.type === "premium")
        .map((svc) => ({
            title: svc.title,
            description: svc.description,
            image: svc.image,
            tag: svc.tag,
            features: svc.features || [],
        }));

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-primary selection:text-white pt-24 pb-20 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-blue-50 to-transparent -z-10" />
            <div className="absolute top-20 -right-20 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-40 -left-20 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary transition-colors mb-12 group"
                >
                    <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="max-w-3xl mb-16">
                    <h1 className="text-5xl md:text-6xl font-dm-serif text-black mb-6 leading-tight">
                        Our Professional <br />
                        <span className="text-primary italic">Detailing Services</span>
                    </h1>
                    <p className="text-lg text-gray-600 font-space border-l-4 border-primary/20 pl-6">
                        Experience automotive excellence with our comprehensive range of services.
                        Each treatment is meticulously designed to restore, protect, and enhance your vehicle's condition.
                    </p>
                </div>
            </div>

            {/* Render Components */}
            <div className="space-y-0">
                <WashingServices services={washing} />
                <PremiumServices view="full" services={premium} />
            </div>

            {/* Call to Action */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-24">
                <div className="bg-black rounded-3xl p-12 text-center text-white relative overflow-hidden group">
                    <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <h2 className="text-3xl md:text-4xl font-dm-serif mb-6 relative z-10">Ready to transform your vehicle?</h2>
                    <p className="text-gray-400 mb-10 max-w-xl mx-auto font-space relative z-10">
                        Book your appointment today and give your car the premium care it deserves.
                    </p>
                    <button className="bg-primary hover:bg-white hover:text-black text-white px-10 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-xl shadow-primary/30 relative z-10">
                        <Link href="/contact">Book Your Appointment</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
