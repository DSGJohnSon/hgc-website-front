// Common Types
export interface LinkItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ImageData {
  src: string;
  alt: string;
}

// Header Types
export interface MenuItemData {
  label: string;
  href: string;
  submenu?: MenuItemData[];
}

export interface HeaderData {
  logo: ImageData;
  menu: MenuItemData[];
  topBar: {
    notice: string;
    languages: string[];
    socialLinks: SocialLink[];
  };
}

// Footer Types
export interface FooterWidget {
  title: string;
  links?: LinkItem[];
  content?: string;
}

export interface FooterData {
  logo: ImageData;
  about: string;
  socialLinks: SocialLink[];
  widgets: FooterWidget[];
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
  };
  copyright: string;
}

// Hero Section Types
export interface HeroSlide {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  images: {
    left: ImageData;
    right: ImageData;
  };
}

export interface HeroData {
  subtitle: string;
  title: {
    line1: string;
    line2: string;
  };
  buttons: {
    primary: LinkItem;
    secondary: LinkItem;
  };
  slider: HeroSlide[];
}

// About Section Types
export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface AboutData {
  subtitle: string;
  title: string;
  image: ImageData;
  thumbnail: ImageData;
  features: FeatureItem[];
}

// Game Section Types
export interface GameCard {
  id: string;
  title: string;
  image: ImageData;
  logo: ImageData;
  entryFee: string;
}

export interface GameSectionData {
  subtitle: string;
  title: string;
  games: GameCard[];
}

// Tournament Section Types
export interface TournamentCard {
  id: string;
  title: string;
  date: string;
  time: string;
  status: "upcoming" | "finished";
  score: string;
  images: {
    team1: ImageData;
    team2: ImageData;
  };
  streamLinks: {
    youtube: string;
    twitch: string;
  };
}

export interface TournamentSectionData {
  subtitle: string;
  title: string;
  tournaments: TournamentCard[];
}

// Team Section Types
export interface TeamMember {
  id: string;
  name: string;
  image: ImageData;
  gameLogo: ImageData;
}

export interface TeamSectionData {
  subtitle: string;
  title: string;
  members: TeamMember[];
}

// Blog Section Types
export interface BlogPost {
  id: string;
  title: string;
  image: ImageData;
  author: string;
  date: string;
  excerpt?: string;
}

export interface BlogSectionData {
  subtitle: string;
  title: string;
  posts: BlogPost[];
}

// Gallery Section Types
export interface GalleryItem {
  id: string;
  image: ImageData;
  type: "image" | "video";
  videoUrl?: string;
}

export interface GallerySectionData {
  items: GalleryItem[];
}

// Client Section Types
export interface ClientLogo {
  id: string;
  image: ImageData;
  url: string;
}

export interface ClientSectionData {
  clients: ClientLogo[];
}

// CTA Section Types
export interface CtaSectionData {
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: ImageData;
  backgroundImage: ImageData;
}

// Marquee Section Types
export interface MarqueeItem {
  text: string;
  icon: string;
}

export interface MarqueeSectionData {
  items: MarqueeItem[];
}

// Feature Section Types
export interface FeatureCard {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface FeatureSectionData {
  subtitle: string;
  title: string;
  features: FeatureCard[];
}
