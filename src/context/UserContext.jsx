import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [userCompany, setUserCompany] = useState(null);
    const { currentUser } = useAuth();

    // Set company from AuthContext currentUser, or default if no user
    // Only sets userCompany in UserContext, not selectedCompany in CompanyContext
    // This allows ManageCompany to have its own company selection without interference
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
        }
    }, [currentUser, userCompany]);

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

