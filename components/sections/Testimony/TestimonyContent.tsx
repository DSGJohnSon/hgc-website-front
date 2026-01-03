"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

interface TestimonyContentProps {
  testimonials: Testimonial[];
}

export default function TestimonyContent({
  testimonials,
}: TestimonyContentProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedQuote, setDisplayedQuote] = useState(testimonials[0].quote);
  const [displayedRole, setDisplayedRole] = useState(testimonials[0].role);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // Auto-rotation effect
  useEffect(() => {
    // Don't auto-rotate if user is interacting or animation is in progress
    if (isUserInteracting || isAnimating) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        const nextIndex = (activeIndex + 1) % testimonials.length;
        setDisplayedQuote(testimonials[nextIndex].quote);
        setDisplayedRole(testimonials[nextIndex].role);
        setActiveIndex(nextIndex);
        setTimeout(() => setIsAnimating(false), 400);
      }, 200);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [activeIndex, isUserInteracting, isAnimating, testimonials]);

  const handleSelect = (index: number) => {
    if (index === activeIndex || isAnimating) return;

    setIsUserInteracting(true); // Pause auto-rotation
    setIsAnimating(true);
    setTimeout(() => {
      setDisplayedQuote(testimonials[index].quote);
      setDisplayedRole(testimonials[index].role);
      setActiveIndex(index);
      setTimeout(() => {
        setIsAnimating(false);
        // Resume auto-rotation after 3 seconds of no interaction
        setTimeout(() => setIsUserInteracting(false), 3000);
      }, 400);
    }, 200);
  };

  return (
    <div className="flex flex-col items-center gap-10 py-16">
      {/* Quote Container - Fixed height to prevent layout shift */}
      <div className="relative px-8 min-h-[200px] md:min-h-[180px] flex items-center justify-center">
        <span className="absolute -left-2 -top-6 text-7xl font-serif text-gray-700 select-none pointer-events-none">
          "
        </span>
        <p
          className={cn(
            "text-2xl md:text-3xl font-light font-poppins text-gray-300 text-center max-w-lg leading-relaxed transition-all duration-400 ease-out",
            isAnimating
              ? "opacity-0 blur-sm scale-[0.98]"
              : "opacity-100 blur-0 scale-100"
          )}
        >
          {displayedQuote}
        </p>
        <span className="absolute -right-2 -bottom-8 text-7xl font-serif text-gray-700 select-none pointer-events-none">
          "
        </span>
      </div>

      <div className="flex flex-col items-center gap-6 mt-2">
        {/* Role text */}
        <p
          className={cn(
            "text-xs text-gray-400 font-poppins tracking-[0.2em] uppercase transition-all duration-500 ease-out",
            isAnimating
              ? "opacity-0 translate-y-2"
              : "opacity-100 translate-y-0"
          )}
        >
          {displayedRole}
        </p>

        <div className="flex items-center justify-center gap-4">
          {testimonials.map((testimonial, index) => {
            const isActive = activeIndex === index;
            const isHovered = hoveredIndex === index && !isActive;
            const showName = isActive || isHovered;

            return (
              <button
                key={testimonial.id}
                onClick={() => handleSelect(index)}
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  setIsUserInteracting(true); // Pause auto-rotation on hover
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  // Resume auto-rotation after 2 seconds of no hover
                  setTimeout(() => setIsUserInteracting(false), 2000);
                }}
                className={cn(
                  "relative flex items-center gap-0 cursor-pointer overflow-hidden",
                  "font-rajdhani font-bold transition-all duration-300",
                  "border-none text-center leading-none",
                  showName
                    ? cn(
                        isActive
                          ? "bg-white text-gray-950"
                          : "bg-gray-700 text-gray-100",
                        "[clip-path:polygon(8px_0%,calc(100%-8px)_0%,100%_50%,calc(100%-8px)_100%,8px_100%,0%_50%)]",
                        "before:absolute before:top-[3px] before:left-[3px] before:w-2 before:h-[calc(100%-6px)] before:bg-gray-950 before:z-[-1] before:transition-all before:duration-200",
                        "before:[clip-path:polygon(85%_0,100%_0,15%_50%,100%_100%,85%_100%,0%_50%)]",
                        "after:absolute after:top-[3px] after:right-[3px] after:w-2 after:h-[calc(100%-6px)] after:bg-gray-950 after:z-[-1] after:transition-all after:duration-200 after:rotate-180",
                        "after:[clip-path:polygon(85%_0,100%_0,15%_50%,100%_100%,85%_100%,0%_50%)]"
                      )
                    : "bg-transparent", // No background when inactive
                  showName ? "pr-5 pl-4 py-1.5" : "p-0"
                )}
              >
                {/* Avatar with round shape */}
                <div className="relative shrink-0">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    className={cn(
                      "w-9 h-9 rounded-full object-cover transition-all duration-300",
                      isActive && "ring-2 ring-gray-950/30"
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "grid transition-all duration-500 ease-in-out",
                    showName
                      ? "grid-cols-[1fr] opacity-100 ml-2"
                      : "grid-cols-[0fr] opacity-0 ml-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <span
                      className={cn(
                        "text-xs uppercase whitespace-nowrap block",
                        "transition-colors duration-300"
                      )}
                    >
                      {testimonial.author}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
