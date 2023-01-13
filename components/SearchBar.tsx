import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChangeEvent } from "react";

interface SearchBarProps {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ handleChange }: SearchBarProps) {
  return (
    <div className="sticky top-6 flex items-center border border-gray-200 rounded-none w-1/4 h-12 mb-6">
      <MagnifyingGlassIcon className="w-10 h-full px-2 text-gray-500 bg-gray-50" />
      <input
        className="w-full h-full text-gray-500 bg-gray-50 focus:outline-0 placeholder:text-gray-500"
        type="search"
        placeholder="Search posts..."
        onChange={handleChange}
      />
    </div>
  );
}
