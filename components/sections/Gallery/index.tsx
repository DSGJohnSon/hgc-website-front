import { ImageGallery } from "@/components/ui/image-gallery";
import { GalleryProps } from "@/types/components/sections/Gallery";

export default function Gallery({ data }: GalleryProps) {
  return (
    <div className="relative w-full overflow-x-hidden py-0 md:py-32 bg-transparent">
      <div className="py-0 md:py-32 px-16 container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="text-theme2 font-rajdhani uppercase tracking-wider text-base font-semibold">
            {data.subtitle}
          </p>
          <h2 className="font-rajdhani font-bold text-4xl md:text-5xl text-white uppercase">
            {data.title}
          </h2>
        </div>
        <ImageGallery images={data.images} />
      </div>
    </div>
  );
}
