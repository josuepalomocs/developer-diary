import Tag from "./Tag";
import { Card as CardType } from "../types";
import { formatDate } from "../utility/dayjs";
import Link from "next/link";

interface CardProps extends CardType {}

export default function Card({ title, description, tags, date }: CardProps) {
  function renderTags() {
    return tags.map((tag, index) => {
      return <Tag key={index} name={tag.name} />;
    });
  }

  return (
    <div className="m-2 p-4 rounded max-w-sm bg-gray-50 border border-gray-200 rounded-none">
      <h4 className="mb-2 font-bold text-gray-800">{title}</h4>
      <p className="text-gray-500 h-20 mb-2 line-clamp-3">{description}</p>
      <div className="flex mb-6">{renderTags()}</div>
      <div className="flex justify-between items-center">
        <time className="text-sm text-gray-500">
          Posted on {formatDate(date, "MMM DD, YYYY")}
        </time>
        <Link
          className="flex gap-1 text-sm px-4 py-2 text-sky-500 bg-sky-100 cursor-pointer hover:bg-sky-200"
          href=""
        >
          View full article
        </Link>
      </div>
    </div>
  );
}
