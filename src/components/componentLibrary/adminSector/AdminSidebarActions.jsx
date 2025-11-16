import { useAuth } from "../../../contexts/AuthContext.jsx";
import SidebarActionsBase from "../SidebarActionsBase.jsx";

export default function AdminSidebarActions({ setCurrentAction, currentAction }) {
    const { hasRole } = useAuth();

    const actions = [
        { action: "manage-employees", label: "Manage Employees" },
        { action: "add-employee", label: "Add Employee" },
        ...(hasRole("Agent") ? [{ action: "create-request", label: "Create Request" }] : [])
    ];

    return (
        <SidebarActionsBase 
            setCurrentAction={setCurrentAction} 
            currentAction={currentAction}
            actions={actions}
            isDisabled={false}
        />
    );
}

