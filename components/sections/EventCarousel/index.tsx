"use client";

import React, { useRef } from "react";
import { Stories, StoriesContent, Story } from "@/components/stories-carousel";
import { CarouselPrevious, CarouselNext } from "@/components/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import EventCard from "./EventCard";
import { EventCard as EventCardProps } from "@/types/pages/detail-event";
import gamesData from "@/data/games.json";
import categoriesData from "@/data/categories.json";

export interface EventCarouselData {
  title: string;
  subtitle: string;
  events: EventCardProps[];
}

interface EventCarouselProps {
  data: EventCarouselData;
  className?: string;
  loop?: boolean;
}

const EventCarousel: React.FC<EventCarouselProps> = ({ 
  data, 
  className,
  loop = true,
}) => {
  const { title, subtitle, events } = data;

  // Autoplay plugin with pause on interaction
  const autoplayRef = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  // Map game IDs and category IDs to full objects
  const eventsWithGamesAndCategories: EventCardProps[] = events.map(
    (event) => ({
      ...event,
      games: (event.games as any)?.map((gameIdOrObj: any) => {
        // Handle if it's already an object or just an ID string
        const gameId = typeof gameIdOrObj === 'string' ? gameIdOrObj : gameIdOrObj.id;
        const game = gamesData.games.find((g) => g.id === gameId);
        return game
          ? { id: game.id, name: game.name }
          : { id: gameId, name: "Unknown" };
      }),
      categories: (event.categories as any)?.map((categoryIdOrObj: any) => {
        // Handle if it's already an object or just an ID string
        const categoryId = typeof categoryIdOrObj === 'string' ? categoryIdOrObj : categoryIdOrObj.id;
        const category = categoriesData.categories.find(
          (c) => c.id === categoryId
        );
        return category
          ? { id: category.id, name: category.name }
          : { id: categoryId, name: "Unknown" };
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
          <h2 className="font-goldman text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white uppercase px-4">
            {title}
          </h2>
        </div>

        {/* Carousel */}
        <div className="w-full">
          <Stories
            className="w-full"
            plugins={[autoplayRef.current]}
            opts={{
              loop: loop,
              slidesToScroll: 1,
              align: "start",
            }}
          >
            <StoriesContent className="gap-0 md:gap-6">
              {eventsWithGamesAndCategories.map((event, index) => (
                <Story
                  key={index}
                  className="basis-full pl-0 sm:basis-auto sm:w-70! md:w-85! lg:w-100! p-0 sm:pl-4 bg-transparent shadow-none hover:scale-100"
                >
                  <div className="px-4 sm:px-0 h-full">
                    <EventCard {...event} />
                  </div>
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
