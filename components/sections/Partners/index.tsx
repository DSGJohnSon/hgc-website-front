import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Sparkles } from "./components/Sparkles";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface PartnersData {
  subtitle: string;
  title: string;
  logos: Array<{
    alt: string;
    src: string;
  }>;
}

interface PartnersProps {
  data: PartnersData;
  isLastSection?: boolean;
}

export default function Partners({
  data,
  isLastSection = false,
}: PartnersProps) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden bg-gray-950",
        isLastSection ? "h-[80svh]" : "h-screen"
      )}
    >
      <div className="container mx-auto px-4 mt-32 w-screen">
        <div className="text-center mb-16 space-y-4">
          <p className="text-theme2 font-rajdhani uppercase tracking-wider text-base font-semibold">
            {data.subtitle}
          </p>
          <h2 className="font-rajdhani font-bold text-4xl md:text-5xl text-white uppercase">
            {data.title}
          </h2>
        </div>
        <div
          className={cn(
            "overflow-hidden w-full py-4 mask-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(0,0,0,1)_25%,rgba(0,0,0,1)_75%,rgba(255,255,255,0)_100%)] max-w-[calc(100vw-2rem)] self-center"
          )}
        >
          <InfiniteSlider
            gap={80}
            reverse
            duration={120}
            durationOnHover={25}
            className="z-50"
          >
            {data.logos.map((logo, index: number) => (
              <div key={`logo-${index}`} className="relative h-24 w-48 mx-4">
                <Image
                  alt={logo.alt}
                  className="pointer-events-none select-none dark:brightness-0 dark:invert object-contain"
                  fill
                  loading="lazy"
                  src={logo.src}
                />
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </div>

      <div className="relative z-10 -mt-32 h-96 w-screen overflow-hidden mask-[radial-gradient(50%_50%,#030712,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#030712,transparent_70%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-theme after:bg-gray-900">
        <Sparkles
          density={1200}
          speed={0.2}
          color="#fff"
          background="#030712"
          className="absolute inset-x-0 bottom-0 h-full w-full mask-[radial-gradient(50%_50%,#030712,transparent_85%)]"
        />
      </div>
    </div>
  );
}
