// components/post-preview.tsx
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";
import Tags from "./tags";

type Props = {
  title: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
  tags: string[]; // Fixed type to be string array
};

export function PostPreview({
  title,
  date,
  excerpt,
  author,
  slug,
  tags,
}: Props) {
  return (
    <Link href={`/posts/${slug}`}>
      <div className="mb-8 border-b pb-8">
        <h3 className="text-3xl mb-3 leading-snug">
          <Link href={`/posts/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <div className="mb-4">
          <Tags tags={tags} />
        </div>
        <div className="text-lg mb-4">
          <DateFormatter dateString={date} />
        </div>
        <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
        <div className="text-md font-bold">By: Sid</div>
      </div>
    </Link>
  );
}
