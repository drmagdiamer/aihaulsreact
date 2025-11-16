import { useState, useEffect } from "react";
import SearchBar from "../componentLibrary/manageCompany/SearchBar";
import ManageCompanySidebarActions from "../componentLibrary/manageCompany/ManageCompanySidebarActions.jsx";
import CompanyDetails from "../componentLibrary/manageCompany/CompanyDetails";
import AddEmployeeForm from "../componentLibrary/manageCompany/AddEmployeeForm";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import EmployeeList from "../componentLibrary/manageCompany/EmployeeList.jsx";
import {useCompany} from "../../context/CompanyContext.jsx";


export default function ManageCompanyPage() {

    //  consume provider state
    const {
        searchResults,
        selectedCompany,
        setSelectedCompany,
    } = useCompany();

    // UI-only: which panel is active (edit / employees / add)
    const [currentAction, setCurrentAction] = useState("");
    
    // Track pending selection (what's selected via radio button)
    const [pendingSelection, setPendingSelection] = useState(null);
    
    // Sync pendingSelection with selectedCompany when it changes externally
    useEffect(() => {
        if (selectedCompany && (!pendingSelection || pendingSelection.id !== selectedCompany.id)) {
            setPendingSelection(selectedCompany);
        }
    }, [selectedCompany]);

    return (

        <div>
            <Header/>
        <div className="container-fluid px-4 py-4">

            {/* ────── HEADER ROW ────── */}
            <div className="row align-items-center mb-4">

                {/* LEFT — Search */}
                <div className="col-4">
                    <SearchBar />
                </div>

                {/* MIDDLE — Search Results */}
                <div className="col-4">
                    <div className="card p-3 shadow-sm">
                        <h6 className="fw-bold text-muted mb-2">Search Results</h6>

                        {searchResults.length === 0 ? (
                            <div className="text-center text-muted">No results yet</div>
                        ) : (
                            searchResults.map((comp) => (
                                <div className="form-check mb-1" key={comp.id}>
                                    <input
                                        type="radio"
                                        name="companySelect"
                                        className="form-check-input"
                                        checked={(pendingSelection || selectedCompany)?.id === comp.id}
                                        onChange={() => setPendingSelection(comp)}
                                    />
                                    <label className="form-check-label">{comp.name}</label>
                                </div>
                            ))
                        )}

                        <button
                            className="btn btn-primary btn-sm mt-3 w-100"
                            disabled={!pendingSelection}
                            onClick={() => {
                                if (pendingSelection) {
                                    setSelectedCompany(pendingSelection);
                                    setCurrentAction("manage-employees");
                                }
                            }}
                        >
                            Select Company
                        </button>
                    </div>
                </div>

                {/* RIGHT — Selected Company */}
                <div className="col-4">
                    <div className="card p-3 shadow-sm d-flex justify-content-center align-items-center text-center h-100">
                        <h6 className="fw-bold text-muted">Selected Company</h6>
                        <div className="mt-2 fs-5">
                            {selectedCompany ? selectedCompany.name : "No company selected"}
                        </div>
                    </div>
                </div>
            </div>

            {/* ────── BODY ROW ────── */}
            <div className="row">

                {/* Sidebar */}
                <div className="col-3">
                    <ManageCompanySidebarActions setCurrentAction={setCurrentAction} currentAction={currentAction} />
                </div>

                    {/* Right section — dynamic panels */}
                    <div className="col-9">
                        <div className="card p-4 shadow-sm">
                            {currentAction === "edit-company" && <CompanyDetails />}
                            {currentAction === "manage-employees" && <EmployeeList />}
                            {currentAction === "add-employee" && <AddEmployeeForm />}
                            {!currentAction && selectedCompany && (
                                <div className="text-center text-muted py-5">
                                    <p>Select an action from the sidebar to get started.</p>
                                </div>
                            )}
                            {!currentAction && !selectedCompany && (
                                <div className="text-center text-muted py-5">
                                    <p>Select a company to view options.</p>
                                </div>
                            )}
                        </div>
                    </div>
            </div>
        </div>
            <Footer/>
        </div>
    );
}