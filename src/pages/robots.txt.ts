import type { APIRoute } from "astro";

// https://docs.astro.build/en/guides/integrations-guide/sitemap/#sitemap-link-in-robotstxt

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL));
};
