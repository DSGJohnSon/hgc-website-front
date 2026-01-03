"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export function ImageGallery({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center">
      <div className="mx-auto grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((colIndex) => (
          <div key={colIndex} className="grid gap-6">
            {images
              .filter((_, index) => index % 3 === colIndex)
              .map((image, idx) => (
                <AnimatedImage
                  key={`${colIndex}-${idx}`}
                  alt={image.alt}
                  src={image.src}
                  placeholder={image.src}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

interface AnimatedImageProps {
  alt: string;
  src: string;
  className?: string;
  placeholder?: string;
}

function AnimatedImage({ alt, src, placeholder }: AnimatedImageProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isLoading, setIsLoading] = React.useState(true);
  const [imgSrc, setImgSrc] = React.useState(src);

  const handleError = () => {
    if (placeholder) {
      setImgSrc(placeholder);
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-lg transition-all duration-700 ease-in-out",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <Image
        alt={alt}
        src={imgSrc}
		width={400}
		height={400}
        className={cn(
          "size-full object-cover transition-all duration-700 ease-in-out",
          isLoading
            ? "scale-[1.01] blur-xl grayscale"
            : "scale-100 blur-0 grayscale-0"
        )}
        onLoad={() => setIsLoading(false)}
        loading="lazy"
        onError={handleError}
      />
    </div>
  );
}
