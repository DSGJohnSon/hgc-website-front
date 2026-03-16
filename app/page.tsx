import React from "react";
import { Metadata } from "next";
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
import { events as eventsData } from "@/data/events";
import { prepareEvents } from "@/lib/eventUtils";

export const metadata: Metadata = {
  title: "Holiday Geek Cup - Accueil | Événements Gaming et Tournois Esport",
  description: "Découvrez Holiday Geek Cup, votre destination pour les événements gaming, tournois esport et activités ludiques. Rejoignez la communauté des gamers passionnés.",
};

interface Section {
  type: string;
  data: any;
  props?: any;
}

export default function Home() {
  const sections = homePageData.sections as Section[];

  // Prepare real events for Hero carousel
  const preparedEvents = prepareEvents(eventsData);

  // Add "see all" card at the end
  const eventsWithSeeAll = [
    ...preparedEvents,
    {
      id: "see-all",
      type: "event" as const,
      title: "Voir tous les événements",
      startDate: "",
      time: "",
      cardThumbnail: "/assets/img/placeholders/see-all-events.png", // Placeholder image
      color: "#6B46D8", // Or a neutral color
      isPast: false,
      isCancelled: false,
      linkHref: "/evenements",
      categories: [],
      games: [],
    },
  ];

  const renderSection = (section: Section, index: number) => {
    const isLastSection = index === sections.length - 1;

    switch (section.type) {
      case "hero":
        // Override events with real data
        const heroData = {
          ...section.data,
          slider: {
            ...(section.data as HeroData).slider,
            events: eventsWithSeeAll,
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
