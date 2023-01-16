import CardControl from "./CardControl";
import CardList from "./CardList";
import { ChangeEvent, useState } from "react";
import { Card as CardType, SortOptions } from "../types";
import { fuzzySearchCards } from "../utility/fuzzy";
import { isNewerDate, isOlderDate } from "../utility/dayjs";

interface ArticleCardSectionProps {
  cards: CardType[];
}

export default function ArticleCardSection({ cards }: ArticleCardSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState<SortOptions>("Newest first");

  function handleChangeSearchQuery(event: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  function handleChangeSelectedSort(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedSort(event.target.value as SortOptions);
  }

  function filterCards(query: string, cards: CardType[]) {
    if (!query) {
      return cards;
    }
    const threshold = 0.7;
    return fuzzySearchCards(query, cards, threshold);
  }

  function sortCardsByNewest({ date: a }: CardType, { date: b }: CardType) {
    return isNewerDate(a, b) ? -1 : 1;
  }

  function sortCardsByOldest({ date: a }: CardType, { date: b }: CardType) {
    return isOlderDate(a, b) ? -1 : 1;
  }

  function sortCardsByShortest(
    { lengthInMinutes: a }: CardType,
    { lengthInMinutes: b }: CardType
  ) {
    return a < b ? -1 : 1;
  }

  function sortCardsByLongest(
    { lengthInMinutes: a }: CardType,
    { lengthInMinutes: b }: CardType
  ) {
    return a > b ? -1 : 1;
  }

  function sortCards(selectedSort: SortOptions, cards: CardType[]) {
    switch (selectedSort) {
      case "Newest first":
        return cards.sort(sortCardsByNewest);
      case "Oldest first":
        return cards.sort(sortCardsByOldest);
      case "Shortest first":
        return cards.sort(sortCardsByShortest);
      case "Longest first":
        return cards.sort(sortCardsByLongest);
    }
  }

  function getResultCards(cards: CardType[]) {
    const filteredCards = filterCards(searchQuery, cards);
    return sortCards(selectedSort, filteredCards);
  }

  const resultCards = getResultCards(cards);

  function renderResultCountText(length: number) {
    if (!length) {
      return "No relevant articles found";
    }
    if (length === 1) {
      return "Showing 1 article";
    }
    return `Showing ${length} articles`;
  }

  return (
    <div
      className="flex flex-col items-center pt-6 w-full min-h-screen"
      id="articles-begin"
    >
      <h4 className="text-3xl font-bold">Articles</h4>
      <header className="sticky top-0 flex justify-center w-full bg-white mb-10 border-b">
        <CardControl
          handleChangeSearchQuery={handleChangeSearchQuery}
          handleChangeSelectedSort={handleChangeSelectedSort}
        />
      </header>
      <p className="text-gray-500 mb-4">
        {renderResultCountText(resultCards.length)}
      </p>
      <section className="min-h-full">
        <CardList cards={resultCards} />
      </section>
    </div>
  );
}
