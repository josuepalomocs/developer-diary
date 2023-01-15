import PageWrapper from "../../components/PageWrapper";
import Head from "next/head";
import Article from "../../components/Article";
import { Article as ArticleType, IntroductoryContent } from "../../types";
import { createClient } from "next-sanity";
import { formatDate } from "../../utility/dayjs";
import { useState } from "react";

interface ArticlesProps {
  articleJSONString: string;
}

export default function Articles({ articleJSONString }: ArticlesProps) {
  const [article] = useState<ArticleType>(JSON.parse(articleJSONString));

  const { id, introductoryContent, bodyContent } = article;

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
        <div className="flex flex-col h-full justify-center items-center">
          <div className="mb-24"></div>
          <main className="">
            <Article
              id={id}
              introductoryContent={introductoryContent}
              bodyContent={bodyContent}
            />
          </main>
        </div>
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

export async function getStaticPaths() {
  const articlesFromCMS = await client.fetch(`*[_type == "article"]`);

  let articles: ArticleType[] = [];

  for (let i = 0; i < articlesFromCMS.length; i++) {
    const {
      id,
      title,
      description,
      tags,
      lengthInMinutes,
      date,
    }: IntroductoryContent & { id: number } = articlesFromCMS[i];

    const { bodyParagraphs } = articlesFromCMS[i];

    articles[i] = {
      id,
      introductoryContent: {
        title,
        description,
        tags,
        lengthInMinutes,
        date,
      },
      bodyContent: bodyParagraphs,
    };
  }

  const paths = articles.map(({ id }) => {
    return { params: { articleId: id.toString() } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params: { articleId },
}: {
  params: { articleId: number };
}) {
  const articleFromCMS = await client.fetch(
    `*[_type == "article" && id == ${articleId}]`
  );

  const {
    id,
    title,
    description,
    tags,
    lengthInMinutes,
    date,
  }: IntroductoryContent & { id: number } = articleFromCMS[0];

  const { bodyParagraphs } = articleFromCMS[0];

  const article = {
    id,
    introductoryContent: {
      title,
      description,
      tags,
      lengthInMinutes,
      date,
    },
    bodyContent: bodyParagraphs,
  };

  return {
    props: { articleJSONString: JSON.stringify(article) },
  };
}
