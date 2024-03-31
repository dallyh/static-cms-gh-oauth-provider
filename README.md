This is an [Astro](https://astro.build/) project which faciliates OAuth flow to use with [Static CMS/Decap CMS](https://staticcms.org).

## Usage

Firstly install packages with `npm install` and then run development server with `npm run dev`.
Then set up GitHub OAuth application, where redirect URL should be `https://example.com/api/auth/done`. Everything else does not matter.
Place the Client ID, Client Secret and Site URL into their corresponding environment variables.

After all of this is done, it can be hosted for example on [Netlify](https://netlify.com) or any other provider, that supports Astro.

## Routes

-   `/api/auth`: faciliates redirect to GitHub's `/login/oauth/authorize` api with the required parameters
-   `/api/auth/done`: uses the `authorization code` to obtain `access_token` and injects the required script with the provided data to authorize Static CMS with GitHub. Also displays if something goes wrong.

## Environment variables

For this application to work, those environment variables have to be set (keep them secret),

-   **OAUTH_CLIENT_ID**: GitHub OAuth application client id
-   **OAUTH_CLIENT_SECRET**: GitHub OAuth application client secret
-   **SITE_URL**: Sets the Site URL for production build in the config

## Credits

Many thanks goes to:

-   Tyler Gaw for [this blog post](https://tylergaw.com/blog/netlify-cms-custom-oath-provider/) and [this example](https://github.com/tylergaw/netlify-cms-github-oauth-provider-server-example)
-   Václav Klecanda for [his version of the provider](https://github.com/vencax/netlify-cms-github-oauth-provider)
-   [Daniel Lautzenheiser](https://github.com/KaneFreeman) for [this example](https://github.com/StaticJsCMS/static-cms-next-vercel-template/tree/main)

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3010`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
| `npm run prettier`        | Runs prettier on the `root` directory.           |
