import React from "react";

export default function Fact({
 factId,
 index = 0,
 name = "",
 information = "",
 onRemove,
 onChange,
 onValidate,
 isDisabled = false,
 showErrors = false,
}) {

    // Validation logic
    const errors = {
        name: !name?.trim() ? "Name is required." : "",
        information: !information?.trim() ? "Information is required." : "",
    };
    const isValid = !errors.name && !errors.information;

    // Notify parent about validation status
    React.useEffect(() => {
        onValidate?.({ factId, errors, isValid });
    }, [factId, errors.name, errors.information, isValid, onValidate]);

    // Display errors if showErrors is true
    const nameErr = showErrors ? errors.name : "";
    const infoErr = showErrors ? errors.information : "";

    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0">Fact #{index + 1}</h6>
                    <button
                        type="button"
                        className={`btn btn-sm ${isDisabled ? "btn-outline-secondary" : "btn-outline-danger"}`}
                        onClick={onRemove}
                        disabled={isDisabled}
                    >
                        Remove
                    </button>
                </div>

                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className={`form-control ${nameErr ? "is-invalid" : ""}`}
                            placeholder="Enter fact name..."
                            value={name}
                            onChange={(e) => onChange?.({ name: e.target.value })}
                        />
                        {nameErr && <div className="invalid-feedback">{nameErr}</div>}
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Information</label>
                        <input
                            type="text"
                            className={`form-control ${infoErr ? "is-invalid" : ""}`}
                            placeholder="Enter information..."
                            value={information}
                            onChange={(e) => onChange?.({ information: e.target.value })}
                        />
                        {infoErr && <div className="invalid-feedback">{infoErr}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
