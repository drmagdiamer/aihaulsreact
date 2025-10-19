import React, { useMemo, useState } from "react";

// --- Helpers (plain JS / JSX version) ---
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));
const ENDPOINT = "https://mySite/knowledge/build";

// UUID generator
const newId = () => crypto.randomUUID();

// Use UUIDs
const emptyFact = (id = newId()) => ({
    id,
    name: "",
    information: ""
});

const emptyElement = (id = newId()) => ({
    id,
    name: "",
    facts: [emptyFact()] // fact gets its own UUID too
});

export default function KnowledgeBuilderPage() {
    const [elements, setElements] = useState([emptyElement()]);

    // TODO: Rename `busy` to `loading` for clarity.
    const [busy, setBusy] = useState(false);

    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    // TODO: Decide if `useMemo` for `payload` is necessary
    const payload = useMemo(() => ({ knowledgeBase: elements }), [elements]);

    function updateElement(idx, patch) {
        setElements((prev) => prev.map((el, i) => (i === idx ? { ...el, ...patch } : el)));
    }

    function updateFact(elIdx, factIdx, patch) {
        setElements((prev) =>
            prev.map((el, i) => {
                if (i !== elIdx) return el;
                const facts = el.facts.map((f, j) => (j === factIdx ? { ...f, ...patch } : f));
                return { ...el, facts };
            })
        );
    }

    function addElement() {
        setElements((prev) => [...prev, emptyElement()]);
    }

    function removeElement(idx) {
        setElements((prev) => prev.filter((_, i) => i !== idx));
    }

    function addFact(elIdx) {
        setElements((prev) =>
            prev.map((el, i) => {
                if (i !== elIdx) return el;
                return { ...el, facts: [...el.facts, emptyFact()] };
            })
        );
    }

    function removeFact(elIdx, factIdx) {
        setElements((prev) =>
            prev.map((el, i) => {
                if (i !== elIdx) return el;
                const facts = el.facts.filter((_, j) => j !== factIdx);
                return { ...el, facts: facts.length ? facts : [emptyFact()] };
            })
        );
    }

    // TODO check any missing validation
    function validate(p) {
        const errs = [];
        if (!p.knowledgeBase.length) errs.push("Add at least one Knowledge Element.");
        p.knowledgeBase.forEach((el, i) => {
            if (!el.name?.trim()) errs.push(`Element #${i + 1}: name is required.`);
            if (!el.facts?.length) errs.push(`Element #${i + 1}: add at least one fact.`);
            el.facts.forEach((f, j) => {
                if (!f.name?.trim()) errs.push(`Element #${i + 1} · Fact #${j + 1}: name is required.`);
                if (!f.information?.trim())
                    errs.push(`Element #${i + 1} · Fact #${j + 1}: information is required.`);
            });
        });
        return errs;
    }

    async function send() {
        setMessage(null);
        setError(null);
        const toSend = deepClone(payload);
        const errs = validate(toSend);
        if (errs.length) {
            setError(errs.join("\n"));
            return;
        }

        try {
            setBusy(true);
            const res = await fetch(ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(toSend),
            });
            if (!res.ok) {
                const text = await res.text().catch(() => "");
                throw new Error(`HTTP ${res.status}${text ? ` — ${text}` : ""}`);
            }
            setMessage("Sent successfully.");
        } catch (e) {
            setError(`Failed to send: ${e?.message ?? e}`);
        } finally {
            setBusy(false);
        }
    }

    // TODO Remove in production
    async function copyJson() {
        try {
            await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
            setMessage("JSON copied to clipboard.");
        } catch {
            setError("Could not copy to clipboard.");
        }
    }

    return (
        <div className="min-vh-100 bg-light text-dark p-4">
            <div className="container">
                <header className="mb-4 d-flex flex-column gap-2 gap-sm-3 flex-sm-row align-items-sm-end justify-content-sm-between">
                    <div>
                        <h1 className="h4 fw-bold mb-1">Knowledge Builder</h1>
                    </div>
                </header>

                {error && (
                    <div className="alert alert-danger" style={{ whiteSpace: "pre-line" }}>
                        {error}
                    </div>
                )}
                {message && <div className="alert alert-success">{message}</div>}

                {/* Elements List */}
                <div className="d-flex flex-column gap-3">
                    {elements.map((el, elIdx) => (
                        <div key={el.id || elIdx} className="card border-0 shadow-sm">
                            <div className="card-header bg-white d-flex align-items-center justify-content-between">
                                <div className="fw-semibold">Knowledge Element #{elIdx + 1}</div>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-sm btn-light" onClick={() => addFact(elIdx)} type="button">
                                        + Add Fact
                                    </button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeElement(elIdx)} type="button">
                                        Remove Element
                                    </button>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-sm-12">
                                        <label className="form-label small text-secondary">Element Name</label>
                                        <input
                                            className="form-control"
                                            value={el.name}
                                            onChange={(e) => updateElement(elIdx, { name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Facts */}
                                <div className="mt-3 d-flex flex-column gap-3">
                                    {el.facts.map((f, fIdx) => (
                                        <div key={f.id || fIdx} className="border rounded-3 p-3">
                                            <div className="d-flex align-items-center justify-content-between mb-2">
                                                <div className="small fw-medium text-secondary">Fact #{fIdx + 1}</div>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => removeFact(elIdx, fIdx)}
                                                    type="button"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            <div className="row g-2 row-cols-1 row-cols-sm-2">
                                                <div className="col">
                                                    <label className="form-label small text-secondary">Fact Name</label>
                                                    <input
                                                        className="form-control"
                                                        value={f.name}
                                                        onChange={(e) => updateFact(elIdx, fIdx, { name: e.target.value })}
                                                    />
                                                </div>
                                                <div className="col">
                                                    <label className="form-label small text-secondary">Information</label>
                                                    <input
                                                        className="form-control"
                                                        value={f.information}
                                                        onChange={(e) => updateFact(elIdx, fIdx, { information: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/*  // TODO: Remove JSON preview / Copy JSON in production or behind a dev flag.*/}
                {/* Actions */}
                <div className="mt-4 d-flex flex-wrap align-items-center gap-2">
                    <button onClick={addElement} className="btn btn-primary" type="button">
                        + Add Knowledge Element
                    </button>
                    <button onClick={copyJson} className="btn btn-dark" type="button">
                        Copy JSON
                    </button>
                    <button onClick={send} disabled={busy} className={`btn btn-success${busy ? " disabled" : ""}`} type="button">
                        {busy ? "Sending…" : "Send to Endpoint"}
                    </button>
                </div>

                {/* JSON Preview */}
                <section className="mt-4">
                    <h2 className="h6 fw-semibold text-secondary mb-2">Live JSON Preview</h2>
                    <pre className="border rounded p-3 bg-white small" style={{ maxHeight: 380, overflow: "auto", lineHeight: 1.6 }}>
                        {JSON.stringify(payload, null, 2)}
                    </pre>
                </section>
            </div>
        </div>
    );
}
