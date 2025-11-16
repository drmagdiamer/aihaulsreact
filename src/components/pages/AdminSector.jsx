import { useState } from "react";
import CompanyHeader from "../componentLibrary/adminSector/CompanyHeader.jsx";
import AdminSidebarActions from "../componentLibrary/adminSector/AdminSidebarActions.jsx";
import EmployeeList from "../componentLibrary/manageCompany/EmployeeList.jsx";
import AddEmployeeForm from "../componentLibrary/manageCompany/AddEmployeeForm.jsx";
import Footer from "./Footer.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function AdminSectorPage() {
    const { currentUser, userRole, hasRole } = useAuth();
    const [currentAction, setCurrentAction] = useState("manage-employees");

    // Get company from AuthContext (currentUser) instead of CompanyContext
    const adminCompany = currentUser?.companyId ? {
        id: currentUser.companyId,
        name: currentUser.companyName,
        trustLevel: "Gold",
        status: "active",
        type: "company"
    } : null;

    // TODO: Re-enable login check once authentication is fully implemented
    // if (!currentUser) {
    //     return (
    //         <div>
    //             <CompanyHeader />
    //             <div className="container-fluid px-4 py-4">
    //                 <div className="text-center text-muted py-5">
    //                     <p>Please log in to access the Admin Portal.</p>
    //                 </div>
    //             </div>
    //             <Footer />
    //         </div>
    //     );
    // }

    return (
        <div>
            <CompanyHeader />
            <div className="container-fluid px-4 py-4">
                {/* Company Name Header */}
                {adminCompany && (
                    <div className="row mb-3">
                        <div className="col-12">
                            <h3 className="fw-bold">{adminCompany.name}</h3>
                        </div>
                    </div>
                )}

                {/* User Info Card */}
                {currentUser && (
                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="card p-3 shadow-sm">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="mb-1 fw-bold">Welcome, {currentUser.name}</h6>
                                        <small className="text-muted">Role: {userRole} | Company: {currentUser.companyName}</small>
                                    </div>
                                    {hasRole("Agent") && (
                                        <span className="badge bg-info">Agent Access</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content Row */}
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-3">
                        <AdminSidebarActions setCurrentAction={setCurrentAction} currentAction={currentAction} />
                    </div>

                    {/* Right section — dynamic panels */}
                    <div className="col-9">
                        <div className="card p-4 shadow-sm">
                            {currentAction === "manage-employees" && <EmployeeList selectedCompany={adminCompany} />}
                            {currentAction === "add-employee" && <AddEmployeeForm selectedCompany={adminCompany} />}
                            {currentAction === "create-request" && hasRole("Agent") && (
                                <div className="text-center text-muted py-5">
                                    <p>Create Request form will go here (Agents only)</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

