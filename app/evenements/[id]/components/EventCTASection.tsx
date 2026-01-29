"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { LuTicket } from "react-icons/lu";
import Button from "@/components/ui/Button";
import BlinkingPixelBackground from "@/components/sections/CTASection/BlinkingPixelBackground";
import RegistrationDialog from "./RegistrationDialog";

interface EventCTASectionProps {
  highlightColor: string;
  registrationOpen?: boolean;
  weezeventCode?: string;
  eventTitle: string;
}

const EventCTASection: React.FC<EventCTASectionProps> = ({
  highlightColor,
  registrationOpen = false,
  weezeventCode,
  eventTitle,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <section className="relative w-full mt-32 mb-32">
        <BlinkingPixelBackground
          className="py-8 md:py-32 bg-transparent"
          speed={30}
          gap={10}
          colors="#111827"
          opacity={1}
          direction="center"
          glowColor={highlightColor}
          glowDuration={2000}
          glowCycleDuration={6000}
          glowWidth={300}
          glowMode="centerBlinking"
          fadeTop={true}
          fadeBottom={true}
          fadeHeight={150}
          canvasClassName="absolute inset-0"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
              {/* Subtitle */}
              <p
                className="font-rajdhani uppercase tracking-wider text-base font-semibold"
                style={{ color: highlightColor }}
              >
                Inscription
              </p>

              {/* Title */}
              <h2 className="font-goldman text-4xl md:text-5xl lg:text-6xl uppercase leading-tight text-white">
                Prêt à relever le défi ?
              </h2>

              {/* Paragraph */}
              <p className="text-base md:text-lg leading-relaxed font-rajdhani max-w-3xl text-gray-300">
                Ne manquez pas votre chance de participer à cet événement
                exceptionnel. Les places sont limitées !
              </p>

              {/* CTA Button */}
              <div className="flex flex-wrap gap-4 pt-4 justify-center">
                {registrationOpen ? (
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setIsDialogOpen(true)}
                    textUpperCase={true}
                    icon={<LuTicket className="w-5 h-5" />}
                    iconPosition="left"
                    style={{
                      background: `linear-gradient(to right, ${highlightColor}, ${highlightColor})`,
                    }}
                  >
                    Je m'inscris
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    disabled={true}
                    textUpperCase={true}
                    icon={<LuTicket className="w-5 h-5" />}
                    iconPosition="left"
                    className="opacity-60 cursor-not-allowed"
                    style={{
                      background: "#4b5563",
                    }}
                  >
                    Inscriptions fermées
                  </Button>
                )}
              </div>
            </div>
          </div>
        </BlinkingPixelBackground>
      </section>

      <RegistrationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        weezeventCode={weezeventCode}
        title={eventTitle}
        registrationOpen={registrationOpen}
      />
    </>
  );
};

export default EventCTASection;
