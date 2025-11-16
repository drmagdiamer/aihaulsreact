import { useAuth } from "../../../contexts/AuthContext.jsx";

export default function AdminSidebarActions({ setCurrentAction, currentAction }) {
    const { hasRole } = useAuth();

    const actionButtons = [
        { action: "manage-employees", label: "Manage Employees" },
        { action: "add-employee", label: "Add Employee" },
        ...(hasRole("Agent") ? [{ action: "create-request", label: "Create Request" }] : [])
    ];

    return (
        <div className="card p-3 d-flex flex-column gap-2">
            {actionButtons.map(({ action, label }) => (
                <button 
                    key={action}
                    className={`btn ${currentAction === action ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setCurrentAction(action)}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}

