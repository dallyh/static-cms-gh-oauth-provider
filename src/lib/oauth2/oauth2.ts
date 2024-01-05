import { AuthorizationCode, type ModuleOptions } from "simple-oauth2";
import { OAUTH_CONFIG } from "@config";

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

export const renderBody = (status: string, content: any): string => `
<script>
  const receiveMessage = (message) => {
    window.opener.postMessage(
      'authorization:github:${status}:${JSON.stringify(content)}',
      message.origin
    );

    window.removeEventListener("message", receiveMessage, false);
  }

  const status = "${status}";
  const timeout = status === "success" ? 1000 : 5000;

  setTimeout(() => {
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  }, timeout);
</script>
`;

export default {};
