import React from "react";
import { JIRegistryContext } from "./JIRegistryContext";

export function ValidationProvider({ children }) {
    const registryRef = React.useRef(new Map());
    const [forceShowErrors, setForceShowErrors] = React.useState(false);

    const register = React.useCallback((element) => {
        const id = Symbol("ji-element");
        registryRef.current.set(id, element);

        return () => registryRef.current.delete(id);
    }, []);

    const validateAll = React.useCallback(() => {
        let allValid = true;
        const errors = {};

        for (const [id, element] of registryRef.current.entries()) {
            const ok = element.validate();
            const err = element.getErrors();
            if (!ok) allValid = false;
            errors[id.toString()] = err;
        }

        return { allValid, errors };
    }, []);

    return (
        <JIRegistryContext.Provider
            value={{
                register,
                validateAll,
                forceShowErrors,
                setForceShowErrors,
            }}
        >
            {children}
        </JIRegistryContext.Provider>
    );
}
