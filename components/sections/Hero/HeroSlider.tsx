"use client";

import React, { useState, useEffect } from "react";
import HeroSlide from "./HeroSlide";

interface Slide {
  title: string;
  date: string;
  time: string;
  location: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

interface HeroSliderProps {
  subtitle?: string;
  title?: string;
  slides: Slide[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ subtitle, title, slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Only auto-rotate if there are multiple slides
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative bg-transparent py-32 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {(subtitle || title) && (
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 space-y-2 sm:space-y-4">
            {subtitle && (
              <p className="text-theme2 font-rajdhani uppercase tracking-wider text-sm sm:text-base font-semibold">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="font-rajdhani font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white uppercase">
                {title}
              </h2>
            )}
          </div>
        )}

        {/* Slides */}
        <div className="relative overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-opacity duration-500 ${
                index === currentSlide
                  ? "opacity-100"
                  : "opacity-0 absolute inset-0"
              }`}
            >
              <HeroSlide {...slide} />
            </div>
          ))}
        </div>

        {/* Pagination Dots - Only show if multiple slides */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 sm:bottom-8 md:bottom-16 lg:bottom-40 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-theme w-6 sm:w-8"
                    : "bg-gray-600 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSlider;
