import { useCompany } from "../../context/CompanyContext.jsx";

export default function SidebarActionsBase({ setCurrentAction, currentAction, actions, isDisabled: externalDisabled }) {
    const { selectedCompany } = useCompany();
    const isDisabled = externalDisabled !== undefined ? externalDisabled : !selectedCompany;

    return (
        <div className="card p-3 d-flex flex-column gap-2">
            {actions.map(({ action, label }) => (
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

