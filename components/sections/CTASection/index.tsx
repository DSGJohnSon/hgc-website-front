import React from "react";
import { cn } from "@/lib/utils";
import Button, { ButtonVariant, ButtonSize } from "@/components/ui/Button";
import BlinkingPixelBackground from "./BlinkingPixelBackground";

export interface CTASectionCTA {
  text: string;
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export type CTABackgroundColor = "gray" | "purple" | "orange";

export interface CTASectionData {
  title: string;
  subtitle?: string;
  paragraph: string;
  ctas: CTASectionCTA[];
}

interface CTASectionProps {
  data: CTASectionData;
  className?: string;
  glowMode?:
    | "alternating"
    | "simultaneous"
    | "static"
    | "center"
    | "centerBlinking";
  backgroundColor?: CTABackgroundColor;
  speed?: number;
  opacity?: number;
  stickyTop?: boolean;
  stickyBottom?: boolean;
}

const CTASection: React.FC<CTASectionProps> = ({
  data,
  className,
  glowMode = "alternating",
  backgroundColor = "gray",
  speed = 30,
  opacity = 1,
  stickyTop = false,
  stickyBottom = false,
}) => {
  const { title, subtitle, paragraph, ctas } = data;

  // Define background configurations for each color
  const backgroundConfig = {
    gray: {
      bgClass: "bg-transparent",
      pixelColor: "#111827", // Dark gray pixels
      glowColor: "#d97706", // Orange glow
      fadeTop: true,
      fadeBottom: true,
      textColor: "text-white",
      subtitleColor: "text-theme2",
      paragraphColor: "text-gray-300",
      buttonVariant: "primary" as ButtonVariant,
    },
    purple: {
      bgClass: "bg-[#6240cf]", // Theme purple - vibrant
      pixelColor: "#581c87", // purple-950 base pixels
      glowColor: "#e9d5ff", // purple-200 light glow
      fadeTop: false,
      fadeBottom: false,
      textColor: "text-gray-950",
      subtitleColor: "text-gray-950",
      paragraphColor: "text-gray-950",
      buttonVariant: "secondary" as ButtonVariant,
    },
    orange: {
      bgClass: "bg-orange-600", // Tailwind orange-600 - vibrant
      pixelColor: "#7c2d12", // orange-950 base pixels
      glowColor: "#fed7aa", // orange-200 light glow
      fadeTop: false,
      fadeBottom: false,
      textColor: "text-white",
      subtitleColor: "text-white",
      paragraphColor: "text-white",
      buttonVariant: "secondary" as ButtonVariant,
    },
  };

  const config = backgroundConfig[backgroundColor];

  // For colored backgrounds (purple/orange), force static mode with no glow
  const effectiveGlowMode = backgroundColor === "gray" ? glowMode : "static";
  const effectiveGlowWidth = backgroundColor === "gray" ? 300 : 0; // No glow for colored backgrounds

  // For colored backgrounds, apply oval mask (fade from sides to center)
  // Using radial gradient with ellipse shape (wider horizontally)
  // Center has reduced opacity (20%) instead of fully transparent
  const canvasClass =
    backgroundColor === "gray"
      ? "absolute inset-0"
      : "absolute inset-0 [mask-image:radial-gradient(ellipse_65%_60%_at_center,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.2)_40%,black_70%,black_100%)]";

  // Apply vertical margins based on sticky props
  const marginClasses = cn(!stickyTop && "mt-32", !stickyBottom && "mb-32");

  return (
    <section className={cn("relative w-full", marginClasses, className)}>
      <BlinkingPixelBackground
        className={cn("py-8 md:py-32", config.bgClass)}
        speed={speed}
        gap={10}
        colors={config.pixelColor}
        opacity={opacity}
        direction="center"
        glowColor={config.glowColor}
        glowDuration={2000}
        glowCycleDuration={6000}
        glowWidth={effectiveGlowWidth}
        glowMode={effectiveGlowMode}
        fadeTop={config.fadeTop}
        fadeBottom={config.fadeBottom}
        fadeHeight={150}
        canvasClassName={canvasClass}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
            {/* Subtitle */}
            {subtitle && (
              <p
                className={cn(
                  "font-rajdhani uppercase tracking-wider text-base font-semibold",
                  config.subtitleColor
                )}
              >
                {subtitle}
              </p>
            )}

            {/* Title */}
            <h2
              className={cn(
                "font-goldman text-4xl md:text-5xl lg:text-6xl uppercase leading-tight",
                config.textColor
              )}
            >
              {title}
            </h2>

            {/* Paragraph */}
            <p
              className={cn(
                "text-base md:text-lg leading-relaxed font-rajdhani max-w-3xl",
                config.paragraphColor
              )}
            >
              {paragraph}
            </p>

            {/* CTAs */}
            {ctas.length > 0 && (
              <div className="flex flex-wrap gap-4 pt-4 justify-center">
                {ctas.map((cta, index) => (
                  <Button
                    key={index}
                    variant={config.buttonVariant}
                    size={cta.size || "md"}
                    href={cta.href}
                    asLink={true}
                    textUpperCase={true}
                  >
                    {cta.text}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </BlinkingPixelBackground>
    </section>
  );
};

export default CTASection;
