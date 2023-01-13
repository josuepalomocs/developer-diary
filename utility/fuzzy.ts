import { fuzzy } from "fast-fuzzy";
import { Card, Tag } from "../types";
import { formatDate } from "./dayjs";

function fuzzySearchCardTitle(query: string, title: string, threshold: number) {
  return fuzzy(query, title) > threshold;
}

function fuzzySearchCardDescription(
  query: string,
  description: string,
  threshold: number
) {
  return fuzzy(query, description) > threshold;
}

function fuzzySearchCardTags(query: string, tags: Tag[], threshold: number) {
  for (let i = 0; i < tags.length; i++) {
    if (fuzzy(query, tags[i].name) > threshold) {
      return true;
    }
  }
  return false;
}

function fuzzySearchCardDate(query: string, date: Date, threshold: number) {
  const formattedDate = formatDate(date, "MMM DD, YYYY");
  return fuzzy(query, formattedDate) > threshold;
}

export function fuzzySearchCards(
  query: string,
  cards: Card[],
  threshold: number
) {
  return cards.filter(({ title, description, tags, date }) => {
    return (
      fuzzySearchCardTitle(query, title, threshold) ||
      fuzzySearchCardDescription(query, description, threshold) ||
      fuzzySearchCardTags(query, tags, threshold) ||
      fuzzySearchCardDate(query, date, threshold)
    );
  });
}
