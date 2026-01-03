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
    <div className="relative bg-gray-950 py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        {(subtitle || title) && (
          <div className="text-center mb-16 space-y-4">
            {subtitle && (
              <p className="text-theme2 font-rajdhani uppercase tracking-wider text-base font-semibold">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="font-rajdhani font-bold text-4xl md:text-5xl text-white uppercase">
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
          <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-theme w-8"
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
