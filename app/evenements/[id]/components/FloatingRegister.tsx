"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuTicket } from "react-icons/lu";
import RegistrationDialog from "./RegistrationDialog";

interface FloatingRegisterProps {
  weezeventCode?: string;
  eventTitle: string;
  highlightColor: string;
}

const FloatingRegister: React.FC<FloatingRegisterProps> = ({
  weezeventCode,
  eventTitle,
  highlightColor,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!weezeventCode) return null;

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-200 p-4 md:bottom-8 md:left-auto md:right-8 md:p-0"
          >
            {/* Desktop: Round Floating Button */}
            <button
              onClick={() => setIsDialogOpen(true)}
              className="hidden md:flex items-center gap-3 px-8 py-4 rounded-full font-rajdhani font-bold text-gray-950 uppercase tracking-widest text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(0,0,0,0.3)] group overflow-hidden isolate cursor-pointer"
              style={{
                backgroundColor: highlightColor,
                boxShadow: `0 10px 30px -10px ${highlightColor}cc`,
              }}
            >
              <LuTicket className="w-6 h-6" />
              S'inscrire
              {/* Shine Effect Container */}
              <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-all duration-1000 skew-x-[-20deg] opacity-0 group-hover:opacity-100" />
              </div>
            </button>

            {/* Mobile: Full Width Fixed Bar */}
            <button
              onClick={() => setIsDialogOpen(true)}
              className="flex md:hidden w-full items-center justify-center gap-3 py-4 rounded-xl font-rajdhani font-bold text-gray-950 uppercase tracking-widest text-base shadow-2xl active:scale-[0.98] transition-transform cursor-pointer"
              style={{ backgroundColor: highlightColor }}
            >
              <LuTicket className="w-5 h-5" />
              S'inscrire à l'événement
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <RegistrationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        weezeventCode={weezeventCode}
        title={eventTitle}
      />
    </>
  );
};

export default FloatingRegister;
