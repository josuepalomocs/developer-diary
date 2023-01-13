import Head from "next/head";
import PageWrapper from "../components/PageWrapper";
import CardList from "../components/CardList";
import SearchBar from "../components/SearchBar";
import { getCards } from "../utility/cards";
import { ChangeEvent, useState } from "react";
import { Card as CardType } from "../types";
import { fuzzySearchCards } from "../utility/fuzzy";

export default function Home() {
  const [cards] = useState<CardType[]>(() => getCards());
  const [searchQuery, setSearchQuery] = useState("");

  function handleChangeSearchQuery(event: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  function filterCards(query: string, cards: CardType[]) {
    if (!query) {
      return cards;
    }
    console.log(cards);
    const threshold = 0.7;
    return fuzzySearchCards(query, cards, threshold);
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
        <main className="flex flex-col my-6 items-center">
          <SearchBar handleChange={handleChangeSearchQuery} />
          <CardList cards={filterCards(searchQuery, cards)} />
        </main>
      </PageWrapper>
    </>
  );
}
