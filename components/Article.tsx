import { Article as ArticleType } from "../types";
import IntroductoryContent from "./IntroductoryContent";
import BodyContent from "./BodyContent";

interface ArticleProps extends ArticleType {}

export default function Article({
  introductoryContent,
  bodyContent,
}: ArticleProps) {
  const { title, description, tags, lengthInMinutes, date } =
    introductoryContent;

  return (
    <article className="max-w-xl">
      <IntroductoryContent
        title={title}
        description={description}
        tags={tags}
        lengthInMinutes={lengthInMinutes}
        date={date}
      />
      <BodyContent bodyParagraphs={bodyContent} />
    </article>
  );
}
