import { AuthorizationCode, type ModuleOptions } from "simple-oauth2";
import { OAUTH_CONFIG } from "@config";
import { getRedirectUri } from "@/utils/getRedirectUri";
import type { AstroCookies } from "astro";

export type AuthError = Record<"error" | "error_description" | "error_uri", string>;
export type OAuthToken = {
    access_token: string;
};

export async function getToken(code: string, host: string | null): Promise<OAuthToken | AuthError> {
    const oauth2 = create();
    const accessToken = await oauth2.getToken({
        code,
        redirect_uri: getRedirectUri(host),
    });

    const { token } = oauth2.createToken(accessToken.token);

    if ("error" in token) {
        return token as AuthError;
    }

    return token as OAuthToken;
}

export function validateState(state: string, cookies: AstroCookies) {
    const cookieState = cookies.get("oauthState");
    cookies.delete("oauthState");

    if (cookieState === undefined) {
        return false;
    }

    if (state !== cookieState.value) {
        return false;
    }

    return true;
}

export const create = (): AuthorizationCode => {
    const optinos: ModuleOptions = {
        client: {
            id: import.meta.env.OAUTH_CLIENT_ID!,
            secret: import.meta.env.OAUTH_CLIENT_SECRET!,
        },
        auth: {
            tokenHost: OAUTH_CONFIG.tokenHost,
            tokenPath: OAUTH_CONFIG.tokenPath,
            authorizePath: OAUTH_CONFIG.authorizePath,
        },
    };

    return new AuthorizationCode(optinos);
};

export const renderScript = (status: string, content: any): string => `
<script>
  const receiveMessage = (message) => {
    window.opener.postMessage(
      'authorization:github:${status}:${JSON.stringify(content)}',
      message.origin
    );

    window.removeEventListener("message", receiveMessage, false);
  }

  const status = "${status}";
  const timeout = status === "success" ? ${OAUTH_CONFIG.success_close_timeout} : ${OAUTH_CONFIG.error_close_timeout};

  setTimeout(() => {
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  }, timeout);
</script>
`;

export default {};
