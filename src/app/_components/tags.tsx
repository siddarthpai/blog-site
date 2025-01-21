import React from "react";

type TagProps = {
  tags: string[];
};

const Tags = ({ tags }: TagProps) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default Tags;
