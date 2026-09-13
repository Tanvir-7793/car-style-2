"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const faqs = [
  {
    q: "Which is the best car washing center in Satara?",
    a: "CAR STYLE Premium Detailing Studio at Karanje Peth is rated the best car washing center in Satara with 127+ 5-star reviews. We offer Standard Wash from ₹450, Deluxe, Premium washes and ceramic/PPF coating with eco-friendly products. Located at 307/24 Basappa peth, Opp. Yashwant Hospital, open daily 9AM-6PM. Call 7058623593.",
  },
  {
    q: "What services does your car detailing center in Satara offer?",
    a: "Our car detailing center in Satara offers Standard/Deluxe/Premium washes, Premium Polish, Interior Detailing, Paint Protection Film (PPF), Ceramic Coating, Graphene Coating, Glass Coating, Teflon Coating, and Headlight Restoration. All services are at our Karanje Peth studio.",
  },
  {
    q: "How much does car washing cost at your Satara shop?",
    a: "Car washing at our Satara shop starts at ₹450 for small cars (Standard Wash), ₹600 for Deluxe Wash, and ₹2500 for Premium Wash with tyre removal & chassis deep clean. Final price depends on car size - call 7058623593 for a quote.",
  },
  {
    q: "Where is your car washing shop in Satara located?",
    a: "CAR STYLE car washing shop is at 307/24 Basappa peth, Opp. To Yashwant Hospital, Karanje Peth, Satara - 415001, Maharashtra. Tap Get Directions on our website or search 'CAR STYLE Satara' on Google Maps. Open Mon-Sun 9AM-6PM.",
  },
  {
    q: "Do you offer ceramic coating and PPF in Satara?",
    a: "Yes, we are the leading ceramic coating and PPF center in Satara. We offer ceramic, graphene, glass coating and Paint Protection Film with self-healing, hydrophobic and UV protection. Book via our website or call 7058623593.",
  },
  {
    q: "How to book the best car wash in Satara near me?",
    a: "Book online at car-style-2.vercel.app/booking, call 7058623593 / 7058943593, or WhatsApp us. No advance payment - pay at studio after service. We confirm slot within 10 minutes during working hours.",
  },
];

export default function FAQSection() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  // FAQ JSON-LD for rich results - translated
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: t(f.q),
      acceptedAnswer: { "@type": "Answer", text: t(f.a) },
    })),
  };

  return (
    <section className="py-16 md:py-20 bg-white border-t border-black/5">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            {t("faq.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-dm-serif text-gray-900 mb-3">
            {t("faq.title")}
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Answers about our car washing shop & detailing center in Satara (Karanje Peth)
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="border border-black/5 rounded-2xl overflow-hidden bg-gray-50">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white transition-colors"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-gray-900 text-sm md:text-base pr-2">{t(f.q)}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-black/5 bg-white pt-4">{t(f.a)}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
