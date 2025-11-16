// src/hooks/useJIElement.js
import React from "react";
import { JIElement } from "../utils/JIElement";

export function useJIElement(getValues, validators = {}, registryRegister) {
    const ref = React.useRef(null);

    if (!ref.current) {
        ref.current = new JIElement(getValues, validators);
    }

    React.useEffect(() => {
        ref.current.getValues = getValues;
        ref.current.validators = validators;
    }, [getValues, validators]);

    React.useEffect(() => {
        if (typeof registryRegister === "function") {
            const unregister = registryRegister(ref.current);
            return () => unregister && unregister();
        }
    }, [registryRegister]);

    const validate = React.useCallback(() => ref.current.validate(), []);
    const getErrors = React.useCallback(() => ref.current.getErrors(), []);

    return { instance: ref.current, validate, getErrors };
}
