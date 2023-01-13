import { ReactNode } from "react";

export interface Card {
  title: string;
  description: string;
  tags: Tag[];
  date: Date;
}
export interface Tag {
  name: string;
  icon?: ReactNode;
}
