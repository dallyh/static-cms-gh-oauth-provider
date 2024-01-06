import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import global from "astro-global";
import { loadEnv } from "vite";
const { SITE_URL, MODE } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

const PORT = 3010;
const URL = MODE === "development" ? `http://localhost:${PORT}` : SITE_URL;

// https://astro.build/config
export default defineConfig({
    site: URL,
    server: {
        port: PORT,
        host: false,
    },
    trailingSlash: "never",
    output: "server",
    adapter: netlify(),
    integrations: [global()],
});
