import { ImageGallery } from "@/components/ui/image-gallery";

export interface GalleryData {
  title: string;
  subtitle: string;
  images: Array<{
    src: string;
    alt: string;
  }>;
}

interface GalleryProps {
  data: GalleryData;
}

export default function Gallery({ data }: GalleryProps) {
  return (
    <div className="relative w-full overflow-x-hidden py-32 bg-gray-950">
      <div className="py-32 px-16 container mx-auto">
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
