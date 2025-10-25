import React from "react";
import KnowledgeElement from "./pages/KnowledgeElement.jsx";

export default function KnowledgeList({
onValidate,
showErrors = false
}) {

    const [elements, setElements] = React.useState([{ id: 1, name: "" }]);
    const nextId = React.useRef(2);
    const [elementFacts, setElementFacts] = React.useState([]);
    const [elementValidity, setElementValidity] = React.useState({});


    // Adding and removing knowledge elements
    const addKnowledgeElement = () => {
        const newEl = { id: nextId.current++, name: "" };
        setElements((prev) => [...prev, newEl]);
    };

    const removeKnowledgeElement = (id) => {
        if (elements.length <= 1) return;
        // Remove element
        setElements((prev) => prev.filter((e) => e.id !== id));
        // Remove facts entry
        setElementFacts((prev) => prev.filter((entry) => entry.id !== id));
        // Remove validity entry
        setElementValidity((prev) => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
        });
    };

    // Handling validation from individual knowledge elements
    const handleElementValidate = React.useCallback((validationData) => {
        if (!validationData) return;
        const { elementId, isValid } = validationData;
        setElementValidity((prev) => ({ ...prev, [elementId]: isValid }));
    }, []);

    // Overall validity of the knowledge list
    const allValid = React.useMemo(() => {
        if (!elements.length) return false;
        return elements.every((el) => elementValidity[el.id] === true);
    }, [elements, elementValidity]);

    // Handling facts change from individual knowledge elements for payload
    const handleFactsChange = React.useCallback((elementId, facts) => {
        setElementFacts((prevFacts) => {
            const elementExists = prevFacts.some((e) => e.id === elementId);

            if (elementExists) {
                return prevFacts.map((e) =>
                    e.id === elementId ? { ...e, facts } : e
                );
            } else {
                return [...prevFacts, { id: elementId, facts }];
            }
        });
    }, []);

    // Constructing the payload to send to parent
    const payloadArray = React.useMemo(() => {
        return elements.map((el) => {
            const match = elementFacts.find((e) => e.id === el.id);
            return match ? { id: el.id, name: el.name, facts: match.facts } : { id: el.id, name: el.name, facts: [] };
        });
    }, [elements, elementFacts]);

    const payload = React.useMemo(() => ({ data: payloadArray }), [payloadArray]);

    // Notify parent about validation status and payload
    React.useEffect(() => {
        onValidate?.({ isValid: allValid, value: payload });
    }, [allValid, payload, onValidate]);

    return (
        <div className="container my-4">
            {elements.map((element, index) => (
                <KnowledgeElement
                    key={element.id}
                    id={element.id}
                    index={index}
                    onRemove={() => removeKnowledgeElement(element.id)}
                    isDisabled={elements.length <= 1}
                    onFactsChange={handleFactsChange}
                    onValidate={handleElementValidate}
                    showErrors={showErrors}
                />
            ))}

            <div className="d-flex justify-content-end mt-3">
                <button type="button" className="btn btn-outline-success" onClick={addKnowledgeElement}>
                    + Add Knowledge Element
                </button>
            </div>
        </div>
    );
}
