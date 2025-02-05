import { remark } from "remark";
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkGfm)                // GitHub Flavored Markdown
    .use(remarkRehype)            // Convert to rehype
    .use(rehypeHighlight)         // Syntax highlighting
    .use(rehypeStringify)         // Convert to string
    .process(markdown);
    
  return result.toString();
}