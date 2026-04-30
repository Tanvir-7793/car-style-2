"use client";

import { Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export default function FloatingCallButton() {
  const phoneNumber = "7058623593";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="hidden md:block bg-black/80 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-xl"
          >
            Call Now: {phoneNumber}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={`tel:${phoneNumber}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 cursor-pointer overflow-visible"
        aria-label="Call Us"
      >
        {/* Pulsing rings */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-primary"
        />
        <motion.div
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-primary"
        />

        {/* Main Icon */}
        <div className="relative z-10">
          <motion.div
            animate={{
              rotate: [0, -10, 10, -10, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <Phone size={20} fill="currentColor" />
          </motion.div>
        </div>
      </motion.a>
    </div>
  );
}
