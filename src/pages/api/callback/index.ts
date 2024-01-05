import type { APIContext } from "astro";

export async function GET({ request, redirect }: APIContext) {
    const url = new URL(request.url);

    // When this runs on the server, the port 80 is preserved, thus failing with an error
    if (process.env.NODE_ENV === "production") {
        url.port = "";
    }

    const redirectUrl = new URL(`/done${url.search}`, request.url);
    return redirect(redirectUrl.toString(), 301);
}
