import type { AstroCookies } from "astro";

export function validateState(state: string, cookies: AstroCookies) {
    const cookieState = cookies.get("oauthState");

    if (cookieState === undefined) {
        return false;
    }

    if (state !== cookieState.value) {
        return false;
    }

    return true;
}