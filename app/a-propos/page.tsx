import Hero, { HeroData } from "@/components/sections/Hero";
import Testimony, { TestimonyData } from "@/components/sections/Testimony";
import Partners, { PartnersData } from "@/components/sections/Partners";
import Statistics, { StatisticsData } from "@/components/sections/Statistics";
import Gallery, { GalleryData } from "@/components/sections/Gallery";
import SimpleSection, {
  SimpleSectionData,
} from "@/components/sections/SimpleSection";
import AboutHero from "@/components/sections/AboutHero";
import TextSection, {
  TextSectionData,
} from "@/components/sections/TextSection";
import FeatureGrid, {
  FeatureGridData,
} from "@/components/sections/FeatureGrid";
import CTASection, {
  CTASectionData,
  CTABackgroundColor,
} from "@/components/sections/CTASection";
import aProposData from "@/data/pages/official/about.json";
import Ticketing, { TicketingData } from "@/components/sections/Ticketing";
import TrophyCarousel, {
  TrophyCarouselData,
} from "@/components/sections/TrophyCarousel";

interface Section {
  type: string;
  data: any;
}

export default function APropos() {
  const sections = aProposData.sections as Section[];

  const renderSection = (section: Section, index: number) => {
    const isLastSection = index === sections.length - 1;

    switch (section.type) {
      case "statistics":
        return <Statistics key={index} data={section.data as StatisticsData} />;

      case "simpleSection":
        return (
          <SimpleSection key={index} data={section.data as SimpleSectionData} />
        );

      case "aboutHero":
        return (
          <AboutHero key={index} data={section.data as SimpleSectionData} />
        );

      case "textSection":
        return (
          <TextSection key={index} data={section.data as TextSectionData} />
        );

      case "featureGrid":
        return (
          <FeatureGrid key={index} data={section.data as FeatureGridData} />
        );

      case "cta":
        return (
          <CTASection
            key={index}
            data={section.data as CTASectionData}
            glowMode={section.data?.glowMode}
            backgroundColor={
              section.data?.backgroundColor as CTABackgroundColor
            }
            speed={section.data?.speed}
            opacity={section.data?.opacity}
            stickyTop={section.data?.stickyTop}
            stickyBottom={section.data?.stickyBottom}
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

      case "trophyCarousel":
        return (
          <TrophyCarousel
            key={index}
            data={section.data as TrophyCarouselData}
          />
        );

      default:
        console.warn(`Unknown section type: ${section.type}`);
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {sections.map((section, index) => renderSection(section, index))}
    </div>
  );
}
