import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for CAR STYLE Premium Detailing Studio - How we handle your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-8">
          ← Back to Home
        </Link>
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-black/5 shadow-sm">
          <h1 className="text-3xl md:text-4xl font-dm-serif text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mb-8">Last updated: September 13, 2026 — CAR STYLE, Satara</p>

          <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-6">
            <p>
              At <strong>CAR STYLE Premium Detailing Studio</strong> (“we”, “us”), we respect your privacy. This policy
              explains what data we collect when you use our booking form, contact form, or visit our studio at
              307/24 Basappa peth, Karanje Peth, Satara, and how we use it.
            </p>

            <h2 className="text-lg font-bold text-gray-900">1. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contact details:</strong> name, phone, email, city, vehicle model/number you provide via booking/contact forms.</li>
              <li><strong>Booking details:</strong> selected service, car size, date, time slot, payment preference.</li>
              <li><strong>Technical data:</strong> IP address, device/browser, pages viewed (via Vercel Analytics).</li>
            </ul>

            <h2 className="text-lg font-bold text-gray-900">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To confirm bookings and contact you about your service (call/WhatsApp).</li>
              <li>To improve our services and website experience.</li>
              <li>To comply with legal obligations. We never sell your data.</li>
            </ul>

            <h2 className="text-lg font-bold text-gray-900">3. Data Sharing</h2>
            <p>
              We share data only with service providers needed to run the site: <strong>MongoDB Atlas</strong> (database),
              <strong> Vercel</strong> (hosting/analytics), <strong>Cloudinary</strong> (gallery images). All are GDPR/DPDP compliant.
            </p>

            <h2 className="text-lg font-bold text-gray-900">4. Data Retention</h2>
            <p>Booking and contact records are retained for up to 24 months for service history, then deleted upon request.</p>

            <h2 className="text-lg font-bold text-gray-900">5. Your Rights (DPDP Act 2023, India)</h2>
            <p>
              You can request access, correction, or deletion of your personal data by emailing{" "}
              <a href="mailto:carstyle3131@gmail.com" className="text-primary hover:underline">carstyle3131@gmail.com</a> or
              calling +91 7058623593. We will respond within 7 days.
            </p>

            <h2 className="text-lg font-bold text-gray-900">6. Cookies</h2>
            <p>We use only essential cookies and anonymous analytics. No advertising cookies.</p>

            <h2 className="text-lg font-bold text-gray-900">7. Contact</h2>
            <p>
              Grievance Officer: Prasanna Jadhav — 307/24 Basappa peth, Opp. Yashwant Hospital, Karanje Peth, Satara 415001 —{" "}
              <a href="mailto:carstyle3131@gmail.com" className="text-primary hover:underline">carstyle3131@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
