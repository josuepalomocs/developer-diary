import { Tag as TagType } from "../types";

interface TagProps extends TagType {}

export default function Tag({ name, icon }: TagProps) {
  return (
    <div className="flex mr-2 px-2 py-1 bg-gray-200">
      <p className="text-gray-500 text-xs">{name}</p>
      {icon}
    </div>
  );
}
