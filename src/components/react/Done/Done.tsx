"use server"

import AuthStatus from "@/components/react/AuthStatus/AuthStatus";
import { getToken } from "@/lib/oauth2/getToken";
import { renderBody } from "@/lib/oauth2/oauth2";
import { validateState } from "@/lib/oauth2/validateState";
import Astro from "astro:global";

interface Props {
    searchParams: SearchParams
}

type SearchParams = AuthError | CallbackParams;

const Done = ({searchParams} : Props) => {
    if (searchParams === undefined) {
        return AuthStatus("There were no query parameters.", "error");
    }

    if ("error" in searchParams) {
        return AuthStatus(searchParams as AuthError, "apierror");
    }

    if (!validateState(searchParams.state, Astro.cookies)) {
        return AuthStatus("The OAuth state did not match!", "error");
    }

    const headersList = Astro.request.headers;
    const host = headersList.get("host");

    searchParams = searchParams as CallbackParams;
    const result = await getToken(searchParams.code, host);

    if ("error" in result) {
        const injectScript = renderBody("error", result);
        return <div>{AuthStatus(result, "apierror", injectScript)}</div>;
    }

    const injectScript = renderBody("success", { token: result.access_token, provider: "github" });
    return <div>{AuthStatus("Authorized!", "success", injectScript)}</div>;

    return (
        <>
            <div>
                TEST
            </div>
        </>
    )
};

export default Done;
