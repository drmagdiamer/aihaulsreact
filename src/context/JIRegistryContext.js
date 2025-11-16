import React from "react";

export const JIRegistryContext = React.createContext({
    register: (_element) => () => {},       // Called by components that want to register validation
    validateAll: () => ({ allValid:true, errors: {} }),
    forceShowErrors: false,
    setForceShowErrors: () => {}
});
