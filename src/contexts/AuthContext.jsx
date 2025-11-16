import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null);

    // TODO: Fetch user profile from DB - currently returns mock data
    const fetchUserProfile = async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) return null;

        // TODO: Call API GET /admin/user/profile to get current user data
        const mockUser = {
            id: 1,
            name: "John Admin",
            email: "admin@company.com",
            role: "Admin",
            companyId: 1,
            companyName: "FedEx Canada"
        };

        setCurrentUser(mockUser);
        setUserRole(mockUser.role);
        
        return mockUser;
    };

    // Check if user is logged in on mount and fetch user data
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            setIsLoggedIn(true);
            // TODO: Fetch user profile from DB on mount
            fetchUserProfile();
        }
    }, []);

    const login = async (token) => {
        localStorage.setItem('jwtToken', token);
        setIsLoggedIn(true);
        // TODO: Fetch user profile after login
        await fetchUserProfile();
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
        setCurrentUser(null);
        setUserRole(null);
    };

    // Helper function for role checking
    const hasRole = (role) => userRole === role;

    return (
        <AuthContext.Provider value={{ 
            isLoggedIn, 
            currentUser, 
            userRole,
            login, 
            logout,
            hasRole,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
