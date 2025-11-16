import { useState } from "react";
import { useCompany } from "../../../context/CompanyContext.jsx";

export default function AddEmployeeForm({ selectedCompany: propSelectedCompany }) {
    const { addEmployee, selectedCompany: contextSelectedCompany, companyLookups } = useCompany();
    const selectedCompany = propSelectedCompany || contextSelectedCompany;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        status: ""
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        if (!selectedCompany) {
            alert("Please select a company first.");
            return;
        }
        if (!formData.name || !formData.email || !formData.role || !formData.status) {
            alert("Please fill all fields.");
            return;
        }

        addEmployee({
            name: formData.name,
            email: formData.email,
            role: formData.role,
            status: formData.status,
            companyId: selectedCompany.id,
        });

        // Clear form
        setFormData({ name: "", email: "", role: "", status: "" });
    };

    const handleCancel = () => {
        setFormData({ name: "", email: "", role: "", status: "" });
    };

    const formFields = [
        {
            id: "name",
            label: "Employee Name",
            type: "text",
            placeholder: "Enter employee name",
            value: formData.name,
            onChange: (e) => handleChange("name", e.target.value)
        },
        {
            id: "email",
            label: "Email",
            type: "email",
            placeholder: "employee@company.com",
            value: formData.email,
            onChange: (e) => handleChange("email", e.target.value)
        },
        {
            id: "role",
            label: "Role",
            type: "select",
            options: companyLookups.employeeRoles,
            placeholder: "Select a role...",
            value: formData.role,
            onChange: (e) => handleChange("role", e.target.value)
        },
        {
            id: "status",
            label: "Status",
            type: "select",
            options: companyLookups.employeeStatuses,
            placeholder: "Select status...",
            value: formData.status,
            onChange: (e) => handleChange("status", e.target.value)
        }
    ];

    const renderField = (field) => (
        <div key={field.id} className="col-md-6">
            <label className="form-label fw-semibold">{field.label}</label>
            {field.type === "select" ? (
                <select
                    className="form-select form-select-lg"
                    value={field.value}
                    onChange={field.onChange}
                >
                    <option value="">{field.placeholder}</option>
                    {field.options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            ) : (
                <input
                    type={field.type}
                    className="form-control form-control-lg"
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={field.onChange}
                />
            )}
        </div>
    );

    return (
        <div>
            <h4 className="fw-bold mb-1">Add Employee</h4>
            <div className="text-muted mb-4">
                {selectedCompany ? `Company: ${selectedCompany.name}` : "No company selected"}
            </div>

            <div className="row g-4">
                {formFields.map(renderField)}
            </div>

            <div className="d-flex justify-content-end mt-4 gap-3">
                <button className="btn btn-outline-secondary px-4 py-2" onClick={handleCancel}>
                    Cancel
                </button>
                <button className="btn btn-success px-4 py-2" onClick={handleSubmit}>
                    Add Employee
                </button>
            </div>
        </div>
    );
}