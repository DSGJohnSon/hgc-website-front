//SECTION GALLERY

export interface GalleryProps {
  data: GalleryData;
}

export interface GalleryData {
  title: string;
  subtitle: string;
  images: Array<{
    src: string;
    alt: string;
  }>;
}
