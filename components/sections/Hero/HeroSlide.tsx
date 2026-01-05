"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { LuArrowRight, LuCalendar, LuClock, LuMapPin } from "react-icons/lu";

interface HeroSlideProps {
  title: string;
  date: string;
  time: string;
  location: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

const HeroSlide: React.FC<HeroSlideProps> = ({
  title,
  date,
  time,
  location,
  buttonText,
  buttonLink,
  image,
}) => {
  return (
    <div className="relative">
      {/* Background Shape Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="relative min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-center">
          {/* Decorative SVG Background */}
          <div className="absolute inset-0 items-center justify-center opacity-20 hidden lg:flex">
            <svg
              viewBox="0 0 1600 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="heroGradient"
                  x1="0"
                  y1="0"
                  x2="1600"
                  y2="520"
                >
                  <stop offset="0" stopColor="var(--theme-color)" />
                  <stop offset="1" stopColor="var(--theme-color2)" />
                </linearGradient>
              </defs>
              <path
                d="M1599 30V490C1599 506.016 1586.02 519 1570 519H1062.43C1054.74 519 1047.36 515.945 1041.92 510.506L1009.49 478.08C1003.68 472.266 995.795 469 987.574 469H612.426C604.205 469 596.32 472.266 590.506 478.08L558.08 510.506C552.641 515.945 545.265 519 537.574 519H30C13.9837 519 1 506.016 1 490V30C1 13.9837 13.9837 1 30 1H400H537.574C545.265 1 552.641 4.05535 558.08 9.4939L590.506 41.9203C596.32 47.7339 604.205 51 612.426 51H987.574C995.795 51 1003.68 47.7339 1009.49 41.9203L1041.92 9.4939C1047.36 4.05535 1054.74 1 1062.43 1H1200H1570C1586.02 1 1599 13.9837 1599 30Z"
                fill="black"
                stroke="url(#heroGradient)"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 sm:gap-8 lg:gap-12 items-center py-8 sm:py-12 md:py-16 lg:py-24">
            {/* Left: Single Vertical Poster Image - Absolute positioned */}
            <div className="relative lg:absolute lg:left-12 lg:top-1/2 lg:-translate-y-1/2 flex items-center justify-center lg:justify-start lg:z-20">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] xl:max-w-[480px] animate-slide-in-left">
                <Image
                  src={image}
                  alt="Event Poster"
                  width={400}
                  height={600}
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>

            {/* Right: Event Information */}
            <div className="text-center lg:text-left lg:col-start-2 lg:pl-4 px-2 sm:px-4 space-y-4 sm:space-y-6">
              <h2 className="text-white font-rajdhani text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight uppercase">
                {title}
              </h2>

              <div className="space-y-3 sm:space-y-4 text-white font-rajdhani">
                {/* Date */}
                <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-3">
                  <div className="flex flex-col lg:flex-row items-center gap-1.5 sm:gap-2">
                    <LuCalendar className="text-theme text-xl sm:text-2xl shrink-0" />
                    <span className="text-theme text-base sm:text-lg font-bold uppercase">
                      Date :
                    </span>
                  </div>
                  <span className="text-base sm:text-lg font-bold uppercase">
                    {date}
                  </span>
                </div>

                {/* Time */}
                <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
                  <LuClock className="text-theme text-xl sm:text-2xl shrink-0 pb-1" />
                  <div className="flex items-baseline gap-1.5 sm:gap-2">
                    <span className="text-theme text-base sm:text-lg font-bold uppercase">
                      Heure :
                    </span>
                    <span className="text-base sm:text-lg font-bold uppercase">
                      {time}
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-3">
                  <div className="flex flex-col lg:flex-row items-center gap-1.5 sm:gap-2">
                    <LuMapPin className="text-theme text-xl sm:text-2xl shrink-0" />
                    <span className="text-theme text-base sm:text-lg font-bold uppercase">
                      Lieu :
                    </span>
                  </div>
                  <span className="text-base sm:text-lg font-bold uppercase leading-relaxed text-balance word-break">
                    {location}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start pt-3 sm:pt-4 gap-3 sm:gap-4">
                <Button
                  variant="primary"
                  asLink
                  href={buttonLink}
                  icon={<LuArrowRight />}
                  iconPosition="right"
                  textUpperCase
                >
                  Plus d'informations
                </Button>
                <Button
                  variant="secondary"
                  asLink
                  href={buttonLink}
                  icon={<LuArrowRight />}
                  iconPosition="right"
                >
                  {buttonText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlide;
