import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, useState } from "react";

interface SearchBarProps {
  id: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ id, handleChange }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`flex-1 flex items-center h-12 bg-gray-50 border border-gray-200 rounded-none ${
        isFocused ? "outline outline-1 outline-gray-400" : ""
      }`}
    >
      <label className="flex items-center h-full" htmlFor={id}>
        <MagnifyingGlassIcon className="w-9 px-2 text-gray-500 bg-gray-50" />
      </label>
      <input
        className="w-full h-full text-gray-500 bg-gray-50 focus:outline-0 placeholder:text-gray-500 focus:border-gray-500 -webkit-appearance-none"
        id={id}
        type="search"
        placeholder="Search articles..."
        onChange={handleChange}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
    </div>
  );
}
