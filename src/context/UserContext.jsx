import { createContext, useContext, useState, useEffect } from "react";
import { useCompany } from "./CompanyContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [userCompany, setUserCompany] = useState(null);
    const { setSelectedCompany, setCompanyDetails } = useCompany();
    const { currentUser } = useAuth();

    // Set company from AuthContext currentUser, or default if no user
    useEffect(() => {
        if (currentUser?.companyId) {
            // Get company from authenticated user
            const company = {
                id: currentUser.companyId,
                name: currentUser.companyName,
                trustLevel: "Gold",
                status: "active",
                type: "company"
            };
            setUserCompany(company);
            setSelectedCompany(company);
            setCompanyDetails(company);
        } else if (!currentUser && !userCompany) {
            // Default company when no user is logged in (for testing/bypassing login)
            const defaultCompany = {
                id: 1,
                name: "Default Company",
                trustLevel: "Gold",
                status: "active",
                type: "company"
            };
            setUserCompany(defaultCompany);
            setSelectedCompany(defaultCompany);
            setCompanyDetails(defaultCompany);
        }
    }, [currentUser, userCompany, setSelectedCompany, setCompanyDetails]);

    return (
        <UserContext.Provider
            value={{
                userCompany,
                setUserCompany,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);

