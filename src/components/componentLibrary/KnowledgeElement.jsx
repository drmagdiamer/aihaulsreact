import React from "react";
import Fact from "./Fact.jsx";
import { useJIElement } from "../../hooks/useJIElement.js";
import { JIRegistryContext } from "../../context/JIRegistryContext.js";
import messages from "../../localizations/en.js";

export default function KnowledgeElement({
 id,
 index = 0,
 onRemove,
 isDisabled,
 onFactsChange,
 }) {
    const [facts, setFacts] = React.useState([{ id: 0, name: "", information: "" }]);
    const nextId = React.useRef(1);

    const { register, setForceShowErrors } = React.useContext(JIRegistryContext);

    // Add new fact
    const handleAddFact = React.useCallback(() => {
        const newFact = {
            id: nextId.current++,
            name: "",
            information: "",
        };
        setForceShowErrors(false);
        setFacts((prevFacts) => [...prevFacts, newFact]);
    }, []);

    // Remove a fact except if it's the last one
    const handleRemoveFact = React.useCallback((factId) => {
        setFacts((prevFacts) => {
            if (prevFacts.length <= 1) return prevFacts;
            return prevFacts.filter((fact) => fact.id !== factId);
        });
    }, []);

    // Update a fact field
    const handleFactChange = React.useCallback((factId, updatedFields) => {
        setFacts((prevFacts) =>
            prevFacts.map((fact) =>
                fact.id === factId ? { ...fact, ...updatedFields } : fact
            )
        );
    }, []);



    // JIElement: KnowledgeElement level validation
    const validators = React.useMemo(

        () => ({
            hasFacts: (v) => ({
                valid: facts.length > 0,
                message: messages.knowledge.validation.mustHaveFact
            })
        }),
        [facts]
    );

    const getValues = React.useCallback(
        () => ({ facts }),
        [facts]
    );

    // Register with validation registry
    const { getErrors } = useJIElement(getValues, validators, register);
    const errors = getErrors();
    const hasFactsError = !errors.hasFacts.valid;


    // Send data change to parent (form payload)
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

                {/* List of Facts */}
                {facts.map((fact, fIdx) => (
                    <Fact
                        key={fact.id}
                        factId={fact.id}
                        index={fIdx}
                        name={fact.name}
                        information={fact.information}
                        onRemove={() => handleRemoveFact(fact.id)}
                        onChange={(patch) => handleFactChange(fact.id, patch)}
                        isOnlyFact={facts.length <= 1}
                    />
                ))}

                {/* Add new Fact button */}
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
