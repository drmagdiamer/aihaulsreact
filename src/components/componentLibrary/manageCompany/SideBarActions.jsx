import { useCompany } from "../../../context/CompanyContext.jsx";

export default function SidebarActions({ setCurrentAction, currentAction }) {
    const { selectedCompany } = useCompany();
    const isDisabled = !selectedCompany;

    const actionButtons = [
        { action: "manage-employees", label: "Manage Employees" },
        { action: "add-employee", label: "Add Employee" }
    ];

    return (
        <div className="card p-3 d-flex flex-column gap-2">
            {actionButtons.map(({ action, label }) => (
                <button 
                    key={action}
                    className={`btn ${currentAction === action ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setCurrentAction(action)}
                    disabled={isDisabled}
                    title={isDisabled ? "Please select a company first" : ""}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}