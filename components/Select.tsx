import { ChangeEvent, useState } from "react";
import { Simulate } from "react-dom/test-utils";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import select = Simulate.select;

interface SelectProps {
  id: string;
  name: string;
  options: string[];
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
  id,
  name,
  options,
  handleChange,
}: SelectProps) {
  const [isFocused, setIsFocused] = useState(false);

  function renderOptions(options: string[]) {
    return options.map((option, index) => {
      return (
        <option key={index} value={option}>
          {option}
        </option>
      );
    });
  }

  return (
    <div
      className={`relative flex items-center h-12 bg-gray-50 rounded-none border border-gray-200 ${
        isFocused ? "outline outline-1 outline-gray-400" : ""
      }`}
    >
      <select
        className="text-gray-500 pl-2 pr-8 bg-gray-50 h-full outline-0 appearance-none"
        id={id}
        name={name}
        defaultValue={options[0]}
        onChange={handleChange}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      >
        {renderOptions(options)}
      </select>
      <ChevronDownIcon className="absolute right-1 w-5 h-full text-gray-500 pointer-events-none" />
    </div>
  );
}
