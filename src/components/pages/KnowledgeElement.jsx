import React from "react";
import Fact from "./Fact.jsx";

export default function KnowledgeElement({
 id,
 index = 0,
 onRemove,
 isDisabled,
 onFactsChange,
 onValidate,
 showErrors = false,
}) {
    const [facts, setFacts] = React.useState([{ id: 0, name: "", information: "" }]);
    const nextId = React.useRef(1);
    const [factValidity, setFactValidity] = React.useState({});

    // Add a new fact
    const handleAddFact = React.useCallback(() => {
        const newFact = {
            id: nextId.current++,
            name: "",
            information: "",
        };

        setFacts((prevFacts) => [...prevFacts, newFact]);
    }, []);

    // Remove a fact except if it's the last one
    const handleRemoveFact = React.useCallback((factId) => {
        setFacts((prevFacts) => {
            if (prevFacts.length <= 1) return prevFacts;
            return prevFacts.filter((fact) => fact.id !== factId);
        });
    }, []);

    // Update a fact
    const handleFactChange = React.useCallback((factId, updatedFields) => {
        setFacts((prevFacts) =>
            prevFacts.map((fact) =>
                fact.id === factId ? { ...fact, ...updatedFields } : fact
            )
        );
    }, []);



    // Handling validation from individual facts
    const handleFactValidate = React.useCallback((validationData) => {
        if (!validationData) return;
        const { factId, isValid, errors } = validationData;
        setFactValidity((prev) => ({ ...prev, [factId]: { isValid, errors } }));
    }, []);

    // Computing element validity
    const isElementValid = React.useMemo(() => {
        if (!facts.length) return false;
        return facts.every((f) => factValidity[f.id]?.isValid === true);
    }, [facts, factValidity]);

    // Notify parent about validation status
    React.useEffect(() => {
        onValidate?.({
            elementId: id,
            isValid: isElementValid,
        });
    }, [id, isElementValid, onValidate]);

    // Notify parent about facts change
    React.useEffect(() => {
        onFactsChange?.(id, facts);
    }, [id, facts, onFactsChange]);

    return (
        <div className="container my-4">
            <div className="card shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0 text-primary">Knowledge Element #{index + 1}</h5>
                    <button
                        type="button"
                        className={`btn btn-sm ${
                            isDisabled ? "btn-outline-secondary" : "btn-outline-danger"
                        }`}
                        onClick={onRemove}
                        disabled={isDisabled}
                    >
                        Remove Element
                    </button>
                </div>

                {/* Facts list */}
                {facts.map((fact, fIdx) => (
                    <Fact
                        key={fact.id}
                        factId={fact.id}
                        index={fIdx}
                        name={fact.name}
                        information={fact.information}
                        onRemove={() => handleRemoveFact(fact.id)}
                        onChange={(patch) => handleFactChange(fact.id, patch)}
                        onValidate={handleFactValidate}
                        isDisabled={facts.length <= 1}
                        showErrors={showErrors}
                    />
                ))}

                {/* Display element error if invalid */}
                {!isElementValid && showErrors && (
                    <div className="alert alert-warning mb-0">
                        Please complete all facts in this element.
                    </div>
                )}

                {/* Add new fact */}
                <div className="text-end mt-3">
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={handleAddFact}
                    >
                        + Add Fact
                    </button>
                </div>
            </div>
        </div>
    );
}
