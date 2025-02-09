import { remark } from "remark";
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';  // Add this import

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype, {
      // Using passThrough for raw HTML
      allowDangerousHtml: true,
      // Add custom CSS classes directly
      attributes: {
        code: {
          className: ['line-numbers']
        },
        pre: {
          className: ['code-block']
        }
      }
    })
    .use(rehypeRaw)  // Add this line to process HTML in markdown
    .use(rehypeSlug)
    .use(rehypeHighlight, {
      ignoreMissing: true,
      detect: true,
      aliases: {
        'js': ['javascript'],
        'ts': ['typescript']
      }
    })
    .use(rehypeStringify, {
      allowDangerousHtml: true
    })
    .process(markdown);
    
  return result.toString();
}