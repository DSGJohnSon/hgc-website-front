import { notFound } from "next/navigation";
import eventsData from "@/data/events";
import categoriesData from "@/data/categories.json";
import EventHero from "./components/EventHero";
import EventInfo from "./components/EventInfo";
import FreeplaySection from "./components/FreeplaySection";
import FloatingRegister from "./components/FloatingRegister";
import Partners from "@/components/sections/Partners";
import EventCarousel from "@/components/sections/EventCarousel";
import CTASection from "@/components/sections/CTASection";
import gamesData from "@/data/games.json";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Find the event
  const event = eventsData.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  // Get category name (take first category if multiple)
  const category = event.categoryId?.[0]
    ? categoriesData.categories.find((c) => c.id === event.categoryId?.[0])
    : null;
  const categoryName = category ? category.name : "Événement";

  // Filter other events for carousel
  const otherEvents = eventsData
    .filter((e) => e.id !== id)
    .map((e) => ({
      id: e.id,
      type: e.type as "tournoi" | "event",
      title: e.title,
      startDate: e.startDate,
      startTime: e.startTime || "",
      cardThumbnail: e.cardThumbnail,
      color: e.color,
      // Also include the alternative format properties
      date: e.startDate,
      time: e.startTime || "",
      categories: e.categoryId
        ?.map((catId) => categoriesData.categories.find((c) => c.id === catId))
        .filter(
          (cat): cat is { id: string; name: string } => cat !== undefined,
        ),
      games: e.gameId
        ?.map((gameId) => gamesData.games.find((g) => g.id === gameId))
        .filter(
          (game): game is { id: string; name: string; icon?: string } =>
            game !== undefined,
        ),
    }));

  return (
    <main className="min-h-screen bg-gray-950">
      <EventHero
        title={event.title}
        type={event.type as "tournoi" | "event"}
        categoryName={categoryName}
        bannerImage={event.heroBanner}
        bannerImageMobile={event.heroBannerMobile}
        color={event.color}
        heroBanner={event.heroBanner}
        heroBannerMobile={event.heroBannerMobile}
      />

      <div className="relative">
        <div className="relative z-10">
          <EventInfo
            description={event.description}
            startDate={event.startDate}
            endDate={event.endDate}
            startTime={event.startTime}
            location={event.location}
            highlightColor={event.color}
            transports={event.transports ? event.transports : undefined}
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

          {event.weezeventCode && (
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
          )}

          {otherEvents.length > 0 && (
            <EventCarousel
              data={{
                title: "Événements à venir",
                subtitle: "Nos prochains rendez-vous",
                events: otherEvents,
              }}
            />
          )}
        </div>
      </div>

      <FloatingRegister
        weezeventCode={event.weezeventCode}
        eventTitle={event.title}
        highlightColor={event.color}
        startDate={event.startDate}
        endDate={event.endDate}
      />
    </main>
  );
}
