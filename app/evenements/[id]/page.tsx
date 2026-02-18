import { notFound } from "next/navigation";
import { Metadata } from "next";
import { events as eventsData } from "@/data/events";
import categoriesData from "@/data/categories.json";
import { prepareEvents } from "@/lib/eventUtils";
import EventHero from "./components/EventHero";
import EventInfo from "./components/EventInfo";
import Partners from "@/components/sections/Partners";
import FreeplaySection from "./components/FreeplaySection";
import EventCTASection from "./components/EventCTASection";
import EventCarousel from "@/components/sections/EventCarousel";
import FloatingRegister from "./components/FloatingRegister";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const event = eventsData.find((e) => e.id === id);

  if (!event) {
    return {
      title: "Événement non trouvé | Holiday Geek Cup",
      description: "L'événement demandé n'existe pas.",
    };
  }

  const category = event.categoryId?.[0]
    ? categoriesData.categories.find((c) => c.id === event.categoryId?.[0])
    : null;
  const categoryName = category ? category.name : "Événement";

  const descriptionText = Array.isArray(event.description)
    ? (event.description[0] as any)?.content?.[0]?.paragraphs?.[0]
    : undefined;

  return {
    title: `${event.title} | ${categoryName} - Holiday Geek Cup`,
    description: descriptionText || `Découvrez l'événement ${event.title} organisé par Holiday Geek Cup. ${event.location ? `Lieu : ${event.location}.` : ""}`,
  };
}

export default async function EventDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const search = await searchParams;
  const shouldOpenRegister = search.register === "true";

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

  // If event is cancelled, registration is not open
  const effectiveRegistrationOpen = event.isCancelled ? false : (event.registrationOpen ?? false);

  // Filter other events for carousel
  const otherEvents = prepareEvents(eventsData, id, 10);

  return (
    <main className="min-h-screen bg-gray-950">
      <EventHero
        title={event.title}
        type={event.type as "tournoi" | "event"}
        categoryName={categoryName}
        bannerImage={event.heroBanner}
        bannerImageMobile={event.heroBannerMobile}
        color={event.color}
        isCancelled={event.isCancelled}
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
            registrationOpen={effectiveRegistrationOpen}
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
            <EventCTASection
              highlightColor={event.color}
              registrationOpen={effectiveRegistrationOpen}
              weezeventCode={event.weezeventCode}
              eventTitle={event.title}
              isCancelled={event.isCancelled}
            />
          )}

          {otherEvents.length > 0 && (
            <EventCarousel
              data={{
                title: "Événements à venir",
                subtitle: "Nos prochains rendez-vous",
                events: otherEvents,
              }}
              loop={false}
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
        shouldOpenRegister={shouldOpenRegister}
        registrationOpen={effectiveRegistrationOpen}
        isCancelled={event.isCancelled}
      />
    </main>
  );
}
