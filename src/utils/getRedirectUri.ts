export function getRedirectUri(host: string | null): string {
    return import.meta.env.DEV  ? `http://${host}/api/callback` : `https://${host}/api/callback`
}