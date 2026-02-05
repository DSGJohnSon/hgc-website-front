// ============================================
// CENTRAL ACTUALITY TYPE - Source of Truth
// ============================================
export type Actualities = {
  id: string;
  title: string;
  subtitle?: string;
  content: {
    type: "title" | "paragraph" | "list" | "citation";
    title?: string;
    paragraphs?: string[];
    items?: string[];
    citationText?: string;
  }[];
  image: {
    src: string;
    alt: string;
    position: "left" | "right";
  };
  cta?: {
    type: "standard" | "weezevent";
    isExternal: boolean;
    label: string;
    url?: string;
    weezeventCode?: string;
  };
};
