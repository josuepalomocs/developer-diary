import { Article as ArticleType } from "../types";
import IntroductoryContent from "./IntroductoryContent";
import BodyContent from "./BodyContent";

interface ArticleProps extends ArticleType {}

export default function Article({
  id,
  introductoryContent,
  bodyContent,
}: ArticleProps) {
  const { title, description, tags, lengthInMinutes, date } =
    introductoryContent;

  return (
    <article className="max-w-xl mt-12 mb-6">
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
