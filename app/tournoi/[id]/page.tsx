import Hero, { HeroData } from "@/components/sections/Hero";
import Testimony, { TestimonyData } from "@/components/sections/Testimony";
import Statistics, { StatisticsData } from "@/components/sections/Statistics";
import Gallery, { GalleryData } from "@/components/sections/Gallery";
import SimpleSection, {
  SimpleSectionData,
} from "@/components/sections/SimpleSection";
import CTASection, {
  CTASectionData,
  CTABackgroundColor,
} from "@/components/sections/CTASection";
import tournamentData from "@/data/pages/tournament-detail.json";

interface Section {
  type: string;
  data: any;
  props?: any;
}

interface TournamentDetailProps {
  params: {
    id: string;
  };
}

export default function TournamentDetail({ params }: TournamentDetailProps) {
  // Pour l'instant, on utilise des données statiques
  // Plus tard, on pourra utiliser params.id pour fetch les données depuis une API
  // Exemple : const data = await fetchTournamentData(params.id)

  const sections = tournamentData.sections as Section[];

  const renderSection = (section: Section, index: number) => {
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

      default:
        console.warn(`Unknown section type: ${section.type}`);
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* L'ID du tournoi est disponible via params.id pour une future utilisation */}
      {/* Exemple : params.id = "1" ou "mario-kart-2025" */}
      {sections.map((section, index) => renderSection(section, index))}
    </div>
  );
}
