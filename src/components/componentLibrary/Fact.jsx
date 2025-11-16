import React from "react";
import { useContext } from "react";
import { JIRegistryContext } from "../../context/JIRegistryContext.js";
import { useJIElement } from "../../hooks/useJIElement.js";
import messages from "../../localizations/en.js";

export default function Fact({
 index = 0,
 name = "",
 information = "",
 onRemove,
 onChange,
 isOnlyFact = false,
}) {
    const [touched, setTouched] = React.useState({ name: false, information: false });
    const { register, forceShowErrors } = useContext(JIRegistryContext);


    const validators = React.useMemo(
        () => ({
            name: (v) => {
                if (!v?.trim()) {
                    return { valid: false, message: messages.fact.validation.nameRequired };
                }
                return { valid: true };
            },
            information: (v) => {
                if (!v?.trim()) {
                    return { valid: false, message: messages.fact.validation.infoRequired};
                }
                return { valid: true };
            }
        }),
        []
    );


    const getValues = React.useCallback(
        () => ({ name, information }),
        [name, information]
    );

    const { validate, getErrors } = useJIElement(getValues, validators, register);


    const handleBlur = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    // handle errors
    const errors = getErrors();
    const isValid = validate();
    const nameError = (touched.name || forceShowErrors) && !errors.name.valid;
    const infoError = (touched.information || forceShowErrors) && !errors.information.valid;

    React.useEffect(() => {
        if (!forceShowErrors) {
            setTouched({ name: false, information: false });
        }
    }, [forceShowErrors]);

    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0">Fact #{index + 1}</h6>
                    <button
                        type="button"
                        className={`btn btn-sm ${isOnlyFact ? "btn-outline-secondary" : "btn-outline-danger"}`}
                        onClick={onRemove}
                        disabled={isOnlyFact}
                    >
                        Remove
                    </button>
                </div>

                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="factName"
                            className={`form-control ${nameError? "is-invalid" : ""}`}
                            placeholder="Enter fact name..."
                            value={name}
                            onInput={(e) => onChange?.({ name: e.currentTarget.value })}
                            onBlur={() => handleBlur("name")}
                        />
                        { nameError && <div className="invalid-feedback">{errors.name.message}</div>}
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Information</label>
                        <input
                            type="text"
                            className={`form-control ${infoError ? "is-invalid" : ""}`}
                            placeholder="Enter information..."
                            value={information}
                            onInput={(e) => onChange?.({ information: e.currentTarget.value })}
                            onBlur={() => handleBlur("information")}
                        />
                        { infoError && <div className="invalid-feedback">{errors.information.message}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
