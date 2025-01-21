"use client";

import { Post } from "@/interfaces/post";
import { useMemo } from "react";

type IntroProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedTag: string;
  onTagChange: (tag: string) => void;
  posts: Post[];
};

export function Intro({
  searchTerm,
  onSearchChange,
  selectedTag,
  onTagChange,
  posts,
}: IntroProps) {
  const tags = useMemo(() => {
    const allTags = posts.flatMap((post) => post.tags || []);
    return ["all", ...Array.from(new Set(allTags))];
  }, [posts]);

  return (
    <section className="flex-col space-y-6 mt-16 mb-16 md:mb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-teal-500 text-5xl md:text-2xl font-bold tracking-tighter leading-tight">
          blogs@sid
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700 dark:bg-neutral-800 dark:border-neutral-700"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="w-full md:w-48">
          <select
            value={selectedTag}
            onChange={(e) => onTagChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700 dark:bg-neutral-800 dark:border-neutral-700"
          >
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
