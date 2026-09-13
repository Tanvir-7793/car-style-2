"use client";
import React from "react";
import { useI18n } from "@/lib/i18n";

const TopInfoBar = () => {
    const { t } = useI18n();
    return (
        <div className="flex justify-between items-center px-4 lg:px-8 py-2 text-[11px] lg:text-xs text-gray-500 border-b border-black/5 bg-gray-50 overflow-hidden">
            <div className="flex gap-4 lg:gap-6 overflow-x-auto whitespace-nowrap scrollbar-none">
                <a href="tel:+917058623593" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <span className="text-primary font-bold">📞</span> +91 7058623593 / +91 7058943593
                </a>
                <span className="hidden sm:flex items-center gap-2">
                    <span className="text-primary font-bold">📍</span> 307/24 Basappa peth, Opp. Yashwant Hospital, Karanje Peth, Satara
                </span>
            </div>
            <div className="hidden lg:flex gap-4 whitespace-nowrap">
                {t("top.hours")}
            </div>
            <div className="lg:hidden whitespace-nowrap ml-3 text-primary font-bold">
                {t("top.hoursMobile")}
            </div>
        </div>
    );
};

export default TopInfoBar;
