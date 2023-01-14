import Tag from "./Tag";
import { Card as CardType } from "../types";
import { formatDate } from "../utility/dayjs";
import Link from "next/link";

interface CardProps extends CardType {}

export default function Card({
  title,
  description,
  tags,
  lengthInMinutes,
  date,
  href,
}: CardProps) {
  function renderTags() {
    return tags.map((tag, index) => {
      return <Tag key={index} name={tag.name} />;
    });
  }

  return (
    <section className="m-2 p-4 rounded max-w-sm bg-gray-50 border border-gray-200 rounded-none">
      <h4 className="mb-2 font-bold text-gray-800 line-clamp-1">{title}</h4>
      <p className="text-gray-500 h-20 mb-2 line-clamp-3">{description}</p>
      <div className="flex justify-between items-center mb-6">
        <div className="flex">{renderTags()}</div>
        <p className="text-sm text-gray-500">{lengthInMinutes} minutes</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Posted on{" "}
          <time dateTime={date}>{formatDate(date, "MMM DD, YYYY")}</time>
        </p>
        <Link
          className="flex gap-1 text-sm font-bold px-4 py-3 text-sky-500 bg-sky-100 cursor-pointer rounded-none
            hover:outline hover:outline-1 hover:outline-sky-500 focus:outline focus:outline-sky-500"
          href={href}
        >
          VIEW ARTICLE
        </Link>
      </div>
    </section>
  );
}
