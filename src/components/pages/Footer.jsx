// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        // bg-light py-3 w-100
        <footer className="footer">
            <div className="container text-center">
                <span className="mb-0">&copy; {new Date().getFullYear()} Java Innovations. All rights reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;