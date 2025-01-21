import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

export function PostHeader({ title, date }: Props) {
  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-lg">
          <PostTitle>{title}</PostTitle>

          <h1 className="font-bold">By: Sid</h1>
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
