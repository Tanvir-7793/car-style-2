import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy",
  description: "Cancellation and Refund Policy for CAR STYLE Premium Detailing Studio, Satara.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-8">
          ← Back to Home
        </Link>
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-black/5 shadow-sm">
          <h1 className="text-3xl md:text-4xl font-dm-serif text-gray-900 mb-2">Cancellation & Refund Policy</h1>
          <p className="text-sm text-gray-400 mb-8">Last updated: September 13, 2026 — CAR STYLE, Satara</p>

          <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-6">
            <p>
              We aim for 100% satisfaction. Please read how cancellations, rescheduling, and refunds work (currently all
              bookings are <strong>Pay at Studio — no advance payment</strong>).
            </p>

            <h2 className="text-lg font-bold text-gray-900">1. No Advance Payment (Current)</h2>
            <p>
              You pay after service completion at the studio (cash/UPI/card). If you cannot come, simply inform us at least{" "}
              <strong>4 hours</strong> before your slot via call/WhatsApp to +91 7058623593 — no charges.
            </p>

            <h2 className="text-lg font-bold text-gray-900">2. When Advance Payment Is Enabled (Future)</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Cancel &gt;24h before slot:</strong> 100% refund to original method within 5-7 working days.</li>
              <li><strong>Cancel 4-24h before:</strong> 50% refund or free reschedule to next available slot.</li>
              <li><strong>Cancel &lt;4h or no-show:</strong> No refund (slot is reserved & staff allocated).</li>
              <li><strong>Reschedule:</strong> Up to 1 free reschedule if requested &gt;4h before.</li>
            </ul>

            <h2 className="text-lg font-bold text-gray-900">3. Service Issues</h2>
            <p>
              If you are not satisfied, notify us within <strong>24 hours</strong> with photos. We will re-do the affected
              area free of cost or offer a partial credit. Ceramic/PPF carries manufacturer warranty — terms shared at delivery.
            </p>

            <h2 className="text-lg font-bold text-gray-900">4. How to Request</h2>
            <p>
              Call <a href="tel:+917058623593" className="text-primary hover:underline">+91 7058623593</a> /{" "}
              <a href="tel:+917058943593" className="text-primary hover:underline">+91 7058943593</a> or email{" "}
              <a href="mailto:carstyle3131@gmail.com" className="text-primary hover:underline">carstyle3131@gmail.com</a> with
              name, phone, and date. We respond within 24 hours.
            </p>

            <h2 className="text-lg font-bold text-gray-900">5. No-Show & Late Policy</h2>
            <p>Arrival &gt;30 min late may be treated as no-show and require rescheduling. Repeated no-shows may be blocked from online booking.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
