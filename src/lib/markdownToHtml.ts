import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
  .use(remarkGfm)
  .use(remarkRehype, {
    allowDangerousHtml: true,
    attributes: {
      ul:  { className: ["list-disc", "pl-6", "list-inside"] },    // add bullets + padding
      ol:  { className: ["list-decimal", "pl-6", "list-inside"] }, // add numbers + padding
      a:   { className: ["underline","external-link"] },                          // underline links
      code:{ className: ["line-numbers"] },
      pre: { className: ["code-block"] },
    },
  })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeHighlight, {
      ignoreMissing: true,
      detect: true,
      aliases: { js: ["javascript"], ts: ["typescript"] },
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return result.toString();
}
