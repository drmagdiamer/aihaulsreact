

import { useState } from "react";
import {useCompany} from "../../../context/CompanyContext.jsx";

export default function SearchBar() {
    const { searchCompanies, companyLookups } = useCompany();

    const [searchInput, setSearchInput] = useState("");
    const [searchFilter, setSearchFilter] = useState("company"); // default: company
    const [trustLevel, setTrustLevel] = useState(""); // default: all trust levels

    // Use filters and trust levels from context
    const trustLevels = [
        { value: "", label: "All Trust Levels" },
        ...companyLookups.trustLevels.map(level => ({ value: level, label: level }))
    ];

    const handleSearch = () => {
        searchCompanies(searchInput, searchFilter, trustLevel); // <-- context function with trust level
    };

    return (
        <div className="card p-4 shadow-sm border-0">

            <div className="row g-3">
                {/* Input */}
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control form-control-lg search-input"
                        placeholder="Search for a company or provider..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>

                {/* Trust Level Dropdown */}
                <div className="col-md-3">
                    <select
                        className="form-select form-select-lg"
                        value={trustLevel}
                        onChange={(e) => setTrustLevel(e.target.value)}
                    >
                        {trustLevels.map((level) => (
                            <option key={level.value} value={level.value}>
                                {level.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Button */}
                <div className="col-md-3 d-grid">
                    <button className="btn btn-primary btn-lg" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="d-flex gap-4 mt-3">
                {companyLookups.searchFilters.map((filter) => (
                    <div key={filter.value} className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="filter"
                            value={filter.value}
                            checked={searchFilter === filter.value}
                            onChange={() => setSearchFilter(filter.value)}
                        />
                        <label className="form-check-label">{filter.label}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}