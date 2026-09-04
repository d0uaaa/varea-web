export type Concern = "Hydration" | "Barrier Repair" | "Brightening" | "Redness Relief";
export type SkinType = "Dry" | "Combination" | "Oily" | "Sensitive";

export interface Product {
  slug: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  concerns: Concern[];
  skinTypes: SkinType[];
  rating: number;
  reviewCount: number;
  badge?: string;
  image: string;
  shortDesc: string;
  description: string;
  sizes: string[];
  ingredients: string;
  howToUse: string;
}

export interface Review {
  initials: string;
  name: string;
  rating: number;
  body: string;
}
