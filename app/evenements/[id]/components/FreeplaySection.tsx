"use client";

import React, { useRef } from "react";
import { LuGamepad2, LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { Stories, StoriesContent, Story } from "@/components/stories-carousel";
import { CarouselPrevious, CarouselNext } from "@/components/carousel";
import Autoplay from "embla-carousel-autoplay";

import { Game } from "@/types/games";
import gamesDataRaw from "@/data/games.json";
import Image from "next/image";
import { cn } from "@/lib/utils";

const gamesData = gamesDataRaw as { games: Game[] };

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  if (!game) return null;
  if (game.blockType === "block") {
    return (
      <div
        className="group relative rounded-2xl p-6 gap-4  transition-all duration-300 h-full border-2 border-white/10 box-border"
        style={{
          background:
            game.bgType === "gradient"
              ? `linear-gradient(to top, ${game.color1}, ${game.color2})`
              : game.color1,
        }}
      >
        {game.logo !== "" ? (
          <Image
            src={game.logo || "/assets/logos/default-game.svg"}
            alt={game.name}
            width={500}
            height={500}
            className={cn("w-1/2 group-hover:w-[55%] transition-all duration-500 z-10",
              game.img && game.img !== "" ? "absolute top-1/2 -translate-y-1/2" : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2")}
          />
        ) : (
          <h4 className="font-rajdhani font-bold text-white text-xl uppercase tracking-wider text-center group-hover:text-white transition-colors">
            {game.name}
          </h4>
        )}

        {game.img && game.img !== "" && (
          <Image
            src={game.img}
            alt={game.name}
            width={500}
            height={500}
            className="w-[70%] group-hover:w-2/3 aspect-square object-contain rounded-xl absolute -top-1/4 -right-1/6 duration-500 z-50"
          />
        )}

        {game.bgImg && game.bgImg !== "" && (
          <Image
            src={game.bgImg}
            alt={`${game.name} background`}
            width={500}
            height={500}
            className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
          />
        )}
      </div>
    );
  } else {
    return (
      <div className="group relative bg-gray-900/40 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-white/20 transition-all duration-300 backdrop-blur-sm overflow-hidden h-full">
        {/* Background Highlight */}
        <div
          className="absolute -bottom-12 -right-12 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ backgroundColor: game.color1 || "var(--theme-color)" }}
        />

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500">
          <LuGamepad2
            className="w-8 h-8"
            style={{ color: game.color1 || "var(--theme-color)" }}
          />
        </div>

        <h4 className="font-rajdhani font-bold text-white text-xl uppercase tracking-wider text-center group-hover:text-white transition-colors">
          {game.name}
        </h4>
      </div>
    );
  }
};

interface FreeplaySectionProps {
  games: string[]; // These are now IDs
  highlightColor: string;
}

const FreeplaySection: React.FC<FreeplaySectionProps> = ({
  games: gameIds,
  highlightColor,
}) => {
  // Resolve IDs to Game objects
  const resolvedGames = gameIds
    .map((id) => {
      const game = gamesData.games.find((g) => g.id === id);
      return game || null;
    })
    .filter(Boolean) as Game[];

  const autoplayRef = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
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
          <h2 className="font-goldman text-4xl sm:text-5xl text-white uppercase tracking-tight">
            Nos jeux en Freeplay
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
              <StoriesContent className="gap-16 p-4">
                {resolvedGames.map((game: Game, index: number) => (
                  <Story
                    key={index}
                    className="w-70! sm:w-[320px]! md:w-100! aspect-2/1 bg-transparent shadow-none hover:scale-100"
                  >
                    <GameCard game={game} />
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
          <div className="flex flex-wrap justify-center gap-16 max-w-6xl mx-auto">
            {resolvedGames.map((game: Game, index: number) => (
              <div key={index} className="w-75 sm:w-87.5 aspect-2/1">
                <GameCard game={game} />
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
