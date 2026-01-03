import Hero, { HeroData } from "@/components/sections/Hero";
import Testimony, { TestimonyData } from "@/components/sections/Testimony";
import Partners, { PartnersData } from "@/components/sections/Partners";
import Statistics, { StatisticsData } from "@/components/sections/Statistics";
import Gallery, { GalleryData } from "@/components/sections/Gallery";
import SimpleSection, {
  SimpleSectionData,
} from "@/components/sections/SimpleSection";
import CTASection, {
  CTASectionData,
  CTABackgroundColor,
} from "@/components/sections/CTASection";
import homePageData from "@/data/pages/home-page.json";

interface Section {
  type: string;
  data: any;
  props?: any;
}

export default function Home() {
  const sections = homePageData.sections as Section[];

  const renderSection = (section: Section, index: number) => {
    const isLastSection = index === sections.length - 1;

    switch (section.type) {
      case "hero":
        return <Hero key={index} data={section.data as HeroData} />;

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
