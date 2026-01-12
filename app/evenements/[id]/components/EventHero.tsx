"use client";

import React from "react";
import Image from "next/image";
import { LuTrophy, LuCalendar } from "react-icons/lu";

interface EventHeroProps {
  title: string;
  type: "tournoi" | "event";
  categoryName: string;
  bannerImage: string;
  bannerImageMobile?: string;
  color: string;
}

const EventHero: React.FC<EventHeroProps> = ({
  title,
  type,
  categoryName,
  bannerImage,
  bannerImageMobile,
  color,
}) => {
  const TypeIcon = type === "tournoi" ? LuTrophy : LuCalendar;
  const highlightColor = color || "#d97706";

  return (
    <section className="relative w-full px-4 lg:px-0 h-[80svh] overflow-hidden">
      {/* Background Image Desktop */}
      <div className="hidden md:block absolute inset-0">
        <Image
          src={bannerImage}
          alt={title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Background Image Mobile */}
      <div className="md:hidden absolute inset-0">
        <Image
          src={bannerImageMobile || bannerImage}
          alt={title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `linear-gradient(to top, ${highlightColor}cc, ${highlightColor}33, transparent 70%)`,
        }}
      />

      {/* Content Container */}
      <div className="container mx-auto h-full relative z-20 flex items-end pb-12">
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* Left Side: Type and Title */}
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg backdrop-blur-md border border-white/20 bg-gray-950/40">
                <TypeIcon className="w-6 h-6 text-white" />
              </div>
              <span className="font-rajdhani font-bold text-white uppercase tracking-[0.2em] text-sm sm:text-base">
                {type === "tournoi" ? "Tournoi Officiel" : "Événement HGC"}
              </span>
            </div>
            <h1 className="font-rajdhani font-bold text-4xl sm:text-5xl md:text-6xl text-white uppercase leading-[0.9] drop-shadow-2xl">
              {title}
            </h1>
          </div>

          {/* Right Side: Category */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <span className="font-rajdhani text-white/60 uppercase tracking-widest text-xs font-bold">
              Catégorie
            </span>
            <div
              className="px-6 py-2 rounded-full border-2 font-rajdhani font-bold text-white uppercase tracking-wider text-lg backdrop-blur-md"
              style={{
                borderColor: highlightColor,
                backgroundColor: `${highlightColor}33`,
                boxShadow: `0 0 20px ${highlightColor}4d`,
              }}
            >
              {categoryName}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventHero;
