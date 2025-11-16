import { useCompany } from "../../../context/CompanyContext.jsx";

export default function CompanySelector() {
  const { searchResults, selectedCompany, setSelectedCompany } = useCompany();

  return (
    <div className="card p-3">
      <h6 className="fw-bold text-muted mb-3">Select Company</h6>

      {searchResults.length === 0 ? (
        <div className="text-center text-muted">
          No companies available. Search for companies first.
        </div>
      ) : (
        <div className="d-flex flex-column gap-2">
          {searchResults.map((company) => (
            <div key={company.id} className="form-check">
              <input
                type="radio"
                name="companySelect"
                className="form-check-input"
                id={`company-${company.id}`}
                checked={selectedCompany?.id === company.id}
                onChange={() => setSelectedCompany(company)}
              />
              <label
                className="form-check-label"
                htmlFor={`company-${company.id}`}
              >
                {company.name}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
