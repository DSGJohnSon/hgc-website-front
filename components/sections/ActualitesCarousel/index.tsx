"use client";

import React, { useRef, useState, useCallback } from "react";
import { Stories, StoriesContent, Story } from "@/components/stories-carousel";
import { CarouselPrevious, CarouselNext } from "@/components/carousel";
import { cn } from "@/lib/utils";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import ActualiteCard from "./ActualiteCard";
import { Actualities } from "@/types/pages/detail-actualites";
import type { CarouselApi } from "@/components/carousel";

export interface ActualitesCarouselData {
  title: string;
  subtitle: string;
  actualites: Actualities[];
}

interface ActualitesCarouselProps {
  data: ActualitesCarouselData;
  className?: string;
}

const ActualitesCarousel: React.FC<ActualitesCarouselProps> = ({
  data,
  className,
}) => {
  const { title, subtitle, actualites } = data;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Update current slide when carousel changes
  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  React.useEffect(() => {
    if (!api) return;

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  // Show only the 4 most recent actualites
  const recentActualites = actualites.slice(0, 4);

  if (recentActualites.length === 0) return null;

  return (
    <section
      className={cn("relative w-full py-16 md:py-32 bg-transparent", className)}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 space-y-2 md:space-y-4">
          <p className="text-theme2 font-rajdhani uppercase tracking-wider text-sm sm:text-base font-semibold">
            {subtitle}
          </p>
          <h2 className="font-goldman text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white uppercase px-4">
            {title}
          </h2>
        </div>

        {/* Carousel */}
        <div className="w-full">
          <Stories
            className="w-full"
            setApi={setApi}
            opts={{
              loop: false,
              slidesToScroll: 1,
              align: "start",
            }}
          >
            <StoriesContent className="gap-0 items-center">
              {recentActualites.map((actualite, index) => (
                <Story
                  key={actualite.id}
                  className="basis-full pl-0 p-0 bg-transparent shadow-none hover:scale-100"
                >
                  <ActualiteCard {...actualite} />
                </Story>
              ))}
            </StoriesContent>

            {/* Navigation Controls */}
            <div className="flex w-full justify-between items-center mt-8">
              {/* Progress Indicator */}
              <div className="flex items-center gap-2">
                <span className="text-white font-goldman text-lg">
                  {current + 1}
                </span>
                <span className="text-gray-500 font-goldman text-lg">/</span>
                <span className="text-gray-500 font-goldman text-lg">
                  {recentActualites.length}
                </span>
              </div>

              {/* Arrow Buttons */}
              <div className="flex gap-4">
                <CarouselPrevious
                  size="carouselTrophies"
                  variant="carouselTrophies"
                >
                  <LuArrowLeft />
                </CarouselPrevious>
                <CarouselNext size="carouselTrophies" variant="carouselTrophies">
                  <LuArrowRight />
                </CarouselNext>
              </div>
            </div>
          </Stories>
        </div>
      </div>
    </section>
  );
};

export default ActualitesCarousel;
