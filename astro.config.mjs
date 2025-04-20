import netlify from "@astrojs/netlify/functions";
import sitemap from '@astrojs/sitemap';
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://milliorn-portfolio.netlify.app", // ← helpful for meta helpers, RSS, SEO
  output: "server",
  adapter: netlify({
    // https://docs.astro.build/en/guides/integrations-guide/netlify/#caching-pages
    cacheOnDemandPages: true
  }),
  // https://docs.astro.build/en/guides/integrations-guide/netlify/#netlify-image-cdn-support
  image: {
    domains: ['https://picsum.photos']
  },
  integrations: [
    sitemap({
      i18n: {
        // https://docs.astro.build/en/guides/integrations-guide/sitemap/#i18n
        defaultLocale: 'en', // All urls that don't contain `es` or `fr` after `https://website.com/` will be treated as default locale, i.e. `en`
        locales: {
          en: 'en-US', // The `defaultLocale` value must present in `locales` keys
        },
      },
    }),
  ],
});
