import { ReactNode } from "react";

export interface Card {
  title: string;
  description: string;
  tags: Tag[];
  lengthInMinutes: number;
  date: string;
}
export interface Tag {
  name: string;
  icon?: ReactNode;
}

export type SortOptions =
  | "Newest first"
  | "Oldest first"
  | "Shortest first"
  | "Longest first";
