import React from "react";

const TopInfoBar = () => {
    return (
        <div className="hidden lg:flex justify-between items-center px-8 py-2 text-xs text-gray-500 border-b border-black/5 bg-gray-50">
            <div className="flex gap-6">
                <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">📞</span> +91 7058623593 / +91 7058943593
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">📍</span> 307/24 Basappa peth, Opp. To Yashwant Hospital, Karanje Peth, Satara
                </div>
            </div>
            <div className="flex gap-4">
                Mon-Sat: 9AM-6PM | Sun: 9AM-6PM
            </div>
        </div>
    );
};

export default TopInfoBar;
