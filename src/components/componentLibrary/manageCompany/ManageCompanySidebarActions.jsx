import SidebarActionsBase from "../SidebarActionsBase.jsx";

export default function ManageCompanySidebarActions({ setCurrentAction, currentAction }) {
    const actions = [
        { action: "edit-company", label: "Edit Company" },
        { action: "manage-employees", label: "Manage Employees" },
        { action: "add-employee", label: "Add Employee" }
    ];

    return (
        <SidebarActionsBase 
            setCurrentAction={setCurrentAction} 
            currentAction={currentAction}
            actions={actions}
        />
    );
}