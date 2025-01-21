"use client";

import { useState } from "react";
import { Intro } from "./intro";
import { MoreStories } from "./more-stories";
import { Post } from "@/interfaces/post";

type BlogContentProps = {
  initialPosts: Post[];
};

export function BlogContent({ initialPosts }: BlogContentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  const filteredPosts = initialPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag =
      selectedTag === "all" || post.tags?.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <>
      <Intro
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        posts={initialPosts}
      />
      {filteredPosts.length > 0 ? (
        <MoreStories posts={filteredPosts} />
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          No posts found matching your criteria.
        </p>
      )}
    </>
  );
}
