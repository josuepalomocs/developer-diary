import Head from "next/head";
import PageWrapper from "../components/PageWrapper";
import CardList from "../components/CardList";
import { ChangeEvent, useEffect, useState } from "react";
import { Card as CardType, SortOptions } from "../types";
import { fuzzySearchCards } from "../utility/fuzzy";
import CardControl from "../components/CardControl";
import { formatDate, isNewerDate, isOlderDate } from "../utility/dayjs";
import { createClient } from "next-sanity";
import Image from "next/image";

interface HomeProps {
  cardsJSONString: string;
}

export default function Home({ cardsJSONString }: HomeProps) {
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
      return "No relevant articles found";
    }
    if (length === 1) {
      return "Showing 1 article";
    }
    return `Showing ${length} articles`;
  }

  const [lineAnimationsComplete, setLineAnimationsComplete] = useState([
    false,
    false,
    false,
  ]);

  useEffect(() => {
    setTimeout(() => {
      setLineAnimationsComplete([true, false, false]);
    }, 1000);

    setTimeout(() => {
      setLineAnimationsComplete([true, true, false]);
    }, 2000);

    setTimeout(() => {
      setLineAnimationsComplete([true, true, true]);
    }, 3000);
  }, []);

  return (
    <>
      <Head>
        <title>Josue Palomo</title>
        <meta
          name="description"
          content="Welcome to my personal website where I'll be regularly posting about my web development journey."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper>
        <main className="flex flex-col items-center">
          <div className="text-center grid justify-center items-center h-screen">
            <div className="flex flex-col items-center">
              <p className="text-gray-500 font-bold mb-6 animate-typing line-clamp-1">
                Hello, I&apos;m Josue Palomo.
              </p>
              <p
                className={`text-gray-500 max-w-md mb-6 ${
                  lineAnimationsComplete[0]
                    ? "animate-typing line-clamp-1"
                    : "hidden"
                }`}
              >
                I enjoy working on all things related to software development.
              </p>
              <p
                className={`text-gray-500 max-w-md mb-6 ${
                  lineAnimationsComplete[1]
                    ? "animate-typing line-clamp-1"
                    : "hidden"
                }`}
              >
                I built this site to document my developer journey.
              </p>
              <p
                className={`text-gray-500 max-w-md mb-6 ${
                  lineAnimationsComplete[2]
                    ? "animate-typing line-clamp-1"
                    : "hidden"
                }`}
              >
                Feel free to{" "}
                <a
                  className="text-sky-500 hover:underline"
                  href="#articles-view-begin"
                >
                  take a look at my articles
                </a>
                .
              </p>
              <div className="flex gap-4 items-center">
                <a
                  className="p-2 hover:outline hover:outline-1 hover:outline-sky-500 hover:bg-sky-100"
                  href="https://github.com/josuepalomocs"
                >
                  <Image
                    src="/github-icon.svg"
                    alt="Github icon"
                    width={20}
                    height={20}
                  />
                </a>
                <a
                  className="p-2 hover:outline hover:outline-1 hover:outline-sky-500 hover:bg-sky-100"
                  href="https://www.linkedin.com/in/josue-palomo/"
                >
                  <Image
                    src="/linkedin-icon.svg"
                    alt="LinkedIn icon"
                    width={20}
                    height={20}
                  />
                </a>
                <a
                  className="p-2 hover:outline hover:outline-1 hover:outline-sky-500 hover:bg-sky-100"
                  href="mailto: josuepalomocs@gmail.com"
                >
                  <p className="text-sm">josuepalomocs@gmail.com</p>
                </a>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col items-center pt-6 w-full min-h-screen"
            id="articles-view-begin"
          >
            <div className="text-3xl font-bold">My articles</div>
            <div className="sticky top-0 flex justify-center w-full bg-white mb-6 border-b">
              <CardControl
                handleChangeSearchQuery={handleChangeSearchQuery}
                handleChangeSelectedSort={handleChangeSelectedSort}
              />
            </div>
            <p className="text-gray-500 mb-4">
              {renderResultCountText(resultCards.length)}
            </p>
            <div className="min-h-full">
              <CardList cards={resultCards} />
            </div>
          </div>
        </main>
      </PageWrapper>
    </>
  );
}

const client = createClient({
  projectId: "ww9idko8",
  dataset: "production",
  apiVersion: formatDate(new Date().toISOString(), "YYYY-MM-DD"),
  useCdn: false,
});

export async function getStaticProps() {
  const articles = await client.fetch(`*[_type == "article"]`);

  let cards: CardType[] = [];

  for (let i = 0; i < articles.length; i++) {
    const {
      id,
      title,
      description,
      tags,
      lengthInMinutes,
      date,
    }: Omit<CardType, "href"> & { id: number } = articles[i];

    cards[i] = {
      title,
      description,
      tags,
      lengthInMinutes,
      date,
      href: `/articles/${id}`,
    };
  }

  return {
    props: { cardsJSONString: JSON.stringify(cards) },
  };
}
