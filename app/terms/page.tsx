import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms & Conditions for CAR STYLE Premium Detailing Studio, Satara.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-8">
          ← Back to Home
        </Link>
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-black/5 shadow-sm">
          <h1 className="text-3xl md:text-4xl font-dm-serif text-gray-900 mb-2">Terms & Conditions</h1>
          <p className="text-sm text-gray-400 mb-8">Last updated: September 13, 2026 — CAR STYLE, Satara</p>

          <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-6">
            <p>By booking or using services at CAR STYLE you agree to these terms.</p>

            <h2 className="text-lg font-bold text-gray-900">1. Services & Pricing</h2>
            <p>
              All prices listed (Standard ₹450+, Deluxe ₹600+, Premium ₹2500+) are estimates. Final price may vary based on
              vehicle condition, size, and add-ons. We will confirm final amount before starting work. “Pay at Studio” is the
              current payment mode; advance online payment will be notified when enabled.
            </p>

            <h2 className="text-lg font-bold text-gray-900">2. Booking & Confirmation</h2>
            <p>
              Submitting a booking does not guarantee a slot. Our team will call/WhatsApp to confirm date & time. Please arrive
              10 minutes early. Late arrival may require rescheduling.
            </p>

            <h2 className="text-lg font-bold text-gray-900">3. Vehicle Care & Liability</h2>
            <p>
              We handle every vehicle with utmost care using professional products and trained detailers. Pre-existing damage,
              rust, or fragile trims must be disclosed at drop-off. We are not liable for undisclosed prior defects. Vehicles are
              insured while on premises for fire/theft; valuables must be removed by the owner.
            </p>

            <h2 className="text-lg font-bold text-gray-900">4. Conduct</h2>
            <p>Abuse, spam, or false bookings via the website may be blocked and reported. Bot/spam protection (rate limiting & honeypot) is active.</p>

            <h2 className="text-lg font-bold text-gray-900">5. Intellectual Property</h2>
            <p>All images, videos, and content on this site belong to CAR STYLE. Do not reuse without permission.</p>

            <h2 className="text-lg font-bold text-gray-900">6. Governing Law</h2>
            <p>These terms are governed by laws of India, with jurisdiction at Satara, Maharashtra.</p>

            <h2 className="text-lg font-bold text-gray-900">7. Contact</h2>
            <p>
              CAR STYLE — 307/24 Basappa peth, Opp. Yashwant Hospital, Karanje Peth, Satara 415001 —{" "}
              <a href="tel:+917058623593" className="text-primary hover:underline">+91 7058623593</a> —{" "}
              <a href="mailto:carstyle3131@gmail.com" className="text-primary hover:underline">carstyle3131@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
