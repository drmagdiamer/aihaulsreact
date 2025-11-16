import { useCompany } from "../../../context/CompanyContext.jsx";

export default function EmployeeList({ selectedCompany: propSelectedCompany }) {
    const { employees, selectedCompany: contextSelectedCompany, updateEmployee, companyLookups } = useCompany();
    const selectedCompany = propSelectedCompany || contextSelectedCompany;

    const list = selectedCompany
        ? employees.filter(e => e.companyId === selectedCompany.id)
        : [];

    // TODO: These handlers update local state only - changes need to be persisted to DB via updateEmployee
    const handleRoleChange = (employeeId, newRole) => {
        updateEmployee(employeeId, { role: newRole });
    };

    const handleStatusChange = (employeeId, newStatus) => {
        updateEmployee(employeeId, { status: newStatus });
    };

    return (
        <div className="card p-4">
            <h4 className="mb-3">Employees</h4>
            {!selectedCompany && <div className="text-muted">Select a company to view employees.</div>}

            {selectedCompany && (
                <table className="table table-bordered mt-2">
                    <thead className="table-light">
                    <tr>
                        <th>Name</th><th>Email</th><th>Role</th><th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center text-muted">No employees yet</td>
                        </tr>
                    ) : (
                        list.map(emp => (
                            <tr key={emp.id}>
                                <td>{emp.name}</td>
                                <td>{emp.email}</td>
                                <td>
                                    <select
                                        className="form-select form-select-sm"
                                        value={emp.role || ""}
                                        onChange={(e) => handleRoleChange(emp.id, e.target.value)}
                                    >
                                        {companyLookups.employeeRoles.map((role) => (
                                            <option key={role} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <select
                                        className="form-select form-select-sm"
                                        value={emp.status || ""}
                                        onChange={(e) => handleStatusChange(emp.id, e.target.value)}
                                    >
                                        {companyLookups.employeeStatuses.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            )}
        </div>
    );
}