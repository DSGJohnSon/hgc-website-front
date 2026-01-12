"use client";

import React, { useRef } from "react";
import { LuGamepad, LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { Stories, StoriesContent, Story } from "@/components/stories-carousel";
import { CarouselPrevious, CarouselNext } from "@/components/carousel";
import Autoplay from "embla-carousel-autoplay";

import gamesData from "@/data/games.json";

interface GameCardProps {
  name: string;
  highlightColor: string;
}

const GameCard: React.FC<GameCardProps> = ({ name, highlightColor }) => {
  return (
    <div className="group relative bg-gray-900/40 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-white/20 transition-all duration-300 backdrop-blur-sm overflow-hidden h-full">
      {/* Background Highlight */}
      <div
        className="absolute -bottom-12 -right-12 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{ backgroundColor: highlightColor }}
      />

      <div className="p-4 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500">
        <LuGamepad className="w-8 h-8" style={{ color: highlightColor }} />
      </div>

      <h4 className="font-rajdhani font-bold text-white text-xl uppercase tracking-wider text-center group-hover:text-white transition-colors">
        {name}
      </h4>
    </div>
  );
};

interface FreeplaySectionProps {
  games: string[]; // These are now IDs
  highlightColor: string;
}

const FreeplaySection: React.FC<FreeplaySectionProps> = ({
  games: gameIds,
  highlightColor,
}) => {
  // Resolve IDs to names
  const resolvedGames = gameIds.map((id) => {
    const game = gamesData.games.find((g) => g.id === id);
    return game ? game.name : id; // Fallback to ID if not found
  });

  const autoplayRef = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <p
            className="text-theme2 font-rajdhani uppercase tracking-widest text-sm font-semibold"
            style={{ color: highlightColor }}
          >
            Incontournables
          </p>
          <h2 className="font-rajdhani font-bold text-4xl sm:text-5xl text-white uppercase tracking-tight">
            Nos jeux <span className="text-white/40">en Freeplay</span>
          </h2>
        </div>

        {resolvedGames.length > 4 ? (
          <div className="w-full">
            <Stories
              plugins={[autoplayRef.current]}
              opts={{
                loop: true,
                slidesToScroll: 1,
              }}
              className="w-full"
            >
              <StoriesContent className="gap-6 p-4">
                {resolvedGames.map((game: string, index: number) => (
                  <Story
                    key={index}
                    className="w-[280px]! sm:w-[320px]! md:w-[400px]! aspect-2/1 p-0"
                  >
                    <GameCard name={game} highlightColor={highlightColor} />
                  </Story>
                ))}
              </StoriesContent>
              <div className="flex w-full justify-end gap-4 mt-8">
                <CarouselPrevious
                  size="carouselTrophies"
                  variant="carouselTrophies"
                  className="relative inset-0"
                >
                  <LuArrowLeft />
                </CarouselPrevious>
                <CarouselNext
                  size="carouselTrophies"
                  variant="carouselTrophies"
                  className="relative inset-0"
                >
                  <LuArrowRight />
                </CarouselNext>
              </div>
            </Stories>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            {resolvedGames.map((game: string, index: number) => (
              <div key={index} className="w-[300px] sm:w-[350px] aspect-2/1">
                <GameCard name={game} highlightColor={highlightColor} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FreeplaySection;
export { GameCard };
