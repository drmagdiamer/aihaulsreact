// Breed.jsx
import React from "react";
import { getMessage } from "../../locales/messages";

function validateBreed(type, children) {
    if (!type?.trim()) {
        throw new Error(getMessage('breed.errorNoType'));
    }
    if (!children) {
        throw new Error(getMessage('breed.errorNoDescription'));
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