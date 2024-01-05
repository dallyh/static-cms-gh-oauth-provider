import { OAUTH_CONFIG } from "@/config";

export function getRedirectUri(host: string | null): string {
    const uri = import.meta.env.DEV  ? `http://${host}${OAUTH_CONFIG.redirect_uri}` : `https://${host}${OAUTH_CONFIG.redirect_uri}`
    console.log(`Redirect URI: ${uri}`);

    return uri;
}