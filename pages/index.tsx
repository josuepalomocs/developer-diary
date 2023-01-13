import Head from "next/head";
import PageWrapper from "../components/PageWrapper";
import CardList from "../components/CardList";
import { getCards } from "../utility/cards";
import { ChangeEvent, useState } from "react";
import { Card as CardType, SortOptions } from "../types";
import { fuzzySearchCards } from "../utility/fuzzy";
import CardControl from "../components/CardControl";
import { isNewerDate, isOlderDate } from "../utility/dayjs";

interface HomeProps {
  cardsJSONString: string;
}

export default function Home({ cardsJSONString }: HomeProps) {
  console.log(JSON.parse(cardsJSONString)[0].date);
  const [cards] = useState<CardType[]>(JSON.parse(cardsJSONString));
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
      return "No relevant results found";
    }
    if (length === 1) {
      return "Showing 1 result";
    }
    return `Showing ${length} results`;
  }

  return (
    <>
      <Head>
        <title>Josue Palomo</title>
        <meta
          name="description"
          content="Welcome to my personal website. I will be posting regular entries discussing new things I learn and apply to my work as a software developer."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        <main className="flex flex-col items-center">
          <div className="sticky top-0 flex justify-center w-full bg-white mb-16 border-b">
            <CardControl
              handleChangeSearchQuery={handleChangeSearchQuery}
              handleChangeSelectedSort={handleChangeSelectedSort}
            />
          </div>
          <p className="text-gray-500 font-medium mb-4">
            {renderResultCountText(resultCards.length)}
          </p>
          <CardList cards={resultCards} />
        </main>
      </PageWrapper>
    </>
  );
}

export async function getServerSideProps() {
  const cards = JSON.stringify(getCards());

  return {
    props: { cardsJSONString: cards },
  };
}
