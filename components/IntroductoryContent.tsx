import { IntroductoryContent as IntroductoryContentType } from "../types";
import { formatDate } from "../utility/dayjs";
import Tag from "./Tag";

interface IntroductoryContentProps extends IntroductoryContentType {}

export default function IntroductoryContent({
  title,
  description,
  tags,
  lengthInMinutes,
  date,
}: IntroductoryContentProps) {
  function renderTags() {
    return tags.map((tag, index) => {
      return <Tag key={index} name={tag} />;
    });
  }

  return (
    <section className="mb-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
      <div className="flex items-center gap-6 mb-2">
        <p className="text-sm text-gray-500">
          Posted on{" "}
          <time dateTime={date}>{formatDate(date, "MMM DD, YYYY")}</time>
        </p>
        <span className="text-sm text-gray-500">|</span>
        <p className="text-sm text-gray-500">{lengthInMinutes} minutes</p>
      </div>
      <p className="text-gray-500 mb-4">{description}</p>
      <div className="flex">{renderTags()}</div>
    </section>
  );
}
