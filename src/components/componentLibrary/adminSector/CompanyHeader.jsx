import { useAuth } from "../../../contexts/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";

export default function CompanyHeader() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav
            className="navbar navbar-expand-md position-relative"
            style={{ background: '#333' }}
        >
            <div className="container-fluid">
                {/* Left: Company Name/Brand */}
                <div className="navbar-brand" style={{ color: '#fff' }}>
                    {currentUser?.companyName || "Company Portal"}
                </div>

                {/* Right: Hamburger button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#companyNavbarContent"
                    aria-controls="companyNavbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span
                        className="navbar-toggler-icon"
                        style={{ filter: 'invert(1)' }}
                    ></span>
                </button>

                {/* Collapsible Menu */}
                <div className="collapse navbar-collapse" id="companyNavbarContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <span className="nav-link" style={{ color: '#fff' }}>
                                {currentUser?.name || "User"}
                            </span>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogout();
                                }}
                                style={{ color: '#fff', cursor: 'pointer' }}
                            >
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Center: Company Info or Tagline */}
                <div className="position-absolute start-50 translate-middle-x">
                    <span className="h5 mb-0" style={{ color: '#fff' }}>
                        {currentUser ? `Admin Portal - ${currentUser.companyName}` : "Admin Portal"}
                    </span>
                </div>
            </div>
        </nav>
    );
}

