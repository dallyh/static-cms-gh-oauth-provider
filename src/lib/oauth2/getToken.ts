import { getRedirectUri } from "@/utils/getRedirectUri";
import { create } from "./oauth2";

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