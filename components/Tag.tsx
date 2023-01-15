interface TagProps {
  name: string;
}

export default function Tag({ name }: TagProps) {
  return (
    <div className="flex mr-2 px-2 py-1 bg-gray-100">
      <p className="text-gray-500 text-xs">{name}</p>
    </div>
  );
}
