import { Sparkles } from "@/components/ui/sparkles";
import { cn } from "@/lib/utils";

export interface StatisticsData {
  stats: Array<{
    value: string;
    label: string;
    sublabel?: string;
  }>;
}

interface StatisticsProps {
  data: StatisticsData;
}

export default function Statistics({ data }: StatisticsProps) {
  return (
    <div className="relative w-full py-32 bg-gray-950 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 text-center">
          {data.stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center space-y-2"
            >
              <span className="text-6xl md:text-7xl lg:text-8xl font-rajdhani font-medium text-white tracking-tight">
                {stat.value}
              </span>
              <div className="flex flex-col items-center space-y-1">
                <span className="text-lg md:text-xl text-white font-rajdhani uppercase tracking-wider">
                  {stat.label}
                </span>
                {stat.sublabel && (
                  <span className="text-base md:text-lg text-gray-300 font-rajdhani tracking-wide">
                    {stat.sublabel}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
