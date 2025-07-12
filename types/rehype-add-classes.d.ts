// types/rehype-add-classes.d.ts

declare module 'rehype-add-classes' {
  import { Plugin } from 'unified';
  interface Options {
    [selector: string]: string;
  }
  const rehypeAddClasses: Plugin<[Options]>;
  export default rehypeAddClasses;
}
