// Breed.jsx
import React from "react";

function validateBreed(type, children) {
    if (!type?.trim()) {
        throw new Error("Each Breed must have a non-empty 'type'.");
    }
    if (!children) {
        throw new Error("Each Breed must have a description (children).");
    }
}

function Breed({ type, children }) {
    validateBreed(type, children);

    return (
        <li>
            <span>
                {type}: {children}
            </span>
        </li>
    );
}

export default Breed;