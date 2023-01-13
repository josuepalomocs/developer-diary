import Select from "./Select";
import SearchBar from "./SearchBar";
import { ChangeEvent } from "react";
import { SortOptions } from "../types";

interface CardControlProps {
  handleChangeSearchQuery: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChangeSelectedSort: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function CardControl({
  handleChangeSearchQuery,
  handleChangeSelectedSort,
}: CardControlProps) {
  const sortOptions: SortOptions[] = [
    "Newest first",
    "Oldest first",
    "Shortest first",
    "Longest first",
  ];

  return (
    <div className="flex justify-center items-center gap-4 w-1/3 h-24">
      <SearchBar id="search-posts" handleChange={handleChangeSearchQuery} />
      <Select
        id="sort-posts"
        name="sort-posts"
        options={sortOptions}
        handleChange={handleChangeSelectedSort}
      />
    </div>
  );
}
