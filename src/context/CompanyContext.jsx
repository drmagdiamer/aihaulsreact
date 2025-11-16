import { createContext, useContext, useState } from "react";

export const CompanyContext = createContext(null);

export function CompanyProvider({ children }) {
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [companyDetails, setCompanyDetails] = useState(null);

    const [companyLookups, setCompanyLookups] = useState({
        trustLevels: ['Bronze', 'Silver', 'Gold', 'Platinum'],
        statuses: ['active', 'suspended', 'under_investigation', 'terminated'],
        companyTypes: ['company', 'service provider'],
        employeeRoles: ['Admin', 'Agent', 'Support'],
        employeeStatuses: ['active', 'suspended', 'under_investigation', 'terminated'],
        searchFilters: [
            { value: 'company', label: 'Company' }
        ]
    });

    // TODO: Fetch employees from DB on component mount or when selectedCompany changes
    const [employees, setEmployees] = useState([]);

    // TODO Simulated search call (later change to fetch)
    const searchCompanies = (searchInput, searchFilter, trustLevel = "") => {
        const mockCompanies = [
            { id: 1, name: "FedEx Canada", trustLevel: "Gold", status: "Active", type: "provider" },
            { id: 2, name: "Canada Post", trustLevel: "Silver", status: "Active", type: "provider" },
            { id: 3, name: "SportChek Logistics", trustLevel: "Bronze", status: "Active", type: "company" },
            { id: 4, name: "Pizza Hotline Courier", trustLevel: "Gold", status: "Inactive", type: "company" },
        ];

        const filtered = mockCompanies.filter((c) => {
            const matchesName = c.name.toLowerCase().includes(searchInput.toLowerCase());
            const matchesType = c.type === searchFilter; // Filter by company or provider type
            const matchesTrustLevel = !trustLevel || c.trustLevel === trustLevel;
            
            return matchesName && matchesType && matchesTrustLevel;
        });

        setSearchResults(filtered);
    };

    // TODO: Add employee to selected company in DB - currently only updates local state
    // TODO: Add Security
    const addEmployee = (employeeData) => {
        const newEmployee = {
            id: employees.length + 1,
            ...employeeData,
        };

        setEmployees((prev) => [...prev, newEmployee]);
        // TODO: Call API POST /admin/company/{companyId}/employee to persist to DB
    };

    // TODO: Update employee in DB - currently only updates local state
    const updateEmployee = (employeeId, updates) => {
        setEmployees((prev) =>
            prev.map((emp) =>
                emp.id === employeeId ? { ...emp, ...updates } : emp
            )
        );
        // TODO: Call API PUT /admin/employee/{employeeId} to persist role/status changes to DB
    };


    // TODO : edit company
    return (
        <CompanyContext.Provider
            value={{
                searchResults,
                selectedCompany,
                setSelectedCompany,
                companyDetails,
                setCompanyDetails,
                companyLookups,
                setCompanyLookups,
                employees,
                addEmployee,
                updateEmployee,
                searchCompanies,
            }}
        >
            {children}
        </CompanyContext.Provider>
    );
}

export const useCompany = () => useContext(CompanyContext);