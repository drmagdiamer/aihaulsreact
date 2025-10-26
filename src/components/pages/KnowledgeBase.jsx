import React from "react";
import KnowledgeList from "../KnowledgeList.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

const ENDPOINT = "http://localhost:8777/api/knowledge-base/";

export default function KnowledgeBase() {

    const [payload, setPayload] = React.useState({ data: [] });
    const [loading, setLoading] = React.useState(false);

    const [showErrors, setShowErrors] = React.useState(false);
    const [isValid, setIsValid] = React.useState(false);
    const [toast, setToast] = React.useState(null);
    const [submitTick, setSubmitTick] = React.useState(0);

    // Handlers
    const handleValidate = ({ isValid, value }) => {
        setIsValid(isValid);
        setPayload(value);
    };

    const showToast = React.useCallback((message, type = "success") => {
        setToast({ message, type, timestamp: Date.now() });
        setTimeout(() => setToast(null), 3000);
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowErrors(true);
        setSubmitTick(t => t + 1);
        if (!isValid) return;

        try {
            setLoading(true);
            const res = await fetch(ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error(`Server error: ${res.status}`);

            setShowErrors(false);
            showToast("Saved successfully.", "success"); // success toast
        } catch (err) {
            showToast(err.message || "Something went wrong.", "error"); // error toast
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />

            {toast && (
                <div
                    className={`toast align-items-center border-0 show position-fixed top-0 end-0 m-3 ${
                        toast.type === "success" ? "text-bg-success" : "text-bg-danger"
                    }`}
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    style={{ zIndex: 2000, minWidth: "280px" }}
                >
                    <div className="d-flex">
                        <div className="toast-body">{toast.message}</div>
                        <button
                            type="button"
                            className={`btn-close ${toast.type === "success" ? "" : "btn-close-white"} me-2 m-auto`}
                            aria-label="Close"
                            onClick={() => setToast(null)}
                        ></button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="container my-4">
                <div className="mb-3">
                    <h4 className="mb-1">Knowledge Builder</h4>
                </div>

                <KnowledgeList
                    onValidate={handleValidate}
                    showErrors={showErrors}
                    submitTick={submitTick}
                />

                <div className="d-flex justify-content-end gap-2 mt-3">
                    <button type="submit" className="btn btn-dark" disabled={loading}>
                        {loading ? "Saving..." : "Submit"}
                    </button>
                </div>

                {/* Live JSON preview */}
                <div className="card mt-4 shadow-sm">
                    <div className="card-header bg-light fw-bold">Live Payload Preview</div>
                    <div className="card-body">
            <pre className="small text-muted mb-0">
                {JSON.stringify(payload, null, 2)}
            </pre>
                    </div>
                </div>
            </form>

            <Footer />
        </div>
    );
}
