import { useState, useEffect } from "react";
import CompanyHeader from "../componentLibrary/adminSector/CompanyHeader.jsx";
import AdminSidebarActions from "../componentLibrary/adminSector/AdminSidebarActions.jsx";
import EmployeeList from "../componentLibrary/manageCompany/EmployeeList.jsx";
import AddEmployeeForm from "../componentLibrary/manageCompany/AddEmployeeForm.jsx";
import Footer from "./Footer.jsx";
import { useCompany } from "../../context/CompanyContext.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function AdminSectorPage() {
    const { currentUser, userRole, hasRole } = useAuth();
    const { selectedCompany, setSelectedCompany, setCompanyDetails, setEmployees } = useCompany();
    const [currentAction, setCurrentAction] = useState("manage-employees");

    // Set the user's company when component mounts or user changes
    useEffect(() => {
        if (currentUser?.companyId && (!selectedCompany || selectedCompany.id !== currentUser.companyId)) {
            // TODO: Fetch company details from DB using currentUser.companyId
            // For now, create a mock company object
            const userCompany = {
                id: currentUser.companyId,
                name: currentUser.companyName,
                trustLevel: "Gold",
                status: "active",
                type: "company"
            };
            setSelectedCompany(userCompany);
            setCompanyDetails(userCompany);
            
            // TODO: Fetch employees for this company from DB
            // setEmployees(employeesData);
        }
    }, [currentUser, selectedCompany, setSelectedCompany, setCompanyDetails, setEmployees]);

    if (!currentUser) {
        return (
            <div>
                <CompanyHeader />
                <div className="container-fluid px-4 py-4">
                    <div className="text-center text-muted py-5">
                        <p>Please log in to access the Admin Portal.</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <CompanyHeader />
            <div className="container-fluid px-4 py-4">
                {/* User Info Card */}
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

                {/* Main Content Row */}
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-3">
                        <AdminSidebarActions setCurrentAction={setCurrentAction} currentAction={currentAction} />
                    </div>

                    {/* Right section — dynamic panels */}
                    <div className="col-9">
                        <div className="card p-4 shadow-sm">
                            {currentAction === "manage-employees" && <EmployeeList />}
                            {currentAction === "add-employee" && <AddEmployeeForm />}
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

