import PageWrapper from "../../components/PageWrapper";
import Head from "next/head";
import { Article as ArticleType } from "../../types";
import { useState } from "react";
import ArticleSection from "../../components/ArticleSection";
import { getArticleById, getArticles } from "../../services/articles";

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
      <PageWrapper as="div">
        <ArticleSection
          id={id}
          introductoryContent={introductoryContent}
          bodyContent={bodyContent}
        />
      </PageWrapper>
    </>
  );
}

export async function getStaticPaths() {
  const articles = await getArticles();

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
  params: { articleId: string };
}) {
  const article = (await getArticleById(Number(articleId)))[0];

  return {
    props: { articleJSONString: JSON.stringify(article) },
  };
}
