"use client";
import Link from "next/link";
import { useI18n, toLocalDigits } from "@/lib/i18n";

export default function SEOContent() {
  const { t, locale } = useI18n();
  return (
    <section className="py-16 bg-gray-50 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-dm-serif text-gray-900 mb-6">
            {t("seo.title")}
          </h2>
          <div className="prose prose-sm md:prose-base text-gray-600 leading-relaxed space-y-4">
            <p>{t("seo.p1")}</p>
            <p>{t("seo.p2")}</p>
            <p>
              {t("seo.p3")} <a href="tel:+917058623593" className="text-primary font-bold hover:underline">{locale === "en" ? "+91 7058623593" : `+९१ ${toLocalDigits("7058623593", locale)}`}</a>
            </p>
          </div>

          {/* Keyword cluster for local SEO - natural */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              "car washing center in Satara",
              "car detailing center in Satara",
              "best car washing shop Satara",
              "car wash Karanje Peth",
              "ceramic coating Satara",
              "PPF Satara",
              "car cleaning Satara",
            ].map((k) => (
              <Link
                key={k}
                href="/services"
                className="text-[11px] font-semibold tracking-wide uppercase bg-white border border-black/5 px-3 py-1.5 rounded-full text-gray-500 hover:text-primary hover:border-primary/20 transition-colors"
              >
                {k}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
