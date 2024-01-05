import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
const SITE_URL = import.meta.env.DEV ? "http://localhost:4321" : "https://static-cms-gh-oauth-provider.netlify.app/";


// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  trailingSlash: "never",
  output: "server",
  adapter: netlify(),
  integrations: [react()]
});