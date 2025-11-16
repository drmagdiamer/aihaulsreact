import React from "react";
import KnowledgeElement from "./KnowledgeElement.jsx";
import {JIRegistryContext} from "../../context/JIRegistryContext.js";

export default function KnowledgeList({ onPayloadChange }) {
    const [elements, setElements] = React.useState([{ id: 1, name: "" }]);
    const nextId = React.useRef(2);
    const { setForceShowErrors } = React.useContext(JIRegistryContext);
    const [elementFacts, setElementFacts] = React.useState([]);

    // Add new KnowledgeElement
    const addKnowledgeElement = () => {
        const newEl = { id: nextId.current++, name: "" };
        setForceShowErrors(false)
        setElements((prev) => [...prev, newEl]);
    };

    // Remove a KnowledgeElement (minimum 1)
    const removeKnowledgeElement = (id) => {
        if (elements.length <= 1) return;

        setElements((prev) => prev.filter((e) => e.id !== id));
        setElementFacts((prev) => prev.filter((entry) => entry.id !== id));
    };

    // Update facts under a specific KnowledgeElement (used for payload construction)
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

    // Build payload to send to parent
    React.useEffect(() => {
        const payload = {
            data: elements.map((el) => {
                const match = elementFacts.find((e) => e.id === el.id);
                return match
                    ? { id: el.id, name: el.name, facts: match.facts }
                    : { id: el.id, name: el.name, facts: [] };
            }),
        };

        onPayloadChange?.(payload);
    }, [elements, elementFacts, onPayloadChange]);

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
