import type { MarkdownLayoutProps } from "astro";
import type { BlogFrontMatter } from "./Pages.types";

export type BlogProps = MarkdownLayoutProps<BlogFrontMatter>;

export type MainProps = {
  title: string;
};
