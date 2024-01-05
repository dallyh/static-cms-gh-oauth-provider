import type { APIContext } from "astro";
import { randomBytes } from "node:crypto";
import { create } from "@/lib/oauth2/oauth2";
import { getRedirectUri } from "@/utils/getRedirectUri";
import { OAUTH_CONFIG } from "@/config";

const oauthState = randomBytes(16).toString(`hex`);

export async function GET({ request, redirect, cookies }: APIContext) {
    const host = request.headers.get("host");
    const oauth2 = create();

    // TO-DO: Find a way to delete the cookie after the auth is successfull
    cookies.set("oauthState", oauthState, { secure: true });

    const url = oauth2.authorizeURL({
        redirect_uri: getRedirectUri(host),
        scope: OAUTH_CONFIG.scope,
        state: oauthState,
    });

    return redirect(url, 307);
}
