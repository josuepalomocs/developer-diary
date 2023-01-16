import { client } from "../lib/sanity";
import {
  Article as ArticleType,
  Card as CardType,
  IntroductoryContent,
} from "../types";

export async function getArticles() {
  const articlesFromSanity = await client.fetch(`*[_type == "article"]`);

  return sanitizeArticles(articlesFromSanity);
}

export async function getArticleById(articleId: number) {
  const articleFromSanity = await client.fetch(
    `*[_type == "article" && id == ${articleId}]`
  );

  return sanitizeArticles(articleFromSanity);
}

export async function getArticleCards() {
  const articlesFromSanity = await client.fetch(`*[_type == "article"]`);

  let cards: CardType[] = [];

  for (let i = 0; i < articlesFromSanity.length; i++) {
    const {
      id,
      title,
      description,
      tags,
      lengthInMinutes,
      date,
    }: Omit<CardType, "href"> & { id: number } = articlesFromSanity[i];

    cards[i] = {
      title,
      description,
      tags,
      lengthInMinutes,
      date,
      href: `/articles/${id}`,
    };
  }

  return cards;
}

function sanitizeArticles(articlesFromSanity: any) {
  let articles: ArticleType[] = [];

  for (let i = 0; i < articlesFromSanity.length; i++) {
    const {
      id,
      title,
      description,
      tags,
      lengthInMinutes,
      date,
    }: IntroductoryContent & { id: number } = articlesFromSanity[i];

    const { bodyParagraphs } = articlesFromSanity[i];

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

  return articles;
}
