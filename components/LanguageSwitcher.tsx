"use client";
import { useI18n, Locale } from "@/lib/i18n";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { Languages, Check } from "lucide-react";

const options: { code: Locale; label: string; deva: string }[] = [
  { code: "en", label: "EN", deva: "English" },
  { code: "mr", label: "मराठी", deva: "मराठी" },
  { code: "hi", label: "हिन्दी", deva: "हिन्दी" },
];

export default function LanguageSwitcher({ variant = "navbar" }: { variant?: "navbar" | "footer" }) {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  if (variant === "footer") {
    return (
      <div className="flex gap-2">
        {options.map((o) => (
          <button
            key={o.code}
            onClick={() => setLocale(o.code)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
              locale === o.code ? "bg-primary text-white border-primary" : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 md:gap-2 border border-black/10 bg-white hover:bg-gray-50 text-gray-700 px-2.5 md:px-3 py-1.5 md:py-2 rounded-full text-xs font-bold transition-colors"
        aria-label="Change language"
      >
        <Languages className="w-3.5 h-3.5 text-primary hidden sm:block" />
        <span className="hidden sm:inline text-[11px] tracking-wide">
          {options.find((o) => o.code === locale)?.label}
        </span>
        <span className="sm:hidden">{options.find((o) => o.code === locale)?.label}</span>
        <span className={`text-[10px] transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-black/5 overflow-hidden z-50"
          >
            {options.map((o) => (
              <button
                key={o.code}
                onClick={() => {
                  setLocale(o.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold hover:bg-gray-50 transition-colors ${
                  locale === o.code ? "bg-primary/5 text-primary" : "text-gray-700"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{o.label}</span>
                  {o.deva}
                </span>
                {locale === o.code && <Check className="w-4 h-4" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
