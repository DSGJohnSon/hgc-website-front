import React from "react";
import Hero, { HeroData } from "@/components/sections/Hero";
import Testimony, { TestimonyData } from "@/components/sections/Testimony";
import Partners, { PartnersData } from "@/components/sections/Partners";
import Statistics from "@/components/sections/Statistics";
import Gallery from "@/components/sections/Gallery";
import ActualitesCarousel from "@/components/sections/ActualitesCarousel";
import actualitesData from "@/data/actualites";
import SimpleSection, {
  SimpleSectionData,
} from "@/components/sections/SimpleSection";
import CTASection, {
  CTASectionData,
  CTABackgroundColor,
} from "@/components/sections/CTASection";
import homePageData from "@/data/pages/official/home-page.json";
import Ticketing, { TicketingData } from "@/components/sections/Ticketing";
import { StatisticsData } from "@/types/components/sections/Statistics";
import { GalleryData } from "@/types/components/sections/Gallery";
import eventsData from "@/data/events";
import categoriesData from "@/data/categories.json";
import gamesData from "@/data/games.json";

interface Section {
  type: string;
  data: any;
  props?: any;
}

export default function Home() {
  const sections = homePageData.sections as Section[];

  // Prepare real events for Hero carousel
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const preparedEvents = eventsData
    .map((e) => {
      const startDate = new Date(e.startDate);
      const endDate = e.endDate ? new Date(e.endDate) : startDate;
      const isOngoing = startDate <= today && endDate >= today;
      const isPast = endDate < today;
      const isUpcoming = startDate > today;

      return {
        id: e.id,
        type: e.type as "tournoi" | "event",
        title: e.title,
        startDate: e.startDate,
        startTime: e.startTime || "",
        cardThumbnail: e.cardThumbnail,
        color: e.color,
        isPast,
        isOngoing,
        isUpcoming,
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
      };
    })
    .sort((a, b) => {
      // Priority: ongoing > upcoming > past
      if (a.isOngoing && !b.isOngoing) return -1;
      if (!a.isOngoing && b.isOngoing) return 1;
      if (a.isUpcoming && !b.isUpcoming && !b.isOngoing) return -1;
      if (!a.isUpcoming && b.isUpcoming && !a.isOngoing) return 1;
      // Within same category, sort by date (ascending for upcoming, descending for past)
      if (a.isUpcoming && b.isUpcoming) {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      }
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    })
    .slice(0, 10);

  const renderSection = (section: Section, index: number) => {
    const isLastSection = index === sections.length - 1;

    switch (section.type) {
      case "hero":
        // Override events with real data
        const heroData = {
          ...section.data,
          slider: {
            ...(section.data as HeroData).slider,
            events: preparedEvents,
          },
        } as HeroData;
        return <Hero key={index} data={heroData} />;

      case "statistics":
        return <Statistics key={index} data={section.data as StatisticsData} />;

      case "simpleSection":
        return (
          <SimpleSection key={index} data={section.data as SimpleSectionData} />
        );

      case "cta":
        return (
          <CTASection
            key={index}
            data={section.data as CTASectionData}
            glowMode={section.props?.glowMode}
            backgroundColor={
              section.props?.backgroundColor as CTABackgroundColor
            }
            speed={section.props?.speed}
            opacity={section.props?.opacity}
            stickyTop={section.props?.stickyTop}
            stickyBottom={section.props?.stickyBottom}
          />
        );

      case "gallery":
        return <Gallery key={index} data={section.data as GalleryData} />;

      case "testimony":
        return <Testimony key={index} data={section.data as TestimonyData} />;

      case "partners":
        return (
          <Partners
            key={index}
            data={section.data as PartnersData}
            isLastSection={isLastSection}
          />
        );

      case "ticketing":
        return <Ticketing key={index} data={section.data as TicketingData} />;

      default:
        console.warn(`Unknown section type: ${section.type}`);
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {sections.map((section, index) => {
        // Insert ActualitesCarousel after Hero (first section)
        if (index === 0) {
          return (
            <React.Fragment key={`fragment-${index}`}>
              {renderSection(section, index)}
              <ActualitesCarousel
                data={{
                  title: "ACTUALITÉS",
                  subtitle: "À LA UNE",
                  actualites: actualitesData,
                }}
              />
            </React.Fragment>
          );
        }
        return renderSection(section, index);
      })}
    </div>
  );
}
