import Container from "@/app/_components/container";
import { BlogContent } from "@/app/_components/blog-content";
import { getAllPosts } from "@/lib/api";

export default function Page() {
  const allPosts = getAllPosts();

  return (
    <main>
      <Container>
        <BlogContent initialPosts={allPosts} />
      </Container>
    </main>
  );
}
