import Head from "next/head";
import PageWrapper from "../components/PageWrapper";
import ArticleCardSection from "../components/ArticleCardSection";
import LandingSection from "../components/LandingSection";
import { getArticleCards } from "../services/articles";

interface HomeProps {
  cardsJSONString: string;
}

export default function Home({ cardsJSONString }: HomeProps) {
  return (
    <>
      <Head>
        <title>Josue Palomo</title>
        <meta
          name="description"
          content="Hello, I'm Josue Palomo. Welcome to my personal site."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageWrapper as="main">
        <LandingSection />
        <ArticleCardSection cards={JSON.parse(cardsJSONString)} />
      </PageWrapper>
    </>
  );
}

export async function getStaticProps() {
  const cards = await getArticleCards();

  return {
    props: { cardsJSONString: JSON.stringify(cards) },
  };
}
