type Status = "apierror" | "error" | "success";

export default function AuthStatus(message: string | AuthError, status: Status, injectScript: string | undefined = undefined) {
    return (
        <>
            {status === "error" && (
                <div className="info-card error">
                    <p>Error</p>
                    <p>{message as string}</p>
                </div>
            )}

            {status === "apierror" && (
                <div className="info-card error">
                    <p>Error</p>
                    <div>
                        <p>{(message as AuthError).error}</p>
                        <p>Description: {(message as AuthError).error_description}</p>
                        <p>
                            Help: <a href={(message as AuthError).error_uri}>{(message as AuthError).error_uri}</a>
                        </p>
                    </div>
                </div>
            )}

            {status === "success" && (
                <div className="info-card success">
                    <p>Success!</p>
                    <p>{message as string}</p>
                </div>
            )}

            {injectScript && <div id="script" dangerouslySetInnerHTML={{ __html: injectScript }}></div>}
        </>
    );
}
