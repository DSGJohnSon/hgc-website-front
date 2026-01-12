import React from "react";
import { notFound } from "next/navigation";
import eventsData from "@/data/events.json";
import gamesData from "@/data/games.json";
import categoriesData from "@/data/categories.json";
import EventHero from "./components/EventHero";
import EventInfo from "./components/EventInfo";
import FreeplaySection from "./components/FreeplaySection";
import FloatingRegister from "./components/FloatingRegister";
import Partners from "@/components/sections/Partners";
import EventCarousel from "@/components/sections/EventCarousel";
import CTASection from "@/components/sections/CTASection";
import PixelBackground from "@/components/ui/pixel-background";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Find the event
  const event = eventsData.events.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  // Get category name
  const category = categoriesData.categories.find(
    (c) => c.id === event.categoryId
  );
  const categoryName = category ? category.name : "Événement";

  // Filter other events for carousel
  const otherEvents = eventsData.events
    .filter((e) => e.id !== id)
    .map((e) => ({
      type: e.type as "tournoi" | "event",
      title: e.title,
      date: e.startDate,
      time: e.startTime,
      cardThumbnail: e.cardThumbnail,
      categories: e.categoryId ? [e.categoryId] : [],
      games: e.gameId ? [e.gameId] : [],
      color: e.color,
    }));

  return (
    <main className="min-h-screen bg-gray-950">
      <EventHero
        title={event.title}
        type={event.type as "tournoi" | "event"}
        categoryName={categoryName}
        bannerImage={event.heroBanner}
        color={event.color}
      />

      <div className="relative">
        {/* Pixel Background for the whole content area */}
        <PixelBackground
          className="absolute inset-0 z-0"
          speed={20}
          gap={10}
          colors="#111827"
          opacity={0.4}
        />

        <div className="relative z-10">
          <EventInfo
            description={event.description}
            startDate={event.startDate}
            endDate={event.endDate}
            startTime={event.startTime}
            location={event.location}
            highlightColor={event.color}
            transports={event.transports}
            weezeventCode={event.weezeventCode}
            eventTitle={event.title}
          />

          {event.partners && event.partners.length > 0 && (
            <Partners
              data={{
                subtitle: "Ils soutiennent l'événement",
                title: "Nos Partenaires",
                logos: event.partners,
              }}
            />
          )}

          {event.freeplayGames && event.freeplayGames.length > 0 && (
            <FreeplaySection
              games={event.freeplayGames}
              highlightColor={event.color}
            />
          )}

          <CTASection
            data={{
              title: "Prêt à relever le défi ?",
              subtitle: "Inscription",
              paragraph:
                "Ne manquez pas votre chance de participer à cet événement exceptionnel. Les places sont limitées !",
              ctas: [
                {
                  text: "Je m'inscris",
                  href: "#",
                  variant: "secondary",
                },
              ],
            }}
            backgroundColor="gray"
            glowMode="centerBlinking"
          />

          <EventCarousel
            data={{
              title: "Événements à venir",
              subtitle: "Nos prochains rendez-vous",
              events: otherEvents,
            }}
          />
        </div>
      </div>

      <FloatingRegister
        weezeventCode={event.weezeventCode}
        eventTitle={event.title}
        highlightColor={event.color}
      />
    </main>
  );
}
