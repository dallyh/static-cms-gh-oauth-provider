import AuthStatus from "@/components/react/AuthStatus/AuthStatus";
import { getToken } from "@/lib/oauth2/getToken";
import { renderBody } from "@/lib/oauth2/oauth2";
import { validateState } from "@/lib/oauth2/validateState";
import Astro from "astro:global";
import React from "react";
import { Component, type FC } from "react";

const RenderPage = async () => {
    /*const params = Astro.url.searchParams;
    const searchParams = Object.fromEntries(params);

    if ("error" in searchParams) {
        return AuthStatus(searchParams as AuthError, "apierror");
    }

    if (!validateState(searchParams.state, Astro.cookies)) {
        return AuthStatus("The OAuth state did not match!", "error");
    }

    const headersList = Astro.request.headers;
    const host = headersList.get("host");
    const result = await getToken((searchParams as CallbackParams).code, host);

    if (result === undefined) {
        return AuthStatus("Could not get data.", "error");
    }

    if ("error" in result) {
        const injectScript = renderBody("error", result);
        return AuthStatus(result, "apierror", injectScript);
    }

    const injectScript = renderBody("success", { token: result.access_token, provider: "github" });
    return AuthStatus("Authorized!", "success", injectScript);*/

    return <div>Good morning!</div>;
};

class Done extends React.Component {
    componentDidMount() {
        console.log("Test");
    }

    render() {
        return <h2>Hi, I am a Car!</h2>;
    }
}

export default Done;
