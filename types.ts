export interface Card {
  title: string;
  description: string;
  tags: string[];
  lengthInMinutes: number;
  date: string;
  href: string;
}

export type SortOptions =
  | "Newest first"
  | "Oldest first"
  | "Shortest first"
  | "Longest first";

export interface IntroductoryContent {
  title: string;
  description: string;
  tags: string[];
  lengthInMinutes: number;
  date: string;
}

export interface Article {
  id: number;
  introductoryContent: IntroductoryContent;
  bodyContent: string[];
}
