"use client";

import React, { useRef } from "react";
import { Stories, StoriesContent, Story } from "@/components/stories-carousel";
import { CarouselPrevious, CarouselNext } from "@/components/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import EventCard, { EventCardProps } from "./EventCard";
import gamesData from "@/data/games.json";
import categoriesData from "@/data/categories.json";

export interface EventCarouselData {
  title: string;
  subtitle: string;
  events: Array<{
    type: "tournoi" | "event";
    title: string;
    date: string;
    time: string;
    cardThumbnail: string;
    categories?: string[];
    games?: string[];
    gradientTheme?: "theme" | "theme2" | "fifa-season";
    buttonText?: string;
    buttonLink?: string;
    color?: string; // Optional custom highlight color
  }>;
}

interface EventCarouselProps {
  data: EventCarouselData;
  className?: string;
}

const EventCarousel: React.FC<EventCarouselProps> = ({ data, className }) => {
  const { title, subtitle, events } = data;

  // Autoplay plugin with pause on interaction
  const autoplayRef = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  // Map game IDs and category IDs to full objects
  const eventsWithGamesAndCategories: EventCardProps[] = events.map(
    (event) => ({
      ...event,
      games: event.games?.map((gameId) => {
        const game = gamesData.games.find((g) => g.id === gameId);
        return game || { id: gameId, name: "Unknown", icon: "Plane" };
      }),
      categories: event.categories?.map((categoryId) => {
        const category = categoriesData.categories.find(
          (c) => c.id === categoryId
        );
        return category || { id: categoryId, name: "Unknown" };
      }),
    })
  );

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
          <h2 className="font-rajdhani font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white uppercase px-4">
            {title}
          </h2>
        </div>

        {/* Carousel */}
        <div className="w-full">
          <Stories
            className="w-full"
            plugins={[autoplayRef.current]}
            opts={{
              loop: true,
              slidesToScroll: 1,
            }}
          >
            <StoriesContent className="gap-4 md:gap-6 p-4 justify-center">
              {eventsWithGamesAndCategories.map((event, index) => (
                <Story
                  key={index}
                  className="w-[240px]! sm:w-[280px]! md:w-[340px]! lg:w-[400px]! aspect-3/4 p-0"
                >
                  <EventCard {...event} />
                </Story>
              ))}
            </StoriesContent>
            <div className="flex w-full justify-end gap-4 mt-6">
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
          </Stories>
        </div>
      </div>
    </section>
  );
};

export default EventCarousel;
