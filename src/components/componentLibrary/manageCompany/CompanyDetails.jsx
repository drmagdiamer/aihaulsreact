import { useState, useEffect } from "react";
import { useCompany } from "../../../context/CompanyContext.jsx";

export default function CompanyDetails() {
    const {
        selectedCompany,
        companyDetails,
        setCompanyDetails,
        setSelectedCompany,
        companyLookups,
    } = useCompany();

    // Local UI state for form
    const [name, setName] = useState("");
    const [trustLevel, setTrustLevel] = useState("");
    const [status, setStatus] = useState("");

    // TODO: Fetch company details from DB when selectedCompany changes - currently uses selectedCompany directly
    useEffect(() => {
        if (selectedCompany) {
            // TODO: Call API GET /admin/company/{companyId} to fetch full company details from DB
            setCompanyDetails(selectedCompany);

            setName(selectedCompany.name || "");
            setTrustLevel(selectedCompany.trustLevel || "");
            setStatus(selectedCompany.status || "");
        }
    }, [selectedCompany]);

    // Optional: In case we will fetch company details later from DB
    useEffect(() => {
        if (companyDetails) {
            setName(companyDetails.name || "");
            setTrustLevel(companyDetails.trustLevel || "");
            setStatus(companyDetails.status || "");
        }
    }, [companyDetails]);

    // TODO: Update company in DB - currently only updates local state
    const handleSave = () => {
        const updated = { ...companyDetails, name, trustLevel, status };
        setCompanyDetails(updated);
        // Also update selectedCompany to keep them in sync
        if (selectedCompany) {
            setSelectedCompany(updated);
        }

        // TODO: Call API PUT /admin/company/{companyId} to persist changes to DB
    };

    return (
        <div>
            <h4 className="fw-bold mb-1">Edit Company</h4>

            <div className="row g-4 mt-2">

                <div className="col-md-6">
                    <label className="form-label fw-semibold">Company Name</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label fw-semibold">Trust Level</label>
                    <select
                        className="form-select form-select-lg"
                        value={trustLevel}
                        onChange={(e) => setTrustLevel(e.target.value)}
                    >
                        {companyLookups.trustLevels.length > 0
                            ? companyLookups.trustLevels.map((x) => (
                                <option key={x} value={x}>{x}</option>
                            ))
                            : <>
                                <option value="Gold">Gold</option>
                                <option value="Silver">Silver</option>
                                <option value="Bronze">Bronze</option>
                            </>
                        }
                    </select>
                </div>

                <div className="col-md-6">
                    <label className="form-label fw-semibold">Status</label>
                    <select
                        className="form-select form-select-lg"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        {companyLookups.statuses.length > 0
                            ? companyLookups.statuses.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))
                            : <>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </>
                        }
                    </select>
                </div>
            </div>

            <div className="d-flex justify-content-end mt-4 gap-3">
                <button className="btn btn-outline-secondary px-4 py-2">Cancel</button>
                <button className="btn btn-primary px-4 py-2" onClick={handleSave}>
                    Save Changes
                </button>
            </div>
        </div>
    );
}