import { createContext, useContext, useState } from "react";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [userCompany, setUserCompany] = useState(null);

    // TODO: Update user profile in DB - currently only updates local state
    const updateUserProfile = async (userData) => {
        const token = localStorage.getItem('jwtToken');
        
        // TODO: Call API PUT /admin/user/profile to persist changes to DB
        // This will need to update AuthContext's currentUser as well
        return userData;
    };

    return (
        <UserContext.Provider
            value={{
                userCompany,
                setUserCompany,
                updateUserProfile,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);

