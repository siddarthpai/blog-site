// components/more-stories.tsx
"use client";

import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-5xl font-bold tracking-tighter leading-tight">
        My blogs
      </h2>
      <div className="mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            tags={post.tags || []} // Provide empty array as fallback
          />
        ))}
      </div>
    </section>
  );
}
