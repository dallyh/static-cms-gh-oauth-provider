import { OAUTH_CONFIG } from "@/config";

type Status = "apierror" | "error" | "success";

export default function AuthStatus(message: string | AuthError, status: Status, injectScript: string | undefined = undefined) {
    return (
        <>
            {status === "error" && (
                <div className="status-card error">
                    <p className="title">An error occured</p>
                    <p>{message as string}</p>
                    <p>Tab will close in {OAUTH_CONFIG.error_close / 1000} second(s)...</p>
                </div>
            )}

            {status === "apierror" && (
                <div className="status-card error">
                    <p className="title">An error occured</p>
                    <div className="status-meta">
                        <p>{(message as AuthError).error}</p>
                        <p>Description: {(message as AuthError).error_description}</p>
                        <p>
                            Help: <a href={(message as AuthError).error_uri}>{(message as AuthError).error_uri}</a>
                        </p>
                    </div>
                    <p>Tab will close in {OAUTH_CONFIG.error_close / 1000} second(s)...</p>
                </div>
            )}

            {status === "success" && (
                <div className="status-card success">
                    <p className="title">Success!</p>
                    <p>{message as string}</p>
                    <p>Tab will close in {OAUTH_CONFIG.success_close / 1000} seconds...</p>
                </div>
            )}

            {injectScript && <div id="script" dangerouslySetInnerHTML={{ __html: injectScript }}></div>}
        </>
    );
}
