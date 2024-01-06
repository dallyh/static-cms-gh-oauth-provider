export const OAUTH_CONFIG = {
    tokenHost: "https://github.com",
    tokenPath: "/login/oauth/access_token",
    authorizePath: "/login/oauth/authorize",
    redirect_uri: "/api/auth/done",
    scope: "repo,user",
    client_id: import.meta.env.OAUTH_CLIENT_ID,
    client_secret: import.meta.env.OAUTH_CLIENT_SECRET,
    success_close_timeout: 1000,
    error_close_timeout: 5000,
};
