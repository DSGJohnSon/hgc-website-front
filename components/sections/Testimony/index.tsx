import React from "react";
import TestimonyContent from "./TestimonyContent";

export interface TestimonyData {
  title: string;
  subtitle: string;
  testimonials: Array<{
    id: number;
    quote: string;
    author: string;
    role: string;
    avatar: string;
  }>;
}

interface TestimonyProps {
  data: TestimonyData;
}

const Testimony: React.FC<TestimonyProps> = ({ data }) => {
  return (
    <section className="relative h-[800px] flex flex-col justify-center bg-transparent">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-theme2 font-rajdhani uppercase tracking-wider text-base font-semibold">
            {data.subtitle}
          </p>
          <h2 className="font-rajdhani font-bold text-4xl md:text-5xl text-white uppercase">
            {data.title}
          </h2>
        </div>

        {/* Testimonials Content */}
        <TestimonyContent testimonials={data.testimonials} />
      </div>
    </section>
  );
};

export default Testimony;
