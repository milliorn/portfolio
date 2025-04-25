import type { MarkdownLayoutProps } from "astro";
import type { BlogFrontMatter } from "../pages/types";

export type MainProps = {
  title: string;
};

export type BlogProps = MarkdownLayoutProps<BlogFrontMatter>;
