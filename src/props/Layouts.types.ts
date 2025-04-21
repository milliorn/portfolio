import type { MarkdownLayoutProps } from "astro";

export type BlogProps = MarkdownLayoutProps<{
  poster: string;
  subtitle: string;
  title: string;
}>;

export type MainProps = {
  title: string;
};
