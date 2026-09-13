"use client";
import { useI18n } from "@/lib/i18n";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";

export default function ServicesHeader() {
  const { t } = useI18n();
  return (
    <div className="max-w-3xl mb-16">
      <h1 className="text-4xl md:text-5xl font-dm-serif text-black mb-6 leading-tight">
        {t("services.heading1")} <br />
        <span className="text-primary italic">{t("services.heading2")}</span>
      </h1>
      <p className="text-lg text-gray-600 font-space border-l-4 border-primary/20 pl-6">
        {t("services.descLong")}
      </p>
    </div>
  );
}

export function ServicesCTA() {
  const { t } = useI18n();
  return (
    <div className="bg-black rounded-3xl p-12 text-center text-white relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <h2 className="text-3xl md:text-4xl font-dm-serif mb-6 relative z-10">{t("services.ctaTitle")}</h2>
      <p className="text-gray-400 mb-10 max-w-xl mx-auto font-space relative z-10">{t("services.ctaDesc")}</p>
      <Link href="/booking" className="bg-primary hover:bg-white hover:text-black text-white px-10 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-xl shadow-primary/30 relative z-10 inline-block">
        {t("services.ctaButton")}
      </Link>
    </div>
  );
}
