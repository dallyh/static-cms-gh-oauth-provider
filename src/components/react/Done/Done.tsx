"use server"

import AuthStatus from "@/components/react/AuthStatus/AuthStatus";
import { getToken } from "@/lib/oauth2/getToken";
import { renderBody } from "@/lib/oauth2/oauth2";
import { validateState } from "@/lib/oauth2/validateState";
import Astro from "astro:global";
import { useEffect, useState } from "react";

type SearchParams = AuthError | CallbackParams;

const Done = () => {
    const [result, setResult] = useState<AuthError | OAuthToken>();
    const params = Astro.url.searchParams;
    const searchParams = Object.fromEntries(params);

    if ("error" in searchParams) {
        return AuthStatus(searchParams as AuthError, "apierror");
    }

    console.log(searchParams.state);

    if (!validateState(searchParams.state, Astro.cookies)) {
        return AuthStatus("The OAuth state did not match!", "error");
    }

    const headersList = Astro.request.headers;
    const host = headersList.get("host");

    useEffect(() => {
        async function getData() {
            const result = await getToken((searchParams as CallbackParams).code, host);
            setResult(result);
        }
        getData();
    }, [])

    if (result === undefined) {
        return <div>{AuthStatus("Could not get data.", "error")}</div>;
    }

    if ("error" in result) {
        const injectScript = renderBody("error", result);
        return <div>{AuthStatus(result, "apierror", injectScript)}</div>;
    }

    const injectScript = renderBody("success", { token: result.access_token, provider: "github" });
    return <div>{AuthStatus("Authorized!", "success", injectScript)}</div>;
};

export default Done;
