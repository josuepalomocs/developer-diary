import Article from "./Article";
import Link from "next/link";
import { Article as ArticleType } from "../types";

interface ArticleSectionProps extends ArticleType {}

export default function ArticleSection({
  id,
  introductoryContent,
  bodyContent,
}: ArticleSectionProps) {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen mx-4">
      <Article
        id={id}
        introductoryContent={introductoryContent}
        bodyContent={bodyContent}
      />
      <Link
        className="text-sm font-bold mb-12 px-4 py-3 text-sky-500 bg-sky-100 cursor-pointer rounded-none
            hover:outline hover:outline-1 hover:outline-sky-500 focus:outline focus:outline-sky-500"
        href="/#articles-begin"
      >
        BACK TO ARTICLES
      </Link>
    </main>
  );
}
