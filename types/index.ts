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