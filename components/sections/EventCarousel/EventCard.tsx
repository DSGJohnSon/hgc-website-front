"use client";

import React from "react";
import Image from "next/image";
import { LuTrophy, LuGamepad2, LuClock, LuCalendar } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { EventCard as EventCardProps } from "@/types/pages/detail-event";

const EventCard: React.FC<EventCardProps> = ({
  type,
  title,
  startDate,
  endDate,
  time,
  cardThumbnail,
  categories = [],
  games = [],
  color,
  isPast = false,
}) => {
  // Use custom color if provided, otherwise fallback to CSS variable
  const highlightColor = color || "var(--theme-color)";

    // Format date for display
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const displayDate = endDate
    ? `Du ${new Date(startDate).getDate()} au ${formatDate(endDate)}`
    : formatDate(startDate);

  return (
    <div
      className="group flex flex-col w-full h-full rounded-xl overflow-hidden duration-300 border-4 border-gray-950 transition-all bg-gray-950"
      style={
        {
          ["--hover-border-color" as string]: highlightColor,
        } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        if (color) {
          e.currentTarget.style.borderColor = highlightColor;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
      }}
    >
      {/* Top Image Section */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={cardThumbnail}
          alt={title}
          fill
          className={cn(
            "object-cover transition-transform duration-500 group-hover:scale-110",
            isPast && "grayscale",
          )}
        />
        {/* Gradient Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-linear-to-t via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80",
          )}
          style={
            color
              ? {
                  backgroundImage: `linear-gradient(to top, ${highlightColor}66, transparent, transparent)`,
                }
              : undefined
          }
        />
        {/* Type Icon Overlay */}
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-gray-950/80 border-2 border-gray-200/20 backdrop-blur-sm rounded-lg p-2">
            {type === "both" ? (
              <div className="flex items-center gap-2">
                <LuTrophy size={18} className="text-white" />
                <span className="text-white text-xs">&</span>
                <LuGamepad2 size={18} className="text-white" />
              </div>
            ) : type === "tournoi" ? (
              <LuTrophy size={18} className="text-white" />
            ) : (
              <LuGamepad2 size={18} className="text-white" />
            )}
          </div>
        </div>
        {/* Terminé Badge */}
        {isPast && (
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-gray-950/90 border-2 border-gray-500 backdrop-blur-sm rounded-lg px-3 pb-1">
              <span className="text-gray-400 font-rajdhani font-bold text-xs uppercase tracking-wider">
                Terminé
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Content Section */}
      <div className="flex-1 p-4 space-y-3 flex flex-col justify-between bg-gray-900">
        <div className="space-y-3">
          {/* Category Badges */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {categories.map((category, index) => (
                <span
                  key={index}
                  className="inline-block text-white text-[10px] sm:text-xs font-rajdhani font-bold px-2 py-0.5 rounded uppercase"
                  style={{
                    backgroundColor: color
                      ? `${highlightColor}e6`
                      : "rgb(var(--theme-rgb) / 0.9)",
                  }}
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="font-goldman text-white text-sm sm:text-base md:text-xl uppercase leading-tight line-clamp-2">
            {title}
          </h3>

          {/* Game Badges */}
          {games.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="text-white bg-white/5 backdrop-blur-sm rounded-full px-2 py-0.5 font-rajdhani text-[10px] sm:text-xs flex items-center gap-1"
                  title={game.name}
                >
                  <LuGamepad2 className="size-3" />
                  {game.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Date & Time Footer */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
          {/* Date */}
          <div className="flex items-center gap-1.5 text-gray-400">
            <LuCalendar
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              style={{ color: highlightColor }}
            />
            <span className="font-rajdhani text-xs sm:text-sm font-semibold">
              {displayDate}
            </span>
          </div>

          {/* Time */}
          {time && (
            <div className="flex items-center gap-1.5 text-white">
              <LuClock
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                style={{ color: highlightColor }}
              />
              <span className="font-rajdhani text-xs sm:text-sm font-semibold">
                {time}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
