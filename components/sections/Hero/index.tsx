import React from "react";
import MainHero from "./MainHero";
import HeroSlider from "./HeroSlider";
import PixelBackground from "@/components/ui/pixel-background";
import { LuChevronDown } from "react-icons/lu";

export interface HeroData {
  mainHero: {
    subtitle: string;
    title: {
      line1: string;
      line2: string;
    };
    buttons: Array<{
      label: string;
      href: string;
      variant: "primary" | "secondary";
      textUpperCase?: boolean;
    }>;
    totalParticipants: string;
  };
  slider: {
    subtitle: string;
    title: string;
    slides: Array<{
      title: string;
      date: string;
      time: string;
      location: string;
      buttonText: string;
      buttonLink: string;
      image: string;
    }>;
  };
}

interface HeroProps {
  data: HeroData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section className="relative">
      <PixelBackground
        className="relative min-h-[60vh] sm:min-h-screen flex items-center justify-center py-20 sm:py-32 bg-gray-950"
        speed={30}
        gap={10}
        colors="#111827"
        opacity={1}
        direction="center"
        haloRadius={250}
        haloSecondaryColor="#d97706"
        haloTertiaryColor="#86198f"
        haloDelay={100}
        canvasClassName="absolute inset-0"
        fadeBottom={true}
        fadeHeight={100}
      >
        {/* Main Hero Section */}
        <MainHero
          subtitle={data.mainHero.subtitle}
          title={data.mainHero.title}
          buttons={
            data.mainHero.buttons as Array<{
              label: string;
              href: string;
              variant: "primary" | "secondary";
            }>
          }
          totalParticipants={data.mainHero.totalParticipants}
        />
        {/* Scroll Indicator - Absolute positioned at bottom, outside container */}
        <div className="absolute -bottom-20 sm:-bottom-32 left-1/2 -translate-x-1/2 z-10 animate-fade-in-up animation-delay-600 flex flex-col items-center gap-2">
          <p className="text-xs text-gray-500 font-poppins uppercase tracking-wider">
            Défiler pour découvrir
          </p>
          <div className="animate-bounce">
            <LuChevronDown className="w-6 h-6 text-theme2" />
          </div>
        </div>
      </PixelBackground>

      {/* Hero Slider Section */}
      <HeroSlider
        subtitle={data.slider.subtitle}
        title={data.slider.title}
        slides={data.slider.slides}
      />
    </section>
  );
};

export default Hero;
