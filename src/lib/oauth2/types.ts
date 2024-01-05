type CallbackParams = Record<"code" | "state" , string>;

type AuthError = Record<"error" | "error_description" | "error_uri", string>;

type OAuthToken = {
    access_token: string;
};
