import React from "react";

export default function Fact({
 factId,
 index = 0,
 name = "",
 information = "",
 onRemove,
 onChange,
 onValidate,
 isOnlyFact = false,
 showErrors = false,
}) {
    const [touched, setTouched] = React.useState({ name: false, information: false });

    const handleBlur = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };
    // Validation logic
    const errors = {
        name: !name?.trim() ? "Name is required." : "",
        information: !information?.trim() ? "Information is required." : "",
    };

    // handle errors
    const isValid = !errors.name && !errors.information;
    const nameError = (touched.name || showErrors) && errors.name;
    const infoError = (touched.information || showErrors) && errors.information;


    // Notify parent about validation status
    React.useEffect(() => {
        onValidate?.({ factId, errors, isValid });
    }, [factId, errors.name, errors.information, isValid, onValidate]);


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
                        { nameError && <div className="invalid-feedback">{errors.name}</div>}
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
                        { infoError && <div className="invalid-feedback">{errors.information}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
